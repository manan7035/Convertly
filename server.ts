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
import { exec } from "child_process";

const app = express();
const PORT = 3000;

// Check if FFmpeg is installed
exec("ffmpeg -version", (error) => {
  if (error) {
    console.warn("⚠️ FFmpeg not found in system PATH. Video/Audio conversion features will be disabled.");
  } else {
    console.log("✅ FFmpeg detected successfully.");
  }
});

// Ensure temp directory exists
const TEMP_DIR = path.join(process.cwd(), "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for images
});

const videoUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, TEMP_DIR),
    filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`),
  }),
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit for videos
});

// API Routes
app.post("/api/convert/image", imageUpload.array("files", 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const { targetFormat, toolId, width, height, quality, rotationAngle } = req.body;
    const convertedFiles: { path: string; name: string }[] = [];

    // Process each file
    for (const file of files) {
      const format = targetFormat || path.extname(file.originalname).slice(1).toLowerCase();
      const outputFilename = `${uuidv4()}.${format}`;
      const outputPath = path.join(TEMP_DIR, outputFilename);

      try {
        // Use buffer directly from memoryStorage
        let pipeline = sharp(file.buffer);
        
        // Auto-orient based on EXIF
        pipeline = pipeline.rotate();

        // Apply tool-specific logic
        if (toolId === "resize-image") {
          const targetWidth = width ? parseInt(width as string) : undefined;
          const targetHeight = height ? parseInt(height as string) : undefined;
          
          if (targetWidth || targetHeight) {
            pipeline = pipeline.resize(targetWidth, targetHeight, {
              fit: "inside",
              withoutEnlargement: true
            });
          } else {
            // Default to 50% if no size provided
            const metadata = await pipeline.metadata();
            if (metadata.width && metadata.height) {
              pipeline = pipeline.resize(Math.round(metadata.width * 0.5));
            }
          }
        } else if (toolId === "rotate-image") {
          const angle = rotationAngle ? parseInt(rotationAngle as string) : 90;
          pipeline = pipeline.rotate(angle);
        } else if (toolId === "crop-image") {
          const metadata = await pipeline.metadata();
          const imgWidth = metadata.width || 0;
          const imgHeight = metadata.height || 0;

          let left = Math.max(0, parseInt(req.body.cropX || "0"));
          let top = Math.max(0, parseInt(req.body.cropY || "0"));
          let cWidth = parseInt(req.body.cropWidth || "100");
          let cHeight = parseInt(req.body.cropHeight || "100");
          
          // Ensure dimensions are within bounds to prevent 500 errors
          if (imgWidth > 0 && imgHeight > 0) {
            if (left >= imgWidth) left = 0;
            if (top >= imgHeight) top = 0;
            cWidth = Math.min(cWidth, imgWidth - left);
            cHeight = Math.min(cHeight, imgHeight - top);
          }

          if (cWidth > 0 && cHeight > 0) {
            pipeline = pipeline.extract({ left, top, width: cWidth, height: cHeight });
          }
        }

        const q = quality ? parseInt(quality as string) : 80;

        // Explicitly set format and options
        if (format === "webp") {
          pipeline = pipeline.toFormat("webp");
          if (q === 100) {
            pipeline = pipeline.webp({ lossless: true });
          } else if (q >= 90) {
            pipeline = pipeline.webp({ nearLossless: true, quality: q });
          } else {
            pipeline = pipeline.webp({ quality: q });
          }
        } else if (format === "png") {
          pipeline = pipeline.toFormat("png");
          if (q === 100) {
            pipeline = pipeline.png({ compressionLevel: 9, effort: 10 });
          } else {
            pipeline = pipeline.png({ palette: true, quality: q, compressionLevel: 9, effort: 10 });
          }
        } else if (format === "jpg" || format === "jpeg") {
          pipeline = pipeline.toFormat("jpeg");
          pipeline = pipeline.jpeg({ quality: q, mozjpeg: true });
        } else if (format === "gif") {
          pipeline = pipeline.toFormat("gif");
          pipeline = pipeline.gif();
        } else if (format === "avif") {
          pipeline = pipeline.toFormat("avif");
          pipeline = pipeline.avif({ quality: q });
        } else if (format === "tiff") {
          pipeline = pipeline.toFormat("tiff");
          pipeline = pipeline.tiff({ quality: q });
        } else {
          // Fallback for other formats
          pipeline = pipeline.toFormat(format as any);
        }

        await pipeline.toFile(outputPath);
        convertedFiles.push({
          path: outputPath,
          name: `converted-${file.originalname.split(".")[0]}.${format}`,
        });
      } catch (err) {
        console.error(`Error processing file ${file.originalname}:`, err);
        // Continue with other files if one fails
      }
    }

    if (convertedFiles.length === 0) {
      return res.status(500).json({ error: "Failed to process any images. Please check if the files are valid images." });
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

app.post("/api/convert/video", videoUpload.array("files", 10), async (req, res) => {
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

      try {
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
            .on("error", (err) => {
              console.error("FFmpeg error:", err);
              reject(err);
            })
            .save(outputPath);
        });

        convertedFiles.push({
          path: outputPath,
          name: `converted-${file.originalname.split(".")[0]}.${targetFormat}`,
        });
      } catch (err) {
        console.error(`Error processing video ${file.originalname}:`, err);
      } finally {
        // Delete input file immediately after processing
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      }
    }

    if (convertedFiles.length === 0) {
      return res.status(500).json({ error: "Failed to convert videos. Ensure FFmpeg is installed on your system." });
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
