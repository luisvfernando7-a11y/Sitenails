import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { IMG, L1, L2 } from '../catalog.js';
import { CONTACT, whatsapp, mapUrl } from '../config.js';
const page = await readFile('dist/index.html', 'utf8');
test('preserves all eleven procedures and original application/maintenance prices', () => {
  assert.equal(L1.length + L2.length, 11);
  assert.deepEqual(L1.map(s => s.p.map(p => p[1])), [['R$ 85,00','R$ 65,00'],['R$ 95,00','R$ 70,00'],['R$ 100,00','R$ 75,00'],['R$ 90,00','R$ 75,00'],['R$ 95,00','R$ 70,00'],['R$ 95,00','R$ 75,00'],['R$ 120,00','R$ 80,00'],['R$ 65,00']]);
  assert.deepEqual(L2.map(s => s.p.map(p => p[1])), [['R$ 25,00','R$ 30,00'],['R$ 70,00','após 30 dias'],['R$ 70,00','após 30 dias']]);
  for (const service of [...L1, ...L2]) { assert.ok(page.includes(`<h3>${service.n}</h3>`)); assert.ok(page.includes(encodeURIComponent('Olá, Helena! Quero agendar: ' + service.n))); }
});
test('all local assets exist; images have dimensions; internal targets resolve', async () => {
  const ids = new Set([...page.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [, target] of page.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(target), target);
  for (const [, path] of page.matchAll(/(?:src|href)="([^"#]+)"/g)) if (!path.startsWith('http')) await access('dist/' + path);
  for (const [, tag] of page.matchAll(/(<img\b[^>]+>)/g)) { assert.match(tag, /width="\d+"/); assert.match(tag, /height="\d+"/); assert.match(tag, /alt="[^"]+"/); }
  assert.equal(Object.keys(IMG).length, 18);
  assert.ok(!page.includes('href="#"')); assert.ok(!page.includes('data:image'));
});
test('contact URLs encode content without losing personal message text', () => {
  const message = 'Olá! Nome: Ana & Júlia\nProcedimento: design + henna';
  const url = new URL(whatsapp(message));
  assert.equal(url.pathname, '/5514996238393'); assert.equal(url.searchParams.get('text'), message);
  assert.equal(new URL(mapUrl).searchParams.get('query'), CONTACT.address);
  assert.equal(CONTACT.instagram, 'https://instagram.com/lash_helenamorelin');
});
test('privacy and safe external links are present; no tracking or browser storage', async () => {
  for (const [, tag] of page.matchAll(/(<a\b[^>]*target="_blank"[^>]*>)/g)) assert.match(tag, /rel="noopener noreferrer"/);
  const app = await readFile('app.js','utf8');
  assert.doesNotMatch(app, /localStorage|sessionStorage|document\.cookie|gtag|fbq/);
  assert.match(page, /não registra nem confirma/); assert.match(page, /id="privacidade"/);
  const config = JSON.parse(await readFile('vercel.json','utf8'));
  assert.equal(config.outputDirectory, 'dist'); assert.ok(config.headers[0].headers.some(h => h.key === 'Content-Security-Policy'));
});
