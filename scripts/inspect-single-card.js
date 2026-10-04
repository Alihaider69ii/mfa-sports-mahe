const cheerio = require('cheerio');

async function testFullCard() {
  const res = await fetch('https://www.mfasportsmahe.com/Products/5-sleeves/');
  const html = await res.text();
  const $ = cheerio.load(html);

  const firstImg = $('img[src*="media/Images/Product"]').first();
  const card = firstImg.closest('.col-xl-4, .col-lg-4, .col-md-6, .col-sm-6, .col-6, [class*="col-"]');
  console.log('--- Product Card HTML ---');
  console.log(card.html());
}

testFullCard().catch(console.error);
