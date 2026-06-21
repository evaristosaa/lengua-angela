import type { Activity, LearnerProgress, MissionAttempt } from "./contentTypes";
import { updateSkillMastery } from "./progress";

export interface AnswerResult {
  activityId: string;
  wasCorrect: boolean;
  explanation: string;
}

export function isCorrectAnswer(activity: Activity, answer: string | string[]): boolean {
  if (Array.isArray(activity.correctAnswer)) {
    return Array.isArray(answer) && activity.correctAnswer.join("|") === answer.join("|");
  }

  return activity.correctAnswer === answer;
}

export function applyAnswer(
  progress: LearnerProgress,
  activity: Activity,
  answer: string | string[]
): { progress: LearnerProgress; result: AnswerResult } {
  const wasCorrect = isCorrectAnswer(activity, answer);

  return {
    progress: {
      ...progress,
      skillMastery: {
        ...progress.skillMastery,
        [activity.skillId]: updateSkillMastery(progress.skillMastery[activity.skillId], activity, wasCorrect)
      }
    },
    result: {
      activityId: activity.id,
      wasCorrect,
      explanation: activity.explanation
    }
  };
}

export function scoreAttempt(attempt: MissionAttempt): { correct: number; total: number; percent: number } {
  const total = Math.max(attempt.total, 1);

  return {
    correct: attempt.correct,
    total: attempt.total,
    percent: Math.round((attempt.correct / total) * 100)
  };
}
