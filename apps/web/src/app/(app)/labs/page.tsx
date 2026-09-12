"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Crosshair,
  FlaskConical,
  Globe,
  Layers,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LABS, LAB_TYPE_LABELS, type LabType } from "@/lib/labs";
import { EXTERNAL_LABS, EXTERNAL_PLATFORM_INFO } from "@/lib/externalLabs";
import { ROADMAP_LEVELS, type RoadmapLevel } from "@/lib/roadmap";
import {
  getCompletedLabIds,
  getCompletedExternalLabIds,
  isExternalLabStarted,
  isNativeLabCompleted,
  isExternalLabVerified,
} from "@/lib/labProgress";
import { cn } from "@/lib/utils";

type HostFilter = "all" | "native" | "external";
type CategoryFilter = LabType | "all";
type DifficultyFilter = "all" | "facile" | "intermédiaire";

interface ActivityCardData {
  id: string;
  slug: string;
  title: string;
  description: string;
  host: "native" | "external";
  category: LabType;
  platform?: string;
  difficulty: string;
  duration: string;
  skills: string[];
  xp: number;
  levelId: number;
  completedFlag: boolean;
}

type ActivityStatus = "locked" | "available" | "in-progress" | "completed";

const HOST_FILTERS: { value: HostFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "native", label: "CyberAcademy" },
  { value: "external", label: "Externes" },
];

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Toutes catégories" },
  { value: "linux", label: "Linux" },
  { value: "network", label: "Réseau" },
  { value: "web", label: "Web" },
];

const DIFFICULTY_FILTERS: { value: DifficultyFilter; label: string }[] = [
  { value: "all", label: "Toutes difficultés" },
  { value: "facile", label: "Facile" },
  { value: "intermédiaire", label: "Intermédiaire" },
];

const ACTIVITIES: ActivityCardData[] = [
  ...LABS.map((lab) => ({
    id: lab.id,
    slug: lab.slug,
    title: lab.title,
    description: lab.description,
    host: "native" as const,
    category: lab.type,
    difficulty: lab.difficulty,
    duration: lab.duration,
    skills: lab.skills,
    xp: lab.xp,
    levelId: lab.levelId,
    completedFlag: lab.completed,
  })),
  ...EXTERNAL_LABS.map((lab) => ({
    id: lab.id,
    slug: lab.slug,
    title: lab.title,
    description: lab.description,
    host: "external" as const,
    category: lab.category,
    platform: lab.platform,
    difficulty: lab.difficulty,
    duration: lab.duration,
    skills: lab.skills,
    xp: lab.xp,
    levelId: lab.levelId,
    completedFlag: false,
  })),
];

function isActivityCompleted(activity: ActivityCardData): boolean {
  return activity.host === "external"
    ? isExternalLabVerified(activity.id)
    : activity.completedFlag || isNativeLabCompleted(activity.id);
}

function difficultyStars(difficulty: string): number {
  if (difficulty === "facile") return 2;
  if (difficulty === "intermédiaire") return 3;
  return 4;
}

function computeStatuses(
  activities: ActivityCardData[]
): Map<string, ActivityStatus> {
  const map = new Map<string, ActivityStatus>();
  for (const activity of activities) {
    if (isActivityCompleted(activity)) {
      map.set(activity.id, "completed");
      continue;
    }
    const started =
      activity.host === "external" && isExternalLabStarted(activity.id);
    map.set(activity.id, started ? "in-progress" : "available");
  }
  return map;
}

const STATUS_META: Record<ActivityStatus, { label: string; className: string }> = {
  completed: {
    label: "Validé",
    className: "bg-cyber-500 text-primary-foreground",
  },
  "in-progress": {
    label: "En cours",
    className: "bg-warning/15 text-warning",
  },
  available: {
    label: "Disponible",
    className: "border-success/30 bg-success/10 text-success",
  },
  locked: {
    label: "Verrouillé",
    className: "bg-night-900 text-muted-foreground",
  },
};

