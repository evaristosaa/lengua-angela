import type { LearnerProgress } from "../domain/contentTypes";
import { createInitialProgress } from "../domain/progress";

const STORAGE_KEY = "repasa-lengua-angela-progress";

export function loadProgress(): LearnerProgress {
  if (typeof localStorage === "undefined") {
    return createInitialProgress();
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const progress = createInitialProgress();
    saveProgress(progress);
    return progress;
  }

  try {
    return JSON.parse(raw) as LearnerProgress;
  } catch {
    const progress = createInitialProgress();
    saveProgress(progress);
    return progress;
  }
}

export function saveProgress(progress: LearnerProgress): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): LearnerProgress {
  const progress = createInitialProgress();
  saveProgress(progress);
  return progress;
}
