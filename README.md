# Waqar UL Zafar — Portfolio

A responsive Nuxt 4 portfolio with GSAP entrance and scroll animations, service pricing, technology stack, development process, and email / WhatsApp contact links.

## Development

- `pnpm install`
- `pnpm dev`
- `pnpm typecheck`
- `pnpm exec nuxt generate` — creates the static site in `.output/public`

## Content

Homepage content and contact details: `app/pages/index.vue`.
Styles: `app/assets/css/main.css`.
Portrait: `public/images/waqar-ul-zafar.jpg`.

The project inquiry opens the visitor's email application with the selected service and brief. It does not submit to a backend. Pricing reflects the supplied starting rates; no project history or client metrics have been invented.

GSAP animations respect reduced-motion preferences. Icons and fonts are bundled for static hosting. Hosting configuration is in `.openai/hosting.json`; custom domain DNS is not configured by this project.
