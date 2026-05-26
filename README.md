# Zdravie+

`Zdravie+` is a lightweight offline-capable web app for tracking health metrics such as INR, medication tablets, blood pressure, and pulse.

## Files

- `index.html` — main application page and UI
- `manifest.json` — progressive web app metadata
- `sw.js` — service worker for caching and offline support
- `favicon.png` — app icon used for PWA install and browser tab

## Features

- User name entry and welcome screen
- Save daily measurements to localStorage
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

- Records are stored in `localStorage` and persist between sessions in the same browser.
- To reset the app, clear local site data or remove stored entries from the browser.
