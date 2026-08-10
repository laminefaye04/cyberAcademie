"use client";

import { MessageSquareText, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MENTOR_CONVERSATIONS } from "@/lib/mentor";
import { cn } from "@/lib/utils";

interface ConversationSidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  className?: string;
}

export function ConversationSidebar({
  activeId,
  onSelect,
  onNew,
  className,
}: ConversationSidebarProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 w-64 shrink-0 flex-col gap-3",
        className
      )}
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <MessageSquareText className="h-4 w-4 text-cyber-500" />
          Conversation
        </h2>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="w-full justify-start border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
        onClick={onNew}
      >
        <Plus className="h-3.5 w-3.5" />
        Nouvelle discussion
      </Button>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Rechercher..."
          className="h-8 w-full rounded-md border border-border bg-night-800/60 pr-3 pl-8 text-xs outline-none placeholder:text-muted-foreground focus:border-cyber-500/40"
        />
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
        {MENTOR_CONVERSATIONS.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "flex w-full flex-col gap-0.5 rounded-md border px-3 py-2 text-left transition-colors",
              conversation.id === activeId
                ? "border-cyber-500/40 bg-cyber-500/[0.08]"
                : "border-transparent hover:bg-secondary/40"
            )}
          >
            <span
              className={cn(
                "truncate text-xs font-medium",
                conversation.id === activeId ? "text-cyber-400" : "text-ink"
              )}
            >
              {conversation.title}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {conversation.time}
            </span>
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-muted-foreground hover:text-ink"
      >
        Voir toutes les conversations
      </Button>
    </div>
  );
}
