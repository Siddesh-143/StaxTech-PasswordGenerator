Password Generator
==================

Small, standalone Password Generator web app.

Files:
- `index.html` — UI and controls
- `style.css` — simple styling
- `script.js` — password generation logic

How to use:
1. Open `index.html` in your browser (double-click or use your browser's File -> Open).
2. Choose password length and options (uppercase, lowercase, numbers, symbols).
3. Click "Generate". Use "Copy" to copy to clipboard.

Notes:
- Uses Web Crypto API for secure random values where available.
- No build required.

Next steps (optional):
- Deploy to GitHub Pages.
- Add a small test for the generator function in Node/Jest.
- Add a strength estimator (zxcvbn) and visual feedback.
