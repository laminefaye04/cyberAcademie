"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_USER } from "@/lib/mock";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Explique-moi le triple handshake TCP simplement",
  "Quelle est la différence entre XSS stocké et réfléchi ?",
  "Comment bien préparer un CTF ?",
  "Que dois-je apprendre après le niveau Networking ?",
];

const MENTOR_RESPONSES: Record<string, string> = {
  "explique-moi le triple handshake tcp simplement": `Imaginez que vous frappez à la porte de quelqu'un.

1. Vous frappez (SYN) — « je veux parler »
2. La personne ouvre et répond (SYN-ACK) — « d'accord, je t'écoute »
3. Vous entrez (ACK) — la conversation commence

Les deux interlocuteurs se sont mis d'accord : la connexion est fiable. En cybersécurité, un scan SYN n'envoie que la première étape : si le port répond SYN-ACK, il est ouvert. C'est plus discret qu'une connexion complète.`,
  "quelle est la différence entre xss stocké et réfléchi": `Très bonne question, ${DEMO_USER.pseudo}.

• XSS réfléchi : l'attaque est dans l'URL et renvoyée immédiatement par le serveur. Elle ne touche que la victime qui clique sur le lien malveillant.

• XSS stocké : l'attaque est enregistrée sur le serveur (commentaire, profil...) et exécutée par tous les visiteurs de la page.

En résumé : réfléchi = à usage unique via le lien, stocké = persisté pour tous. Le stocké est le plus dangereux car il touche beaucoup plus de monde.`,
  "comment bien préparer un ctf ?": `Voici ma méthode pour les CTF :

1. Solidifiez les fondamentaux : Linux, networking, web (OWASP Top 10)
2. Entraînez-vous sur des plateformes comme CyberAcademy, Root-Me ou TryHackMe
3. Construisez votre toolbox mentale : nmap, gobuster, Burp Suite, john, hashcat
4. Documentez chaque challenge résolu — votre futur portfolio
5. Faites des CTF chronométrés (notre niveau 7 est fait pour ça)

Commencez petit, résolvez d'abord les easy flags, puis augmentez la difficulté progressivement.`,
  "que dois-je apprendre après le niveau networking ?": `D'après votre progression actuelle, voici mon conseil :

Vous terminez le niveau 2 (Networking). Prochaine étape logique : le niveau 3 — Python / Bash pour la cybersécurité.

Pourquoi ? La plupart des outils de pentest sont en Python, et l'automatisation vous fera gagner un temps précieux dès les niveaux web. Je vous recommande de :
- réviser les bases de Python (boucles, fonctions, requêtes HTTP)
- faire le lab « Capture TCP » pour valider le niveau 2
- ensuite attaquer le module 1 du niveau 3

Souhaitez-vous que je génère un plan de révision sur 7 jours ?`,
};

const FALLBACK = `Bonne question ! Je m'appuie sur le contenu pédagogique officiel de la plateforme pour vous répondre précisément. Pouvez-vous reformuler, ou précisez le sujet (réseau, web, Linux, CTF...) ?`;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: `Bonjour ${DEMO_USER.pseudo} ! 👋 Je suis votre Cyber Mentor. Posez-moi n'importe quelle question sur vos cours, vos labs, ou un concept que vous n'avez pas compris.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function answerFor(text: string): string {
    const normalized = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .trim();
    for (const [key, response] of Object.entries(MENTOR_RESPONSES)) {
      if (normalized.includes(key)) return response;
    }
    return FALLBACK;
  }

  function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", content: clean },
    ]);
    setInput("");
    setTyping(true);
    const response = answerFor(clean);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", content: response },
      ]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-6 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Sparkles className="h-5 w-5 text-cyber-500" />
            Cyber Mentor IA
          </h1>
          <p className="mt-1 text-sm text-ink-dim">
            Adapte son niveau de vulgarisation à votre profil. Modèle open
            source auto-hébergé.
          </p>
        </div>
        <Badge className="bg-cyber-500/15 text-cyber-400">Module IA · v1</Badge>
      </div>

      <Card className="flex min-h-0 flex-1 flex-col">
        <CardHeader className="border-b border-border py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-cyber-500/40">
              <AvatarFallback className="bg-cyber-500/15 text-cyber-500">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">Cyber Mentor</CardTitle>
              <p className="flex items-center gap-1.5 text-xs text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                En ligne
              </p>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1">
          <CardContent className="space-y-4 p-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  {message.role === "assistant" ? (
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
                    "max-w-[85%] whitespace-pre-wrap rounded-lg border px-4 py-3 text-sm leading-relaxed",
                    message.role === "assistant"
                      ? "border-border bg-night-800 text-ink"
                      : "border-cyber-500/40 bg-cyber-500/10 text-ink"
                  )}
                >
                  {message.content}
                </div>
              </motion.div>
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
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-500 [animation-delay:0.15s]"
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-500 [animation-delay:0.3s]"
                  />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </CardContent>
        </ScrollArea>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="shrink-0 rounded-full border border-cyber-500/30 bg-cyber-500/5 px-3 py-1.5 text-xs text-cyber-400 transition-colors hover:bg-cyber-500/15"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="flex items-end gap-2"
          >
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Posez votre question à votre mentor..."
              className="max-h-32 min-h-[48px] flex-1 resize-none bg-night-800"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage(input);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || typing}
              className="h-12 w-12 shrink-0 bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
