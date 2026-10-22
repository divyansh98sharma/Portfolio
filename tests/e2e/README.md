# End-to-end regression suite

Playwright tests that run against the **production build** served the way
GitHub Pages serves it (`static-server.mjs`): generated route pages, `<path>.html`
fallback and a real 404.

```bash
npm ci
npx playwright install --with-deps chromium webkit   # CI uses the mcr.microsoft.com/playwright image instead
npm run build
npm run test:e2e                    # all projects
npm run test:e2e -- --project=desktop-chromium
npx playwright show-report          # after a failure (traces are kept)
```

## Projects
| Project | Viewport | Notes |
|---|---|---|
| `desktop-chromium` | 1440×900 | also runs the 11-width × 2-theme layout matrix |
| `tablet-chromium` | 810×1080, touch | |
| `mobile-chromium` | Pixel 7 | |
| `mobile-webkit` | iPhone 13 | WebKit engine with iPhone metrics — a proxy, **not** real iOS Safari |

## What is covered
- Every route: deep link, refresh, canonical URL, single `h1`; 404; back/forward
- Quick Open: trigger, Ctrl/⌘+K, focus trap, scroll lock, Escape + focus return,
  combobox/listbox semantics, search → navigate, section jumps
- Decision Explorer selection, wrap-around, case-study link
- Chapter Rail visibility, active-section tracking, navigation, compact labels on focus;
  layers-panel active frame
- Name prompt never steals focus; Escape dismisses
- Layout: horizontal overflow and floating-control collisions (11 widths × light/dark)
- Reduced motion and the boot splash
- axe WCAG 2.2 A/AA on every route in light and dark
- Every test fails on app-originated console errors or uncaught exceptions

## Determinism
- All non-local requests (Cloudflare analytics, Firestore) are aborted.
- No fixed sleeps: assertions use Playwright's auto-waiting / `expect.poll`.
- Frames are scrolled into view and awaited at `opacity: 1` before layout or
  contrast checks.
