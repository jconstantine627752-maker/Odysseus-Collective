```md
# Odysseus Collective

React + Vite + Tailwind single-page site with an Olympus intro scene and scrollable night sky. Deployable to Render as a static site.

## Local Dev
```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Deploy to Render (Static Site)
1. Push this repo to GitHub.
2. In Render, create **Static Site** → connect this repo.
3. **Build Command**: `npm ci && npm run build`
4. **Publish Directory**: `dist`
5. Leave everything else default.

> If you prefer a Web Service instead: use the same build command and serve `dist/` with a simple Node/Express or a static adapter. Static Site is simpler and cheaper.
```
