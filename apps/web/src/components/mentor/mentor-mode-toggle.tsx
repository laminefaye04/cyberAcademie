"use client";

import { FlaskConical, GraduationCap } from "lucide-react";
import type { MentorMode } from "@/lib/mentor";
import { cn } from "@/lib/utils";

interface MentorModeToggleProps {
  mode: MentorMode;
  onChange: (mode: MentorMode) => void;
}

const MODES: { value: MentorMode; label: string; hint: string; icon: typeof GraduationCap }[] = [
  { value: "mentor", label: "Mode Mentor", hint: "Explique, reformule, teste", icon: GraduationCap },
  { value: "lab", label: "Mode Lab Assistant", hint: "Indices progressifs sans spoiler", icon: FlaskConical },
];

export function MentorModeToggle({ mode, onChange }: MentorModeToggleProps) {
  return (
    <div className="flex items-center gap-2">
      {MODES.map((item) => {
        const active = mode === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors",
              active
                ? "border-cyber-500/50 bg-cyber-500/10 text-cyber-400"
                : "border-border bg-transparent text-muted-foreground hover:border-cyber-500/30 hover:text-ink-dim"
            )}
          >
            <item.icon className="h-3.5 w-3.5" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
