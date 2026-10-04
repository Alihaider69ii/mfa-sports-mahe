const https = require('https');
const cheerio = require('cheerio');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => resolve(d));
    });
  });
}

async function main() {
  for (let page = 1; page <= 6; page++) {
    const url = `https://www.mfasportsmahe.com/club-collections/?page=${page}`;
    const html = await get(url);
    const $ = cheerio.load(html);
    console.log(`=== PAGE ${page} ===`);
    $('a[href*="/Product/"]').each((i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().replace(/\s+/g, ' ').trim() || $(el).closest('div').text().replace(/\s+/g, ' ').trim();
      const img = $(el).find('img').attr('src') || $(el).parent().find('img').attr('src') || '';
      if (img && img.includes('SubCategory')) {
        console.log(`Club: name="${text}", img="${img}", href="${href}"`);
      }
    });
  }
}

main();
