import AngelaGuide from "../components/AngelaGuide";
import MissionCard from "../components/MissionCard";
import type { LearnerProgress, Mission, World } from "../domain/contentTypes";
import { getWorldStatus, isMissionCompleted } from "../domain/progress";

interface MissionsPageProps {
  worlds: World[];
  missions: Mission[];
  progress: LearnerProgress;
  onOpenMission: (missionId: string) => void;
  onOpenMap: () => void;
}

export default function MissionsPage({ worlds, missions, progress, onOpenMission, onOpenMap }: MissionsPageProps) {
  const worldLookup = new Map(worlds.map((world) => [world.id, world]));
  const availableMissions = missions.filter((mission) => {
    const world = worldLookup.get(mission.worldId);
    return world ? getWorldStatus(world, progress) !== "locked" : false;
  });
  const nextLockedWorld = worlds
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .find((world) => getWorldStatus(world, progress) === "locked");

  return (
    <div className="page missions-page">
      <section className="page-heading missions-heading">
        <div>
          <p className="eyebrow">Misiones</p>
          <h1>Elige reto</h1>
          <p>Una partida corta para ganar EXP, gemas y una pieza de Arcoiris.</p>
        </div>
        <AngelaGuide
          state="detective"
          variant="compact"
          title="Aventura clara"
          message="Toca una tarjeta verde para jugar. Las bloqueadas se abren desde el mapa."
        />
      </section>

      <section className="mission-board" aria-label="Misiones disponibles">
        {availableMissions.map((mission) => {
          const world = worldLookup.get(mission.worldId);
          const completed = isMissionCompleted(progress, mission.id);

          return (
            <article className={completed ? "mission-stage mission-stage--done" : "mission-stage"} key={mission.id}>
              <span className="mission-stage-status">{completed ? "Hecha" : "Disponible"}</span>
              <div>
                <p className="eyebrow">{world?.title ?? "Misión"} · {mission.estimatedMinutes} min</p>
                <h2>{mission.title}</h2>
                <p>{mission.goal}</p>
                <span className="stage-reward">{completed ? "Repetible" : `Gana ${mission.reward.stars} EXP y ${mission.reward.gems} gemas`}</span>
              </div>
              <button className="primary-action--big" type="button" onClick={() => onOpenMission(mission.id)}>
                {completed ? "Repetir misión" : "Jugar misión"}
              </button>
            </article>
          );
        })}
      </section>

      {nextLockedWorld && (
        <section className="next-unlock-panel">
          <p className="eyebrow">Siguiente desbloqueo</p>
          <h2>{nextLockedWorld.title}</h2>
          <p>Completa la misión diaria para abrir este mundo y seguir construyendo el unicornio.</p>
          <button type="button" onClick={onOpenMap}>Ver mapa</button>
        </section>
      )}
    </div>
  );
}
