# 📦 Bundle Size & Performance Report

A breakdown of what ships in the production build, optimizations applied, and Lighthouse expectations.

> Run `npm run build:report` to generate live numbers for your tree.

---

## 📊 Bundle Composition (estimated)

After `npm run build` with the shipped `vite.config.js`:

```
dist/
├── index.html                                        2.1 kB │ gzip:  0.9 kB
├── assets/
│   ├── index-[hash].css                             ~28 kB  │ gzip:  ~7 kB
│   ├── index-[hash].js              (app code)      ~95 kB  │ gzip: ~28 kB
│   ├── react-[hash].js              (~6 kB raw)     ~6 kB   │ gzip:  ~3 kB
│   ├── react-dom-[hash].js          (vendor)       ~130 kB  │ gzip: ~42 kB
│   ├── motion-[hash].js             (framer)       ~115 kB  │ gzip: ~38 kB
│   ├── router-[hash].js             (react-router)  ~25 kB  │ gzip:  ~9 kB
│   ├── icons-[hash].js              (lucide,
│   │                                  tree-shaken)  ~20 kB  │ gzip:  ~7 kB
│   └── vendor-[hash].js             (other deps)    ~10 kB  │ gzip:  ~4 kB
│
├── coffee.svg                                       0.4 kB
├── apple-touch-icon.svg                             1.0 kB
├── og-image.svg                                     2.4 kB
├── site.webmanifest                                 0.6 kB
├── robots.txt                                       0.2 kB
├── sitemap.xml                                      1.4 kB
└── _redirects                                       0.1 kB

────────────────────────────────────────────────────────────
TOTAL JavaScript (all chunks):                  ~423 kB raw
                                                ~135 kB gzipped

TOTAL CSS:                                       ~28 kB raw
                                                  ~7 kB gzipped

TOTAL initial page load (HTML+CSS+critical JS): ~270 kB raw
                                                 ~80 kB gzipped
```

> The "initial page load" excludes the `motion` and `router` chunks if they're loaded after first paint. With our config, all chunks are imported eagerly from `App.jsx`, so they download in parallel — but the browser **caches each chunk independently**, so future page loads are nearly instant.

---

## 🎯 Optimization Strategy

### 1. Manual chunk splitting

Configured in `vite.config.js`:

```js
manualChunks(id) {
  if (id.includes('react-router'))   return 'router'
  if (id.includes('framer-motion'))  return 'motion'
  if (id.includes('lucide-react'))   return 'icons'
  if (id.includes('react-dom'))      return 'react-dom'
  if (id.includes('react'))          return 'react'
  return 'vendor'
}
```

**Why?** Splitting heavy dependencies into their own chunks means:
- Browsers can **download them in parallel** (HTTP/2 multiplexing)
- A bug fix in your app code doesn't invalidate the cache for `motion` or `react-dom`
- Returning visitors only re-download the changed chunks

### 2. Tree-shaking

Lucide icons are imported individually:
```js
import { Coffee, ShoppingBag, X } from 'lucide-react'   // ✓ tree-shaken
// not:
import * as Icons from 'lucide-react'                    // ✗ ships everything
```

Result: only the ~30 icons we use ship, not all 1,400+ in the library.

### 3. CSS optimization

- **Tailwind purge** — `content` config in `tailwind.config.js` scans all source files and only emits the classes actually used
- **CSS code splitting** — Vite emits per-route CSS chunks (`cssCodeSplit: true`)
- **No CSS-in-JS runtime** — all styles compile to static class names, zero runtime cost

### 4. Minification

- **Esbuild** (default) — ~95% as good as Terser, ~10× faster
- **Console statements dropped** in prod (`esbuild.drop: ['console', 'debugger']`)
- **Legal comments stripped** (`legalComments: 'none'`)

### 5. Asset handling

- **Hashed filenames** — `assets/index-Abc123.js` enables `Cache-Control: max-age=31536000, immutable`
- **Inline tiny assets** — files <4 kB are base64-inlined to skip the HTTP roundtrip
- **No source maps in prod** (`sourcemap: false`) — saves ~400 kB and prevents source leakage

### 6. Image strategy

- **Custom `<LazyImage>`** uses `IntersectionObserver` with 200px rootMargin
- Native `loading="lazy"` + `decoding="async"` on every `<img>` and `<iframe>`
- Skeleton placeholders prevent layout shift (CLS)
- **Recommendation:** replace Unsplash URLs with your own optimized WebP/AVIF assets — saves 50-70% on image weight

### 7. Font loading

- `<link rel="preconnect">` to Google Fonts servers (saves ~150ms on first load)
- `display=swap` — text renders in fallback fonts immediately, swaps when web font loads
- 3 weights only per font (not the full library)

### 8. Network performance

- `preconnect` to Unsplash & Google Fonts in `index.html`
- `dns-prefetch` for Google Maps
- All external links use `rel="noopener noreferrer"` (security + performance)

### 9. Runtime performance

- **No JS-driven scroll animations on Navbar** — uses CSS `transition-[]` classes for GPU-composited 60fps changes
- `will-change: transform` on long-running animations (hero bg, parallax, cup)
- `useReducedMotion()` from Framer disables non-essential animations for accessibility
- Page transitions use only `opacity` + `transform` (no `filter: blur` which forces full-screen rasterization)

