const cheerio = require('cheerio');

async function testPolicies() {
  for (const path of ['/Return-Policy', '/Shiiping-Policy']) {
    console.log('\n--- Policy:', path, '---');
    const res = await fetch(`https://www.mfasportsmahe.com${path}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const content = $('body').text().replace(/\s+/g, ' ');
    console.log(content.slice(0, 500));
  }
}

testPolicies().catch(console.error);
