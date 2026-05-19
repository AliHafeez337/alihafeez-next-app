# Ali Hafeez Portfolio 2025 - Design Specification Document

## Project Overview

A single-page 3D portfolio website showcasing Ali Hafeez as a programmer and creative developer. The app features an immersive Three.js environment with smooth scroll-driven animations, interactive 3D objects, and professional project showcases.

---

## Visual Identity

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background Primary | Dark Gray to Black radial gradient | `#323232` → `#000000` | Main background |
| Background Light | Beige Light | `#F5F0E8` | Contact section or accent |
| Background Dark | Beige Dark | `#2D2A24` | Project overlays |
| Text Primary | White | `#FFFFFF` | Main text |
| Text Secondary | Light Gray | `#B0B0B0` | Subheadings, captions |
| Accent | Gold/Amber | `#FFD166` | Hover states, highlights |
| Error/Alert | Crimson | `#E54B4B` | Validation messages |

### Typography

| Role | Font | Weight | Size | Letter Spacing |
|------|------|--------|------|----------------|
| Name Title | Urbanist | 900 | 4rem - 8rem (responsive) | 0.02em |
| Headings | Urbanist | 700 | 2rem - 3rem | 0.02em |
| Body Text | Urbanist | 400 | 1rem | 0.02em |
| Mono Text | Roboto Mono | 400 | 0.85rem | Normal |
| Cursive Accent | Dancing Script | 400 | 1rem | Normal |

### Spacing System

```
--space-xs: 0.25rem
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 1.5rem
--space-xl: 2rem
--space-xxl: 3rem
--space-xxxl: 4rem
```

---

## Page Structure (Single Page)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   HEADER (Sticky with blur effect)                          │
│   "Ali Hafeez - The Programmer"                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   HERO SECTION                                              │
│   - 3D Avatar floating                                       │
│   - Name: "Ali Hafeez" (animated appearing text)            │
│   - Title banner: "Full Stack Developer | 3D Artist"        │
│   - Scroll down indicator                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ABOUT SECTION                                             │
│   - 3D Room scene with interactive objects                  │
│   - Bio text with typing animation                          │
│   - Skills displayed as floating 3D spheres                 │
│   - Experience timeline (horizontal scroll)                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   PROJECTS SECTION                                          │
│   - 3D project cards that flip on hover                     │
│   - Each card shows: thumbnail, title, tags                │
│   - Click opens full project detail overlay                 │
│   - Project detail includes: video, images, tech stack     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   CONTACT SECTION                                           │
│   - 3D contact object (floating envelope or phone)          │
│   - Contact form with particle effect on submit             │
│   - Social links with hover animations                      │
│   - WhatsApp / Skype / Email / GitHub / LinkedIn           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   FOOTER                                                    │
│   - "View my CV" link (opens PDF)                           │
│   - "Let's be friends" WhatsApp link                        │
│   - Copyright or current year                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Section Details

### Header

| Property | Value |
|----------|-------|
| Position | Sticky at top |
| Background | Semi-transparent with blur (backdrop-filter: blur(24px)) |
| Border | Bottom border 1px solid rgba(255,255,255,0.25) |
| Height | Auto, padding 1rem 1.4rem |
| Content | Centered "Ali Hafeez - The Programmer" |
| Font | Roboto Mono |

### Hero Section

| Property | Value |
|----------|-------|
| Height | 100vh |
| Background | Radial gradient or transparent (shows 3D scene) |
| 3D Element | Floating avatar model (GLB) with idle animation |
| Text Animation | GSAP stagger fade-in from bottom |
| Title Banner | Rotated badge (-5deg) with animated underline |
| Scroll Icon | Bouncing arrow SVG |

### About Section

| Property | Value |
|----------|-------|
| Layout | Two columns (3D scene left, text right) |
| 3D Scene | Interactive room with clickable objects |
| Text Animation | Reveal on scroll with typewriter effect |
| Skills | 3D spheres with logos floating in orbit |
| Timeline | Horizontal scroll with GSAP ScrollTrigger |

### Projects Section

| Property | Value |
|----------|-------|
| Layout | Grid (2 or 3 columns responsive) |
| Card Effect | 3D flip on hover (Y-axis rotation) |
| Card Content | Image, title, tech tags, "View Project" button |
| Modal Transition | Scale animation (0.95 → 1) with blur background |
| Project Data | Dynamic import based on route or state |

### Contact Section

| Property | Value |
|----------|-------|
| Layout | Two columns (form left, 3D object right) |
| 3D Object | Floating contact model (envelope or phone) |
| Form Fields | Name, Email, Message |
| Submit Effect | Particle burst + success message |
| Social Icons | SVG icons with hover scale/color change |

### Footer

| Property | Value |
|----------|-------|
| Layout | Horizontal row, centered |
| Links | CV (opens Google Drive PDF), WhatsApp |
| Font Mix | Dancing Script for "and", Roboto Mono for rest |

---

## 3D Scene Specifications

### Scene Setup

| Property | Value |
|----------|-------|
| Renderer | WebGL, alpha false, antialias true |
| Background Color | Matches CSS radial gradient |
| Camera | Perspective (FOV: 38) |
| Controls | Mouse parallax (cursor follows with 0.6 speed) |
| Lighting | Ambient + Directional + Point lights |

### 3D Objects

| Object | File | Interaction |
|--------|------|-------------|
| Avatar | avatar.glb | Idle animation, eye tracking, hologram effect |
| Room | room.glb | Clickable objects (penguin, music player, notes) |
| Lab | lab.glb | Floating particles, electric effects |
| Contact | contact.glb | Rotates on hover, sleeping animation |
| Grid Floor | procedural | Grid with fade effect on scroll |

