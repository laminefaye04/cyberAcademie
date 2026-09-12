"use client";

import { cn } from "@/lib/utils";

export type DifficultyLevel = "facile" | "intermédiaire" | "avancé";

const DIFFICULTY_META: Record<DifficultyLevel, { label: string; className: string }> = {
  facile: {
    label: "Facile",
    className: "border-success/30 bg-success/10 text-success",
  },
  "intermédiaire": {
    label: "Intermédiaire",
    className: "border-warning/30 bg-warning/10 text-warning",
  },
  avancé: {
    label: "Avancé",
    className: "border-danger/30 bg-danger/10 text-danger",
  },
};

function starsToLevel(stars: number): DifficultyLevel {
  if (stars <= 2) return "facile";
  if (stars === 3) return "intermédiaire";
  return "avancé";
}

function normalizeDifficulty(value: string): DifficultyLevel {
  const v = value.toLowerCase().replace(/-/g, " ").trim();
  if (v.includes("avanc") || v.includes("difficile") || v.includes("expert")) {
    return "avancé";
  }
  if (v.includes("interm") || v.includes("moy")) return "intermédiaire";
  return "facile";
}

export type DifficultyProps = {
  difficulty?: string;
  stars?: number;
  className?: string;
};

export function DifficultyBadge({ difficulty, stars, className }: DifficultyProps) {
  const level =
    typeof stars === "number" ? starsToLevel(stars) : normalizeDifficulty(difficulty ?? "facile");
  const meta = DIFFICULTY_META[level];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide",
        meta.className,
        className
      )}
    >
      {meta.label}
    </span>
  );
}
