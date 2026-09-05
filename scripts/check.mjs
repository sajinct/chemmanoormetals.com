// Dependency-free checks for the delivered static pages and their local resources.
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { execFileSync } from 'node:child_process';
const root = resolve(import.meta.dirname, '..');
const routes = ['', 'products', 'company', 'automatic-shutters', 'automatic-gates', 'moving-pergola-roof', 'perforated-shutters', 'photo-gallery', 'video-gallery', 'profile', 'clients-feedback', 'contacts'];
const errors = [];
let references = 0;
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const contents = new Map();
for (const route of routes) contents.set(resolve(root, route, 'index.html'), await readFile(resolve(root, route, 'index.html'), 'utf8'));
for (const [file, html] of contents) {
  const route = file.slice(root.length + 1);
  const fail = message => errors.push(`${route}: ${message}`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) fail('Expected exactly one H1');
  if (!html.includes('<html lang="en"')) fail('Missing document language');
  if (!html.includes('name="description"')) fail('Missing description');
  if (!html.includes('name="viewport"')) fail('Missing responsive viewport');
  if (!html.includes('rel="canonical"')) fail('Missing canonical URL');
  if (/lorem ipsum|lucky jet|aviator|javascript:|href="#"|user-scalable=no/i.test(html)) fail('Placeholder, compromised copy or inaccessible source pattern');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) fail('Duplicate element IDs');
  for (const match of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]*"/.test(match[0])) fail('Image without alt attribute');
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '');
  const stack = [];
  for (const match of clean.matchAll(/<(\/?)([a-z][a-z0-9-]*)\b[^>]*>/gi)) {
    const [, closing, raw] = match; const name = raw.toLowerCase();
    if (voidTags.has(name) || /\/>$/.test(match[0])) continue;
    if (!closing) stack.push(name);
    else if (stack.pop() !== name) { fail(`Unbalanced closing tag </${name}>`); break; }
  }
  if (stack.length) fail(`Unclosed tags: ${stack.join(', ')}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const path = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(path)) continue;
    references++;
    const [withoutHash, anchor] = path.split('#');
    const pathname = withoutHash.split('?')[0];
    let target = pathname ? resolve(dirname(file), decodeURIComponent(pathname)) : file;
    if (pathname.startsWith('/')) target = resolve(root, '.' + pathname);
    try {
      if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
      await stat(target);
      if (anchor && extname(target) === '.html') {
        const targetHTML = contents.get(target) || await readFile(target, 'utf8');
        if (!targetHTML.includes(`id="${anchor}"`)) fail(`Missing fragment: ${path}`);
      }
    } catch { fail(`Missing local resource: ${path}`); }
  }
}
const css = await readFile(resolve(root, 'assets/styles.css'), 'utf8');
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
  if (!match[1].startsWith('data:')) {
    try { await stat(resolve(root, 'assets', match[1])); } catch { errors.push(`Missing CSS resource ${match[1]}`); }
  }
}
assert.equal((await readdir(resolve(root, 'assets/gallery'))).filter(f => f.endsWith('.jpg')).length, 23, 'Expected all 23 original gallery photos');
for (const file of ['assets/main.js', 'scripts/serve.mjs', 'scripts/build.mjs', 'scripts/generate-pages.mjs']) execFileSync(process.execPath, ['--check', resolve(root, file)], { stdio: 'pipe' });
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${routes.length} pages, ${references} local references, heading and HTML structure, IDs, fragments, all gallery assets and JavaScript syntax.`);