### Camera Waypoints

| Scene | Position (x,y,z) | Focus (x,y,z) |
|-------|------------------|---------------|
| Hero | (0, 0, 8) | (0, 0, 0) |
| About | (0, -2, 10) | (0, -1, 0) |
| Projects | (0, -5, 12) | (0, -3, 0) |
| Contact | (0, -8, 11) | (0, -6, 0) |

### Shaders to Implement

| Shader | Effect |
|--------|--------|
| hologram.glsl | Scanning lines + glitch on avatar |
| grid-floor.glsl | Animated grid with distance fade |
| fluid.glsl | Background fluid simulation |
| glitch.glsl | Transition effect between sections |

---

## Animation Specifications

### Scroll Animations (GSAP + ScrollTrigger)

| Element | Trigger | Animation |
|---------|---------|-----------|
| Hero title | start: 'top top' | opacity 0→1, y 50→0 |
| About text | start: 'top 80%' | x -50→0, opacity 0→1 |
| Project cards | start: 'top 85%' | scale 0.9→1, stagger 0.1s |
| Contact form | start: 'top 80%' | opacity 0→1, y 30→0 |

### Camera Parallax

| Property | Value |
|----------|-------|
| Intensity | 1.0 |
| Speed | 0.6 |
| Max delta | ±0.5 screen width/height |

### Transition Animations

| Transition | Duration | Easing |
|------------|----------|--------|
| Home to Project | 0.6s | power2.inOut |
| Section to Section | 0.4s | power1.inOut |
| Modal open | 0.3s | back.out(1) |
| Hover on cards | 0.2s | power1.out |

---

## Interactive Features

### Custom Cursor

| State | Appearance |
|-------|------------|
| Default | White circle (size 20px) |
| Hover (link) | Expands to 40px, white outline |
| Hover (3D object) | Changes to pointer with glow |
| Click | Shrinks briefly |

### Sound Effects

| Action | Sound | Volume |
|--------|-------|--------|
| Hover on link | Soft click | 0.2 |
| Click on project | Confirmation | 0.3 |
| Section change | Whoosh | 0.15 |
| Background music | Ambient pads | 0.1 (toggleable) |
| Form submit | Success chime | 0.25 |

### 3D Interactions

| Object | Interaction |
|--------|-------------|
| Room penguin | Click makes it wave |
| Music player | Click toggles background music |
| Notes | Hover reveals message |
| Avatar | Click triggers wave animation |

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | < 700px | Stack sections, reduce 3D complexity, hide some particles |
| Tablet | 700px - 1024px | 2-column layout, reduced shader quality |
| Desktop | > 1024px | Full 3D experience, 3-column project grid |
| Landscape orientation | height < width | Adjust camera positions, reflow content |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Paint | < 1.5s |
| First Contentful Paint | < 2s |
| Time to Interactive | < 3s |
| 3D Scene FPS | 60fps on desktop, 30fps on mobile |
| Total bundle size | < 2MB (without models) |
| Models loading | Lazy load when section enters viewport |

---

## Technology Stack Summary

| Category | Technology |
|----------|------------|
| Framework | Next.js 14+ |
| Language | JavaScript (ES2020+) |
| 3D | Three.js + React Three Fiber (optional) |
| Animations | GSAP + ScrollTrigger + Lenis |
| Styling | CSS Modules + SCSS |
| Sounds | Howler.js |
| State | Zustand or Context API |
| Forms | React Hook Form |
| 3D Models | GLB/GLTF with Draco compression |

---

## File Structure for Implementation

```
portfolio/
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── components/
│   ├── Layout.jsx
│   ├── ThreeCanvas.jsx
│   ├── Preloader.jsx
│   ├── Cursor.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ScrollIcon.jsx
│   └── sections/
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Projects.jsx
│       └── Contact.jsx
├── lib/
│   ├── three/
│   │   ├── index.js
│   │   ├── core/
│   │   │   ├── scene.js
│   │   │   ├── camera.js
│   │   │   └── renderer.js
│   │   ├── objects/
│   │   │   ├── avatar.js
│   │   │   ├── room.js
│   │   │   ├── lab.js
│   │   │   └── contact.js
│   │   └── shaders/
│   ├── animations/
│   │   ├── index.js
│   │   └── waypoints.js
│   └── utils/
│       ├── EventEmitter.js
│       └── resources.js
├── hooks/
│   ├── useThree.js
│   ├── useScroll.js
│   ├── usePreloader.js
│   └── useSounds.js
├── context/
│   ├── ThreeContext.js
│   └── PreloaderContext.js
├── public/
│   ├── models/
│   ├── textures/
│   ├── sounds/
│   └── videos/
├── styles/
│   ├── globals.scss
│   ├── variables.scss
│   └── preloader.scss
└── content/
    └── projects.js
```

---

## Next Steps

1. **Set up the foundation** - Install dependencies, configure Next.js
2. **Create the 3D scene** - Basic Three.js setup with camera and renderer
3. **Build the UI components** - Header, Footer, sections without 3D
4. **Integrate GSAP scroll** - Lenis + ScrollTrigger
5. **Add 3D objects** - Avatar, room, lab, contact
6. **Implement interactions** - Raycaster, hover effects, clicks
7. **Add sounds** - Background music, SFX
8. **Polish and optimize** - Performance, responsive, deployment
