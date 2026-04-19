import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "how-to-convert-images-for-web-optimization",
    title: "How to Convert Images for Web Optimization: A Complete Guide",
    date: "2024-11-12",
    readTime: "5 min read",
    excerpt: "Learn the best practices for converting images to optimize your website's loading speed and user experience.",
    featuredImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop&crop=center",
    content: `
      <h2>Why Image Optimization Matters</h2>
      <p>In today's fast-paced digital world, website loading speed is crucial. Studies show that users abandon websites that take more than 3 seconds to load. One of the biggest factors affecting load times is unoptimized images.</p>

      <h2>Choosing the Right Format</h2>
      <p>Different image formats serve different purposes:</p>
      <ul>
        <li><strong>WebP:</strong> Offers superior compression with minimal quality loss. Supported by all modern browsers.</li>
        <li><strong>JPEG:</strong> Best for photographs with lots of colors and gradients.</li>
        <li><strong>PNG:</strong> Ideal for images with transparency or simple graphics.</li>
        <li><strong>SVG:</strong> Perfect for logos and icons that need to scale without quality loss.</li>
      </ul>

      <h2>Conversion Best Practices</h2>
      <p>When converting images for the web:</p>
      <ol>
        <li>Resize images to the exact dimensions needed</li>
        <li>Use appropriate compression levels</li>
        <li>Choose the right format for each image type</li>
        <li>Consider using responsive images with srcset</li>
      </ol>

      <h2>Tools and Techniques</h2>
      <p>Modern browsers now support client-side image processing, allowing for instant conversions without uploading files to servers. This approach maintains privacy while providing fast results.</p>
    `
  },
  {
    slug: "best-practices-for-video-compression",
    title: "Best Practices for Video Compression Without Losing Quality",
    date: "2024-10-28",
    readTime: "7 min read",
    excerpt: "Discover how to compress videos effectively while maintaining visual quality for web and social media use.",
    featuredImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop&crop=center",
    content: `
      <h2>Understanding Video Compression</h2>
      <p>Video compression is essential for web delivery, but it can significantly impact quality if not done properly. The key is finding the right balance between file size and visual fidelity.</p>

      <h2>Key Compression Factors</h2>
      <p>Several factors affect video compression:</p>
      <ul>
        <li><strong>Codec Selection:</strong> H.264 for broad compatibility, H.265 for better compression</li>
        <li><strong>Bitrate:</strong> Higher bitrate means better quality but larger files</li>
        <li><strong>Resolution:</strong> Match the playback device capabilities</li>
        <li><strong>Frame Rate:</strong> 24-30 fps is usually sufficient for most content</li>
      </ul>

      <h2>Platform-Specific Optimization</h2>
      <p>Different platforms have different requirements:</p>
      <ul>
        <li><strong>YouTube:</strong> H.264, variable bitrate, up to 4K resolution</li>
        <li><strong>Instagram:</strong> H.264, square aspect ratio, under 4GB</li>
        <li><strong>TikTok:</strong> H.264, vertical format, under 287MB</li>
      </ul>

      <h2>Advanced Techniques</h2>
      <p>Use two-pass encoding for better quality distribution, and consider using constant rate factor (CRF) for quality-based compression rather than fixed bitrate.</p>
    `
  },
  {
    slug: "webp-vs-jpeg-which-format-to-choose",
    title: "WebP vs JPEG: Which Image Format Should You Choose?",
    date: "2024-10-05",
    readTime: "4 min read",
    excerpt: "Compare WebP and JPEG formats to understand when to use each for optimal web performance.",
    featuredImage: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=400&fit=crop&crop=center",
    content: `
      <h2>The Evolution of Image Formats</h2>
      <p>JPEG has been the standard for web images for decades, but WebP offers significant advantages in compression and quality. Understanding when to use each format is key to optimizing your website.</p>

      <h2>WebP Advantages</h2>
      <ul>
        <li>25-35% smaller file sizes than JPEG</li>
        <li>Lossless compression option</li>
        <li>Support for transparency</li>
        <li>Animation support</li>
      </ul>

      <h2>When to Use JPEG</h2>
      <p>JPEG is still relevant for:</p>
      <ul>
        <li>Legacy browser support requirements</li>
        <li>Progressive loading needs</li>
        <li>Photographs with complex color gradients</li>
      </ul>

      <h2>Implementation Strategy</h2>
      <p>Use the &lt;picture&gt; element to serve WebP to modern browsers and JPEG as fallback. This ensures optimal performance across all devices and browsers.</p>

      <h2>Future Considerations</h2>
      <p>As browser support for WebP continues to grow (currently over 95%), it's becoming the default choice for new web projects. Consider migrating your existing JPEG images to WebP for better performance.</p>
    `
  },
  {
    slug: "resize-images-without-losing-quality",
    title: "How to Resize Images Without Losing Quality: Expert Tips",
    date: "2024-09-18",
    readTime: "6 min read",
    excerpt: "Master the art of image resizing with techniques that preserve quality and sharpness.",
    featuredImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop&crop=center",
    content: `
      <h2>The Challenge of Image Resizing</h2>
      <p>Resizing images seems simple, but improper techniques can lead to blurry or pixelated results. Understanding the mathematics behind image scaling is crucial for maintaining quality.</p>

      <h2>Understanding Interpolation</h2>
      <p>Different interpolation algorithms affect quality:</p>
      <ul>
        <li><strong>Nearest Neighbor:</strong> Fast but creates pixelation</li>
        <li><strong>Bilinear:</strong> Smooth but can blur details</li>
        <li><strong>Bicubic:</strong> Better quality with sharper edges</li>
        <li><strong>Lanczos:</strong> High quality with minimal artifacts</li>
      </ul>

      <h2>Best Practices for Resizing</h2>
      <ol>
        <li>Always resize from the original, high-resolution image</li>
        <li>Use even scaling ratios when possible (50%, 25%, etc.)</li>
        <li>Apply sharpening after resizing to restore crispness</li>
        <li>Consider the final use case (web, print, social media)</li>
      </ol>

      <h2>Tools and Techniques</h2>
      <p>Modern browser-based tools use advanced algorithms to maintain image quality during resizing. Look for tools that offer multiple interpolation methods and preview capabilities.</p>

      <h2>Common Mistakes to Avoid</h2>
      <p>Avoid upscaling low-resolution images, as this cannot restore lost detail. Instead, start with high-quality source material and resize down as needed.</p>
    `
  },
  {
    slug: "extracting-audio-from-videos-guide",
    title: "Extracting Audio from Videos: A Complete Guide",
    date: "2024-09-02",
    readTime: "5 min read",
    excerpt: "Learn how to extract audio tracks from video files for various purposes including podcasts and music production.",
    featuredImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&crop=center",
    content: `
      <h2>Why Extract Audio from Videos?</h2>
      <p>Audio extraction serves multiple purposes: creating podcasts from video content, isolating music tracks, generating audio for different formats, or simply backing up audio content separately.</p>

      <h2>Supported Formats</h2>
      <p>Most video formats contain audio tracks that can be extracted:</p>
      <ul>
        <li>MP4 (AAC, MP3 audio)</li>
        <li>MOV (various codecs)</li>
        <li>AVI (MP3, PCM)</li>
        <li>MKV (multiple audio tracks)</li>
        <li>WebM (Vorbis, Opus)</li>
      </ul>

      <h2>Audio Quality Considerations</h2>
      <p>When extracting audio:</p>
      <ul>
        <li>Maintain original bitrate for best quality</li>
        <li>Choose appropriate output format (MP3, AAC, WAV)</li>
        <li>Consider sample rate (44.1kHz for music, 48kHz for video)</li>
        <li>Preserve metadata when possible</li>
      </ul>

      <h2>Advanced Features</h2>
      <p>Some videos contain multiple audio tracks. Modern extraction tools allow you to select specific tracks, adjust volume levels, and even apply basic audio processing during extraction.</p>

      <h2>Legal Considerations</h2>
      <p>Always ensure you have the right to extract and use audio content. Respect copyright laws and obtain necessary permissions for commercial use.</p>
    `
  },
  {
    slug: "converting-videos-to-gifs-social-media",
    title: "Converting Videos to GIFs for Social Media: Best Practices",
    date: "2024-08-20",
    readTime: "4 min read",
    excerpt: "Create engaging GIFs from videos optimized for social media platforms with these expert tips.",
    featuredImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&crop=center",
    content: `
      <h2>The Power of GIFs in Social Media</h2>
      <p>GIFs are incredibly engaging on social platforms, with studies showing they can increase engagement by up to 30%. Converting videos to GIFs allows you to create shareable, loopable content from your video assets.</p>

      <h2>Optimal GIF Specifications</h2>
      <p>For social media success:</p>
      <ul>
        <li><strong>Duration:</strong> 3-6 seconds for maximum impact</li>
        <li><strong>Resolution:</strong> 480p to 720p depending on platform</li>
        <li><strong>Frame Rate:</strong> 10-15 fps to balance quality and file size</li>
        <li><strong>File Size:</strong> Under 5MB for most platforms</li>
      </ul>

      <h2>Platform-Specific Optimization</h2>
      <ul>
        <li><strong>Twitter:</strong> Square or landscape, under 5MB</li>
        <li><strong>Instagram:</strong> Square format preferred</li>
        <li><strong>Facebook:</strong> Supports higher resolution GIFs</li>
        <li><strong>Reddit:</strong> No size restrictions but optimize for fast loading</li>
      </ul>

      <h2>Quality Optimization Techniques</h2>
      <p>To create high-quality GIFs:</p>
      <ol>
        <li>Select the most dynamic portion of your video</li>
        <li>Use color palette optimization to reduce file size</li>
        <li>Apply dithering to smooth color transitions</li>
        <li>Test different frame rates for the best balance</li>
      </ol>

      <h2>Tools and Automation</h2>
      <p>Modern conversion tools offer advanced features like automatic scene detection, color palette optimization, and batch processing for creating multiple GIFs efficiently.</p>
    `
  }
];

const BlogPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-zinc-900 mb-6">Convertly Blog</h1>
          <p className="text-xl text-zinc-500 font-medium max-w-3xl mx-auto">
            Expert tips, tutorials, and insights on file conversion, image optimization, and digital media best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all overflow-hidden"
            >
              <div className="aspect-video mb-6 overflow-hidden rounded-2xl">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              
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
      </motion.div>
    </div>
  );
};

export default BlogPage;