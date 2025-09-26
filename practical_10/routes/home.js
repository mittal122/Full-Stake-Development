const { Router } = require('express');

const router = Router();

// GET /
router.get('/', (req, res) => {
  res.send('Welcome to our site');
});

module.exports = router;
