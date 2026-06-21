# Assets de Angela comic

Fecha: 2026-06-20

Evaristo va a enviar imagenes de Angela en modo comic. Cada imagen recibida debe marcarse como OK en la conversacion y, si se guarda localmente, registrarse aqui.

## Carpeta destino

`public/assets/angela/`

Versiones con fondo limpiado:

`public/assets/angela-clean/`

Las imagenes recibidas por Telegram ya estan copiadas en esa carpeta con los nombres indicados, salvo Escritura, que sigue pendiente.

## Usos previstos

| Uso | Archivo sugerido | Estado |
| --- | --- | --- |
| Inicio de app | `angela-saluda-libro.png` | OK recibida - portada con Angela saludando, libro, unicornio y boton Comenzar. Fuente: Telegram `media://inbound/6fda9ff5-bbd4-44c5-879b-6b9614071d3c.jpg` |
| Mapa de mundos | `angela-exploradora-mapa.png` | OK recibida - Angela exploradora con mapa, mochila, catalejo y ruta de aventura. Fuente: Telegram `media://inbound/c6d17043-74d4-4da8-9d53-63a2ceba3de7.jpg` |
| Mision completada | `angela-celebra-confeti.png` | OK recibida - Angela saltando con confeti y texto "Mision Completada". Fuente: Telegram `media://inbound/9bdf1c12-cf73-403b-8380-369fdabdef96.jpg` |
| Recompensa de mision | `angela-recompensa-exp-gemas.png` | OK recibida - Angela y unicornio celebrando mision completada con +50 EXP, +10 gemas y +1 energia. Fuente: Telegram `media://inbound/b3e856d1-056b-47f6-99a9-f5b74823f7c8.jpg` |
| Nivel superado | `angela-nivel-superado-pizarra.png` | OK recibida - Angela junto a pizarra con texto "Nivel superado", unicornio y arcoiris. Fuente: Telegram `media://inbound/5cdf23ba-8d05-47dc-86bf-4efafc06aabf.jpg` |
| Error amable | `angela-error-amable-pensativa.png` | OK recibida - Angela pensativa con lapiz, texto "Error amable", cuaderno "No pasa nada, es parte del aprendizaje" y libros pienso/aprendo/corrijo/mejoro. Fuente: Telegram `media://inbound/89163884-f0a6-418e-a746-dc562f73b2ae.jpg` |
| Nivel dificil | `angela-detective-lupa.png` | OK recibida - Detective Angela con lupa, comprension lectora, pistas importantes e idea principal. Fuente: Telegram `media://inbound/3c1ddc66-f693-48fa-870a-daa76a29a7fd.jpg` |
| Ortografia | `angela-varita-ortografia.png` | OK recibida - Angela con varita magica y texto "Hora de salvar palabras". Fuente: Telegram `media://inbound/f4737057-31af-4823-99d5-6e425250d61a.jpg` |
| Gramatica | `angela-construye-frases.png` | OK recibida - Angela construyendo frases con bloques de sujeto, verbo y complemento, tablero de orden de frase y ejemplo. Fuente: Telegram `media://inbound/2f26300d-d557-4413-bcf5-5034da7d70e6.jpg` |
| Lectura | `angela-lee-nube.png` | OK recibida - Angela leyendo "Aventuras de las palabras" con libros de cuentos, poemas, fabulas y leyendas. Fuente: Telegram `media://inbound/76f6cb37-83cc-4078-a8d8-4709d4529bc4.jpg` |
| Escritura | `angela-escribe-cuento.png` | Pendiente |
| Expresion oral | `angela-microfono.png` | OK recibida - Angela con cascos, microfono, notas musicales y gesto de presentadora para retos de lectura en voz alta y oralidad. Fuente: Telegram `media://inbound/1194c123-7933-41fc-8d06-5a73b2c9d647.jpg` |
| Jefe final | `angela-capa-arcoiris.png` | OK recibida - Angela con capa arcoiris como "Guardiana de las palabras". Fuente: Telegram `media://inbound/6cf43f2c-1bcb-436e-ad8d-72ebf7c67edf.jpg` |
| Victoria final | `angela-monta-unicornio.png` | OK recibida - Angela montando el unicornio arcoiris con capa y estela magica. Fuente: Telegram `media://inbound/72d4b02f-acdd-404a-acf9-fbe322d38e31.jpg` |

## Criterio de aceptacion

- Estilo comic infantil.
- No realista/fotografico.
- Alegre, colorido y seguro para ninos.
- Fondo transparente o facil de recortar cuando sea posible.
- Buena legibilidad en movil/tablet.

## Limpieza 2026-06-21

Se generaron copias PNG con canal alpha, sin sobrescribir originales, para los assets cuyo fondo era negro o falso damero transparente:

- `angela-capa-arcoiris.png`
- `angela-celebra-confeti.png`
- `angela-detective-lupa.png`
- `angela-exploradora-mapa.png`
- `angela-lee-nube.png`
- `angela-microfono.png`
- `angela-monta-unicornio.png`
- `angela-nivel-superado-pizarra.png`
- `angela-recompensa-exp-gemas.png`
- `angela-varita-ortografia.png`

Quedan con fondo original porque son escenas completas y no recortes limpios automaticos: `angela-saluda-libro.png`, `angela-construye-frases.png`, `angela-error-amable-pensativa.png`.
