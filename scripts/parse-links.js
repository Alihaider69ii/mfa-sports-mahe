const cheerio = require('cheerio');

async function main() {
  const res = await fetch('https://www.mfasportsmahe.com/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('Title:', $('title').text());

  const links = new Set();
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('javascript') && !href.startsWith('#')) {
      links.add(href);
    }
  });

  console.log('\nTotal unique links:', links.size);
  const arr = Array.from(links);

  console.log('\n--- Category links ---');
  arr.filter(l => l.toLowerCase().includes('category') || l.toLowerCase().includes('collection') || l.includes('ProductSearch')).forEach(l => console.log(l));

  console.log('\n--- Club links ---');
  arr.filter(l => l.toLowerCase().includes('club')).forEach(l => console.log(l));

  console.log('\n--- Sample product links (10) ---');
  arr.filter(l => l.toLowerCase().includes('/product')).slice(0, 10).forEach(l => console.log(l));

  console.log('\n--- Policy / footer links ---');
  arr.filter(l => l.toLowerCase().includes('policy') || l.toLowerCase().includes('terms') || l.toLowerCase().includes('return') || l.toLowerCase().includes('shipping') || l.toLowerCase().includes('privacy')).forEach(l => console.log(l));
}

main().catch(console.error);
