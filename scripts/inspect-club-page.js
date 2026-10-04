const cheerio = require('cheerio');

async function testClubCollectionsPage() {
  const res = await fetch('https://www.mfasportsmahe.com/club-collections/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('Title:', $('title').text());
  console.log('Heading:', $('h1, h2, h3').map((i, el) => $(el).text().trim()).get());

  $('a').each((i, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    const href = $(el).attr('href');
    if (text && href && !href.startsWith('#') && !href.startsWith('javascript')) {
      console.log(text, '=>', href);
    }
  });

  // Also check images with club names
  $('img').each((i, el) => {
    const src = $(el).attr('src') || '';
    const alt = $(el).attr('alt') || '';
    if (src.includes('club') || alt.includes('club')) {
      console.log('Club img:', src, alt);
    }
  });
}

testClubCollectionsPage().catch(console.error);
