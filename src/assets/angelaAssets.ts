export type AngelaState =
  | "saludo"
  | "lectura"
  | "detective"
  | "ortografia"
  | "celebracion"
  | "pensativa"
  | "mapa"
  | "recompensa"
  | "gramatica"
  | "microfono"
  | "jefe"
  | "victoria"
  | "nivel";

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const angelaImages: Record<AngelaState, string> = {
  saludo: assetUrl("assets/angela/angela-saluda-libro.png"),
  lectura: assetUrl("assets/angela-clean/angela-lee-nube.png"),
  detective: assetUrl("assets/angela-clean/angela-detective-lupa.png"),
  ortografia: assetUrl("assets/angela-clean/angela-varita-ortografia.png"),
  celebracion: assetUrl("assets/angela-clean/angela-celebra-confeti.png"),
  pensativa: assetUrl("assets/angela/angela-error-amable-pensativa.png"),
  mapa: assetUrl("assets/angela-clean/angela-exploradora-mapa.png"),
  recompensa: assetUrl("assets/angela-clean/angela-recompensa-exp-gemas.png"),
  gramatica: assetUrl("assets/angela/angela-construye-frases.png"),
  microfono: assetUrl("assets/angela-clean/angela-microfono.png"),
  jefe: assetUrl("assets/angela-clean/angela-capa-arcoiris.png"),
  victoria: assetUrl("assets/angela-clean/angela-monta-unicornio.png"),
  nivel: assetUrl("assets/angela-clean/angela-nivel-superado-pizarra.png")
};
