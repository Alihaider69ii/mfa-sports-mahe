const cheerio = require('cheerio');

async function testCard() {
  const res = await fetch('https://www.mfasportsmahe.com/Products/5-sleeves/');
  const html = await res.text();
  const $ = cheerio.load(html);

  // Look for card containers, images, and links around product items
  console.log('Searching for product card elements...');
  $('[class*="product"], [class*="item"], [class*="card"]').each((i, el) => {
    const cls = $(el).attr('class');
    if (cls && (cls.includes('product-item') || cls.includes('product-card') || cls.includes('single-product') || cls.includes('product_item'))) {
      console.log('Found class:', cls);
      console.log('HTML snippet:', $(el).html().slice(0, 400));
      return false; // break after first
    }
  });

  // Let's also look for all <a> tags that contain /media/Images/Product/
  $('img[src*="media/Images/Product"]').each((i, el) => {
    if (i < 3) {
      console.log('\nProduct Image found:', $(el).attr('src'));
      console.log('Parent HTML:', $(el).closest('div, a').parent().html().slice(0, 500));
    }
  });
}

testCard().catch(console.error);
