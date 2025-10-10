# Library Portal (Session Demo)

This simple Express app demonstrates creating sessions when users "log in" and showing session info on a profile page, with logout destroying the session.

Setup

1. Install dependencies:
   npm install

2. Start server:
   npm start

3. Open http://localhost:3000 in your browser.

Notes
- This app is intentionally minimal and uses an in-memory session store (not suitable for production).
- Replace the session secret in `app.js` with a secure value for any real deployment.
