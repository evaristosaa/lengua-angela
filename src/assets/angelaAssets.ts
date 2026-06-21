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

export const angelaImages: Record<AngelaState, string> = {
  saludo: "/assets/angela/angela-saluda-libro.png",
  lectura: "/assets/angela-clean/angela-lee-nube.png",
  detective: "/assets/angela-clean/angela-detective-lupa.png",
  ortografia: "/assets/angela-clean/angela-varita-ortografia.png",
  celebracion: "/assets/angela-clean/angela-celebra-confeti.png",
  pensativa: "/assets/angela/angela-error-amable-pensativa.png",
  mapa: "/assets/angela-clean/angela-exploradora-mapa.png",
  recompensa: "/assets/angela-clean/angela-recompensa-exp-gemas.png",
  gramatica: "/assets/angela/angela-construye-frases.png",
  microfono: "/assets/angela-clean/angela-microfono.png",
  jefe: "/assets/angela-clean/angela-capa-arcoiris.png",
  victoria: "/assets/angela-clean/angela-monta-unicornio.png",
  nivel: "/assets/angela-clean/angela-nivel-superado-pizarra.png"
};