---

## 📈 Lighthouse Targets

On a typical production deploy via Netlify / Vercel:

| Metric | Score | Notes |
|---|---:|---|
| **Performance**      | 90–98 | Variable based on image sizes / network |
| **Accessibility**    | 100   | Full ARIA, semantic HTML, focus management |
| **Best Practices**   | 100   | HTTPS, secure headers, no console errors |
| **SEO**              | 100   | Meta tags, structured data, mobile-friendly |

### Core Web Vitals targets

| Metric | Target | Typical |
|---|---|---|
| **LCP** (Largest Contentful Paint) | <2.5s | ~1.5–2.0s |
| **INP** (Interaction to Next Paint) | <200ms | ~80–120ms |
| **CLS** (Cumulative Layout Shift) | <0.1 | ~0.02 |
| **FCP** (First Contentful Paint) | <1.8s | ~0.8–1.2s |
| **TBT** (Total Blocking Time) | <200ms | ~50–100ms |

The biggest variable is the LCP element — usually the hero image. Strategies to improve:
1. **Preload the hero image** in `index.html`:
   ```html
   <link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
   ```
2. **Use your own CDN** with WebP/AVIF instead of Unsplash
3. **Compress to <100 kB** at 1920px wide

---

## 🔥 Further Optimizations (if needed)

If you want to squeeze out more performance:

### Route-level code splitting

Currently all 6 pages bundle together (~95 kB). For a **massive** site, you could lazy-load:

```js
import { lazy, Suspense } from 'react'
const Menu = lazy(() => import('./pages/Menu'))

<Suspense fallback={<LoadingScreen />}>
  <Routes>
    <Route path="/menu" element={<Menu />} />
  </Routes>
</Suspense>
```

For our 6-page site this **isn't worth it** — the parallel-download benefit beats the extra HTTP roundtrip on navigation.

### Image CDN

Use [Cloudinary](https://cloudinary.com) or [imgix](https://imgix.com) with on-the-fly format conversion + responsive sizing:

```html
<img
  srcset="https://res.cloudinary.com/x/image/upload/w_400,f_auto/hero.jpg 400w,
          https://res.cloudinary.com/x/image/upload/w_800,f_auto/hero.jpg 800w,
          https://res.cloudinary.com/x/image/upload/w_1600,f_auto/hero.jpg 1600w"
  sizes="100vw"
  src="https://res.cloudinary.com/x/image/upload/w_800,f_auto/hero.jpg"
  alt="Hero"
/>
```

### Pre-rendering / SSG

For absolute best Lighthouse scores, pre-render the static pages:
```bash
npm install -D vite-plugin-prerender-spa
```
This generates a static HTML snapshot of each route — Google sees content instantly, no JS needed.

### Service Worker (PWA)

Add [Workbox](https://web.dev/articles/learn-pwa) or [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for full offline support, install-to-home-screen, and asset precaching.

---

## 🔬 How to verify yourself

```bash
# 1. Build
npm run build

# 2. See the size summary
npm run build:report

# 3. Serve & test
npm run preview

# 4. In another terminal, run Lighthouse
npx lighthouse http://localhost:4173 --view --preset=desktop
npx lighthouse http://localhost:4173 --view --preset=mobile

# 5. Or check bundle composition with:
npx vite-bundle-visualizer
```

For a **deployed** site, run Lighthouse in Chrome DevTools (the "Lighthouse" panel) — it gives more accurate real-world numbers than the local preview.

---

## ✅ Optimization Checklist

| Optimization | Status |
|---|---|
| Manual chunk splitting               | ✅ Configured |
| Tree-shaken icon imports             | ✅ |
| Tailwind purge                       | ✅ |
| CSS code-splitting                   | ✅ |
| Esbuild minification                 | ✅ |
| Drop console.* in prod               | ✅ |
| Hashed asset filenames               | ✅ |
| 1-year cache headers on `/assets/*`  | ✅ (in `netlify.toml`/`vercel.json`) |
| `index.html` no-cache                | ✅ |
| Inline assets <4 kB                  | ✅ |
| Source maps off in prod              | ✅ |
| `preconnect` to image origins        | ✅ |
| Font `display=swap`                  | ✅ |
| `loading="lazy"` on all images       | ✅ |
| `decoding="async"` on all images     | ✅ |
| IntersectionObserver lazy loading    | ✅ (`<LazyImage>`) |
| CSS-driven Navbar transitions        | ✅ (60fps) |
| `prefers-reduced-motion` respected   | ✅ |
| Security headers                     | ✅ (HSTS, X-Frame-Options, etc.) |
| Sitemap.xml                          | ✅ |
| robots.txt                           | ✅ |
| JSON-LD structured data              | ✅ (`CafeOrCoffeeShop`) |
| Service Worker (PWA)                 | ⚪ Optional — not included |
| Image CDN with WebP/AVIF             | ⚪ Recommended for production |
| Route-level lazy loading             | ⚪ Not worth it for 6 pages |

---

**Bottom line:** This bundle is **well within "fast" territory** for a marketing site. Your bottleneck will almost certainly be image weight, not JavaScript.
