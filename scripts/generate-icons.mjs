import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconsDir = path.join(root, 'icons');

function loadFont(file) {
  const buf = fs.readFileSync(file);
  return opentype.parse(
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  );
}

const narrow = loadFont('C:/Windows/Fonts/ARIALNB.TTF');
const bold = loadFont('C:/Windows/Fonts/arialbd.ttf');
const impact = loadFont('C:/Windows/Fonts/impact.ttf');

const SIZE = 512;
const CX = SIZE / 2;
const CY = SIZE / 2;

function svgWrap(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">${inner}</svg>\n`;
}

function textPath(font, text, fontSize, cx, cy, fill) {
  const glyph = font.getPath(text, 0, 0, fontSize);
  const box = glyph.getBoundingBox();
  const dx = cx - (box.x1 + box.x2) / 2;
  const dy = cy - (box.y1 + box.y2) / 2;
  const shifted = font.getPath(text, dx, dy, fontSize);
  return `<path fill="${fill}" d="${shifted.toPathData(2)}"/>`;
}

function diamond(fill) {
  return `<rect x="109" y="109" width="294" height="294" rx="28" fill="${fill}" transform="rotate(45 256 256)"/>`;
}

function roundedRect(x, y, w, h, r, fill) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
}

function classindIcon(label, bg, fg) {
  const fontSize = label.length === 1 ? 210 : 168;
  return svgWrap(
    `${diamond(bg)}${textPath(narrow, label, fontSize, CX, CY + 6, fg)}`
  );
}

function badgeIcon(label, bg, fg, font, fontSize) {
  return svgWrap(
    `${roundedRect(48, 80, 416, 352, 48, bg)}${textPath(font, label, fontSize, CX, CY + 8, fg)}`
  );
}

function tvIcon(label, bg, fg) {
  const screen = `<rect x="64" y="72" width="384" height="300" rx="36" fill="${bg}"/>`;
  const stand = `<path fill="${bg}" d="M196 372h120l28 52H168z"/>`;
  const fontSize = label.length > 5 ? 92 : 110;
  return svgWrap(
    `${screen}${stand}${textPath(bold, label, fontSize, CX, 222, fg)}`
  );
}

const catalog = [
  [
    'classind',
    [
      ['l', classindIcon('L', '#338933', '#ffffff')],
      ['6', classindIcon('6', '#00aeef', '#ffffff')],
      ['10', classindIcon('10', '#2474b9', '#ffffff')],
      ['12', classindIcon('12', '#f2c400', '#111111')],
      ['14', classindIcon('14', '#e87722', '#111111')],
      ['16', classindIcon('16', '#c8102e', '#ffffff')],
      ['18', classindIcon('18', '#111111', '#ffffff')],
    ],
  ],
  [
    'mpa',
    [
      ['g', badgeIcon('G', '#2e7d32', '#ffffff', impact, 220)],
      ['pg', badgeIcon('PG', '#f9a825', '#111111', impact, 170)],
      ['pg-13', badgeIcon('PG-13', '#ef6c00', '#ffffff', impact, 128)],
      ['r', badgeIcon('R', '#c62828', '#ffffff', impact, 220)],
      ['nc-17', badgeIcon('NC-17', '#111111', '#ffffff', impact, 120)],
    ],
  ],
  [
    'tv-pg',
    [
      ['tv-y', tvIcon('TV-Y', '#2e7d32', '#ffffff')],
      ['tv-y7', tvIcon('TV-Y7', '#558b2f', '#ffffff')],
      ['tv-g', tvIcon('TV-G', '#1565c0', '#ffffff')],
      ['tv-pg', tvIcon('TV-PG', '#f9a825', '#111111')],
      ['tv-14', tvIcon('TV-14', '#ef6c00', '#ffffff')],
      ['tv-ma', tvIcon('TV-MA', '#111111', '#ffffff')],
    ],
  ],
  [
    'pegi',
    [
      ['3', badgeIcon('3', '#8dc53e', '#ffffff', impact, 240)],
      ['7', badgeIcon('7', '#f3b23e', '#111111', impact, 240)],
      ['12', badgeIcon('12', '#e98c2f', '#ffffff', impact, 200)],
      ['16', badgeIcon('16', '#e25727', '#ffffff', impact, 200)],
      ['18', badgeIcon('18', '#cc1f2f', '#ffffff', impact, 200)],
    ],
  ],
  [
    'esrb',
    [
      ['e', badgeIcon('E', '#2e7d32', '#ffffff', impact, 220)],
      ['e10-plus', badgeIcon('E10+', '#43a047', '#ffffff', impact, 140)],
      ['t', badgeIcon('T', '#f9a825', '#111111', impact, 220)],
      ['m', badgeIcon('M', '#c62828', '#ffffff', impact, 220)],
      ['ao', badgeIcon('AO', '#111111', '#ffffff', impact, 180)],
    ],
  ],
];

const generated = {};
for (const [system, icons] of catalog) {
  const dir = path.join(iconsDir, system);
  fs.mkdirSync(dir, { recursive: true });
  generated[system] = {};
  for (const [code, svg] of icons) {
    fs.writeFileSync(path.join(dir, `${code}.svg`), svg);
    generated[system][code] = svg.trim();
  }
}

const outTs = `export const ICON_SVGS: Record<string, Record<string, string>> = ${JSON.stringify(
  generated,
  null,
  2
)};\n`;
fs.writeFileSync(path.join(root, 'src/generated/svgs.ts'), outTs);

const titles = {
  classind: 'ClassInd',
  mpa: 'MPA',
  'tv-pg': 'TV Parental Guidelines',
  pegi: 'PEGI',
  esrb: 'ESRB',
};

const sections = catalog
  .map(([system, icons]) => {
    const figures = icons
      .map(
        ([code]) => `      <figure>
        <img src="icons/${system}/${code}.svg" width="72" height="72" alt="${system} ${code}" />
        <figcaption>${code}</figcaption>
      </figure>`
      )
      .join('\n');
    return `    <section>
      <h2>${titles[system] ?? system}</h2>
      <div class="row">
${figures}
      </div>
    </section>`;
  })
  .join('\n');

fs.writeFileSync(
  path.join(root, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>age-rating-kit</title>
  <style>
    :root { color-scheme: light dark; font-family: system-ui, sans-serif; }
    body { max-width: 960px; margin: 2rem auto; padding: 0 1.25rem; }
    h1 { font-size: 1.6rem; }
    h2 { font-size: 1.1rem; margin: 2rem 0 0.75rem; }
    code { font-size: 0.9em; }
    .row { display: flex; flex-wrap: wrap; gap: 1rem; }
    figure { margin: 0; text-align: center; width: 88px; }
    figcaption { font-size: 0.8rem; margin-top: 0.35rem; }
    img { display: block; width: 72px; height: 72px; }
  </style>
</head>
<body>
  <h1>age-rating-kit</h1>
  <p>SVG age-rating icons. CDN: <code>https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/{system}/{code}.svg</code></p>
${sections}
</body>
</html>
`
);

console.log(`Wrote ${catalog.reduce((n, [, icons]) => n + icons.length, 0)} icons`);

