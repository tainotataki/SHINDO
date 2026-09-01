import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const designCss = await readFile(new URL('../design.css', import.meta.url), 'utf8');
const designJs = await readFile(new URL('../design.js', import.meta.url), 'utf8');
const homePlayfulCss = await readFile(new URL('../home-playful.css', import.meta.url), 'utf8');
const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');

function ruleFor(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `Missing CSS rule for ${selector}`);
  return match[1];
}

test('legacy markup stays hidden while design.js loads without a timed reveal', () => {
  const declarations = ruleFor(designCss, 'html.js body:not(.redesign)');
  assert.match(declarations, /visibility:\s*hidden\s*;/);
  assert.doesNotMatch(declarations, /animation\s*:/);
});

test('every page marks the redesign as loading and recovers from script failure', async () => {
  const pages = [
    'index.html',
    'about.html',
    'partnership.html',
    'people.html',
    'privacy-policy.html',
    'projects.html',
    'recruit.html',
  ];

  for (const page of pages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.match(html, /<script>document\.documentElement\.classList\.add\('js'\)<\/script>/, `${page} must hide legacy markup before styles load`);
    assert.match(html, /<link rel="preload" href="design\.js\?v=28" as="script">/, `${page} must fetch design.js while the document parses`);
    assert.match(html, /<script src="design\.js\?v=28" onload="document\.documentElement\.classList\.remove\('js'\)" onerror="document\.documentElement\.classList\.remove\('js'\)"><\/script>/, `${page} must reveal fallback markup if design.js cannot execute`);
  }
});

test('redesign becomes visible only after the DOM upgrade completes', () => {
  const readyIndex = designJs.lastIndexOf("document.body.classList.add('redesign'");
  const pageClassIndex = designJs.indexOf("document.body.classList.add('page-' + pageName)");
  const pageEnhancementIndex = designJs.indexOf("document.querySelectorAll('.page-people");
  const movieBindingIndex = designJs.indexOf("trigger.addEventListener('click'");
  assert.ok(pageClassIndex < pageEnhancementIndex, 'page class must exist before page-specific enhancements run');
  assert.ok(readyIndex > movieBindingIndex, 'redesign class must be applied after interactive enhancements');
  assert.match(designJs.slice(movieBindingIndex), /finally\s*\{[\s\S]*document\.body\.classList\.add\('redesign'[\s\S]*document\.documentElement\.classList\.remove\('js'\)/);
});

test('malformed URL hashes cannot interrupt the redesign upgrade', () => {
  assert.match(designJs, /var hashId = location\.hash\.slice\(1\);\s*try\s*\{\s*hashId = decodeURIComponent\(hashId\);\s*\} catch\s*\{/);
});

test('homepage movie control is centered instead of inheriting inset zero', () => {
  const declarations = ruleFor(homePlayfulCss, 'body.home-v3 .home-movie-section__play');
  assert.match(declarations, /top:\s*50%\s*;/);
  assert.match(declarations, /right:\s*auto\s*;/);
  assert.match(declarations, /bottom:\s*auto\s*;/);
  assert.match(declarations, /left:\s*50%\s*;/);
  assert.match(declarations, /transform:\s*translate\(-50%,\s*-50%\)\s*;/);
});

test('movie control resets the nested legacy play circle', () => {
  const declarations = ruleFor(homePlayfulCss, 'body.home-v3 .home-movie-section__play-icon');
  assert.match(declarations, /width:\s*auto\s*;/);
  assert.match(declarations, /border:\s*0\s*;/);
  assert.match(declarations, /background:\s*transparent\s*;/);
});

test('movie control falls back to Vimeo when JavaScript is unavailable', () => {
  assert.match(indexHtml, /<a href="https:\/\/vimeo\.com\/1116123465"[^>]*data-video-trigger/);
  assert.match(designJs, /if \(!shell \|\| !source\) return;\s*event\.preventDefault\(\);/);
});

test('homepage action grid has no surrounding frame', () => {
  const declarations = ruleFor(homePlayfulCss, 'body.home-v3 .home-actions__grid');
  assert.match(declarations, /border:\s*0\s*;/);
  assert.match(declarations, /background:\s*transparent\s*;/);
});

test('homepage action grid cache version matches the updated stylesheet', () => {
  assert.match(indexHtml, /<link rel="stylesheet" href="home-playful\.css\?v=9">/);
});
