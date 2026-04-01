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

export const ToolPage = () => {
  const { toolId } = useParams();
  const { plan } = usePlan();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Options state
  const [resizeWidth, setResizeWidth] = useState<string>("");
  const [resizeHeight, setResizeHeight] = useState<string>("");
  const [quality, setQuality] = useState<number>(80);
  const [rotationAngle, setRotationAngle] = useState<string>("90");
  const [cropX, setCropX] = useState<string>("0");
  const [cropY, setCropY] = useState<string>("0");
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
  
  const getTargetFormat = () => {
    if (toolId === "extract-audio") return "mp3";
    if (toolId === "video-to-mp4") return "mp4";
    if (toolId === "video-to-gif") return "gif";
    if (targetImageFormat) return targetImageFormat;
    if (toolId === "resize-image" || toolId === "rotate-image" || toolId === "crop-image") return "";
    if (toolId?.includes("-to-")) return toolId.split("-to-")[1];
    return "webp"; // Default for images
  };

  const targetFormat = getTargetFormat();
  
  const getAcceptType = () => {
    if (toolId?.includes("video") || toolId?.includes("extract-audio")) return "video/*";
    if (toolId?.includes("pdf") || toolId?.includes("jpg-to-pdf")) return "application/pdf,image/*";
    if (toolId?.includes("-to-")) {
      const source = toolId.split("-to-")[0];
      const sourceMap: Record<string, string> = {
        webp: ".webp",
        png: ".png",
        jpg: ".jpg,.jpeg",
        jpeg: ".jpg,.jpeg",
        gif: ".gif",
        avif: ".avif",
        tiff: ".tiff,.tif",
        heif: ".heif,.heic",
      };
      return sourceMap[source] || "image/*";
    }
    return "image/*";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const chosen = Array.from(e.target.files);
      const newFiles = isSingleFileTool ? chosen.slice(0, 1) : chosen.slice(0, 10); // Limit for tool type

      // Prevent exact duplicate file re-add (same name + size + timestamp + type)
      const uniqueFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
      const existingIds = new Set(files.map(uniqueFileId));
      const filteredNewFiles = newFiles.filter((file) => {
        const id = uniqueFileId(file);
        if (existingIds.has(id)) return false;
        existingIds.add(id);
        return true;
      });

      if (filteredNewFiles.length === 0) {
        setError("This file is already in the upload queue. Please clear and re-add if needed.");
        e.target.value = "";
        return;
      }

      setFiles((prev) => {
        const combined = isSingleFileTool ? filteredNewFiles.slice(0, 1) : [...prev, ...filteredNewFiles];
        return isSingleFileTool ? combined : combined.slice(0, 10);
      });
      setError(null);
      setIsComplete(false);

      // Create preview for the first new image file
      const firstFile = filteredNewFiles.find((file) => file.type.startsWith("image/"));
      if (firstFile) {
        const url = URL.createObjectURL(firstFile);
        setPreviewUrl(url);
      }

      // Reset input value so same file can be selected repeatedly
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

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setProgress(10);
    setError(null);

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    formData.append("targetFormat", targetFormat);
    formData.append("toolId", toolId || "");
    
    // Add options to formData
    if (toolId === "resize-image") {
      formData.append("width", resizeWidth);
      formData.append("height", resizeHeight);
    }
    if (toolId === "compress-image" || toolId?.includes("-to-") || toolId === "resize-image" || toolId === "rotate-image") {
      formData.append("quality", quality.toString());
    }
    if (toolId === "rotate-image") {
      formData.append("rotationAngle", rotationAngle);
    }
    if (toolId === "crop-image") {
      formData.append("cropX", "0");
      formData.append("cropY", "0");
      formData.append("cropWidth", cropWidth);
      formData.append("cropHeight", cropHeight);
    }

    const endpoint = toolId?.includes("video") || toolId?.includes("extract-audio") 
      ? "/api/convert/video" 
      : "/api/convert/image";
    
    try {
      setProgress(30);
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to convert files. Please try again.");
      }

      setProgress(80);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const downloadName = files.length === 1 
        ? `converted-${files[0].name.split(".")[0]}.${targetFormat || files[0].name.split(".").pop()}`
        : `convertly-bulk-${Date.now()}.zip`;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setProgress(100);
      setIsComplete(true);
      setFiles([]);
      setPreviewUrl(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleConvertSingle = async (index: number) => {
    const file = files[index];
    if (!file) return;

    setIsUploading(true);
    setProgress(10);
    setError(null);

    const formData = new FormData();
    formData.append("files", file);
    formData.append("targetFormat", targetFormat);
    formData.append("toolId", toolId || "");

    if (toolId === "resize-image") {
      formData.append("width", resizeWidth);
      formData.append("height", resizeHeight);
    }
    if (toolId === "compress-image" || toolId?.includes("-to-") || toolId === "resize-image" || toolId === "rotate-image") {
      formData.append("quality", quality.toString());
    }
    if (toolId === "rotate-image") {
      formData.append("rotationAngle", rotationAngle);
    }
    if (toolId === "crop-image") {
      formData.append("cropX", "0");
      formData.append("cropY", "0");
      formData.append("cropWidth", cropWidth);
      formData.append("cropHeight", cropHeight);
    }

    const endpoint = toolId?.includes("video") || toolId?.includes("extract-audio")
      ? "/api/convert/video"
      : "/api/convert/image";

    try {
      setProgress(30);
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to convert file. Please try again.");
      }

      setProgress(80);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = file.name.split(".").pop();
      const downloadName = `converted-${file.name.split(".")[0]}.${targetFormat || ext}`;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

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
        <p className="mt-4 text-lg text-zinc-600">Fast, secure, and high-quality bulk conversion.</p>
      </motion.div>

      <div className="rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 sm:p-12 transition-all hover:border-orange-600/50 shadow-sm">
        {/* Ad Placeholder - Hidden for Pro */}
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
              <p className="text-sm text-zinc-500 mt-1">Up to 10 files • Max 50MB per file</p>
            </div>
            <input type="file" className="hidden" {...(isSingleFileTool ? {} : { multiple: true })} onChange={onFileChange} accept={getAcceptType()} />
          </label>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
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
                    <span className="text-zinc-600">Processing {files.length} files...</span>
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
                Conversion successful! {files.length > 1 ? "Your ZIP archive" : "Your file"} is ready.
              </motion.div>
            )}

            {/* Tool Options */}
            {!isUploading && !isComplete && (
              <div className="space-y-6 pt-4 border-t border-zinc-200">
                {/* Target Format Selection for Image Tools */}
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
                        type="number" 
                        value={resizeWidth}
                        onChange={(e) => setResizeWidth(e.target.value)}
                        placeholder="Auto"
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-900 ml-2">Height (px)</label>
                      <input 
                        type="number" 
                        value={resizeHeight}
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
                        <p className="text-[10px] font-bold text-zinc-400 uppercase mb-2 text-center">Crop Preview (Approximate)</p>
                        <div className="relative inline-block mx-auto">
                          <img src={previewUrl} alt="Preview" className="max-h-[300px] w-auto rounded-lg" />
                          <div 
                            className="absolute border-2 border-orange-500 bg-orange-500/20 pointer-events-none"
                            style={{
                              left: `${(parseInt(cropX) || 0) / 10}%`,
                              top: `${(parseInt(cropY) || 0) / 10}%`,
                              width: `${(parseInt(cropWidth) || 100) / 10}%`,
                              height: `${(parseInt(cropHeight) || 100) / 10}%`,
                              maxWidth: "100%",
                              maxHeight: "100%"
                            }}
                          />
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-2 text-center italic">Note: Preview is scaled. Actual crop uses pixel values.</p>
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
                            onClick={() => {
                              setCropX("0");
                              setCropY("0");
                              setCropWidth(preset.w);
                              setCropHeight(preset.h);
                            }}
                            className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold text-zinc-600 hover:bg-orange-100 hover:text-orange-600 transition-all"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-500 mb-2">Offset controls are removed; crop starts at origin (0,0) to keep basic crop behavior as requested.</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-900 ml-2">Crop Width (px)</label>
                        <input 
                          type="number" 
                          value={cropWidth}
                          onChange={(e) => setCropWidth(e.target.value)}
                          className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-900 ml-2">Crop Height (px)</label>
                        <input 
                          type="number" 
                          value={cropHeight}
                          onChange={(e) => setCropHeight(e.target.value)}
                          className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm"
                        />
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
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-zinc-200">
              <button
                onClick={() => {
                  setFiles([]);
                  setPreviewUrl(null);
                }}
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
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Processing...
                  </>
                ) : isComplete ? (
                  <>
                    <Download className="h-6 w-6" />
                    Download Again
                  </>
                ) : (
                  <>
                    Convert {files.length} {files.length === 1 ? "File" : "Files"}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
        <motion.div 
          whileHover={{ y: -5 }}
          className="text-center p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 font-black text-xl">1</div>
          <h4 className="font-bold text-zinc-900 mb-3 text-lg">Upload Files</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">Select up to 10 images at once. We support PNG, JPG, WebP and more.</p>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="text-center p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-black text-xl">2</div>
          <h4 className="font-bold text-zinc-900 mb-3 text-lg">Fast Processing</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">Our cloud servers process your bulk request in parallel for maximum speed.</p>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="text-center p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 font-black text-xl">3</div>
          <h4 className="font-bold text-zinc-900 mb-3 text-lg">Instant Download</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">Get your files individually or as a single ZIP archive for convenience.</p>
        </motion.div>
      </div>
    </div>
  );
};
