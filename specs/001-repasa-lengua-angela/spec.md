# Feature Specification: Angela y el Reino Arcoiris de las Palabras

**Feature Branch**: `001-repasa-lengua-angela`  
**Created**: 2026-06-20  
**Status**: Draft  
**Input**: User description: "Crear una app educativa gamificada llamada Angela y el Reino Arcoiris de las Palabras para una nina de 9 anos que acaba 3 de Primaria y prepara 4. Debe funcionar en GitHub Pages, empezar con puente de repaso de 3 a 4, incluir misiones de Lengua, comic Angela, unicornio arcoiris progresivo, panel para padres, contenidos de comprension lectora, gramatica, ortografia, vocabulario, escritura, expresion oral, literatura, retos finales y modos de juego."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mision diaria con recompensa del unicornio (Priority: P1)

Angela abre la app, ve su avance en Lengualandia, inicia una sesion de "10 minutos magicos", completa actividades variadas de Lengua y desbloquea una recompensa visual para el unicornio arcoiris.

**Why this priority**: Es el nucleo del producto. Sin una mision diaria jugable con recompensa, la app seria solo un menu de ejercicios.

**Independent Test**: Se puede probar de forma aislada iniciando una sesion nueva, completando una mision del puente 3 a 4 y verificando que se guarda el progreso y aparece una recompensa del unicornio.

**Acceptance Scenarios**:

1. **Given** Angela entra por primera vez, **When** inicia la mision diaria, **Then** la app presenta una lectura o reto corto, tres preguntas, un minijuego y una recompensa.
2. **Given** Angela completa todos los pasos de la mision, **When** ve la pantalla de resultado, **Then** recibe estrellas y una pieza/color del unicornio.
3. **Given** Angela cierra y vuelve a abrir la app, **When** consulta su mapa, **Then** la mision completada y la recompensa siguen visibles.

---

### User Story 2 - Mapa de mundos y progresion de contenidos (Priority: P2)

Angela explora un mapa de Lengualandia con mundos desbloqueables: Puente 3 a 4, Comprension Lectora, Gramatica, Ortografia, Vocabulario, Escritura, Expresion Oral, Biblioteca Encantada y Retos Finales.

**Why this priority**: La progresion da sentido a la aventura y organiza el curriculo de 4 de Primaria en bloques comprensibles para una nina.

**Independent Test**: Se puede probar viendo el mapa, entrando en mundos disponibles, revisando mundos bloqueados y comprobando que cada mundo muestra objetivo, misiones y recompensa.

**Acceptance Scenarios**:

1. **Given** Angela ha completado el Puente 3 a 4, **When** vuelve al mapa, **Then** el siguiente mundo recomendado aparece destacado.
2. **Given** un mundo no esta desbloqueado, **When** Angela intenta abrirlo, **Then** la app explica que mision debe completar antes.
3. **Given** Angela abre un mundo disponible, **When** revisa sus misiones, **Then** ve contenidos y recompensas alineados con ese bloque.

---

### User Story 3 - Banco de actividades de Lengua de 4 de Primaria (Priority: P3)

Angela practica actividades de comprension, gramatica, ortografia y vocabulario con feedback amable y explicaciones cortas cuando falla.

**Why this priority**: El juego necesita contenido educativo real, no solo envoltorio visual.

**Independent Test**: Se puede probar completando actividades de cada tipo y verificando que corrigen respuestas, explican errores y actualizan dominio por habilidad.

**Acceptance Scenarios**:

1. **Given** Angela responde una actividad de ortografia, **When** falla una tilde o letra, **Then** la app muestra la respuesta correcta y una explicacion breve.
2. **Given** Angela completa varias actividades de una habilidad, **When** consulta su progreso, **Then** esa habilidad refleja aciertos, fallos y nivel estimado.
3. **Given** Angela repite fallos en una habilidad, **When** inicia otra mision, **Then** la app prioriza un nuevo reto de esa habilidad.

---

### User Story 4 - Escritura y oralidad guiadas (Priority: P4)

Angela crea pequenos textos y practica expresion oral con guias claras, listas de comprobacion y guardado local de sus producciones.

**Why this priority**: 4 de Primaria no es solo contestar preguntas; requiere producir textos, revisar y expresarse oralmente.

**Independent Test**: Se puede probar creando una descripcion, guardandola, revisandola y completando una actividad oral con lista de comprobacion.

**Acceptance Scenarios**:

1. **Given** Angela entra en Ciudad de los Escritores, **When** elige "Carta al unicornio", **Then** recibe una plantilla guiada y puede guardar su texto.
2. **Given** Angela termina un texto, **When** pulsa revisar, **Then** la app muestra una lista simple de mejoras: claridad, conectores, mayusculas y puntuacion.
3. **Given** Angela entra en Plaza de la Expresion Oral, **When** completa una lectura o explicacion, **Then** puede marcar una lista de comprobacion y guardar el resultado de la actividad.