function ActivityCard({ activity, status }: { activity: ActivityCardData; status: ActivityStatus }) {
  const stars = difficultyStars(activity.difficulty);
  const locked = status === "locked";
  const completed = status === "completed";
  const platformInfo = activity.platform
    ? EXTERNAL_PLATFORM_INFO[
        activity.platform as keyof typeof EXTERNAL_PLATFORM_INFO
      ]
    : undefined;

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/80 transition-colors",
        !locked && "hover:border-cyber-500/50"
      )}
    >
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md border font-mono text-sm font-bold",
                activity.host === "external"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                  : "border-cyber-500/40 bg-cyber-500/10 text-cyber-400"
              )}
            >
              {activity.host === "external" ? "EXT" : "CA"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={cn("font-semibold", locked && "text-ink-dim")}>
                  {activity.title}
                </h2>
                {completed && <Zap className="h-4 w-4 text-cyber-500" />}
              </div>
              <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-ink-dim">
                <span className="inline-flex items-center gap-1">
                  {activity.host === "external" ? (
                    <Globe className="h-3 w-3" />
                  ) : (
                    <FlaskConical className="h-3 w-3" />
                  )}
                  {activity.host === "external"
                    ? activity.platform
                    : LAB_TYPE_LABELS[activity.category]}
                </span>
                <span>·</span>
                <span>Niveau {activity.levelId}</span>
                <span>·</span>
<DifficultyBadge stars={stars} />
              </p>
            </div>
          </div>
          <Badge className={STATUS_META[status].className}>
            {status === "locked" && <Lock className="mr-1 h-3 w-3" />}
            {STATUS_META[status].label}
          </Badge>
        </div>

        <p className="mt-3 text-sm text-ink-dim">{activity.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {activity.skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className={cn(
                "text-xs",
                activity.host === "external"
                  ? "border-amber-500/30 bg-amber-500/[0.06] text-amber-400"
                  : "border-cyber-500/30 bg-cyber-500/[0.06] text-cyber-400"
              )}
            >
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-dim">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-cyber-500" />
              {activity.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-cyber-500" />
              +{activity.xp} XP
            </span>
            {platformInfo && (
              <span className={cn("text-xs", platformInfo.color)}>
                {platformInfo.note}
              </span>
            )}
          </div>
          {locked ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-border text-muted-foreground"
            >
              <Lock className="mr-1.5 h-3.5 w-3.5" />
              Verrouillé
            </Button>
          ) : completed ? (
            <Button asChild variant="outline" size="sm" className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10">
              <Link href={`/labs/${activity.slug}`}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Revoir
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
            >
              <Link href={`/labs/${activity.slug}`}>
                <Play className="mr-1.5 h-3.5 w-3.5" />
                Démarrer
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LevelSection({
  level,
  activities,
  index,
}: {
  level: RoadmapLevel;
  activities: ActivityCardData[];
  index: number;
}) {
  const statuses = computeStatuses(activities);
  const totalXp = activities.reduce((sum, a) => sum + a.xp, 0);
  const done = activities.filter((a) => statuses.get(a.id) === "completed").length;
  const LevelIcon = level.icon;

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10 text-cyber-500">
          <LevelIcon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
            Étape {index + 1}
          </p>
          <h2 className="font-semibold">{level.title}</h2>
        </div>
        <Badge className="bg-night-800 text-ink-dim">
          {done}/{activities.length} activités · +{totalXp} XP
        </Badge>
      </div>
      <div className="mt-4 space-y-4 border-l border-cyber-500/30 pl-5">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            status={statuses.get(activity.id) ?? "locked"}
          />
        ))}
      </div>
    </div>
  );
}

export default function LabsPage() {
  const [host, setHost] = useState<HostFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");

  const completedIds = new Set([
    ...LABS.filter((l) => l.completed).map((l) => l.id),
    ...getCompletedLabIds(),
    ...getCompletedExternalLabIds(),
  ]);

  const filtered = useMemo(() => {
    return ACTIVITIES.filter((activity) => {
      if (host !== "all" && activity.host !== host) return false;
      if (category !== "all" && activity.category !== category) return false;
      if (difficulty !== "all" && activity.difficulty !== difficulty) return false;
      return true;
    });
  }, [host, category, difficulty]);

  const completed = ACTIVITIES.filter((a) => completedIds.has(a.id)).length;
  const totalXp = ACTIVITIES.reduce((sum, a) => sum + a.xp, 0);
  const earnedXp = ACTIVITIES.filter((a) => completedIds.has(a.id)).reduce(
    (sum, a) => sum + a.xp,
    0
  );

  const sections = useMemo(() => {
    const byLevel = new Map<number, ActivityCardData[]>();
    for (const activity of filtered) {
      byLevel.set(activity.levelId, [
        ...(byLevel.get(activity.levelId) ?? []),
        activity,
      ]);
    }
    return [...byLevel.entries()]
      .sort(([a], [b]) => a - b)
      .map(([levelId, activities]) => ({
        level: ROADMAP_LEVELS[levelId],
        activities,
      }))
      .filter((section) => section.level);
  }, [filtered]);

  const nativeCount = ACTIVITIES.filter((a) => a.host === "native").length;
  const externalCount = ACTIVITIES.filter((a) => a.host === "external").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Crosshair className="h-6 w-6 text-cyber-500" />
            <h1 className="text-2xl font-bold tracking-tight">
              Missions & labs
            </h1>
          </div>
          <p className="mt-2 max-w-xl text-sm text-ink-dim">
            Des labs pédagogiques CyberAcademy et des missions sur des
            plateformes externes de référence, unifiés dans un même parcours.
            Valide-les dans l'ordre pour progresser.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="w-fit bg-cyber-500/15 text-cyber-400">
            {completed}/{ACTIVITIES.length} validées
          </Badge>
          <Badge className="w-fit bg-night-800 text-ink-dim">
            <Zap className="mr-1 h-3.5 w-3.5 text-cyber-500" />
            {earnedXp}/{totalXp} XP gagnés
          </Badge>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Layers className="h-3.5 w-3.5" />
            Type :
          </span>
          {HOST_FILTERS.map((item) => (
            <Button
              key={item.value}
              variant="outline"
              size="sm"
              onClick={() => setHost(item.value)}
              className={cn(
                "border-border bg-night-800",
                host === item.value &&
                  "border-cyber-500/60 bg-cyber-500/10 text-cyber-400"
              )}
            >
              {item.label}
              {item.value === "native" && (
                <span className="ml-1.5 rounded-full bg-cyber-500/15 px-1.5 text-[10px] text-cyber-400">
                  {nativeCount}
                </span>
              )}
              {item.value === "external" && (
                <span className="ml-1.5 rounded-full bg-amber-500/15 px-1.5 text-[10px] text-amber-400">
                  {externalCount}
                </span>
              )}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Catégorie :</span>
          {CATEGORY_FILTERS.map((item) => (
            <Button
              key={item.value}
              variant="outline"
              size="sm"
              onClick={() => setCategory(item.value)}
              className={cn(
                "border-border bg-night-800",
                category === item.value &&
                  "border-cyber-500/60 bg-cyber-500/10 text-cyber-400"
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Difficulté :</span>
          {DIFFICULTY_FILTERS.map((item) => (
            <Button
              key={item.value}
              variant="outline"
              size="sm"
              onClick={() => setDifficulty(item.value)}
              className={cn(
                "border-border bg-night-800",
                difficulty === item.value &&
                  "border-cyber-500/60 bg-cyber-500/10 text-cyber-400"
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-10">
        {sections.map((section, index) => (
          <LevelSection
            key={section.level.id}
            level={section.level}
            activities={section.activities}
            index={index}
          />
        ))}
      </div>

      {sections.length === 0 && (
        <div className="mt-12 rounded-md border border-border bg-night-900/40 p-8 text-center text-sm text-ink-dim">
          <Sparkles className="mx-auto mb-2 h-6 w-6 text-cyber-500" />
          Aucune activité ne correspond à ces filtres.
        </div>
      )}
    </div>
  );
}
