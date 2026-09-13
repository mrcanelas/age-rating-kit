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

const robotoCondensedBold = loadFont(
  path.join(root, 'fonts/RobotoCondensed-Bold.ttf')
);
const mpaaRatings = loadFont(path.join(root, 'fonts/MPAA_Ratings.ttf'));
const bold = loadFont('C:/Windows/Fonts/arialbd.ttf');
const arialNarrowBold = loadFont('C:/Windows/Fonts/ARIALNB.TTF');
const impact = loadFont('C:/Windows/Fonts/impact.ttf');
const swissBlackCondensed = loadFont(
  'C:/Windows/Fonts/Swis721 BlkCn BT Black.ttf'
);

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

function roundedRect(x, y, w, h, r, fill) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
}

function classindIcon(label, bg, fg) {
  const fontSize = label.length === 1 ? 340 : 250;
  return svgWrap(
    `${roundedRect(0, 0, SIZE, SIZE, 48, bg)}${textPath(robotoCondensedBold, label, fontSize, CX, CY + 4, fg)}`
  );
}

function badgeIcon(label, bg, fg, font, fontSize) {
  return svgWrap(
    `${roundedRect(48, 80, 416, 352, 48, bg)}${textPath(font, label, fontSize, CX, CY + 8, fg)}`
  );
}

function headerLines(font, lines, cx, top, maxW, maxH, fill) {
  const lineH = maxH / lines.length;
  let fontSize = lineH * 0.82;
  for (const line of lines) {
    const widthAt = font.getAdvanceWidth(line, 100);
    const byWidth = (maxW / widthAt) * 100;
    const box = font.getPath(line, 0, 0, 100).getBoundingBox();
    const byHeight = ((lineH * 0.88) / (box.y2 - box.y1)) * 100;
    fontSize = Math.min(fontSize, byWidth, byHeight);
  }
  return lines
    .map((line, i) =>
      textPath(font, line, fontSize, cx, top + lineH * i + lineH / 2, fill)
    )
    .join('');
}

