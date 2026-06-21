# Cobertura de requisitos funcionales

Fecha: 2026-06-21

## Resumen ejecutivo

La app cubre el MVP jugable basico: marca, historia inicial, home, mapa, mision diaria, feedback, progreso local, recompensas, pantalla de unicornio, panel para padres, export/import y rutas hash compatibles con GitHub Pages.

No cubre todavia el alcance completo de producto: faltan mundos jugables despues del puente, banco amplio de contenidos, escritura, oralidad, literatura, modos especiales, jefes finales y mapeo completo de piezas del unicornio segun todos los bloques curriculares.

## Cobertura actual

| Requisito | Estado | Evidencia / brecha |
| --- | --- | --- |
| FR-001 marca e historia Lengualandia | Parcial | Marca visible y narrativa del unicornio; falta carta/historia completa del reino. |
| FR-002 empezar por Puente 3 a 4 | Cubierto | Mundo inicial `puente-3-4` disponible desde el inicio. |
| FR-003 modo diario 10 minutos magicos | Parcial | Hay mision de 10 min con lectura y 12 preguntas; no hay minijuego real separado. |
| FR-004 mundos requeridos | Parcial | Hay 4 mundos: Puente, Ortografia, Gramatica y Comprension. Faltan Vocabulario, Escritura, Expresion Oral, Biblioteca y Retos Finales. |
| FR-005 recompensas del unicornio por bloque | Parcial | Hay 4 piezas: crin, alas, corona y estela. No coincide aun con ojos, cuerno, alas, melena, cola, voz, silla y estado legendario. |
| FR-006 progreso, monedas y dominio | Parcial | Se guardan misiones, EXP, gemas, libros, varitas, piezas y skill mastery. La racha existe en modelo pero no se actualiza de forma real. |
| FR-007 feedback inmediato | Cubierto | Las respuestas cerradas corrigen y explican. |
| FR-008 clasificacion de actividades | Cubierto | Las actividades tienen skill, dificultad, mundo, tipo y tags. |
| FR-009 comprension lectora | Parcial | Hay idea principal, detalle e inferencia en puente; faltan secuencia, titulo, personajes/lugar/problema en banco amplio. |
| FR-010 gramatica | Parcial | Hay sustantivo, verbo, adjetivo y sujeto; faltan determinantes, articulos, demostrativos, posesivos, numerales, pronombres, tiempos, persona/numero y tipos de oracion. |
| FR-011 ortografia | Parcial | Hay tildes, mayusculas y b/v; faltan puntuacion avanzada, agudas/llanas/esdrujulas, g/j, c/z, r/rr, h, ll/y y m antes de p/b. |
| FR-012 vocabulario | Parcial | Hay sinonimos y contexto; falta banco de antonimos, polisemia, homofonas, familias, campos, prefijos, sufijos, compuestas, aumentativos y diminutivos. |
| FR-013 escritura | No cubierto | Falta Ciudad de los Escritores, plantillas, guardado y revision. |
| FR-014 oralidad | No cubierto | Falta Plaza de Expresion Oral, checklist y grabacion/fallback manual. |
| FR-015 literatura | No cubierto | Falta Biblioteca Encantada y actividades literarias. |
| FR-016 panel padres | Parcial | Muestra minutos, misiones, acierto, recomendaciones, fallos/fortalezas si existen. Falta racha/nivel mas visibles y datos ricos por varios bloques. |
| FR-017 progreso local sin cuentas | Cubierto | `localStorage`, sin login. |
| FR-018 export/import | Cubierto | Botones de exportar/importar progreso. |
| FR-019 GitHub Pages/subruta | Cubierto | Hash routing y Vite con configuracion para estatico. |
| FR-020 estructura extensible | Cubierto | JSON de mundos, misiones, actividades y textos. |
| FR-021 estados comic de Angela | Parcial | Hay assets para casi todos; falta escritura. Ahora se usan mas estados y se han creado versiones limpias de varios assets. |
| FR-022 racha no punitiva | No cubierto | Campo en modelo, sin mecanica de actualizacion/tolerancia. |
| FR-023 jefes finales | No cubierto | Asset de jefa/final existe, pero no hay modo de 10 preguntas mixtas. |
| FR-024 modos de juego | Parcial | Modo diario MVP cubierto. Examen, aventura libre, juega con papa/mama y crea tu cuento no implementados. |
| FR-025 no compartir datos externamente | Cubierto | No hay envio externo; exportacion manual local. |
| FR-026 refresh duro en navegacion | Cubierto | Rutas hash: home, mapa, misiones, unicornio, mision y padres. |
| FR-027 assets/estilos/scripts desde publico | Cubierto localmente | Build y Playwright OK; pendiente validacion final tras publicar en GitHub Pages real. |

## Datos reales actuales

- Mundos definidos: 4.
- Mundos jugables con mision: 1.
- Misiones: 1.
- Actividades: 12.
- Textos: 1.
- Tipos de actividad: `multiple-choice`.
- Pantallas principales: Home, Misiones, Mapa, Unicornio, Mision y Padres.

## Prioridad recomendada

1. Crear misiones jugables para Ortografia, Gramatica y Comprension para cumplir mejor el MVP.
2. Ampliar banco inicial a 60 actividades y 6 textos.
3. Alinear recompensas del unicornio con la tabla funcional completa.
4. Crear Escritura y Oralidad con plantillas/checklists locales.
5. Crear Retos Finales y modos Examen/Aventura Libre/Juega con papa o mama/Crea tu cuento.
