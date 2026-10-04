const cheerio = require('cheerio');

async function testProductDetail() {
  const url = 'https://www.mfasportsmahe.com/Products/barcelona-vs-spider-man-embroidery-with-collar-ove';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- Product Detail ---');
  console.log('Title tag:', $('title').text().trim());
  console.log('H1/H2:', $('h1, h2, h3, h4').map((i, el) => $(el).text().trim()).get());

  // Images
  const images = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && (src.includes('/media/') || src.includes('Product'))) {
      images.push(src);
    }
  });
  console.log('Images:', [...new Set(images)]);

  // Sizes
  const sizes = [];
  $('.size-box, [class*="size"], select option, .sizes button, .size-list li, label').each((i, el) => {
    const t = $(el).text().trim();
    if (t && ['S', 'M', 'L', 'XL', 'XXL', '3XL', 'XS', '36', '38', '40', '42', '44'].includes(t)) {
      sizes.push(t);
    }
  });
  console.log('Sizes detected:', [...new Set(sizes)]);

  // Description / Details
  console.log('Description text:');
  $('[class*="description"], [class*="desc"], #description, .product-details').each((i, el) => {
    console.log($(el).text().trim().slice(0, 300));
  });

  // Let's also check breadcrumbs or category/club tags
  console.log('Breadcrumbs:');
  $('.breadcrumb, [class*="breadcrumb"]').each((i, el) => {
    console.log($(el).text().trim().replace(/\s+/g, ' '));
  });
}

testProductDetail().catch(console.error);
