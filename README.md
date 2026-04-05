# Convertly - Online File Converter

A powerful, simple, and fast online file conversion platform.

## Features
- **Image Tools**: PNG to WebP, JPG to WebP, WebP to PNG, Compress, Resize (50%), Rotate (90deg), PNG to JPG, JPG to PNG.
- **Video Tools**: Video to MP4, Extract Audio (MP3), Video to GIF.
- **Bulk Processing**: Upload up to 10 files at once.
- **Privacy**: Files are automatically deleted after 30 minutes.

## 🚀 New Features Added
- **Bulk Conversion**: Now supports up to 10 files at once.
- **Image Manipulation**: Added Resize (50%) and Rotate (90°) tools.
- **Improved UI**: Refined hero section, better spacing, and smooth animations.
- **Monetization Ready**: Integrated placeholder ad slots for Google AdSense.
- **Legal Pages**: Added Privacy Policy, Terms of Service, and Contact Us pages.
- **Pro Plan Simulation**: A realistic checkout flow for demonstration.

## 🛠️ How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer.

### Steps
1. **Extract the ZIP**: Unzip the downloaded files into a folder.
2. **Open Terminal**: Open your command prompt or terminal in that folder.
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open in Browser**: Go to `http://localhost:3000`.

*Note: Do not open `index.html` directly as it will cause MIME type errors.*

## 🌐 Deployment (Free)
To go live for free, use **Render.com** or **Railway.app**:
1. Connect your GitHub repository.
2. Build Command: `npm run build`
3. Start Command: `node server.ts`
4. Set Environment Variable: `NODE_ENV=production`

## 💰 Monetization & Ads
1. **Google AdSense**: Replace the `Ad Space` placeholders in `HomePage.tsx` and `ToolPage.tsx` with your AdSense code.
2. **Custom Domain**: For better AdSense approval, consider buying a `.com` domain from Namecheap or Google Domains.
3. **Ezoic**: A great alternative to AdSense that often pays higher for utility websites.

