"use client";

import { motion } from "framer-motion";
import { Bot, Lightbulb } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessage as ChatMessageData } from "@/lib/mentor";
import { DEMO_USER } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { MiniQuiz } from "@/components/mentor/mini-quiz";

interface ChatMessageProps {
  message: ChatMessageData;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex gap-3", !isAssistant && "flex-row-reverse")}
    >
      <Avatar className="h-8 w-8 shrink-0">
        {isAssistant ? (
          <AvatarFallback className="bg-cyber-500/15 text-cyber-500">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-cta-700 text-xs">
            {DEMO_USER.pseudo.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>

      <div
        className={cn(
          "min-w-0 max-w-[88%] space-y-2 rounded-lg border px-4 py-3 text-sm leading-relaxed",
          isAssistant
            ? "border-border bg-night-800 text-ink"
            : "border-cyber-500/40 bg-cyber-500/10 text-ink"
        )}
      >
        {message.content && (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}

        {message.handshake && (
          <div className="space-y-3">
            <p>{message.handshake.intro}</p>

            <ol className="space-y-2">
              {message.handshake.steps.map((step) => (
                <li
                  key={step.num}
                  className="flex items-start gap-2.5 rounded-md border border-border bg-night-700/50 p-2.5"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyber-500/20 font-mono text-[11px] font-bold text-cyber-400">
                    {step.num}
                  </span>
                  <span>
                    <span className="font-mono font-semibold text-cyber-400">
                      {step.title}
                    </span>
                    <span className="text-ink-dim"> — {step.description}</span>
                  </span>
                </li>
              ))}
            </ol>

            <pre className="overflow-x-auto rounded-md border border-cyber-500/20 bg-night-950/70 p-3 font-mono text-[11px] leading-relaxed text-ink-dim">
              {message.handshake.diagram.join("\n")}
            </pre>

            <p className="text-ink-dim">{message.handshake.conclusion}</p>

            <MiniQuiz quiz={message.handshake.quiz} />
          </div>
        )}

        {message.labHint && (
          <div className="flex items-start gap-2 rounded-md border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="mb-0.5 font-semibold">
                {message.labHint.level === 4
                  ? "Solution révélée"
                  : `Indice ${message.labHint.level}/3`}
              </p>
              <p className="text-warning/90">{message.labHint.text}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
