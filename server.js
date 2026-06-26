const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

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

function proxyRequest(req, res) {
  if (!req.url) {
    sendJson(res, 400, { error: "Missing request URL" });
    return;
  }

  const requestUrl = new URL(
    req.url,
    `http://${req.headers.host || `${HOST}:${PORT}`}`,
  );
  const target = requestUrl.searchParams.get("target");
  if (!target) {
    sendJson(res, 400, { error: "Missing target URL" });
    return;
  }

  let targetUrl;
  try {
    targetUrl = new URL(target);
  } catch (e) {
    sendJson(res, 400, { error: "Invalid target URL" });
    return;
  }

  const client = targetUrl.protocol === "https:" ? https : http;

  const headers = {};
  Object.entries(req.headers).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === "host" || lowerKey === "content-length") return;
    headers[key] = value;
  });
  headers.host = targetUrl.host;

  // Convert X-Proxy-Cookie (sent by the frontend because Cookie is a forbidden
  // request header in browsers) to the real Cookie header.
  // Make sure to replace any browser-supplied Cookie for the proxy origin.
  const proxyCookieKey = Object.keys(req.headers).find(
    (k) => k.toLowerCase() === "x-proxy-cookie",
  );
  if (proxyCookieKey) {
    Object.keys(headers).forEach((k) => {
      if (k.toLowerCase() === "cookie") delete headers[k];
    });
    headers["Cookie"] = req.headers[proxyCookieKey];
    delete headers[proxyCookieKey];
    console.log(
      `[proxy] ${req.method} ${targetUrl.href} -> Cookie: ${headers["Cookie"].substring(0, 80)}...`,
    );
  }

  const proxyReq = client.request(
    targetUrl,
    { method: req.method, headers },
    (proxyRes) => {
      const statusCode = proxyRes.statusCode || 502;
      const responseHeaders = { ...proxyRes.headers };
      delete responseHeaders["content-length"];
      res.writeHead(statusCode, responseHeaders);
      proxyRes.pipe(res);
    },
  );

  proxyReq.on("error", (err) => {
    if (!res.headersSent) {
      sendJson(res, 502, { error: "Proxy error", message: err.message });
    } else {
      res.end();
    }
  });

  req.pipe(proxyReq);
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

  if (pathname === "/proxy") {
    proxyRequest(req, res);
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
