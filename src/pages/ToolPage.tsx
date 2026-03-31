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

  const toolName = toolId?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  
  const getTargetFormat = () => {
    if (toolId === "extract-audio") return "mp3";
    if (toolId === "video-to-mp4") return "mp4";
    if (toolId === "video-to-gif") return "gif";
    if (toolId === "resize-image" || toolId === "rotate-image") return "";
    if (toolId?.includes("-to-")) return toolId.split("-to-")[1];
    return "webp"; // Default for images
  };

  const targetFormat = getTargetFormat();
  
  const getAcceptType = () => {
    if (toolId?.includes("video") || toolId?.includes("extract-audio")) return "video/*";
    if (toolId?.includes("pdf") || toolId?.includes("jpg-to-pdf")) return "application/pdf,image/*";
    return "image/*";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 10); // Limit to 10
      setFiles(prev => [...prev, ...newFiles].slice(0, 10));
      setError(null);
      setIsComplete(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).slice(0, 10);
      setFiles(prev => [...prev, ...newFiles].slice(0, 10));
      setError(null);
      setIsComplete(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
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
        throw new Error("Failed to convert files. Please try again.");
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
            <input type="file" className="hidden" multiple onChange={onFileChange} accept={getAcceptType()} />
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
                    <button 
                      onClick={() => removeFile(idx)}
                      className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-red-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {files.length < 10 && (
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

            <div className="flex gap-4 pt-4 border-t border-zinc-200">
              <button
                onClick={() => setFiles([])}
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
