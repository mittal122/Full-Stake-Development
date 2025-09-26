const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const router = Router();
const logsDir = path.join(__dirname, '..', 'logs');

// List all log files
router.get('/', (req, res) => {
  fs.readdir(logsDir, (err, files) => {
    if (err) {
      return res.status(500).send(`
        <html><body><h1>Error</h1><p>Cannot read logs directory.</p></body></html>
      `);
    }

    const logLinks = files
      .map((f) => `<li><a href="/logs/view?file=${encodeURIComponent(f)}">${f}</a></li>`)
      .join('');

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Log Viewer</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="container">
            <h1>Available Logs</h1>
            <ul class="log-list">${logLinks}</ul>
          </div>
        </body>
      </html>
    `);
  });
});

// View a specific log file
router.get('/view', (req, res) => {
  const fileName = req.query.file;
  if (!fileName) return res.status(400).send('Missing file parameter');

  const logFilePath = path.join(logsDir, fileName);

  // Security check: ensure file is inside logs folder
  if (!logFilePath.startsWith(logsDir)) {
    return res.status(403).send('Forbidden');
  }

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Error</title>
            <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
            <div class="container">
              <h1>Error Reading File</h1>
              <p>File may be missing or inaccessible.</p>
              <a href="/logs">Go back</a>
            </div>
          </body>
        </html>
      `);
    }

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Viewing ${fileName}</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="container">
            <h1>Viewing ${fileName}</h1>
            <pre class="logs">${data}</pre>
            <div class="buttons">
              <a class="btn" href="/logs/download?file=${encodeURIComponent(fileName)}">Download</a>
              <a class="btn danger" href="/logs/clear?file=${encodeURIComponent(fileName)}" onclick="return confirm('Clear this log file?');">Clear Log</a>
              <a class="btn back" href="/logs">Back to List</a>
            </div>
          </div>
        </body>
      </html>
    `);
  });
});

// Download a log file
router.get('/download', (req, res) => {
  const fileName = req.query.file;
  const logFilePath = path.join(logsDir, fileName);

  if (!logFilePath.startsWith(logsDir)) {
    return res.status(403).send('Forbidden');
  }

  res.download(logFilePath, fileName);
});

// Clear a log file
router.get('/clear', (req, res) => {
  const fileName = req.query.file;
  const logFilePath = path.join(logsDir, fileName);

  if (!logFilePath.startsWith(logsDir)) {
    return res.status(403).send('Forbidden');
  }

  fs.writeFile(logFilePath, '', (err) => {
    if (err) return res.status(500).send('Error clearing log');
    res.redirect(`/logs/view?file=${encodeURIComponent(fileName)}`);
  });
});

module.exports = router;
