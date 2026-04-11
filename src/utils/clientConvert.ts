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
    cropWidth?: string;
    cropHeight?: string;
  }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let canvasWidth = img.naturalWidth;
      let canvasHeight = img.naturalHeight;
      const angle = parseInt(options.rotationAngle || "0");
      const isRotated90or270 = angle === 90 || angle === 270;

      // Resize
      if (toolId === "resize-image") {
        const w = options.width ? parseInt(options.width) : 0;
        const h = options.height ? parseInt(options.height) : 0;
        if (w && h) { canvasWidth = w; canvasHeight = h; }
        else if (w) { canvasHeight = Math.round(img.naturalHeight * (w / img.naturalWidth)); canvasWidth = w; }
        else if (h) { canvasWidth = Math.round(img.naturalWidth * (h / img.naturalHeight)); canvasHeight = h; }
        else { canvasWidth = Math.round(img.naturalWidth * 0.5); canvasHeight = Math.round(img.naturalHeight * 0.5); }
      }

      // Crop
      let cropW = img.naturalWidth;
      let cropH = img.naturalHeight;
      if (toolId === "crop-image") {
        cropW = Math.min(parseInt(options.cropWidth || "500"), img.naturalWidth);
        cropH = Math.min(parseInt(options.cropHeight || "500"), img.naturalHeight);
        canvasWidth = cropW;
        canvasHeight = cropH;
      }

      // For rotation, swap canvas dimensions
      const finalW = isRotated90or270 ? canvasHeight : canvasWidth;
      const finalH = isRotated90or270 ? canvasWidth : canvasHeight;

      const canvas = document.createElement("canvas");
      canvas.width = finalW;
      canvas.height = finalH;
      const ctx = canvas.getContext("2d")!;

      ctx.save();
      if (toolId === "rotate-image" && angle !== 0) {
        ctx.translate(finalW / 2, finalH / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
      } else if (toolId === "crop-image") {
        ctx.drawImage(img, 0, 0, cropW, cropH, 0, 0, cropW, cropH);
      } else {
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      }
      ctx.restore();

      // Determine output format
      let fmt = options.targetFormat || "";
      if (!fmt) {
        if (toolId?.includes("-to-")) fmt = toolId.split("-to-")[1];
        else fmt = file.name.split(".").pop() || "webp";
      }
      if (fmt === "jpg") fmt = "jpeg";

      const mimeType = fmt === "png" ? "image/png" : fmt === "jpeg" ? "image/jpeg" : "image/webp";
      const quality = (options.quality || 80) / 100;

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