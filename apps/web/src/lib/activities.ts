// ============================================================
// LEARNING ACTIVITY — abstraction commune (spec §2)
//
// Une LearningActivity regroupe tous les éléments de la boucle
// pédagogique : cours, exercice, quiz, native lab, external lab.
// Le frontend affiche les deux types de labs dans une même
// roadmap, sans changer de système pour l'utilisateur.
// ============================================================

import { LABS, type Lab } from "./labs";
import { EXTERNAL_LABS, type ExternalLab } from "./externalLabs";

export type ActivityType =
  | "course"
  | "exercise"
  | "quiz"
  | "native_lab"
  | "external_lab";

export type LabHost = "native" | "external";

export interface LabActivity {
  id: string;
  slug: string;
  title: string;
  host: LabHost;
  levelId: number;
  difficulty: "facile" | "intermédiaire" | "avancé";
  duration: string;
  xp: number;
  skills: string[];
  why: string;
}

export type LearningActivity = Lab;

export const ACTIVITIES: Lab[] = [...LABS];

export const ALL_LAB_ACTIVITIES: LabActivity[] = [
  ...LABS.map((lab) => ({
    id: lab.id,
    slug: lab.slug,
    title: lab.title,
    host: "native" as const,
    levelId: lab.levelId,
    difficulty: lab.difficulty,
    duration: lab.duration,
    xp: lab.xp,
    skills: lab.skills,
    why: lab.why,
  })),
  ...EXTERNAL_LABS.map((lab) => ({
    id: lab.id,
    slug: lab.slug,
    title: lab.title,
    host: "external" as const,
    levelId: lab.levelId,
    difficulty: lab.difficulty,
    duration: lab.duration,
    xp: lab.xp,
    skills: lab.skills,
    why: lab.why,
  })),
];

export function getActivityBySlug(slug: string): Lab | ExternalLab | undefined {
  return getLabBySlug(slug) ?? getExternalLabBySlug(slug);
}

export function getLabBySlug(slug: string): Lab | undefined {
  return LABS.find((lab) => lab.slug === slug);
}

export function getExternalLabBySlug(slug: string): ExternalLab | undefined {
  return EXTERNAL_LABS.find((lab) => lab.slug === slug);
}

export function isExternalLab(
  activity: Lab | ExternalLab
): activity is ExternalLab {
  return activity.host === "external";
}
