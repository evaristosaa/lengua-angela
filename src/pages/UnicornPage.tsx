import { angelaImages } from "../assets/angelaAssets";
import type { LearnerProgress } from "../domain/contentTypes";
import type { CSSProperties } from "react";

const unicornParts = [
  { name: "primer color arcoiris", aliases: ["crin arcoiris"], label: "Repaso 3º", symbol: "3º" },
  { name: "tildes brillantes", aliases: ["alas brillantes"], label: "Ortografía", symbol: "á" },
  { name: "corona de frases", aliases: ["corona dorada"], label: "Gramática", symbol: "ABC" },
  { name: "comprensión lectora", aliases: ["estela mágica", "llave de lectura"], label: "Lectura", symbol: "L" }
];

interface UnicornPageProps {
  progress: LearnerProgress;
  onStartMission: () => void;
}

export default function UnicornPage({ progress, onStartMission }: UnicornPageProps) {
  const unlockedParts = progress.rewardInventory.unlockedParts;
  const isPartUnlocked = (part: (typeof unicornParts)[number]) => {
    return unlockedParts.includes(part.name) || part.aliases.some((alias) => unlockedParts.includes(alias));
  };
  const unlockedCount = unicornParts.filter(isPartUnlocked).length;

  return (
    <div className="page unicorn-page">
      <section className="unicorn-build magic-board" aria-label={`Unicornio Arcoiris con ${unlockedCount} piezas de ${unicornParts.length}`}>
        <div className="screen-title-card">
          <p className="eyebrow">Mi unicornio</p>
          <h1>Arcoiris</h1>
          <p>{unlockedCount === 0 ? "Gana misiones en el mapa." : `${unlockedCount} de ${unicornParts.length} poderes encendidos.`}</p>
        </div>
        <div className="unicorn-scene">
          <img
            className={unlockedCount > 0 ? "unicorn-main-art is-awake" : "unicorn-main-art"}
            src={angelaImages.victoria}
            alt="Angela con el unicornio Arcoiris"
          />
          <div className="rainbow-power" aria-hidden="true">
            {unicornParts.map((part, index) => (
              <span
                className={isPartUnlocked(part) ? "is-unlocked" : ""}
                key={part.name}
                style={{ "--part-index": index } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="unicorn-side-panel">
          <section className="part-grid" aria-label="Piezas del unicornio">
            {unicornParts.map((part) => {
              const unlocked = isPartUnlocked(part);

              return (
                <article className={unlocked ? "part-card part-card--unlocked" : "part-card"} key={part.name}>
                  <strong>{part.symbol}</strong>
                  <div>
                    <h2>{part.label}</h2>
                    <p>{unlocked ? "Activa" : "Dormida"}</p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
        <button className="primary-action--big unicorn-map-action" type="button" onClick={onStartMission}>
          Ir al mapa
        </button>
      </section>
    </div>
  );
}
