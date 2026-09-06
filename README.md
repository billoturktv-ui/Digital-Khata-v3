# DigiKhata — PWA (fully offline-capable)

This build has no external CDN dependencies at runtime — React, ReactDOM, and
all styling are bundled locally in `vendor/`. After the first successful
load, the service worker caches everything needed, so the app keeps working
with no internet connection at all (data is stored on-device via
`localStorage`).

Note: the two Google Fonts used for headings/body text are still loaded from
fonts.googleapis.com the first time you open the app online — the service
worker then caches them too, so subsequent offline loads keep the same
typography. If that first load happens with no connection, the app still
works fully, just with the browser's default font instead.

## Deploy

Upload this whole folder (keeping the `vendor/` and `icons/` subfolders) to
GitHub Pages, Netlify, or any static host — same as before. Then on your
phone: Add to Home Screen (Android: browser menu → Install app / Add to Home
screen; iPhone: Share → Add to Home Screen).

## Files

- `index.html` — app shell
- `vendor/app.bundle.js` — React + ReactDOM + the app, bundled into one file
- `vendor/styles.css` — compiled utility CSS (no JIT compiler needed at runtime)
- `manifest.json`, `sw.js`, `icons/` — PWA install + offline caching
