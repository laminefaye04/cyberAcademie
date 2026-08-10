"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Star, XCircle } from "lucide-react";
import type { MiniQuiz as MiniQuizData } from "@/lib/mentor";
import { cn } from "@/lib/utils";

interface MiniQuizProps {
  quiz: MiniQuizData;
}

export function MiniQuiz({ quiz }: MiniQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(false);

  const answered = selected !== null;

  function pick(index: number) {
    if (answered) return;
    setSelected(index);
    if (index === quiz.answerIndex) setCorrect(true);
  }

  function retry() {
    setSelected(null);
    setCorrect(false);
  }

  return (
    <div className="mt-3 rounded-lg border border-cyber-500/30 bg-night-800/60 p-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-cyber-400">
        Mini-question
      </p>
      <p className="text-sm font-medium">{quiz.question}</p>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {quiz.options.map((option, index) => {
          const isAnswer = index === quiz.answerIndex;
          const isSelected = selected === index;
          return (
            <button
              key={option}
              onClick={() => pick(index)}
              disabled={answered}
              className={cn(
                "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
                !answered &&
                  "border-border bg-night-700 text-ink hover:border-cyber-500/40 hover:text-cyber-400",
                answered &&
                  isAnswer &&
                  "border-success/60 bg-success/10 text-success",
                answered &&
                  isSelected &&
                  !isAnswer &&
                  "border-danger/60 bg-danger/10 text-danger"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mt-3 flex items-start gap-2 rounded-md border p-2.5 text-xs",
            correct
              ? "border-success/50 bg-success/10 text-success"
              : "border-warning/50 bg-warning/10 text-warning"
          )}
        >
          {correct ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <div className="space-y-1">
            <p className="font-medium">
              {correct ? "Bonne réponse !" : "Pas tout à fait."}
              {correct && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-sm bg-cyber-500/20 px-1.5 py-0.5 font-mono text-[11px]">
                  <Star className="h-3 w-3" /> +10 XP
                </span>
              )}
            </p>
            <p className={correct ? "text-success/80" : "text-warning/80"}>
              {quiz.explanation}
            </p>
            {!correct && (
              <button
                onClick={retry}
                className="mt-1 inline-flex items-center gap-1 rounded-md border border-warning/40 px-2 py-1 text-[11px] text-warning hover:bg-warning/10"
              >
                <RotateCcw className="h-3 w-3" />
                Réessayer
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
