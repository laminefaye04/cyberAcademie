"use client";

import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Clock,
  FlaskConical,
  Lightbulb,
  Rocket,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LABS } from "@/lib/labs";
import { cn } from "@/lib/utils";

interface LabPageProps {
  params: Promise<{ slug: string }>;
}

interface OutputLine {
  text: string;
  kind: "command" | "output" | "error" | "success" | "hint";
}

const HINTS: Record<string, string[]> = {
  permissions: [
    "Cherchez les binaires avec le bit setuid (octal 4000).",
    "Le binaire /opt/flag_reader appartient à root et porte le bit s.",
    "Exécutez /opt/flag_reader : il lit un fichier que seul root peut lire.",
  ],
  "tcpdump-capture": [
    "Le trafic passe en clair sur l'interface eth0.",
    "tcpdump -i eth0 -A montre le contenu des paquets.",
    "Le flag est dans un paquet HTTP, cherchez la requête vers /flag.",
  ],
  "find-grep": [
    "Le fichier flag.txt est caché quelque part sous /home.",
    "find /home -name flag.txt localise le fichier.",
    "Puis lisez-le avec cat ou grep pour extraire le flag.",
  ],
};

const COMMANDS: Record<
  string,
  (args: string[]) => { lines: OutputLine[]; solved?: boolean }
> = {
  help: () => ({
    lines: [
      { text: "Commandes disponibles : help, ls, whoami, id, pwd, cat, find, clear", kind: "output" },
      { text: "Astuce : commencez par comprendre l'environnement.", kind: "hint" },
    ],
  }),
  whoami: () => ({
    lines: [{ text: "ctf-user", kind: "output" }],
  }),
  id: () => ({
    lines: [
      { text: "uid=1000(ctf-user) gid=1000(ctf-user) groups=1000(ctf-user)", kind: "output" },
    ],
  }),
  pwd: () => ({
    lines: [{ text: "/home/ctf-user", kind: "output" }],
  }),
  ls: (args) => {
    const path = args[0] ?? "";
    if (path.includes("/opt")) {
      return {
        lines: [
          { text: "total 8", kind: "output" },
          { text: "-rwsr-xr-x 1 root root 17256 flag_reader", kind: "output" },
        ],
      };
    }
    return {
      lines: [
        { text: "total 12", kind: "output" },
        { text: "drwxr-xr-x 2 ctf-user ctf-user  note.txt", kind: "output" },
        { text: "-rw-r--r-- 1 root     root      flag.txt   <- ?", kind: "output" },
      ],
    };
  },
  find: () => ({
    lines: [
      { text: "/opt/flag_reader", kind: "output" },
      { text: "Un seul binaire setuid repéré. Appartient à root.", kind: "hint" },
    ],
  }),
  cat: (args) => {
    const path = args.join(" ");
    if (path.includes("flag_reader")) {
      return {
        lines: [{ text: "Ce binaire porte le bit setuid : il s'exécute avec les droits de root.", kind: "output" }],
      };
    }
    if (path.includes("note")) {
      return {
        lines: [
          { text: "Note : le fichier /root/flag.txt contient le drapeau.", kind: "output" },
          { text: "Peut-être flag_reader peut-il le lire...", kind: "hint" },
        ],
      };
    }
    return {
      lines: [
        { text: "Permission non accordée", kind: "error" },
      ],
    };
  },
  "/opt/flag_reader": () => ({
    lines: [
      { text: "Mode root activé.", kind: "success" },
      { text: "Lecture de /root/flag.txt...", kind: "success" },
      { text: "Objective COMPLETED — vous pouvez soumettre le flag.", kind: "success" },
    ],
    solved: true,
  }),
  clear: () => ({ lines: [] }),
  su: () => ({
    lines: [
      { text: "su: Authentication failure", kind: "error" },
    ],
  }),
};

function initialPrompt(): OutputLine[] {
  return [
    { text: "Conteneur provisionné. Réseau isolé. Bonne chance, hacker.", kind: "output" },
    { text: "Écrire 'help' pour lister les commandes.", kind: "hint" },
  ];
}

