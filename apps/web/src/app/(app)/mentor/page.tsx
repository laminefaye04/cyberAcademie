"use client";

import { useRef, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MentorHeader } from "@/components/mentor/mentor-header";
import { ConversationSidebar } from "@/components/mentor/conversation-sidebar";
import { ChatWindow } from "@/components/mentor/chat-window";
import { LearningProfile } from "@/components/mentor/learning-profile";
import {
  AI_RECOMMENDATIONS_CONTEXT,
} from "@/lib/mock";
import {
  HANDSHAKE_REPLY,
  LAB_MODE_INTRO,
  MENTOR_CONVERSATIONS,
  getLabReply,
  getMentorReply,
  type ChatMessage,
  type MentorMode,
  type QuickActionId,
} from "@/lib/mentor";

export default function CyberMentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      content: AI_RECOMMENDATIONS_CONTEXT.intro,
    },
    {
      id: 1,
      role: "user",
      content: "Explique-moi le triple handshake TCP simplement",
    },
    {
      id: 2,
      role: "assistant",
      handshake: HANDSHAKE_REPLY,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<MentorMode>("mentor");
  const [activeConversationId, setActiveConversationId] = useState("c1");
  const [convOpen, setConvOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const labIntroShown = useRef(false);
  const nextId = useRef(3);

  function pushAssistant(content: string) {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "assistant", content },
    ]);
  }

  function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    const reply =
      mode === "lab" ? getLabReply(clean) : getMentorReply(clean);
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

  function changeMode(next: MentorMode) {
    setMode(next);
    if (next === "lab" && !labIntroShown.current) {
      labIntroShown.current = true;
      pushAssistant(LAB_MODE_INTRO);
    }
  }

  function handleFaq(question: string) {
    if (question === "Aide sur un lab") {
      changeMode("lab");
    } else {
      sendMessage(question);
    }
  }

  function handleLabReveal(level: number, text: string) {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "assistant", labHint: { level, text } },
    ]);
  }

  function handleQuickAction(id: QuickActionId) {
    switch (id) {
      case "explain":
        sendMessage("Explique-moi le triple handshake TCP simplement");
        break;
      case "lab":
        changeMode("lab");
        break;
      case "weaknesses":
        sendMessage("Quelles sont mes faiblesses ?");
        break;
      case "next":
        sendMessage("Quelle est ma prochaine étape ?");
        break;
    }
  }

  function handleNewConversation() {
    setMessages([
      {
        id: nextId.current++,
        role: "assistant",
        content: AI_RECOMMENDATIONS_CONTEXT.intro,
      },
    ]);
    setActiveConversationId(`c${MENTOR_CONVERSATIONS.length + 1}`);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:h-screen">
      <MentorHeader
        onOpenConversations={() => setConvOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
      />

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
          onFaqSelect={handleFaq}
          onLabReveal={handleLabReveal}
          mode={mode}
          onModeChange={changeMode}
        />

        <LearningProfile
          onQuickAction={handleQuickAction}
          className="hidden xl:block"
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

      {/* Tablette / mobile : profil d'apprentissage */}
      <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent
          side="right"
          className="w-80 overflow-y-auto border-border bg-night-900"
        >
          <LearningProfile
            onQuickAction={(id) => {
              handleQuickAction(id);
              setProfileOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
