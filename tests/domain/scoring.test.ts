import { describe, expect, it } from "vitest";
import activities from "../../src/data/activities.json";
import type { Activity } from "../../src/domain/contentTypes";
import { createInitialProgress } from "../../src/domain/progress";
import { applyAnswer, isCorrectAnswer } from "../../src/domain/scoring";

const activity = (activities as Activity[])[0];

describe("scoring", () => {
  it("detects correct and wrong answers", () => {
    expect(isCorrectAnswer(activity, "a")).toBe(true);
    expect(isCorrectAnswer(activity, "b")).toBe(false);
  });

  it("updates skill mastery after an answer", () => {
    const result = applyAnswer(createInitialProgress(), activity, "a");
    const mastery = result.progress.skillMastery[activity.skillId];

    expect(result.result.wasCorrect).toBe(true);
    expect(mastery.attempts).toBe(1);
    expect(mastery.correct).toBe(1);
  });
});
