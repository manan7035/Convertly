import React, { useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  File as FileIcon, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Download,
  ArrowLeft,
  Files,
  Shield,
  Zap,
  Globe,
  RotateCw,
  RefreshCw
} from "lucide-react";
import { convertImageClientSide, isImageTool, getOutputExtension } from "../utils/clientConvert";
const AdBanner300 = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container || container.childElementCount > 0) return;
    const cfg = document.createElement("script");
    cfg.text = "atOptions = {'key':'c55b159783e57c46697eac82f170dc8c','format':'iframe','height':250,'width':300,'params':{}};";
    const invoke = document.createElement("script");
    invoke.src = "https://www.highperformanceformat.com/c55b159783e57c46697eac82f170dc8c/invoke.js";
    invoke.async = true;
    container.appendChild(cfg);
    container.appendChild(invoke);
  }, []);
  return (
    <div className="my-6 flex justify-center">
      <div ref={ref} style={{ width: 300, height: 250 }} />
    </div>
  );
};


const toolDescriptions: Record<string, {
  about: string;
  howTo: string[];
  whyUse: string;
  formats: string;
  faqs: { q: string; a: string }[];
}> = {
  "png-to-webp": {
    about: "Convert PNG images to WebP format and reduce file size by up to 80% with no visible quality loss. WebP is the modern image format recommended by Google for faster-loading websites and better SEO scores. Our converter runs entirely in your browser — your files are never uploaded to any server.",
    howTo: [
      "Click the upload area or drag and drop your PNG files — up to 10 files at once",
      "Adjust the quality slider (80% is recommended for the best balance of size and clarity)",
      "Click 'Convert Files' and your WebP images download automatically"
    ],
    whyUse: "WebP images load 2–3× faster than PNG on websites, directly improving your Google PageSpeed score, Core Web Vitals, and user experience. Switching to WebP is one of the easiest wins for web performance.",
    formats: "Input: .png — Output: .webp",
    faqs: [
      { q: "Is PNG to WebP conversion lossless?", a: "WebP supports both lossy and lossless modes. At 100% quality the output is visually lossless. At 80% (our default) the difference is invisible to the human eye while the file is significantly smaller." },
      { q: "Will my PNG transparency be preserved?", a: "Yes. WebP fully supports transparency (alpha channel), so any transparent areas in your PNG will be preserved perfectly in the WebP output." },
      { q: "How much smaller will my files be?", a: "Typically 25–80% smaller depending on the image content. Photographs compress more than screenshots or illustrations." },
      { q: "Do my files get uploaded to your server?", a: "No. This tool runs entirely in your browser using the Canvas API. Your images never leave your device." }
    ]
  },
  "jpg-to-webp": {
    about: "Convert JPG and JPEG photos to WebP format for significantly smaller file sizes without any perceptible quality loss. Perfect for web developers, bloggers, and e-commerce store owners who want faster-loading product images. The entire conversion happens locally in your browser.",
    howTo: [
      "Upload one or more JPG or JPEG files — bulk convert up to 10 images at once",
      "Set your preferred quality level using the slider",
      "Click Convert and download your smaller, faster WebP images"
    ],
    whyUse: "JPG to WebP conversion typically reduces file size by 25–35% at equivalent visual quality. For a page with 10 product images, that could mean saving several megabytes of bandwidth per visitor — resulting in faster load times and lower hosting costs.",
    formats: "Input: .jpg, .jpeg — Output: .webp",
    faqs: [
      { q: "What quality setting should I use?", a: "80% is the sweet spot for most use cases — near-identical to the original JPG with 30–40% smaller file size. Use 90%+ for professional photography where quality is critical." },
      { q: "Can I convert multiple JPGs at once?", a: "Yes, upload up to 10 JPG files at once and they will all be converted and downloaded individually." },
      { q: "Do browsers support WebP?", a: "Yes. WebP is supported by all modern browsers including Chrome, Firefox, Safari (since 2020), and Edge. Over 95% of global users can view WebP images." },
      { q: "Is there a file size limit?", a: "The free plan supports files up to 50MB each. In practice, most JPG photos are well under this limit." }
    ]
  },
  "webp-to-png": {
    about: "Convert WebP images back to standard PNG format for maximum compatibility. While WebP is excellent for the web, PNG is still required for many design tools like Photoshop, Figma, Canva, social media platforms, and older software that does not yet support WebP. Convert instantly in your browser with no quality loss.",
    howTo: [
      "Upload your WebP image files (up to 10 at once)",
      "No settings needed — PNG conversion is always lossless",
      "Click Convert and download your PNG files, ready for any application"
    ],
    whyUse: "PNG is the universally accepted image format supported across every platform, operating system, design tool, and content management system. When you need guaranteed compatibility — for client deliverables, social media, or legacy software — PNG is the safe choice.",
    formats: "Input: .webp — Output: .png",
    faqs: [
      { q: "Will there be any quality loss converting WebP to PNG?", a: "No. PNG uses lossless compression, so the conversion from WebP to PNG preserves every pixel of the original image with zero quality degradation." },
      { q: "Why would I convert WebP to PNG?", a: "Common reasons include: editing in Photoshop or Figma (which may not handle WebP), uploading to platforms that only accept PNG/JPG, sharing with clients who need standard formats, or archiving images." },
      { q: "Will transparency be preserved?", a: "Yes. Both WebP and PNG support transparency. Any transparent areas in your WebP image will be retained in the PNG output." },
      { q: "How long does the conversion take?", a: "Instantly — the conversion happens in your browser in milliseconds. Even large images typically convert in under a second." }
    ]
  },
  "compress-image": {
    about: "Reduce image file sizes by 50–80% without any visible quality loss using smart browser-based compression. Supports PNG, JPG, JPEG, and WebP formats. Ideal for optimizing images before uploading to websites, WordPress, Shopify, email newsletters, or social media to improve loading speed.",
    howTo: [
      "Upload up to 10 images at once — PNG, JPG, or WebP are all supported",
      "Use the quality slider to control compression — 70–80% gives the best balance",
      "Download your compressed images; each file shows the new smaller size"
    ],
    whyUse: "Unoptimized images are the single biggest cause of slow websites. Smaller images mean faster page loads, lower bandwidth costs, better Google PageSpeed scores, and improved SEO rankings. Most images can be compressed by 50–70% with no visible difference whatsoever.",
    formats: "Input: .png, .jpg, .jpeg, .webp — Output: same format",
    faqs: [
      { q: "How much can I reduce my image file size?", a: "It depends on the image and quality setting. At 80% quality, most photos compress by 40–60%. Screenshots and graphics with flat colors may compress even more." },
      { q: "Which quality setting should I choose?", a: "For websites and blogs: 75–80%. For social media: 80–85%. For email: 70%. For print or professional use: 90%+." },
      { q: "Does compression affect image dimensions?", a: "No. Compression only reduces the file size — the width, height, and resolution of your image remain exactly the same." },
      { q: "What formats are supported?", a: "PNG, JPG, JPEG, and WebP. All four formats can be uploaded and compressed in a single batch." }
    ]
  },
  "resize-image": {
    about: "Resize images to any custom pixel dimensions instantly in your browser with no server upload required. Set a specific width, height, or both — Convertly automatically maintains aspect ratio when only one dimension is specified. Supports bulk resizing of up to 10 images at once.",
    howTo: [
      "Upload your images — PNG, JPG, or WebP",
      "Enter your target width and/or height in pixels",
      "Leave one dimension empty to auto-scale and preserve the original aspect ratio",
      "Click Convert and download your perfectly resized images"
    ],
    whyUse: "Every platform has specific image size requirements: WordPress featured images, Shopify product photos, Twitter header images, LinkedIn banners, YouTube thumbnails. Resizing to the exact required dimensions ensures your images look sharp and load fast on every platform.",
    formats: "Input: .png, .jpg, .webp — Output: any pixel dimensions",
    faqs: [
      { q: "Will resizing maintain my image's aspect ratio?", a: "If you enter only a width or only a height, the other dimension is calculated automatically to maintain the original aspect ratio. Enter both to force exact dimensions." },
      { q: "Can I make an image larger (upscale)?", a: "Yes, but upscaling beyond the original resolution will result in a blurry image since there is no new pixel data to add. For upscaling, a dedicated AI upscaler tool is recommended." },
      { q: "What is the maximum output resolution?", a: "There is no hard limit — you can resize to any dimensions. However, very large outputs may take a few seconds to process in the browser." },
      { q: "Can I resize multiple images to the same dimensions?", a: "Yes. Upload up to 10 images and set your dimensions once — all images will be resized to those same dimensions in one click." }
    ]
  },
  "rotate-image": {
    about: "Rotate images 90°, 180°, or 270° clockwise instantly in your browser. Fix incorrectly oriented photos taken on a phone or camera, prepare images for printing in the correct orientation, or adjust image rotation for any platform or publication. Supports bulk rotation of up to 10 images at once.",
    howTo: [
      "Upload your images — PNG, JPG, or WebP (up to 10 files at once)",
      "Select the rotation angle: 90°, 180°, or 270° clockwise",
      "Click Convert and download your correctly oriented images"
    ],
    whyUse: "Smartphones and cameras sometimes save photos with incorrect orientation metadata, causing them to appear sideways or upside down on other devices and platforms. Rotating and re-saving the image fixes the orientation permanently regardless of the viewer application.",
    formats: "Input: .png, .jpg, .webp — Output: .png, .jpg, or .webp",
    faqs: [
      { q: "Why do my phone photos appear sideways?", a: "Phones save orientation as metadata (EXIF data) rather than rotating the actual pixels. Some applications ignore this metadata and display the image in its raw orientation. Rotating and re-saving bakes the correct orientation into the pixels themselves." },
      { q: "Will rotating reduce image quality?", a: "No. Rotation is a lossless operation — the pixels are rearranged geometrically without any recompression at the rotation step itself." },
      { q: "Can I rotate counterclockwise?", a: "Yes — rotating 270° clockwise is equivalent to rotating 90° counterclockwise." },
      { q: "Is there a limit on how many images I can rotate at once?", a: "You can rotate up to 10 images in a single batch, all at the same angle." }
    ]
  },
  "png-to-jpg": {
    about: "Convert PNG images to JPG format to dramatically reduce file size. JPG is the ideal format for photographs, social media images, and any image where a transparent background is not required. The conversion runs entirely in your browser — no files are uploaded to any server.",
    howTo: [
      "Upload your PNG files — up to 10 at once",
      "Adjust the quality slider to balance file size and image clarity",
      "Click Convert and download your smaller JPG files"
    ],
    whyUse: "JPG files are typically 5–10× smaller than PNG files for photographic content. If your PNG images do not have transparent backgrounds, converting to JPG can dramatically reduce file sizes and speed up your website or reduce email attachment sizes.",
    formats: "Input: .png — Output: .jpg",
    faqs: [
      { q: "Will I lose transparency when converting PNG to JPG?", a: "Yes. JPG does not support transparency. Any transparent areas in your PNG will be filled with a white background in the JPG output. If transparency is important, keep the PNG format." },
      { q: "How much smaller will my JPG be compared to PNG?", a: "For photographs: 5–10× smaller. For graphics, logos, and screenshots with flat colors, the reduction is less significant." },
      { q: "What quality should I choose?", a: "80% is recommended for web use — visually identical to the original at a fraction of the size. Use 90%+ for professional photography." },
      { q: "Can I convert PNG to JPG in bulk?", a: "Yes — upload up to 10 PNG files at once and they all convert and download in seconds." }
    ]
  },
  "jpg-to-png": {
    about: "Convert JPG images to PNG format for lossless quality and full transparency support. PNG is the professional standard for logos, graphics, screenshots, and any image that requires a crisp, pixel-perfect result. Convert instantly in your browser with zero quality loss.",
    howTo: [
      "Upload your JPG or JPEG files — up to 10 at once",
      "No quality settings needed — PNG conversion is always lossless",
      "Download your high-quality PNG files"
    ],
    whyUse: "PNG uses lossless compression, preserving every pixel of your original image without the compression artifacts that JPG introduces. Use PNG when you need the highest quality for design work, when editing images that will be re-saved multiple times, or when uploading to platforms that require PNG.",
    formats: "Input: .jpg, .jpeg — Output: .png",
    faqs: [
      { q: "Will converting JPG to PNG improve quality?", a: "No — PNG preserves the existing quality of your JPG without adding artifacts, but it cannot recover quality that was already lost during JPG compression. The PNG will be a perfect copy of what your JPG looks like now." },
      { q: "Why is the PNG file larger than the original JPG?", a: "PNG is a lossless format, so it stores more pixel data than a compressed JPG. The larger file size reflects the higher fidelity of the lossless format." },
      { q: "When should I use PNG instead of JPG?", a: "Use PNG for logos, illustrations, screenshots, UI mockups, and images with text or sharp edges. Use JPG for photographs and social media where smaller file size matters more." },
      { q: "Does JPG to PNG add a transparent background?", a: "No. JPG does not have transparency data, so the PNG output will have the same opaque background as the original JPG." }
    ]
  },
  "crop-image": {
    about: "Crop images to exact pixel dimensions directly in your browser. Choose from popular presets including 1:1 square for Instagram, 16:9 widescreen for YouTube and presentations, 4:3 classic for general use, or enter completely custom crop dimensions. Your files never leave your device.",
    howTo: [
      "Upload your image file",
      "Select a quick preset (Square 1:1, Landscape 16:9, Portrait 9:16, Classic 4:3) or enter custom pixel dimensions",
      "Click Convert and download your cropped image"
    ],
    whyUse: "Every social media platform, website, and publication has specific image dimension requirements. Instagram requires square images, YouTube thumbnails are 16:9, and LinkedIn profile photos must be square. Cropping to the exact required ratio ensures your images always look professional.",
    formats: "Input: .png, .jpg, .webp — Output: cropped .png, .jpg, or .webp",
    faqs: [
      { q: "What does the crop start from?", a: "The crop starts from the top-left corner (0,0) of the image. Enter your desired output width and height and the tool will crop from that origin." },
      { q: "What are the preset sizes?", a: "1:1 Square (500×500px) for Instagram and profile photos; 4:3 Classic (800×600px) for general use; 16:9 Wide (1280×720px) for YouTube, presentations, and desktop wallpapers; 9:16 Story (720×1280px) for Instagram and TikTok stories." },
      { q: "Can I crop a larger area than the original image?", a: "No — the crop dimensions are automatically capped at the original image's width and height to prevent errors." },
      { q: "Will cropping reduce image quality?", a: "No. Cropping is a lossless geometric operation. The pixels within the cropped area are unchanged." }
    ]
  },
};

