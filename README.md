# Phana Kurosaki (PHANA / KON) — Personal Developer Platform

Personal developer platform and project showcase for **Phana Kurosaki** (**Phana** / **KON** / **PK**).

- **GitHub Profile**: [https://github.com/phanaach4889](https://github.com/phanaach4889)
- **Stack**: React 18, Vite 6, Tailwind CSS 3, Inline SVG Vector Icons, GitHub REST API

---

## Running Locally

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev

# Build the production static bundle (outputs to ./dist)
npm run build

# Preview the production bundle locally
npm run preview
```

---

## Adding or Updating Projects

All projects are stored in a single centralized data file:

- **`src/data/projects.js`**

To add a new project or update an existing one:
1. Open `src/data/projects.js`.
2. Add or edit an object in the `PROJECTS` array (`id`, `name`, `subtitle`, `category`, `status`, `statusTone`, `featured`, `currentlyBuilding`, `repoUrl`, `liveUrl`, `shortDescription`, `overview`, `whyIBuiltIt`, `features`, `technologies`, `challengesAndImprovements`, `whatComesNext`, `coverImage`).
3. To update personal bio details, philosophy statements, or timeline milestones, edit **`src/data/profile.js`**.

---

## Deploying to GitHub Pages

This project is pre-configured with `base: './'` in `vite.config.js` so it works on both:
- Root GitHub Pages (`https://phanaach4889.github.io/` via the `phanaach4889.github.io` repository)
- Any project subpath (`https://phanaach4889.github.io/<repo-name>/`)

### GitHub Repository Settings Required:
1. Push this project to your GitHub repository on the `main` branch.
2. In your GitHub repository, open **Settings -> Pages**.
3. Under **Build and deployment -> Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build `./dist` and deploy to GitHub Pages on every push to `main`.
