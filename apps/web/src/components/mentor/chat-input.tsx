"use client";

import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MentorModeToggle } from "@/components/mentor/mentor-mode-toggle";
import type { MentorMode } from "@/lib/mentor";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  disabled?: boolean;
  mode: MentorMode;
  onModeChange: (mode: MentorMode) => void;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  mode,
  onModeChange,
}: ChatInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Joindre un fichier"
          className="h-12 w-10 shrink-0 text-muted-foreground hover:text-ink"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Pose ta question sur la cybersécurité..."
          className="max-h-32 min-h-[48px] flex-1 resize-none bg-night-800"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend(value);
            }
          }}
        />
        <Button
          type="button"
          size="icon"
          disabled={!value.trim() || disabled}
          onClick={() => onSend(value)}
          className="h-12 w-12 shrink-0 bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <MentorModeToggle mode={mode} onChange={onModeChange} />
    </div>
  );
}
