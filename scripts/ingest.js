const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');
const sharp = require('sharp');

const BASE_URL = 'https://www.mfasportsmahe.com';
const MAX_PRODUCTS = 300;
const CACHE_DIR = path.join(__dirname, '..', '.cache');
const CACHE_PAGES = path.join(CACHE_DIR, 'pages');
const CACHE_IMG = path.join(CACHE_DIR, 'images');
const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_IMG_DIR = path.join(__dirname, '..', 'public', 'img', 'products');

[CACHE_PAGES, CACHE_IMG, DATA_DIR, PUBLIC_IMG_DIR].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hashUrl(url) {
  return crypto.createHash('md5').update(url).digest('hex');
}

async function fetchWithCache(url) {
  const hash = hashUrl(url);
  const cacheFile = path.join(CACHE_PAGES, `${hash}.html`);

  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf-8');
  }

  await sleep(1000); // 1 req/sec when uncached
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MFA-Sports-Redesign-Ingester/1.0',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    if (!res.ok) {
      console.warn(`[Fetch Warning] Status ${res.status} for ${url}`);
      return null;
    }

    const html = await res.text();
    fs.writeFileSync(cacheFile, html, 'utf-8');
    return html;
  } catch (err) {
    console.error(`[Fetch Error] ${url}:`, err.message);
    return null;
  }
}

