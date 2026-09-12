"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileQuestion,
  Flame,
  FlaskConical,
  GitBranch,
  Globe,
  Lightbulb,
  Sparkles,
  Trophy,
  Wrench,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DEMO_USER, AI_RECOMMENDATIONS, XP_HISTORY, WEEKLY_STATS } from "@/lib/mock";
import { MENTOR_WEAKNESSES } from "@/lib/mentor";
import { BADGES } from "@/lib/badges";
import { V1_LEVELS } from "@/lib/roadmap";
import { MentorPanel } from "@/components/mentor-panel";
import { LABS } from "@/lib/labs";
import { cn } from "@/lib/utils";
import {
  getNextRecommendedActivity,
  type LearningPathItem,
} from "@/lib/learningPath";
import {
  getCompletedLabIds,
  getCompletedExternalLabIds,
} from "@/lib/labProgress";
import {
  getCompletedLevelsCount,
  getCurrentLevel,
  getGlobalProgressPct,
  getMasteredSkills,
  getRankTitle,
  getTotalLevels,
} from "@/lib/progress";

const RECO_ICONS = {
  lesson: GitBranch,
  lab: FlaskConical,
  review: Lightbulb,
  ctf: Trophy,
} as const;

const NEXT_ACTIVITY_META: Record<
  LearningPathItem["kind"],
  { label: string; icon: typeof FlaskConical; className: string }
> = {
  course: { label: "Cours", icon: BookOpen, className: "border-sky-500/40 bg-sky-500/10" },
  exercise: { label: "Exercice", icon: Wrench, className: "border-purple-500/40 bg-purple-500/10" },
  quiz: { label: "Quiz", icon: FileQuestion, className: "border-success/40 bg-success/10" },
  native_lab: { label: "Lab natif", icon: FlaskConical, className: "border-cyber-500/40 bg-cyber-500/10" },
  external_lab: { label: "Mission externe", icon: Globe, className: "border-amber-500/40 bg-amber-500/10" },
  review: { label: "Révision IA", icon: Sparkles, className: "border-cyber-500/40 bg-cyber-500/10" },
};

const WEEK_MAX = Math.max(...WEEKLY_STATS.days.map((day) => day.value));

