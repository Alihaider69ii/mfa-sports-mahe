const cheerio = require('cheerio');

async function testHomeSections() {
  const res = await fetch('https://www.mfasportsmahe.com/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- Headings on Home ---');
  $('h1, h2, h3, h4, h5').each((i, el) => {
    const t = $(el).text().trim().replace(/\s+/g, ' ');
    if (t) console.log(el.tagName, ':', t);
  });
}

testHomeSections().catch(console.error);
