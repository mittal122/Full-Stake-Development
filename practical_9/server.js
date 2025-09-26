const express = require('express');
const path = require('path');

const app = express();

// simple request timing middleware
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const durMs = Number((process.hrtime.bigint() - start) / 1000000n);
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} in ${durMs}ms`);
  });
  next();
});

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// parse JSON for API endpoints
app.use(express.json());

// small API endpoints to make it distinct
app.get('/api/health', (req, res) => {
  res.json({ ok: true, ts: Date.now(), name: 'Mittal Domadiya', id: 'D24CS122' });
});

app.get('/api/time', (req, res) => {
  res.json({ now: new Date().toISOString(), tz: Intl.DateTimeFormat().resolvedOptions().timeZone });
});

// theme preference via query or cookie-like header fallback
app.use((req, res, next) => {
  const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
  const theme = url.searchParams.get('theme');
  req.theme = theme === 'dark' || theme === 'light' ? theme : 'light';
  next();
});

// Routes
const homeRoute = require('./routes/home');
app.use('/', homeRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).send(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Not Found · D24CS122</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <div class="container">
        <h1>404 — Page not found</h1>
        <p>The page you requested does not exist.</p>
        <a class="btn" href="/">Go Home</a>
      </div>
    </body>
  </html>`);
});

// generic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
