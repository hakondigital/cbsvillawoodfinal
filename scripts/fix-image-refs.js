// Rewrite any remaining /images/*.png|jpg reference to .webp when that WebP exists on disk.
const fs = require('fs'); const path = require('path');
const REPO = process.argv[2];
const srcFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', '.next', 'out', '.git', '_layout-backups', 'public'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (/\.(tsx?|json|css)$/.test(e.name)) srcFiles.push(p);
  }
})(REPO);
const dec = (s) => s.replace(/%20/g, ' ').replace(/%28/g, '(').replace(/%29/g, ')');
let fixed = 0; const missing = [];
for (const f of srcFiles) {
  let s = fs.readFileSync(f, 'utf8'); const orig = s;
  for (const m of [...s.matchAll(/(\/images\/[^"'`\s)]+?)\.(png|jpe?g)\b/gi)]) {
    const webRef = m[0], webpRef = m[1] + '.webp';
    const onDisk = path.join(REPO, 'public', dec(webpRef));
    if (fs.existsSync(onDisk)) s = s.split(webRef).join(webpRef);
    else missing.push(path.relative(REPO, f) + ' -> ' + webRef);
  }
  if (s !== orig) { fs.writeFileSync(f, s); fixed++; }
}
console.log('files fixed:', fixed);
console.log(missing.length ? 'STILL MISSING ON DISK:\n' + [...new Set(missing)].join('\n') : 'every reference now resolves to an existing .webp');
