const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function run() {
  const html = await fetchPage('https://www.mfasportsmahe.com/');
  const $ = cheerio.load(html);

  console.log('=== HERO / SLIDER / CAROUSEL ===');
  $('.carousel img, .slider img, .owl-carousel img, .swiper-slide img, [class*="banner"] img, [class*="slider"] img, [class*="hero"] img').each((i, el) => {
    console.log('Slide Img:', $(el).attr('src') || $(el).attr('data-src'));
  });

  console.log('=== ALL BANNERS / SECTION IMAGES ===');
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    if (src.includes('banner') || src.includes('slider') || src.includes('slide') || src.includes('hero') || src.includes('main')) {
      console.log('Banner Img:', src);
    }
  });

  console.log('=== MODALS / LOGIN ===');
  $('[id*="login"], [id*="auth"], [class*="login"], [class*="modal"]').each((i, el) => {
    console.log('Modal ID/Class:', $(el).attr('id'), $(el).attr('class'));
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text.includes('Enter your number') || text.includes('password') || text.includes('Login')) {
      console.log('Login snippet:', text.slice(0, 300));
    }
  });

  console.log('=== NAV & FOOTER LINKS (BLOG, ACCOUNT, ETC) ===');
  $('a').each((i, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    const href = $(el).attr('href') || '';
    if (text.match(/login|account|blog|story|news|sign/i) || href.match(/login|account|blog|story|news/i)) {
      console.log(`Link: "${text}" -> ${href}`);
    }
  });

  // Also check if there is /blog or /blogs or /login on the site
  const testUrls = ['https://www.mfasportsmahe.com/login/', 'https://www.mfasportsmahe.com/blog/', 'https://www.mfasportsmahe.com/blogs/'];
  for (const u of testUrls) {
    try {
      const resHtml = await fetchPage(u);
      console.log(`URL ${u}: Length = ${resHtml.length}, Title = ${cheerio.load(resHtml)('title').text()}`);
    } catch (e) {
      console.log(`URL ${u} failed:`, e.message);
    }
  }
}

run();
