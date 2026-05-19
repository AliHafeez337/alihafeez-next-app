# 3D models — required for the real portfolio look

Your site is running in **placeholder mode** until these files exist here.

## What you're seeing now

| On screen | What it is |
|-----------|------------|
| Blocky person (sphere head, cylinders) | **Placeholder** — not Mixamo Adam |
| Simple boxes (desk, monitors, plant) | **Placeholder** — not Tiny Office Sketchfab model |
| Weird grid / sunburst on floor | Was a **bug** (lab scene overlapping office) — fixed in code |
| "Ali Hafeez" + nav pills | Real UI — working as designed |

This is **not** the final david-hckh.com-style look. It's the dev scaffold so scroll, camera, and UI work **before** you add GLBs.

## Files to add

| File | Source |
|------|--------|
| `avatar.glb` | [Mixamo](https://www.mixamo.com) → character **Adam** + animations merged in Blender |
| `office.glb` | [Tiny Office](https://sketchfab.com/3d-models/tiny-office-f06968dcfd7a48a3a868c5007fa246d9) → download GLB |
| `contact-props.glb` | [Poly Pizza](https://poly.pizza) — envelopes, parcels, CD, cassette (optional) |
| `contact-room.glb` | Isometric room couch (optional) |

## After adding files

1. Put GLBs in this folder (`public/models/`).
2. Restart `npm run dev`.
3. Open http://localhost:3000/api/models-manifest — you should see `"office": true`, `"avatar": true`, etc.
4. Refresh the page — real models load automatically (no code change).

## Export tips (Mixamo → Blender → GLB)

1. Download Adam + animations from Mixamo as FBX.
2. Import into Blender, merge armature/actions.
3. Export GLB with Draco compression if file is large.
4. Name file exactly `avatar.glb`.

See `Docs/3D Portfolio Transition Plan.md` §17–§18 for full checklist.
