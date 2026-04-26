import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Bookmark, ThumbsUp } from "lucide-react";


const blogPosts = [
  {
    slug: "how-to-convert-images-for-web-optimization",
    title: "How to Convert Images for Web Optimization: A Complete Guide",
    date: "2024-11-12",
    readTime: "5 min read",
    excerpt: "Learn the best practices for converting images to optimize your website's loading speed and user experience.",
    featuredImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop&crop=center",
    content: `
      <div class="blog-intro">
        <p>In today's fast-paced digital world, website loading speed is crucial. Studies show that users abandon websites that take more than 3 seconds to load. One of the biggest factors affecting load times is unoptimized images.</p>
      </div>

      <h2>Why Image Optimization Matters</h2>
      <p>Did you know that images account for up to 60% of a webpage's total size? Optimizing your images can dramatically improve your site's performance, user experience, and even your search engine rankings.</p>

      <blockquote>
        "A one-second delay in page load time can result in a 7% reduction in conversions." - Google
      </blockquote>

      <h2>Choosing the Right Format</h2>
      <p>Different image formats serve different purposes and offer varying levels of compression and quality:</p>

      <div class="format-comparison">
        <div class="format-card">
          <h3>WebP</h3>
          <p>Offers superior compression with minimal quality loss. Supported by all modern browsers.</p>
          <div class="format-stats">
            <span class="stat">25-35% smaller</span>
            <span class="stat">Lossless option</span>
          </div>
        </div>
        <div class="format-card">
          <h3>JPEG</h3>
          <p>Best for photographs with lots of colors and gradients.</p>
          <div class="format-stats">
            <span class="stat">Universal support</span>
            <span class="stat">Adjustable quality</span>
          </div>
        </div>
        <div class="format-card">
          <h3>PNG</h3>
          <p>Ideal for images with transparency or simple graphics.</p>
          <div class="format-stats">
            <span class="stat">Lossless quality</span>
            <span class="stat">Transparency support</span>
          </div>
        </div>
      </div>

      <h2>Conversion Best Practices</h2>
      <p>When converting images for the web, follow these essential guidelines:</p>
      <ol>
        <li><strong>Resize first:</strong> Always resize images to the exact dimensions needed before compression</li>
        <li><strong>Choose appropriate compression:</strong> Balance file size with visual quality</li>
        <li><strong>Select the right format:</strong> Match the format to your image content</li>
        <li><strong>Use responsive images:</strong> Implement srcset for different screen sizes</li>
        <li><strong>Consider progressive loading:</strong> Use progressive JPEGs for better perceived performance</li>
      </ol>

      <h2>Tools and Techniques</h2>
      <p>Modern browsers now support client-side image processing, allowing for instant conversions without uploading files to servers. This approach maintains privacy while providing fast results.</p>

      <div class="code-example">
        <h4>Example: Converting PNG to WebP</h4>
        <pre><code>// Using modern browser APIs
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  canvas.toBlob((blob) => {
    // WebP blob ready for download
  }, 'image/webp', 0.8);
};

img.src = 'input.png';</code></pre>
      </div>

      <h2>Conclusion</h2>
      <p>Image optimization is no longer optional in modern web development. By following these best practices, you can significantly improve your website's performance and user experience.</p>
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
      <div class="blog-intro">
        <p>Video compression is essential for web delivery, but it can significantly impact quality if not done properly. The key is finding the right balance between file size and visual fidelity.</p>
      </div>

      <h2>Understanding Video Compression</h2>
      <p>Video compression works by removing redundant information while preserving the essential visual data. There are two main types: lossy and lossless compression.</p>

      <h2>Key Compression Factors</h2>
      <p>Several factors affect video compression quality and file size:</p>
      <ul>
        <li><strong>Codec Selection:</strong> H.264 for broad compatibility, H.265 for better compression</li>
        <li><strong>Bitrate:</strong> Higher bitrate means better quality but larger files</li>
        <li><strong>Resolution:</strong> Match the playback device capabilities</li>
        <li><strong>Frame Rate:</strong> 24-30 fps is usually sufficient for most content</li>
        <li><strong>Keyframe Interval:</strong> Affects seeking and compression efficiency</li>
      </ul>

      <h2>Platform-Specific Optimization</h2>
      <p>Different platforms have different requirements and optimal settings:</p>

      <div class="platform-guide">
        <div class="platform-card">
          <h3>YouTube</h3>
          <ul>
            <li>H.264 codec</li>
            <li>Variable bitrate (VBR)</li>
            <li>Up to 4K resolution</li>
            <li>AAC audio at 128kbps</li>
          </ul>
        </div>
        <div class="platform-card">
          <h3>Instagram</h3>
          <ul>
            <li>H.264 codec</li>
            <li>Square aspect ratio</li>
            <li>Under 4GB file size</li>
            <li>AAC audio</li>
          </ul>
        </div>
        <div class="platform-card">
          <h3>TikTok</h3>
          <ul>
            <li>H.264 codec</li>
            <li>Vertical format (3:4)</li>
            <li>Under 287MB</li>
            <li>High frame rate support</li>
          </ul>
        </div>
      </div>

      <h2>Advanced Techniques</h2>
      <p>Use two-pass encoding for better quality distribution, and consider using constant rate factor (CRF) for quality-based compression rather than fixed bitrate.</p>

      <div class="code-example">
        <h4>FFmpeg Command for Video Compression</h4>
        <pre><code>ffmpeg -i input.mp4 \\
  -c:v libx264 \\
  -crf 23 \\
  -preset medium \\
  -c:a aac \\
  -b:a 128k \\
  output.mp4</code></pre>
      </div>
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
      <div class="blog-intro">
        <p>JPEG has been the standard for web images for decades, but WebP offers significant advantages in compression and quality. Understanding when to use each format is key to optimizing your website.</p>
      </div>

      <h2>The Evolution of Image Formats</h2>
      <p>Since its introduction in 1992, JPEG has dominated web imagery. However, WebP, introduced by Google in 2010, offers superior compression while maintaining excellent quality.</p>

      <h2>WebP Advantages</h2>
      <div class="comparison-table">
        <div class="comparison-row">
          <span class="feature">File Size</span>
          <span class="webp">25-35% smaller</span>
          <span class="jpeg">Baseline</span>
        </div>
        <div class="comparison-row">
          <span class="feature">Compression</span>
          <span class="webp">Lossless & Lossy</span>
          <span class="jpeg">Lossy only</span>
        </div>
        <div class="comparison-row">
          <span class="feature">Transparency</span>
          <span class="webp">Full support</span>
          <span class="jpeg">No support</span>
        </div>
        <div class="comparison-row">
          <span class="feature">Animation</span>
          <span class="webp">Supported</span>
          <span class="jpeg">No support</span>
        </div>
        <div class="comparison-row">
          <span class="feature">Browser Support</span>
          <span class="webp">95%+</span>
          <span class="jpeg">100%</span>
        </div>
      </div>

      <h2>When to Use JPEG</h2>
      <p>JPEG is still relevant for certain use cases:</p>
      <ul>
        <li>Legacy browser support requirements</li>
        <li>Progressive loading needs</li>
        <li>Photographs with complex color gradients</li>
        <li>Content management systems with limited WebP support</li>
      </ul>

      <h2>Implementation Strategy</h2>
      <p>Use the &lt;picture&gt; element to serve WebP to modern browsers and JPEG as fallback:</p>

      <div class="code-example">
        <h4>Responsive Image with Fallback</h4>
        <pre><code>&lt;picture&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="Description"&gt;
&lt;/picture&gt;</code></pre>
      </div>

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
      <div class="blog-intro">
        <p>Resizing images seems simple, but improper techniques can lead to blurry or pixelated results. Understanding the mathematics behind image scaling is crucial for maintaining quality.</p>
      </div>

      <h2>The Challenge of Image Resizing</h2>
      <p>When you resize an image, you're essentially redistributing pixels across a new grid. The algorithm used for this redistribution determines the final quality.</p>

      <h2>Understanding Interpolation</h2>
      <p>Different interpolation algorithms affect quality differently:</p>

      <div class="interpolation-guide">
        <div class="interpolation-method">
          <h3>Nearest Neighbor</h3>
          <p>Fast but creates pixelation and jagged edges. Best for pixel art.</p>
        </div>
        <div class="interpolation-method">
          <h3>Bilinear</h3>
          <p>Smooth results but can blur fine details. Good for general use.</p>
        </div>
        <div class="interpolation-method">
          <h3>Bicubic</h3>
          <p>Better quality with sharper edges. Balances speed and quality.</p>
        </div>
        <div class="interpolation-method">
          <h3>Lanczos</h3>
          <p>Highest quality with minimal artifacts. Best for professional work.</p>
        </div>
      </div>

      <h2>Best Practices for Resizing</h2>
      <ol>
        <li><strong>Start with high quality:</strong> Always resize from the original, high-resolution image</li>
        <li><strong>Use even ratios:</strong> Scale by factors like 50%, 25%, or 200% when possible</li>
        <li><strong>Apply sharpening:</strong> Use unsharp mask or similar to restore crispness after resizing</li>
        <li><strong>Consider the output:</strong> Different media require different approaches</li>
        <li><strong>Test and compare:</strong> Always preview results at actual size</li>
      </ol>

      <h2>Tools and Techniques</h2>
      <p>Modern browser-based tools use advanced algorithms to maintain image quality during resizing. Look for tools that offer multiple interpolation methods and preview capabilities.</p>

      <div class="code-example">
        <h4>Canvas API Image Resizing</h4>
        <pre><code>function resizeImage(img, newWidth, newHeight) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = newWidth;
  canvas.height = newHeight;

  // Use high-quality interpolation
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  return canvas;
}</code></pre>
      </div>

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
      <div class="blog-intro">
        <p>Audio extraction serves multiple purposes: creating podcasts from video content, isolating music tracks, generating audio for different formats, or simply backing up audio content separately.</p>
      </div>

      <h2>Why Extract Audio from Videos?</h2>
      <p>Extracting audio from video files offers several practical benefits:</p>
      <ul>
        <li><strong>Podcast creation:</strong> Convert video tutorials into audio-only content</li>
        <li><strong>Music extraction:</strong> Isolate background music or sound effects</li>
        <li><strong>Format conversion:</strong> Change audio codecs or sample rates</li>
        <li><strong>Storage optimization:</strong> Keep audio separate from video for smaller files</li>
        <li><strong>Remixing:</strong> Use extracted audio in other projects</li>
      </ul>

      <h2>Supported Formats</h2>
      <p>Most video formats contain extractable audio tracks:</p>

      <div class="format-grid">
        <div class="format-item">
          <h4>MP4</h4>
          <p>AAC, MP3 audio</p>
        </div>
        <div class="format-item">
          <h4>MOV</h4>
          <p>Various codecs</p>
        </div>
        <div class="format-item">
          <h4>AVI</h4>
          <p>MP3, PCM</p>
        </div>
        <div class="format-item">
          <h4>MKV</h4>
          <p>Multiple tracks</p>
        </div>
        <div class="format-item">
          <h4>WebM</h4>
          <p>Vorbis, Opus</p>
        </div>
      </div>

      <h2>Audio Quality Considerations</h2>
      <p>When extracting audio, maintain quality by:</p>
      <ul>
        <li>Preserving original bitrate for best quality</li>
        <li>Choosing appropriate output format (MP3, AAC, WAV)</li>
        <li>Considering sample rate (44.1kHz for music, 48kHz for video)</li>
        <li>Keeping metadata when possible</li>
      </ul>

      <h2>Advanced Features</h2>
      <p>Modern extraction tools allow you to:</p>
      <ul>
        <li>Select specific audio tracks from multi-track videos</li>
        <li>Adjust volume levels during extraction</li>
        <li>Apply basic audio processing and normalization</li>
        <li>Batch process multiple files</li>
      </ul>

      <div class="code-example">
        <h4>FFmpeg Audio Extraction</h4>
        <pre><code># Extract audio from video
ffmpeg -i input.mp4 -vn -acodec copy output.aac

# Convert to MP3 with specific bitrate
ffmpeg -i input.mp4 -vn -acodec mp3 -ab 192k output.mp3

# Extract specific audio track
ffmpeg -i input.mkv -map 0:a:1 -acodec copy output.flac</code></pre>
      </div>

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
      <div class="blog-intro">
        <p>GIFs are incredibly engaging on social platforms, with studies showing they can increase engagement by up to 30%. Converting videos to GIFs allows you to create shareable, loopable content from your video assets.</p>
      </div>

      <h2>The Power of GIFs in Social Media</h2>
      <p>GIFs offer unique advantages over traditional video content:</p>
      <ul>
        <li><strong>Auto-play:</strong> No user interaction required</li>
        <li><strong>Looping:</strong> Continuous playback without end</li>
        <li><strong>Universal compatibility:</strong> Works everywhere</li>
        <li><strong>Small file size:</strong> Easy to share and load quickly</li>
        <li><strong>Attention-grabbing:</strong> Higher engagement rates</li>
      </ul>

      <h2>Optimal GIF Specifications</h2>
      <p>For maximum social media impact:</p>

      <div class="gif-specs">
        <div class="spec-item">
          <h3>Duration</h3>
          <p>3-6 seconds</p>
          <span class="spec-note">Maximum engagement</span>
        </div>
        <div class="spec-item">
          <h3>Resolution</h3>
          <p>480p to 720p</p>
          <span class="spec-note">Platform dependent</span>
        </div>
        <div class="spec-item">
          <h3>Frame Rate</h3>
          <p>10-15 fps</p>
          <span class="spec-note">Quality vs size balance</span>
        </div>
        <div class="spec-item">
          <h3>File Size</h3>
          <p>Under 5MB</p>
          <span class="spec-note">Most platforms</span>
        </div>
      </div>

      <h2>Platform-Specific Optimization</h2>

      <div class="platform-guide">
        <div class="platform-card">
          <h3>Twitter</h3>
          <ul>
            <li>Square or landscape</li>
            <li>Under 5MB</li>
            <li>MP4 fallback support</li>
          </ul>
        </div>
        <div class="platform-card">
          <h3>Instagram</h3>
          <ul>
            <li>Square format preferred</li>
            <li>Stories: vertical</li>
            <li>Feed: any aspect ratio</li>
          </ul>
        </div>
        <div class="platform-card">
          <h3>Facebook</h3>
          <ul>
            <li>Supports higher resolution</li>
            <li>Auto-plays in feed</li>
            <li>Custom thumbnails</li>
          </ul>
        </div>
      </div>

      <h2>Quality Optimization Techniques</h2>
      <p>Create high-quality GIFs by:</p>
      <ol>
        <li><strong>Selecting dynamic content:</strong> Choose the most engaging portion of your video</li>
        <li><strong>Optimizing color palette:</strong> Reduce colors to minimize file size</li>
        <li><strong>Applying dithering:</strong> Smooth color transitions</li>
        <li><strong>Testing frame rates:</strong> Find the best quality-to-size ratio</li>
        <li><strong>Using stabilization:</strong> Reduce motion blur</li>
      </ol>

      <h2>Tools and Automation</h2>
      <p>Modern conversion tools offer advanced features like automatic scene detection, color palette optimization, and batch processing for creating multiple GIFs efficiently.</p>

      <div class="code-example">
        <h4>GIF Creation with FFmpeg</h4>
        <pre><code># Convert video to GIF
ffmpeg -i input.mp4 \\
  -vf "fps=15,scale=480:-1:flags=lanczos" \\
  -c:v gif \\
  output.gif

# Optimize with gifsicle
gifsicle -O3 output.gif -o optimized.gif</code></pre>
      </div>
    `
  }
];


