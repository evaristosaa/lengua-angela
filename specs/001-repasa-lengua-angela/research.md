# Research: Angela y el Reino Arcoiris de las Palabras

## Decision: Static web app for GitHub Pages

**Rationale**: The user explicitly requires GitHub Pages publication. A static web app avoids backend hosting, accounts, deployment complexity and privacy risk for a child-focused MVP.

**Alternatives considered**:

- Backend app: rejected for MVP because it complicates deployment and child data handling.
- Native mobile app: rejected because it slows iteration and publication.
- Server-rendered app: rejected because GitHub Pages cannot host server execution.

## Decision: Hash-based routing for MVP

**Rationale**: GitHub Pages serves static files and does not provide SPA route rewrites by default. Hash-based navigation keeps Home, Map, Mission and Parent views refresh-safe from a repository subpath without extra 404 routing work.

**Alternatives considered**:

- Browser history routing with a copied 404 fallback: acceptable later, but easier to misconfigure.
- Multi-page static files: rejected because it complicates shared app state and mission flow.

## Decision: Local-first progress

**Rationale**: Local storage keeps the MVP private, simple and offline-friendly after load. Export/import provides a safety valve for backups or moving devices.

**Alternatives considered**:

- Cloud sync: useful later, but requires accounts and privacy decisions.
- Google Sheets or Apps Script: possible, but unnecessary for a child learning MVP and not private by default.

## Decision: Static JSON content bank

**Rationale**: Content must grow quickly across worlds and skills. Static JSON lets Codex CLI/Superpowers add activities without touching UI logic.

**Alternatives considered**:

- Hardcoded activities in components: rejected because it mixes content and code.
- External CMS: rejected for MVP because it adds infrastructure.

## Decision: MVP starts with four playable worlds

**Rationale**: Puente 3 a 4, Ortografia, Gramatica and Comprension Lectora deliver the core educational value and enough variety for first testing.

**Alternatives considered**:

- Build all worlds first: rejected because it delays a playable slice.
- Build only orthography first: rejected because it would not represent the full app promise.

## Decision: Placeholders for Angela and unicorn assets

**Rationale**: Angela comic images will arrive later. The app should progress using named placeholders so assets can be swapped without changing interaction flow.

**Alternatives considered**:

- Wait for final images: rejected because it blocks planning and early implementation.
- Use generic stock art: rejected because Angela as protagonist is part of the product identity.

## Decision: Manual fallback for oral expression

**Rationale**: Browser recording support and permissions vary. Oral expression must remain usable with a self-check checklist.

**Alternatives considered**:

- Require microphone permission: rejected because it can break the flow and create privacy friction.
- Omit oral mode: rejected because 4th grade Lengua includes oral expression.
