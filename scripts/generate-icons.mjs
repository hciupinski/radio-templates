import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();

const palette = {
  teal: [15, 139, 141, 255],
  mint: [228, 245, 244, 255],
  white: [255, 255, 255, 255]
};

function createCanvas(size, background) {
  return {
    size,
    pixels: new Uint8Array(size * size * 4).fill(0),
    background
  };
}

function setPixel(canvas, x, y, color) {
  if (x < 0 || y < 0 || x >= canvas.size || y >= canvas.size) {
    return;
  }

  const offset = (y * canvas.size + x) * 4;
  canvas.pixels[offset] = color[0];
  canvas.pixels[offset + 1] = color[1];
  canvas.pixels[offset + 2] = color[2];
  canvas.pixels[offset + 3] = color[3];
}

function fillRect(canvas, x, y, width, height, color) {
  const startX = Math.max(0, Math.floor(x));
  const endX = Math.min(canvas.size, Math.ceil(x + width));
  const startY = Math.max(0, Math.floor(y));
  const endY = Math.min(canvas.size, Math.ceil(y + height));

  for (let py = startY; py < endY; py += 1) {
    for (let px = startX; px < endX; px += 1) {
      setPixel(canvas, px, py, color);
    }
  }
}

function fillRoundedRect(canvas, x, y, width, height, radius, color) {
  const minX = Math.floor(x);
  const maxX = Math.ceil(x + width);
  const minY = Math.floor(y);
  const maxY = Math.ceil(y + height);
  const r = radius;

  for (let py = minY; py < maxY; py += 1) {
    for (let px = minX; px < maxX; px += 1) {
      const insideX = px >= x + r && px < x + width - r;
      const insideY = py >= y + r && py < y + height - r;

      if (insideX || insideY) {
        setPixel(canvas, px, py, color);
        continue;
      }

      const cornerX = px < x + r ? x + r : x + width - r - 1;
      const cornerY = py < y + r ? y + r : y + height - r - 1;
      const dx = px - cornerX;
      const dy = py - cornerY;

      if (dx * dx + dy * dy <= r * r) {
        setPixel(canvas, px, py, color);
      }
    }
  }
}

function fillCircle(canvas, cx, cy, radius, color) {
  const minX = Math.floor(cx - radius);
  const maxX = Math.ceil(cx + radius);
  const minY = Math.floor(cy - radius);
  const maxY = Math.ceil(cy + radius);
  const squared = radius * radius;

  for (let py = minY; py < maxY; py += 1) {
    for (let px = minX; px < maxX; px += 1) {
      const dx = px - cx;
      const dy = py - cy;
      if (dx * dx + dy * dy <= squared) {
        setPixel(canvas, px, py, color);
      }
    }
  }
}

function strokeCircle(canvas, cx, cy, radius, strokeWidth, color) {
  const outer = radius * radius;
  const innerRadius = Math.max(0, radius - strokeWidth);
  const inner = innerRadius * innerRadius;
  const minX = Math.floor(cx - radius);
  const maxX = Math.ceil(cx + radius);
  const minY = Math.floor(cy - radius);
  const maxY = Math.ceil(cy + radius);

  for (let py = minY; py < maxY; py += 1) {
    for (let px = minX; px < maxX; px += 1) {
      const dx = px - cx;
      const dy = py - cy;
      const distance = dx * dx + dy * dy;
      if (distance <= outer && distance >= inner) {
        setPixel(canvas, px, py, color);
      }
    }
  }
}

function drawThickLine(canvas, x1, y1, x2, y2, thickness, color) {
  const radius = thickness / 2;
  const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));

  for (let step = 0; step <= steps; step += 1) {
    const t = steps === 0 ? 0 : step / steps;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    fillCircle(canvas, x, y, radius, color);
  }
}

function drawIcon(canvas, { maskable = false } = {}) {
  fillRect(canvas, 0, 0, canvas.size, canvas.size, canvas.background);

  const iconScale = canvas.size / 512;
  const outerRadius = maskable ? 0 : 144 * iconScale;
  if (outerRadius > 0) {
    const copy = canvas.pixels.slice();
    fillRoundedRect(
      { ...canvas, pixels: copy },
      0,
      0,
      canvas.size,
      canvas.size,
      outerRadius,
      palette.teal
    );
    canvas.pixels = copy;
  }

  const cardX = (maskable ? 126 : 134) * iconScale;
  const cardY = (maskable ? 108 : 116) * iconScale;
  const cardW = (maskable ? 260 : 244) * iconScale;
  const cardH = (maskable ? 296 : 280) * iconScale;
  const cardRadius = 30 * iconScale;

  fillRoundedRect(canvas, cardX, cardY, cardW, cardH, cardRadius, palette.white);

  const lineX = (maskable ? 188 : 190) * iconScale;
  const lineWidth = (maskable ? 136 : 132) * iconScale;
  const lineStroke = (maskable ? 22 : 22) * iconScale;
  const lineGap = 56 * iconScale;

  for (let index = 0; index < 3; index += 1) {
    const y = (maskable ? 184 : 188) * iconScale + index * lineGap;
    const currentWidth = index === 2 ? lineWidth * 0.72 : lineWidth;
    drawThickLine(canvas, lineX, y, lineX + currentWidth, y, lineStroke, palette.teal);
  }

  const circleX = (maskable ? 324 : 320) * iconScale;
  const circleY = (maskable ? 320 : 316) * iconScale;
  const circleRadius = (maskable ? 42 : 40) * iconScale;
  const circleStroke = 16 * iconScale;

  fillCircle(canvas, circleX, circleY, circleRadius, palette.mint);
  strokeCircle(canvas, circleX, circleY, circleRadius, circleStroke, palette.teal);

  drawThickLine(
    canvas,
    (maskable ? 350 : 344) * iconScale,
    (maskable ? 346 : 340) * iconScale,
    (maskable ? 382 : 374) * iconScale,
    (maskable ? 378 : 370) * iconScale,
    18 * iconScale,
    palette.teal
  );
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const lengthBuffer = Buffer.alloc(4);
  lengthBuffer.writeUInt32BE(data.length, 0);

  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);

  return Buffer.concat([lengthBuffer, typeBuffer, data, crcBuffer]);
}

function encodePng(canvas) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(canvas.size, 0);
  ihdr.writeUInt32BE(canvas.size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = canvas.size * 4;
  const raw = Buffer.alloc((stride + 1) * canvas.size);
  for (let y = 0; y < canvas.size; y += 1) {
    const rowOffset = y * (stride + 1);
    raw[rowOffset] = 0;
    canvas.pixels.subarray(y * stride, (y + 1) * stride).forEach((value, index) => {
      raw[rowOffset + 1 + index] = value;
    });
  }

  const compressed = zlib.deflateSync(raw);
  return Buffer.concat([
    signature,
    createChunk("IHDR", ihdr),
    createChunk("IDAT", compressed),
    createChunk("IEND", Buffer.alloc(0))
  ]);
}

function writeIcon(filename, size, options = {}) {
  const canvas = createCanvas(size, palette.teal);
  drawIcon(canvas, options);
  fs.writeFileSync(path.join(root, filename), encodePng(canvas));
}

writeIcon("public/pwa-192x192.png", 192);
writeIcon("public/pwa-512x512.png", 512);
writeIcon("public/pwa-maskable-512x512.png", 512, { maskable: true });
writeIcon("public/apple-touch-icon.png", 180);

console.log("OK: wygenerowano ikony PWA PNG.");
