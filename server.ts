import express from "express";
import path from "path";
import compression from "compression";
import fs from "fs";

import { createServer as createViteServer } from "vite";




async function startServer() {
  const app = express();
  const PORT = 3000;

  // Compress all HTTP responses (gzip/brotli)
  app.use(compression());

  // JSON request body parser
  app.use(express.json());

  // API health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API lead capture route
  app.post("/api/lead", async (req, res) => {
    try {
      const { fullName, phone, zipOrCity, serviceOrMaterial, notes, pageUrl } = req.body || {};
      console.log("[New Lead Received]:", { fullName, phone, zipOrCity, serviceOrMaterial, notes, pageUrl });

      // Forward to Web3Forms for email delivery
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: "faed6a10-57e8-4faa-b1ec-74c37345ea30",
            subject: `New Quote Request: ${fullName || "Lead"} - ${serviceOrMaterial || "Hardscaping"}`,
            name: fullName,
            phone: phone,
            message: `Service/Material: ${serviceOrMaterial}\nZIP/City: ${zipOrCity}\nProject Notes: ${notes || "None"}\nPage URL: ${pageUrl || ""}`
          })
        });
      } catch (err) {
        console.error("Web3Forms forward error (non-fatal):", err);
      }

      res.status(200).json({ success: true, message: "Lead received successfully" });
    } catch (error) {
      console.error("Error processing lead:", error);
      res.status(500).json({ success: false, error: "Failed to process lead" });
    }
  });

  // Vite middleware for development or fallback static folder in production
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback for Express v5 to serve index.html in dev mode if Vite misses it
    app.get("*all", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = await import("fs").then(fs => fs.promises.readFile(path.resolve(__dirname, "index.html"), "utf-8"));
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Every page is prerendered to dist/<route>.html. Drop trailing slashes so
    // each page has exactly one URL, then serve "/about-us" from about-us.html.
    app.use((req, res, next) => {
      if (req.path.length > 1 && req.path.endsWith("/")) {
        const query = req.url.slice(req.path.length);
        return res.redirect(301, req.path.replace(/\/+$/, "") + query);
      }
      const page = req.path === "/" ? "index.html" : `${req.path.slice(1)}.html`;
      const file = path.join(distPath, page);
      if (file.startsWith(distPath) && fs.existsSync(file)) {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        return res.sendFile(file);
      }
      next();
    });

    // Serve static files inside dist/ directory with aggressive caching for assets
    app.use(express.static(distPath, {
      redirect: false,
      setHeaders: (res, path) => {
        if (path.includes('/assets/')) {
          // Cache immutable assets (hashed) for 1 year
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          // Cache other static files (like favicon) for 1 day
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      }
    }));
    
    // Unknown URLs get a real 404 status (no soft-404s for Google)
    app.get("*all", (req, res) => {
      res.status(404).sendFile(path.join(distPath, "404.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
