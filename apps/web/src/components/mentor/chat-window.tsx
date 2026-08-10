"use client";

import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/mentor/chat-message";
import { ChatInput } from "@/components/mentor/chat-input";
import { FaqChips } from "@/components/mentor/faq-chips";
import { LabAssistant } from "@/components/mentor/lab-assistant";
import type { ChatMessage as ChatMessageData, MentorMode } from "@/lib/mentor";

interface ChatWindowProps {
  messages: ChatMessageData[];
  typing: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSend: (text: string) => void;
  onFaqSelect: (question: string) => void;
  onLabReveal: (level: number, text: string) => void;
  mode: MentorMode;
  onModeChange: (mode: MentorMode) => void;
}

export function ChatWindow({
  messages,
  typing,
  input,
  onInputChange,
  onSend,
  onFaqSelect,
  onLabReveal,
  mode,
  onModeChange,
}: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <Card className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Avatar className="h-9 w-9 border border-cyber-500/40">
          <AvatarFallback className="bg-cyber-500/15 text-cyber-500">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">Cyber Mentor</p>
          <p className="flex items-center gap-1.5 text-xs text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            En ligne
          </p>
        </div>
        <span className="ml-auto hidden rounded-full border border-border bg-night-800 px-2.5 py-1 text-[10px] text-muted-foreground sm:inline">
          {mode === "mentor" ? "Mode Mentor actif" : "Mode Lab Assistant actif"}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {typing && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-cyber-500/15 text-cyber-500">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1 rounded-lg border border-border bg-night-800 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-500" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-500 [animation-delay:0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-500 [animation-delay:0.3s]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="space-y-2 border-t border-border p-3">
        {mode === "lab" && <LabAssistant onReveal={onLabReveal} />}
        <FaqChips onSelect={onFaqSelect} />
        <ChatInput
          value={input}
          onChange={onInputChange}
          onSend={onSend}
          disabled={typing}
          mode={mode}
          onModeChange={onModeChange}
        />
      </div>
    </Card>
  );
}
