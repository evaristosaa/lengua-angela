export type WorldStatus = "locked" | "available" | "mastered";

export type ActivityType =
  | "multiple-choice"
  | "classify"
  | "order"
  | "fill-gap"
  | "detect-error"
  | "writing-prompt"
  | "oral-prompt"
  | "minigame";

export interface World {
  id: string;
  title: string;
  theme: string;
  description: string;
  priority: number;
  unlockRule: string;
  rewardPart: string;
  missionIds: string[];
  recommendedGradeFocus: string;
}

export interface MissionReward {
  stars: number;
  gems: number;
  books: number;
  wands: number;
  unicornPart: string;
  message: string;
}

export interface Mission {
  id: string;
  worldId: string;
  title: string;
  storyIntro: string;
  goal: string;
  estimatedMinutes: number;
  activityIds: string[];
  minigameType: string;
  reward: MissionReward;
  completionCriteria: {
    minCorrect: number;
  };
}

export interface ActivityOption {
  id: string;
  label: string;
}

export interface Activity {
  id: string;
  worldId: string;
  skillId: string;
  type: ActivityType;
  prompt: string;
  options?: ActivityOption[];
  correctAnswer?: string | string[];
  explanation: string;
  difficulty: 1 | 2 | 3;
  textContentId?: string;
  tags: string[];
}

export interface TextContent {
  id: string;
  type: "cuento" | "fabula" | "poesia" | "teatro" | "informativo";
  title: string;
  body: string;
  sourceNote: string;
  estimatedReadingLevel: string;
  questionIds: string[];
}

export interface SkillMastery {
  skillId: string;
  attempts: number;
  correct: number;
  recentMistakes: string[];
  level: "nuevo" | "practicando" | "dominado";
  lastPracticedAt: string;
}

export interface CurrencyState {
  stars: number;
  gems: number;
  books: number;
  wands: number;
}

export interface MissionAttempt {
  missionId: string;
  startedAt: string;
  completedAt?: string;
  correct: number;
  total: number;
  answers: Record<string, string | string[]>;
}

export interface RewardInventory {
  unlockedParts: string[];
  maneColors: string[];
  accessories: string[];
  specialEffects: string[];
  motivationalMessages: string[];
  currencies: CurrencyState;
}

export interface LearnerProgress {
  id: string;
  displayName: string;
  createdAt: string;
  lastSessionAt: string;
  totalMinutes: number;
  weeklyStreak: number;
  currentWorldId: string;
  completedMissionIds: string[];
  currency: CurrencyState;
  rewardInventory: RewardInventory;
  skillMastery: Record<string, SkillMastery>;
  missionAttempts: MissionAttempt[];
}

export interface ParentSummary {
  minutesThisWeek: number;
  completedMissions: number;
  accuracyByWorld: Record<string, number>;
  frequentMistakes: string[];
  masteredTopics: string[];
  topicsToReinforce: string[];
  recommendations: string[];
  lastUpdatedAt: string;
}
