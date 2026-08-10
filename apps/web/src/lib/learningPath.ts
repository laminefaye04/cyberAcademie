// ============================================================
// LEARNING PATH — orchestration pédagogique par niveau (spec §19)
//
// La roadmap mélange : COURSE → EXERCISE → NATIVE LAB →
// EXTERNAL LAB → QUIZ → REVIEW (Cyber Coach).
// Les trois types d'activités contribuent à la progression.
// ============================================================

import { getCourse } from "./courses";
import { LABS, type Lab } from "./labs";
import { EXTERNAL_LABS, type ExternalLab } from "./externalLabs";
import { V1_LEVELS, type RoadmapLevel } from "./roadmap";

export type LearningPathKind =
  | "course"
  | "exercise"
  | "quiz"
  | "native_lab"
  | "external_lab"
  | "review";

export interface LearningPathItem {
  kind: LearningPathKind;
  title: string;
  subtitle: string;
  duration: string;
  href?: string;
  externalUrl?: string;
  xp: number;
  lab?: Lab;
  externalLab?: ExternalLab;
}

const EXERCISE_XP = 50;
const QUIZ_XP = 100;

export function getLearningPath(levelId: number): LearningPathItem[] {
  const items: LearningPathItem[] = [];
  const course = getCourse(levelId);

  if (course) {
    items.push({
      kind: "course",
      title: course.title,
      subtitle: course.description,
      duration: "Cours interactif",
      href: `/courses/${course.id}`,
      xp: course.xp,
    });

    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.type === "exercise") {
          items.push({
            kind: "exercise",
            title: lesson.title,
            subtitle: `Exercice — ${module.title}`,
            duration: lesson.duration,
            href: `/courses/${course.id}`,
            xp: EXERCISE_XP,
          });
        }
      }
    }
  }

  for (const lab of LABS.filter((l) => l.levelId === levelId)) {
    items.push({
      kind: "native_lab",
      title: lab.title,
      subtitle: lab.description,
      duration: lab.duration,
      href: `/labs/${lab.slug}`,
      xp: lab.xp,
      lab,
    });
  }

  for (const lab of EXTERNAL_LABS.filter((l) => l.levelId === levelId)) {
    items.push({
      kind: "external_lab",
      title: lab.title,
      subtitle: `${lab.platform} — ${lab.description}`,
      duration: lab.duration,
      href: `/labs/${lab.slug}`,
      externalUrl: lab.externalUrl,
      xp: lab.xp,
      externalLab: lab,
    });
  }

  if (course) {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.type === "quiz") {
          items.push({
            kind: "quiz",
            title: lesson.title,
            subtitle: `Quiz de validation — ${module.title}`,
            duration: lesson.duration,
            href: `/courses/${course.id}`,
            xp: QUIZ_XP,
          });
        }
      }
    }
  }

  items.push({
    kind: "review",
    title: "Révision guidée — Cyber Coach",
    subtitle:
      "Discussion avec le Cyber Coach pour consolider tes acquis et savoir quoi faire ensuite.",
    duration: "10 min",
    href: "/mentor",
    xp: 0,
  });

  return items;
}

export interface NextActivity {
  level: RoadmapLevel;
  item: LearningPathItem;
}

export function getNextRecommendedActivity(
  completedNative: string[],
  completedExternal: string[]
): NextActivity | undefined {
  const nativeDone = new Set(completedNative);
  const externalDone = new Set(completedExternal);

  for (const level of V1_LEVELS) {
    const items = getLearningPath(level.id);
    const actionable = items.filter(
      (item) =>
        item.kind === "native_lab" ||
        item.kind === "external_lab" ||
        item.kind === "quiz"
    );
    for (const item of actionable) {
      const done =
        item.kind === "native_lab" && item.lab
          ? item.lab.completed || nativeDone.has(item.lab.id)
          : item.kind === "external_lab" && item.externalLab
            ? externalDone.has(item.externalLab.id)
            : false;
      if (!done) return { level, item };
    }
  }

  return undefined;
}