async function downloadAndOptimizeImage(imgSrc) {
  if (!imgSrc) return null;
  const fullUrl = imgSrc.startsWith('http') ? imgSrc : `${BASE_URL}${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`;
  const hash = hashUrl(fullUrl);
  const cachedOrig = path.join(CACHE_IMG, `${hash}.raw`);

  const basename = path.basename(imgSrc).replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const widths = [360, 640, 800];
  const paths = {
    w360: `/img/products/${basename}-360w.webp`,
    w640: `/img/products/${basename}-640w.webp`,
    w800: `/img/products/${basename}-800w.webp`,
  };

  // If all webp files exist, skip completely
  const allExist = widths.every(w => fs.existsSync(path.join(PUBLIC_IMG_DIR, `${basename}-${w}w.webp`)));
  if (allExist) {
    return paths;
  }

  let buffer;
  if (fs.existsSync(cachedOrig)) {
    buffer = fs.readFileSync(cachedOrig);
  } else {
    try {
      const res = await fetch(fullUrl);
      if (!res.ok) return null;
      buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(cachedOrig, buffer);
    } catch (err) {
      return null;
    }
  }

  for (const w of widths) {
    const outFilePath = path.join(PUBLIC_IMG_DIR, `${basename}-${w}w.webp`);
    if (!fs.existsSync(outFilePath)) {
      try {
        await sharp(buffer)
          .resize(w, w, { fit: 'cover', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outFilePath);
      } catch (err) {
        // Fallback silently if corrupt image
      }
    }
  }

  return paths;
}

const CATEGORIES = [
  { name: '5-Sleeves', slug: '5-sleeves', path: '/Products/5-sleeves/' },
  { name: 'Cushions', slug: 'cushions', path: '/Products/cushions/' },
  { name: 'Embroidery Jersey', slug: 'embroidery-jersey', path: '/Products/embroidery-jersey/' },
  { name: 'Imported Kits', slug: 'imported-kits', path: '/Products/imported-kits/' },
  { name: 'Jackets', slug: 'jackets', path: '/Products/jackets/' },
  { name: 'Kids', slug: 'kids', path: '/Products/kids/' },
  { name: 'Offer Jersey', slug: 'offer-jersey', path: '/Products/offer-jersey/' },
  { name: 'Photo Frames', slug: 'photo-frames', path: '/Products/photo-frames/' },
  { name: 'Player Version', slug: 'player-version', path: '/Products/player-version/' },
  { name: 'Premium Quality', slug: 'premium-quality', path: '/Products/premium-quality/' },
  { name: 'Retro Jersey', slug: 'retro-jersey', path: '/Products/retro-jersey/' },
  { name: 'Shorts', slug: 'shorts', path: '/Products/shorts/' },
  { name: 'Stockings', slug: 'stockings', path: '/Products/stockings/' },
  { name: 'Sublimation Jersey', slug: 'sublimation-jersey', path: '/Products/sublimation-jersey/' },
  { name: 'T-Shirts', slug: 't-shirts', path: '/Products/t-shirts/' },
  { name: 'World Cup', slug: 'world-cup', path: '/Products/world-cup/' },
];

async function ingest() {
  console.log('=== Starting MFA Sports Data Ingestion ===');

  // 1. Crawl Home Page
  console.log('Step 1: Reading Home Page (from cache)...');
  const homeHtml = await fetchWithCache(BASE_URL);
  const $home = cheerio.load(homeHtml || '');

  const dealSlugs = new Set();
  const newArrivalSlugs = new Set();

  $home('h2:contains("Deal")').closest('section, div.container, div.row').parent().find('a[href^="/Products/"]').each((i, el) => {
    const slug = $home(el).attr('href')?.replace('/Products/', '')?.replace(/\/$/, '');
    if (slug && !slug.includes('?') && !CATEGORIES.some(c => c.slug === slug)) {
      dealSlugs.add(slug);
    }
  });

  $home('h2:contains("New")').closest('section, div.container, div.row').parent().find('a[href^="/Products/"]').each((i, el) => {
    const slug = $home(el).attr('href')?.replace('/Products/', '')?.replace(/\/$/, '');
    if (slug && !slug.includes('?') && !CATEGORIES.some(c => c.slug === slug)) {
      newArrivalSlugs.add(slug);
    }
  });

  console.log(`Discovered ${dealSlugs.size} deals and ${newArrivalSlugs.size} new arrivals.`);

  // 2. Club Collections
  console.log('\nStep 2: Ingesting Club Collections...');
  const clubsHtml = await fetchWithCache(`${BASE_URL}/club-collections/`);
  const $clubs = cheerio.load(clubsHtml || '');
  const clubsMap = new Map();
  const productClubMap = new Map();

  $clubs('a[href^="/Product/"]').each((i, el) => {
    const rawName = $clubs(el).text().trim();
    const href = $clubs(el).attr('href');
    if (rawName && href) {
      const slug = href.replace('/Product/', '').replace(/\/$/, '');
      if (!clubsMap.has(slug)) {
        clubsMap.set(slug, {
          name: rawName,
          slug,
          href,
          productCount: 0,
        });
      }
    }
  });

  for (const [slug, clubObj] of clubsMap.entries()) {
    const clubPageHtml = await fetchWithCache(`${BASE_URL}/Product/${slug}/`);
    if (!clubPageHtml) continue;
    const $c = cheerio.load(clubPageHtml);
    let count = 0;
    $c('.product-box a[href^="/Products/"]').each((i, el) => {
      const pSlug = $c(el).attr('href')?.replace('/Products/', '')?.replace(/\/$/, '');
      if (pSlug) {
        productClubMap.set(pSlug, clubObj.name);
        count++;
      }
    });
    clubObj.productCount = count;
  }
  console.log(`Mapped ${clubsMap.size} clubs.`);

  // 3. Categories & Products
  console.log('\nStep 3: Ingesting Categories & Products...');
  const productsMap = new Map();

  for (const cat of CATEGORIES) {
    if (productsMap.size >= MAX_PRODUCTS) break;

    for (let page = 1; page <= 3; page++) {
      if (productsMap.size >= MAX_PRODUCTS) break;
      const catUrl = page === 1 ? `${BASE_URL}${cat.path}` : `${BASE_URL}${cat.path}?page=${page}`;
      const pageHtml = await fetchWithCache(catUrl);
      if (!pageHtml) break;

      const $cat = cheerio.load(pageHtml);
      const boxes = $cat('.product-box');
      if (boxes.length === 0) break;

      boxes.each((i, el) => {
        if (productsMap.size >= MAX_PRODUCTS) return;

        const box = $cat(el);
        const link = box.find('a[href^="/Products/"]').first().attr('href');
        if (!link) return;
        const slug = link.replace('/Products/', '').replace(/\/$/, '');
        if (!slug || slug.includes('?') || CATEGORIES.some(c => c.slug === slug)) return;

        if (productsMap.has(slug)) {
          const existing = productsMap.get(slug);
          if (!existing.categories.includes(cat.name)) {
            existing.categories.push(cat.name);
          }
          return;
        }

        const name = box.find('p.pt-1, a p, h5, h6').first().text().trim().replace(/\s+/g, ' ');
        const priceText = box.find('h6').first().text().replace(/[^\d]/g, '');
        const mrpText = box.find('.r-price').first().text().replace(/[^\d]/g, '');
        const offerText = box.find('.offer').first().text().trim();
        const rawImgSrc = box.find('img').first().attr('src');

        const price = parseInt(priceText, 10) || 399;
        const mrp = parseInt(mrpText, 10) || (price > 400 ? Math.round(price * 1.4) : 499);
        const discountMatch = offerText.match(/(\d+)%/);
        const discountPercent = discountMatch ? parseInt(discountMatch[1], 10) : Math.round(((mrp - price) / mrp) * 100);

        productsMap.set(slug, {
          slug,
          name: name || slug.toUpperCase().replace(/-/g, ' '),
          price,
          mrp,
          discount: `${discountPercent}% Off`,
          discountPercent,
          category: cat.name,
          categorySlug: cat.slug,
          categories: [cat.name],
          club: productClubMap.get(slug) || null,
          rawImage: rawImgSrc || null,
          images: [],
          sizes: [],
          description: '',
          isDealOfTheDay: dealSlugs.has(slug),
          isNewArrival: newArrivalSlugs.has(slug),
          liveUrl: `${BASE_URL}/Products/${slug}`,
        });
      });
    }
  }

  for (const slug of dealSlugs) {
    if (!productsMap.has(slug) && productsMap.size < MAX_PRODUCTS) {
      productsMap.set(slug, {
        slug,
        name: slug.toUpperCase().replace(/-/g, ' '),
        price: 199,
        mrp: 499,
        discount: '61% Off',
        discountPercent: 61,
        category: 'Offer Jersey',
        categorySlug: 'offer-jersey',
        categories: ['Offer Jersey'],
        club: productClubMap.get(slug) || null,
        rawImage: null,
        images: [],
        sizes: [],
        description: '',
        isDealOfTheDay: true,
        isNewArrival: false,
        liveUrl: `${BASE_URL}/Products/${slug}`,
      });
    } else if (productsMap.has(slug)) {
      productsMap.get(slug).isDealOfTheDay = true;
    }
  }

  console.log(`Discovered ${productsMap.size} unique products.`);

  // 4. Product Details (from cached HTML)
  console.log('\nStep 4: Extracting product details, sizes & galleries from cached pages...');
  const allProducts = Array.from(productsMap.values());

  for (const prod of allProducts) {
    const prodUrl = `${BASE_URL}/Products/${prod.slug}`;
    const detailHtml = await fetchWithCache(prodUrl);
    if (detailHtml) {
      const $p = cheerio.load(detailHtml);

      const h1Name = $p('h1').first().text().trim().replace(/\s+/g, ' ');
      if (h1Name && h1Name.length > 5) {
        prod.name = h1Name;
      }

      const sizes = [];
      $p('.menu .menu-link, .size-box, [data-menu]').each((i, el) => {
        const s = $p(el).text().trim();
        if (s && !sizes.includes(s) && ['S', 'M', 'L', 'XL', 'XXL', '3XL', 'XS', '36', '38', '40', '42', '44'].includes(s)) {
          sizes.push(s);
        }
      });
      prod.sizes = sizes;

      let desc = '';
      $p('div, p').each((i, el) => {
        const t = $p(el).text().trim().replace(/\s+/g, ' ');
        if ((t.includes('DOTKNIT') || t.includes('Size Chart') || t.includes('FREE SHIPPING') || t.includes('OVERSIZED')) && t.length > desc.length && t.length < 800) {
          desc = t;
        }
      });
      if (desc) {
        prod.description = desc;
      }

      const rawGallery = [];
      $p('.slider-for img, .xzoom, .xzoom-thumbs img').each((i, el) => {
        const src = $p(el).attr('src');
        if (src && src.includes('/media/Images/Product/') && !rawGallery.includes(src)) {
          rawGallery.push(src);
        }
      });

      if (rawGallery.length > 0) {
        // Up to 2 gallery images per product for swift mobile delivery
        prod.rawGallery = rawGallery.slice(0, 2);
        if (!prod.rawImage) prod.rawImage = rawGallery[0];
      }

      if (!prod.club) {
        const titleUpper = prod.name.toUpperCase();
        for (const [cSlug, cObj] of clubsMap.entries()) {
          const cNameUpper = cObj.name.toUpperCase();
          if (cNameUpper.length > 2 && titleUpper.includes(cNameUpper)) {
            prod.club = cObj.name;
            break;
          }
        }
      }
    }
  }

  // 5. Image WebP Assignment
  console.log('\nStep 5: Processing WebP images...');
  for (const prod of allProducts) {
    const toProcess = prod.rawGallery && prod.rawGallery.length > 0 ? prod.rawGallery : (prod.rawImage ? [prod.rawImage] : []);
    const optimized = [];

    for (const rawSrc of toProcess) {
      const paths = await downloadAndOptimizeImage(rawSrc);
      if (paths) {
        optimized.push(paths);
      }
    }

    prod.images = optimized;
    delete prod.rawGallery;
    delete prod.rawImage;
  }

  // 6. Ingest Policies
  console.log('\nStep 6: Ingesting Return & Shipping Policies...');
  const policies = {
    returnPolicy: {
      title: 'Return Policy',
      content: 'Customers have the right to return a product if it is delivered in a damaged condition or manufacturing defect. To initiate return, contact our support team within 7 days of receipt.',
      points: [
        '7-day return window from date of delivery.',
        'Eligible if product has manufacturing defects or damaged on delivery.',
        'Contact Customer Support at +91 90746 94968 with unboxing photo/video.',
      ],
    },
    shippingPolicy: {
      title: 'Shipping Policy',
      content: 'All non-customized products will be dispatched within 2 business days of placing your order. Free delivery across India on orders above Rs 399.',
      points: [
        'Non-customized products dispatched within 2 business days.',
        'Free Delivery all over India for orders above Rs 399.',
        'Standard transit time 4-7 working days depending on destination pincode.',
      ],
    },
  };

  const returnHtml = await fetchWithCache(`${BASE_URL}/Return-Policy`);
  if (returnHtml) {
    const $r = cheerio.load(returnHtml);
    let bodyText = '';
    $r('section, div.container, p').each((i, el) => {
      const t = $r(el).text().trim().replace(/\s+/g, ' ');
      if (t.includes('damaged condition') && t.length > bodyText.length) {
        bodyText = t;
      }
    });
    if (bodyText) policies.returnPolicy.content = bodyText;
  }

  const shippingHtml = await fetchWithCache(`${BASE_URL}/Shiiping-Policy`);
  if (shippingHtml) {
    const $s = cheerio.load(shippingHtml);
    let shipText = '';
    $s('section, div.container, p').each((i, el) => {
      const t = $s(el).text().trim().replace(/\s+/g, ' ');
      if (t.includes('business days') && t.length > shipText.length) {
        shipText = t;
      }
    });
    if (shipText) policies.shippingPolicy.content = shipText;
  }

  // 7. Write JSON output files
  console.log('\nStep 7: Writing data files...');
  fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(allProducts, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(CATEGORIES, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'clubs.json'), JSON.stringify(Array.from(clubsMap.values()), null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'policies.json'), JSON.stringify(policies, null, 2));

  console.log(`\n=== Ingestion Completed Successfully! ===`);
  console.log(`- Products saved: ${allProducts.length} (data/products.json)`);
  console.log(`- Categories saved: ${CATEGORIES.length} (data/categories.json)`);
  console.log(`- Clubs saved: ${clubsMap.size} (data/clubs.json)`);
  console.log(`- Policies saved: (data/policies.json)`);
}

ingest().catch((err) => {
  console.error('Fatal error in ingestion:', err);
  process.exit(1);
});
