import { useMemo, useState } from "react";
import AngelaGuide from "../components/AngelaGuide";
import UnicornProgress from "../components/UnicornProgress";
import { angelaImages } from "../assets/angelaAssets";
import type { Activity, LearnerProgress, Mission, MissionAttempt, TextContent } from "../domain/contentTypes";
import { applyAnswer, isCorrectAnswer, scoreAttempt } from "../domain/scoring";
import { canCompleteMission } from "../domain/unlocks";
import { completeMission } from "../domain/progress";

interface MissionPageProps {
  mission?: Mission;
  activities: Activity[];
  texts: TextContent[];
  progress: LearnerProgress;
  onProgressChange: (progress: LearnerProgress) => void;
  onBackToMap: () => void;
}

export default function MissionPage({
  mission,
  activities,
  texts,
  progress,
  onProgressChange,
  onBackToMap
}: MissionPageProps) {
  const missionActivities = useMemo(
    () => mission?.activityIds.map((id) => activities.find((activity) => activity.id === id)).filter(Boolean) as Activity[] ?? [],
    [activities, mission]
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [localProgress, setLocalProgress] = useState(progress);
  const [completedAttempt, setCompletedAttempt] = useState<MissionAttempt | null>(null);

  if (!mission) {
    return (
      <div className="page">
        <AngelaGuide state="pensativa" title="Misión no encontrada" message="Volvemos al mapa para elegir otra aventura." />
        <button type="button" onClick={onBackToMap}>Volver al mapa</button>
      </div>
    );
  }

  const activity = missionActivities[step];
  const text = activity?.textContentId ? texts.find((item) => item.id === activity.textContentId) : undefined;

  const correctCount = missionActivities.reduce((count, item) => {
    const answer = answers[item.id];
    return answer && isCorrectAnswer(item, answer) ? count + 1 : count;
  }, 0);
  const answeredCount = Object.keys(answers).length;

  const finishMission = (nextProgress: LearnerProgress, nextAnswers: Record<string, string | string[]>) => {
    const attempt: MissionAttempt = {
      missionId: mission.id,
      startedAt: new Date().toISOString(),
      correct: missionActivities.reduce((count, item) => {
        const answer = nextAnswers[item.id];
        return answer && isCorrectAnswer(item, answer) ? count + 1 : count;
      }, 0),
      total: missionActivities.length,
      answers: nextAnswers
    };

    const completedProgress = canCompleteMission(attempt.correct, mission)
      ? completeMission(nextProgress, mission, attempt)
      : {
          ...nextProgress,
          missionAttempts: [...nextProgress.missionAttempts.filter((item) => item.missionId !== mission.id), attempt]
        };

    setCompletedAttempt(attempt);
    setLocalProgress(completedProgress);
    onProgressChange(completedProgress);
  };

  const chooseAnswer = (answer: string) => {
    if (!activity) return;

    const nextAnswers = { ...answers, [activity.id]: answer };
    const result = applyAnswer(localProgress, activity, answer);
    setAnswers(nextAnswers);
    setLocalProgress(result.progress);
    setFeedback({ correct: result.result.wasCorrect, text: result.result.explanation });
  };

  const continueMission = () => {
    setFeedback(null);
    if (step >= missionActivities.length - 1) {
      finishMission(localProgress, answers);
      return;
    }

    setStep((current) => current + 1);
  };

  if (completedAttempt) {
    const score = scoreAttempt(completedAttempt);
    const unlocked = canCompleteMission(completedAttempt.correct, mission);

    return (
      <div className="page mission-page">
        <AngelaGuide
          state={unlocked ? "recompensa" : "pensativa"}
          variant="hero"
          title={unlocked ? "¡Misión completada!" : "Casi lo tenemos"}
          message={
            unlocked
              ? `${mission.reward.message} Has conseguido ${mission.reward.stars} EXP y ${mission.reward.gems} gemas.`
              : "Puedes repetir la misión para conseguir la recompensa del unicornio."
          }
        />
        <section className="result-panel">
          <h1>Resultado</h1>
          <p>{score.correct} de {score.total} respuestas correctas · {score.percent}%</p>
          <div className="action-row">
            <button type="button" onClick={() => window.location.reload()}>Repetir misión</button>
            <button className="primary-action" type="button" onClick={onBackToMap}>Volver al mapa</button>
          </div>
        </section>
        <UnicornProgress progress={localProgress} />
      </div>
    );
  }

  return (
    <div className="page mission-page">
      <section className="mission-brief" aria-label={mission.title}>
        <div className="angela-portrait" aria-hidden="true">
          <img src={angelaImages[text ? "lectura" : "detective"]} alt="" />
        </div>
        <div className="mission-brief-copy">
          {text && (
            <div className="mission-support-box">
              <strong>{text.title}</strong>
              <p>{text.body}</p>
            </div>
          )}
        </div>
      </section>

      <section className={feedback ? "activity-panel activity-panel--answered" : "activity-panel"}>
        <div className="progress-line">
          <span>Reto {step + 1} de {missionActivities.length}</span>
          <div className="challenge-track" aria-label={`${correctCount} aciertos de ${answeredCount} retos respondidos`}>
            {missionActivities.map((item, index) => {
              const answer = answers[item.id];
              const isAnswered = Boolean(answer);
              const isCorrect = isAnswered && isCorrectAnswer(item, answer);

              return (
                <span
                  className={[
                    "challenge-dot",
                    index === step ? "challenge-dot--current" : "",
                    isAnswered && isCorrect ? "challenge-dot--correct" : "",
                    isAnswered && !isCorrect ? "challenge-dot--wrong" : ""
                  ].filter(Boolean).join(" ")}
                  key={item.id}
                  aria-label={`Reto ${index + 1}${isAnswered ? (isCorrect ? ": correcto" : ": incorrecto") : ""}`}
                >
                  {isAnswered ? (isCorrect ? "✓" : "×") : index + 1}
                </span>
              );
            })}
          </div>
        </div>
        <h1>{activity.prompt}</h1>
        <div className="option-list">
          {activity.options?.map((option) => (
            <button
              className={answers[activity.id] === option.id ? "option option--selected" : "option"}
              key={option.id}
              type="button"
              onClick={() => chooseAnswer(option.id)}
              disabled={Boolean(feedback)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {feedback && (
          <div className="feedback-popover" role="dialog" aria-modal="true" aria-live="polite">
            <div className={feedback.correct ? "feedback feedback--correct" : "feedback feedback--wrong"}>
              <strong>{feedback.correct ? "¡Correcto!" : "Pista para la próxima:"}</strong>
              <p>{feedback.text}</p>
              <button className="primary-action" type="button" onClick={continueMission}>
                {step >= missionActivities.length - 1 ? "Ver recompensa" : "Siguiente reto"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
