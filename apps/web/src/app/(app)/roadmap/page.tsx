"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  FlaskConical,
  GitBranch,
  ListTree,
  Lock,
  MonitorPlay,
  Sparkles,
  Star,
  Target,
  Trophy,
  Unlock,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { V1_LEVELS, levelStatus } from "@/lib/roadmap";
import { COURSES, getCourse } from "@/lib/courses";
import { LABS } from "@/lib/labs";
import { BADGES } from "@/lib/badges";
import { DEMO_USER } from "@/lib/mock";
import { cn } from "@/lib/utils";

const CAREER_GOALS = [
  { label: "Junior Pentester", done: true, current: false },
  { label: "eJPT Ready", done: true, current: false },
  { label: "Bug Bounty", done: false, current: false },
  { label: "Senior Pentester", done: false, current: false },
  { label: "OSCP Ready", done: false, current: false },
];

const LEVEL_BADGES: Record<number, string> = {
  0: "🧭",
  1: "🐚",
  2: "📡",
  3: "⚙️",
  4: "⚡",
  5: "🛡️",
  6: "🎯",
  7: "🏆",
  8: "🐛",
  9: "👑",
  10: "🔥",
  11: "☁️",
};

const IA_EXPLANATIONS: Record<number, string> = {
  0: "Pourquoi commencer ici ? Parce que tout pentester doit savoir ce qu'est un ordinateur, un OS et des permissions. Sans cette base, les attaques réseau et web restent de la magie noire.",
  1: "Linux est l'OS des serveurs et des machines d'attaque. Un pentester passe 90% de son temps dans un terminal. La maîtrise de la CLI est non négociable.",
  2: "Le réseau est le moyen de transport de toute donnée. Comprendre TCP/IP, DNS et HTTP, c'est comprendre comment circulent vos attaques et vos protections.",
  3: "Python et Bash automatisent la reconnaissance : scanner 1000 ports, tester 500 URLs, parser 1 million de lignes de logs. La machine travaille, pas vous.",
  4: "Le web est la plus grande surface d'attaque. Comprendre son architecture (HTTP, sessions, cookies) est le prérequis avant d'apprendre à l'attaquer.",
  5: "L'OWASP Top 10 est la liste officielle des failles web majeures. C'est le vocabulaire partagé avec tous les professionnels de la sécurité applicative.",
  6: "Un pentest est une méthode, pas une suite d'outils. Ce niveau vous apprend à structurer : cadrage, recon, exploitation, reporting.",
  7: "Le CTF transforme vos connaissances en réflexes : gérer le temps, résoudre sous pression, enchaîner les techniques. C'est l'entraînement au combat.",
  8: "Le Bug Bounty applique vos compétences sur des cibles réelles, dans un cadre légal et rémunéré. Vos compétences deviennent un métier.",
  9: "Active Directory est présent dans 90% des entreprises. Le compromettre, c'est compromettre toute l'organisation.",
  10: "Le Red Team simule un adversaire complet : persistance, évasion, mouvement latéral. Le niveau le plus avancé du cursus offensif.",
  11: "Le cloud est devenu l'infrastructure de référence. Comprendre IAM, buckets et conteneurs, c'est sécuriser l'avenir.",
};

function difficultyStars(levelId: number): number {
  if (levelId <= 1) return 1;
  if (levelId <= 3) return 2;
  if (levelId <= 5) return 3;
  if (levelId <= 8) return 4;
  return 5;
}

