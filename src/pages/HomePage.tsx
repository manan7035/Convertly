import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePlan } from "../App";
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  FileText as FileIcon, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  Star
} from "lucide-react";

const tools = [
  {
    id: "png-to-webp",
    name: "PNG to WebP",
    description: "Convert PNG images to WebP format with no quality loss.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "jpg-to-webp",
    name: "JPG to WebP",
    description: "Convert JPG images to WebP for better web performance.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "webp-to-png",
    name: "WebP to PNG",
    description: "Convert WebP images back to standard PNG format.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "compress-image",
    name: "Compress Image",
    description: "Reduce image file size while maintaining quality.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "resize-image",
    name: "Resize Image",
    description: "Scale your images to 50% of their original size.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "rotate-image",
    name: "Rotate Image",
    description: "Rotate your images 90 degrees clockwise.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "crop-image",
    name: "Crop Image",
    description: "Crop your images to specific dimensions easily.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "video-to-mp4",
    name: "Video to MP4",
    description: "Convert any video format to MP4 with high quality.",
    icon: VideoIcon,
    category: "Video",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "extract-audio",
    name: "Extract Audio",
    description: "Extract high-quality MP3 audio from any video file.",
    icon: VideoIcon,
    category: "Video",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    description: "Convert PNG images to high-quality JPG format.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    description: "Convert JPG images to transparent PNG format.",
    icon: ImageIcon,
    category: "Image",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages into high-quality JPG images. (Coming Soon)",
    icon: FileIcon,
    category: "File",
    color: "bg-red-50 text-red-600",
    disabled: true,
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Merge multiple JPG images into a single PDF file. (Coming Soon)",
    icon: FileIcon,
    category: "File",
    color: "bg-red-50 text-red-600",
    disabled: true,
  },
];

