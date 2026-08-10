"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  FlaskConical,
  Lightbulb,
  ShieldAlert,
  Target,
  TrendingDown,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DAILY_TIP,
  MENTOR_CONTEXT,
  MENTOR_WEAKNESSES,
  QUICK_ACTIONS,
  type QuickActionId,
} from "@/lib/mentor";
import { cn } from "@/lib/utils";

const QUICK_ACTION_ICONS: Record<QuickActionId, typeof BookOpen> = {
  explain: BookOpen,
  lab: FlaskConical,
  weaknesses: TrendingDown,
  next: Compass,
};

function weaknessSeverity(score: number) {
  if (score < 40) return { color: "text-danger", bar: "bg-danger", label: "Critique" };
  if (score < 60) return { color: "text-warning", bar: "bg-warning", label: "À renforcer" };
  return { color: "text-success", bar: "bg-success", label: "OK" };
}

interface LearningProfileProps {
  onQuickAction: (id: QuickActionId) => void;
  className?: string;
}

export function LearningProfile({
  onQuickAction,
  className,
}: LearningProfileProps) {
  const ctx = MENTOR_CONTEXT;

  return (
    <div
      className={cn(
        "flex min-h-0 w-80 shrink-0 flex-col gap-3 overflow-y-auto overscroll-contain",
        className
      )}
    >
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 p-4 pb-0">
          <CardTitle className="flex items-center gap-2 text-sm">
            <UserRound className="h-4 w-4 text-cyber-500" />
            Profil d'apprentissage
          </CardTitle>
          <Link
            href="/profile"
            className="text-[11px] text-cyber-400 hover:underline"
          >
            Mettre à jour
          </Link>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className="bg-cyber-500/15 text-cyber-400">
              Niveau {ctx.level}
            </Badge>
            <Badge variant="outline" className="border-cyber-500/40 text-cyber-400">
              {ctx.rankTitle}
            </Badge>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Target className="h-3 w-3 text-cyber-500" /> Objectif : {ctx.goal}
              </span>
              <span className="font-mono text-cyber-400">{ctx.careerPct}%</span>
            </div>
            <Progress value={ctx.careerPct} className="h-1.5 bg-night-800" />
          </div>

          <div className="rounded-md border border-border bg-night-800/50 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Focus actuel
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-ink">
              <BookOpen className="h-3.5 w-3.5 text-cyber-500" />
              {ctx.focus}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ShieldAlert className="h-4 w-4 text-danger" />
            Faiblesses détectées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          {MENTOR_WEAKNESSES.map((weakness) => {
            const severity = weaknessSeverity(weakness.score);
            return (
              <div key={weakness.topic}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{weakness.label}</span>
                  <span className={cn("font-mono", severity.color)}>
                    {weakness.score}%
                  </span>
                </div>
                <Progress
                  value={weakness.score}
                  className="h-1.5 bg-night-800 [&>div]:bg-danger"
                />
              </div>
            );
          })}
          <p className="pt-1 text-[11px] text-muted-foreground">
            D'après tes quiz des 7 derniers jours.
          </p>
          <Link
            href="/profile"
            className="flex items-center gap-1 text-[11px] text-cyber-400 hover:underline"
          >
            Voir l'analyse complète
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 p-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = QUICK_ACTION_ICONS[action.id];
            return (
              <button
                key={action.id}
                onClick={() => onQuickAction(action.id)}
                className="group flex flex-col gap-1.5 rounded-md border border-border bg-night-800/50 p-3 text-left transition-colors hover:border-cyber-500/40 hover:bg-cyber-500/[0.06]"
              >
                <Icon className="h-4 w-4 text-cyber-500" />
                <span className="text-xs font-medium leading-tight group-hover:text-cyber-400">
                  {action.title}
                </span>
                <span className="text-[10px] leading-snug text-muted-foreground">
                  {action.description}
                </span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-warning/30 bg-warning/[0.05]">
        <CardContent className="p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-warning">
            <Lightbulb className="h-3.5 w-3.5" />
            Conseil du jour
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-dim">
            {DAILY_TIP}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
