const cheerio = require('cheerio');

async function testDesc() {
  const url = 'https://www.mfasportsmahe.com/Products/barcelona-vs-spider-man-embroidery-with-collar-ove';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // find element containing "Size Chart"
  $('*').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Size Chart') && $(el).children().length === 0) {
      console.log('Tag:', el.tagName, 'Parent:', $(el).parent().prop('tagName'), 'Class:', $(el).parent().attr('class'));
      console.log('Parent HTML:\n', $(el).parent().html());
    }
  });

  // Also check main product images on the detail page (not similar products)
  console.log('\n--- Detail product images: ---');
  $('img.xzoom, .xzoom-thumbs img, .xzoom-container img').each((i, el) => {
    console.log('xzoom img:', $(el).attr('src'), $(el).attr('xoriginal'));
  });
}

testDesc().catch(console.error);
