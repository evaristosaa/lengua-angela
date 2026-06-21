import { angelaImages } from "../assets/angelaAssets";
import type { LearnerProgress, Mission, World } from "../domain/contentTypes";

interface HomePageProps {
  mission: Mission;
  progress: LearnerProgress;
  recommendedWorld: World;
  onOpenMap: () => void;
  onOpenUnicorn: () => void;
  onOpenParents: () => void;
}

const unicornImage = `${import.meta.env.BASE_URL}assets/unicorn/rainbow-unicorn-comic.png`;

export default function HomePage({
  onOpenMap,
  onOpenUnicorn,
  onOpenParents
}: HomePageProps) {
  return (
    <div className="home-page">
      <section className="kid-launcher" aria-label="Menú principal de Angela y el Reino Arcoiris de las Palabras">
        <img className="launcher-background-angela" src={angelaImages.mapa} alt="" />
        <div className="home-rainbow-arch" aria-hidden="true">
          <svg className="home-rainbow-svg" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <path className="rainbow-band rainbow-band--red" d="M 9 100 V 67 C 9 30 25 13 50 13 C 75 13 91 30 91 67 V 100" />
            <path className="rainbow-band rainbow-band--orange" d="M 9 100 V 67 C 9 30 25 13 50 13 C 75 13 91 30 91 67 V 100" />
            <path className="rainbow-band rainbow-band--yellow" d="M 9 100 V 67 C 9 30 25 13 50 13 C 75 13 91 30 91 67 V 100" />
            <path className="rainbow-band rainbow-band--green" d="M 9 100 V 67 C 9 30 25 13 50 13 C 75 13 91 30 91 67 V 100" />
            <path className="rainbow-band rainbow-band--blue" d="M 9 100 V 67 C 9 30 25 13 50 13 C 75 13 91 30 91 67 V 100" />
            <path className="rainbow-band rainbow-band--purple" d="M 9 100 V 67 C 9 30 25 13 50 13 C 75 13 91 30 91 67 V 100" />
          </svg>
          <span className="home-rainbow-sparkles" />
          <span className="home-rainbow-cloud home-rainbow-cloud--left" />
          <span className="home-rainbow-cloud home-rainbow-cloud--right" />
        </div>
        <img className="home-comic-unicorn" src={unicornImage} alt="" />

        <div className="home-title-wrap" aria-label="Angela y el Reino Arcoiris de las Palabras">
          <span className="home-title-line">Angela y el Reino Arcoiris</span>
          <span className="home-title-line home-title-line--small">de las Palabras</span>
        </div>

        <div className="home-actions" aria-label="Accesos principales">
          <button type="button" onClick={onOpenMap}>
            Mapa
          </button>
          <button type="button" onClick={onOpenUnicorn}>
            Unicornio
          </button>
          <button type="button" onClick={onOpenParents}>
            Ajustes
          </button>
        </div>
      </section>
    </div>
  );
}