export default function RoadmapPage() {
  const completedLevels = DEMO_USER.completedLevels;
  const current = DEMO_USER.level;
  const [view, setView] = useState<"list" | "tree">("list");
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [iaLevel, setIaLevel] = useState<number | null>(null);

  const totalSkills = useMemo(
    () =>
      V1_LEVELS.slice(0, current + 1).reduce(
        (acc, level) => acc + level.skills.length,
        0
      ),
    [current]
  );
  const globalPct = Math.min(
    100,
    Math.round(((current + 1) / V1_LEVELS.length) * 100)
  );

  const levelData = useMemo(
    () =>
      V1_LEVELS.map((level) => {
        const course = getCourse(level.id);
        const lessons = course
          ? course.modules.flatMap((m) => m.lessons)
          : [];
        const levelLabs = LABS.filter((lab) => lab.levelId === level.id);
        return {
          level,
          course,
          lessons,
          quizCount: lessons.filter((l) => l.type === "quiz").length,
          exerciseCount: lessons.filter((l) => l.type === "exercise").length,
          labs: levelLabs,
          labCount: levelLabs.length,
          stars: difficultyStars(level.id),
        };
      }),
    []
  );

  function renderSkills(status: string, skills: string[]) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs",
              status === "locked"
                ? "border-border bg-night-900 text-muted-foreground"
                : "border-cyber-500/40 bg-cyber-500/5 text-cyber-400"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                status === "locked" ? "bg-muted-foreground" : "bg-cyber-500"
              )}
            />
            {skill}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Roadmap Offensive Security
        </h1>
        <p className="mt-2 text-sm text-ink-dim">
          Votre arbre de compétences. Validez chaque niveau pour débloquer le
          suivant.
        </p>
      </div>

      {/* ⭐ 1. Progression globale */}
      <Card className="mb-6 border-cyber-500/40 bg-gradient-to-br from-cyber-500/[0.08] to-transparent">
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Target className="h-4 w-4 text-cyber-500" /> Progression globale
            </p>
            <span className="text-sm font-semibold text-cyber-400">
              {globalPct}%
            </span>
          </div>
          <Progress
            value={globalPct}
            className="h-2.5 bg-night-800 [&>div]:bg-cyber-500"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <p className="text-xl font-bold">{completedLevels.length}</p>
              <p className="text-xs text-muted-foreground">niveaux validés</p>
            </div>
            <div>
              <p className="text-xl font-bold">{totalSkills}</p>
              <p className="text-xs text-muted-foreground">compétences</p>
            </div>
            <div>
              <p className="text-xl font-bold text-cyber-400">
                {DEMO_USER.xp.toLocaleString("fr-FR")}
              </p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
            <div>
              <p className="text-xl font-bold">{LABS.filter((l) => l.completed).length}</p>
              <p className="text-xs text-muted-foreground">labs validés</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] px-3 py-2 text-xs">
            <span className="flex items-center gap-1.5 text-cyber-400">
              <Trophy className="h-3.5 w-3.5" /> Objectif : Junior Pentester
            </span>
            <span className="text-ink-dim">
              {completedLevels.filter((id) => id <= V1_LEVELS.length - 1).length}/
              {V1_LEVELS.length} niveaux validés
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ⭐⭐⭐⭐⭐ 6. Bascule Vue liste / Skill Tree */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <Button
          size="sm"
          variant={view === "list" ? "default" : "outline"}
          onClick={() => setView("list")}
          className={cn(
            view === "list"
              ? "bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
              : "border-border bg-transparent text-ink-dim hover:text-ink"
          )}
        >
          <GitBranch className="mr-1.5 h-4 w-4" /> Vue liste
        </Button>
        <Button
          size="sm"
          variant={view === "tree" ? "default" : "outline"}
          onClick={() => setView("tree")}
          className={cn(
            view === "tree"
              ? "bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
              : "border-border bg-transparent text-ink-dim hover:text-ink"
          )}
        >
          <ListTree className="mr-1.5 h-4 w-4" /> Skill Tree
        </Button>
      </div>

      {view === "list" ? (
        /* ============ VUE LISTE ============ */
        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-0 left-[21px] top-4 w-px bg-gradient-to-b from-cyber-500/60 via-border to-transparent sm:left-[25px]"
          />
          <div className="space-y-3">
            {levelData.map(({ level, course, lessons, quizCount, exerciseCount, labs, labCount, stars }, index) => {
              const status = levelStatus(level, completedLevels);
              const isCurrent = level.id === current;
              const hasCourse = Boolean(course);
              const prev = index > 0 ? V1_LEVELS[index - 1] : null;
              const next = index < V1_LEVELS.length - 1 ? V1_LEVELS[index + 1] : null;
              const iaOpen = iaLevel === level.id;

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Node */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.04 + 0.1, type: "spring", stiffness: 200 }}
                      className={cn(
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold sm:h-12 sm:w-12",
                        status === "completed" &&
                          "border-cyber-500 bg-cyber-500 text-primary-foreground shadow-[0_0_14px_rgba(79,209,197,0.5)]",
                        status === "in-progress" &&
                          "border-cyber-500 bg-night-800 text-cyber-400",
                        status === "locked" &&
                          "border-border bg-night-900 text-muted-foreground"
                      )}
                    >
                      {status === "completed" ? (
                        <Check className="h-5 w-5" />
                      ) : status === "locked" ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        level.id
                      )}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-full top-1/2 hidden h-px w-4 -translate-y-1/2 sm:block",
                          status === "locked" ? "bg-border" : "bg-cyber-500/60"
                        )}
                      />
                    </motion.div>

                    <div
                      className={cn(
                        "flex-1 rounded-lg border transition-colors",
                        status === "locked"
                          ? "border-border/60 opacity-60"
                          : status === "in-progress"
                            ? "border-cyber-500/50 bg-cyber-500/[0.04]"
                            : "border-border/60 bg-card"
                      )}
                    >
                      <Card className="border-0 bg-transparent shadow-none">
                        <CardContent className="p-4 sm:p-5">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "border-cyber-500/40 text-xs",
                                    status === "locked"
                                      ? "text-muted-foreground"
                                      : "text-cyber-400"
                                  )}
                                >
                                  Niveau {level.id}
                                </Badge>
                                {isCurrent && (
                                  <Badge className="bg-cta-700 text-white">
                                    En cours
                                  </Badge>
                                )}
                                {!hasCourse && (
                                  <Badge className="bg-warning/15 text-warning">
                                    À venir
                                  </Badge>
                                )}
                                <Badge className="bg-night-800 text-ink-dim">
                                  <Star className="mr-1 h-3 w-3 text-warning" />
                                  {"★".repeat(stars)}
                                  {"☆".repeat(5 - stars)}
                                </Badge>
                              </div>
                              <h2 className="mt-2 flex items-center gap-2 text-base font-semibold sm:text-lg">
                                <level.icon className="h-4 w-4 text-cyber-500" />
                                {level.title}
                                {LEVEL_BADGES[level.id] && (
                                  <span className="text-lg">
                                    {LEVEL_BADGES[level.id]}
                                  </span>
                                )}
                              </h2>
                            </div>
                            {/* ⭐⭐⭐⭐⭐⭐⭐ 7. Bouton IA */}
                            <Button
                              size="icon"
                              variant="outline"
                              aria-label="Demander à l'IA"
                              onClick={() => setIaLevel(iaOpen ? null : level.id)}
                              className={cn(
                                "shrink-0",
                                iaOpen
                                  ? "border-cyber-500/60 bg-cyber-500/10 text-cyber-400"
                                  : "border-border text-ink-dim hover:border-cyber-500/40 hover:text-cyber-400"
                              )}
                            >
                              <Bot className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* ⭐⭐ 2. Objectif */}
                          <div className="mt-3">
                            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-cyber-500">
                              🎯 À la fin de ce niveau, tu seras capable de :
                            </p>
                            <div className="grid gap-1.5 sm:grid-cols-2">
                              {level.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className={cn(
                                    "flex items-start gap-1.5 text-sm",
                                    status === "locked"
                                      ? "text-ink-dim/60"
                                      : "text-ink-dim"
                                  )}
                                >
                                  <Check
                                    className={cn(
                                      "mt-0.5 h-3.5 w-3.5 shrink-0",
                                      status === "locked"
                                        ? "text-muted-foreground"
                                        : "text-cyber-500"
                                    )}
                                  />
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* ⭐⭐⭐ 3. Prérequis + Déblocage */}
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            {prev && (
                              <span className="flex items-center gap-1 rounded-full border border-border bg-night-800 px-2.5 py-0.5 text-ink-dim">
                                Prérequis :{" "}
                                <span className="text-cyber-400">
                                  ✓ {prev.title}
                                </span>
                              </span>
                            )}
                            {next && (
                              <span className="flex items-center gap-1 rounded-full border border-border bg-night-800 px-2.5 py-0.5 text-ink-dim">
                                Débloque :{" "}
                                <span className="text-cyber-400">
                                  {next.title}
                                </span>
                              </span>
                            )}
                          </div>

                          {/* ⭐⭐⭐⭐⭐⭐⭐ 8. Estimation + stats */}
                          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" /> {level.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Award className="h-3.5 w-3.5 text-cyber-500" />{" "}
                              {level.xp} XP
                            </span>
                            {lessons.length > 0 && (
                              <span className="flex items-center gap-1.5">
                                <MonitorPlay className="h-3.5 w-3.5" />{" "}
                                {lessons.length} cours
                              </span>
                            )}
                            {quizCount > 0 && (
                              <span className="flex items-center gap-1.5">
                                <Zap className="h-3.5 w-3.5" /> {quizCount} quiz
                              </span>
                            )}
                            {labCount > 0 && (
                              <span className="flex items-center gap-1.5">
                                <FlaskConical className="h-3.5 w-3.5" />{" "}
                                {labCount} labs
                              </span>
                            )}
                            {exerciseCount > 0 && (
                              <span className="flex items-center gap-1.5">
                                <Target className="h-3.5 w-3.5" />{" "}
                                {exerciseCount} exercices
                              </span>
                            )}
                          </div>

                          {/* ⭐⭐⭐⭐ 4. Récompenses */}
                          {status !== "locked" && (
                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                              <span className="flex items-center gap-1 rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] px-2 py-1 text-cyber-400">
                                <Award className="h-3.5 w-3.5" /> +{level.xp} XP
                              </span>
                              {LEVEL_BADGES[level.id] && (
                                <span className="flex items-center gap-1 rounded-md border border-border bg-night-800 px-2 py-1 text-ink-dim">
                                  Badge : {LEVEL_BADGES[level.id]}
                                </span>
                              )}
                              {next && (
                                <span className="flex items-center gap-1 rounded-md border border-border bg-night-800 px-2 py-1 text-ink-dim">
                                  <Unlock className="h-3.5 w-3.5 text-cyber-500" />
                                  Déblocage : {next.title}
                                </span>
                              )}
                            </div>
                          )}

                          {/* ⭐⭐⭐⭐⭐ 5. Labs intégrés */}
                          {labs.length > 0 && (
                            <div className="mt-3">
                              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                Labs du niveau
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {labs.map((lab) => (
                                  <Link
                                    key={lab.id}
                                    href={`/labs/${lab.slug}`}
                                    className="flex items-center gap-1.5 rounded-full border border-cyber-500/30 bg-cyber-500/5 px-2.5 py-1 text-xs text-cyber-400 transition-colors hover:bg-cyber-500/15"
                                  >
                                    <FlaskConical className="h-3 w-3" />
                                    {lab.title}
                                    {lab.completed && (
                                      <Check className="h-3 w-3 text-cyber-500" />
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* ⭐⭐⭐⭐⭐⭐⭐ 7. Réponse IA */}
                          <AnimatePresence>
                            {iaOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 flex items-start gap-3 rounded-md border border-cyber-500/40 bg-cyber-500/[0.06] p-3">
                                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                                  <div>
                                    <p className="text-sm font-medium">
                                      Pourquoi {level.title} ?
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-ink-dim">
                                      {IA_EXPLANATIONS[level.id] ??
                                        "Ce niveau consolide les compétences précédentes et prépare les suivantes."}
                                    </p>
                                    <Button
                                      asChild
                                      size="sm"
                                      variant="ghost"
                                      className="mt-2 h-7 px-2 text-xs text-cyber-500 hover:text-cyber-400"
                                    >
                                      <Link href="/mentor">En discuter avec le mentor</Link>
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Progression in-progress */}
                          {status === "in-progress" && (
                            <div className="mt-3">
                              <div className="mb-1.5 flex justify-between text-xs text-ink-dim">
                                <span>Progression du niveau</span>
                                <span className="text-cyber-500">45%</span>
                              </div>
                              <Progress value={45} className="h-1.5 bg-night-800" />
                            </div>
                          )}

                          <div className="mt-4 flex items-center gap-3">
                            {status !== "locked" ? (
                              <Button asChild size="sm" className="bg-cta-700 text-white hover:bg-cta-600">
                                <Link href={`/roadmap/${level.slug}`}>
                                  {status === "completed" ? "Revoir le niveau" : "Commencer"}
                                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled
                                className="border-border text-muted-foreground"
                              >
                                <Lock className="mr-1.5 h-3.5 w-3.5" />
                                Verrouillé
                              </Button>
                            )}
                            {status === "completed" && (
                              <span className="text-sm text-cyber-500">
                                Niveau validé
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ============ VUE SKILL TREE ============ */
        <div className="space-y-0">
          {levelData.map(({ level, lessons }, index) => {
            const status = levelStatus(level, completedLevels);
            const isCurrent = level.id === current;
            const open = expandedLevel === level.id;
            return (
              <div key={level.id}>
                <motion.button
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setExpandedLevel(open ? null : level.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                    status === "locked"
                      ? "border-border/60 bg-night-900 text-muted-foreground"
                      : isCurrent
                        ? "border-cyber-500/50 bg-cyber-500/[0.08] text-cyber-400"
                        : "border-border/60 bg-card text-ink hover:border-cyber-500/40"
                  )}
                  style={{
                    marginLeft: index * 0, // vertical trunk
                  }}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                      status === "completed"
                        ? "border-cyber-500 bg-cyber-500 text-primary-foreground"
                        : status === "locked"
                          ? "border-border bg-night-900"
                          : "border-cyber-500 bg-night-800 text-cyber-400"
                    )}
                  >
                    {status === "completed" ? (
                      <Check className="h-4 w-4" />
                    ) : status === "locked" ? (
                      <Lock className="h-3.5 w-3.5" />
                    ) : (
                      level.id
                    )}
                  </span>
                  <level.icon className="h-4 w-4 text-cyber-500" />
                  <span className="flex-1 font-medium">{level.title}</span>
                  {LEVEL_BADGES[level.id] && (
                    <span className="text-base">{LEVEL_BADGES[level.id]}</span>
                  )}
                  {open ? (
                    <ChevronDown className="h-4 w-4 text-cyber-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-cyber-500/30 pl-4 sm:ml-[22px]">
                        {level.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: skillIndex * 0.05 }}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-dim"
                          >
                            <span className="text-cyber-500">├──</span>
                            <span
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                status === "locked"
                                  ? "bg-muted-foreground"
                                  : "bg-cyber-500"
                              )}
                            />
                            {skill}
                          </motion.div>
                        ))}
                        {lessons.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: level.skills.length * 0.05 }}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-dim"
                          >
                            <span className="text-cyber-500">└──</span>
                            <FlaskConical className="h-3.5 w-3.5 text-cyber-500" />
                            {lessons.length} leçons + labs
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* ⭐⭐⭐⭐⭐⭐⭐ 9. Vision long terme */}
      <Card className="mt-8 border-cyber-500/40 bg-gradient-to-br from-cyber-500/[0.06] to-transparent">
        <CardContent className="space-y-3 p-5">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Trophy className="h-4 w-4 text-cyber-500" /> Votre objectif long
            terme
          </p>
          <div className="space-y-1.5">
            {CAREER_GOALS.map((goal) => (
              <div
                key={goal.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-md border px-3 py-2 text-sm",
                  goal.done
                    ? "border-cyber-500/40 bg-cyber-500/[0.06] text-cyber-400"
                    : "border-border/60 bg-night-900/40 text-ink-dim"
                )}
              >
                {goal.done ? (
                  <Check className="h-4 w-4 text-cyber-500" />
                ) : (
                  <span className="h-4 w-4 rounded border border-border" />
                )}
                {goal.label}
                {goal.current && (
                  <Badge className="ml-auto bg-cta-700 text-white">En cours</Badge>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Prochaine étape conseillée : continuez la roadmap jusqu'au niveau{" "}
            {Math.min(current + 1, V1_LEVELS.length - 1)} pour débloquer de
            nouveaux badges.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
