require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// simple health check
app.get('/ping', (req, res) => res.send('pong'));

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  // create transporter
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // verify connection configuration
    await transporter.verify();
  } catch (err) {
    console.error('Failed to create transporter:', err);
    return res.status(500).json({ success: false, message: 'Mail server configuration error.' });
  }

  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: subject || `New message from ${name}`,
    text: message,
    html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
           <p><strong>Subject:</strong> ${subject || ''}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('sendMail error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
