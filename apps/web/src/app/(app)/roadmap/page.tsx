"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Lock,
  Star,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ROADMAP_LEVELS, levelStatus } from "@/lib/roadmap";
import { DEMO_USER } from "@/lib/mock";
import { cn } from "@/lib/utils";

export default function RoadmapPage() {
  const completedLevels = DEMO_USER.completedLevels;
  const current = DEMO_USER.level;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <p className="mt-2 text-sm text-ink-dim">
          Votre arbre de compétences. Un seul chemin recommandé à la fois —
          validez chaque niveau pour débloquer le suivant.
        </p>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute bottom-0 left-[21px] top-4 w-px bg-gradient-to-b from-cyber-500/60 via-border to-transparent sm:left-[25px]"
        />
        <div className="space-y-3">
          {ROADMAP_LEVELS.map((level, index) => {
            const status = levelStatus(level, completedLevels);
            const isCurrent = level.id === current;
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className={cn(
                      "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold sm:h-12 sm:w-12",
                      status === "completed" &&
                        "border-cyber-500 bg-cyber-500/15 text-cyber-500",
                      status === "in-progress" &&
                        "border-cyber-500 bg-night-800 text-cyber-400 shadow-[0_0_14px_rgba(79,209,197,0.4)]",
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
                  </div>

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
                        <div className="flex flex-wrap items-center justify-between gap-2">
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
                            </div>
                            <h2 className="mt-2 flex items-center gap-2 text-base font-semibold sm:text-lg">
                              <level.icon className="h-4 w-4 text-cyber-500" />
                              {level.title}
                            </h2>
                            <p className="mt-1 text-sm text-ink-dim">
                              {level.objectives}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {level.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-border bg-night-800 px-2.5 py-0.5 text-xs text-ink-dim"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {level.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 text-cyber-500" />{" "}
                            {level.xp} XP
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Target className="h-3.5 w-3.5" /> Validation :{" "}
                            {level.validation}
                          </span>
                        </div>

                        {status === "in-progress" && (
                          <div className="mt-4">
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
    </div>
  );
}
