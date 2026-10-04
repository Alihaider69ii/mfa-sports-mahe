const fs = require('fs');
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
  const html = await get('https://www.mfasportsmahe.com/');
  const $ = cheerio.load(html);

  console.log('=== CLUBS / SUBCATEGORIES ON HOME PAGE ===');
  $('a[href*="SubCategory"], a[href*="Subcategory"], a[href*="club"], [class*="subcategory"], [class*="club"]').each((i, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    const href = $(el).attr('href') || '';
    const img = $(el).find('img').attr('src') || '';
    console.log(`Club item: "${text}" -> href: "${href}", img: "${img}"`);
  });

  console.log('=== ALL SUBCATEGORY IMAGES ===');
  $('img[src*="SubCategory"]').each((i, el) => {
    console.log('SubCategory img:', $(el).attr('src'), 'alt:', $(el).attr('alt'), 'parent text:', $(el).parent().text().replace(/\s+/g, ' ').trim());
  });
}

main();
