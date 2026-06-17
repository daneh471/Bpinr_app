# BP & INR

`BP & INR` is a lightweight PWA for tracking health metrics such as INR, medication tablets, blood pressure, and pulse, fully offline with data stored securely in the device's local storage.

## Files

- `index.html` — main application page and UI
- `manifest.json` — progressive web app metadata
- `sw.js` — service worker for caching and offline support
- `favicon.png` — app icon used for PWA install and browser tab

## Features

- Local user registration and login via PIN (Offline Auth)
- Save daily measurements locally (100% Offline)
- Archive view with delete support
- Manual record entry
- Basic PWA installability and offline cache

## Run locally

1. Open a local server from the project folder (recommended):
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server .`
2. Visit `http://localhost:8000` in a browser.

> Note: Service workers require `http://localhost` or `https://`; opening `index.html` directly from the file system may not register the worker.

## Notes

- Records are stored exclusively in **localStorage** and are linked to your local account. No data is sent to external servers.
