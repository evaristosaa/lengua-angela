import MissionCard from "../components/MissionCard";
import { angelaImages } from "../assets/angelaAssets";
import type { LearnerProgress, Mission, World } from "../domain/contentTypes";
import { getWorldStatus, isMissionCompleted } from "../domain/progress";
import { getLockedExplanation } from "../domain/unlocks";

interface MapPageProps {
  worlds: World[];
  missions: Mission[];
  progress: LearnerProgress;
  onOpenMission: (missionId: string) => void;
}

export default function MapPage({ worlds, missions, progress, onOpenMission }: MapPageProps) {
  const missionLookup = new Map(missions.map((mission) => [mission.id, mission]));
  const orderedWorlds = worlds.slice().sort((a, b) => a.priority - b.priority);

  return (
    <div className="page map-page">
      <div className="adventure-map" aria-label="Ruta de mundos">
        <section className="map-title-card">
          <p className="eyebrow">Mapa de mundos</p>
          <h1>Reino Arcoiris</h1>
          <p>Avanza por los 4 mundos: repaso de 3º, ortografía, gramática y comprensión lectora.</p>
        </section>
        <svg className="map-trail" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M14 76 C 23 53, 36 46, 48 54 S 63 70, 74 49 S 75 23, 89 18" />
        </svg>
        <img className="map-angela" src={angelaImages.mapa} alt="" />
        {orderedWorlds.map((world, index) => {
          const status = getWorldStatus(world, progress);
          const playableMissions = world.missionIds.map((id) => missionLookup.get(id)).filter(Boolean) as Mission[];

          return (
            <article className={`world-node world-node--${status} world-node--${index + 1}`} key={world.id}>
              <div className="world-orb" aria-hidden="true">{worldIcon(world.id)}</div>
              <img className="world-card-art" src={worldImage(world.id)} alt="" />
              <p className="eyebrow">{statusLabel(status)}</p>
              <h2>{world.title}</h2>
              <p className="reward-note">{world.rewardPart}</p>
              {status === "locked" && <p className="lock-note">{getMapLockedText(world)}</p>}
              {status !== "locked" && playableMissions.length === 0 && (
                <p className="lock-note">Próximamente</p>
              )}
              {status !== "locked" && playableMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  completed={isMissionCompleted(progress, mission.id)}
                  onOpen={() => onOpenMission(mission.id)}
                />
              ))}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function worldImage(worldId: string): string {
  if (worldId.includes("gramatica")) return angelaImages.gramatica;
  if (worldId.includes("ortografia")) return angelaImages.ortografia;
  if (worldId.includes("comprension")) return angelaImages.detective;
  return angelaImages.lectura;
}

function worldIcon(worldId: string): string {
  if (worldId.includes("gramatica")) return "ABC";
  if (worldId.includes("ortografia")) return "á";
  if (worldId.includes("vocabulario")) return "★";
  if (worldId.includes("escritores")) return "✎";
  if (worldId.includes("oral")) return "♫";
  return "3º";
}

function statusLabel(status: ReturnType<typeof getWorldStatus>): string {
  if (status === "locked") return "Cerrado";
  if (status === "mastered") return "Completado";
  return "Jugar";
}

function getMapLockedText(world: World): string {
  const explanation = getLockedExplanation(world);
  if (explanation.includes("misión diaria")) return "Completa el primer mundo.";
  return explanation;
}
