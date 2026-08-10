"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FlaskConical, Target } from "lucide-react";
import { LAB_GUIDES } from "@/lib/mentor";
import { cn } from "@/lib/utils";

interface LabAssistantProps {
  onReveal: (level: number, text: string) => void;
}

export function LabAssistant({ onReveal }: LabAssistantProps) {
  const guides = Object.values(LAB_GUIDES);
  const [activeId, setActiveId] = useState(guides[0].id);
  const [revealed, setRevealed] = useState(0);

  const guide = guides.find((g) => g.id === activeId) ?? guides[0];
  const canReveal = (level: number) =>
    level === revealed + 1 || (level === 4 && revealed === 3);

  function reveal(level: number) {
    if (!canReveal(level)) return;
    const text = level === 4 ? guide.solution : guide.hints[level - 1];
    setRevealed(level);
    onReveal(level, text);
  }

  const steps = [
    { level: 1, label: "Indice 1" },
    { level: 2, label: "Indice 2" },
    { level: 3, label: "Indice 3" },
    { level: 4, label: "Solution" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-cyber-500/30 bg-cyber-500/[0.05] p-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-cyber-400">
          <FlaskConical className="h-3.5 w-3.5" />
          Lab Assistant
        </span>
        <div className="ml-auto flex gap-1.5">
          {guides.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setActiveId(g.id);
                setRevealed(0);
              }}
              className={cn(
                "rounded-md border px-2 py-1 text-[11px] transition-colors",
                g.id === activeId
                  ? "border-cyber-500/50 bg-cyber-500/10 text-cyber-400"
                  : "border-border text-muted-foreground hover:text-ink"
              )}
            >
              {g.title}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-2 flex items-start gap-1.5 text-xs text-ink-dim">
        <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyber-500" />
        Objectif : {guide.objective}
      </p>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {steps.map((step) => {
          const isRevealed = revealed >= step.level;
          const available = canReveal(step.level);
          return (
            <button
              key={step.level}
              onClick={() => reveal(step.level)}
              disabled={!available && !isRevealed}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] transition-colors",
                isRevealed
                  ? "border-success/50 bg-success/10 text-success"
                  : available
                    ? "border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
                    : "cursor-not-allowed border-border text-muted-foreground opacity-50"
              )}
            >
              {step.label}
              {!isRevealed && <ChevronRight className="h-3 w-3" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
