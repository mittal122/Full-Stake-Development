const express = require('express');
const path = require('path');

// Routers
const homeRouter = require('./routes/home');
const logsRouter = require('./routes/logs');

const app = express();

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homeRouter);
app.use('/logs', logsRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
