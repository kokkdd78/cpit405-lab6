# CPIT-405 · Lab 6 — JavaScript

A static webpage with Like/Dislike voting, one comment per browser, and cookie-based reset.

## Features

- Like and Dislike buttons with counters.
- Blocks repeated votes using a cookie.
- Accepts one comment and saves it in a cookie.
- Restores voting/comment state after page reload.
- Reset clears both cookies and lets the user vote/comment again.
- Updates the page using DOM API and JavaScript event listeners.

**Important:** This lab intentionally uses cookies only. Counts and comments are specific to each browser; they are **not** shared between different visitors because there is no server or database.

## Run locally

Cookie behavior is most reliable through a web server (not by double-clicking `index.html`). Run in this folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000/ in your browser. Alternatively use VS Code Live Server.

## Manual test checklist

1. Click Like => Like counter reads 1 and both voting buttons become disabled.
2. Refresh => vote remains saved.
3. Submit a comment => it appears below and submitting another is disabled.
4. Refresh => comment remains saved.
5. Click Reset all => both counters show 0, comment disappears, and voting/commenting work again.

## Publish with GitHub Pages

1. Create a **public** GitHub repository named `cpit405-lab6`.
2. Upload `index.html`, `style.css`, and `script.js` (and optionally this README) to the **root** of the `main` branch.
3. In GitHub: **Settings > Pages > Build and deployment**.
4. Set **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)**; click **Save**.
5. Open the site URL shown under GitHub Pages. It should follow this form:
   `https://YOUR_USERNAME.github.io/cpit405-lab6/`
6. Submit the **site URL**, not the repository URL, to your course platform.
