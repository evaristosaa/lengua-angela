# Requisitos tecnicos - Angela y el Reino Arcoiris de las Palabras

Fecha: 2026-06-20

## Requisito principal

La app debe poder publicarse en **GitHub Pages**.

Esto condiciona la arquitectura:

- Debe ser una app web estatica.
- No debe necesitar backend para funcionar.
- Debe poder servirse desde una subruta, por ejemplo `/repasa-lengua-angela/`.
- Las rutas deben funcionar en GitHub Pages. Para el MVP se prioriza hash routing para evitar 404 al refrescar.
- Los datos iniciales deben ir en archivos JSON estaticos.
- El progreso de Angela debe guardarse en `localStorage` o `IndexedDB`.
- Debe permitir exportar/importar progreso en JSON para no perder avances.
- Todos los assets deben cargarse con rutas compatibles con subruta.
- La URL publica de GitHub Pages debe validarse con build real y smoke test.

## Stack recomendado

- React + Vite.
- TypeScript.
- CSS normal o Tailwind si conviene, pero sin complicar.
- Datos en `src/data/*.json`.
- Assets en `src/assets/` o `public/assets/`.
- Deploy a GitHub Pages con GitHub Actions o script `npm run build`.

## Funcionalidades tecnicas base

- Mapa de misiones.
- Motor de preguntas.
- Motor de progreso.
- Sistema de recompensas del unicornio.
- Biblioteca de textos.
- Taller de escritura con guardado local.
- Grabacion de voz local para expresion oral, si el navegador lo permite.
- Panel padre basico.
- Pantallas responsive para movil/tablet/escritorio.
- Modo sin conexion si se convierte en PWA mas adelante.

## Modelo de datos inicial

### Habilidad

- id
- nombre
- bloque
- nivel
- descripcion

### Mision

- id
- mundo
- titulo
- descripcion
- habilidadPrincipal
- actividades
- recompensa
- desbloqueada

### Actividad

- id
- tipo
- enunciado
- opciones
- respuestaCorrecta
- explicacion
- dificultad

### Progreso

- misionesCompletadas
- habilidades
- recompensasUnicornio
- racha
- textosEscritos
- fechaUltimaSesion

## GitHub Pages

Para evitar problemas:

- Configurar `base` en Vite con la ruta final del repo.
- Evitar dependencias de servidor.
- Usar assets relativos.
- Probar build local antes de publicar.
- Validar en Playwright despues de desplegar.
- Validar refresco duro en Home, Mapa, Mision y Panel padres.
- Validar que no falten CSS, JS, JSON ni imagenes.

## MVP tecnico prioritario

1. Crear app React/Vite.
2. Configurar build compatible con GitHub Pages.
3. Crear layout responsive.
4. Crear pantalla de inicio.
5. Crear mapa de mundos.
6. Crear motor de misiones y actividades.
7. Crear datos JSON para Puente 3 a 4, Ortografia, Gramatica y Comprension.
8. Crear progreso local.
9. Crear sistema visual de unicornio desbloqueable.
10. Crear panel padre basico.
11. Preparar carpeta de assets para Angela comic y unicornio.
12. Configurar workflow o proceso de despliegue a GitHub Pages.
13. Desplegar en GitHub Pages.
14. Validar URL publica con pruebas de rutas y assets.