export default function DashboardPage() {
  const globalPct = getGlobalProgressPct();
  const skillsMastered = getMasteredSkills();
  const nextLevel = getCurrentLevel();
  const rankTitle = getRankTitle(DEMO_USER.level);
  const completedCount = getCompletedLevelsCount();
  const totalLevels = getTotalLevels();
  const earnedBadges = BADGES.filter((b) => b.earned).length;

  const nextActivity = getNextRecommendedActivity(
    [
      ...LABS.filter((l) => l.completed).map((l) => l.id),
      ...getCompletedLabIds(),
    ],
    getCompletedExternalLabIds()
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      {/* Greeting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Bienvenue, <span className="text-cyber-500">{DEMO_USER.pseudo}</span>
          </h1>
          <p className="mt-1 text-sm text-ink-dim">
            Voici les recommandations IA du jour pour continuer votre
            progression.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-cyber-500/40 bg-cyber-500/10 px-3 py-1.5 text-sm text-cyber-400">
          <Flame className="h-4 w-4" />
          Série : {DEMO_USER.streak} jours
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink-dim">Niveau actuel</p>
              <Zap className="h-4 w-4 text-cyber-500" />
            </div>
            <p className="mt-2 text-2xl font-bold">{DEMO_USER.level}</p>
            <p className="text-xs text-muted-foreground">
              {rankTitle}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink-dim">XP cumulé</p>
              <Sparkles className="h-4 w-4 text-cyber-500" />
            </div>
            <p className="mt-2 text-2xl font-bold">{DEMO_USER.xp.toLocaleString("fr-FR")}</p>
            <p className="text-xs text-muted-foreground">
              {DEMO_USER.level >= V1_LEVELS.length - 1
                ? `Cursus complété · ${globalPct}%`
                : `${DEMO_USER.xpToNextLevel.toLocaleString("fr-FR")} XP pour le niveau ${DEMO_USER.level + 1}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink-dim">Badges</p>
              <Trophy className="h-4 w-4 text-cyber-500" />
            </div>
            <p className="mt-2 text-2xl font-bold">
              {earnedBadges}
              <span className="text-lg text-muted-foreground">
                /{BADGES.length}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">sur 12 badges d'actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink-dim">Classement</p>
              <Trophy className="h-4 w-4 text-cyber-500" />
            </div>
            <p className="mt-2 text-2xl font-bold">
              n°{DEMO_USER.rank}
              <span className="text-lg text-muted-foreground">
                /{DEMO_USER.totalUsers.toLocaleString("fr-FR")}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">classement global</p>
          </CardContent>
        </Card>
      </div>

      {/* Continue ton parcours — prochaine activité recommandée */}
      {nextActivity ? (
        <Card className="border-cyber-500/40 bg-gradient-to-r from-cyber-500/[0.08] to-transparent">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              {(() => {
                const meta = NEXT_ACTIVITY_META[nextActivity.item.kind];
                const Icon = meta.icon;
                return (
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border ${meta.className}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                );
              })()}
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
                    Continue ton parcours
                  </p>
                  <Badge className="bg-cyber-500/15 text-cyber-400">
                    Niveau {nextActivity.level.id} — {nextActivity.level.title}
                  </Badge>
                </div>
                <p className="mt-1 font-semibold">
                  {nextActivity.item.title}
                </p>
                <p className="mt-1 text-sm text-ink-dim">
                  {NEXT_ACTIVITY_META[nextActivity.item.kind].label} ·{" "}
                  {nextActivity.item.duration}
                  {nextActivity.item.xp > 0 && ` · +${nextActivity.item.xp} XP`}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:flex-col sm:items-end">
              {nextActivity.item.xp > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-cyber-400">
                  <Zap className="h-4 w-4" />
                  +{nextActivity.item.xp} XP
                </span>
              )}
              <Button
                asChild
                size="sm"
                className="bg-cta-700 text-white hover:bg-cta-600"
              >
                <Link href={nextActivity.item.href ?? "/roadmap"}>
                  Commencer <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-success/40 bg-gradient-to-r from-success/[0.08] to-transparent">
          <CardContent className="p-5 text-sm text-ink-dim">
             Toutes les activités V1 sont validées. Prends une révision guidée
            avec le Cyber Mentor pour consolider tes acquis.
          </CardContent>
        </Card>
      )}

      {/* ⭐ Coach — Ta priorité */}
      <Card variant="priority" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(251,191,36,0.08)_1px,transparent_0)] bg-[size:24px_24px]" />
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10">
              <Sparkles className="h-5 w-5 text-cyber-500" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
                  Coach — Ta priorité
                </p>
                <Badge className="bg-warning/15 text-warning">À renforcer</Badge>
              </div>
              <p className="mt-1 font-semibold">
                Revoir {MENTOR_WEAKNESSES[0].label} — tu as obtenu{" "}
                <span className="font-mono text-cyber-400">{MENTOR_WEAKNESSES[0].score}%</span> aux derniers exercices
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {MENTOR_WEAKNESSES.map((weakness) => (
                  <Badge
                    key={weakness.topic}
                    variant="outline"
                    className={cn(
                      "border-border text-muted-foreground",
                      weakness.topic === MENTOR_WEAKNESSES[0].topic &&
                        "border-cyber-500/40 text-cyber-400"
                    )}
                  >
                    {weakness.label} · <span className="font-mono">{weakness.score}%</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button
            asChild
            size="sm"
            className="shrink-0 bg-cta-700 text-white hover:bg-cta-600"
          >
            <Link href="/courses/networking">
              Commencer <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* ⭐ Stats hebdomadaires */}
      <Card className="border-cyber-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="h-4 w-4 text-cyber-500" />
            Cette semaine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] p-3">
              <p className="text-lg font-bold text-cyber-400">
                +{WEEKLY_STATS.xp.toLocaleString("fr-FR")} XP
              </p>
              <p className="text-xs text-muted-foreground">XP gagnés</p>
            </div>
            <div className="rounded-md border border-border bg-night-800/50 p-3">
              <p className="text-lg font-bold text-ink">{WEEKLY_STATS.labs} labs</p>
              <p className="text-xs text-muted-foreground">terminés</p>
            </div>
            <div className="rounded-md border border-border bg-night-800/50 p-3">
              <p className="text-lg font-bold text-ink">
                {WEEKLY_STATS.challenges} challenges
              </p>
              <p className="text-xs text-muted-foreground">réussis</p>
            </div>
            <div className="rounded-md border border-border bg-night-800/50 p-3">
              <p className="text-lg font-bold text-ink">
                {WEEKLY_STATS.quizAverage}%
              </p>
              <p className="text-xs text-muted-foreground">moyenne quiz</p>
            </div>
          </div>

          {/* Graphique temps d'apprentissage */}
          <div>
            <p className="mb-2 text-xs text-muted-foreground">
              Temps d'apprentissage (heures)
            </p>
            <div className="flex items-end justify-between gap-2">
              {WEEKLY_STATS.days.map((day) => (
                <div key={day.label} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-cyber-400">
                    {day.value}h
                  </span>
                  <div className="flex h-20 w-full items-end rounded-md bg-night-800">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-cyber-500/60 to-cyber-500 transition-all"
                      style={{ height: `${(day.value / WEEK_MAX) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {DEMO_USER.level >= V1_LEVELS.length - 1
                ? "Cursus complété"
                : `Progression vers le niveau ${DEMO_USER.level + 1}`}
            </span>
            <span className="text-sm font-medium text-cyber-500">
              {globalPct}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scaleX: 0.85 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ transformOrigin: "left" }}
            className="relative"
          >
            <Progress value={globalPct} className="h-2.5 bg-night-800" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyber-500/25 to-cyber-300/25 blur-[2px]"
            />
          </motion.div>
          <div className="flex flex-wrap items-center gap-2">
            {V1_LEVELS.map((level) => {
              const status = DEMO_USER.completedLevels.includes(level.id)
                ? "completed"
                : level.id === DEMO_USER.level
                  ? "in-progress"
                  : "locked";
              return (
                <Badge
                  key={level.id}
                  variant={
                    status === "completed"
                      ? "default"
                      : status === "in-progress"
                        ? "outline"
                        : "secondary"
                  }
                  className={
                    status === "completed"
                      ? "bg-cyber-500 text-primary-foreground"
                      : status === "in-progress"
                        ? "border-cyber-500/50 text-cyber-400"
                        : "opacity-50"
                  }
                >
                  N{level.id}
                </Badge>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {completedCount}/{totalLevels} niveaux validés · {skillsMastered.length}{" "}
            compétences maîtrisées
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI recommendations */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyber-500" />
            <h2 className="font-semibold">Recommandations IA du jour</h2>
          </div>
          <div className="space-y-3">
            {AI_RECOMMENDATIONS.map((reco, index) => {
            const Icon = RECO_ICONS[reco.type];
            return (
              <motion.div
                key={reco.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="transition-colors hover:border-cyber-500/50">
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10">
                      <Icon className="h-4 w-4 text-cyber-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug">{reco.title}</p>
                      <p className="mt-1 text-sm text-ink-dim">
                        {reco.description}
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-cyber-500 hover:text-cyber-400"
                    >
                      <Link href={reco.type === "lab" ? "/labs" : "/roadmap"}>
                        Continuer <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          </div>

          {/* Skills map */}
          <div className="mt-6">
            <h2 className="mb-3 font-semibold">
              Cartographie des compétences maîtrisées
            </h2>
            <Card>
              <CardContent className="flex flex-wrap gap-2 p-4">
                {skillsMastered.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-cyber-500/40 bg-cyber-500/5 text-cyber-400"
                  >
                    {skill}
                  </Badge>
                ))}
                <span className="text-sm text-muted-foreground">
                  +{nextLevel?.skills.length ?? 0} compétences en cours (
                  {nextLevel?.title ?? "niveau suivant"})
                </span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right column: XP history + badges */}
        <div className="space-y-6">
          <MentorPanel
            context={`Contexte : niveau ${DEMO_USER.level} (${rankTitle}) · ${completedCount}/${totalLevels} niveaux`}
            tip={`Tu as terminé Networking mais tu as obtenu ${DEMO_USER.quizAverage}% de moyenne aux quiz. Points faibles détectés : ${DEMO_USER.weakSkills.join(", ")}. Je te recommande de revoir le triple handshake TCP avant le lab « Capture TCP ».`}
            hint={` Le lab « Capture TCP » te rapportera 300 XP et validera le niveau ${DEMO_USER.level + 1}.`}
            badge="2 points faibles"
          />
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-cyber-500" />
              <h2 className="font-semibold">Activité récente</h2>
            </div>
            <Card>
              <CardContent className="space-y-3 p-4">
                {XP_HISTORY.map((event, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{event.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <Badge className="shrink-0 bg-cyber-500/15 text-cyber-400">
                      +{event.amount} XP
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-cyber-500" />
              <h2 className="font-semibold">Badges</h2>
            </div>
            <Card>
              <CardContent className="space-y-2 p-4">
                {BADGES.filter((badge) => badge.earned).map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3">
                    <badge.icon className="h-4 w-4 text-cyber-500" />
                    <div>
                      <p className="text-sm font-medium">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
                <Link
                  href="/profile"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-cyber-500 hover:underline"
                >
                  Voir tous les badges <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
