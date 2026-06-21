# Quickstart: Angela y el Reino Arcoiris de las Palabras

This quickstart is for the future implementation phase with Codex CLI and Superpowers. Do not implement before user approval.

## Expected MVP Demo Flow

1. Open the app locally.
2. Confirm the home screen shows "Angela y el Reino Arcoiris de las Palabras" and the Lengualandia story.
3. Start "10 minutos magicos".
4. Complete a Puente 3 a 4 mission.
5. Confirm immediate feedback appears after each closed-answer activity.
6. Finish the mission.
7. Confirm the unicorn unlocks a visible reward.
8. Reload the browser.
9. Confirm mission progress and reward persist.
10. Open the parent panel.
11. Confirm minutes, completed mission and recommendation appear.
12. Export progress.
13. Reset or use a fresh browser state.
14. Import progress.
15. Confirm the completed mission and reward return.

## Build/Deploy Validation Goals

- Local build completes without errors.
- Static preview serves the app from the intended base path.
- Browser smoke test covers home, map, mission completion, reward and parent panel.
- GitHub Pages deployment loads without route or asset errors.
- Hard refresh works on Home, Map, Mission and Parent views from the deployed URL.
- Browser console shows no missing CSS, JavaScript, JSON or asset errors on the deployed URL.

## Content Validation Goals

- Every mission references existing activities.
- Every activity references an existing skill and world.
- Closed-answer activities include correct answers and explanations.
- MVP contains at least 60 activities and 6 reading texts.
- All displayed text fits mobile/tablet layouts.