function mpaIcon(code) {
  const spec = {
    g: { lines: ['GENERAL AUDIENCES'], letter: 'G', color: '#006838' },
    pg: {
      lines: ['PARENTAL GUIDANCE', 'SUGGESTED'],
      letter: 'PG',
      color: '#F15A29',
    },
    'pg-13': {
      lines: ['PARENTS STRONGLY', 'CAUTIONED'],
      letter: 'PG-13',
      color: '#7F3F98',
    },
    r: { lines: ['RESTRICTED'], letter: 'R', color: '#D71920' },
    'nc-17': {
      lines: ['NO ONE 17 AND UNDER', 'ADMITTED'],
      letter: 'NC-17',
      color: '#21409A',
    },
  }[code];
  const pad = 8;
  const S = SIZE - pad * 2;
  const X = pad;
  const Y = pad;
  const border = S * 0.065;
  const headerH = S * 0.205;
  const bodyX = X + border;
  const bodyY = Y + headerH;
  const bodyW = S - border * 2;
  const bodyH = S - headerH - border;
  const letterPad = Math.min(bodyW, bodyH) * (spec.letter.length > 2 ? 0.08 : 0.1);
  const glyph = mpaaRatings.getPath(spec.letter, 0, 0, 100);
  const box = glyph.getBoundingBox();
  const scale = Math.min(
    (bodyW - letterPad * 2) / (box.x2 - box.x1),
    (bodyH - letterPad * 2) / (box.y2 - box.y1)
  );
  const fontSize = 100 * scale;
  const placed = mpaaRatings.getPath(spec.letter, 0, 0, fontSize);
  const placedBox = placed.getBoundingBox();
  const dx = bodyX + bodyW / 2 - (placedBox.x1 + placedBox.x2) / 2;
  const dy = bodyY + bodyH / 2 - (placedBox.y1 + placedBox.y2) / 2;
  const shifted = mpaaRatings.getPath(spec.letter, dx, dy, fontSize);
  const letter = `<path fill="${spec.color}" fill-rule="evenodd" d="${shifted.toPathData(2)}"/>`;
  return svgWrap(
    `<rect x="${X}" y="${Y}" width="${S}" height="${S}" fill="#000000"/>` +
      `<rect x="${bodyX.toFixed(2)}" y="${bodyY.toFixed(2)}" width="${bodyW.toFixed(2)}" height="${bodyH.toFixed(2)}" fill="${PAPER}"/>` +
      headerLines(
        swissBlackCondensed,
        spec.lines,
        X + S / 2,
        Y,
        S - border * 2.4,
        headerH,
        PAPER
      ) +
      letter
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

const INK = '#1a1818';
const PAPER = '#ffffff';
const ESRB_TILT = -17.6;

function polyPath(pts) {
  return `M${pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join('L')}Z`;
}

function xformPts(pts, tilt, cx, cy, scale) {
  const r = (tilt * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return pts.map(([x, y]) => [
    cx + x * scale * cos - y * scale * sin,
    cy + x * scale * sin + y * scale * cos,
  ]);
}

function ptsBBox(pts) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of pts) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

function fitPts(pts, cx, cy, maxW, maxH, tilt) {
  const rotated = xformPts(pts, tilt, 0, 0, 1);
  const box = ptsBBox(rotated);
  const scale = Math.min(maxW / box.w, maxH / box.h);
  return xformPts(pts, tilt, cx, cy, scale);
}

function unitE() {
  const w = 1;
  const h = 1.16;
  const sw = 0.32;
  const bh = 0.248;
  const midW = 0.92;
  const x0 = -w / 2;
  const y0 = -h / 2;
  return [
    [x0, y0],
    [x0 + w, y0],
    [x0 + w, y0 + bh],
    [x0 + sw, y0 + bh],
    [x0 + sw, -bh / 2],
    [x0 + midW, -bh / 2],
    [x0 + midW, bh / 2],
    [x0 + sw, bh / 2],
    [x0 + sw, y0 + h - bh],
    [x0 + w, y0 + h - bh],
    [x0 + w, y0 + h],
    [x0, y0 + h],
  ];
}

function unitT() {
  const w = 1;
  const h = 1.16;
  const sw = 0.32;
  const bh = 0.248;
  const x0 = -w / 2;
  const y0 = -h / 2;
  const stemX = -sw / 2;
  return [
    [x0, y0],
    [x0 + w, y0],
    [x0 + w, y0 + bh],
    [stemX + sw, y0 + bh],
    [stemX + sw, y0 + h],
    [stemX, y0 + h],
    [stemX, y0 + bh],
    [x0, y0 + bh],
  ];
}

function centeredGlyph(font, text, fontSize) {
  const box = font.getPath(text, 0, 0, fontSize).getBoundingBox();
  const dx = -(box.x1 + box.x2) / 2;
  const dy = -(box.y1 + box.y2) / 2;
  const shifted = font.getPath(text, dx, dy, fontSize);
  return {
    d: shifted.toPathData(2),
    box: shifted.getBoundingBox(),
  };
}

function titlePath(text, cx, cy, maxW, maxH, fill) {
  const widthAt = (size) => arialNarrowBold.getAdvanceWidth(text, size);
  let fontSize = (maxW / arialNarrowBold.getAdvanceWidth('EVERYONE', 100)) * 100;
  if (widthAt(fontSize) > maxW) {
    fontSize *= maxW / widthAt(fontSize);
  }
  const box = arialNarrowBold.getPath(text, 0, 0, fontSize).getBoundingBox();
  const h = box.y2 - box.y1;
  if (h > maxH) fontSize *= maxH / h;
  return textPath(arialNarrowBold, text, fontSize, cx, cy, fill);
}

function tiltedGlyph(font, text, cx, cy, maxW, maxH) {
  const glyph = centeredGlyph(font, text, 1);
  const corners = [
    [glyph.box.x1, glyph.box.y1],
    [glyph.box.x2, glyph.box.y1],
    [glyph.box.x2, glyph.box.y2],
    [glyph.box.x1, glyph.box.y2],
  ];
  const box = ptsBBox(xformPts(corners, ESRB_TILT, 0, 0, 1));
  const scale = Math.min(maxW / box.w, maxH / box.h);
  return `<g transform="translate(${cx} ${cy}) rotate(${ESRB_TILT}) scale(${scale.toFixed(4)})"><path fill="${INK}" d="${glyph.d}"/></g>`;
}

function esrbWordmark(cx, cy, maxW, maxH, fill) {
  const text = 'ESRB';
  const fontSize = maxH * 0.78;
  const tracking = fontSize * 0.08;
  let x = 0;
  let minY = Infinity;
  let maxY = -Infinity;
  const ds = [];
  for (const ch of text) {
    const glyph = bold.getPath(ch, x, 0, fontSize);
    const box = glyph.getBoundingBox();
    if (box.y1 < minY) minY = box.y1;
    if (box.y2 > maxY) maxY = box.y2;
    ds.push(glyph.toPathData(2));
    x += bold.getAdvanceWidth(ch, fontSize) + tracking;
  }
  const totalW = x - tracking;
  const dy = -(minY + maxY) / 2;
  const scaleX = maxW / totalW;
  return `<g transform="translate(${cx} ${cy}) scale(${scaleX.toFixed(4)} 1) translate(${(-totalW / 2).toFixed(2)} ${dy.toFixed(2)})"><path fill="${fill}" d="${ds.join(' ')}"/></g>`;
}

function circlePath(cx, cy, r) {
  return `M${(cx + r).toFixed(3)},${cy.toFixed(3)}A${r.toFixed(3)},${r.toFixed(3)} 0 1 1 ${(cx - r).toFixed(3)},${cy.toFixed(3)}A${r.toFixed(3)},${r.toFixed(3)} 0 1 1 ${(cx + r).toFixed(3)},${cy.toFixed(3)}Z`;
}

function fitTilted(localPts, maxW, maxH) {
  const box = ptsBBox(localPts);
  const gcx = (box.minX + box.maxX) / 2;
  const gcy = (box.minY + box.maxY) / 2;
  const rbox = ptsBBox(
    xformPts(
      localPts.map(([x, y]) => [x - gcx, y - gcy]),
      ESRB_TILT,
      0,
      0,
      1
    )
  );
  return {
    gcx,
    gcy,
    scale: Math.min(maxW / rbox.w, maxH / rbox.h),
  };
}

function offsetGlyph(font, text, fontSize, tx, ty) {
  const box = font.getPath(text, 0, 0, fontSize).getBoundingBox();
  const dx = tx - (box.x1 + box.x2) / 2;
  const dy = ty - (box.y1 + box.y2) / 2;
  const shifted = font.getPath(text, dx, dy, fontSize);
  return {
    d: shifted.toPathData(2),
    box: shifted.getBoundingBox(),
  };
}

function esrbE10(cx, cy, maxW, maxH) {
  const ePts = unitE();
  const tenX = -0.32;
  const tenY = 0.34;
  const tenSize = 0.64;
  const ten = offsetGlyph(arialNarrowBold, '10+', tenSize, tenX, tenY);
  const { gcx, gcy, scale } = fitTilted(
    [...ePts, [ten.box.x1, ten.box.y1], [ten.box.x2, ten.box.y2]],
    maxW,
    maxH
  );
  const eCentered = ePts.map(([x, y]) => [x - gcx, y - gcy]);
  const tenCentered = offsetGlyph(
    arialNarrowBold,
    '10+',
    tenSize,
    tenX - gcx,
    tenY - gcy
  );
  return `<g transform="translate(${cx} ${cy}) rotate(${ESRB_TILT}) scale(${scale.toFixed(4)})"><path fill="${INK}" fill-rule="evenodd" d="${polyPath(eCentered)} ${tenCentered.d}"/></g>`;
}

function esrbAO(cx, cy, maxW, maxH) {
  const a = centeredGlyph(impact, 'A', 1);
  const ox = 0.17;
  const oy = 0.06;
  const rOut = 0.175;
  const rIn = 0.105;
  const ring = `${circlePath(ox, oy, rOut)} ${circlePath(ox, oy, rIn)}`;
  const { gcx, gcy, scale } = fitTilted(
    [
      [a.box.x1, a.box.y1],
      [a.box.x2, a.box.y2],
      [ox - rOut, oy - rOut],
      [ox + rOut, oy + rOut],
    ],
    maxW,
    maxH
  );
  return `<g transform="translate(${cx} ${cy}) rotate(${ESRB_TILT}) scale(${scale.toFixed(4)}) translate(${(-gcx).toFixed(3)} ${(-gcy).toFixed(3)})">
    <defs>
      <clipPath id="esrb-ao-a" clipPathUnits="userSpaceOnUse"><path d="${a.d}"/></clipPath>
    </defs>
    <path fill="${INK}" fill-rule="evenodd" d="${ring}"/>
    <path fill="${INK}" d="${a.d}"/>
    <path fill="${PAPER}" fill-rule="evenodd" d="${ring}" clip-path="url(#esrb-ao-a)"/>
  </g>`;
}

function esrbMark(code, cx, cy, maxW, maxH) {
  if (code === 'e') {
    return `<path fill="${INK}" d="${polyPath(fitPts(unitE(), cx, cy, maxW, maxH, ESRB_TILT))}"/>`;
  }
  if (code === 't') {
    return `<path fill="${INK}" d="${polyPath(fitPts(unitT(), cx, cy, maxW, maxH, ESRB_TILT))}"/>`;
  }
  if (code === 'e10-plus') {
    return esrbE10(cx, cy, maxW, maxH);
  }
  if (code === 'm') {
    return tiltedGlyph(arialNarrowBold, 'M', cx, cy, maxW, maxH);
  }
  return esrbAO(cx, cy, maxW, maxH);
}

function esrbIcon(title, code) {
  const pad = 6;
  const H = SIZE - pad * 2;
  const W = H * (60.418 / 90.628);
  const X = (SIZE - W) / 2;
  const Y = pad;
  const headerX = X + W * 0.0503;
  const headerY = Y + H * 0.0355;
  const headerW = W * 0.892;
  const headerH = H * 0.1658;
  const bodyX = X + W * 0.0499;
  const bodyY = Y + H * 0.2375;
  const bodyW = W * 0.8926;
  const bodyH = H * 0.6096;
  const footerX = headerX;
  const footerY = bodyY + bodyH;
  const footerW = headerW;
  const footerH = Y + H - footerY;
  const markPadX = bodyW * 0.06;
  const markPadY = bodyH * 0.05;

  return svgWrap(
    `<rect x="${X.toFixed(2)}" y="${Y.toFixed(2)}" width="${W.toFixed(2)}" height="${H.toFixed(2)}" fill="${INK}"/>` +
      `<rect x="${headerX.toFixed(2)}" y="${headerY.toFixed(2)}" width="${headerW.toFixed(2)}" height="${headerH.toFixed(2)}" fill="${PAPER}"/>` +
      `<rect x="${bodyX.toFixed(2)}" y="${bodyY.toFixed(2)}" width="${bodyW.toFixed(2)}" height="${bodyH.toFixed(2)}" fill="${PAPER}"/>` +
      titlePath(
        title,
        headerX + headerW / 2,
        headerY + headerH / 2,
        headerW * 0.94,
        headerH * 0.86,
        INK
      ) +
      esrbMark(
        code,
        bodyX + bodyW / 2,
        bodyY + bodyH / 2,
        bodyW - markPadX * 2,
        bodyH - markPadY * 2
      ) +
      esrbWordmark(
        footerX + footerW / 2,
        footerY + footerH / 2,
        footerW * 0.86,
        footerH * 0.62,
        PAPER
      )
  );
}

const catalog = [
  [
    'classind',
    [
      ['l', classindIcon('L', '#00A651', '#ffffff')],
      ['6', classindIcon('6', '#E43493', '#ffffff')],
      ['10', classindIcon('10', '#0095DA', '#ffffff')],
      ['12', classindIcon('12', '#FBC115', '#ffffff')],
      ['14', classindIcon('14', '#F58220', '#ffffff')],
      ['16', classindIcon('16', '#EC1D25', '#ffffff')],
      ['18', classindIcon('18', '#000000', '#ffffff')],
    ],
  ],
  [
    'mpa',
    [
      ['g', mpaIcon('g')],
      ['pg', mpaIcon('pg')],
      ['pg-13', mpaIcon('pg-13')],
      ['r', mpaIcon('r')],
      ['nc-17', mpaIcon('nc-17')],
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
      ['e', esrbIcon('EVERYONE', 'e')],
      ['e10-plus', esrbIcon('EVERYONE 10+', 'e10-plus')],
      ['t', esrbIcon('TEEN', 't')],
      ['m', esrbIcon('MATURE 17+', 'm')],
      ['ao', esrbIcon('ADULTS ONLY 18+', 'ao')],
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

