# Acceptable Success Metrics

## Must-have workflows (release gate)

| # | Workflow | Success criteria | Status |
|---|----------|------------------|--------|
| W1 | Home page loads | `/` returns 200; hero, header, footer visible | Pass |
| W2 | Section navigation | Header links scroll to `#hero`, `#about`, `#projects`, `#contact` | Pass |
| W3 | About content | Bio, skills, and experience timeline render from `content/profile.js` | Pass |
| W4 | Project discovery | ≥1 project card; flip/hover works; modal opens with details | Pass |
| W5 | Project deep link | i2c project opens `/portfolio/i2c-assessment` without breaking layout | Pass |
| W6 | Contact form — happy path | Valid POST to `/api/contact` returns `200` + `ok: true` | Pass |
| W7 | Contact form — validation | Invalid payload returns `400` with field errors | Pass |
| W8 | Footer links | CV and WhatsApp open in new tab with `rel="noopener"` | Pass |
| W9 | Production build | `npm run build` completes with no errors | Pass |
| W10 | Lint | `npm run lint` passes | Pass |

## Performance targets (pragmatic, from Design Upgrade)

| Metric | Target | Current approach |
|--------|--------|------------------|
| First Load JS (home) | Reasonable for portfolio | ~138 kB (no Three.js) |
| Mobile usability | Usable without 3D models | CSS-only effects |
| i18n / a11y baseline | English, keyboard + screen reader basics | Partial — modal + form labeled |

## Out of scope (by design — keep simple)

- Full Three.js GLB scenes, shaders, and sound system from reference repo
- Background music and SFX
- Server-side email without `CONTACT_WEBHOOK_URL` configured

## Optional enhancements (not blocking)

- Add `sharp` for faster image optimization in production
- Wire `CONTACT_WEBHOOK_URL` to Formspree, Resend, or Slack
- Replace placeholder GitHub/LinkedIn URLs in `content/profile.js`
- Add real project thumbnails per project
