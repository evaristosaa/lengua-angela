import type { ParentSummary as ParentSummaryModel } from "../domain/contentTypes";

interface ParentSummaryProps {
  summary: ParentSummaryModel;
}

export default function ParentSummary({ summary }: ParentSummaryProps) {
  return (
    <section className="parent-summary" aria-labelledby="parent-summary-title">
      <h2 id="parent-summary-title">Resumen rápido</h2>
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
      <h3>Recomendación</h3>
      <p>{summary.recommendations[0]}</p>
      {summary.frequentMistakes.length > 0 && (
        <>
          <h3>Fallos recientes</h3>
          <ul>
            {summary.frequentMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