export const ToolPage = () => {
  const { toolId } = useParams();
  const [files, setFiles] = useState<File[]>([] as File[]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  const [resizeWidth, setResizeWidth] = useState<string>("");
  const [resizeHeight, setResizeHeight] = useState<string>("");
  const [quality, setQuality] = useState<number>(80);
  const [rotationAngle, setRotationAngle] = useState<string>("90");
  const [targetImageFormat, setTargetImageFormat] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Drag-crop state
  type CropRect = { x: number; y: number; w: number; h: number };
  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const cropImgRef = useRef<HTMLImageElement | null>(null);
  const cropContainerRef = useRef<HTMLDivElement | null>(null);
  // Natural image dimensions for scaling
  const imgNaturalSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  React.useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  // Convert display rect → actual image pixel coords
  const toImageCoords = useCallback((rect: CropRect): CropRect => {
    const el = cropImgRef.current;
    if (!el) return rect;
    const scaleX = imgNaturalSize.current.w / el.offsetWidth;
    const scaleY = imgNaturalSize.current.h / el.offsetHeight;
    return { x: rect.x * scaleX, y: rect.y * scaleY, w: rect.w * scaleX, h: rect.h * scaleY };
  }, []);

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent, container: HTMLDivElement) => {
    const bounds = container.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.max(0, Math.min(clientX - bounds.left, bounds.width)),
      y: Math.max(0, Math.min(clientY - bounds.top, bounds.height)),
    };
  };

  const onCropMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const container = cropContainerRef.current;
    if (!container) return;
    const pos = getPointerPos(e, container);
    dragStart.current = pos;
    setCropRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
    setIsDragging(true);
  };

  const onCropMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !dragStart.current) return;
    e.preventDefault();
    const container = cropContainerRef.current;
    if (!container) return;
    const pos = getPointerPos(e, container);
    const x = Math.min(pos.x, dragStart.current.x);
    const y = Math.min(pos.y, dragStart.current.y);
    const w = Math.abs(pos.x - dragStart.current.x);
    const h = Math.abs(pos.y - dragStart.current.y);
    setCropRect({ x, y, w, h });
  };

  const onCropMouseUp = () => {
    setIsDragging(false);
    dragStart.current = null;
  };

  const toolName = toolId?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const isSingleFileTool = toolId === "crop-image";
  const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const buildEndpoint = (path: string) => apiBaseUrl ? `${apiBaseUrl}${path}` : path;
  const toolInfo = toolDescriptions[toolId || ""];

  const getTargetFormat = () => {
    if (targetImageFormat) return targetImageFormat;
    if (toolId === "resize-image" || toolId === "rotate-image" || toolId === "crop-image") return "";
    if (toolId?.includes("-to-")) return toolId.split("-to-")[1];
    return "webp";
  };
  const targetFormat = getTargetFormat();

  const getAcceptType = () => {
    if (toolId?.includes("-to-")) {
      const source = toolId.split("-to-")[0];
      const sourceMap: Record<string, string> = {
        webp: ".webp", png: ".png", jpg: ".jpg,.jpeg",
        jpeg: ".jpg,.jpeg", gif: ".gif",
      };
      return sourceMap[source] || "image/*";
    }
    return "image/*";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const chosen: File[] = Array.from(e.target.files);
      const newFiles = isSingleFileTool ? chosen.slice(0, 1) : chosen.slice(0, 10);
      const uniqueFileId = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
      const existingIds = new Set(files.map(uniqueFileId));
      const filtered = newFiles.filter(f => {
        const id = uniqueFileId(f);
        if (existingIds.has(id)) return false;
        existingIds.add(id);
        return true;
      });
      if (filtered.length === 0) { setError("File already in queue."); e.target.value = ""; return; }
      setFiles(prev => isSingleFileTool ? filtered.slice(0, 1) : [...prev, ...filtered].slice(0, 10));
      setError(null); setIsComplete(false);
      const firstImg = filtered.find(f => f.type.startsWith("image/"));
      if (firstImg) setPreviewUrl(URL.createObjectURL(firstImg));
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const chosen: File[] = Array.from(e.dataTransfer.files);
    const newFiles = isSingleFileTool ? chosen.slice(0, 1) : chosen.slice(0, 10);
    setFiles(prev => isSingleFileTool ? newFiles : [...prev, ...newFiles].slice(0, 10));
    setError(null); setIsComplete(false);
    const first = newFiles[0] as File;
    if (first?.type.startsWith("image/")) setPreviewUrl(URL.createObjectURL(first));
  };

  const removeFile = (i: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
    if (i === 0) setPreviewUrl(null);
  };

  const handleConvertImages = async () => {
    if (!files.length) return;
    setIsUploading(true); setProgress(10); setError(null);
    try {
      const imgCoords = cropRect ? toImageCoords(cropRect) : null;
      const options = {
        targetFormat, quality, width: resizeWidth, height: resizeHeight, rotationAngle,
        cropX: imgCoords?.x, cropY: imgCoords?.y,
        cropWidth: imgCoords?.w, cropHeight: imgCoords?.h,
      };
      const results: { blob: Blob; name: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        setProgress(Math.round(10 + (70 * i) / files.length));
        const blob = await convertImageClientSide(files[i] as File, toolId || "", options);
        const ext = getOutputExtension(toolId || "", targetFormat, files[i] as File);
        results.push({ blob, name: `converted-${(files[i] as File).name.split(".")[0]}.${ext}` });
      }
      setProgress(90);
      for (const r of results) {
        const url = URL.createObjectURL(r.blob);
        const a = document.createElement("a");
        a.href = url; a.download = r.name;
        document.body.appendChild(a); a.click();
        URL.revokeObjectURL(url); document.body.removeChild(a);
        await new Promise(res => setTimeout(res, 200));
      }
      setProgress(100); setIsComplete(true); setFiles([]); setPreviewUrl(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed. Please try again.");
    } finally { setIsUploading(false); }
  };

  const handleConvertVideo = async () => {
    if (!files.length) return;
    setIsUploading(true); setProgress(10); setError(null);
    const formData = new FormData();
    files.forEach(f => formData.append("files", f));
    formData.append("targetFormat", targetFormat);
    formData.append("toolId", toolId || "");
    try {
      setProgress(30);
      const response = await fetch(buildEndpoint("/api/convert/video"), { method: "POST", body: formData });
      if (!response.ok) { const e = await response.json().catch(() => ({})); throw new Error(e.error || "Video conversion failed."); }
      setProgress(80);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `converted-${files[0].name.split(".")[0]}.${targetFormat}`;
      document.body.appendChild(a); a.click(); URL.revokeObjectURL(url); document.body.removeChild(a);
      setProgress(100); setIsComplete(true); setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally { setIsUploading(false); }
  };

  const handleConvert = () => handleConvertImages();

  const handleConvertSingle = async (index: number) => {
    const file = files[index] as File;
    if (!file) return;
    setIsUploading(true); setProgress(10); setError(null);
    try {
      const imgCoords = cropRect ? toImageCoords(cropRect) : null;
      const options = {
        targetFormat, quality, width: resizeWidth, height: resizeHeight, rotationAngle,
        cropX: imgCoords?.x, cropY: imgCoords?.y,
        cropWidth: imgCoords?.w, cropHeight: imgCoords?.h,
      };
      setProgress(40);
      const blob = await convertImageClientSide(file, toolId || "", options);
      setProgress(80);
      const ext = getOutputExtension(toolId || "", targetFormat, file);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `converted-${file.name.split(".")[0]}.${ext}`;
      document.body.appendChild(a); a.click(); URL.revokeObjectURL(url); document.body.removeChild(a);
      setProgress(100); setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally { setIsUploading(false); }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-orange-600 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </Link>

      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">{toolName}</h1>
        {toolInfo && (
          <p className="mt-4 text-lg text-zinc-600 leading-relaxed max-w-2xl">
            {toolInfo.about.split(".")[0]}.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { icon: Shield, text: "Files never leave your device" },
            { icon: Zap, text: "Instant browser conversion" },
            { icon: Globe, text: "100% free, no account needed" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
              <Icon className="h-3 w-3 text-orange-600" /> {text}
            </span>
          ))}
        </div>
      </motion.div>
      {/* Ad slot above tool */}
      <AdBanner300 />

      {/* Upload Card */}
      <div className="rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 sm:p-12 transition-all hover:border-orange-600/50 shadow-sm">
        {files.length === 0 ? (
          <label
            className="flex flex-col items-center justify-center gap-4 cursor-pointer py-12"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-zinc-200">
              <Upload className="h-10 w-10 text-orange-600" />
            </motion.div>
            <div className="text-center">
              <p className="text-xl font-bold text-zinc-900">Click or drag files to upload</p>
              <p className="text-sm text-zinc-500 mt-1">
                Up to 10 files · Converted in your browser · 100% private
              </p>
              {toolInfo && <p className="text-xs text-zinc-400 mt-1">{toolInfo.formats}</p>}
            </div>
            <input type="file" className="hidden" {...(isSingleFileTool ? {} : { multiple: true })} onChange={onFileChange} accept={getAcceptType()} />
          </label>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
              <AnimatePresence mode="popLayout">
                {files.map((file, idx) => (
                  <motion.div key={`${file.name}-${idx}`}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-zinc-200 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <FileIcon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-900 truncate max-w-[150px] sm:max-w-md">{file.name}</span>
                        <span className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleConvertSingle(idx)} disabled={isUploading}
                        className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors disabled:opacity-50">
                        <Download className="h-4 w-4 inline-block mr-1" />Download
                      </button>
                      <button onClick={() => removeFile(idx)}
                        className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-red-600 transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {!isSingleFileTool && files.length < 10 && (
              <label className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-200 p-4 cursor-pointer hover:bg-white hover:border-orange-600/30 transition-all">
                <Files className="h-5 w-5 text-zinc-400" />
                <span className="text-sm font-bold text-zinc-600">Add more files ({files.length}/10)</span>
                <input type="file" className="hidden" multiple onChange={onFileChange} accept={getAcceptType()} />
              </label>
            )}

            <AnimatePresence>
              {isUploading && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 pt-4 border-t border-zinc-200">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-zinc-600">Processing {files.length} file{files.length > 1 ? "s" : ""}...</span>
                    <span className="text-orange-600">{progress}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-200">
                    <motion.div className="h-full bg-orange-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", bounce: 0, duration: 0.5 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 ring-1 ring-red-600/20">
                <AlertCircle className="h-5 w-5" />{error}
              </motion.div>
            )}

            {isComplete && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-600 ring-1 ring-green-600/20">
                <CheckCircle2 className="h-5 w-5" />
                Conversion successful! Your {files.length > 1 ? "files are" : "file is"} downloading now.
              </motion.div>
            )}

            {/* Tool Options */}
            {!isUploading && !isComplete && (
              <div className="space-y-6 pt-4 border-t border-zinc-200">
                {(toolId === "resize-image" || toolId === "rotate-image" || toolId === "crop-image" || toolId === "compress-image") && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-900 ml-2">Output Format</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["", "webp", "png", "jpg"].map((fmt) => (
                        <button key={fmt} onClick={() => setTargetImageFormat(fmt)}
                          className={`rounded-xl border py-2 text-xs font-bold transition-all ${targetImageFormat === fmt ? "border-orange-600 bg-orange-50 text-orange-600" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"}`}>
                          {fmt === "" ? "Original" : fmt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {toolId === "resize-image" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-900 ml-2">Width (px)</label>
                      <input type="number" value={resizeWidth} onChange={(e) => setResizeWidth(e.target.value)} placeholder="Auto"
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-900 ml-2">Height (px)</label>
                      <input type="number" value={resizeHeight} onChange={(e) => setResizeHeight(e.target.value)} placeholder="Auto"
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none shadow-sm" />
                    </div>
                  </div>
                )}

                {toolId === "rotate-image" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-900 ml-2">Rotation Direction</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { angle: "90",  label: "90° Right",   icon: <RotateCw className="h-5 w-5" /> },
                        { angle: "180", label: "Flip 180°",   icon: <RefreshCw className="h-5 w-5" /> },
                        { angle: "270", label: "90° Left",    icon: <RotateCw className="h-5 w-5 scale-x-[-1]" /> },
                      ].map(({ angle, label, icon }) => (
                        <button key={angle} onClick={() => setRotationAngle(angle)}
                          className={`flex flex-col items-center gap-1.5 rounded-2xl border py-3 px-2 text-xs font-bold transition-all ${
                            rotationAngle === angle ? "border-orange-600 bg-orange-50 text-orange-600" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                          }`}>
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {toolId === "crop-image" && (
                  <div className="space-y-4">
                    {previewUrl && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-bold text-zinc-900 ml-2">Drag to select crop area</label>
                          {cropRect && cropRect.w > 2 && cropRect.h > 2 && (
                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                              {Math.round(toImageCoords(cropRect).w)} × {Math.round(toImageCoords(cropRect).h)} px
                            </span>
                          )}
                        </div>
                        <div
                          ref={cropContainerRef}
                          className="relative overflow-hidden rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-100 cursor-crosshair select-none"
                          style={{ touchAction: "none" }}
                          onMouseDown={onCropMouseDown}
                          onMouseMove={onCropMouseMove}
                          onMouseUp={onCropMouseUp}
                          onMouseLeave={onCropMouseUp}
                          onTouchStart={onCropMouseDown}
                          onTouchMove={onCropMouseMove}
                          onTouchEnd={onCropMouseUp}
                        >
                          <img
                            ref={cropImgRef}
                            src={previewUrl}
                            alt="Crop preview"
                            className="block w-full max-h-[360px] object-contain pointer-events-none"
                            onLoad={(e) => {
                              const el = e.currentTarget;
                              imgNaturalSize.current = { w: el.naturalWidth, h: el.naturalHeight };
                            }}
                            draggable={false}
                          />
                          {/* Dark overlay outside selection */}
                          {cropRect && cropRect.w > 2 && cropRect.h > 2 && (
                            <>
                              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                              <div
                                className="absolute border-2 border-white shadow-lg pointer-events-none"
                                style={{
                                  left: cropRect.x, top: cropRect.y,
                                  width: cropRect.w, height: cropRect.h,
                                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)",
                                }}
                              >
                                {/* Rule-of-thirds grid lines */}
                                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                                  {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="border border-white/30" />
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                          {(!cropRect || cropRect.w <= 2) && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="text-xs font-bold text-zinc-500 bg-white/80 px-3 py-1.5 rounded-full">
                                Click and drag to select crop area
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs font-bold text-zinc-500 ml-2 self-center">Presets:</span>
                          {[
                            { label: "1:1", ratio: 1 / 1 },
                            { label: "4:3", ratio: 4 / 3 },
                            { label: "16:9", ratio: 16 / 9 },
                            { label: "9:16", ratio: 9 / 16 },
                          ].map((p) => (
                            <button key={p.label}
                              onClick={() => {
                                const el = cropImgRef.current;
                                if (!el) return;
                                const dispW = el.offsetWidth;
                                const dispH = el.offsetHeight;
                                let w = dispW * 0.8;
                                let h = w / p.ratio;
                                if (h > dispH * 0.8) { h = dispH * 0.8; w = h * p.ratio; }
                                const x = (dispW - w) / 2;
                                const y = (dispH - h) / 2;
                                setCropRect({ x, y, w, h });
                              }}
                              className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-600 hover:bg-orange-100 hover:text-orange-600 transition-all">
                              {p.label}
                            </button>
                          ))}
                          {cropRect && (
                            <button onClick={() => setCropRect(null)}
                              className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-500 hover:bg-red-100 transition-all">
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(toolId === "compress-image" || toolId?.includes("-to-") || toolId === "resize-image" || toolId === "rotate-image" || toolId === "crop-image") && (() => {
                  // Determine if output is PNG (lossless — quality slider not applicable)
                  const outFmt = targetImageFormat || (toolId?.includes("-to-") ? toolId.split("-to-")[1] : "");
                  const isPngOut = outFmt === "png" || toolId === "jpg-to-png" || toolId === "webp-to-png";
                  return isPngOut ? (
                    <div className="rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs font-bold text-zinc-500">
                      PNG output is always lossless — no quality compression applied.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between ml-2">
                        <label className="text-sm font-bold text-zinc-900">Quality: {quality}%</label>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                          {quality > 80 ? "Best Quality" : quality > 50 ? "Balanced" : "Smallest Size"}
                        </span>
                      </div>
                      <input type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-zinc-200">
              <button onClick={() => { setFiles([]); setPreviewUrl(null); setIsComplete(false); setError(null); }} disabled={isUploading}
                className="flex-1 rounded-full border border-zinc-200 py-4 text-lg font-bold text-zinc-600 transition-all hover:bg-white hover:text-zinc-900 disabled:opacity-50">
                Clear All
              </button>
              <button onClick={handleConvert} disabled={isUploading}
                className="flex-[2] flex items-center justify-center gap-2 rounded-full bg-orange-600 py-4 text-lg font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
                {isUploading ? <><Loader2 className="h-6 w-6 animate-spin" />Processing...</>
                  : isComplete ? <><Download className="h-6 w-6" />Convert Again</>
                  : <>Convert {files.length} {files.length === 1 ? "File" : "Files"}</>}
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Ad slot below tool */}
      <AdBanner300 />

      {/* SEO Content Section */}
      {toolInfo && (
        <div className="mt-16 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 mb-4">What is {toolName}?</h2>
            <div className="rounded-3xl bg-zinc-50 border border-zinc-100 p-8">
              <p className="text-zinc-600 leading-relaxed text-base font-medium">{toolInfo.about}</p>
              <p className="mt-4 inline-block rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600 border border-orange-100">
                {toolInfo.formats}
              </p>
            </div>
          </section>

          {/* How to use */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 mb-4">How to use {toolName}</h2>
            <div className="rounded-3xl bg-white border border-zinc-100 p-8 shadow-sm">
              <ol className="space-y-6">
                {toolInfo.howTo.map((step, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white text-sm font-black shadow-md shadow-orange-600/20">
                      {i + 1}
                    </span>
                    <p className="text-zinc-600 font-medium pt-1.5 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Why use */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 mb-4">Why use Convertly for {toolName}?</h2>
            <div className="rounded-3xl bg-orange-50 border border-orange-100 p-8">
              <p className="text-zinc-700 leading-relaxed font-medium mb-6">{toolInfo.whyUse}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "100% free — no account or credit card required",
                  "Files never leave your device — complete privacy",
                  "Bulk convert up to 10 files at once",
                  "No watermarks added to converted files",
                  "Works on any device — mobile, tablet, or desktop",
                  "No software to install — works in your browser"
                ].map(point => (
                  <li key={point} className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                    <span className="h-2 w-2 rounded-full bg-orange-600 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          {/* Mid-content ad */}
          <AdBanner300 />

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 mb-6">
              Frequently Asked Questions about {toolName}
            </h2>
            <div className="space-y-4">
              {toolInfo.faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl bg-white border border-zinc-100 p-6 shadow-sm">
                  <h3 className="text-base font-black text-zinc-900 mb-2">{faq.q}</h3>
                  <p className="text-zinc-600 font-medium leading-relaxed text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy note */}
          <section className="rounded-3xl bg-zinc-900 p-8 text-center">
            <Shield className="h-10 w-10 text-orange-600 mx-auto mb-4" />
            <h2 className="text-xl font-black text-white mb-3">Your Privacy is Guaranteed</h2>
            <p className="text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto text-sm">
              Convertly processes all image conversions directly in your browser using the Canvas API.
              Your files are <strong className="text-white">never uploaded to any server</strong>, never stored, 
              and never shared. The conversion happens entirely on your own device — we never see your files.
            </p>
          </section>
        </div>
      )}

      {/* How it works steps */}
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {[
          { num: "1", title: "Upload Files", desc: "Select up to 10 images. PNG, JPG, WebP and more are all supported.", color: "bg-orange-50 text-orange-600" },
          { num: "2", title: "Instant Processing", desc: "Converted instantly in your browser — no upload, zero wait, complete privacy.", color: "bg-blue-50 text-blue-600" },
          { num: "3", title: "Download Instantly", desc: "Your converted files download automatically the moment processing completes.", color: "bg-green-50 text-green-600" },
        ].map(({ num, title, desc, color }) => (
          <motion.div key={num} whileHover={{ y: -5 }} className="text-center p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm">
            <div className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${color} font-black text-xl`}>{num}</div>
            <h3 className="font-bold text-zinc-900 mb-3 text-lg">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};