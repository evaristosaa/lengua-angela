# Implementation Plan: Angela y el Reino Arcoiris de las Palabras

**Branch**: `001-repasa-lengua-angela` | **Date**: 2026-06-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-repasa-lengua-angela/spec.md`

## Summary

Build a static, GitHub Pages-ready educational web app for 4th grade Spanish Language. The MVP delivers a playable daily mission, a Lengualandia world map, bridge content from 3rd to 4th grade, orthography, grammar, reading comprehension, a unicorn reward system, local progress persistence and a simple parent panel. Later slices add writing, oral expression, literature, final bosses and extra game modes.

## Technical Context

**Language/Version**: TypeScript with modern browser JavaScript  
**Primary Dependencies**: React, Vite, lightweight client routing, local browser storage utilities  
**Storage**: Local browser storage for progress; static JSON files for content; export/import JSON for backup  
**Testing**: Component/unit tests for mission logic, content validation tests, build checks and browser smoke tests  
**Target Platform**: Static web app served from GitHub Pages and usable on tablet, mobile and desktop browsers  
**Project Type**: Frontend-only static web application  
**Performance Goals**: First playable screen visible quickly on ordinary home connections; mission feedback appears immediately after answer selection  
**Constraints**: No mandatory backend, no login required, child data stays local by default, works from a GitHub Pages subpath, supports missing Angela assets with placeholders, supports hard refresh without 404/blank screen  
**Scale/Scope**: MVP covers 4 primary playable worlds, at least 60 activities, 6 reading texts, local progress and parent summary

## GitHub Pages Deployment Requirements

- Use a static-only build: generated `dist/` must contain all app files needed at runtime.
- Use repository-subpath-safe asset URLs.
- Prefer hash-based client navigation for MVP so hard refreshes do not require server rewrites.
- Avoid backend-only APIs, private environment variables and runtime server assumptions.
- Validate production build locally before publishing.
- Validate the public GitHub Pages URL with browser smoke checks after publishing.
- If deployed under a personal Pages repository subfolder, configure the app base path for that folder.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Child-first learning: PASS. MVP is centered on short missions, friendly feedback and visible rewards.
- Static-first delivery: PASS. Plan uses a static app, local storage and static content.
- Parent-visible progress: PASS. Parent panel is included in MVP.
- Safe, private by default: PASS. No accounts or external sharing in MVP.
- Incremental, demonstrable slices: PASS. Tasks will be organized by independently testable user stories.

## Project Structure

### Documentation (this feature)

```text
specs/001-repasa-lengua-angela/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
package.json
vite.config.ts
index.html
.github/
└── workflows/
    └── deploy-pages.yml
public/
├── assets/
│   ├── angela/
│   └── unicornio/
src/
├── App.tsx
├── main.tsx
├── styles/
│   └── app.css
├── components/
│   ├── AngelaGuide.tsx
│   ├── MissionCard.tsx
│   ├── UnicornProgress.tsx
│   └── ParentSummary.tsx
├── data/
│   ├── worlds.json
│   ├── missions.json
│   ├── activities.json
│   └── texts.json
├── domain/
│   ├── progress.ts
│   ├── scoring.ts
│   ├── unlocks.ts
│   └── contentTypes.ts
├── pages/
│   ├── HomePage.tsx
│   ├── MapPage.tsx
│   ├── MissionPage.tsx
│   └── ParentPage.tsx
└── storage/
    ├── localProgress.ts
    └── progressExport.ts
tests/
├── content/
├── domain/
└── smoke/
```

**Structure Decision**: Use one frontend-only app at project root. Keep content in static JSON, learning/reward logic in `src/domain/`, browser persistence in `src/storage/`, reusable UI in `src/components/`, and route-level views in `src/pages/`.

## Complexity Tracking

No constitution violations identified.

## Phase 0: Research

Research decisions are captured in [research.md](research.md).

## Phase 1: Design & Contracts

Design artifacts:

- [data-model.md](data-model.md)
- [contracts/ui-contract.md](contracts/ui-contract.md)
- [quickstart.md](quickstart.md)

## Post-Design Constitution Check

- Child-first learning: PASS. Data model includes missions, feedback and age-appropriate rewards.
- Static-first delivery: PASS. Contracts avoid backend APIs and use local/exportable state.
- Parent-visible progress: PASS. ParentSummary is a first-class entity and UI contract.
- Safe, private by default: PASS. Oral and writing artifacts are local-only.
- Incremental, demonstrable slices: PASS. MVP scope maps to US1-US5 with US6 deferred.
