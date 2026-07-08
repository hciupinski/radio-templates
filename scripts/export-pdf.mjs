import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const distDir = path.join(root, "dist");
const outputPath = path.join(distDir, "szablony-radiologiczne.pdf");
const publicPdfPath = path.join(root, "public", "szablony-radiologiczne.pdf");
const port = Number(process.env.PDF_PORT ?? 4179);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".pdf", "application/pdf"]
]);

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl ?? "/", `http://127.0.0.1:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const normalized = pathname === "/" ? "/index.html" : pathname;
  return path.join(distDir, normalized);
}

const server = http.createServer((request, response) => {
  const filePath = resolveRequestPath(request.url);
  if (!filePath.startsWith(distDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const extension = path.extname(filePath);
  response.writeHead(200, {
    "Content-Type": mimeTypes.get(extension) ?? "application/octet-stream"
  });
  fs.createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

try {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1240, height: 1754 },
    deviceScaleFactor: 1
  });

  await page.goto(`http://127.0.0.1:${port}/pdf.html`, { waitUntil: "networkidle" });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate:
      '<div style="font-size:9px;color:#667386;width:100%;padding:0 12mm;display:flex;justify-content:space-between;"><span>Atlas opisów radiologicznych</span><span><span class="pageNumber"></span>/<span class="totalPages"></span></span></div>',
    margin: { top: "12mm", right: "12mm", bottom: "16mm", left: "12mm" }
  });
  fs.mkdirSync(path.dirname(publicPdfPath), { recursive: true });
  fs.copyFileSync(outputPath, publicPdfPath);
  await browser.close();
  console.log(`PDF zapisany: ${path.relative(root, outputPath)}`);
  console.log(`PDF skopiowany do dev servera: ${path.relative(root, publicPdfPath)}`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