const AdBanner300 = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";
    const cfg = document.createElement("script");
    cfg.text = "atOptions = {'key':'c55b159783e57c46697eac82f170dc8c','format':'iframe','height':250,'width':300,'params':{}};";
    const invoke = document.createElement("script");
    invoke.src = "https://www.highperformanceformat.com/c55b159783e57c46697eac82f170dc8c/invoke.js";
    invoke.async = true;
    container.appendChild(cfg);
    container.appendChild(invoke);
  }, []);
  return (
    <div className="flex justify-center overflow-hidden">
      <div ref={ref} style={{ width: 300, height: 250 }} />
    </div>
  );
};

const AdBanner728 = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";
    const cfg = document.createElement("script");
    cfg.text = "atOptions = {'key':'6e102c6823d72b9aa42e3220c340e24b','format':'iframe','height':90,'width':728,'params':{}};";
    const invoke = document.createElement("script");
    invoke.src = "https://www.highperformanceformat.com/6e102c6823d72b9aa42e3220c340e24b/invoke.js";
    invoke.async = true;
    container.appendChild(cfg);
    container.appendChild(invoke);
  }, []);
  return (
    <div className="my-6 flex justify-center overflow-hidden">
      <div ref={ref} style={{ width: 728, maxWidth: "100%" }} />
    </div>
  );
};const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black text-zinc-900 mb-4">Post Not Found</h1>
          <p className="text-zinc-500 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-block rounded-full bg-orange-600 px-6 py-3 text-white font-semibold hover:bg-orange-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Featured Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AdBanner728 />
            <div
              className="blog-content prose prose-zinc max-w-none prose-headings:text-zinc-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-zinc-900 prose-strong:font-semibold prose-ul:text-zinc-700 prose-ol:text-zinc-700 prose-li:mb-3 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-600 prose-blockquote:bg-zinc-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <AdBanner728 />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Card */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-7 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                    alt="Convertly Team"
                    className="w-14 h-14 rounded-full ring-3 ring-orange-200"
                  />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Convertly Team</h4>
                    <p className="text-xs text-orange-700 font-medium">File Conversion Experts</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  We help creators and businesses optimize their digital media for better performance and user experience.
                </p>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-3xl p-7 border border-zinc-200 shadow-sm">
                <h4 className="font-bold text-zinc-900 mb-5 text-base">Related Posts</h4>
                <div className="space-y-5">
                  {blogPosts
                    .filter(p => p.slug !== post.slug)
                    .slice(0, 3)
                    .map(relatedPost => (
                      <Link
                        key={relatedPost.slug}
                        to={`/blog/${relatedPost.slug}`}
                        className="block group p-4 rounded-2xl bg-zinc-50 hover:bg-orange-50 transition-all duration-300 border border-transparent hover:border-orange-200"
                      >
                        <h5 className="font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors text-sm leading-snug mb-2">
                          {relatedPost.title}
                        </h5>
                        <p className="text-xs text-zinc-500 group-hover:text-orange-600 transition-colors">{relatedPost.readTime}</p>
                      </Link>
                    ))}
                </div>
              <AdBanner300 />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Custom Styles */}
      <style jsx>{`
        .blog-content .blog-intro {
          font-size: 1.25rem;
          line-height: 1.75;
          color: #374151;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .blog-content .format-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .blog-content .format-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
        }

        .blog-content .format-card h3 {
          color: #111827;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .blog-content .format-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .blog-content .stat {
          background: #fed7aa;
          color: #9a3412;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .blog-content .platform-guide {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }

        .blog-content .platform-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .blog-content .platform-card h3 {
          color: #111827;
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .blog-content .platform-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .blog-content .platform-card li {
          color: #374151;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .blog-content .comparison-table {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          overflow: hidden;
          margin: 2rem 0;
        }

        .blog-content .comparison-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .blog-content .comparison-row:last-child {
          border-bottom: none;
        }

        .blog-content .feature {
          font-weight: 600;
          color: #111827;
        }

        .blog-content .webp {
          color: #059669;
          font-weight: 600;
        }

        .blog-content .jpeg {
          color: #6b7280;
        }

        .blog-content .interpolation-guide {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .blog-content .interpolation-method {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .blog-content .interpolation-method h3 {
          color: #111827;
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .blog-content .format-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }

        .blog-content .format-item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1rem;
          text-align: center;
        }

        .blog-content .format-item h4 {
          color: #111827;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .blog-content .format-item p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .blog-content .gif-specs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }

        .blog-content .spec-item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
        }

        .blog-content .spec-item h3 {
          color: #111827;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .blog-content .spec-item p {
          color: #059669;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .blog-content .spec-note {
          color: #6b7280;
          font-size: 0.75rem;
        }

        .blog-content .code-example {
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 1rem;
          padding: 1.5rem;
          margin: 2rem 0;
          overflow-x: auto;
        }

        .blog-content .code-example h4 {
          color: #f9fafb;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .blog-content .code-example pre {
          margin: 0;
          background: transparent;
          padding: 0;
        }

        .blog-content .code-example code {
          color: #e5e7eb;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default BlogPostPage;
