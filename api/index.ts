import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/hello", (_req: Request, res: Response) => {
  res.json({ message: "Convertly API is running" });
});

// VIDEO conversion — requires ffmpeg on the server
// Image tools now run fully in the browser (see src/utils/clientConvert.ts)
app.post("/api/convert/video", (_req: Request, res: Response) => {
  // Video conversion requires a persistent server with ffmpeg.
  // Deploy to Render.com for full video support.
  // See README for instructions.
  res.status(503).json({
    error: "Video conversion requires the full server. Please deploy to Render.com for video tools. Image tools work without a server.",
  });
});

// Plan upgrade (demo)
app.post("/api/plan/upgrade", (req: Request, res: Response) => {
  const { planType } = req.body;
  res.json({ success: true, message: `Upgraded to ${planType}` });
});

export default app;