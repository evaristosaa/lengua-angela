import { useMemo, useState } from "react";
import AngelaGuide from "../components/AngelaGuide";
import UnicornProgress from "../components/UnicornProgress";
import { angelaImages } from "../assets/angelaAssets";
import type { Activity, LearnerProgress, Mission, MissionAttempt, TextContent, World } from "../domain/contentTypes";
import { applyAnswer, isCorrectAnswer, scoreAttempt } from "../domain/scoring";
import { canCompleteMission } from "../domain/unlocks";
import { completeMission, getMissionAttempt, getWorldStatus } from "../domain/progress";

interface MissionPageProps {
  mission?: Mission;
  missions: Mission[];
  worlds: World[];
  activities: Activity[];
  texts: TextContent[];
  progress: LearnerProgress;
  onProgressChange: (progress: LearnerProgress) => void;
  onBackToMap: () => void;
  onOpenMission: (missionId: string) => void;
}

export default function MissionPage({
  mission,
  missions,
  worlds,
  activities,
  texts,
  progress,
  onProgressChange,
  onBackToMap,
  onOpenMission
}: MissionPageProps) {
  const missionActivities = useMemo(
    () => mission?.activityIds.map((id) => activities.find((activity) => activity.id === id)).filter(Boolean) as Activity[] ?? [],
    [activities, mission]
  );
  const savedAttempt = mission ? getMissionAttempt(progress, mission.id) : undefined;
  const shouldResume = Boolean(savedAttempt && !savedAttempt.completedAt);
  const initialAnswers = shouldResume ? savedAttempt?.answers ?? {} : {};
  const initialStep = getResumeStep(missionActivities, initialAnswers);
  const [step, setStep] = useState(initialStep);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(initialAnswers);
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
  const storyTitle = activity?.storyTitle ?? text?.title;
  const storyBody = activity?.storyBody ?? text?.body;
  const currentWorld = worlds.find((world) => world.id === mission.worldId);
  const nextWorld = getNextAvailableWorld(worlds, mission, localProgress);
  const nextMission = nextWorld?.missionIds
    .map((id) => missions.find((item) => item.id === id))
    .find(Boolean);

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

  const saveMissionDraft = (nextProgress: LearnerProgress, nextAnswers: Record<string, string | string[]>): LearnerProgress => {
    const attempt: MissionAttempt = {
      missionId: mission.id,
      startedAt: savedAttempt?.startedAt ?? new Date().toISOString(),
      correct: missionActivities.reduce((count, item) => {
        const answer = nextAnswers[item.id];
        return answer && isCorrectAnswer(item, answer) ? count + 1 : count;
      }, 0),
      total: missionActivities.length,
      answers: nextAnswers
    };

    return {
      ...nextProgress,
      lastSessionAt: new Date().toISOString(),
      currentWorldId: mission.worldId,
      missionAttempts: [...nextProgress.missionAttempts.filter((item) => item.missionId !== mission.id), attempt]
    };
  };

  const chooseAnswer = (answer: string | string[]) => {
    if (!activity) return;

    const nextAnswers = { ...answers, [activity.id]: answer };
    const result = applyAnswer(localProgress, activity, answer);
    const nextProgress = saveMissionDraft(result.progress, nextAnswers);
    setAnswers(nextAnswers);
    setLocalProgress(nextProgress);
    onProgressChange(nextProgress);
    setFeedback({ correct: result.result.wasCorrect, text: result.result.explanation });
  };

  const chooseOrderItem = (optionId: string) => {
    if (!activity || feedback) return;

    const currentAnswer = Array.isArray(answers[activity.id]) ? answers[activity.id] as string[] : [];
    if (currentAnswer.includes(optionId)) return;

    const nextAnswer = [...currentAnswer, optionId];
    if (nextAnswer.length >= (activity.options?.length ?? 0)) {
      chooseAnswer(nextAnswer);
      return;
    }

    setAnswers({ ...answers, [activity.id]: nextAnswer });
  };

  const clearOrderAnswer = () => {
    if (!activity || feedback) return;

    const { [activity.id]: _removed, ...remainingAnswers } = answers;
    setAnswers(remainingAnswers);
  };

  const restartMission = () => {
    const nextProgress = {
      ...localProgress,
      missionAttempts: localProgress.missionAttempts.filter((item) => item.missionId !== mission.id)
    };
    setStep(0);
    setAnswers({});
    setFeedback(null);
    setCompletedAttempt(null);
    setLocalProgress(nextProgress);
    onProgressChange(nextProgress);
  };

  const continueMission = () => {
    setFeedback(null);
    if (step >= missionActivities.length - 1) {
      finishMission(localProgress, answers);
      return;
    }

    setStep((current) => current + 1);
  };

  const renderChallengeDot = (item: Activity, index: number) => {
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
        {isAnswered ? (isCorrect ? "✓" : "×") : ""}
      </span>
    );
  };

  if (completedAttempt) {
    const score = scoreAttempt(completedAttempt);
    const unlocked = canCompleteMission(completedAttempt.correct, mission);

    return (
      <div className="page mission-page mission-page--result">
        <AngelaGuide
          state={unlocked ? "recompensa" : "pensativa"}
          variant="compact"
          title={unlocked ? `${currentWorld?.title ?? "Mundo"} completado` : "Casi lo tenemos"}
          message={
            unlocked
              ? `${mission.reward.message} Angela ya puede seguir el camino del Reino Arcoiris.`
              : "Angela necesita reforzar esta parte antes de abrir el siguiente camino."
          }
        />
        <section className="result-panel">
          <h1>Resultado</h1>
          <p>{score.correct} de {score.total} respuestas correctas · {score.percent}% · {mission.reward.stars} EXP y {mission.reward.gems} gemas</p>
          <div className="action-row">
            <button type="button" onClick={restartMission}>Repetir misión</button>
            <button className="primary-action" type="button" onClick={onBackToMap}>Volver al mapa</button>
            {unlocked && nextMission && (
              <button className="primary-action" type="button" onClick={() => onOpenMission(nextMission.id)}>
                Viajar a {nextWorld?.title}
              </button>
            )}
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
          <img src={angelaImages[text || activity.storyBody ? "lectura" : "detective"]} alt="" />
        </div>
        <div className="mission-brief-copy">
          {storyTitle && storyBody && (
            <div className="mission-support-box">
              <strong>{storyTitle}</strong>
              <p>{storyBody}</p>
            </div>
          )}
        </div>
      </section>

      <section className={feedback ? "activity-panel activity-panel--answered" : "activity-panel"}>
        <h1>{activity.prompt}</h1>
        {activity.type === "order" ? (
          <div className="order-challenge">
            <div className="order-target" aria-label="Orden elegido">
              {activity.options?.map((option, index) => {
                const currentAnswer = Array.isArray(answers[activity.id]) ? answers[activity.id] as string[] : [];
                const selectedIndex = currentAnswer.indexOf(option.id);

                return (
                  <span className={selectedIndex >= 0 ? "order-slot order-slot--filled" : "order-slot"} key={option.id}>
                    {selectedIndex >= 0 ? `${selectedIndex + 1}. ${option.label}` : `${index + 1}`}
                  </span>
                );
              })}
            </div>
            <div className="option-list option-list--chips">
              {activity.options?.map((option) => {
                const currentAnswer = Array.isArray(answers[activity.id]) ? answers[activity.id] as string[] : [];
                const selected = currentAnswer.includes(option.id);

                return (
                  <button
                    className={selected ? "option option--selected" : "option"}
                    key={option.id}
                    type="button"
                    onClick={() => chooseOrderItem(option.id)}
                    disabled={Boolean(feedback) || selected}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <button className="secondary-action compact-action" type="button" onClick={clearOrderAnswer} disabled={Boolean(feedback)}>
              Borrar orden
            </button>
          </div>
        ) : (
          <div className={`option-list option-list--${activity.type}`}>
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
        )}
        <div className="progress-line" aria-label={`${correctCount} aciertos de ${answeredCount} retos respondidos`}>
          <div className="challenge-track challenge-track--left">
            {missionActivities.slice(0, 10).map((item, index) => renderChallengeDot(item, index))}
          </div>
          <span className="challenge-center">Reto {step + 1}/{missionActivities.length}</span>
          <div className="challenge-track challenge-track--right">
            {missionActivities.slice(10).map((item, index) => renderChallengeDot(item, index + 10))}
          </div>
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

function getResumeStep(missionActivities: Activity[], answers: Record<string, string | string[]>): number {
  const nextIndex = missionActivities.findIndex((activity) => !answers[activity.id]);
  return nextIndex >= 0 ? nextIndex : 0;
}

function getNextAvailableWorld(worlds: World[], mission: Mission, progress: LearnerProgress): World | undefined {
  const currentWorld = worlds.find((world) => world.id === mission.worldId);
  if (!currentWorld) return undefined;

  return worlds
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .find((world) => world.priority > currentWorld.priority && getWorldStatus(world, progress) !== "locked");
}
