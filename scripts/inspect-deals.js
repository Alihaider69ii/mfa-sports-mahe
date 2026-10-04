const cheerio = require('cheerio');

async function testDealOfTheDay() {
  const res = await fetch('https://www.mfasportsmahe.com/');
  const html = await res.text();
  const $ = cheerio.load(html);

  $('h2:contains("Deal of the day")').each((i, el) => {
    const section = $(el).closest('section, div.container, div.row').parent();
    console.log('Section HTML snippet:');
    console.log(section.html()?.slice(0, 1000));
    
    // find all product items inside this section
    section.find('.product-box, [class*="product"]').each((j, p) => {
      const title = $(p).find('p, h6, h5').text().trim().replace(/\s+/g, ' ');
      const link = $(p).find('a').attr('href');
      console.log('Deal product:', title, 'link:', link);
    });
  });
}

testDealOfTheDay().catch(console.error);
