import { useState } from "react";
import { type AngelaState, angelaImages } from "../assets/angelaAssets";

interface AngelaGuideProps {
  state: AngelaState;
  title: string;
  message: string;
  variant?: "card" | "hero" | "compact";
}

const stateLabels: Record<AngelaGuideProps["state"], string> = {
  saludo: "Angela saluda con su libro mágico",
  lectura: "Angela lee en la Biblioteca Encantada",
  detective: "Detective Angela busca pistas",
  ortografia: "Angela salva palabras con su varita",
  celebracion: "Angela celebra la misión",
  pensativa: "Angela piensa una pista amable",
  mapa: "Angela explora el mapa del Reino Arcoiris",
  recompensa: "Angela enseña las recompensas",
  gramatica: "Angela construye frases",
  microfono: "Angela usa el micrófono mágico",
  jefe: "Angela preparada para un reto final",
  victoria: "Angela monta el unicornio Arcoiris",
  nivel: "Angela celebra un nivel superado"
};

export default function AngelaGuide({ state, title, message, variant = "card" }: AngelaGuideProps) {
  const [imageReady, setImageReady] = useState(true);

  return (
    <section className={`angela-guide angela-guide--${state} angela-guide--${variant}`} aria-label={stateLabels[state]}>
      <div className="angela-portrait" aria-hidden="true">
        {imageReady ? (
          <img src={angelaImages[state]} alt="" onError={() => setImageReady(false)} />
        ) : (
          <span>A</span>
        )}
      </div>
      <div>
        <p className="eyebrow">{title}</p>
        <p>{message}</p>
      </div>
    </section>
  );
}
