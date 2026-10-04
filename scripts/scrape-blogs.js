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
  const listHtml = await get('https://www.mfasportsmahe.com/Blogs');
  const $list = cheerio.load(listHtml);
  console.log('=== BLOG LIST ===');
  $list('a[href*="/Blog/"]').each((i, el) => {
    console.log('Blog link:', $list(el).attr('href'), $list(el).text().replace(/\s+/g, ' ').trim());
  });

  const b1 = await get('https://www.mfasportsmahe.com/Blog/we-promote-football');
  const $1 = cheerio.load(b1);
  console.log('=== BLOG 1 ===');
  console.log('Heading:', $1('h1, h2, h3').text().replace(/\s+/g, ' ').trim());
  console.log('Imgs:', $1('img').map((i, el) => $1(el).attr('src')).get().filter(s => s.includes('Blog')));
  console.log('Paragraphs:', $1('p').map((i, el) => $1(el).text().trim()).get().filter(t => t.length > 20));

  const b2 = await get('https://www.mfasportsmahe.com/Blog/our-happy-faces');
  const $2 = cheerio.load(b2);
  console.log('=== BLOG 2 ===');
  console.log('Heading:', $2('h1, h2, h3').text().replace(/\s+/g, ' ').trim());
  console.log('Imgs:', $2('img').map((i, el) => $2(el).attr('src')).get().filter(s => s.includes('Blog')));
  console.log('Paragraphs:', $2('p').map((i, el) => $2(el).text().trim()).get().filter(t => t.length > 20));
}

main();
