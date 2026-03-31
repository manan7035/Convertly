import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import cors from "cors";
import archiver from "archiver";
import ffmpeg from "fluent-ffmpeg";

const app = express();
const PORT = 3000;

// Ensure temp directory exists
const TEMP_DIR = path.join(process.cwd(), "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for bulk
});

// API Routes
app.post("/api/convert/image", upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const { targetFormat, toolId } = req.body;
    const convertedFiles: { path: string; name: string }[] = [];

    // Process each file
    for (const file of files) {
      const inputPath = file.path;
      const format = targetFormat || path.extname(file.originalname).slice(1).toLowerCase();
      const outputFilename = `${uuidv4()}.${format}`;
      const outputPath = path.join(TEMP_DIR, outputFilename);

      let pipeline = sharp(inputPath);

      // Apply tool-specific logic
      if (toolId === "resize-image") {
        const metadata = await pipeline.metadata();
        if (metadata.width && metadata.height) {
          pipeline = pipeline.resize(Math.round(metadata.width * 0.5));
        }
      } else if (toolId === "rotate-image") {
        pipeline = pipeline.rotate(90);
      }

      // Basic conversion logic
      if (format === "webp") {
        pipeline = pipeline.webp({ quality: 80 });
      } else if (format === "png") {
        pipeline = pipeline.png();
      } else if (format === "jpg" || format === "jpeg") {
        pipeline = pipeline.jpeg({ quality: 80 });
      }

      await pipeline.toFile(outputPath);
      convertedFiles.push({
        path: outputPath,
        name: `converted-${file.originalname.split(".")[0]}.${format}`,
      });

      // Delete input file immediately after processing
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    }

    // If single file, download directly
    if (convertedFiles.length === 1) {
      const singleFile = convertedFiles[0];
      res.download(singleFile.path, singleFile.name, (err) => {
        if (fs.existsSync(singleFile.path)) {
          setTimeout(() => {
            if (fs.existsSync(singleFile.path)) fs.unlinkSync(singleFile.path);
          }, 5 * 60 * 1000);
        }
      });
    } else {
      // If multiple files, create a zip
      const zipName = `convertly-bulk-${uuidv4()}.zip`;
      const zipPath = path.join(TEMP_DIR, zipName);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        res.download(zipPath, zipName, (err) => {
          // Cleanup zip and converted files
          if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
          convertedFiles.forEach((f) => {
            if (fs.existsSync(f.path)) fs.unlinkSync(f.path);
          });
        });
      });

      archive.on("error", (err) => {
        throw err;
      });

      archive.pipe(output);
      convertedFiles.forEach((f) => {
        archive.file(f.path, { name: f.name });
      });
      await archive.finalize();
    }
  } catch (error) {
    console.error("Conversion error:", error);
    res.status(500).json({ error: "Failed to convert images" });
  }
});

app.post("/api/convert/video", upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const { targetFormat } = req.body;
    const convertedFiles: { path: string; name: string }[] = [];

    // Process each file
    for (const file of files) {
      const inputPath = file.path;
      const outputFilename = `${uuidv4()}.${targetFormat}`;
      const outputPath = path.join(TEMP_DIR, outputFilename);

      await new Promise((resolve, reject) => {
        let command = ffmpeg(inputPath);
        
        if (targetFormat === "mp3") {
          command = command.toFormat("mp3").audioBitrate(128);
        } else if (targetFormat === "gif") {
          command = command.toFormat("gif").size("480x?");
        } else {
          command = command.toFormat(targetFormat).videoCodec("libx264").audioCodec("aac");
        }

        command
          .on("end", resolve)
          .on("error", reject)
          .save(outputPath);
      });

      convertedFiles.push({
        path: outputPath,
        name: `converted-${file.originalname.split(".")[0]}.${targetFormat}`,
      });

      // Delete input file immediately after processing
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    }

    // If single file, download directly
    if (convertedFiles.length === 1) {
      const singleFile = convertedFiles[0];
      res.download(singleFile.path, singleFile.name, (err) => {
        if (fs.existsSync(singleFile.path)) {
          setTimeout(() => {
            if (fs.existsSync(singleFile.path)) fs.unlinkSync(singleFile.path);
          }, 5 * 60 * 1000);
        }
      });
    } else {
      // If multiple files, create a zip
      const zipName = `convertly-bulk-${uuidv4()}.zip`;
      const zipPath = path.join(TEMP_DIR, zipName);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        res.download(zipPath, zipName, (err) => {
          // Cleanup zip and converted files
          if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
          convertedFiles.forEach((f) => {
            if (fs.existsSync(f.path)) fs.unlinkSync(f.path);
          });
        });
      });

      archive.on("error", (err) => {
        throw err;
      });

      archive.pipe(output);
      convertedFiles.forEach((f) => {
        archive.file(f.path, { name: f.name });
      });
      await archive.finalize();
    }
  } catch (error) {
    console.error("Video conversion error:", error);
    res.status(500).json({ error: "Failed to convert videos" });
  }
});

// Simulate Plan Upgrade
app.post("/api/plan/upgrade", (req, res) => {
  const { planType } = req.body;
  // In a real app, we'd verify payment here
  res.json({ 
    success: true, 
    message: `Successfully upgraded to ${planType} plan!`,
    plan: planType,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });
});

// Cleanup task: Delete files older than 30 minutes
setInterval(() => {
  fs.readdir(TEMP_DIR, (err, files) => {
    if (err) return;
    const now = Date.now();
    files.forEach((file) => {
      const filePath = path.join(TEMP_DIR, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        if (now - stats.mtimeMs > 30 * 60 * 1000) {
          fs.unlink(filePath, () => {});
        }
      });
    });
  });
}, 10 * 60 * 1000);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
