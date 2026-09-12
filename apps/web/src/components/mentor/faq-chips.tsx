"use client";

import { MessageCircle } from "lucide-react";
import { MENTOR_FAQS } from "@/lib/mentor";

interface FaqChipsProps {
  onSelect: (question: string) => void;
}

export function FaqChips({ onSelect }: FaqChipsProps) {
  return (
    <div
      className="relative flex items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:[-webkit-mask-image:none] sm:[mask-image:none]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 1rem, black calc(100% - 1rem), transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, black 1rem, black calc(100% - 1rem), transparent 100%)",
      }}
    >
      <MessageCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      {MENTOR_FAQS.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="shrink-0 rounded-full border border-cyber-500/30 bg-cyber-500/5 px-3 py-1.5 text-xs text-cyber-400 transition-colors hover:bg-cyber-500/15"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
