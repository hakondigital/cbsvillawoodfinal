// 800px "medium" variant for the photography used in category tiles, brand strips and showroom galleries.
// Those boxes are 130–460px wide, so the 1400px original is 3–10x more pixels than any screen uses.
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const IMG = path.join(process.argv[2], 'public/images');
const SKIP = /^(thumbs|medium|products|resources)$/;
(async () => {
  const files = fs.readdirSync(IMG, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.webp')).map((e) => e.name);
  fs.mkdirSync(path.join(IMG, 'medium'), { recursive: true });
  let n = 0, bytes = 0;
  for (const name of files) {
    const buf = fs.readFileSync(path.join(IMG, name));
    const m = await sharp(buf).metadata();
    if (Math.max(m.width, m.height) <= 800) {
      // Already small. Copy it through anyway so medium() can never point at a file that does not exist.
      fs.writeFileSync(path.join(IMG, 'medium', name), buf); n++; bytes += buf.length; continue;
    }
    const outBuf = await sharp(buf).resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 66, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(IMG, 'medium', name), outBuf); n++; bytes += outBuf.length;
  }
  console.log(`medium variants: ${n}, ${(bytes / 1048576).toFixed(2)} MB total`);
  console.log('skipped dirs:', String(SKIP));
})();
