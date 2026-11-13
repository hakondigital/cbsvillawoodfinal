// Convert every raster image under public/images to WebP at sane dimensions, plus a 200px thumbnail set,
// then rewrite every reference in the source. Originals are deleted only after the WebP is written.
const fs = require('fs'); const path = require('path');
const sharp = require('sharp');
const REPO = process.argv[2];
const DRY = process.argv.includes('--dry');
const IMG = path.join(REPO, 'public/images');

// Logos need crisp edges and alpha; photos can take a harder squeeze.
const LOGO = /^(ACE|Euromix|FINALLOGONOVATEX|Mac-Render|CBSLOGO|NOVATEXHIGH|Untitled design \(1\)|cbs-logo-good|novatex-logo-new|novatex-logo-white|trademark-wholesale-logo|cbs-foam-panel)\./i;
const rules = (rel, w, h) => {
  const base = path.basename(rel);
  if (LOGO.test(base)) return { max: 600, q: 82, alpha: true };
  if (rel.startsWith('resources/')) return { max: 700, q: 70, alpha: false };
  if (rel.startsWith('products/')) {
    if (/^products\/(cbs|.*-logo)/.test(rel)) return { max: 600, q: 82, alpha: true };
    return { max: 900, q: 72, alpha: true };
  }
  return { max: 1400, q: 68, alpha: false }; // gallery / hero / section photography
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** OneDrive can hold a transient lock on a file it is syncing; retry the unlink before giving up. */
async function rm(p) {
  for (let i = 0; i < 8; i++) {
    try { fs.unlinkSync(p); return; } catch (e) { if (e.code !== 'EBUSY' && e.code !== 'EPERM') throw e; await sleep(150 * (i + 1)); }
  }
  fs.unlinkSync(p);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'thumbs') walk(p, out); }
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

(async () => {
  const files = walk(IMG);
  let before = 0, after = 0, thumbBytes = 0;
  const renames = new Map(); // old web path -> new web path

  for (const abs of files) {
    const rel = path.relative(IMG, abs).split(path.sep).join('/');
    const r = rules(rel);
    const srcBytes = fs.statSync(abs).size; before += srcBytes;
    const outAbs = abs.replace(/\.(jpe?g|png)$/i, '.webp');
    const oldWeb = '/images/' + rel;
    const newWeb = oldWeb.replace(/\.(jpe?g|png)$/i, '.webp');

    // Read into memory: sharp keeps a lazy file handle otherwise, and Windows/OneDrive then refuses the unlink.
    const buf = fs.readFileSync(abs);
    const meta = await sharp(buf).metadata();
    const resize = Math.max(meta.width, meta.height) > r.max
      ? { width: meta.width >= meta.height ? r.max : null, height: meta.height > meta.width ? r.max : null, withoutEnlargement: true }
      : null;

    if (!DRY) {
      let pipe = sharp(buf, { failOn: 'none' });
      if (resize) pipe = pipe.resize(resize);
      const webp = await pipe.webp({ quality: r.q, effort: 6, alphaQuality: 90 }).toBuffer();
      if (outAbs !== abs) await rm(abs);
      fs.writeFileSync(outAbs, webp);

      // 200px thumbnail for list rows and swatch grids
      const thumbAbs = path.join(IMG, 'thumbs', rel).replace(/\.(jpe?g|png)$/i, '.webp');
      fs.mkdirSync(path.dirname(thumbAbs), { recursive: true });
      const thumb = await sharp(webp, { failOn: 'none' })
        .resize({ width: 200, height: 200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 62, effort: 6, alphaQuality: 85 }).toBuffer();
      fs.writeFileSync(thumbAbs, thumb);
      thumbBytes += thumb.length;
      after += webp.length;
    }
    if (oldWeb !== newWeb) renames.set(oldWeb, newWeb);
  }

  console.log(`images: ${files.length}`);
  console.log(`before: ${(before / 1048576).toFixed(1)} MB`);
  console.log(`after : ${(after / 1048576).toFixed(1)} MB  (+ ${(thumbBytes / 1048576).toFixed(1)} MB thumbnails)`);
  if (DRY) return;

  // --- rewrite references ---
  const srcFiles = [];
  (function walkSrc(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === 'node_modules' || e.name === '.next' || e.name === 'out' || e.name === '.git' || e.name === '_layout-backups') continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walkSrc(p);
      else if (/\.(tsx?|json|css)$/.test(e.name)) srcFiles.push(p);
    }
  })(REPO);

  let edits = 0;
  for (const f of srcFiles) {
    let s = fs.readFileSync(f, 'utf8'); const orig = s;
    for (const [oldWeb, newWeb] of renames) {
      if (s.includes(oldWeb)) s = s.split(oldWeb).join(newWeb);
      // URL-encoded form used for the header logo
      const encOld = oldWeb.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
      const encNew = newWeb.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
      if (encOld !== oldWeb && s.includes(encOld)) s = s.split(encOld).join(encNew);
    }
    if (s !== orig) { fs.writeFileSync(f, s); edits++; console.log('refs updated:', path.relative(REPO, f)); }
  }
  console.log('files with updated refs:', edits);

  const leftovers = [];
  for (const f of srcFiles) {
    const s = fs.readFileSync(f, 'utf8');
    for (const m of s.matchAll(/["'`](\/images\/[^"'`]+\.(?:png|jpe?g))["'`]/g)) leftovers.push(path.relative(REPO, f) + ' -> ' + m[1]);
  }
  console.log(leftovers.length ? 'REMAINING NON-WEBP REFS:\n' + leftovers.join('\n') : 'no remaining .png/.jpg references');
})();
