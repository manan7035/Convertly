import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.convertlytools.in';

const pages = [
  {
    path: 'png-to-webp',
    title: 'PNG to WebP Converter - Free Online Tool | Convertly Tools',
    description: 'Convert PNG to WebP online for free. Reduce file size by up to 80% with no quality loss. Browser-based, no upload, instant download. Bulk convert up to 10 files.',
  },
  {
    path: 'jpg-to-webp',
    title: 'JPG to WebP Converter - Free Online Tool | Convertly Tools',
    description: 'Convert JPG to WebP online free. Smaller file sizes, faster websites. No upload required — conversion happens in your browser instantly.',
  },
  {
    path: 'webp-to-png',
    title: 'WebP to PNG Converter - Free Online Tool | Convertly Tools',
    description: 'Convert WebP to PNG online for free. Lossless conversion, full transparency support. Works in your browser with no file upload needed.',
  },
  {
    path: 'png-to-jpg',
    title: 'PNG to JPG Converter - Free Online Tool | Convertly Tools',
    description: 'Convert PNG to JPG online for free. Reduce file size dramatically. Transparent areas filled with white background. Bulk convert up to 10 files.',
  },
  {
    path: 'jpg-to-png',
    title: 'JPG to PNG Converter - Free Online Tool | Convertly Tools',
    description: 'Convert JPG to PNG online for free. Lossless quality, full transparency support. Instant browser-based conversion with no file upload.',
  },
  {
    path: 'compress-image',
    title: 'Compress Image Online Free - Reduce Image File Size | Convertly Tools',
    description: 'Compress PNG, JPG and WebP images online for free. Reduce file size by 50-80% without visible quality loss. No upload, instant results.',
  },
  {
    path: 'resize-image',
    title: 'Resize Image Online Free - Custom Pixel Dimensions | Convertly Tools',
    description: 'Resize images to any pixel dimensions online for free. Maintain aspect ratio automatically. Bulk resize up to 10 images at once in your browser.',
  },
  {
    path: 'rotate-image',
    title: 'Rotate Image Online Free - 90, 180, 270 Degrees | Convertly Tools',
    description: 'Rotate images 90°, 180° or 270° online for free. Fix sideways photos instantly in your browser. No upload, no sign-up required.',
  },
  {
    path: 'crop-image',
    title: 'Crop Image Online Free - Drag to Select | Convertly Tools',
    description: 'Crop images online for free with drag-to-select. Presets for Instagram, YouTube, Twitter and more. Browser-based, no upload needed.',
  },
];

const template = (page) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <link rel="canonical" href="${BASE_URL}/${page.path}" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:url" content="${BASE_URL}/${page.path}" />
  <meta property="og:type" content="website" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <script>window.location.href="/${page.path}";</script>
</head>
<body>
  <h1>${page.title}</h1>
  <p>${page.description}</p>
  <p><a href="/${page.path}">Open ${page.title}</a></p>
</body>
</html>`;

// Write to public folder so Vite copies them to dist
pages.forEach(page => {
  const dir = path.join('public', page.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), template(page));
  console.log(`Created public/${page.path}/index.html`);
});

console.log('Prerender complete!');
