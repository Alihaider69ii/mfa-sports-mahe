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
  const html = await get('https://www.mfasportsmahe.com/club-collections/');
  const $ = cheerio.load(html);

  console.log('=== CLUBS ON /club-collections/ ===');
  $('a, div, .col').each((i, el) => {
    const img = $(el).find('img').attr('src') || '';
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    const href = $(el).attr('href') || '';
    if (img && (href.includes('club') || href.includes('Product') || href.includes('SubCategory') || text.length < 50)) {
      console.log(`Club: text="${text}", href="${href}", img="${img}"`);
    }
  });

  // Also print all img tags with their parent links
  $('img').each((i, el) => {
    const src = $(el).attr('src') || '';
    const alt = $(el).attr('alt') || '';
    const parentA = $(el).closest('a').attr('href') || '';
    const parentText = $(el).closest('a').text().replace(/\s+/g, ' ').trim() || $(el).parent().text().replace(/\s+/g, ' ').trim();
    console.log(`IMG: src="${src}", alt="${alt}", link="${parentA}", text="${parentText}"`);
  });
}

main();
