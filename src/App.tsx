import { useEffect, useMemo, useState } from "react";
import type { Activity, LearnerProgress, Mission, TextContent, World } from "./domain/contentTypes";
import { getRecommendedWorld } from "./domain/progress";
import { loadProgress, saveProgress } from "./storage/localProgress";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import MissionPage from "./pages/MissionPage";
import MissionsPage from "./pages/MissionsPage";
import ParentPage from "./pages/ParentPage";
import UnicornPage from "./pages/UnicornPage";
import worldsData from "./data/worlds.json";
import missionsData from "./data/missions.json";
import activitiesData from "./data/activities.json";
import textsData from "./data/texts.json";

export type Route =
  | { name: "home" }
  | { name: "missions" }
  | { name: "map" }
  | { name: "unicorn" }
  | { name: "mission"; missionId: string }
  | { name: "parents" };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [name, id] = hash.split("/");

  if (name === "missions") return { name: "missions" };
  if (name === "map") return { name: "map" };
  if (name === "unicorn") return { name: "unicorn" };
  if (name === "parents") return { name: "parents" };
  if (name === "mission" && id) return { name: "mission", missionId: id };
  return { name: "home" };
}

function routeToHash(route: Route): string {
  if (route.name === "home") return "#/";
  if (route.name === "missions") return "#/missions";
  if (route.name === "map") return "#/map";
  if (route.name === "unicorn") return "#/unicorn";
  if (route.name === "parents") return "#/parents";
  return `#/mission/${route.missionId}`;
}

export default function App() {
  const worlds = worldsData as World[];
  const missions = missionsData as Mission[];
  const activities = activitiesData as Activity[];
  const texts = textsData as TextContent[];
  const [route, setRoute] = useState<Route>(() => parseHash());
  const [progress, setProgress] = useState<LearnerProgress>(() => loadProgress());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) window.location.hash = "/";
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (nextRoute: Route) => {
    window.location.hash = routeToHash(nextRoute);
    setRoute(nextRoute);
  };

  const updateProgress = (nextProgress: LearnerProgress) => {
    saveProgress(nextProgress);
    setProgress(nextProgress);
  };

  const dailyMission = missions[0];
  const recommendedWorld = useMemo(() => getRecommendedWorld(worlds, progress), [worlds, progress]);
  const showGameChrome = route.name !== "home";

  return (
    <div className={showGameChrome ? "app-shell app-shell--with-game-chrome" : "app-shell"}>
      {showGameChrome && (
        <header className="topbar">
          <button className="home-round-button" type="button" onClick={() => navigate({ name: "home" })} aria-label="Inicio">
            ⌂
          </button>
          <div className="topbar-title">
            <strong>Angela y el Reino Arcoiris de las Palabras</strong>
          </div>
          <div className="topbar-score" aria-label="Progreso">
            <span>{progress.currency.stars} EXP</span>
            <span>{progress.currency.gems} gemas</span>
            <span>{progress.rewardInventory.unlockedParts.length} piezas</span>
          </div>
        </header>
      )}

      <main>
        {route.name === "home" && (
          <HomePage
            mission={dailyMission}
            progress={progress}
            recommendedWorld={recommendedWorld}
            onOpenMap={() => navigate({ name: "map" })}
            onOpenUnicorn={() => navigate({ name: "unicorn" })}
            onOpenParents={() => navigate({ name: "parents" })}
          />
        )}
        {route.name === "missions" && (
          <MissionsPage
            worlds={worlds}
            missions={missions}
            progress={progress}
            onOpenMission={(missionId) => navigate({ name: "mission", missionId })}
            onOpenMap={() => navigate({ name: "map" })}
          />
        )}
        {route.name === "map" && (
          <MapPage
            worlds={worlds}
            missions={missions}
            progress={progress}
            onOpenMission={(missionId) => navigate({ name: "mission", missionId })}
          />
        )}
        {route.name === "unicorn" && (
          <UnicornPage progress={progress} onStartMission={() => navigate({ name: "map" })} />
        )}
        {route.name === "mission" && (
          <MissionPage
            key={route.missionId}
            mission={missions.find((mission) => mission.id === route.missionId)}
            missions={missions}
            worlds={worlds}
            activities={activities}
            texts={texts}
            progress={progress}
            onProgressChange={updateProgress}
            onBackToMap={() => navigate({ name: "map" })}
            onOpenMission={(missionId) => navigate({ name: "mission", missionId })}
          />
        )}
        {route.name === "parents" && (
          <ParentPage
            worlds={worlds}
            activities={activities}
            progress={progress}
            onProgressChange={updateProgress}
          />
        )}
      </main>
      {showGameChrome && (
        <nav className="bottom-nav" aria-label="Navegación principal">
          <button className={route.name === "map" ? "is-active" : ""} type="button" onClick={() => navigate({ name: "map" })}>Mapa</button>
          <button className={route.name === "unicorn" ? "is-active" : ""} type="button" onClick={() => navigate({ name: "unicorn" })}>Unicornio</button>
          <button className={route.name === "parents" ? "is-active" : ""} type="button" onClick={() => navigate({ name: "parents" })}>Ajustes</button>
        </nav>
      )}
    </div>
  );
}
