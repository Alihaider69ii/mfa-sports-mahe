const cheerio = require('cheerio');

async function testImages() {
  const url = 'https://www.mfasportsmahe.com/Products/barcelona-vs-spider-man-embroidery-with-collar-ove';
  const res = await fetch(url);
  const html = await res.text();
  const parts = html.split(/Similar Products/i);
  const productSection = parts[0];
  const $p = cheerio.load(productSection);

  const images = [];
  $p('img').each((i, el) => {
    const src = $p(el).attr('src');
    if (src && src.includes('/media/Images/Product/')) {
      images.push(src);
    }
  });

  console.log('Product main images:');
  [...new Set(images)].forEach(img => console.log('IMG:', img));
}

testImages().catch(console.error);
