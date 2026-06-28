# Tasks: Angela y el Reino Arcoiris de las Palabras

**Input**: Design documents from `specs/001-repasa-lengua-angela/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Tests**: Include validation tasks for content, build and browser smoke checks because the quickstart and success criteria require them.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the static web app structure for GitHub Pages delivery.

- [X] T001 Create React/Vite TypeScript project files in `package.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, and `src/App.tsx`
- [X] T002 Configure GitHub Pages-compatible base path handling in `vite.config.ts`
- [X] T003 Configure hash-based navigation strategy for GitHub Pages hard-refresh safety in `src/App.tsx`
- [X] T004 [P] Create global responsive styling foundation in `src/styles/app.css`
- [X] T005 [P] Create public asset folders in `public/assets/angela/` and `public/assets/unicornio/`
- [X] T006 [P] Create documentation note for asset naming in `docs/assets.md`
- [X] T007 Configure lint/build/test scripts in `package.json`
- [X] T008 Create smoke test placeholder structure in `tests/smoke/`
- [X] T009 Create GitHub Pages deployment workflow skeleton in `.github/workflows/deploy-pages.yml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core content, state and navigation foundations that all user stories depend on.

**CRITICAL**: No user story work should begin until this phase is complete.

- [X] T010 Create domain type definitions for worlds, missions, activities, rewards and progress in `src/domain/contentTypes.ts`
- [X] T011 Create static worlds seed for all Lengualandia worlds in `src/data/worlds.json`
- [X] T012 Create initial mission seed structure in `src/data/missions.json`
- [X] T013 Create initial reading text seed structure in `src/data/texts.json`
- [X] T014 Create initial activity seed structure in `src/data/activities.json`
- [X] T015 Implement local progress model helpers in `src/domain/progress.ts`
- [X] T016 Implement scoring and feedback rules in `src/domain/scoring.ts`
- [X] T017 Implement world and reward unlock rules in `src/domain/unlocks.ts`
- [X] T018 Implement local progress persistence in `src/storage/localProgress.ts`
- [X] T019 Implement progress export/import helpers in `src/storage/progressExport.ts`
- [X] T020 [P] Create reusable Angela guide component with placeholder states in `src/components/AngelaGuide.tsx`
- [X] T021 [P] Create reusable unicorn progress component in `src/components/UnicornProgress.tsx`
- [X] T022 [P] Create reusable mission card component in `src/components/MissionCard.tsx`
- [X] T023 Create simple client navigation shell in `src/App.tsx`
- [X] T024 Create content validation script or test for JSON referential integrity in `tests/content/content-validation.test.ts`
- [X] T025 Verify foundational content validation passes for worlds, missions, activities and texts

**Checkpoint**: Foundation ready. User story implementation can now start.

---

## Phase 3: User Story 1 - Mision diaria con recompensa del unicornio (Priority: P1) MVP

**Goal**: Angela can complete a daily mission and unlock a visible unicorn reward.

**Independent Test**: Start a new profile, complete one Puente 3 a 4 daily mission, reload, and verify completed mission plus unicorn reward remain visible.

### Implementation for User Story 1

- [X] T026 [US1] Create home page with product title, story intro and primary daily mission action in `src/pages/HomePage.tsx`
- [X] T027 [US1] Create mission player page for sequential activities in `src/pages/MissionPage.tsx`
- [X] T028 [US1] Add one complete Puente 3 a 4 daily mission to `src/data/missions.json`
- [X] T029 [US1] Add at least 12 Puente 3 a 4 activities to `src/data/activities.json`
- [X] T030 [US1] Add at least 1 short reading text for the daily mission in `src/data/texts.json`
- [X] T031 [US1] Implement answer selection and immediate feedback flow in `src/pages/MissionPage.tsx`
- [X] T032 [US1] Persist mission attempts and completion through `src/storage/localProgress.ts`
- [X] T033 [US1] Unlock first unicorn reward when daily mission completes using `src/domain/unlocks.ts`
- [X] T034 [US1] Show Angela celebration placeholder and reward summary after completion in `src/pages/MissionPage.tsx`
- [X] T035 [US1] Add browser smoke test for first daily mission completion in `tests/smoke/daily-mission.spec.ts`
- [X] T036 [US1] Validate US1 against quickstart steps 1-9 in `specs/001-repasa-lengua-angela/quickstart.md`

**Checkpoint**: User Story 1 is fully playable and independently demonstrable.

---

## Phase 4: User Story 2 - Mapa de mundos y progresion de contenidos (Priority: P2)

**Goal**: Angela can explore Lengualandia, see locked/unlocked worlds and understand the next recommended mission.

**Independent Test**: Open the map after US1, verify Puente progress, reward state, locked explanations and recommended next world.

### Implementation for User Story 2

- [X] T037 [US2] Create map page in `src/pages/MapPage.tsx`
- [X] T038 [US2] Render all worlds from `src/data/worlds.json` with status, theme and reward part in `src/pages/MapPage.tsx`
- [X] T039 [US2] Add unlock explanation behavior for locked worlds in `src/pages/MapPage.tsx`
- [X] T040 [US2] Highlight next recommended world using progress helpers in `src/domain/progress.ts`
- [X] T041 [US2] Link available world missions to the mission player in `src/App.tsx`
- [X] T042 [US2] Add visual reward summary per world through `src/components/UnicornProgress.tsx`
- [X] T043 [US2] Add browser smoke test for map progression and locked-world explanation in `tests/smoke/map-progression.spec.ts`
- [X] T044 [US2] Validate US2 acceptance scenarios from `specs/001-repasa-lengua-angela/spec.md`

**Checkpoint**: Map and progression are demonstrable without requiring later worlds to be fully playable.

---

## Phase 5: User Story 3 - Banco de actividades de Lengua de 4 de Primaria (Priority: P3)

**Goal**: Angela can practice MVP content across comprehension, grammar and orthography with useful feedback and skill tracking.

**Independent Test**: Complete activities from each MVP world and verify feedback, skill mastery and repeated-error prioritization.

### Implementation for User Story 3

- [X] T045 [P] [US3] Add at least 16 orthography activities to `src/data/activities.json`
- [X] T046 [P] [US3] Add at least 16 grammar activities to `src/data/activities.json`
- [X] T047 [P] [US3] Add at least 16 reading comprehension activities to `src/data/activities.json`
- [X] T048 [P] [US3] Add at least 5 additional age-appropriate reading texts to `src/data/texts.json`
- [X] T049 [US3] Add orthography missions for Torre de la Ortografia in `src/data/missions.json`
- [X] T050 [US3] Add grammar missions for Castillo de la Gramatica in `src/data/missions.json`
- [X] T051 [US3] Add comprehension missions for Valle de la Comprension Lectora in `src/data/missions.json`
- [X] T052 [US3] Extend scoring to update SkillMastery by skill in `src/domain/scoring.ts`
- [X] T053 [US3] Add repeated-error recommendation logic in `src/domain/progress.ts`
- [X] T054 [US3] Render feedback explanations consistently in `src/pages/MissionPage.tsx`
- [X] T055 [US3] Add content validation for minimum 60 activities and 6 texts in `tests/content/content-validation.test.ts`
- [X] T056 [US3] Add domain tests for scoring and mastery updates in `tests/domain/scoring.test.ts`
- [X] T057 [US3] Validate US3 acceptance scenarios from `specs/001-repasa-lengua-angela/spec.md`

**Checkpoint**: MVP educational content is real enough for repeated use.

---

## Phase 6: User Story 4 - Escritura y oralidad guiadas (Priority: P4)

**Goal**: Angela can complete guided writing and oral-expression tasks with local saving and checklist support.

**Independent Test**: Create a writing artifact, reload and verify it persists; complete an oral checklist with and without recording support.

### Implementation for User Story 4

- [ ] T058 [P] [US4] Add writing prompt missions for Ciudad de los Escritores in `src/data/missions.json`
- [ ] T059 [P] [US4] Add oral prompt missions for Plaza de la Expresion Oral in `src/data/missions.json`
- [ ] T060 [US4] Add WritingArtifact handling to `src/domain/progress.ts`
- [ ] T061 [US4] Add OralPracticeArtifact handling to `src/domain/progress.ts`
- [ ] T062 [US4] Create writing activity UI in `src/pages/MissionPage.tsx`
- [ ] T063 [US4] Create oral checklist UI with recording fallback in `src/pages/MissionPage.tsx`
- [ ] T064 [US4] Persist writing and oral artifacts in `src/storage/localProgress.ts`
- [ ] T065 [US4] Add smoke test for writing save and reload in `tests/smoke/writing-artifact.spec.ts`
- [ ] T066 [US4] Add smoke test for oral checklist fallback in `tests/smoke/oral-checklist.spec.ts`
- [ ] T067 [US4] Validate US4 acceptance scenarios from `specs/001-repasa-lengua-angela/spec.md`

**Checkpoint**: Writing and oral modes are usable without external services.

---

## Phase 7: User Story 5 - Panel para padres (Priority: P5)

**Goal**: Evaristo or Sonia can review progress, strengths, weak areas and export/import progress.

**Independent Test**: Complete sample missions, open parent panel, verify summary and recommendation, export progress, reset/import and confirm state restoration.

### Implementation for User Story 5

- [X] T068 [US5] Create parent panel page in `src/pages/ParentPage.tsx`
- [X] T069 [US5] Create parent summary component in `src/components/ParentSummary.tsx`
- [X] T070 [US5] Implement ParentSummary aggregation in `src/domain/progress.ts`
- [X] T071 [US5] Show minutes, missions, accuracy, frequent mistakes, strengths and weak areas in `src/pages/ParentPage.tsx`
- [X] T072 [US5] Add recommendation text generation in `src/domain/progress.ts`
- [X] T073 [US5] Add export progress action using `src/storage/progressExport.ts`
- [X] T074 [US5] Add import progress action with validation in `src/storage/progressExport.ts`
- [X] T075 [US5] Add reset progress action with explicit confirmation in `src/pages/ParentPage.tsx`
- [ ] T076 [US5] Add smoke test for parent summary and export/import in `tests/smoke/parent-panel.spec.ts`
- [ ] T077 [US5] Validate quickstart steps 10-15 in `specs/001-repasa-lengua-angela/quickstart.md`

**Checkpoint**: Parent visibility and backup flow are complete for MVP.

---

## Phase 8: User Story 6 - Modos especiales y retos finales (Priority: P6)

**Goal**: Add non-MVP game modes and final boss challenges after the main loop is stable.

**Independent Test**: Enter each special mode from the app, complete a representative flow and verify score/reward output.

### Implementation for User Story 6

- [ ] T078 [P] [US6] Add final boss mission definitions in `src/data/missions.json`
- [ ] T079 [P] [US6] Add Biblioteca Encantada literature activities in `src/data/activities.json`
- [ ] T080 [US6] Implement 10-question mixed boss challenge flow in `src/pages/MissionPage.tsx`
- [ ] T081 [US6] Add Modo Examen entry and result flow in `src/App.tsx`
- [ ] T082 [US6] Add Modo Aventura Libre world selection behavior in `src/pages/MapPage.tsx`
- [ ] T083 [US6] Add Juega con papa o mama turn structure in `src/pages/MissionPage.tsx`
- [ ] T084 [US6] Add Crea tu cuento guided prompt flow in `src/pages/MissionPage.tsx`
- [ ] T085 [US6] Add special reward unlocks for boss victories in `src/domain/unlocks.ts`
- [ ] T086 [US6] Add smoke test for final boss outcome in `tests/smoke/final-boss.spec.ts`
- [ ] T087 [US6] Validate US6 acceptance scenarios from `specs/001-repasa-lengua-angela/spec.md`

**Checkpoint**: Extended play modes are available after MVP.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, accessibility, responsive polish and deployment readiness.

- [ ] T088 [P] Review all visible Spanish copy for 4th-grade tone and consistency in `src/data/` and `src/pages/`
- [ ] T089 [P] Add responsive checks for mobile, tablet and desktop in `tests/smoke/responsive.spec.ts`
- [ ] T090 Add accessible labels and keyboard-friendly interactions across `src/components/` and `src/pages/`
- [X] T091 Validate missing-asset placeholders for Angela and unicorn images in `src/components/AngelaGuide.tsx` and `src/components/UnicornProgress.tsx`
- [X] T092 Run full content validation from `tests/content/content-validation.test.ts`
- [X] T093 Run full domain validation from `tests/domain/`
- [X] T094 Run full browser smoke suite from `tests/smoke/`
- [X] T095 Run production build and static preview for GitHub Pages base path
- [X] T096 Validate hard refresh behavior for Home, Map, Mission and Parent routes in `tests/smoke/github-pages-routing.spec.ts`
- [ ] T097 Validate production preview has no missing CSS, JavaScript, JSON or asset requests in `tests/smoke/github-pages-assets.spec.ts`
- [ ] T098 Document deployment steps in `docs/deploy-github-pages.md`
- [ ] T099 Publish to GitHub Pages after user approval and validate the public URL

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all stories.
- **US1 (Phase 3)**: Depends on Foundation; this is the MVP core.
- **US2 (Phase 4)**: Depends on Foundation and benefits from US1 progress state.
- **US3 (Phase 5)**: Depends on Foundation and Mission Player from US1.
- **US4 (Phase 6)**: Depends on Mission Player and local persistence.
- **US5 (Phase 7)**: Depends on progress generated by US1-US3.
- **US6 (Phase 8)**: Depends on stable mission, scoring and reward systems.
- **Polish (Phase 9)**: Depends on whichever stories are included in the release.

### User Story Dependencies

- **US1**: First playable vertical slice.
- **US2**: Can proceed after Foundation, but demos better after US1.
- **US3**: Can proceed after US1 mission mechanics.
- **US4**: Can proceed after persistence is stable.
- **US5**: Can proceed once mission and mastery data exist.
- **US6**: Should wait until MVP loop is stable.

### Parallel Opportunities

- T004-T006 can run in parallel.
- T020-T022 can run in parallel.
- T045-T048 can run in parallel because they edit distinct content sections if coordinated.
- T058-T059 can run in parallel.
- T078-T079 can run in parallel.
- T088-T089 can run in parallel.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundation.
3. Complete US1 daily mission.
4. Add US2 map progression.
5. Add US3 MVP content bank.
6. Add US5 parent panel.
7. Stop, validate, and demo.

### Full Product Increment

1. MVP First path.
2. Add US4 writing and oral expression.
3. Add US6 modes and final bosses.
4. Polish, validate and publish.

### Codex CLI + Superpowers Execution Note

Use Codex CLI and Superpowers later to execute tasks sequentially or by phase. Each task includes target files so implementation agents can operate without rereading the whole chat. GitHub Pages tasks T002, T003, T009 and T095-T099 are release blockers.
