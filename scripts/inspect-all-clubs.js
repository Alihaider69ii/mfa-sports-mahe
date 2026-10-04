const cheerio = require('cheerio');

async function testAllClubs() {
  const res = await fetch('https://www.mfasportsmahe.com/club-collections/');
  const html = await res.text();
  const $ = cheerio.load(html);

  const clubs = [];
  $('a[href^="/Product/"]').each((i, el) => {
    const name = $(el).text().trim();
    const href = $(el).attr('href');
    if (name && href && !clubs.some(c => c.href === href)) {
      clubs.push({ name, href, slug: href.replace('/Product/', '').replace('/', '') });
    }
  });

  console.log('Total clubs found:', clubs.length);
  console.log('Clubs:', clubs);
}

testAllClubs().catch(console.error);
