# Project & Workflow Rules — PHANA Personal Developer Platform

## 1. Mandatory Auto-Build, Commit, and Push to GitHub When Done
- Whenever any task, feature, bugfix, or content update is completed in `E:\about me`, you **MUST** compile the production bundles and commit + push all changes to GitHub (`origin/main` at `https://github.com/not-Phana/About-me..git`) before finishing your turn.
- Run the deployment script from `E:\about me`:
  ```powershell
  powershell -ExecutionPolicy Bypass -File "E:\about me\deploy.ps1" -Message "feat: <concise description of changes>"
  ```
- This script runs `npm run build` (which updates `./assets/app.bundle.js`, `./assets/app.bundle.css`, and `./dist/`), stages all changes (`git add -A`), commits, and pushes to `origin/main` so that both local `index.html` and live GitHub Pages (`https://not-phana.github.io/About-me./`) are always in sync.

## 2. Strict Zero-Emoji Policy (Always Use Inline SVG Icons)
- Never use emoji Unicode characters anywhere in HTML, CSS, JavaScript, tutorial strings, status badges, documentation, commit messages, or responses.
- Always use crisp inline `<svg>` vector icons (`stroke="currentColor"`, `stroke-width="2.2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`) for all UI badges, buttons, tooltips, and status indicators.
