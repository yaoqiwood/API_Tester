const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT) || 8090;
const ROOT_DIR = __dirname;
const DEFAULT_FILE = "api_tester.html";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function sendFile(res, filePath) {
  fs.stat(filePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      sendJson(res, 404, { error: "File not found" });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": mimeType,
      "Cache-Control": "no-store",
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", () => {
      if (!res.headersSent) {
        sendJson(res, 500, { error: "Failed to read file" });
        return;
      }
      res.destroy();
    });
    stream.pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    sendJson(res, 400, { error: "Missing request URL" });
    return;
  }

  const requestUrl = new URL(
    req.url,
    `http://${req.headers.host || `${HOST}:${PORT}`}`,
  );
  const pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === "/healthz") {
    sendJson(res, 200, { ok: true });
    return;
  }

  const relativePath =
    pathname === "/" ? DEFAULT_FILE : pathname.replace(/^\/+/, "");
  const resolvedPath = path.resolve(ROOT_DIR, relativePath);

  if (
    !resolvedPath.startsWith(ROOT_DIR + path.sep) &&
    resolvedPath !== path.join(ROOT_DIR, DEFAULT_FILE)
  ) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  sendFile(res, resolvedPath);
});

server.listen(PORT, HOST, () => {
  console.log(`API Tester server running at http://${HOST}:${PORT}`);
  console.log(`Open http://${HOST}:${PORT}/ to load ${DEFAULT_FILE}`);
});
