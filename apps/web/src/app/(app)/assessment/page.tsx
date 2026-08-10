"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Compass, Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ASSESSMENT_DOMAINS,
  ASSESSMENT_QUESTIONS,
  recommendLevel,
  type AssessmentQuestion,
} from "@/lib/assessment";
import { V1_LEVELS } from "@/lib/roadmap";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cyberacademy_assessment_done";

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    pct: number;
    byDomain: Record<string, number>;
    level: number;
  } | null>(null);

  useEffect(() => {
    async function checkDone() {
      if (isSupabaseConfigured && supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("initial_assessments")
            .select("id")
            .eq("user_id", user.id)
            .limit(1);
          if (data && data.length > 0) {
            router.replace("/dashboard");
            return;
          }
        }
      } else if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
        router.replace("/dashboard");
        return;
      }
      setChecking(false);
    }
    checkDone();
  }, [router]);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === ASSESSMENT_QUESTIONS.length;

  const score = useMemo(() => {
    let correct = 0;
    const byDomain: Record<string, number> = {};
    for (const domain of ASSESSMENT_DOMAINS) byDomain[domain.id] = 0;
    for (const question of ASSESSMENT_QUESTIONS) {
      const chosen = answers[question.id];
      if (chosen === undefined) continue;
      if (chosen === question.answerIndex) {
        correct += 1;
        byDomain[question.domain] += 1;
      }
    }
    const pct = Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100);
    return { pct, byDomain };
  }, [answers]);

  function pick(question: AssessmentQuestion, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  async function submit() {
    setSubmitting(true);
    const domainPct: Record<string, number> = {};
    for (const domain of ASSESSMENT_DOMAINS) {
      const total = ASSESSMENT_QUESTIONS.filter(
        (q) => q.domain === domain.id
      ).length;
      domainPct[domain.id] = Math.round(
        (score.byDomain[domain.id] / total) * 100
      );
    }
    const level = recommendLevel(score.pct);

    if (isSupabaseConfigured && supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("initial_assessments").insert({
          user_id: user.id,
          answers,
          score_by_domain: domainPct,
          recommended_level: level,
        });
        await supabase
          .from("profiles")
          .update({ assessment_done: true })
          .eq("id", user.id);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, "1");
    }

    setSubmitting(false);
    setResult({ pct: score.pct, byDomain: domainPct, level });
  }

  const recommended = result ? V1_LEVELS[result.level] : null;

  if (checking) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-cyber-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <Compass className="h-6 w-6 text-cyber-500" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Évaluation initiale
          </h1>
          <p className="mt-1 text-sm text-ink-dim">
            Quelques questions pour estimer ton niveau et te faire commencer au
            bon endroit. Environ 3 minutes.
          </p>
        </div>
      </div>

      {!result ? (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {answeredCount}/{ASSESSMENT_QUESTIONS.length} réponses
            </span>
            <span className="text-cyber-400">{score.pct}%</span>
          </div>
          <Progress
            value={(answeredCount / ASSESSMENT_QUESTIONS.length) * 100}
            className="h-1.5 bg-night-800"
          />

          {ASSESSMENT_DOMAINS.map((domain) => {
            const questions = ASSESSMENT_QUESTIONS.filter(
              (q) => q.domain === domain.id
            );
            return (
              <Card key={domain.id}>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span>{domain.icon}</span>
                    {domain.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  {questions.map((question) => (
                    <div key={question.id}>
                      <p className="mb-2 text-sm font-medium">
                        {question.question}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {question.options.map((option, optionIndex) => {
                          const selected = answers[question.id] === optionIndex;
                          return (
                            <button
                              key={option}
                              onClick={() => pick(question, optionIndex)}
                              className={cn(
                                "rounded-md border px-3 py-2 text-left text-sm transition-colors",
                                selected
                                  ? "border-cyber-500/60 bg-cyber-500/10 text-cyber-400"
                                  : "border-border bg-night-800/60 text-ink-dim hover:border-cyber-500/30 hover:text-ink"
                              )}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              onClick={submit}
              disabled={!allAnswered || submitting}
              className="bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Voir ma recommandation
            </Button>
            <Link
              href="/roadmap"
              className="text-sm text-ink-dim hover:text-cyber-500"
            >
              Commencer directement la roadmap
            </Link>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="border-cyber-500/40 bg-cyber-500/[0.05]">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-semibold">Évaluation terminée</p>
              </div>
              <div>
                <p className="text-sm text-ink-dim">Score global</p>
                <p className="text-3xl font-bold text-cyber-400">
                  {result.pct}%
                </p>
              </div>
              <Progress
                value={result.pct}
                className="h-2 bg-night-800 [&>div]:bg-cyber-500"
              />
              <div className="grid grid-cols-2 gap-2">
                {ASSESSMENT_DOMAINS.map((domain) => (
                  <div
                    key={domain.id}
                    className="rounded-md border border-border bg-night-800/60 p-3"
                  >
                    <p className="text-xs text-muted-foreground">
                      {domain.icon} {domain.label}
                    </p>
                    <p className="mt-1 font-mono text-cyber-400">
                      {result.byDomain[domain.id]}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {recommended && (
            <Card>
              <CardContent className="space-y-3 p-6">
                <p className="text-sm font-semibold">
                  Niveau de départ recommandé
                </p>
                <div className="flex items-center justify-between rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] px-4 py-3">
                  <div>
                    <p className="font-medium">{recommended.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {recommended.subtitle}
                    </p>
                  </div>
                  <Badge className="bg-cyber-500/15 text-cyber-400">
                    Niveau {recommended.id}
                  </Badge>
                </div>
                <p className="text-xs text-ink-dim">
                  Ta roadmap a été personnalisée en conséquence. Tu peux aussi
                  commencer plus haut si tu te sens à l'aise.
                </p>
                <Button
                  asChild
                  className="w-full bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
                >
                  <Link href="/roadmap">
                    Ouvrir ma roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
