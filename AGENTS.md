# Agent Instructions — PHANA Personal Developer Platform

## 1. Always Build, Commit, and Push to GitHub When Done
- Every completed change in `E:\about me` must be built, committed, and pushed to `origin/main` (`https://github.com/phanaach4889/About-me..git`) automatically so GitHub Pages (`https://phanaach4889.github.io/About-me./`) deploys immediately.
- Execute:
  ```powershell
  powershell -ExecutionPolicy Bypass -File "E:\about me\deploy.ps1" -Message "feat: <summary>"
  ```
- Ensure `index.html` at the repository root always references `./assets/app.bundle.js` and `./assets/app.bundle.css` so it works both via `file:///` and on GitHub Pages.

## 2. Strict Zero-Emoji Policy
- Never use emoji characters in code, UI, commit messages, or documentation. Use inline `<svg>` vector icons exclusively.
