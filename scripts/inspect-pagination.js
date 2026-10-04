const cheerio = require('cheerio');

async function testPaginationJs() {
  const res = await fetch('https://www.mfasportsmahe.com/Products/embroidery-jersey/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('Finding scripts with page, ajax, pagination:');
  $('script').each((i, el) => {
    const text = $(el).html();
    if (text && (text.includes('pagination') || text.includes('page') || text.includes('filter') || text.includes('sort'))) {
      console.log('--- Script snippet ---');
      console.log(text.slice(0, 500));
    }
  });

  // Also test if ?page=2 works
  const p2Res = await fetch('https://www.mfasportsmahe.com/Products/embroidery-jersey/?page=2');
  const p2Html = await p2Res.text();
  const $p2 = cheerio.load(p2Html);
  console.log('Page 2 title:', $p2('title').text());
  console.log('Page 2 first product card text:', $p2('.product-box p').first().text().trim());
  console.log('Page 1 first product card text:', $('.product-box p').first().text().trim());
}

testPaginationJs().catch(console.error);
