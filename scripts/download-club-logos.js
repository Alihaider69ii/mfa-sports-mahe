const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const CLUBS = [
  { name: 'Real Madrid', file: 'real-madrid.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/real_.ai__TbTKu00.png', count: 'La Liga' },
  { name: 'Barcelona', file: 'barcelona.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/channels4_profile.jpg', count: 'Blaugrana' },
  { name: 'Arsenal', file: 'arsenal.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Untitled_5eKDIOc.png', count: 'Gunners' },
  { name: 'Manchester United', file: 'manchester-united.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/images.jpg', count: 'Red Devils' },
  { name: 'Manchester City', file: 'manchester-city.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Manchester_City_F.C.-Logo.wine.png', count: 'Citizens' },
  { name: 'Chelsea', file: 'chelsea.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/HD-wallpaper-soccer-chelsea-f-c-soccer-logo.jpg', count: 'The Blues' },
  { name: 'Liverpool', file: 'liverpool.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Liverpool_FC.svg.jpg', count: 'The Reds' },
  { name: 'AC Milan', file: 'ac-milan.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/a442e720d821a0f8c3527c3d10159cd4_XMtQbSo_lGfDlGB.jpg', count: 'Rossoneri' },
  { name: 'Al Nassr', file: 'al-nassr.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Logo_Al-Nassr_TLzIyiv_B2DZ4FG.png', count: 'Saudi Pro' },
  { name: 'Al Hilal', file: 'al-hilal.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Al-Hilal-Logo_eCtWh8A.png', count: 'Blue Waves' },
  { name: 'Argentina', file: 'argentina.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Argentina_national_football_team_logo.svg.jpg', count: 'Champions' },
  { name: 'Inter Miami', file: 'inter-miami.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Inter_Miami_CF_logo.svg_diHohIg.png', count: 'Herons' },
  { name: 'PSG', file: 'psg.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/PSG-Logo.png', count: 'Ligue 1' },
  { name: 'Portugal', file: 'portugal.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/download_mMuZ2Oq.png', count: 'Selecao' },
  { name: 'Bayern Munich', file: 'bayern-munich.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/FC_Bayern_M%C3%BCnchen_logo_2017.svg_UmrwEES.png', count: 'Bavarians' },
  { name: 'Borussia Dortmund', file: 'dortmund.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Borussia_Dortmund_logo.svg_6ZJH1Pu.png', count: 'BVB' },
  { name: 'Kerala Blasters', file: 'kerala-blasters.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Kerala_Blasters_FC_logo.svg_1VLVx83.png', count: 'Manjappada' },
  { name: 'Ajax', file: 'ajax.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/Ajax_Amsterdam.svg_PhlrUCz.png', count: 'Eredivisie' },
  { name: 'AS Roma', file: 'as-roma.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/as-roma5337_63BvVtD.jpg', count: 'Giallorossi' },
  { name: 'Atletico Madrid', file: 'atletico-madrid.webp', url: 'https://www.mfasportsmahe.com/media/Images/SubCategory/a60d4cca21bf1cd11c011cf450bcb762_y39Owbk.jpg', count: 'Colchoneros' }
];

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
  });
}

async function run() {
  const targetDir = path.join(process.cwd(), 'public', 'img', 'clubs');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const clubsData = [];

  for (const c of CLUBS) {
    try {
      console.log(`Downloading logo for ${c.name}...`);
      const buf = await download(c.url);
      const outPath = path.join(targetDir, c.file);
      await sharp(buf)
        .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 90 })
        .toFile(outPath);
      console.log(`Saved: ${c.file}`);

      clubsData.push({
        name: c.name,
        slug: c.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        logo: `/img/clubs/${c.file}`,
        badge: c.count,
        productCount: 12
      });
    } catch (e) {
      console.error(`Error on ${c.name}:`, e.message);
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'data', 'clubs.json'),
    JSON.stringify(clubsData, null, 2),
    'utf-8'
  );
  console.log(`Updated data/clubs.json with ${clubsData.length} clubs!`);
}

run();
