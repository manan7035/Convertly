import React from "react";
import { Link } from "react-router-dom";
import { Zap, Menu, X as CloseIcon } from "lucide-react";
import { usePlan } from "../App";
import { motion, AnimatePresence } from "motion/react";

export const Navbar = () => {
  const { plan, setUpgradeModalOpen } = usePlan();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900">Convertly</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a href="/#tools" className="text-sm font-medium text-zinc-600 hover:text-orange-600 transition-colors">Tools</a>
          <Link to="/blog" className="text-sm font-medium text-zinc-600 hover:text-orange-600 transition-colors">Blog</Link>
          <a href="/#pricing" className="text-sm font-medium text-zinc-600 hover:text-orange-600 transition-colors">Pricing</a>
          <a href="/#faq" className="text-sm font-medium text-zinc-600 hover:text-orange-600 transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-zinc-400">Plan: {plan}</span>
          <button 
            onClick={() => setUpgradeModalOpen(true)}
            className="hidden sm:block rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95"
          >
            {plan === "Free" ? "Go Premium" : "Manage Pro"}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-2 hover:bg-zinc-100 md:hidden"
          >
            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-zinc-200 bg-white md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <a href="/#tools" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-zinc-900">Tools</a>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-zinc-900">Blog</Link>
              <a href="/#pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-zinc-900">Pricing</a>
              <a href="/#faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-zinc-900">FAQ</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setUpgradeModalOpen(true);
                }}
                className="w-full rounded-full bg-orange-600 py-4 text-center font-bold text-white"
              >
                {plan === "Free" ? "Go Premium" : "Manage Pro"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => (
  <footer className="border-t border-zinc-200 bg-zinc-50 py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-600 text-white">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <span className="text-lg font-bold text-zinc-900">Convertly</span>
          </Link>
          <p className="text-sm text-zinc-500">
            The world's fastest online tool platform for images, videos, and files.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Image Tools</h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link to="/tool/png-to-webp" className="hover:text-orange-600">PNG to WebP</Link></li>
            <li><Link to="/tool/jpg-to-webp" className="hover:text-orange-600">JPG to WebP</Link></li>
            <li><Link to="/tool/resize-image" className="hover:text-orange-600">Resize Image</Link></li>
            <li><Link to="/tool/rotate-image" className="hover:text-orange-600">Rotate Image</Link></li>
            <li><Link to="/tool/compress-image" className="hover:text-orange-600">Compress Image</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Video Tools</h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link to="/tool/video-to-mp4" className="hover:text-orange-600">Video to MP4</Link></li>
            <li><Link to="/tool/extract-audio" className="hover:text-orange-600">Extract Audio</Link></li>
            <li><Link to="/tool/video-to-gif" className="hover:text-orange-600">Video to GIF</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link to="/about" className="hover:text-orange-600">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-orange-600">Blog</Link></li>
            <li><Link to="/privacy" className="hover:text-orange-600">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-600">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-orange-600">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Convertly. All rights reserved. Built for speed and privacy.
      </div>
    </div>
  </footer>
);