---

### User Story 5 - Panel para padres (Priority: P5)

Evaristo o Sonia consultan un panel sencillo para saber cuanto ha practicado Angela, que misiones ha completado, en que va bien y que conviene reforzar.

**Why this priority**: Los adultos necesitan seguimiento sin meterse en cada ejercicio ni convertir la app en deberes supervisados.

**Independent Test**: Se puede probar completando misiones de ejemplo y verificando que el panel resume tiempo, aciertos, fallos frecuentes, racha y recomendaciones.

**Acceptance Scenarios**:

1. **Given** Angela ha practicado varios dias, **When** un adulto abre el panel, **Then** ve minutos de estudio, racha y misiones completadas.
2. **Given** hay fallos repetidos en tildes, **When** se abre el panel, **Then** aparece una recomendacion tipo "Esta semana conviene repasar tildes".
3. **Given** Angela domina una habilidad, **When** se abre el panel, **Then** esa habilidad aparece como fortaleza.

---

### User Story 6 - Modos especiales y retos finales (Priority: P6)

Angela puede elegir modos alternativos: Modo Examen, Aventura Libre, Juega con papa o mama, Crea tu cuento y Retos Finales contra jefes de Lengualandia.

**Why this priority**: Aumenta variedad y vida util, pero no bloquea el MVP inicial.

**Independent Test**: Se puede probar cada modo con datos de ejemplo y verificar que produce un resultado y recompensa coherente.

**Acceptance Scenarios**:

1. **Given** Angela abre Modo Examen, **When** completa un repaso rapido, **Then** recibe resultado final y consejos.
2. **Given** Angela abre Juega con papa o mama, **When** se completan turnos de varios jugadores, **Then** la app muestra estrellas por participante.
3. **Given** Angela llega a un reto final, **When** responde 10 preguntas mezcladas, **Then** vence o recibe animo y desbloquea una pieza especial si supera el reto.

### Edge Cases

- Si no hay progreso previo, la app debe empezar en Puente 3 a 4 y explicar la historia de Lengualandia.
- Si el navegador no permite grabacion de voz, las actividades orales deben funcionar con una lista de comprobacion manual.
- Si Angela falla repetidamente, el feedback debe ser amable y proponer repetir o practicar sin penalizacion dura.
- Si no existen todavia imagenes comic de Angela, la app debe usar placeholders visuales claros hasta incorporar assets reales.
- Si el almacenamiento local no esta disponible, la app debe avisar que el progreso podria no guardarse y ofrecer exportacion manual cuando sea posible.
- Si la app se publica en una subruta, todas las pantallas y assets deben cargar correctamente.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST present the product as "Angela y el Reino Arcoiris de las Palabras" and frame the experience as the recovery of colors in Lengualandia.
- **FR-002**: The app MUST start with a 3rd-to-4th grade bridge world before recommending 4th grade content.
- **FR-003**: The app MUST include a daily mode called "10 minutos magicos" with a short reading or prompt, three questions, one orthography challenge, one minigame and one reward.
- **FR-004**: The app MUST include worlds for Puente 3 a 4, Comprension Lectora, Gramatica, Ortografia, Vocabulario, Escritura, Expresion Oral, Biblioteca Encantada and Retos Finales.
- **FR-005**: The app MUST map each main learning block to a unicorn reward part: eyes, horn, wings, mane, star tail, magic voice, enchanted saddle and legendary state.
- **FR-006**: The app MUST track mission completion, stars, rainbow gems, magic books, help wands, unlocked unicorn rewards and skill mastery.
- **FR-007**: The app MUST provide immediate feedback for closed-answer activities, including correct answer and a short explanation for mistakes.
- **FR-008**: The app MUST classify activities by skill, difficulty, world and activity type.
- **FR-009**: The app MUST include comprehension activities covering main idea, explicit details, sequence, title selection, character/place/problem and simple inference.
- **FR-010**: The app MUST include grammar activities covering nouns, adjectives, determiners, articles, demonstratives, possessives, numerals, pronouns, verbs, infinitive, verb tense, person, number, subject and predicate.
- **FR-011**: The app MUST include orthography activities covering capital letters, punctuation, acute/flat/esdrujula words, accents, B/V, G/J, C/Z, R/RR, H, LL/Y and M before P/B.
- **FR-012**: The app MUST include vocabulary activities covering synonyms, antonyms, polysemic words, simple homophones, word families, semantic fields, prefixes, suffixes, compound words, augmentatives and diminutives.
- **FR-013**: The app MUST include writing activities for descriptions, narration, letter, diary, news, instructions, comic, dialogue and short story.
- **FR-014**: The app MUST include oral expression activities with reading aloud, short explanation, storytelling, image description, simple opinion, interview and instructions.
- **FR-015**: The app MUST include literature activities covering story, fable, poetry, theatre, characters, narrator, beginning-middle-end, rhyme, verse, stanza and theatrical dialogue.
- **FR-016**: The app MUST provide a parent panel showing minutes studied, completed missions, accuracy by block, frequent mistakes, weekly streak, current level, mastered topics, topics to reinforce and recommendations.
- **FR-017**: The app MUST store progress locally by default and not require user accounts for the MVP.
- **FR-018**: The app MUST offer export/import of progress so progress can be preserved or moved.
- **FR-019**: The app MUST be usable after static publication on GitHub Pages, including when hosted from a repository subpath.
- **FR-020**: The app MUST include a content structure that can grow from the initial MVP bank to larger question sets without changing the user experience.
- **FR-021**: The app MUST support comic Angela states for greeting, celebration, error, detective mode, orthography, grammar, reading, writing, oral expression, final boss and final victory.
- **FR-022**: The app MUST include a non-punitive streak model with encouragement and optional rest tolerance.
- **FR-023**: The app MUST include final boss challenges with 10 mixed questions and outcome-specific feedback.
- **FR-024**: The app MUST support Modo Diario, Modo Examen, Modo Aventura Libre, Modo Juega con papa o mama and Modo Crea tu cuento as product modes, with MVP implementation prioritizing Modo Diario.
- **FR-025**: The app MUST avoid external sharing of child texts, recordings or progress unless explicitly exported by the user.
- **FR-026**: The app MUST keep primary navigation functional after a hard browser refresh on the public GitHub Pages URL.
- **FR-027**: The app MUST load all styles, scripts, JSON content and visual assets correctly from the GitHub Pages public URL.

