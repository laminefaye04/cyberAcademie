"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  FlaskConical,
  Flame,
  GitBranch,
  Lightbulb,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DEMO_USER, AI_RECOMMENDATIONS, XP_HISTORY } from "@/lib/mock";
import { BADGES } from "@/lib/badges";
import { ROADMAP_LEVELS } from "@/lib/roadmap";

const RECO_ICONS = {
  lesson: GitBranch,
  lab: FlaskConical,
  review: Lightbulb,
  ctf: Trophy,
} as const;

export default function DashboardPage() {
  const progressPct = Math.round(
    (DEMO_USER.xp / DEMO_USER.xpToNextLevel) * 100
  );
  const skillsMastered = DEMO_USER.completedLevels.flatMap(
    (id) => ROADMAP_LEVELS[id].skills
  );
  const nextLevel = ROADMAP_LEVELS[DEMO_USER.level];

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
              {nextLevel.subtitle}
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
              {DEMO_USER.xpToNextLevel.toLocaleString("fr-FR")} XP pour le niveau{" "}
              {DEMO_USER.level + 1}
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
              {BADGES.filter((b) => b.earned).length}
              <span className="text-lg text-muted-foreground">
                /{BADGES.length}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">sur 12 niveaux</p>
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

      {/* Progress card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progression vers le niveau {DEMO_USER.level + 1}</span>
            <span className="text-sm font-medium text-cyber-500">
              {progressPct}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={progressPct} className="h-2.5 bg-night-800" />
          <div className="flex flex-wrap items-center gap-2">
            {ROADMAP_LEVELS.map((level) => {
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
                  +{nextLevel.skills.length} compétences en cours ({nextLevel.title})
                </span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right column: XP history + badges */}
        <div className="space-y-6">
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
                    <span className="text-xl">{badge.icon}</span>
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
