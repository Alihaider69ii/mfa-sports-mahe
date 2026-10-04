const cheerio = require('cheerio');

async function testPaginationHtml() {
  const res = await fetch('https://www.mfasportsmahe.com/Products/embroidery-jersey/');
  const html = await res.text();
  const $ = cheerio.load(html);

  $('.pagination, [class*="pagination"]').each((i, el) => {
    console.log('Pagination HTML:', $(el).html());
  });
}

testPaginationHtml().catch(console.error);
