import type {
  Activity,
  LearnerProgress,
  Mission,
  MissionAttempt,
  ParentSummary,
  SkillMastery,
  World
} from "./contentTypes";

const now = () => new Date().toISOString();

export function createInitialProgress(): LearnerProgress {
  const createdAt = now();

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`,
    displayName: "Angela",
    createdAt,
    lastSessionAt: createdAt,
    totalMinutes: 0,
    weeklyStreak: 0,
    currentWorldId: "puente-3-4",
    completedMissionIds: [],
    currency: { stars: 0, gems: 0, books: 0, wands: 0 },
    rewardInventory: {
      unlockedParts: [],
      maneColors: [],
      accessories: [],
      specialEffects: [],
      motivationalMessages: [],
      currencies: { stars: 0, gems: 0, books: 0, wands: 0 }
    },
    skillMastery: {},
    missionAttempts: []
  };
}

export function getMissionAttempt(progress: LearnerProgress, missionId: string): MissionAttempt | undefined {
  return progress.missionAttempts.find((attempt) => attempt.missionId === missionId);
}

export function isMissionCompleted(progress: LearnerProgress, missionId: string): boolean {
  return progress.completedMissionIds.includes(missionId);
}

export function getWorldStatus(world: World, progress: LearnerProgress): "locked" | "available" | "mastered" {
  const missionsCompleted = world.missionIds.length > 0 && world.missionIds.every((id) => isMissionCompleted(progress, id));

  if (missionsCompleted) {
    return "mastered";
  }

  if (world.unlockRule === "available-start") {
    return "available";
  }

  if (world.unlockRule.startsWith("complete:")) {
    const requiredMissionId = world.unlockRule.replace("complete:", "");
    return isMissionCompleted(progress, requiredMissionId) ? "available" : "locked";
  }

  return "locked";
}

export function getRecommendedWorld(worlds: World[], progress: LearnerProgress): World {
  return (
    worlds
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .find((world) => getWorldStatus(world, progress) === "available") ?? worlds[0]
  );
}

export function getRepeatedErrorRecommendations(
  progress: LearnerProgress,
  activities: Activity[],
  limit = 5
): Activity[] {
  const weakSkillIds = Object.values(progress.skillMastery)
    .filter((skill) => skill.attempts >= 2 && skill.correct / skill.attempts < 0.7)
    .sort((a, b) => b.recentMistakes.length - a.recentMistakes.length || a.correct / a.attempts - b.correct / b.attempts)
    .map((skill) => skill.skillId);

  const recommended: Activity[] = [];
  for (const skillId of weakSkillIds) {
    for (const activity of activities) {
      if (activity.skillId === skillId && !recommended.some((item) => item.id === activity.id)) {
        recommended.push(activity);
        if (recommended.length >= limit) return recommended;
      }
    }
  }

  return recommended;
}

export function updateSkillMastery(
  mastery: SkillMastery | undefined,
  activity: Activity,
  wasCorrect: boolean
): SkillMastery {
  const attempts = (mastery?.attempts ?? 0) + 1;
  const correct = (mastery?.correct ?? 0) + (wasCorrect ? 1 : 0);
  const accuracy = correct / attempts;
  const recentMistakes = wasCorrect
    ? mastery?.recentMistakes ?? []
    : [activity.prompt, ...(mastery?.recentMistakes ?? [])].slice(0, 5);

  return {
    skillId: activity.skillId,
    attempts,
    correct,
    recentMistakes,
    level: attempts >= 4 && accuracy >= 0.8 ? "dominado" : attempts >= 2 ? "practicando" : "nuevo",
    lastPracticedAt: now()
  };
}

export function summarizeForParents(
  progress: LearnerProgress,
  worlds: World[],
  activities: Activity[]
): ParentSummary {
  const worldLookup = new Map(worlds.map((world) => [world.id, world.title]));
  const activityLookup = new Map(activities.map((activity) => [activity.id, activity]));
  const byWorld: Record<string, { correct: number; total: number }> = {};

  for (const attempt of progress.missionAttempts) {
    for (const [activityId, answer] of Object.entries(attempt.answers)) {
      const activity = activityLookup.get(activityId);
      if (!activity) continue;

      const key = worldLookup.get(activity.worldId) ?? activity.worldId;
      byWorld[key] ??= { correct: 0, total: 0 };
      byWorld[key].total += 1;
      const correctAnswer = Array.isArray(activity.correctAnswer) ? activity.correctAnswer.join("|") : activity.correctAnswer;
      const submittedAnswer = Array.isArray(answer) ? answer.join("|") : answer;
      if (correctAnswer === submittedAnswer) byWorld[key].correct += 1;
    }
  }

  const accuracyByWorld = Object.fromEntries(
    Object.entries(byWorld).map(([world, stats]) => [world, Math.round((stats.correct / Math.max(stats.total, 1)) * 100)])
  );
  const mastery = Object.values(progress.skillMastery);
  const masteredTopics = mastery.filter((skill) => skill.level === "dominado").map((skill) => skill.skillId);
  const topicsToReinforce = mastery
    .filter((skill) => skill.attempts >= 1 && skill.correct / skill.attempts < 0.7)
    .map((skill) => skill.skillId);
  const frequentMistakes = mastery.flatMap((skill) => skill.recentMistakes).slice(0, 5);

  return {
    minutesThisWeek: progress.totalMinutes,
    completedMissions: progress.completedMissionIds.length,
    accuracyByWorld,
    frequentMistakes,
    masteredTopics,
    topicsToReinforce,
    recommendations:
      progress.completedMissionIds.length === 0
        ? ["Necesita completar una misión para recomendar el siguiente paso."]
        : topicsToReinforce.length > 0
          ? [`Reforzar ${topicsToReinforce[0]} con una misión corta.`]
          : ["Buen ritmo. La siguiente misión puede subir un poquito la dificultad."],
    lastUpdatedAt: now()
  };
}

export function completeMission(progress: LearnerProgress, mission: Mission, attempt: MissionAttempt): LearnerProgress {
  const completedMissionIds = progress.completedMissionIds.includes(mission.id)
    ? progress.completedMissionIds
    : [...progress.completedMissionIds, mission.id];

  return {
    ...progress,
    lastSessionAt: now(),
    totalMinutes: progress.totalMinutes + mission.estimatedMinutes,
    completedMissionIds,
    currency: {
      stars: progress.currency.stars + mission.reward.stars,
      gems: progress.currency.gems + mission.reward.gems,
      books: progress.currency.books + mission.reward.books,
      wands: progress.currency.wands + mission.reward.wands
    },
    rewardInventory: {
      ...progress.rewardInventory,
      unlockedParts: progress.rewardInventory.unlockedParts.includes(mission.reward.unicornPart)
        ? progress.rewardInventory.unlockedParts
        : [...progress.rewardInventory.unlockedParts, mission.reward.unicornPart],
      motivationalMessages: progress.rewardInventory.motivationalMessages.includes(mission.reward.message)
        ? progress.rewardInventory.motivationalMessages
        : [...progress.rewardInventory.motivationalMessages, mission.reward.message],
      currencies: {
        stars: progress.rewardInventory.currencies.stars + mission.reward.stars,
        gems: progress.rewardInventory.currencies.gems + mission.reward.gems,
        books: progress.rewardInventory.currencies.books + mission.reward.books,
        wands: progress.rewardInventory.currencies.wands + mission.reward.wands
      }
    },
    missionAttempts: [
      ...progress.missionAttempts.filter((item) => item.missionId !== mission.id),
      { ...attempt, completedAt: now() }
    ]
  };
}
