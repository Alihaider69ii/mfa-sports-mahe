const cheerio = require('cheerio');

async function test() {
  const catUrl = 'https://www.mfasportsmahe.com/Products/embroidery-jersey/';
  console.log('Fetching category:', catUrl);
  const res = await fetch(catUrl);
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('Category Title:', $('title').text());
  
  // Find product links in this category
  const productLinks = [];
  $('a[href*="/Products/"], a[href*="/Product/"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href !== '/Products/embroidery-jersey/' && !productLinks.includes(href)) {
      productLinks.push(href);
    }
  });
  console.log('Product links in category (first 5):', productLinks.slice(0, 5));

  // Let's check pagination / View All
  const paginationLinks = [];
  $('.pagination a, [class*="pagination"] a, a[href*="page"]').each((i, el) => {
    paginationLinks.push({ href: $(el).attr('href'), text: $(el).text().trim() });
  });
  console.log('Pagination links:', paginationLinks);

  // If we have a product link, let's fetch the first product to inspect its DOM structure!
  if (productLinks.length > 0) {
    const prodUrl = new URL(productLinks[0], 'https://www.mfasportsmahe.com').href;
    console.log('\nFetching product:', prodUrl);
    const pRes = await fetch(prodUrl);
    const pHtml = await pRes.text();
    const p$ = cheerio.load(pHtml);

    console.log('Product Title:', p$('title').text());
    console.log('Product h1 / h2:', p$('h1, h2').map((i, el) => p$(el).text().trim()).get());
    console.log('Price elements:', p$('.price, [class*="price"], .product-price').map((i, el) => p$(el).text().trim()).get());
    console.log('Sizes:', p$('.size, select, [class*="size"]').map((i, el) => p$(el).text().trim()).get());
    console.log('Images:', p$('img[src*="product"], img[src*="media"]').map((i, el) => p$(el).attr('src')).get());
  }

  // Also fetch club collections
  const clubRes = await fetch('https://www.mfasportsmahe.com/club-collections/');
  const clubHtml = await clubRes.text();
  const club$ = cheerio.load(clubHtml);
  const clubs = [];
  club$('a[href]').each((i, el) => {
    const href = club$(el).attr('href');
    const text = club$(el).text().trim();
    if (href && (href.includes('club') || href.includes('Club') || href.includes('ProductSearch'))) {
      clubs.push({ href, text });
    }
  });
  console.log('\nClub collection links (first 10):', clubs.slice(0, 10));
}

test().catch(console.error);