export const HomePage = () => {
  const { plan, setUpgradeModalOpen } = usePlan();

  return (
    <div className="flex flex-col gap-24 py-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-orange-600 ring-1 ring-inset ring-orange-600/20 shadow-sm mb-6"
          >
            <Star className="h-3 w-3 fill-current" />
            Voted #1 Online File Converter
          </motion.span>
          <h1 className="text-5xl font-black tracking-tight text-zinc-900 sm:text-7xl leading-[1.1] mb-6">
            Convert Files <br />
            <span className="text-orange-600 italic">Faster.</span>
          </h1>
          <p className="max-w-xl text-base text-zinc-500 sm:text-lg font-medium leading-relaxed mb-10">
            Join 1M+ users who trust Convertly for lightning-fast image, video, and file processing. Simple, secure, and high-quality.
          </p>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-[10%] h-14 w-14 rounded-2xl bg-orange-100/30 backdrop-blur-sm border border-orange-200/20"
            />
            <motion.div 
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-[15%] h-16 w-16 rounded-3xl bg-blue-100/30 backdrop-blur-sm border border-blue-200/20"
            />
            <motion.div 
              animate={{ 
                x: [0, 15, 0],
                y: [0, 15, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[40%] right-[10%] h-8 w-8 rounded-lg bg-green-100/30 backdrop-blur-sm border border-green-200/20"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#tools" 
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-zinc-900/20 transition-all hover:bg-zinc-800"
            >
              Get Started Free
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUpgradeModalOpen(true)}
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-900 ring-1 ring-zinc-200 shadow-md transition-all hover:bg-zinc-50"
            >
              View Pro Plans
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 md:grid-cols-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center gap-6 p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/20">
              <Zap className="h-8 w-8 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Lightning Fast</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">Our high-performance servers process your files in milliseconds. No more waiting in queues.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center gap-6 p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Secure & Private</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">End-to-end SSL encryption. Your files are automatically deleted 30 minutes after processing.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center gap-6 p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20">
              <Globe className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Anywhere, Anytime</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">Access our tools from any device. Fully responsive and optimized for mobile and desktop.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ad Placeholder - Hidden for Pro */}
      {plan !== "Pro" && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Advertisement</p>
            <div className="h-24 w-full flex items-center justify-center border border-dashed border-zinc-300 rounded-xl text-zinc-300 text-sm font-bold italic">
              Your Ad Here (Google AdSense)
            </div>
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16 flex flex-col items-center text-center gap-4">
          <h2 className="text-4xl font-black tracking-tight text-zinc-900">Our Tool Suite</h2>
          <p className="text-zinc-500 max-w-xl font-medium">Everything you need to handle media files in one place. Optimized for bulk processing.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={tool.disabled ? "#" : `/tool/${tool.id}`}
                className={`group relative flex h-full flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 transition-all hover:border-orange-600/50 hover:shadow-2xl hover:shadow-orange-600/10 ${tool.disabled ? "opacity-60 cursor-not-allowed grayscale" : ""}`}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.color} shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <tool.icon className="h-7 w-7" />
                </div>
                {tool.disabled && (
                  <span className="absolute top-6 right-6 rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Soon
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">{tool.name}</h3>
                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-900 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 gap-13 lg:grid-cols-3 text-center">
            <div className="flex flex-col gap-4 sm:gap-6 items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600/20 text-orange-600">
                <Zap className="h-8 w-8 fill-current" />
              </div>
              <div>
                <h3 className="text-4xl font-black mb-2">0.5s</h3>
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs">Avg. Processing Time</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-600">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-4xl font-black mb-2">100%</h3>
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs">Privacy Guaranteed</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600/20 text-green-600">
                <Globe className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-4xl font-black mb-2">1M+</h3>
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs">Files Converted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-900 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl font-black tracking-tight text-white">Loved by Creators</h2>
            <p className="mt-4 text-zinc-400 font-medium">See what our users have to say about Convertly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Photographer",
                text: "Convertly saved me hours of work. The bulk image converter is a game-changer for my workflow.",
                image: "https://picsum.photos/seed/sarah/100/100"
              },
              {
                name: "David Chen",
                role: "Video Editor",
                text: "The fastest video to GIF converter I've ever used. High quality and super simple.",
                image: "https://picsum.photos/seed/david/100/100"
              },
              {
                name: "Elena Rodriguez",
                role: "Content Creator",
                text: "I love the clean design and the fact that it's free. The Pro plan is totally worth it for the speed.",
                image: "https://picsum.photos/seed/elena/100/100"
              }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="rounded-3xl bg-zinc-800 p-6 sm:p-8 border border-zinc-700/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full ring-2 ring-orange-600/20" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-xs text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-zinc-300 leading-relaxed italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10  md:mb-16">
          <h2 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">Scale Your Workflow</h2>
          <p className="mt-4 text-zinc-500 font-medium text-lg">Choose the plan that fits your needs.</p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 max-w-5xl mx-auto items-center">
          {/* Free Plan */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col rounded-[2.5rem] border border-zinc-200 bg-white p-8 md:p-10 shadow-sm"
          >
            <h3 className="text-xl font-bold text-zinc-900">Free Tier</h3>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-black text-zinc-900">$0</span>
              <span className="text-zinc-400 font-bold">/forever</span>
            </div>
            <p className="mt-4 text-zinc-500 text-sm font-medium">Perfect for occasional users and quick edits.</p>
            <ul className="mt-10 space-y-5">
              {[
                "Max file size: 50MB",
                "10 conversions per day",
                "Standard processing",
                "Community support"
              ].map(item => (
                <li key={item} className="flex items-center gap-4 text-sm font-bold text-zinc-600">
                  <CheckCircle2 className="h-5 w-5 text-zinc-300" /> {item}
                </li>
              ))}
            </ul>
            <button className="mt-12 rounded-full border-2 border-zinc-100 py-3 text-md font-black text-zinc-400 cursor-not-allowed">
              {plan === "Free" ? "Current Plan" : "Downgrade"}
            </button>
          </motion.div>
          {/* Pro Plan */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="relative flex flex-col rounded-[2.5rem] border-4 border-orange-600 bg-white p-8 md:p-10 shadow-2xl shadow-orange-600/20"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 px-6 py-2 text-xs font-black text-white uppercase tracking-[0.2em] shadow-lg">
              Recommended
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Pro Access</h3>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-black text-zinc-900">$9</span>
              <span className="text-zinc-400 font-bold">/month</span>
            </div>
            <p className="mt-4 text-zinc-500 text-sm font-medium">For power users who need speed and volume.</p>
            <ul className="mt-10 space-y-5">
              {[
                "Max file size: 2GB",
                "Unlimited bulk conversions",
                "Priority processing speed",
                "No advertisements",
                "Early access to new tools"
              ].map(item => (
                <li key={item} className="flex items-center gap-4 text-sm font-bold text-zinc-900">
                  <CheckCircle2 className="h-5 w-5 text-orange-600" /> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setUpgradeModalOpen(true)}
              className="mt-12 rounded-full bg-orange-600 py-3 text-md font-black text-white shadow-lg shadow-orange-600/30 transition-all hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              {plan === "Pro" ? "Manage Subscription" : "Upgrade to Pro"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl font-black text-zinc-900">Common Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
            <h3 className="text-lg font-black text-zinc-900 mb-4">Is Convertly free to use?</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">Yes! Our basic tools are 100% free with a 50MB limit per file. You can upgrade to our Pro plan for larger files and unlimited usage.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
            <h3 className="text-lg font-black text-zinc-900 mb-4">Are my files safe?</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">Absolutely. We use SSL encryption for all uploads and automatically delete your files from our servers 30 minutes after processing.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
            <h3 className="text-lg font-black text-zinc-900 mb-4">What file formats do you support?</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">We support hundreds of formats including PNG, JPG, WebP, MP4, MOV, PDF, and more. We are constantly adding new tools.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
            <h3 className="text-lg font-black text-zinc-900 mb-4">Can I cancel my Pro plan?</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">Yes, you can cancel your subscription at any time from your account settings. You will retain access until the end of your billing period.</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl font-black tracking-tight text-zinc-900">Latest from Our Blog</h2>
          <p className="mt-4 text-zinc-500 font-medium">Tips, tutorials, and insights on file conversion and digital media.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "How to Convert Images for Web Optimization",
              excerpt: "Learn the best practices for converting images to optimize your website's loading speed and user experience.",
              slug: "how-to-convert-images-for-web-optimization",
              date: "2026-04-10"
            },
            {
              title: "Best Practices for Video Compression",
              excerpt: "Discover how to compress videos effectively while maintaining visual quality for web and social media use.",
              slug: "best-practices-for-video-compression",
              date: "2026-04-08"
            },
            {
              title: "WebP vs JPEG: Which Format to Choose?",
              excerpt: "Compare WebP and JPEG formats to understand when to use each for optimal web performance.",
              slug: "webp-vs-jpeg-which-format-to-choose",
              date: "2026-04-05"
            }
          ].map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all"
            >
              <div className="text-sm text-zinc-500 mb-4">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-zinc-600 mb-6 leading-relaxed">{post.excerpt}</p>
              <Link 
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Read More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95"
          >
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] bg-orange-600 p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl mb-8">Ready to start converting?</h2>
            <p className="text-orange-100 text-xl font-medium mb-12 max-w-2xl mx-auto">Join thousands of happy users and transform your files in seconds. No credit card required to start.</p>
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-md font-bold text-orange-600 shadow-2xl transition-all hover:bg-orange-50 hover:scale-105 active:scale-95"
            >
              Get Started Now <ArrowRight className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
