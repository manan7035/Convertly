import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlan } from "../App";
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
  Files
} from "lucide-react";
import { convertImageClientSide, isImageTool, getOutputExtension } from "../utils/clientConvert";

export const ToolPage = () => {
  const { toolId } = useParams();
  const { plan } = usePlan();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  const [resizeWidth, setResizeWidth] = useState<string>("");
  const [resizeHeight, setResizeHeight] = useState<string>("");
  const [quality, setQuality] = useState<number>(80);
  const [rotationAngle, setRotationAngle] = useState<string>("90");
  const [cropWidth, setCropWidth] = useState<string>("500");
  const [cropHeight, setCropHeight] = useState<string>("500");
  const [targetImageFormat, setTargetImageFormat] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const toolName = toolId?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const isSingleFileTool = toolId === "video-to-mp4" || toolId === "extract-audio" || toolId === "crop-image";

  // API URL for video tools only — image tools run in-browser
  const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const buildEndpoint = (path: string) => apiBaseUrl ? `${apiBaseUrl}${path}` : path;
  
  const getTargetFormat = () => {
    if (toolId === "extract-audio") return "mp3";
    if (toolId === "video-to-mp4") return "mp4";
    if (toolId === "video-to-gif") return "gif";
    if (targetImageFormat) return targetImageFormat;
    if (toolId === "resize-image" || toolId === "rotate-image" || toolId === "crop-image") return "";
    if (toolId?.includes("-to-")) return toolId.split("-to-")[1];
    return "webp";
  };

  const targetFormat = getTargetFormat();
  
  const getAcceptType = () => {
    if (toolId?.includes("video") || toolId === "extract-audio") return "video/*";
    if (toolId?.includes("pdf") || toolId?.includes("jpg-to-pdf")) return "application/pdf,image/*";
    if (toolId?.includes("-to-")) {
      const source = toolId.split("-to-")[0];
      const sourceMap: Record<string, string> = {
        webp: ".webp", png: ".png", jpg: ".jpg,.jpeg",
        jpeg: ".jpg,.jpeg", gif: ".gif", avif: ".avif",
        tiff: ".tiff,.tif", heif: ".heif,.heic",
      };
      return sourceMap[source] || "image/*";
    }
    return "image/*";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const chosen = Array.from(e.target.files);
      const newFiles = isSingleFileTool ? chosen.slice(0, 1) : chosen.slice(0, 10);

      const uniqueFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
      const existingIds = new Set(files.map(uniqueFileId));
      const filteredNewFiles = newFiles.filter((file) => {
        const id = uniqueFileId(file);
        if (existingIds.has(id)) return false;
        existingIds.add(id);
        return true;
      });

      if (filteredNewFiles.length === 0) {
        setError("This file is already in the upload queue.");
        e.target.value = "";
        return;
      }

      setFiles((prev) => {
        const combined = isSingleFileTool ? filteredNewFiles.slice(0, 1) : [...prev, ...filteredNewFiles];
        return isSingleFileTool ? combined : combined.slice(0, 10);
      });
      setError(null);
      setIsComplete(false);

      const firstFile = filteredNewFiles.find((file) => file.type.startsWith("image/"));
      if (firstFile) {
        const url = URL.createObjectURL(firstFile);
        setPreviewUrl(url);
      }
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const chosen = Array.from(e.dataTransfer.files);
      const newFiles = isSingleFileTool ? chosen.slice(0, 1) : chosen.slice(0, 10);
      setFiles(prev => {
        const combined = isSingleFileTool ? newFiles : [...prev, ...newFiles];
        return isSingleFileTool ? combined : combined.slice(0, 10);
      });
      setError(null);
      setIsComplete(false);
      const firstFile = newFiles[0];
      if (firstFile && firstFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(firstFile);
        setPreviewUrl(url);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (index === 0) setPreviewUrl(null);
  };

  // ─── CLIENT-SIDE image conversion (no server needed) ───────────────────────
  const handleConvertImages = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    setProgress(10);
    setError(null);

    try {
      const options = {
        targetFormat,
        quality,
        width: resizeWidth,
        height: resizeHeight,
        rotationAngle,
        cropWidth,
        cropHeight,
      };

      const results: { blob: Blob; name: string }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(Math.round(10 + (70 * i) / files.length));
        const blob = await convertImageClientSide(file, toolId || "", options);
        const ext = getOutputExtension(toolId || "", targetFormat, file);
        results.push({ blob, name: `converted-${file.name.split(".")[0]}.${ext}` });
      }

      setProgress(90);

      if (results.length === 1) {
        // Single file download
        const url = URL.createObjectURL(results[0].blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = results[0].name;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // Multiple files — download each individually (no server needed for zip)
        for (const result of results) {
          const url = URL.createObjectURL(result.blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = result.name;
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
          // Small delay between downloads to avoid browser blocking
          await new Promise(r => setTimeout(r, 200));
        }
      }

      setProgress(100);
      setIsComplete(true);
      setFiles([]);
      setPreviewUrl(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ─── SERVER-SIDE video conversion ──────────────────────────────────────────
  const handleConvertVideo = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    setProgress(10);
    setError(null);

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    formData.append("targetFormat", targetFormat);
    formData.append("toolId", toolId || "");

    const endpoint = buildEndpoint("/api/convert/video");

    try {
      setProgress(30);
      const response = await fetch(endpoint, { method: "POST", body: formData });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Video conversion failed. Please try again.");
      }
      setProgress(80);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted-${files[0].name.split(".")[0]}.${targetFormat}`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setProgress(100);
      setIsComplete(true);
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleConvert = () => {
    if (isImageTool(toolId || "")) {
      handleConvertImages();
    } else {
      handleConvertVideo();
    }
  };

  // Single file convert (per-file download button)
  const handleConvertSingle = async (index: number) => {
    const file = files[index];
    if (!file) return;
    setIsUploading(true);
    setProgress(10);
    setError(null);

    try {
      if (isImageTool(toolId || "")) {
        const options = { targetFormat, quality, width: resizeWidth, height: resizeHeight, rotationAngle, cropWidth, cropHeight };
        setProgress(40);
        const blob = await convertImageClientSide(file, toolId || "", options);
        setProgress(80);
        const ext = getOutputExtension(toolId || "", targetFormat, file);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `converted-${file.name.split(".")[0]}.${ext}`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const formData = new FormData();
        formData.append("files", file);
        formData.append("targetFormat", targetFormat);
        formData.append("toolId", toolId || "");
        setProgress(30);
        const response = await fetch(buildEndpoint("/api/convert/video"), { method: "POST", body: formData });
        if (!response.ok) throw new Error("Conversion failed. Please try again.");
        setProgress(80);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `converted-${file.name.split(".")[0]}.${targetFormat}`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
      setProgress(100);
      setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-orange-600 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">{toolName}</h1>
        <p className="mt-4 text-lg text-zinc-600">
          {isImageTool(toolId || "")
            ? "Fast, secure, in-browser conversion — your files never leave your device."
            : "Fast, secure, and high-quality video conversion."}
        </p>
      </motion.div>

      <div className="rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 sm:p-12 transition-all hover:border-orange-600/50 shadow-sm">
        {plan !== "Pro" && (
          <div className="mb-8 rounded-xl bg-white border border-zinc-100 p-3 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-300 mb-1">Advertisement</p>
            <div className="h-16 w-full flex items-center justify-center border border-dashed border-zinc-200 rounded-lg text-zinc-200 text-xs font-bold italic">
              Ad Space
            </div>
          </div>
        )}
        {files.length === 0 ? (
          <label 
            className="flex flex-col items-center justify-center gap-4 cursor-pointer py-12"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-zinc-200"
            >
              <Upload className="h-10 w-10 text-orange-600" />
            </motion.div>
            <div className="text-center">
              <p className="text-xl font-bold text-zinc-900">Click or drag files to upload</p>
              <p className="text-sm text-zinc-500 mt-1">
                {isImageTool(toolId || "")
                  ? "Up to 10 files • Processed in your browser — 100% private"
                  : "Single file • Max 50MB"}
              </p>
            </div>
            <input type="file" className="hidden" {...(isSingleFileTool ? {} : { multiple: true })} onChange={onFileChange} accept={getAcceptType()} />
          </label>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
              <AnimatePresence mode="popLayout">
                {files.map((file, idx) => (
                  <motion.div 
                    key={`${file.name}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-zinc-200 shadow-sm"
                  >
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
                      <button
                        onClick={() => handleConvertSingle(idx)}
                        disabled={isUploading}
                        className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors disabled:opacity-50"
                      >
                        <Download className="h-4 w-4 inline-block mr-1" />
                        Download
                      </button>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-red-600 transition-colors"
                      >
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
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 pt-4 border-t border-zinc-200"
                >
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-zinc-600">Processing {files.length} file{files.length > 1 ? "s" : ""}...</span>
                    <span className="text-orange-600">{progress}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-200">
                    <motion.div 
                      className="h-full bg-orange-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 ring-1 ring-red-600/20"
              >
                <AlertCircle className="h-5 w-5" />
                {error}
              </motion.div>
            )}

            {isComplete && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-600 ring-1 ring-green-600/20"
              >
                <CheckCircle2 className="h-5 w-5" />
                Conversion successful! Your {files.length > 1 ? "files are" : "file is"} ready.
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
                        <button
                          key={fmt}
                          onClick={() => setTargetImageFormat(fmt)}
                          className={`rounded-xl border py-2 text-xs font-bold transition-all ${
                            targetImageFormat === fmt
                              ? "border-orange-600 bg-orange-50 text-orange-600"
                              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                          }`}
                        >
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
                      <input 
                        type="number" value={resizeWidth}
                        onChange={(e) => setResizeWidth(e.target.value)}
                        placeholder="Auto"
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-900 ml-2">Height (px)</label>
                      <input 
                        type="number" value={resizeHeight}
                        onChange={(e) => setResizeHeight(e.target.value)}
                        placeholder="Auto"
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {toolId === "rotate-image" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-900 ml-2">Rotation Angle</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["90", "180", "270"].map((angle) => (
                        <button
                          key={angle}
                          onClick={() => setRotationAngle(angle)}
                          className={`rounded-2xl border py-3 text-sm font-bold transition-all ${
                            rotationAngle === angle
                              ? "border-orange-600 bg-orange-50 text-orange-600"
                              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                          }`}
                        >
                          {angle}°
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {toolId === "crop-image" && (
                  <div className="space-y-4">
                    {previewUrl && (
                      <div className="relative mx-auto max-w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 p-2">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase mb-2 text-center">Crop Preview</p>
                        <img src={previewUrl} alt="Preview" className="max-h-[300px] w-auto rounded-lg mx-auto" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-900 ml-2">Quick Presets</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "1:1 Square", w: "500", h: "500" },
                          { label: "4:3 Classic", w: "800", h: "600" },
                          { label: "16:9 Wide", w: "1280", h: "720" },
                          { label: "9:16 Story", w: "720", h: "1280" },
                        ].map((preset) => (
                          <button
                            key={preset.label}
                            onClick={() => { setCropWidth(preset.w); setCropHeight(preset.h); }}
                            className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold text-zinc-600 hover:bg-orange-100 hover:text-orange-600 transition-all"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-900 ml-2">Crop Width (px)</label>
                        <input type="number" value={cropWidth} onChange={(e) => setCropWidth(e.target.value)}
                          className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-900 ml-2">Crop Height (px)</label>
                        <input type="number" value={cropHeight} onChange={(e) => setCropHeight(e.target.value)}
                          className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {(toolId === "compress-image" || toolId?.includes("-to-") || toolId === "resize-image" || toolId === "rotate-image" || toolId === "crop-image") && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between ml-2">
                      <label className="text-sm font-bold text-zinc-900">Quality: {quality}%</label>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        {quality > 80 ? "Best Quality" : quality > 50 ? "Balanced" : "Smallest Size"}
                      </span>
                    </div>
                    <input type="range" min="1" max="100" value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-zinc-200">
              <button
                onClick={() => { setFiles([]); setPreviewUrl(null); setIsComplete(false); setError(null); }}
                disabled={isUploading}
                className="flex-1 rounded-full border border-zinc-200 py-4 text-lg font-bold text-zinc-600 transition-all hover:bg-white hover:text-zinc-900 disabled:opacity-50"
              >
                Clear All
              </button>
              <button
                onClick={handleConvert}
                disabled={isUploading}
                className="flex-[2] flex items-center justify-center gap-2 rounded-full bg-orange-600 py-4 text-lg font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isUploading ? (
                  <><Loader2 className="h-6 w-6 animate-spin" />Processing...</>
                ) : isComplete ? (
                  <><Download className="h-6 w-6" />Convert Again</>
                ) : (
                  <>Convert {files.length} {files.length === 1 ? "File" : "Files"}</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
        {[
          { num: "1", title: "Upload Files", desc: "Select up to 10 images. PNG, JPG, WebP and more supported.", color: "bg-orange-50 text-orange-600" },
          { num: "2", title: "Instant Processing", desc: isImageTool(toolId || "") ? "Converted right in your browser — no upload, zero wait." : "Our cloud servers process your video fast.", color: "bg-blue-50 text-blue-600" },
          { num: "3", title: "Instant Download", desc: "Get your converted files immediately — one click.", color: "bg-green-50 text-green-600" },
        ].map(({ num, title, desc, color }) => (
          <motion.div key={num} whileHover={{ y: -5 }} className="text-center p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm">
            <div className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${color} font-black text-xl`}>{num}</div>
            <h4 className="font-bold text-zinc-900 mb-3 text-lg">{title}</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};