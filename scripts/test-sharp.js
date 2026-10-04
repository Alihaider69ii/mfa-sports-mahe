const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function testSharp() {
  const imgUrl = 'https://www.mfasportsmahe.com/media/Images/Product/1000107708.jpg';
  const res = await fetch(imgUrl);
  const buffer = Buffer.from(await res.arrayBuffer());

  const outDir = path.join(__dirname, '..', 'public', 'img', 'test');
  fs.mkdirSync(outDir, { recursive: true });

  await sharp(buffer)
    .resize(360, 360, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, 'sample-360.webp'));

  console.log('Sharp processed image successfully!');
}

testSharp().catch(console.error);
