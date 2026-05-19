# 3D Portfolio — Progress & Handoff Document

**Project:** Ali Hafeez Next.js Portfolio (`alihafeez-next-app`)  
**Reference inspiration:** [davidhckh/portfolio-2025](https://github.com/davidhckh/portfolio-2025) / david-hckh.com  
**Last updated:** May 2026  
**Status:** **Paused** — code scaffold in place; **3D art assets not added** (blocked on download/size/Blender workflow)

---

## 1. How we started

### Original app (before redesign)

| Item | Detail |
|------|--------|
| Stack | Next.js 13.4.9, React 18, CSS Modules |
| Home page | Single centered **photo** (`MAS_5458-nbg1.png`) |
| Layout | Header “Ali Hafeez - The Programmer”, footer CV + WhatsApp |
| Extra route | `/portfolio/i2c-assessment` (legacy sample page, still works) |
| Docs | `Docs/Project Description.md`, `Docs/Files.txt` |

### What you asked for

1. Redesign using **`Docs/Design Upgrade.md`** (based on the reference 3D portfolio).
2. Follow project docs, user journey, success metrics, production safety, keep it simple where possible.
3. QA + final **markdown reports** (done earlier for v1 CSS upgrade).
4. After screenshots (dh1–dh9), you wanted the **full fun experience**: preloader → office + waving character → scroll transitions → scan/about → projects → contact with sleeping character.
5. **“150%”** of the reference — same flow, your content, Ali-specific touches.
6. **No photo** — cartoon 3D only; assets from free sources (Mixamo Adam, Sketchfab Tiny Office, Poly Pizza props).

### Planning phase (completed)

| Document | Purpose |
|----------|---------|
| `Docs/Design Upgrade.md` | Original spec (colors, sections, shaders, file structure) |
| `Docs/3D Portfolio Transition Plan.md` | Full blueprint: screenshots → features, phases 0–6, asset choices, `/Me` content |
| `Docs/User Journey.md` | How visitors use the site |
| `Docs/Success Metrics.md` | Release checklist |
| `Docs/Implementation Report.md` | QA for first CSS-based upgrade |

**Locked asset choices (your decision):**

| Asset | Source |
|-------|--------|
| Character | **Adam** on [Mixamo](https://www.mixamo.com) |
| Office | [Tiny Office](https://sketchfab.com/3d-models/tiny-office-f06968dcfd7a48a3a868c5007fa246d9) (Studio Ochi) |
| Contact props | [Poly Pizza](https://poly.pizza) — envelopes, parcels, CD, cassette |
| Optional couch | [Isometric home office](https://sketchfab.com/3d-models/isometric-room-artists-home-office-roomstudy-67ec2f52c45a4b5f95690c04887e31b0) |

**Content source:** `/Me` folder (gitignored) → distilled into `content/profile.js` and `content/projects.js`.

---

## 2. Where we are now

### What is built (code — Phase 0–1, partial)

The home page is no longer a static photo. It is a **3D experience shell**:

```
pages/index.js  →  ExperiencePage (client-only, no SSR)
├── Preloader (cream, logo, progress %)
├── WebGL Canvas (Three.js + React Three Fiber)
│   ├── Office scene (GLB or placeholder)
│   ├── Lab / scan scene (scroll-driven)
│   ├── Contact scene (props GLB or placeholder)
│   ├── Cartoon / Adam avatar (GLB or placeholder)
│   └── Camera + mouse parallax + scroll waypoints
├── UI chrome (ABOUT / PROJECTS / CONTACT, GET IN TOUCH, sound toggle)
├── HTML overlays (name, tooltips, project grid, contact form)
└── Tall scroll track (~500vh) driving GSAP + Lenis
```

**API routes:**

| Route | Purpose |
|-------|---------|
| `/api/contact` | Validated contact form (unchanged) |
| `/api/models-manifest` | Checks which GLBs exist on disk — **avoids 404s** on missing files |

**Dependencies added:**

| Package | Role |
|---------|------|
| `three`, `@react-three/fiber`, `@react-three/drei` | 3D rendering |
| `gsap`, `lenis` | Scroll + animation (already had gsap/lenis from v1) |
| `zustand` | Experience state |
| `howler` | Installed; sound not wired yet |
| `sass` | Styles |

### What you see in the browser today

Because **`public/models/` has no `.glb` files** (only README + ATTRIBUTION):

| Visual | Reality |
|--------|---------|
| Blocky person at desk | `CartoonAvatarPlaceholder.jsx` — primitives, not Adam |
| Box desk / monitors / plant | `OfficePlaceholder.jsx` — primitives, not Tiny Office |
| “Ali Hafeez” + nav | Real UI — working |
| Scroll / sections | Working (rough compared to reference) |

This is **intentional fallback**, not the final art pass.

### Phases not done yet

| Phase | From plan | Status |
|-------|-----------|--------|
| 0 Foundation | Canvas, preloader, deps | **Done** |
| 1 Hero office + wave | Real GLB + parallax | **Code done; assets missing** |
| 2 Chair spin, stand, walk | Scroll choreography | **Not started** |
| 3 Hologram scan shader | About tooltips polish | **Partial** (basic lab + tooltips) |
| 4 Projects panel | dh9 grid | **Basic overlay done** |
| 5 Contact sleep/wake | dh5 beat | **Partial** |
| 6 Sound, easter eggs, mobile polish | 150% extras | **Not started** |

---

## 3. The blocker (why work paused)

### Mixamo download reality

You discovered:

- Mixamo exports **FBX**, not GLB.
- Each download can be **~84 MB** per file.
- The plan suggested **8–9 files** (1 character + 7 animations) → **hundreds of MB** and heavy merge work.
- Converting to one `avatar.glb` requires **Blender** (or similar) — not a one-click online step for *multiple* animations reliably.

### Why we did not use “just download GLB from Mixamo”

Mixamo’s download dialog (Format: FBX Binary, Pose: T-pose / Original) does **not** list `.glb`. The pipeline is:

```
Mixamo (FBX)  →  Blender (merge animations)  →  Export GLB  →  public/models/avatar.glb
```

### Sketchfab office

- **Tiny Office** may offer **GLB directly** from Sketchfab (often much smaller than 8× Mixamo FBXs).
- This is the **easiest win** when you resume: one file → `public/models/office.glb` → room upgrades immediately.

### Time / effort honest estimate

| Task | Effort |
|------|--------|
| Download + merge Adam animations in Blender | 2–4 hours first time (learning curve) |
| Download Tiny Office GLB | 15–30 minutes |
| Poly Pizza props (optional) | 30–60 minutes |
| Code phases 2–6 | 2–3 weeks dev time |

**Conclusion:** Asset pipeline is a **separate project** from the code already written. Pausing is reasonable.

---

## 4. Lighter alternatives (when you resume)

You asked for online options — no Blender if possible.

| Approach | Blender? | Quality vs reference | Notes |
|----------|----------|----------------------|-------|
| **A. Sketchfab office only** | No | Room improves a lot | Download GLB → `office.glb`. Keep placeholder character for now. |
| **B. Ready Player Me** | No | Medium | [readyplayer.me](https://readyplayer.me) → export single GLB avatar; fewer cinematic animations. |
| **C. Mixamo: character only (1 FBX)** | Yes for GLB | Low animation | One T-pose FBX → online FBX→GLB converter → static or single idle only. |
| **D. Hire / Fiverr** | No for you | High | Send plan doc; get back `avatar.glb` + `office.glb`. |
| **E. Spline** | No | Medium | Design scene in Spline, export GLB (limited rig). |
| **F. Keep placeholders longer** | No | Low | Ship structure + content; upgrade art later. |

**Online FBX → GLB converters** (single file only — **not** good for merging 8 animations):

- [https://products.aspose.app/3d/conversion/fbx-to-glb](https://products.aspose.app/3d/conversion/fbx-to-glb)
- [https://www.greentoken.de/onlineconv/fbx2glb/](https://www.greentoken.de/onlineconv/fbx2glb/) (examples — verify trust/size limits)

**Recommendation when you have 30 minutes:** do **A (office GLB only)** first — biggest visual jump, zero Blender.

**Recommendation when you have budget/time:** **D (freelancer)** or learn Blender once for **one** merged `avatar.glb`.

---

## 5. Installation & run (for you or future dev)

### Prerequisites

| Tool | Version | Required for |
|------|---------|--------------|
| Node.js | 18+ | Run Next.js |
| npm | comes with Node | Install deps |
| Git | any | Clone repo |
| Blender | 3.x | **Only** for Mixamo → merged GLB (optional) |

### First-time project setup

```bash
cd d:\Projects\Portfolio\alihafeez-next-app
npm install
cp .env.example .env.local   # optional: CONTACT_WEBHOOK_URL
npm run dev
```

Open: http://localhost:3000

### Useful URLs

| URL | Expected |
|-----|----------|
| http://localhost:3000 | 3D experience (placeholders if no GLBs) |
| http://localhost:3000/api/models-manifest | `{"avatar":false,"office":false,...}` until files added |
| http://localhost:3000/portfolio/i2c-assessment | Legacy page (unchanged) |

### Production build

```bash
npm run build
npm run start
```

### Deploy (e.g. Vercel)

1. Push to GitHub (note: `/Me` is in `.gitignore` — private CV stays local).
2. Import repo on Vercel.
3. Add env `CONTACT_WEBHOOK_URL` if using contact delivery.
4. Deploy — WebGL works on Vercel; API routes work.

**Do not commit** huge `.glb` files without checking repo limits; use Git LFS or host models on CDN later if files are >100 MB total.

---

## 6. Project structure (3D-related)

```
components/experience/
  ExperiencePage.jsx       # Main page wrapper
  ExperienceCanvas.jsx     # R3F Canvas
  ExperienceRoot.jsx       # Scenes + lights
  Preloader.jsx
  UIChrome.jsx
  CameraRig.jsx
  Avatar.jsx
  CartoonAvatarPlaceholder.jsx
  scenes/
    OfficeScene.jsx
    OfficePlaceholder.jsx
    LabScene.jsx
    ContactScene.jsx
    ContactPropsPlaceholder.jsx
  overlays/                # Hero, About, Projects, Contact HTML

store/useExperienceStore.js
hooks/useModelsManifest.js
hooks/useScrollExperience.js
hooks/useMouseParallax.js
lib/three/waypoints.js
pages/api/models-manifest.js
content/profile.js
content/projects.js
public/models/             # ← DROP GLBs HERE
  README.md
  ATTRIBUTION.md
```

**Legacy (still present, not used on home):**

```
components/portfolio/      # First CSS-only upgrade (superseded on index)
components/layouts/        # Used only by i2c-assessment route
```

---

## 7. Adding models later (checklist)

### Minimum (big visual improvement)

- [ ] Download **Tiny Office** as GLB from Sketchfab  
- [ ] Save as `public/models/office.glb`  
- [ ] Restart dev server  
- [ ] Confirm http://localhost:3000/api/models-manifest → `"office": true`  
- [ ] Refresh site — placeholder room replaced  

### Full character (harder path)

- [ ] Mixamo: Adam T-pose → 1× FBX (or use Ready Player Me → 1× GLB)  
- [ ] Mixamo: download only **3–4 key** animations (not all 8) to save space: Waving, Idle, Walking, Sleeping  
- [ ] Blender: merge → export **one** `avatar.glb` (target &lt; 5–15 MB with Draco)  
- [ ] Or: hire someone on Fiverr with link to this doc  
- [ ] Save as `public/models/avatar.glb`  
- [ ] Update `public/models/ATTRIBUTION.md`  

### Optional polish

- [ ] `contact-props.glb` from Poly Pizza  
- [ ] `contact-room.glb` (couch) from isometric Sketchfab room  

---

## 8. T-pose vs Original (Mixamo) — reminder

| Pose | Meaning |
|------|---------|
| **T-pose** | Arms out — standard for rigging and merging animations. **Prefer this.** |
| **Original** | Mixamo’s relaxed default pose — can work but trickier when combining clips. |

Mixamo does **not** export GLB; always **FBX → (Blender) → GLB** for this project.

---

## 9. Issues we fixed along the way

| Issue | Fix |
|-------|-----|
| 404 on `/models/*.glb` | `/api/models-manifest` + only load GLB if file exists |
| Ugly floor grid on hero | Lab scene was overlapping office on scroll — fixed scene visibility ranges |
| ABOUT nav lit on hero | Nav highlight only for matching section |
| Placeholder too crude | Improved `OfficePlaceholder` + `CartoonAvatarPlaceholder` (still not final art) |
| Wrong GitHub/LinkedIn in profile | Updated from `/Me` docs to `alihafeez337` |

---

## 10. Related documents (read in order)

| Order | File |
|-------|------|
| 1 | `Docs/3D Portfolio Transition Plan.md` — master plan & phases |
| 2 | **`Docs/3D Portfolio Progress.md`** — this file (status & handoff) |
| 3 | `Docs/User Journey.md` — flows (may need update after 3D complete) |
| 4 | `Docs/Success Metrics.md` — acceptance tests |
| 5 | `Docs/Implementation Report.md` — first CSS upgrade QA |
| 6 | `public/models/README.md` — quick “where to put GLBs” |

---

## 11. Resume work — suggested order

When you return:

1. **Read this doc** + §7 checklist above.  
2. **Quick win:** add `office.glb` only (no Blender).  
3. **Test** manifest API + hero scene.  
4. Decide character path: Ready Player Me **or** Blender merge **or** freelancer.  
5. Continue code from **Phase 2** in Transition Plan (scroll transitions).  
6. Update `Docs/Implementation Report.md` after each phase gate.

---

## 12. Summary in one paragraph

We evolved your photo-only Next.js portfolio into a **scroll-driven 3D experience framework** matching the reference site’s *behavior* (preloader, office hero, about scan, projects, contact), with your real profile data from `/Me`. The **code runs** with procedural placeholders because **no GLB models were added** — and the planned Mixamo pipeline (many large FBX files + Blender) turned out to be too heavy for a quick side task. Work is **paused at a sensible point**: infrastructure and UI are in place; **art production** is a follow-up task. Start with **one Sketchfab GLB for the office** when you have 30 minutes; tackle **Adam** when you have time, budget, or Blender help.

---

*Paused by team decision — not abandoned. The site at localhost is the scaffold, not the final look.*
