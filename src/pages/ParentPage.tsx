import { useRef, useState } from "react";
import type { Activity, LearnerProgress, World } from "../domain/contentTypes";
import { summarizeForParents } from "../domain/progress";
import { downloadProgress, parseProgressExport } from "../storage/progressExport";
import { resetProgress, saveProgress } from "../storage/localProgress";

interface ParentPageProps {
  worlds: World[];
  activities: Activity[];
  progress: LearnerProgress;
  onProgressChange: (progress: LearnerProgress) => void;
}

export default function ParentPage({ worlds, activities, progress, onProgressChange }: ParentPageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const summary = summarizeForParents(progress, worlds, activities);

  const importProgress = async (file?: File) => {
    if (!file) return;

    try {
      const imported = parseProgressExport(await file.text());
      saveProgress(imported);
      onProgressChange(imported);
      setMessage("Progreso importado correctamente.");
    } catch {
      setMessage("No he podido importar ese archivo de progreso.");
    }
  };

  const reset = () => {
    if (!window.confirm("¿Seguro que quieres borrar el progreso local?")) return;
    onProgressChange(resetProgress());
    setMessage("Progreso reiniciado.");
  };

  return (
    <div className="page parent-page">
      <section className="settings-board magic-board" aria-labelledby="settings-title">
        <div className="screen-title-card">
          <p className="eyebrow">Ajustes</p>
          <h1 id="settings-title">Ajustes</h1>
          <p>Progreso y copias.</p>
        </div>

        <section className="settings-summary" aria-label="Resumen de progreso">
          <div className="metric-grid">
            <div>
              <span>{summary.minutesThisWeek}</span>
              <p>minutos</p>
            </div>
            <div>
              <span>{summary.completedMissions}</span>
              <p>misiones</p>
            </div>
            <div>
              <span>{Object.values(summary.accuracyByWorld)[0] ?? 0}%</span>
              <p>acierto</p>
            </div>
          </div>
          <article className="recommendation-card">
            <p className="eyebrow">Siguiente paso</p>
            <h2>Recomendación</h2>
            <p>{summary.recommendations[0]}</p>
          </article>
        </section>

        <section className="tool-panel compact-tool-panel" aria-label="Copia de seguridad">
          <h2>Copia de seguridad</h2>
          <div className="action-row">
            <button type="button" onClick={() => downloadProgress(progress)}>Exportar</button>
            <button type="button" onClick={() => inputRef.current?.click()}>Importar</button>
            <button className="danger-action" type="button" onClick={reset}>Reiniciar</button>
          </div>
          <input
            ref={inputRef}
            hidden
            type="file"
            accept="application/json"
            onChange={(event) => importProgress(event.currentTarget.files?.[0])}
          />
          {message && <p className="status-message">{message}</p>}
        </section>

        {summary.frequentMistakes.length > 0 && (
          <div className="mistake-strip" aria-label="Fallos recientes">
            {summary.frequentMistakes.slice(0, 3).map((mistake) => (
              <span key={mistake}>{mistake}</span>
            ))}
          </div>
        )}
        <div className="settings-art" aria-hidden="true">
          <span>★</span>
          <span>✓</span>
          <span>◆</span>
        </div>
      </section>
    </div>
  );
}
