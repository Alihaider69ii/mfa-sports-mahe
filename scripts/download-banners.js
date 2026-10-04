const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const IMAGES_TO_FETCH = [
  { url: 'https://www.mfasportsmahe.com/media/Images/Banner/poster_8tgC9O0.png', name: 'hero-banner-1.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Banner/IMG-20241001-WA0073.jpg', name: 'hero-banner-2.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Blog/IMG_20240427_142750.jpg', name: 'blog-football.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Blog/Screenshot_22.png', name: 'blog-faces.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Category/IMG-20241001-WA0040.jpg', name: 'cat-5sleeves.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Category/26fe2af32fb5b9cb5423dc6109880f45.jpg', name: 'cat-retro.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Category/Picsart_24-04-23_18-40-37-138.jpg', name: 'cat-embroidery.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Category/Picsart_24-04-23_19-00-43-992.jpg', name: 'cat-player.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Category/Picsart_25-03-08_16-09-21-886.jpg', name: 'cat-imported.webp' },
  { url: 'https://www.mfasportsmahe.com/media/Images/Category/download.jpg', name: 'cat-worldcup.webp' },
];

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
  });
}

async function run() {
  const bannerDir = path.join(process.cwd(), 'public', 'img', 'banners');
  const blogDir = path.join(process.cwd(), 'public', 'img', 'blogs');
  if (!fs.existsSync(bannerDir)) fs.mkdirSync(bannerDir, { recursive: true });
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  for (const item of IMAGES_TO_FETCH) {
    try {
      console.log(`Downloading ${item.url}...`);
      const buf = await download(item.url);
      const outDir = item.name.startsWith('blog') ? blogDir : bannerDir;
      const targetPath = path.join(outDir, item.name);

      await sharp(buf)
        .webp({ quality: 85 })
        .toFile(targetPath);
      console.log(`Saved: ${targetPath} (${buf.length} bytes -> WebP)`);
    } catch (err) {
      console.error(`Error downloading ${item.url}:`, err.message);
    }
  }
}

run();
