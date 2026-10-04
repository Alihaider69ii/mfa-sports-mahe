const cheerio = require('cheerio');

async function testGalleryContainer() {
  const url = 'https://www.mfasportsmahe.com/Products/barcelona-vs-spider-man-embroidery-with-collar-ove';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // find any img with xzoom or inside slider-nav / slider-for
  console.log('Finding slider/gallery containers:');
  $('[class*="slider-for"], [class*="slider-nav"], [class*="xzoom"], [class*="thumb"], [class*="product-image"]').each((i, el) => {
    console.log('Class:', $(el).attr('class'), 'Tag:', el.tagName);
    $(el).find('img').each((j, img) => {
      console.log('   img:', $(img).attr('src'));
    });
  });
}

testGalleryContainer().catch(console.error);
