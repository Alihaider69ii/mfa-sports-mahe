const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('home_temp.html', 'utf-8');
const $ = cheerio.load(html);

console.log('--- Page Title ---');
console.log($('title').text().trim());

console.log('\n--- Categories ---');
$('a[href*="/category/"], a[href*="/Category/"]').each((i, el) => {
  console.log($(el).attr('href'), '=>', $(el).text().trim().replace(/\s+/g, ' '));
});

console.log('\n--- Product Links sample (first 15) ---');
let count = 0;
$('a[href*="/Products/"], a[href*="/products/"]').each((i, el) => {
  if (count++ < 15) {
    console.log($(el).attr('href'), '=>', $(el).text().trim().replace(/\s+/g, ' '));
  }
});

console.log('\n--- Club Collections sample ---');
$('a[href*="/club/"], a[href*="/Club/"], a[href*="club"]').each((i, el) => {
  console.log($(el).attr('href'), '=>', $(el).text().trim().replace(/\s+/g, ' '));
});
