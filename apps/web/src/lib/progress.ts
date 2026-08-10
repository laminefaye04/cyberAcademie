import { ROADMAP_LEVELS, V1_LEVEL_IDS, V1_LEVELS } from "./roadmap";
import { DEMO_USER } from "./mock";
import { LABS } from "./labs";

export const RANK_TITLES: string[] = [
  "Novice",
  "Shell Apprentice",
  "Network Explorer",
  "Automator",
  "Web Explorer",
  "OWASP Hunter",
  "Pentester Junior",
  "CTF Player",
  "Bug Hunter",
  "AD Engineer",
  "Red Teamer",
  "Cloud Knight",
];

export const CAREER_GOAL = "Junior Pentester";

export function getRankTitle(level: number): string {
  return RANK_TITLES[level] ?? "Cloud Knight";
}

function getV1CompletedLevels(): number[] {
  return DEMO_USER.completedLevels.filter((id) => V1_LEVEL_IDS.has(id));
}

export function getCompletedLevelsCount(): number {
  return getV1CompletedLevels().length;
}

export function getTotalLevels(): number {
  return V1_LEVELS.length;
}

export function getGlobalProgressPct(): number {
  return Math.round(
    (getV1CompletedLevels().length / V1_LEVELS.length) * 100
  );
}

export function getCareerProgressPct(): number {
  return Math.round(
    (getV1CompletedLevels().length / (V1_LEVELS.length + 1)) * 100
  );
}

export function getLabsStats(): { done: number; total: number; xp: number } {
  const done = LABS.filter((lab) => lab.completed);
  return {
    done: done.length,
    total: LABS.length,
    xp: done.reduce((sum, lab) => sum + lab.xp, 0),
  };
}

export function getMasteredSkills(): string[] {
  return getV1CompletedLevels().flatMap(
    (id) => ROADMAP_LEVELS[id]?.skills ?? []
  );
}

export function getCurrentLevel(): (typeof ROADMAP_LEVELS)[number] | undefined {
  return ROADMAP_LEVELS[DEMO_USER.level];
}