### Key Entities *(include if feature involves data)*

- **LearnerProfile**: Represents Angela's local profile, including display name, streak, total minutes, unlocked rewards and current recommended world.
- **World**: Represents a content area in Lengualandia with title, description, unlock rules, missions and unicorn reward.
- **Mission**: Represents a playable sequence with objective, target skill, activities, minigame, reward and completion state.
- **Activity**: Represents an individual learning challenge with type, prompt, options or expected answer, explanation, skill, difficulty and scoring behavior.
- **TextContent**: Represents readings, poems, dialogues, news, instructions or literary fragments used by activities.
- **SkillMastery**: Represents progress per skill, including attempts, correct answers, recent mistakes and estimated level.
- **RewardInventory**: Represents stars, gems, books, wands, unicorn parts, visual customizations and unlocked messages.
- **WritingArtifact**: Represents a child-created text with prompt, draft, checklist and completion date.
- **OralPracticeArtifact**: Represents an oral activity result with prompt, checklist status and optional local recording metadata.
- **ParentSummary**: Represents aggregated progress, strengths, weak areas and recommended next practice.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time learner can start and complete the first daily mission in under 12 minutes without adult assistance.
- **SC-002**: After completing a mission, the learner sees a visible unicorn reward and updated map progress within 2 seconds.
- **SC-003**: The MVP includes at least 4 worlds with playable content: Puente 3 a 4, Ortografia, Gramatica and Comprension Lectora.
- **SC-004**: The initial content bank includes at least 60 closed-answer activities and 6 reading texts distributed across MVP worlds.
- **SC-005**: The parent panel summarizes progress in under one screenful on tablet or desktop and highlights at least one strength and one reinforcement area when data exists.
- **SC-006**: 100% of completed missions persist after browser reload in supported local storage environments.
- **SC-007**: The static published app loads correctly from a GitHub Pages subpath and all primary navigation works without server-side routing.
- **SC-008**: At least 90% of activity feedback messages include a short positive or constructive explanation rather than only "correct/incorrect".
- **SC-009**: The app can export progress to a user-readable file and import it back without losing completed mission state.
- **SC-010**: A parent or developer can add a new activity to the content bank without changing existing mission logic.
- **SC-011**: A hard refresh on Home, Map, Mission and Parent views from the public GitHub Pages URL does not produce a 404 or blank page.
- **SC-012**: The deployed GitHub Pages URL serves the production app with no missing CSS, JavaScript, JSON or image assets.

## Assumptions

- Angela will use the app mostly on tablet, laptop or mobile browser.
- MVP does not require accounts, cloud sync, payments, classrooms or teacher administration.
- Comic Angela images will be provided later; placeholders are acceptable during early implementation.
- Voice recording may be browser-dependent, so the oral mode must have a manual checklist fallback.
- AI-assisted story generation is a later enhancement; the MVP can use templates or local prompts.
- The app will be implemented later with Codex CLI and Superpowers, after this Spec Kit phase.
