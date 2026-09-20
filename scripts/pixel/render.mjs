// Compile the .pix sprites in this folder into /img/pixel/*.svg.
//
//   node scripts/pixel/render.mjs            compile to img/pixel/
//   node scripts/pixel/render.mjs --preview  also write 8x PNGs to tmp/pixel/
//
// A .pix file is the source of truth: a palette plus a character grid, one
// character per pixel. The SVGs under img/pixel/ are OUTPUT and are overwritten
// on every run -- edit the .pix and re-run, never the .svg.
//
// The --preview PNGs exist because a sprite is only ever validated by looking at
// it. A grid that parses is not a grid that reads: every piece in this folder
// passed validation on its first try and several were unrecognisable anyway.
// They go to tmp/ (gitignored) and are not part of the site.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const OUT = join(ROOT, 'img', 'pixel');

// The two grounds a sprite has to survive. A piece is authored to work on both
// rather than to follow the active Theme, so for EACH ground the palette must
// hold at least one colour that stands off it. Note "for each", not "one colour
// for both": a football is white with black panels and no single colour of it
// clears both grounds, yet it reads on either because it carries one for each.
// What this rejects is the piece that is uniformly light (vanishes on white) or
// uniformly near-black (vanishes on the night ground). Both have happened.
const GROUNDS = { night: '#0a0f1e', day: '#f4f6fa' };
const RIM_MIN = 3;

const luminance = hex => {
  const c = [1, 3, 5].map(i => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

function parse(src, name) {
  const palette = new Map(), meta = {}, grid = [];
  let mode = 'head';
  for (const raw of src.split('\n')) {
    const line = raw.replace(/\r$/, '');
    if (mode === 'head') {
      if (line.trim() === '' || line.startsWith('#')) continue;
      let m = line.match(/^([a-z]+):\s*(.*)$/);
      if (m) { meta[m[1]] = m[2].trim(); continue; }
      m = line.match(/^(\S)\s*=\s*(#[0-9a-fA-F]{6}|none)$/);
      if (m) { palette.set(m[1], m[2] === 'none' ? null : m[2]); continue; }
      if (line.trim() === '---') { mode = 'grid'; continue; }
      throw new Error(`${name}: bad header line: ${JSON.stringify(line)}`);
    } else if (line.trim() !== '') grid.push(line);
  }

  const h = grid.length, w = grid[0]?.length ?? 0;
  const errs = [];
  if (!h) errs.push('empty grid');
  grid.forEach((row, y) => {
    if (row.length !== w) errs.push(`row ${y + 1}: length ${row.length}, expected ${w}`);
    [...row].forEach((ch, x) => {
      if (!palette.has(ch)) errs.push(`row ${y + 1} col ${x + 1}: ${JSON.stringify(ch)} not in palette`);
    });
  });

  const inks = [...palette.values()].filter(Boolean);
  for (const [ground, bg] of Object.entries(GROUNDS)) {
    if (!inks.length || inks.some(c => contrast(c, bg) >= RIM_MIN)) continue;
    const best = inks.map(c => ({ c, r: contrast(c, bg) })).sort((a, b) => b.r - a.r)[0];
    errs.push(`nothing clears ${RIM_MIN}:1 against the ${ground} ground (${bg}) — the piece `
      + `disappears there. Best is ${best.c} at ${best.r.toFixed(2)}:1.`);
  }

  if (errs.length) throw new Error(`${name}: ${errs.length} error(s)\n  ` + errs.slice(0, 20).join('\n  '));
  return { meta, palette, grid, w, h, colors: inks.length };
}

// Greedy horizontal runs merged vertically, so a flat area becomes one <rect>
// instead of one per pixel. Same approach as Aseprite's SVG export.
function rects({ palette, grid, w, h }) {
  const used = Array.from({ length: h }, () => new Array(w).fill(false));
  const out = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (used[y][x]) continue;
    const ch = grid[y][x], fill = palette.get(ch);
    if (fill === null) { used[y][x] = true; continue; }
    let rw = 0;
    while (x + rw < w && !used[y][x + rw] && grid[y][x + rw] === ch) rw++;
    let rh = 1;
    grow: while (y + rh < h) {
      for (let k = 0; k < rw; k++) if (used[y + rh][x + k] || grid[y + rh][x + k] !== ch) break grow;
      rh++;
    }
    for (let j = 0; j < rh; j++) for (let k = 0; k < rw; k++) used[y + j][x + k] = true;
    out.push({ x, y, w: rw, h: rh, fill });
  }
  return out;
}

const toSVG = piece => {
  const rs = rects(piece);
  const body = rs.map(r => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.fill}"/>`).join('');
  return {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${piece.w}" height="${piece.h}" `
       + `viewBox="0 0 ${piece.w} ${piece.h}" shape-rendering="crispEdges">${body}</svg>\n`,
    count: rs.length,
  };
};

// --- minimal PNG writer for --preview, so previews need no dependency --------
const crc32 = buf => {
  let crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    let c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = c ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
function toPNG({ palette, grid, w, h }, scale, bg) {
  const W = w * scale, H = h * scale;
  const raw = Buffer.alloc(H * (1 + W * 4));
  for (let y = 0; y < H; y++) {
    const off = y * (1 + W * 4);
    for (let x = 0; x < W; x++) {
      const fill = palette.get(grid[(y / scale) | 0][(x / scale) | 0]) ?? bg;
      const hex = fill ?? bg;
      const p = off + 1 + x * 4;
      raw[p] = parseInt(hex.slice(1, 3), 16);
      raw[p + 1] = parseInt(hex.slice(3, 5), 16);
      raw[p + 2] = parseInt(hex.slice(5, 7), 16);
      raw[p + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const preview = process.argv.includes('--preview');
const previewDir = join(ROOT, 'tmp', 'pixel');
mkdirSync(OUT, { recursive: true });
if (preview) mkdirSync(previewDir, { recursive: true });

let failed = 0;
for (const f of readdirSync(HERE).filter(f => f.endsWith('.pix')).sort()) {
  const name = basename(f, '.pix');
  try {
    const piece = parse(readFileSync(join(HERE, f), 'utf8'), name);
    const { svg, count } = toSVG(piece);
    writeFileSync(join(OUT, name + '.svg'), svg);
    if (preview) writeFileSync(join(previewDir, name + '.png'), toPNG(piece, 8, GROUNDS.night));
    console.log(`${name.padEnd(12)} ${piece.w}x${piece.h}  ${piece.colors} colors  ${count} rects  ${svg.length}B`);
  } catch (e) {
    failed++;
    console.error(`\n${e.message}\n`);
  }
}
if (failed) { console.error(`${failed} sprite(s) failed to compile`); process.exit(1); }
