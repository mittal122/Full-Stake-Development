# Practical 10 — Basic Express Server

A clean, scalable Express.js backend for a small product site.

## What it does
- GET `/` → returns plain text: `Welcome to our site`
- Static files served from `public/`
- Log viewer available under `/logs` (optional extra):
  - GET `/logs` → list log files
  - GET `/logs/view?file=...` → view a log file
  - GET `/logs/download?file=...` → download a log file
  - GET `/logs/clear?file=...` → clear a log file

## Project layout
- `server.js` — app entrypoint mounts feature routers
- `routes/home.js` — home route
- `routes/logs.js` — log viewer routes (kept modular)
- `public/` — static assets (CSS)
- `logs/` — example access/error logs

## Run it (Windows PowerShell)
```powershell
cd "C:\Users\mmpdo\Desktop\collage5th\fsd\Full_Stack_Development_Sem_5-main\Full_Stack_Development_Sem_5-main\practical_10"
npm install
npm run dev   # or: npm start
```
Then open:
- http://localhost:3000/ → should show "Welcome to our site"
- http://localhost:3000/logs → log viewer list

To change the port:
```powershell
$env:PORT=4000; npm start
```

## Notes
- The structure is router-based so you can add new features under `routes/` (e.g., `products.js`) and mount them in `server.js`.
