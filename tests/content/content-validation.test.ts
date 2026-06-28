import { describe, expect, it } from "vitest";
import worlds from "../../src/data/worlds.json";
import missions from "../../src/data/missions.json";
import activities from "../../src/data/activities.json";
import texts from "../../src/data/texts.json";
import type { Activity, Mission, TextContent, World } from "../../src/domain/contentTypes";

const worldList = worlds as World[];
const missionList = missions as Mission[];
const activityList = activities as Activity[];
const textList = texts as TextContent[];

describe("content integrity", () => {
  it("contains the MVP activity bank for 4th grade practice", () => {
    const byWorld = new Map<string, number>();
    for (const activity of activityList) {
      byWorld.set(activity.worldId, (byWorld.get(activity.worldId) ?? 0) + 1);
    }

    expect(activityList.length).toBeGreaterThanOrEqual(60);
    expect(textList.length).toBeGreaterThanOrEqual(6);
    expect(byWorld.get("ortografia")).toBeGreaterThanOrEqual(16);
    expect(byWorld.get("gramatica")).toBeGreaterThanOrEqual(16);
    expect(byWorld.get("comprension")).toBeGreaterThanOrEqual(16);
  });

  it("keeps mission references valid", () => {
    const worldIds = new Set(worldList.map((world) => world.id));
    const activityIds = new Set(activityList.map((activity) => activity.id));
    const missionIds = new Set(missionList.map((mission) => mission.id));

    for (const world of worldList) {
      for (const missionId of world.missionIds) {
        expect(missionIds.has(missionId), `${world.id} -> ${missionId}`).toBe(true);
      }
    }

    for (const mission of missionList) {
      expect(worldIds.has(mission.worldId), mission.id).toBe(true);
      expect(mission.activityIds.length, mission.id).toBeGreaterThan(0);
      for (const activityId of mission.activityIds) {
        expect(activityIds.has(activityId), `${mission.id} -> ${activityId}`).toBe(true);
      }
    }
  });

  it("keeps activity references valid and useful", () => {
    const worldIds = new Set(worldList.map((world) => world.id));
    const textIds = new Set(textList.map((text) => text.id));

    for (const activity of activityList) {
      expect(worldIds.has(activity.worldId), activity.id).toBe(true);
      expect(activity.skillId.length, activity.id).toBeGreaterThan(0);
      expect(activity.explanation.length, activity.id).toBeGreaterThan(12);

      if (activity.type === "multiple-choice") {
        expect(activity.options?.length, activity.id).toBeGreaterThanOrEqual(2);
        expect(activity.correctAnswer, activity.id).toBeTruthy();
      }

      if (activity.textContentId) {
        expect(textIds.has(activity.textContentId), activity.id).toBe(true);
      }
    }
  });
});
