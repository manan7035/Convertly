// Client-side image conversion using Canvas API - works on Vercel with zero backend

export async function convertImageClientSide(
  file: File,
  toolId: string,
  options: {
    targetFormat?: string;
    quality?: number;
    width?: string;
    height?: string;
    rotationAngle?: string;
    cropX?: number;
    cropY?: number;
    cropWidth?: number;
    cropHeight?: number;
  }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      const angle = parseInt(options.rotationAngle || "0");
      const isRotated90or270 = angle === 90 || angle === 270;

      // Determine output mime type
      let fmt = options.targetFormat || "";
      if (!fmt) {
        if (toolId?.includes("-to-")) fmt = toolId.split("-to-")[1];
        else fmt = file.name.split(".").pop() || "webp";
      }
      if (fmt === "jpg") fmt = "jpeg";
      const mimeType = fmt === "png" ? "image/png" : fmt === "jpeg" ? "image/jpeg" : "image/webp";
      // PNG is always lossless — quality param is ignored by browsers for PNG anyway
      const quality = mimeType === "image/png" ? 1 : (options.quality || 80) / 100;

      // --- Resize ---
      let drawW = srcW;
      let drawH = srcH;
      if (toolId === "resize-image") {
        const w = options.width ? parseInt(options.width) : 0;
        const h = options.height ? parseInt(options.height) : 0;
        if (w && h) { drawW = w; drawH = h; }
        else if (w) { drawW = w; drawH = Math.round(srcH * (w / srcW)); }
        else if (h) { drawH = h; drawW = Math.round(srcW * (h / srcH)); }
        else { drawW = Math.round(srcW * 0.5); drawH = Math.round(srcH * 0.5); }
      }

      // --- Crop: use drag-selected region (in actual image pixels) ---
      let cropSrcX = 0, cropSrcY = 0, cropSrcW = srcW, cropSrcH = srcH;
      let cropOutW = srcW, cropOutH = srcH;
      if (toolId === "crop-image") {
        cropSrcX = Math.round(options.cropX ?? 0);
        cropSrcY = Math.round(options.cropY ?? 0);
        cropSrcW = Math.round(options.cropWidth ?? srcW);
        cropSrcH = Math.round(options.cropHeight ?? srcH);
        // Clamp to image bounds
        cropSrcX = Math.max(0, Math.min(cropSrcX, srcW - 1));
        cropSrcY = Math.max(0, Math.min(cropSrcY, srcH - 1));
        cropSrcW = Math.max(1, Math.min(cropSrcW, srcW - cropSrcX));
        cropSrcH = Math.max(1, Math.min(cropSrcH, srcH - cropSrcY));
        cropOutW = cropSrcW;
        cropOutH = cropSrcH;
      }

      // --- Canvas dimensions ---
      let canvasW: number, canvasH: number;
      if (toolId === "crop-image") {
        canvasW = cropOutW;
        canvasH = cropOutH;
      } else if (toolId === "rotate-image") {
        canvasW = isRotated90or270 ? drawH : drawW;
        canvasH = isRotated90or270 ? drawW : drawH;
      } else {
        canvasW = drawW;
        canvasH = drawH;
      }

      const canvas = document.createElement("canvas");
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext("2d")!;

      // Fill white background only for JPEG (no transparency support)
      if (mimeType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasW, canvasH);
      }

      ctx.save();
      if (toolId === "rotate-image" && angle !== 0) {
        ctx.translate(canvasW / 2, canvasH / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      } else if (toolId === "crop-image") {
        ctx.drawImage(img, cropSrcX, cropSrcY, cropSrcW, cropSrcH, 0, 0, cropOutW, cropOutH);
      } else {
        ctx.drawImage(img, 0, 0, drawW, drawH);
      }
      ctx.restore();

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas conversion failed"));
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

export function isImageTool(toolId: string): boolean {
  const videoTools = ["video-to-mp4", "extract-audio", "video-to-gif"];
  return !videoTools.includes(toolId || "");
}

export function getOutputExtension(toolId: string, targetFormat: string, originalFile: File): string {
  if (targetFormat && targetFormat !== "") return targetFormat === "jpeg" ? "jpg" : targetFormat;
  if (toolId?.includes("-to-")) return toolId.split("-to-")[1];
  return originalFile.name.split(".").pop() || "webp";
}
