import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
await mkdir(output, { recursive: true });
const allowedFiles = ['index.html', '404.html', 'robots.txt', 'sitemap.xml'];
const allowedDirectories = ['assets', 'products', 'company', 'automatic-shutters', 'automatic-gates', 'moving-pergola-roof', 'perforated-shutters', 'photo-gallery', 'video-gallery', 'profile', 'clients-feedback', 'contacts'];
for (const name of [...allowedFiles, ...allowedDirectories]) await cp(resolve(root, name), resolve(output, name), { recursive: true });
async function total(path) { let bytes = 0; let files = 0; for (const entry of await readdir(path, { withFileTypes: true })) { const file = resolve(path, entry.name); if (entry.isDirectory()) { const next = await total(file); bytes += next.bytes; files += next.files; } else { files++; bytes += (await stat(file)).size; } } return { bytes, files }; }
const result = await total(output);
console.log(`Built ${result.files} public files (${(result.bytes / 1024 / 1024).toFixed(2)} MB). Plain HTML, CSS and JavaScript in dist/.`);
