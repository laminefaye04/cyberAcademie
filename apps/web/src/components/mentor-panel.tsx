"use client";

import Link from "next/link";
import { Bot, Lightbulb, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MentorPanelProps {
  context: string;
  tip: string;
  hint?: string;
  compact?: boolean;
  badge?: string;
}

export function MentorPanel({
  context,
  tip,
  hint,
  compact = false,
  badge,
}: MentorPanelProps) {
  return (
    <Card
      className={
        compact
          ? "border-cyber-500/40 bg-cyber-500/[0.05]"
          : "border-cyber-500/40 bg-cyber-500/[0.05]"
      }
    >
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-cyber-500/40">
            <AvatarFallback className="bg-cyber-500/15 text-cyber-500">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5 text-cyber-500" />
              Mentor IA
            </p>
            <p className="flex items-center gap-1.5 text-xs text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {context}
            </p>
          </div>
          {badge && (
            <span className="ml-auto rounded-full border border-cyber-500/30 bg-cyber-500/10 px-2 py-0.5 text-[10px] text-cyber-400">
              {badge}
            </span>
          )}
        </div>

        <p className="rounded-md border border-cyber-500/20 bg-night-800/60 p-3 text-sm leading-relaxed text-ink-dim">
          {tip}
        </p>

        {hint && (
          <div className="flex items-start gap-2 rounded-md border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
            {hint}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
          >
            <Link href="/mentor">Poursuivre la discussion</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
          >
            <Link href="/mentor">Ouvrir le chat</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
