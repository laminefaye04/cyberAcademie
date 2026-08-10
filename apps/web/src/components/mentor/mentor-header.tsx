"use client";

import { Bot, MessageSquareText, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MentorHeaderProps {
  onOpenConversations: () => void;
  onOpenProfile: () => void;
}

export function MentorHeader({
  onOpenConversations,
  onOpenProfile,
}: MentorHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 pt-4 sm:px-6 lg:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyber-500/40 bg-cyber-500/10">
          <Bot className="h-5 w-5 text-cyber-500" />
        </span>
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            Cyber Mentor IA
          </h1>
          <p className="truncate text-xs text-ink-dim sm:text-sm">
            Votre tuteur IA personnel qui connaît votre progression et vous
            aide à maîtriser la cybersécurité.
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Badge className="hidden bg-cyber-500/15 text-cyber-400 sm:inline-flex">
          Module IA · v1.0 (Open Source)
        </Badge>
        <span className="flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-xs text-success">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          En ligne
        </span>
        <Button
          variant="outline"
          size="sm"
          className="border-border text-ink-dim lg:hidden"
          onClick={onOpenConversations}
        >
          <MessageSquareText className="h-4 w-4" />
          Conversations
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-border text-ink-dim xl:hidden"
          onClick={onOpenProfile}
        >
          <UserRound className="h-4 w-4" />
          Profil
        </Button>
      </div>
    </div>
  );
}
