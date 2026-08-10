"use client";

import { useRef, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MentorHeader } from "@/components/mentor/mentor-header";
import { ConversationSidebar } from "@/components/mentor/conversation-sidebar";
import { ChatWindow } from "@/components/mentor/chat-window";
import {
  MENTOR_CONVERSATIONS,
  MENTOR_GREETING,
  getMentorReply,
  type ChatMessage,
} from "@/lib/mentor";

export default function CyberMentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "assistant", content: MENTOR_GREETING },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [activeConversationId, setActiveConversationId] = useState("c1");
  const [convOpen, setConvOpen] = useState(false);
  const nextId = useRef(1);

  function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    const reply = getMentorReply(clean);
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", content: clean },
    ]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", ...reply },
      ]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  function handleNewConversation() {
    setMessages([
      { id: nextId.current++, role: "assistant", content: MENTOR_GREETING },
    ]);
    setActiveConversationId(`c${MENTOR_CONVERSATIONS.length + 1}`);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:h-screen">
      <MentorHeader onOpenConversations={() => setConvOpen(true)} />

      <div className="flex min-h-0 flex-1 gap-4 px-4 py-4 sm:px-6 lg:px-4">
        <ConversationSidebar
          activeId={activeConversationId}
          onSelect={setActiveConversationId}
          onNew={handleNewConversation}
          className="hidden lg:flex"
        />

        <ChatWindow
          messages={messages}
          typing={typing}
          input={input}
          onInputChange={setInput}
          onSend={sendMessage}
          onFaqSelect={sendMessage}
        />
      </div>

      {/* Mobile : liste des conversations */}
      <Sheet open={convOpen} onOpenChange={setConvOpen}>
        <SheetContent
          side="left"
          className="w-72 overflow-y-auto border-border bg-night-900"
        >
          <ConversationSidebar
            activeId={activeConversationId}
            onSelect={(id) => {
              setActiveConversationId(id);
              setConvOpen(false);
            }}
            onNew={() => {
              handleNewConversation();
              setConvOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
