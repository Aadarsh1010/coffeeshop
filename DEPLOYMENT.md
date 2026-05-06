# 🚀 Deployment Guide — Brew & Soul

Complete step-by-step instructions for deploying the Brew & Soul website to production.

---

## 📋 Pre-deployment Checklist

Before deploying, verify:

- [ ] `npm run build` completes with no errors
- [ ] `npm run preview` works locally — test all pages
- [ ] All `VITE_*` environment variables are set in your hosting provider
- [ ] Replace `https://brewandsoul.com` with your real domain in:
  - `index.html` (canonical link, og:url, og:image, twitter:image)
  - `public/sitemap.xml` (all `<loc>` entries)
  - `public/robots.txt` (Sitemap line)
  - `.env.production` → `VITE_SITE_URL`
- [ ] Replace `public/og-image.svg` with a real **PNG (1200×630)** at `public/og-image.png`
- [ ] (Optional) Generate `favicon-192.png` and `favicon-512.png` from `coffee.svg` for the manifest
- [ ] Update phone, email, and address if different from defaults
- [ ] Test mobile + desktop one more time

> **PNG export tip:** use [realfavicongenerator.net](https://realfavicongenerator.net) — drop in `public/coffee.svg` and it generates the full icon set + manifest. Replace files in `/public`.

---

## 🌐 Deploy to Netlify

### Method 1: Git-based (recommended)

#### Step 1 — Push code to a Git repo

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:your-username/brew-and-soul.git
git push -u origin main
```

#### Step 2 — Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Choose your Git provider (GitHub / GitLab / Bitbucket) and authorize
4. Pick your `brew-and-soul` repo
5. Netlify will auto-detect `netlify.toml` and pre-fill:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20

#### Step 3 — Add environment variables

**Site settings → Environment variables → Add a variable**

Add each `VITE_*` from your `.env` file. Common ones:

| Key | Value |
|---|---|
| `VITE_SITE_URL` | `https://your-site.netlify.app` (or custom domain) |
| `VITE_FORMSPREE_ID` | Your Formspree form ID |
| `VITE_PLAUSIBLE_DOMAIN` | Your Plausible domain (if used) |

#### Step 4 — Deploy

Click **Deploy site**. First build takes ~60 seconds. After that, **every push to `main` triggers a redeploy**.

#### Step 5 — Custom domain

1. **Site settings → Domain management → Add custom domain**
2. Add e.g. `brewandsoul.com`
3. Configure DNS at your registrar:
   - **A record:** `75.2.60.5`
   - **CNAME (www):** `your-site.netlify.app`
4. Netlify auto-provisions a free Let's Encrypt SSL cert (~5 min)

### Method 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init      # link the project; pick "Create & configure a new site"
npm run build
netlify deploy --prod --dir=dist
```

Or use the included npm script: `npm run deploy:netlify`

---

## ▲ Deploy to Vercel

### Method 1: Git-based (recommended)

#### Step 1 — Push code to GitHub

(Same as Netlify Step 1 above)

#### Step 2 — Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Project**, select your repo
3. Vercel auto-detects:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### Step 3 — Add environment variables

In the Import screen (or later via **Project Settings → Environment Variables**), add each `VITE_*` value. Pick which environments they apply to (Production / Preview / Development).

#### Step 4 — Deploy

Click **Deploy**. First build takes ~60 seconds.
- Production deploys → on push to `main`
- Preview deploys → automatic on every pull request (with unique URLs)

#### Step 5 — Custom domain

1. **Project Settings → Domains → Add**
2. Enter `brewandsoul.com`
3. Configure DNS at your registrar:
   - Apex domain → `A` record to `76.76.21.21`
   - `www` → `CNAME` to `cname.vercel-dns.com`
4. Vercel auto-issues SSL

### Method 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel              # creates project, deploys preview
vercel --prod       # promote to production
```

Or: `npm run deploy:vercel`

---

## ☁ Deploy to Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create application → Pages → Connect to Git**
2. Pick repo
3. Settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Node version:** `20` (set as env var: `NODE_VERSION=20`)
4. Add env vars under **Settings → Environment variables**
5. Add `_redirects` file is already at `public/_redirects` ✓ (SPA fallback works out of the box)

---

## 📦 Deploy to GitHub Pages

GitHub Pages is **subpath-based** unless using a custom domain. Update Vite config:

```js
// vite.config.js
export default defineConfig({
  base: '/your-repo-name/',  // ← add this if using github.io/repo-name
  // ...
})
```

Then:

```bash
npm install -D gh-pages
# Add to package.json scripts:
#   "deploy:gh": "npm run build && gh-pages -d dist"
npm run deploy:gh
```

In the repo: **Settings → Pages → Source: gh-pages branch**.

> **Note:** Browser History routing (`BrowserRouter`) needs server config to handle deep links. GitHub Pages doesn't support custom rewrites. Either use `HashRouter` instead, or use a custom domain with proper SPA fallback.

---

## 🪣 Deploy to AWS S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Sync to S3 (replace bucket name)
aws s3 sync dist/ s3://your-bucket-name --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html" --exclude "*.xml" --exclude "*.txt"

# 3. Upload index.html with no-cache
aws s3 cp dist/index.html s3://your-bucket-name/index.html \
  --cache-control "public, max-age=0, must-revalidate"

# 4. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

In CloudFront, configure:
- **Default root object:** `index.html`
- **Custom error responses:** `403` and `404` → return `200` with `/index.html` (SPA fallback)

---

## 🔥 Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# - Public dir: dist
# - Single-page app: Yes
# - Set up automatic builds with GitHub: optional
npm run build
firebase deploy --only hosting
```

---

## 🔒 Post-deployment: HTTPS & Security

All providers above issue free SSL certs automatically. Verify:

1. Visit `https://yoursite.com` — should not show certificate warnings
2. Run [Mozilla Observatory](https://observatory.mozilla.org) — should score B+ or better (we ship security headers in `netlify.toml` / `vercel.json`)
3. Run [securityheaders.com](https://securityheaders.com) — same expectation

The shipped headers include:
- `Strict-Transport-Security` — forces HTTPS for 1 year
- `X-Frame-Options: SAMEORIGIN` — clickjacking protection
- `X-Content-Type-Options: nosniff` — MIME sniffing protection
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disables camera/mic/geo by default

---

## 📊 Post-deployment: SEO & Analytics

### Submit sitemap to Google
1. [Google Search Console](https://search.google.com/search-console) → Add property
2. Verify ownership (DNS or HTML tag)
3. **Sitemaps → Add new sitemap** → enter `sitemap.xml`

### Submit to Bing
1. [Bing Webmaster Tools](https://www.bing.com/webmasters) → Add site
2. Sitemaps → Submit `https://yoursite.com/sitemap.xml`

### Verify structured data
Test the JSON-LD `CafeOrCoffeeShop` schema with [Google Rich Results Test](https://search.google.com/test/rich-results). Should show no errors and preview as a local business card.

### Add analytics (optional)

**Plausible (privacy-friendly, no banner needed):**
```html
<!-- Add to index.html before </head> -->
<script defer data-domain="brewandsoul.com" src="https://plausible.io/js/script.js"></script>
```

**Google Analytics 4:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

> If you use GA4 you'll need to update the cookie banner copy to be more explicit about analytics tracking, and only inject the script after consent.

---

## 🧪 Post-deployment Smoke Test

After deploy, run through this checklist on the live URL:

- [ ] Homepage loads without errors (check DevTools console)
- [ ] All 6 routes work: `/`, `/menu`, `/about`, `/gallery`, `/reservations`, `/contact`
- [ ] **Hard reload on a non-root route** (e.g., `/menu`) — should not 404 (SPA fallback works)
- [ ] Mobile drawer opens and links navigate correctly
- [ ] Dark/light mode toggle persists after reload
- [ ] Daily Special popup appears after 3 seconds (clear `sessionStorage` to retest)
- [ ] Cookie banner appears on first visit
- [ ] WhatsApp button opens `wa.me/...` correctly
- [ ] Submit contact form — receive the email at the configured provider
- [ ] Submit reservation — see success screen with booking ID
- [ ] OG preview: paste your URL into [opengraph.xyz](https://www.opengraph.xyz) — verify image, title, description
- [ ] Run **Lighthouse** in Chrome DevTools — Perf 90+, A11y 100, Best Practices 100, SEO 100

---

## 🐛 Troubleshooting

### "404 on page reload"
Your host isn't serving `index.html` for unknown routes. Solutions:
- **Netlify:** ensure `public/_redirects` is committed (it is by default)
- **Vercel:** ensure `vercel.json` has the `rewrites` rule (it does by default)
- **Other hosts:** configure SPA fallback so all routes return `index.html`

### "Environment variable is undefined in production"
- Make sure the var is **prefixed `VITE_`**
- Make sure it's set in the hosting provider's env-var UI (not just locally)
- **Trigger a fresh build** — env vars are baked in at build time, not runtime

### "Images don't load"
- Verify Unsplash URLs are still valid
- Replace with your own — recommended: WebP @ 80% quality, served from your own CDN

### "Build is slow"
- First build downloads ~200 MB of node_modules — subsequent builds use the cache
- Vercel caches automatically; Netlify caches via `netlify.toml` plugin

### "Build succeeds locally but fails in CI"
- Pin Node version in your provider settings (we set `NODE_VERSION = "20"` in `netlify.toml`)
- Run `npm ci` instead of `npm install` in CI for deterministic installs

---

## 📈 Continuous Deployment Tips

- **Branch deploys:** both Netlify and Vercel automatically deploy every PR to a unique preview URL — share with stakeholders before merging
- **Status badges:** add to README:
  - Netlify: `[![Netlify Status](https://api.netlify.com/api/v1/badges/SITE_ID/deploy-status)](https://app.netlify.com/sites/SITE_NAME/deploys)`
  - Vercel: copy from Vercel dashboard
- **Build hooks:** create webhooks for redeploys triggered by CMS updates
- **Notifications:** Netlify and Vercel both support Slack / Discord deploy notifications

---

## 📞 Need help?

- **Netlify docs:** [docs.netlify.com](https://docs.netlify.com)
- **Vercel docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vite deploy guide:** [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy.html)

Happy brewing ☕
