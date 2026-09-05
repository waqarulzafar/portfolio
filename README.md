# Waqar UL Zafar — Portfolio

A responsive Nuxt 4 portfolio with GSAP entrance and scroll animations, service pricing, technology stack, development process, and email / WhatsApp contact links.

## Development

- `pnpm install`
- `pnpm dev`
- `pnpm typecheck`
- `pnpm generate` — generates and verifies the static site in `.output/public`

## Content

Homepage content and contact details: `app/pages/index.vue`.
Styles: `app/assets/css/main.css`.
Portrait: `public/images/waqar-ul-zafar.jpg`.

The project inquiry opens the visitor's email application with the selected service and brief. It does not submit to a backend. Pricing reflects the supplied starting rates; no project history or client metrics have been invented.

GSAP animations respect reduced-motion preferences. Icons and fonts are bundled for static hosting. Hosting configuration is in `.openai/hosting.json`; custom domain DNS is not configured by this project.

## Static deployment

Run `pnpm generate`, then upload the entire contents of `.output/public` to the web root, including `images/`, `_nuxt/`, and payload files. Deploy HTML and assets from the same build together. For deployments built from Git, commit the project images as well as the source code; the generation check rejects untracked image assets.

Cloudflare Email Address Obfuscation rewrites email links and inserts elements into the generated HTML, which conflicts with Vue hydration. The prerender hook wraps the body in Cloudflare's `email_off` comments, outside the Nuxt root, to preserve the original markup. Alternatively, disable Email Address Obfuscation for this hostname in Cloudflare Security Settings.

After deploying, purge cached HTML and any cached missing-image responses in Cloudflare. Verify `/images/projects/restaurant-pos.png` returns HTTP 200 and reload the page to check the browser console. Local generation cannot verify the origin upload or Cloudflare cache state.

## Google Analytics consent

The global custom banner uses basic Google Consent Mode v2. All four consent values start denied. Google Analytics loads only after acceptance; advertising consent stays denied. The device stores the choice for 180 days. Analytics settings at the bottom of the page lets visitors withdraw consent, which disables analytics, clears GA cookies, and reloads to remove the running tag. If storage is unavailable, the choice lasts only for the visit.

This banner controls Google Analytics only. HubSpot retains its own cookie and chat consent configuration. After deployment, select “I use a custom consent banner” in Google Analytics and use Tag Assistant to verify default and updated consent signals. No Google Analytics account settings are changed by this code.

Run `node scripts/test-google-consent.mjs` to check consent ordering, loader gating, persistence, expiry, withdrawal, and blocked storage behavior.
