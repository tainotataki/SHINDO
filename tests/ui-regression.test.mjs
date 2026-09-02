import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const designCss = await readFile(new URL('../design.css', import.meta.url), 'utf8');
const designJs = await readFile(new URL('../design.js', import.meta.url), 'utf8');
const reportCss = await readFile(new URL('../report.css', import.meta.url), 'utf8');
const homeReportCss = await readFile(new URL('../home-report.css', import.meta.url), 'utf8');
const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const projectsHtml = await readFile(new URL('../projects.html', import.meta.url), 'utf8');
const partnershipHtml = await readFile(new URL('../partnership.html', import.meta.url), 'utf8');
const peopleHtml = await readFile(new URL('../people.html', import.meta.url), 'utf8');
const aboutHtml = await readFile(new URL('../about.html', import.meta.url), 'utf8');

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
    assert.match(html, /<link rel="preload" href="design\.js\?v=31" as="script">/, `${page} must fetch design.js while the document parses`);
    assert.match(html, /<script src="design\.js\?v=31" onload="document\.documentElement\.classList\.remove\('js'\)" onerror="document\.documentElement\.classList\.remove\('js'\)"><\/script>/, `${page} must reveal fallback markup if design.js cannot execute`);
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

test('project tabs synchronize visual, ARIA and panel states', () => {
  assert.match(designJs, /function activateProjectTab\(tab, moveFocus\)/);
  assert.match(designJs, /item\.setAttribute\('aria-selected', String\(isSelected\)\)/);
  assert.match(designJs, /panel\.hidden = !isSelected/);
  assert.match(designJs, /event\.key === 'ArrowRight'/);
  assert.match(designJs, /event\.key === 'End'/);
  assert.match(designJs, /tab\.scrollIntoView\(\{ block: 'nearest', inline: 'nearest' \}\)/);
  assert.doesNotMatch(projectsHtml, /data-tab="[^"]+"[^>]*style="[^"]*(?:background|color|border):/);
});

test('homepage removes the movie and legacy playful layer', () => {
  assert.doesNotMatch(indexHtml, /home-movie-section|data-video-trigger|vimeo\.com\/1116123465/);
  assert.doesNotMatch(indexHtml, /home-playful\.css/);
  assert.match(indexHtml, /<link rel="stylesheet" href="home-report\.css\?v=3">/);
});

test('homepage opens from the report cover into a real field photograph', () => {
  assert.match(indexHtml, /<figure class="report-opening">[\s\S]*src="home-onogawa\.jpg"/);
  assert.ok(indexHtml.indexOf('class="report-opening"') > indexHtml.indexOf('class="report-hero"'));
  assert.ok(indexHtml.indexOf('class="report-opening"') < indexHtml.indexOf('class="report-index"'));
  assert.match(homeReportCss, /\.report-opening img\s*\{[\s\S]*aspect-ratio:\s*16\s*\/\s*7/);
});

test('homepage includes the required regional project examples', () => {
  assert.match(indexHtml, /Circulating Future Being／CFB/);
  assert.match(indexHtml, /有機マンゴー農園の承継支援/);
  assert.match(indexHtml, /福島県昭和村・小野川/);
});

test('homepage uses the corrected partner count', () => {
  assert.match(indexHtml, /class="report-metric__value">30<small> 組<\/small>/);
  assert.doesNotMatch(indexHtml, /class="report-metric__value">37<small> 組<\/small>/);
});

test('homepage footer uses the shared SHINDO wordmark', () => {
  const sharedWordmark = `<div style="font-family:'Zen Old Mincho',serif;color:#4A1520;font-size:30px;letter-spacing:.42em;line-height:1;margin-bottom:18px">SHINDO</div>`;
  assert.ok(indexHtml.indexOf(sharedWordmark, indexHtml.indexOf('<footer')) > -1);
  assert.ok(aboutHtml.indexOf(sharedWordmark, aboutHtml.lastIndexOf('<div style="border-top:')) > -1);
});

test('shared report layer replaces colored hero dots with ink rice grains', () => {
  const declarations = ruleFor(reportCss, 'body.redesign:not(.page-index) .is-page-hero::after');
  assert.match(declarations, /background-image:\s*url\("data:image\/svg\+xml/);
  assert.match(declarations, /box-shadow:\s*none\s*!important/);
  assert.match(declarations, /border-radius:\s*0\s*!important/);
});

test('dark participation section keeps all text on the paper color', () => {
  assert.match(homeReportCss, /body\.redesign \.report-join h2,[\s\S]*body\.redesign \.report-join span \{ color: var\(--report-paper\) !important; \}/);
});

test('reviewed legacy sections keep contrast and responsive editorial spacing', () => {
  assert.match(partnershipHtml, /partnership-flow__step--final/);
  assert.match(partnershipHtml, /class="benefits-grid"/);
  assert.match(peopleHtml, /class="base-member__name"/);
  assert.match(aboutHtml, /class="pillar-section"/);
  assert.match(reportCss, /partnership-flow__step--final\.on-dark\.field-card[\s\S]*background:\s*var\(--report-ink\)\s*!important/);
  assert.match(reportCss, /@media \(max-width:\s*760px\)[\s\S]*pillar-row[\s\S]*grid-template-columns:\s*48px minmax\(0, 1fr\)/);
});

test('shared report layer removes playful motifs and card treatments', () => {
  assert.match(ruleFor(reportCss, '.site-frame::before,\n.wayline,\n.journey-motif'), /display:\s*none\s*!important/);
  assert.match(reportCss, /border-radius:\s*0\s*!important/);
  assert.match(reportCss, /box-shadow:\s*none\s*!important/);
});

test('vertical homepage typography becomes horizontal on mobile', () => {
  assert.match(homeReportCss, /@media \(max-width:\s*700px\)[\s\S]*\.report-hero h1\s*\{[^}]*writing-mode:\s*horizontal-tb/);
  assert.match(homeReportCss, /@media \(max-width:\s*700px\)[\s\S]*\.report-hero__vertical-meta\s*\{[^}]*writing-mode:\s*horizontal-tb/);
});
