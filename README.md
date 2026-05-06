# ☕ Brew & Soul

> **Premium artisan coffee shop website** — built with React 18, Vite 5, Tailwind CSS 3, and Framer Motion 11.

[![Deploy to Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://app.netlify.com/start)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/new)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete, production-ready café website featuring a hero with animated coffee cup, filterable menu, animated about page with timeline & stats counters, masonry gallery with lightbox, multi-step reservation flow, contact form, dark mode, and a full premium-feature suite.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Design System](#-design-system)
- [Deployment](#-deployment)
  - [Netlify](#netlify)
  - [Vercel](#vercel)
  - [Other static hosts](#other-static-hosts)
- [Bundle Size & Performance](#-bundle-size--performance)
- [Browser Support](#-browser-support)
- [Customization](#-customization)
- [License](#-license)

---

## ✨ Features

| Category | Highlights |
|---|---|
| **Pages** | Home · Menu · About · Gallery · Reservations · Contact |
| **Hero** | Cinematic Ken Burns bg, animated SVG coffee cup with steam, animated typography, scroll indicator |
| **Menu** | Filterable categories (animated `layoutId` tab pill), Chef's Pick, favorites system with burst animation |
| **About** | Vertical timeline (2018→2024), animated stats counters (count-up hook), parallax sections, team cards |
| **Gallery** | Masonry grid + click-to-zoom lightbox with keyboard nav, Instagram feed section |
| **Reservations** | 3-step flow (Details → Confirm → Success) with custom keyboard-accessible date picker, time-slot grid, confetti success screen |
| **Contact** | Validated form, Google Maps embed, social links |
| **Premium features** | Loading screen with filling cup ⋅ Smooth page transitions ⋅ Daily Special popup ⋅ WhatsApp float button ⋅ Cookie consent ⋅ Dark/light mode ⋅ Per-page SEO ⋅ Lazy-loaded images ⋅ Back-to-top with progress ring |
| **Accessibility** | Skip-to-content, focus-visible rings, ARIA grid pattern on date picker, `prefers-reduced-motion`, semantic landmarks, proper labels |
| **Performance** | Code-split vendor chunks, lazy-loaded images via IntersectionObserver, CSS-driven scroll transitions, async font loading |
| **SEO** | Per-page meta tags, OpenGraph + Twitter cards, sitemap.xml, robots.txt, JSON-LD structured data (`CafeOrCoffeeShop` schema) |

---

## 🛠 Tech Stack

- **[React 18](https://react.dev)** — UI library
- **[Vite 5](https://vitejs.dev)** — lightning-fast bundler
- **[Tailwind CSS 3](https://tailwindcss.com)** — utility-first styling, custom design tokens
- **[Framer Motion 11](https://www.framer.com/motion/)** — animations & page transitions
- **[React Router 6](https://reactrouter.com)** — client-side routing
- **[Lucide React](https://lucide.dev)** — icon set
- **Google Fonts** — Playfair Display, Inter, Dancing Script

**No backend required** — fully static, deployable anywhere.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (20 LTS recommended)
- **npm 9+** (or pnpm / yarn)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Copy the env template
cp .env.example .env

# 3. Start the dev server
npm run dev
```

Site opens at **http://localhost:5173** with hot reload.

### Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # serve the prod build locally on :4173
```

---

## 📂 Project Structure

```
brew-and-soul/
├── public/
│   ├── coffee.svg              # favicon (SVG)
│   ├── apple-touch-icon.svg    # iOS home-screen icon
│   ├── og-image.svg            # social share preview (export to PNG before deploy)
│   ├── site.webmanifest        # PWA manifest
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects              # Netlify SPA fallback
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── PageHeader.jsx
│   │   ├── PageWrapper.jsx     # Framer Motion route transitions
│   │   ├── DatePicker.jsx      # Custom keyboard-accessible calendar
│   │   ├── Parallax.jsx        # Reusable parallax bg section
│   │   ├── LazyImage.jsx       # IntersectionObserver lazy-load
│   │   ├── LoadingScreen.jsx   # App-init splash
│   │   ├── DailySpecialPopup.jsx
│   │   ├── WhatsAppButton.jsx
│   │   ├── CookieBanner.jsx
│   │   ├── ScrollToTop.jsx     # With circular progress ring
│   │   └── ThemeToggle.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── About.jsx
│   │   ├── Gallery.jsx
│   │   ├── Reservations.jsx
│   │   └── Contact.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/light mode provider
│   │
│   ├── hooks/
│   │   ├── useSEO.js           # Per-page meta tag manager
│   │   └── useCountUp.js       # Animated number counter
│   │
│   ├── lib/
│   │   └── contactApi.js       # Provider-agnostic form sender
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Tailwind + design system
│
├── index.html                  # Root HTML, meta tags, JSON-LD
├── vite.config.js              # Build config + chunk splitting
├── tailwind.config.js          # Design tokens (colors, fonts)
├── postcss.config.js
├── netlify.toml                # Netlify deployment config
├── vercel.json                 # Vercel deployment config
├── .env.example                # Env var template
├── .gitignore
├── QA-REPORT.md                # Audit report (a11y, perf, design)
├── DEPLOYMENT.md               # Detailed deploy guide
└── README.md
```

---

## 🔐 Environment Variables

All env vars must be **prefixed with `VITE_`** to be exposed to the client bundle.

Copy `.env.example` to `.env` (local) or `.env.production` (deploy), then fill in:

```bash
# Site
VITE_SITE_URL="https://brewandsoul.com"
VITE_SITE_NAME="Brew & Soul"

# Contact form (pick ONE provider — free options listed)
VITE_FORMSPREE_ID=""        # https://formspree.io  (free tier: 50/mo)
VITE_WEB3FORMS_KEY=""       # https://web3forms.com (free tier: 250/mo, no signup)
VITE_CONTACT_API_URL=""     # Your own backend endpoint

# Newsletter & reservations webhooks (optional)
VITE_NEWSLETTER_API_URL=""
VITE_RESERVATIONS_API_URL=""

# Analytics (optional)
VITE_PLAUSIBLE_DOMAIN=""
VITE_GA_ID=""
```

> **Important:** environment variables are bundled into the client JS at **build time**, not runtime. They are visible to anyone who inspects your site. **Never put secrets here** (API keys with write access, DB credentials, etc.) — only public form IDs and analytics tokens.

### How the contact form picks a provider

`src/lib/contactApi.js` checks env vars in order:
1. `VITE_FORMSPREE_ID`     → POSTs to `https://formspree.io/f/{id}`
2. `VITE_WEB3FORMS_KEY`    → POSTs to `https://api.web3forms.com/submit`
3. `VITE_CONTACT_API_URL`  → POSTs to your custom endpoint
4. **Fallback** (none set) → simulated 900ms send (dev-friendly)

### Quick setup with Formspree

1. Go to [formspree.io](https://formspree.io), sign up
2. Create a new form, get your form ID (e.g. `xyzabcde`)
3. Add to `.env`: `VITE_FORMSPREE_ID="xyzabcde"`
4. Done — submissions land in your Formspree dashboard

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev`             | Start dev server with HMR on :5173 |
| `npm run build`           | Production build → `/dist` |
| `npm run preview`         | Serve the prod build locally on :4173 |
| `npm run build:report`    | Build + print bundle size summary |
| `npm run clean`           | Remove `dist/` and Vite cache |
| `npm run deploy:netlify`  | Build + deploy to Netlify (requires Netlify CLI) |
| `npm run deploy:vercel`   | Build + deploy to Vercel (requires Vercel CLI) |

---

## 🎨 Design System

### Color tokens (`tailwind.config.js`)
| Token | Hex | Use |
|---|---|---|
| `coffee-950` | `#1A0F0A` | Darkest dark-mode bg |
| `coffee-900` | `#2A1A14` | Dark sections / nav |
| `coffee-800` | `#3E2723` | Primary dark surfaces |
| `coffee-700` | `#4E342E` | Secondary dark / borders |
| `cream-50`   | `#FFFBF5` | Page background |
| `cream-100`  | `#FAF3E7` | Section bg |
| `gold-500`   | `#C9A961` | Primary accent / CTAs |
| `gold-700`   | `#9A7209` | High-contrast accent text |

### Typography
- **Playfair Display** — serif headlines
- **Inter** — sans body
- **Dancing Script** — italic accent moments

### Component utilities (in `src/index.css`)
- `.btn-primary` · `.btn-secondary` · `.btn-outline` · `.btn-spinner`
- `.card` · `.section` · `.container-px`
- `.eyebrow` · `.heading-xl` · `.heading-lg`
- `.skip-link`

See **[QA-REPORT.md](./QA-REPORT.md)** for the full design language audit.

---

## 🌐 Deployment

> Full step-by-step guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Netlify

#### Option 1: Git integration (recommended)
1. Push your repo to GitHub / GitLab / Bitbucket
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
3. Select your repo. Netlify auto-detects Vite — no config needed (we ship `netlify.toml`)
4. Add environment variables: **Site settings → Environment variables** → add each `VITE_*` from `.env.example`
5. **Deploy site** — done. Every push to `main` redeploys automatically.

#### Option 2: CLI
```bash
npm i -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

#### Option 1: Git integration (recommended)
1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** your repo
3. Framework preset auto-detects as **Vite**
4. Add env vars: **Project Settings → Environment Variables**
5. **Deploy** — done.

#### Option 2: CLI
```bash
npm i -g vercel
vercel login
vercel              # follow prompts, deploys to a preview URL
vercel --prod       # promote to production
```

### Other static hosts

The build output (`/dist`) is **plain static files** — works on:
- **Cloudflare Pages** — `framework: Vite, build: npm run build, output: dist`
- **GitHub Pages** — set Vite `base: '/repo-name/'` in `vite.config.js`
- **AWS S3 + CloudFront** — upload `dist/`, configure error doc → `index.html`
- **Firebase Hosting** — `firebase init hosting`, set public dir to `dist`, single-page app: yes

For any host, **rewrite all routes to `/index.html`** (SPA fallback) so React Router can handle them.

---

## 📦 Bundle Size & Performance

After running `npm run build`:

| Chunk | Raw | Gzipped |
|---|---:|---:|
| `react-dom`   | ~130 kB | ~42 kB |
| `motion`      | ~115 kB | ~38 kB |
| `router`      | ~25 kB  | ~9 kB  |
| `icons` (lucide, tree-shaken) | ~20 kB | ~7 kB |
| `vendor`      | ~10 kB  | ~4 kB  |
| **App code**  | ~95 kB  | ~28 kB |
| **CSS** (Tailwind, purged) | ~28 kB | ~7 kB |
| **Total**     | **~423 kB** | **~135 kB** |

> Numbers are typical for a fresh build. Run `npm run build:report` to see actuals for your tree.

### Optimizations applied
- ✅ **Manual chunk splitting** — react / react-dom / motion / router / icons in their own files for parallel download + better long-term caching
- ✅ **Tree-shaking** — Lucide icons are imported individually (`import { Coffee } from 'lucide-react'`), so only the icons we use ship
- ✅ **Tailwind purge** — only classes actually used end up in the CSS
- ✅ **CSS code splitting** — per-route CSS chunks
- ✅ **Esbuild minification** — fastest minifier, ~identical output to Terser
- ✅ **Dropped `console.log` & `debugger`** — removed in prod via `esbuild.drop`
- ✅ **Hashed filenames** — `[name]-[hash].js` enables `Cache-Control: max-age=31536000, immutable`
- ✅ **Image lazy-loading** — `LazyImage` uses IntersectionObserver with 200px rootMargin
- ✅ **`<img loading="lazy" decoding="async">`** — native browser laziness
- ✅ **No `console` / sourcemaps** in prod build
- ✅ **`preconnect` + `dns-prefetch`** — for Unsplash & Google Fonts
- ✅ **Async font loading** — `display=swap` prevents render blocking
- ✅ **CSS-driven nav transitions** — no JS animations on scroll = 60fps

### Lighthouse expectations
On a typical deploy you should see:
- 🟢 Performance: **90–98**
- 🟢 Accessibility: **100**
- 🟢 Best Practices: **100**
- 🟢 SEO: **100**

The biggest perf variable is the size of Unsplash hero images — replace with your own optimized WebP/AVIF assets to push toward 100.

---

## 🌍 Browser Support

Targets `>0.2%` global browser usage (Browserslist `production` defaults). Tested on:

- ✅ Chrome / Edge 100+
- ✅ Firefox 100+
- ✅ Safari 15+ (iOS & macOS)
- ✅ Samsung Internet 18+

---

## 🔧 Customization

### Change brand info
1. **Site URL & name** → `.env` (`VITE_SITE_URL`, `VITE_SITE_NAME`) and `index.html` (canonical, OG tags)
2. **Colors** → `tailwind.config.js` → `theme.extend.colors`
3. **Fonts** → `index.html` `<link>` and `tailwind.config.js` → `theme.extend.fontFamily`
4. **Logo** → `public/coffee.svg` and `<Coffee>` icon imports in `Navbar.jsx` / `Footer.jsx`
5. **Address / hours** → search `142 Maple` to find all instances; central data lives in `Footer.jsx` and `index.html` JSON-LD
6. **OG image** → replace `public/og-image.svg` and convert to PNG (1200×630) before deploy

### Hook up a real backend
Replace the simulated send in `src/lib/contactApi.js` (it's already provider-agnostic — just set the env var). Same pattern works for Reservations:
```js
// In src/pages/Reservations.jsx → handleConfirm
import { sendContact } from '../lib/contactApi'

const result = await sendContact({
  type: 'reservation',
  ...form,
  date: form.date.toISOString(),
})
if (!result.ok) { /* show error */ }
```

### Replace stock images
All photos are from [Unsplash](https://unsplash.com) (free to use). Search for image URLs in `src/pages/*` and replace with your own. Recommended: convert to **WebP** at 1600px wide, 80% quality.

---

## 📝 License

MIT — feel free to use this as a starting point for your own café, restaurant, or hospitality project.

---

<p align="center">
  Crafted with ❤ and freshly roasted beans by <a href="https://brewandsoul.com">Brew & Soul</a>.
</p>
