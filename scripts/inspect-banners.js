const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function run() {
  const html = await fetchPage('https://www.mfasportsmahe.com/');
  const $ = cheerio.load(html);

  console.log('=== ALL CAROUSEL / SLIDER / BANNER CONTAINERS ===');
  $('[class*="slide"], [class*="carousel"], [class*="banner"], [class*="hero"]').each((i, el) => {
    const cls = $(el).attr('class') || '';
    const id = $(el).attr('id') || '';
    const imgs = $(el).find('img').map((_, im) => $(im).attr('src')).get();
    if (imgs.length > 0) {
      console.log(`Container: id="${id}" class="${cls}"`);
      console.log('Images:', imgs);
    }
  });

  console.log('=== ALL RAW BANNER/IMAGE TAGS ===');
  $('img').each((i, el) => {
    const src = $(el).attr('src') || '';
    if (src.includes('Banner') || src.includes('poster') || src.includes('slider') || src.includes('Category') || src.includes('WA')) {
      console.log('Tag src:', src, 'Alt:', $(el).attr('alt'));
    }
  });
}

run();
