# User Journey — Ali Hafeez Portfolio

## Personas

| Persona | Goal |
|---------|------|
| Recruiter / hiring manager | Quickly assess skills, view CV, contact candidate |
| Fellow developer | Explore projects and collaboration channels |
| Friend / network | Reach out via WhatsApp or social links |

## Primary journey: discover and contact

```mermaid
flowchart TD
  A[Land on homepage /] --> B[Hero: name, tagline, portrait]
  B --> C{Scroll or use nav}
  C --> D[About: bio, skills, experience timeline]
  C --> E[Projects: browse cards]
  E --> F[Click card → modal with details]
  F --> G{Open project?}
  G -->|i2c sample| H[/portfolio/i2c-assessment]
  G -->|Other| I[Stay or go to Contact]
  C --> J[Contact: fill form or use social links]
  J --> K[Submit form → API validation → success message]
  B --> L[Footer: CV PDF or WhatsApp]
```

### Step-by-step

1. **Arrival** — User opens the site. Sticky header shows branding and section links (Home, About, Projects, Contact).
2. **Hero** — Full-viewport introduction with animated name, role banner, and portrait with hologram-style frame. Scroll indicator links to About.
3. **About** — User reads bio, scans skill tags, and scrolls the horizontal experience timeline.
4. **Projects** — User hovers cards (3D flip on desktop) and opens a modal for overview and stack. Can navigate to the i2c assessment demo page.
5. **Contact** — User submits name, email, and message; sees validation errors or success feedback. Alternatively uses GitHub, LinkedIn, WhatsApp, or email links.
6. **Footer (any time)** — User opens CV on Google Drive or starts a WhatsApp chat.

## Secondary journey: i2c assessment demo

1. From **Projects** modal, user clicks **Open project** on *i2c Assessment UI*.
2. User lands on `/portfolio/i2c-assessment` with the legacy multi-section layout (unchanged).
3. User uses browser back or site URL to return to the main portfolio.

## Mobile journey differences

- Custom cursor is disabled; native touch interactions apply.
- Sections stack vertically; project grid becomes single column.
- Timeline scrolls horizontally with touch.

## Accessibility notes

- Semantic sections with `id` anchors for in-page navigation.
- Form fields expose `aria-invalid` and error messages.
- Project modal supports Escape to close and click-outside dismiss.
