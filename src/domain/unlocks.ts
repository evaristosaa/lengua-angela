import type { LearnerProgress, Mission, World } from "./contentTypes";
import { getWorldStatus } from "./progress";

export function canCompleteMission(correct: number, mission: Mission): boolean {
  return correct >= mission.completionCriteria.minCorrect;
}

export function getUnlockedRewardParts(progress: LearnerProgress): string[] {
  return progress.rewardInventory.unlockedParts;
}

export function getLockedExplanation(world: World): string {
  if (world.unlockRule.startsWith("complete:")) {
    return "Completa primero la misión diaria del Puente de 3 a 4.";
  }

  return "Este mundo se desbloqueará más adelante.";
}

export function listAvailableWorlds(worlds: World[], progress: LearnerProgress): World[] {
  return worlds.filter((world) => getWorldStatus(world, progress) !== "locked");
}
