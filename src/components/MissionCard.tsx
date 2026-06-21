import type { Mission } from "../domain/contentTypes";

interface MissionCardProps {
  mission: Mission;
  completed: boolean;
  onOpen: () => void;
}

export default function MissionCard({ mission, completed, onOpen }: MissionCardProps) {
  return (
    <article className="mission-card">
      <div>
        <p className="eyebrow">{completed ? "Completada" : "Disponible"} · {mission.estimatedMinutes} min</p>
        <h3>{mission.title}</h3>
        <p>{mission.goal}</p>
      </div>
      <button type="button" onClick={onOpen}>
        {completed ? "Repetir" : "Jugar"}
      </button>
    </article>
  );
}
