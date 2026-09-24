# RAHUL EDITOR — VIDEO EDITING & CLIENT ACQUISITION PORTFOLIO

> **"I edit stories, not just footage."**  
> Professional Video Editor, Visual Storyteller & Motion Designer.

A modern, cinematic, high-performance video editing portfolio and client acquisition platform built for **Rahul Editor**.

---

## 🌟 Core Specializations

1. **Crime Documentary Editing** (`/work/crime-documentary`)
   - Dark cinematic aesthetic, complex archival assets, evidence dossiers, location maps, timeline reconstruction, and suspense-driven pacing.
2. **Talk Creative Editing** (`/work/talk-creative`)
   - High-retention conversation editing, dynamic punch-ins, kinetic typography, b-roll overlays, pattern interrupts, and podcast audio sweetening.
3. **Motion Graphics** (`/work/motion-graphics`)
   - Title sequences, kinetic type systems, data visualization, animated infographics, lower thirds, and UI motion design.

---

## 🚀 Technology Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Cinematic Editorial Dark Theme)
- **Animations**: Framer Motion & CSS keyframe transitions
- **Video & Media**: Custom responsive HTML5 video player with timeline scrubbing, fullscreen, auto-pause on scroll, and draggable Before/After comparison slider.
- **Persistence**: File-based JSON data layer (`src/data/projects.json`, `src/data/inquiries.json`, `src/data/categories.json`) with direct media upload handling (`public/uploads`).

---

## 🔐 Admin Dashboard (`/admin`)

Rahul can manage his entire portfolio without writing a single line of code.

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Password**: `rahul2026` (Customizable via `ADMIN_PASSWORD` environment variable)

### Admin Features:
- **Project Management**:
  - Add new projects with title, category, description, duration, year, video URL / upload, thumbnail URL / upload, and role tags.
  - Case Study breakdown: Narrative Overview, Editorial Challenge, Executed Solution, Techniques.
  - Before / After media frames for the interactive comparison slider.
  - Live toggling of **Featured** and **Published** status.
  - Edit and Delete projects with instant synchronization.
- **Client Inquiries Viewer** (`/admin/inquiries`):
  - View submissions from the Contact form with contact info, story goals, estimated length, target deadline, budget, reference link, and footage drive link.
  - Update inquiry status (`new`, `in-review`, `contacted`, `archived`).
- **Media Upload**:
  - Upload MP4, WebM, MOV, PNG, JPG, WebP directly to `/public/uploads`.

---

## 🌐 Routes Overview

- `/` — Master Cinematic Homepage (Hero, Philosophy, Specializations, Selected Work, Showreel, Workflow, Services, Toolkit, About Rahul, Inquiry Form)
- `/work` — Dynamic Portfolio with Category Filters and Empty State support
- `/work/crime-documentary` — Dedicated Crime Documentary Category Page
- `/work/talk-creative` — Dedicated Talk Creative Category Page
- `/work/motion-graphics` — Dedicated Motion Graphics Category Page
- `/work/[slug]` — Project Detail Page with cinematic video player, case study breakdown, and Before/After comparison slider
- `/about` — About Rahul with genuine portrait, creative motto, and toolkit
- `/services` — Detailed breakdown of 7 post-production services and client workflow
- `/contact` — Client Inquiry Form and direct contact channels
- `/admin` — Studio Admin Dashboard

---

## ⚡ Starting the Project

### One-Click Launch:
Double-click `f:\mystery\d2\START-RAHUL-EDITOR.bat`.

### Manual Launch:
```bash
cd f:\mystery\d2\rahul-editor
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
