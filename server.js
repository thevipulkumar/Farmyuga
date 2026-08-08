/**
 * Phusion Passenger entry point for cPanel's "Setup Node.js App".
 *
 * cPanel/Passenger does not run `npm start` — it loads a single startup file
 * and expects the app to listen on the port it provides. This wraps the
 * compiled Next.js server so `next build` output is served in production.
 *
 * cPanel → Setup Node.js App:
 *   Application startup file : server.js
 *   Application mode         : Production
 *
 * IMPORTANT: run `npm run build` on the server before (re)starting the app.
 * Passenger serves the contents of .next — if that folder is missing or
 * stale, you will see an error page or yesterday's site.
 */

const { createServer } = require("node:http");
const next = require("next");

// Passenger injects PORT. The fallback is only for running this file by hand.
const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOST || "0.0.0.0";

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch((err) => {
        console.error("[farmyuga] request failed:", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
    }).listen(port, () => {
      console.log(`[farmyuga] ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("[farmyuga] failed to start Next.js:", err);
    process.exit(1);
  });
