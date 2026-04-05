import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import cors from "cors";
import archiver from "archiver";

const app = express();

// Temp folder setup
const TEMP_DIR = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Upload setup (memory for Vercel)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB safe for Vercel
});

// ❤️ Health check route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Convertly API working 🚀" });
});


// ⭐ IMAGE CONVERSION ROUTE
app.post("/api/convert/image", upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const { targetFormat, width, height, quality } = req.body;
    const convertedFiles: { path: string; name: string }[] = [];

    for (const file of files) {
      const format = (targetFormat || "webp").toLowerCase();
      const outputFilename = `${uuidv4()}.${format}`;
      const outputPath = path.join(TEMP_DIR, outputFilename);

      let pipeline = sharp(file.buffer).rotate();

      if (width || height) {
        pipeline = pipeline.resize(
          width ? parseInt(width) : undefined,
          height ? parseInt(height) : undefined,
          { fit: "inside", withoutEnlargement: true }
        );
      }

      const q = quality ? parseInt(quality) : 80;

      if (format === "png") pipeline.png({ quality: q });
      else if (format === "jpg" || format === "jpeg") pipeline.jpeg({ quality: q });
      else pipeline.webp({ quality: q });

      await pipeline.toFile(outputPath);

      convertedFiles.push({
        path: outputPath,
        name: `converted-${file.originalname.split(".")[0]}.${format}`
      });
    }

    // Single file download
    if (convertedFiles.length === 1) {
      const file = convertedFiles[0];
      return res.download(file.path, file.name);
    }

    // Multiple → ZIP
    const zipName = `convertly-${uuidv4()}.zip`;
    const zipPath = path.join(TEMP_DIR, zipName);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    archive.pipe(output);
    convertedFiles.forEach(f => archive.file(f.path, { name: f.name }));
    await archive.finalize();

    output.on("close", () => {
      res.download(zipPath, zipName);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image conversion failed" });
  }
});


// ⭐ Fake plan upgrade (for demo)
app.post("/api/plan/upgrade", (req, res) => {
  const { planType } = req.body;
  res.json({
    success: true,
    message: `Upgraded to ${planType} plan 🎉`
  });
});

// ⭐ IMPORTANT for Vercel
export default app;
