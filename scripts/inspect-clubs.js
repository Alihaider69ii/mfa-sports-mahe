const cheerio = require('cheerio');

async function testClubs() {
  const res = await fetch('https://www.mfasportsmahe.com/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('Searching for club elements...');
  $('*').each((i, el) => {
    const text = $(el).text();
    if (text.includes('AC Milan') || text.includes('Al Nassr') || text.includes('Arsenal')) {
      if ($(el).is('a')) {
        console.log('Found club link:', $(el).attr('href'), $(el).text().trim());
      }
    }
  });

  // Also check sections with "Club"
  $('[class*="club"], [id*="club"]').each((i, el) => {
    console.log('Club section:', $(el).attr('class'), $(el).attr('id'));
  });
}

testClubs().catch(console.error);
