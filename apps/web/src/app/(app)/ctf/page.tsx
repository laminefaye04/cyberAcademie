"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Crosshair,
  Flag,
  Lock,
  Swords,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CTFS,
  CTF_CATEGORY_LABELS,
  CTF_LEADERBOARD,
  type CtfChallenge,
  type CtfCategory,
} from "@/lib/ctf";
import { DEMO_USER } from "@/lib/mock";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<CtfCategory, string> = {
  web: "border-cyber-500/40 text-cyber-400",
  linux: "border-success/40 text-success",
  crypto: "border-warning/40 text-warning",
  forensics: "border-danger/40 text-danger",
  osint: "border-muted-foreground/40 text-muted-foreground",
};

export default function CtfArenaPage() {
  const ctf = CTFS[0];
  const [solved, setSolved] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      ctf.challenges.filter((c) => c.solved).map((c) => [c.id, true])
    )
  );
  const [active, setActive] = useState<CtfChallenge | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const totals = useMemo(() => {
    const byCategory = {} as Record<CtfCategory, number>;
    for (const category of Object.keys(CTF_CATEGORY_LABELS) as CtfCategory[]) {
      byCategory[category] = ctf.challenges.filter(
        (c) => c.category === category
      ).length;
    }
    const solvedList = ctf.challenges.filter((c) => solved[c.id]);
    return {
      byCategory,
      solvedCount: solvedList.length,
      points: solvedList.reduce((sum, c) => sum + c.points, 0),
      total: ctf.challenges.length,
    };
  }, [ctf, solved]);

  function submitFlag() {
    if (!active) return;
    const normalized = input.trim().toLowerCase();
    const accepted = ["ca{", "flag{"];
    if (accepted.some((prefix) => normalized.includes(prefix)) && normalized.length > 6) {
      setResult("success");
      setSolved((prev) => ({ ...prev, [active.id]: true }));
    } else {
      setResult("error");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Swords className="h-6 w-6 text-cyber-500" />
            <h1 className="text-2xl font-bold tracking-tight">CTF Arena</h1>
          </div>
          <p className="mt-2 max-w-xl text-sm text-ink-dim">
            Des challenges chronométrés pour t'entraîner en conditions
            réelles : web, Linux, crypto, forensics et OSINT.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="w-fit bg-cyber-500/15 text-cyber-400">
            {totals.solvedCount}/{totals.total} résolus
          </Badge>
          <Badge className="w-fit bg-night-800 text-ink-dim">
            <Trophy className="mr-1 h-3.5 w-3.5 text-cyber-500" />
            {totals.points} pts
          </Badge>
        </div>
      </div>

      {/* CTF banner */}
      <Card className="border-cyber-500/40 bg-gradient-to-r from-cyber-500/[0.1] to-transparent">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10 text-xl">
              {ctf.emoji}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
                CTF en cours · {ctf.name}
              </p>
              <p className="mt-1 font-semibold">{ctf.tagline}</p>
              <p className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {ctf.participants} participants
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-3.5 w-3.5" /> {ctf.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Flag className="h-3.5 w-3.5" /> Format des flags : {ctf.flagPrefix}...
                </span>
              </p>
            </div>
          </div>
          <Badge className="w-fit bg-cyber-500 text-primary-foreground">
            En direct
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Challenges */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {Object.entries(totals.byCategory).map(([category, count]) => (
              <Badge key={category} variant="outline" className="border-border">
                {CTF_CATEGORY_LABELS[category as CtfCategory]} · {count}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            {ctf.challenges.map((challenge, index) => {
              const isSolved = Boolean(solved[challenge.id]);
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Card
                    className={cn(
                      "transition-colors",
                      isSolved ? "border-cyber-500/50" : "hover:border-cyber-500/40"
                    )}
                  >
                    <CardContent className="flex items-center justify-between gap-3 p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
                            CATEGORY_COLORS[challenge.category]
                          )}
                        >
                          {isSolved ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium leading-snug">
                            {challenge.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                            <span>
                              {CTF_CATEGORY_LABELS[challenge.category]}
                            </span>
                            <span>·</span>
                            <span>
                              {"★".repeat(challenge.difficulty)}
                              {"☆".repeat(3 - challenge.difficulty)}
                            </span>
                            <span>·</span>
                            <span className="text-cyber-400">
                              {challenge.points} pts
                            </span>
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={isSolved ? "ghost" : "outline"}
                        className={
                          isSolved
                            ? "text-cyber-500"
                            : "border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
                        }
                        onClick={() => {
                          setActive(challenge);
                          setInput("");
                          setResult(null);
                        }}
                      >
                        {isSolved ? "Résolu ✓" : "Soumettre le flag"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-cyber-500" />
            <h2 className="font-semibold">Classement</h2>
          </div>
          <Card>
            <CardContent className="space-y-2 p-4">
              {CTF_LEADERBOARD.map((leader) => {
                const isMe = leader.pseudo === DEMO_USER.pseudo;
                return (
                  <div
                    key={leader.pseudo}
                    className={cn(
                      "flex items-center gap-3 rounded-md border px-3 py-2",
                      isMe
                        ? "border-cyber-500/40 bg-cyber-500/[0.08]"
                        : "border-border bg-night-800/40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                        leader.rank === 1
                          ? "bg-warning/20 text-warning"
                          : leader.rank === 2
                            ? "bg-muted text-muted-foreground"
                            : leader.rank === 3
                              ? "bg-danger/20 text-danger"
                              : "bg-night-800 text-muted-foreground"
                      )}
                    >
                      {leader.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {leader.pseudo}
                        {isMe && (
                          <span className="ml-1.5 text-xs text-cyber-400">
                            (vous)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {leader.solved} résolus
                      </p>
                    </div>
                    <span className="font-mono text-sm text-cyber-400">
                      {leader.points.toLocaleString("fr-FR")}
                    </span>
                  </div>
                );
              })}
              <p className="pt-1 text-center text-xs text-muted-foreground">
                <Crosshair className="mr-1 inline h-3 w-3" />
                Classement mis à jour en temps réel
              </p>
            </CardContent>
          </Card>

          <Card className="mt-4 border-cyber-500/40 bg-cyber-500/[0.05]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-cyber-500" />
                Mon avancement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Challenges résolus</span>
                <span className="font-medium">
                  {totals.solvedCount}/{totals.total}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Points</span>
                <span className="font-medium text-cyber-500">
                  {totals.points}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Termine le CTF pour débloquer le badge « CTF Recruit ».
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Flag dialog */}
      <Dialog
        open={active !== null}
        onOpenChange={(open) => !open && setActive(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {active?.title} — {active?.points} pts
            </DialogTitle>
            <DialogDescription>
              Format du flag : <code className="font-mono text-cyber-400">CA{`{...}`}</code>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {active?.hint && (
              <p className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
                💡 {active.hint}
              </p>
            )}
            <Input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setResult(null);
              }}
              placeholder="CA{flag_ici}"
              className="bg-night-800 font-mono text-sm"
              autoFocus
            />
            <AnimatePresence>
              {result === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-md border border-success/50 bg-success/10 p-3 text-sm text-success"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Flag correct ! +{active?.points} pts
                </motion.div>
              )}
              {result === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-md border border-danger/50 bg-danger/10 p-3 text-sm text-danger"
                >
                  <Flag className="h-4 w-4" />
                  Flag incorrect. Réessaie.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <DialogFooter>
            <Button
              onClick={submitFlag}
              disabled={!input.trim()}
              className="bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
            >
              <Flag className="mr-2 h-4 w-4" />
              Soumettre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
