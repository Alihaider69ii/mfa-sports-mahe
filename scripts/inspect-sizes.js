const cheerio = require('cheerio');

async function testProductDetailsMore() {
  const url = 'https://www.mfasportsmahe.com/Products/barcelona-vs-spider-man-embroidery-with-collar-ove';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- Size section HTML ---');
  console.log($('*:contains("Choose Size")').last().parent().html()?.slice(0, 1000));

  console.log('\n--- Gallery / Image slider HTML ---');
  $('.xzoom, .xzoom-gallery, .slider, .product-slider, [class*="gallery"]').each((i, el) => {
    console.log('Found gallery element:', $(el).attr('class'), $(el).html()?.slice(0, 400));
  });
}

testProductDetailsMore().catch(console.error);
