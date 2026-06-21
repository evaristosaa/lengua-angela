import type { LearnerProgress } from "../domain/contentTypes";

const rewardParts = [
  { name: "primer color arcoiris", aliases: ["crin arcoiris"] },
  { name: "tildes brillantes", aliases: ["alas brillantes"] },
  { name: "corona de frases", aliases: ["corona dorada"] },
  { name: "comprensión lectora", aliases: ["estela mágica", "llave de lectura"] }
];

interface UnicornProgressProps {
  progress: LearnerProgress;
}

export default function UnicornProgress({ progress }: UnicornProgressProps) {
  return (
    <section className="unicorn-progress" aria-labelledby="unicorn-title">
      <div>
        <p className="eyebrow">Unicornio Arcoiris</p>
        <h2 id="unicorn-title">Piezas mágicas</h2>
      </div>
      <div className="reward-track">
        {rewardParts.map((part) => {
          const unlocked = progress.rewardInventory.unlockedParts.includes(part.name)
            || part.aliases.some((alias) => progress.rewardInventory.unlockedParts.includes(alias));
          return (
            <span className={unlocked ? "reward reward--unlocked" : "reward"} key={part.name}>
              {unlocked ? "✓" : "○"} {part.name}
            </span>
          );
        })}
      </div>
      <div className="currency-row" aria-label="Recompensas acumuladas">
        <span>{progress.currency.stars} EXP</span>
        <span>{progress.currency.gems} gemas</span>
        <span>{progress.currency.books} libros</span>
        <span>{progress.currency.wands} varitas</span>
      </div>
    </section>
  );
}
