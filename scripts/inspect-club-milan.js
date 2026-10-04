const cheerio = require('cheerio');

async function testClubPage() {
  const url = 'https://www.mfasportsmahe.com/Product/ac-milan-8/';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('Club page title:', $('title').text());
  console.log('Club heading:', $('h1, h2, h3').map((i, el) => $(el).text().trim()).get().slice(0, 5));
  console.log('Product cards found:');
  $('.product-box a[href*="/Products/"]').each((i, el) => {
    if (i < 5) console.log($(el).attr('href'), $(el).text().trim());
  });
}

testClubPage().catch(console.error);
