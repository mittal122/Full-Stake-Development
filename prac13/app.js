const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('form', { errors: [], values: { sourceA: '', sourceB: '' }, total: null });
});

app.post('/calculate',
  // validation
  body('sourceA')
    .trim()
    .notEmpty().withMessage('Income from Source A is required')
    .bail()
    .isFloat({ min: 0 }).withMessage('Enter a valid non-negative number for Source A'),
  body('sourceB')
    .trim()
    .notEmpty().withMessage('Income from Source B is required')
    .bail()
    .isFloat({ min: 0 }).withMessage('Enter a valid non-negative number for Source B'),
  (req, res) => {
    const errors = validationResult(req);
    const values = {
      sourceA: req.body.sourceA || '',
      sourceB: req.body.sourceB || ''
    };

    if (!errors.isEmpty()) {
      return res.status(400).render('form', { errors: errors.array(), values, total: null });
    }

    // Server-side calculation
    const a = parseFloat(req.body.sourceA);
    const b = parseFloat(req.body.sourceB);
    const total = a + b;

    res.render('form', { errors: [], values, total });
  }
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