export default function LabPage({ params }: LabPageProps) {
  const { slug } = use(params);
  const lab = LABS.find((lab) => lab.slug === slug);

  const [output, setOutput] = useState<OutputLine[]>(initialPrompt());
  const [command, setCommand] = useState("");
  const [solved, setSolved] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hints, setHints] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [flag, setFlag] = useState("");
  const [flagResult, setFlagResult] = useState<"success" | "error" | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const startedAt = useRef(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output, hints]);

  function runCommand(event: React.FormEvent) {
    event.preventDefault();
    const raw = command.trim();
    setCommand("");
    if (!raw) return;
    const [name, ...args] = raw.split(" ");
    const handler = COMMANDS[name] ?? COMMANDS[name.toLowerCase()];
    if (raw.startsWith("/opt/flag_reader")) {
      const result = COMMANDS["/opt/flag_reader"]([]);
      setOutput((prev) => [
        ...prev,
        { text: `$ ${raw}`, kind: "command" },
        ...result.lines,
      ]);
      if (result.solved) setSolved(true);
      return;
    }
    if (handler) {
      const result = handler(args);
      if (name === "clear") {
        setOutput([]);
        return;
      }
      setOutput((prev) => [
        ...prev,
        { text: `$ ${raw}`, kind: "command" },
        ...result.lines,
      ]);
      if (result.solved) setSolved(true);
    } else {
      setOutput((prev) => [
        ...prev,
        { text: `$ ${raw}`, kind: "command" },
        { text: `commande introuvable : ${name}. Essayez 'help'.`, kind: "error" },
      ]);
    }
  }

  function useHint() {
    const available = HINTS[lab?.slug ?? ""] ?? [];
    if (hints.length >= available.length) return;
    setHintsUsed((count) => count + 1);
    setHints((prev) => [...prev, available[prev.length]]);
  }

  function submitFlag(event: React.FormEvent) {
    event.preventDefault();
    if (flag.trim().toLowerCase().includes("flag{cyberacademy_root}")) {
      setFlagResult("success");
    } else {
      setFlagResult("error");
    }
  }

  if (!lab) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Lab introuvable</h1>
        <Button asChild className="mt-6 bg-cta-700 text-white hover:bg-cta-600">
          <Link href="/labs">Retour aux labs</Link>
        </Button>
      </div>
    );
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const score = Math.max(0, 100 - hintsUsed * 15 - Math.floor(elapsed / 60) * 2);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{lab.title}</h1>
          <p className="mt-1 text-sm text-ink-dim">
            Niveau {lab.levelId} · {lab.difficulty} · Lab{" "}
            {lab.type === "linux"
              ? "Linux"
              : lab.type === "web"
                ? "Web"
                : lab.type === "network"
                  ? "Réseau"
                  : "CTF"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-sm text-cyber-500">
            <Clock className="h-4 w-4" />
            {mm}:{ss}
          </span>
          <Badge
            className={
              solved
                ? "bg-cyber-500 text-primary-foreground"
                : "bg-night-800 text-ink-dim"
            }
          >
            {solved ? "Objectif atteint" : "En cours"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Terminal */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-border/80">
            <div className="flex items-center gap-2 border-b border-border bg-night-900 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-danger/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                ctf-user@lab-{lab.id.slice(-2)}: ~
              </span>
            </div>
            <div className="h-80 overflow-y-auto bg-night-950 p-4 font-mono text-sm">
              {output.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "whitespace-pre-wrap break-all leading-6",
                    line.kind === "command" && "text-cyber-400",
                    line.kind === "output" && "text-ink-dim",
                    line.kind === "error" && "text-danger",
                    line.kind === "success" && "text-success",
                    line.kind === "hint" && "text-warning/90"
                  )}
                >
                  {line.text}
                </div>
              ))}
              <form onSubmit={runCommand} className="flex items-center">
                <span className="text-cyber-500">$&nbsp;</span>
                <input
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  className="flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted-foreground"
                  placeholder="tapez une commande..."
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
              <div ref={endRef} />
            </div>
          </Card>

          {/* Objectives + flag */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Objectifs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lab.objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-ink-dim"
                  >
                    {index === 0 && solved ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    {objective}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className={flagResult === "success" ? "border-cyber-500/60" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FlaskConical className="h-4 w-4 text-cyber-500" />
                  Soumettre le flag
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <form onSubmit={submitFlag} className="flex gap-2">
                  <Input
                    value={flag}
                    onChange={(event) => setFlag(event.target.value)}
                    placeholder="flag{...}"
                    className="bg-night-800 font-mono text-sm"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
                  >
                    Valider
                  </Button>
                </form>
                {flagResult === "success" && (
                  <div className="flex items-center gap-2 rounded-md border border-cyber-500/50 bg-cyber-500/10 p-3 text-sm text-cyber-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Lab validé ! +{lab.xp} XP · Score : {score}%
                  </div>
                )}
                {flagResult === "error" && (
                  <div className="flex items-center gap-2 rounded-md border border-danger/50 bg-danger/10 p-3 text-sm text-danger">
                    <XCircle className="h-4 w-4" />
                    Flag incorrect. Continuez à explorer.
                  </div>
                )}
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Rocket className="h-3.5 w-3.5" />
                  Provisionné dans un conteneur dédié, détruit en fin de
                  session.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="border-cyber-500/40 bg-cyber-500/[0.05]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="h-4 w-4 text-cyber-500" />
                IA Lab Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-ink-dim">
                Besoin d'un coup de pouce ? Les indices vont du plus général au
                plus précis.
              </p>
              <Button
                onClick={useHint}
                variant="outline"
                className="w-full border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Demander un indice ({hintsUsed}/3)
              </Button>
              <div className="space-y-2">
                {hints.map((hint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm text-warning"
                  >
                    Indice {index + 1} : {hint}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-5">
              <p className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Réussite</span>
                <span className="font-medium">60 pts</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Temps</span>
                <span className="font-medium">{mm}:{ss}</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Indices utilisés</span>
                <span className="font-medium">{hintsUsed}/3</span>
              </p>
              <div className="border-t border-border pt-3">
                <p className="flex items-center justify-between text-sm font-medium">
                  <span>Score estimé</span>
                  <span className="text-cyber-500">{score}%</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Le score baisse avec le temps et les indices. {lab.xp} XP à la
                  clé.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
