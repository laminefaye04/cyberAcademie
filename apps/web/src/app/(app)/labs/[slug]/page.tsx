"use client";

import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Circle,
  Clock,
  Copy,
  Crosshair,
  ExternalLink,
  FlaskConical,
  Gamepad2,
  Globe,
  HelpCircle,
  Lightbulb,
  Lock,
  Play,
  Rocket,
  RotateCcw,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  getLab,
  getMode,
  MODES,
  type Lab,
  type LabMode,
} from "@/lib/labs";
import type { ExternalLab } from "@/lib/externalLabs";
import {
  EXTERNAL_PLATFORM_INFO,
  getExternalLab,
} from "@/lib/externalLabs";
import { ROADMAP_LEVELS } from "@/lib/roadmap";
import {
  isExternalLabVerified,
  markExternalLabStarted,
  markExternalLabVerified,
  markNativeLabCompleted,
} from "@/lib/labProgress";
import { cn } from "@/lib/utils";

interface LabPageProps {
  params: Promise<{ slug: string }>;
}

interface OutputLine {
  text: string;
  kind: "command" | "output" | "error" | "success" | "hint";
}

const COMMANDS: Record<
  string,
  (args: string[], lab: Lab) => { lines: OutputLine[]; solved?: boolean }
> = {
  help: () => ({
    lines: [
      {
        text: "Commandes disponibles : help, ls, cd, pwd, whoami, id, ps, find, cat, curl, nmap, python, clear",
        kind: "output",
      },
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
  cd: (args) => {
    const path = args[0] ?? "~";
    if (path === "~" || path === "." || path === "") {
      return { lines: [{ text: "/home/ctf-user", kind: "output" }] };
    }
    return {
      lines: [
        {
          text: `Répertoire courant : ${path.startsWith("/") ? path : `/home/ctf-user/${path}`}`,
          kind: "output",
        },
      ],
    };
  },
  ls: (args, lab) => {
    const path = args[0] ?? "";
    if (path.includes("/opt")) {
      return {
        lines: [
          { text: "total 8", kind: "output" },
          { text: "-rwsr-xr-x 1 root root 17256 flag_reader", kind: "output" },
        ],
      };
    }
    if (lab.slug === "terminal-navigation" || lab.slug === "find-grep") {
      return {
        lines: [
          { text: "total 12", kind: "output" },
          { text: "drwxr-xr-x 2 ctf-user ctf-user  docs", kind: "output" },
          { text: "-rw-r--r-- 1 root     root      flag.txt   <- ?", kind: "output" },
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
  find: (args, lab) => {
    if (lab.slug === "find-grep" || lab.slug === "terminal-navigation") {
      return {
        lines: [
          { text: "/home/ctf-user/flag.txt", kind: "output" },
          { text: "Fichier trouvé. Lisez-le avec cat pour récupérer le flag.", kind: "hint" },
        ],
      };
    }
    return {
      lines: [
        { text: "/opt/flag_reader", kind: "output" },
        { text: "Un seul binaire setuid repéré. Appartient à root.", kind: "hint" },
      ],
    };
  },
  ps: (args, lab) => {
    if (lab.slug === "process-explorer") {
      const filtered = args.some(
        (a) => a.toLowerCase() === "flag" || a.toLowerCase() === "grep"
      );
      if (filtered) {
        return {
          lines: [
            {
              text: "root     3141  0.0  0.1  /usr/sbin/flag-service --flag flag{process_watcher}",
              kind: "success",
            },
            { text: "Processus suspect identifié. Objectif atteint.", kind: "hint" },
          ],
          solved: true,
        };
      }
      return {
        lines: [
          { text: "USER     PID  %CPU %MEM CMD", kind: "output" },
          { text: "root       1   0.0  0.2  /sbin/init", kind: "output" },
          { text: "root     110   0.0  0.3  /usr/sbin/sshd", kind: "output" },
          { text: "ctf-us 3141   0.3  0.1  /usr/sbin/flag-service --flag ...", kind: "output" },
          { text: "Un processus nommé flag-service semble anormal.", kind: "hint" },
        ],
      };
    }
    return {
      lines: [
        { text: "PID   CMD", kind: "output" },
        { text: "1     init", kind: "output" },
      ],
    };
  },
  cat: (args, lab) => {
    const path = args.join(" ");
    if (
      path.includes("flag.txt") &&
      (lab.slug === "find-grep" ||
        lab.slug === "terminal-navigation" ||
        lab.slug === "system-info" ||
        lab.slug === "file-explorer")
    ) {
      return {
        lines: [
          { text: lab.flag, kind: "success" },
          { text: "Flag récupéré. Soumettez-le pour valider la mission.", kind: "hint" },
        ],
        solved: true,
      };
    }
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
      lines: [{ text: "Permission non accordée", kind: "error" }],
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
  nmap: () => ({
    lines: [
      { text: "Starting Nmap scan...", kind: "output" },
      { text: "PORT    STATE  SERVICE", kind: "output" },
      { text: "21/tcp  open   ftp", kind: "output" },
      { text: "22/tcp  open   ssh", kind: "output" },
      { text: "80/tcp  open   http", kind: "output" },
      { text: "443/tcp open   https", kind: "output" },
      { text: "4 ports ouverts détectés.", kind: "hint" },
    ],
  }),
  python: () => ({
    lines: [
      { text: "Le script scanner.py est prêt : python scanner.py <cible>", kind: "output" },
      { text: "Lancez python scanner.py 10.10.10.25 pour scanner la cible.", kind: "hint" },
    ],
  }),
  curl: (args, lab) => {
    const url = args.join(" ");
    if (
      lab.slug === "http-basics" &&
      (args.includes("-v") ||
        args.includes("-I") ||
        url.includes("192.168.56.2"))
    ) {
      return {
        lines: [
          { text: "> GET / HTTP/1.1", kind: "output" },
          { text: "> Host: 192.168.56.2", kind: "output" },
          { text: "< HTTP/1.1 200 OK", kind: "output" },
          { text: "< Server: nginx/1.24.0", kind: "output" },
          { text: "< Content-Type: text/html", kind: "output" },
          { text: "< X-CyberAcademy-Flag: flag{http_headers}", kind: "success" },
          { text: "Le flag est dans un en-tête personnalisé. Objectif atteint.", kind: "hint" },
        ],
        solved: true,
      };
    }
    if (url.includes("login") || url.includes("admin")) {
      return {
        lines: [
          { text: "HTTP/1.1 302 Found", kind: "output" },
          { text: "Location: /dashboard", kind: "output" },
          { text: "Set-Cookie: session=admin_f1ea9c2... ; HttpOnly", kind: "output" },
        ],
      };
    }
    return {
      lines: [
        { text: "HTTP/1.1 200 OK", kind: "output" },
        { text: "Bienvenue sur le forum. Un message s'affiche sans échappement : le champ 'message' est vulnérable.", kind: "hint" },
      ],
    };
  },
  clear: () => ({ lines: [] }),
  su: () => ({
    lines: [{ text: "su: Authentication failure", kind: "error" }],
  }),
};

function initialPrompt(): OutputLine[] {
  return [
    { text: "Conteneur provisionné. Réseau isolé. Bonne chance, hacker.", kind: "output" },
    { text: "Écrire 'help' pour lister les commandes.", kind: "hint" },
  ];
}

function briefingFor(labSlug: string) {
  switch (labSlug) {
    case "http-port-scanner":
      return "python";
    case "cookie-session":
    case "http-basics":
      return "curl";
    case "process-explorer":
      return "ps";
    case "port-discovery":
      return "nmap";
    case "terminal-navigation":
      return "ls";
    default:
      return "help";
  }
}

/* ==================================================================
   NATIVE LAB — simulateur terminal
   ================================================================== */
function NativeLabView({ lab }: { lab: Lab }) {
  const [mode, setMode] = useState<LabMode>("standard");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [output, setOutput] = useState<OutputLine[]>(initialPrompt());
  const [command, setCommand] = useState("");
  const [solved, setSolved] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hints, setHints] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [flag, setFlag] = useState("");
  const [flagResult, setFlagResult] = useState<"success" | "error" | null>(null);
  const [copied, setCopied] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output, hints]);

  const modeConfig = getMode(mode);
  const maxHints = modeConfig.hints;
  const level = ROADMAP_LEVELS[lab.levelId];

  function startMission() {
    setStarted(true);
    setOutput(initialPrompt());
  }

  const runCommand = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = command.trim();
    setCommand("");
    if (!raw) return;
    const [name, ...args] = raw.split(" ");
    if (raw.startsWith("/opt/flag_reader")) {
      const result = COMMANDS["/opt/flag_reader"]([], lab);
      setOutput((prev) => [
        ...prev,
        { text: `$ ${raw}`, kind: "command" },
        ...result.lines,
      ]);
      if (result.solved) setSolved(true);
      return;
    }
    const handler = COMMANDS[name] ?? COMMANDS[name.toLowerCase()];
    if (handler) {
      const result = handler(args, lab);
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
      const suggestion =
        briefingFor(lab.slug) === "help"
          ? " Essayez 'help'."
          : ` Essayez '${briefingFor(lab.slug)}' pour ce lab.`;
      setOutput((prev) => [
        ...prev,
        { text: `$ ${raw}`, kind: "command" },
        { text: `commande introuvable : ${name}.${suggestion}`, kind: "error" },
      ]);
    }
  };

  const useHint = () => {
    if (modeConfig.hints === 0) return;
    if (hints.length >= Math.min(lab.hints.length, maxHints)) return;
    setHintsUsed((count) => count + 1);
    setHints((prev) => [...prev, lab.hints[prev.length]]);
  };

  const submitFlag = (event: React.FormEvent) => {
    event.preventDefault();
    if (flag.trim().toLowerCase().includes(lab.flag)) {
      setFlagResult("success");
      setCompleted(true);
      markNativeLabCompleted(lab.id);
    } else {
      setFlagResult("error");
    }
  };

  const copyIp = () => {
    navigator.clipboard?.writeText(lab.machine.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const resetLab = () => {
    setOutput(initialPrompt());
    setCommand("");
    setSolved(false);
    setHintsUsed(0);
    setHints([]);
    setWhyOpen(false);
    setFlag("");
    setFlagResult(null);
    startedAt.current = Date.now();
    setElapsed(0);
  };

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const commandsRun = output.filter((line) => line.kind === "command").length;
  const score = Math.max(0, 100 - hintsUsed * 15 - Math.floor(elapsed / 60) * 2);
  const bonusXp = Math.round((lab.xp * modeConfig.xpBonus) / 100);
  const totalXp = lab.xp + bonusXp;
  const steps = lab.objectives.length;
  const currentStep = solved ? steps : Math.min(steps, hintsUsed + 1);

  /* ---------------- BRIEFING ---------------- */
  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          href="/labs"
          className="inline-flex items-center gap-1.5 text-sm text-cyber-400 hover:underline"
        >
          ← Retour aux missions
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10">
            <Crosshair className="h-6 w-6 text-cyber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
                Lab natif · Niveau {lab.levelId}
              </p>
              <Badge className="bg-cyber-500/15 text-cyber-400">CyberAcademy</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{lab.title}</h1>
          </div>
        </div>

        <Card className="mt-5 border-cyber-500/40 bg-gradient-to-r from-cyber-500/[0.08] to-transparent">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-ink-dim"> Scénario</p>
            <p className="mt-2 text-base leading-relaxed text-ink">
              {lab.scenario}
            </p>
          </CardContent>
        </Card>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-cyber-500" />
                Objectif
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lab.objectives.map((objective, index) => (
                <p key={index} className="flex items-start gap-2 text-sm text-ink-dim">
                  <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyber-500" />
                  {objective}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-cyber-500" />
                Compétences acquises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {lab.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-cyber-500/30 bg-cyber-500/[0.06] text-cyber-400"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardContent className="grid gap-3 p-5 sm:grid-cols-2">
            <p className="flex items-center gap-2 text-sm text-ink-dim">
              <Clock className="h-4 w-4 text-cyber-500" />
              <span className="text-muted-foreground">Temps :</span>
              <span className="font-medium">{lab.duration}</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-ink-dim">
              <Wrench className="h-4 w-4 text-cyber-500" />
              <span className="text-muted-foreground">Outils :</span>
              <span className="font-medium">{lab.tools.join(", ")}</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-ink-dim">
              <Server className="h-4 w-4 text-cyber-500" />
              <span className="text-muted-foreground">Machine :</span>
              <span className="font-mono text-xs">{lab.machine.os}</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-ink-dim">
              <ShieldCheck className="h-4 w-4 text-cyber-500" />
              <span className="text-muted-foreground">Environnement :</span>
              <span className="font-medium">Conteneur isolé</span>
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 border-cyber-500/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-4 w-4 text-cyber-500" />
              Récompenses
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] p-3 text-center">
              <p className="text-cyber-400">+{lab.xp} XP</p>
              <p className="mt-0.5 text-xs text-muted-foreground">base</p>
            </div>
            <div className="rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] p-3 text-center">
              <p className="font-medium"> {lab.badge}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">badge obtenu</p>
            </div>
            <div className="rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] p-3 text-center">
              <p className="text-ink">→ {lab.unlock}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">débloque</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gamepad2 className="h-4 w-4 text-cyber-500" />
              Choisissez votre mode
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {MODES.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setMode(option.value)}
                className={cn(
                  "rounded-md border p-3 text-left transition-colors",
                  mode === option.value
                    ? "border-cyber-500/60 bg-cyber-500/10"
                    : "border-border bg-night-900/40 hover:border-cyber-500/30"
                )}
              >
                <p className="flex items-center justify-between font-medium">
                  <span>{option.emoji} {option.label}</span>
                  {mode === option.value && (
                    <CheckCircle2 className="h-4 w-4 text-cyber-500" />
                  )}
                </p>
                <p className="mt-1 text-xs text-ink-dim">{option.description}</p>
                <p className="mt-1.5 text-xs text-cyber-400">
                  {option.hints === 0
                    ? "0 indice"
                    : `${option.hints} indices max`}
                  {option.xpBonus > 0 && ` · +${option.xpBonus}% XP`}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-4 w-4 text-cyber-500" />
              Déroulement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {lab.instructions.map((step, index) => (
              <p key={index} className="flex items-start gap-2 text-sm text-ink-dim">
                <span className="font-mono text-cyber-400">{index + 1}.</span>
                {step}
              </p>
            ))}
          </CardContent>
        </Card>

        {lab.prerequisite && (
          <p className="mt-4 text-sm text-ink-dim">
            <span className="text-muted-foreground">Prérequis conseillé :</span>{" "}
            <Link
              href={`/courses/${lab.prerequisite.courseId}`}
              className="font-medium text-cyber-400 hover:underline"
            >
              {lab.prerequisite.courseTitle}
            </Link>{" "}
            · {lab.prerequisite.lesson}
          </p>
        )}

        <Button
          onClick={startMission}
          size="lg"
          className="mt-6 w-full bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
        >
          <Play className="mr-2 h-5 w-5" />
          Démarrer la mission
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Le conteneur est provisionné à la demande et détruit en fin de session.
        </p>
      </div>
    );
  }

  /* ---------------- SUCCESS ---------------- */
  if (completed) {
    const progress = Math.round(score);
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyber-500 bg-cyber-500/15"
          >
            <Trophy className="h-10 w-10 text-cyber-500" />
          </motion.div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            Mission réussie !
          </h1>
          <p className="mt-2 text-sm text-ink-dim">
            « {lab.title} » validée en {mm}:{ss} · mode {modeConfig.label}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-cyber-500/40 bg-cyber-500/[0.06]">
            <CardContent className="p-5 text-center">
              <p className="flex items-center justify-center gap-1.5 text-2xl font-bold text-cyber-400">
                <Zap className="h-5 w-5" />
                +{totalXp} XP
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lab.xp} base {bonusXp > 0 && `+ ${bonusXp} bonus mode ${modeConfig.label}`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-2xl font-bold"> {lab.badge}</p>
              <p className="mt-1 text-xs text-muted-foreground">badge débloqué</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="flex items-center justify-center gap-1.5 text-2xl font-bold text-success">
                <CheckCircle2 className="h-5 w-5" />
                {progress}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">score final</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-cyber-500" />
              Compétences validées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {lab.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-success/40 bg-success/10 text-success"
                >
                   {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-ink-dim">
              <span className="text-muted-foreground">Compétence renforcée :</span>{" "}
              {lab.skills[0]} — utilisée dans {lab.unlock} et plus loin dans ton
              parcours.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 border-cyber-500/40 bg-cyber-500/[0.06]">
          <CardContent className="flex flex-col items-center gap-4 p-5 sm:flex-row sm:justify-between">
            <div>
              <p className="font-semibold">Prochaine mission</p>
              <p className="mt-1 text-sm text-ink-dim">
                Débloquée : <span className="text-cyber-400">{lab.unlock}</span>
                {level && <> · rattachée au niveau {lab.levelId} — {level.title}</>}
              </p>
            </div>
            <Button
              asChild
              className="bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
            >
              <Link href="/labs">
                Voir les missions <Rocket className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ---------------- IN PROGRESS ---------------- */
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      <Card className="border-cyber-500/40 bg-gradient-to-r from-cyber-500/[0.08] to-transparent">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10">
                <Crosshair className="h-5 w-5 text-cyber-500" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
                  Mission
                </p>
                <p className="font-semibold">{lab.title}</p>
                <p className="mt-0.5 text-xs text-ink-dim">
                  Mode {modeConfig.emoji} {modeConfig.label}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-md border border-border bg-night-800/60 px-3 py-1.5 font-mono text-sm text-cyber-400">
                <Server className="h-3.5 w-3.5" />
                {lab.machine.ip}
              </div>
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
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Étape {currentStep}/{steps}
              </span>
              <span className="text-cyber-400">+{totalXp} XP</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: steps }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    index < currentStep ? "bg-cyber-500" : "bg-night-800"
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{lab.title}</h1>
          <p className="mt-1 text-sm text-ink-dim">
            Niveau {lab.levelId} · {lab.difficulty} ·{" "}
            {lab.machine.os} · {lab.machine.access}
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
                {flagResult === "error" && (
                  <div className="flex items-center gap-2 rounded-md border border-danger/50 bg-danger/10 p-3 text-sm text-danger">
                    <XCircle className="h-4 w-4" />
                    Flag incorrect. Continuez à explorer.
                  </div>
                )}
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Environnement isolé, détruit en fin de session. La solution
                  n'est jamais affichée automatiquement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="border-cyber-500/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Server className="h-4 w-4 text-cyber-500" />
                Cible
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-md border border-border bg-night-800/60 px-3 py-2">
                <span className="text-xs text-muted-foreground">Statut</span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-success">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                  Running
                </span>
              </div>
              <div className="rounded-md border border-border bg-night-900 px-3 py-2.5 font-mono text-sm text-cyber-400">
                {lab.machine.ip}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={copyIp}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
                >
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  {copied ? "Copié " : "Copier IP"}
                </Button>
                <Button
                  onClick={resetLab}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-border text-ink-dim hover:text-ink"
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Reset Lab
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {lab.machine.os} · accès {lab.machine.access} · détruit en fin
                de session
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyber-500/40 bg-cyber-500/[0.05]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="h-4 w-4 text-cyber-500" />
                Besoin d'aide ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border bg-night-800/60 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Objectif
                  </p>
                  <p
                    className="mt-0.5 truncate text-xs font-medium text-ink"
                    title={lab.objectives[0]}
                  >
                    {lab.objectives[0]}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-night-800/60 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Étapes validées
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-medium text-cyber-400">
                    {currentStep}/{steps}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-night-800/60 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Commandes exécutées
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-medium text-ink">
                    {commandsRun}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-night-800/60 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Indices utilisés
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-medium text-ink">
                    {hintsUsed}/{maxHints}
                  </p>
                </div>
              </div>

              <p className="text-sm text-ink-dim">
                {modeConfig.hints === 0
                  ? "Mode Expert : aucun indice disponible. À toi de prouver ta maîtrise."
                  : `Mode ${modeConfig.label} : ${maxHints} indices, du plus général au plus précis.`}
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                <Button
                  onClick={useHint}
                  variant="outline"
                  disabled={modeConfig.hints === 0}
                  className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {modeConfig.hints === 0 ? (
                    <>
                      <Lock className="mr-2 h-4 w-4" /> Indices désactivés
                    </>
                  ) : (
                    <>Indice {Math.min(hintsUsed + 1, maxHints)}</>
                  )}
                </Button>
                <Button
                  onClick={() => setWhyOpen((open) => !open)}
                  variant="outline"
                  className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Pourquoi ?
                </Button>
              </div>

              <AnimatePresence>
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

                {whyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-md border border-cyber-500/30 bg-cyber-500/10 p-3 text-sm"
                  >
                    <p className="mb-1 flex items-center gap-1.5 font-semibold text-cyber-400">
                      <HelpCircle className="h-3.5 w-3.5" />
                      Pourquoi ce lab ?
                    </p>
                    <p className="text-ink-dim">{lab.why}</p>
                    <p className="mt-2 text-ink-dim">{lab.ia}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card className="border-cyber-500/40 bg-cyber-500/[0.05]">
            <CardContent className="space-y-3 p-5">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-cyber-400">
                <Sparkles className="h-3 w-3" />
                Pourquoi cette compétence ?
              </p>
              <p className="text-sm leading-relaxed text-ink-dim">{lab.why}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-5">
              <p className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Réussite</span>
                <span className="font-medium">{lab.successRate}%</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Temps</span>
                <span className="font-medium">{mm}:{ss}</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">Indices utilisés</span>
                <span className="font-medium">{hintsUsed}/{maxHints}</span>
              </p>
              <div className="border-t border-border pt-3">
                <p className="flex items-center justify-between text-sm font-medium">
                  <span>Score estimé</span>
                  <span className="text-cyber-500">{score}%</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Le score baisse avec le temps et les indices. {totalXp} XP à la
                  clé (mode {modeConfig.label}).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   EXTERNAL LAB — mission sur une plateforme tierce
   ================================================================== */
function ExternalLabView({ lab }: { lab: ExternalLab }) {
  const alreadyVerified = isExternalLabVerified(lab.id);
  const [step, setStep] = useState<"briefing" | "declared" | "quiz" | "success">(
    alreadyVerified ? "success" : "briefing"
  );
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    lab.verification.map(() => null)
  );
  const [wrong, setWrong] = useState(false);
  const platformInfo = EXTERNAL_PLATFORM_INFO[lab.platform];
  const level = ROADMAP_LEVELS[lab.levelId];

  const startMission = () => {
    markExternalLabStarted(lab.id);
    setStarted(true);
    window.open(lab.externalUrl, "_blank", "noopener,noreferrer");
    setStep("declared");
  };

  const declareDone = () => setStep("quiz");

  const submitVerification = (event: React.FormEvent) => {
    event.preventDefault();
    const allAnswered = answers.every((a) => a !== null);
    const allCorrect = lab.verification.every((q, i) => answers[i] === q.answer);
    if (allAnswered && allCorrect) {
      markExternalLabVerified(lab.id);
      setWrong(false);
      setStep("success");
    } else {
      setWrong(true);
    }
  };

  /* ---------------- SUCCESS ---------------- */
  if (step === "success") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyber-500 bg-cyber-500/15"
          >
            <CheckCircle2 className="h-10 w-10 text-cyber-500" />
          </motion.div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            Mission externe validée !
          </h1>
          <p className="mt-2 text-sm text-ink-dim">
            « {lab.title} » sur {lab.platform} · compréhension vérifiée
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="border-cyber-500/40 bg-cyber-500/[0.06]">
            <CardContent className="p-5 text-center">
              <p className="flex items-center justify-center gap-1.5 text-2xl font-bold text-cyber-400">
                <Zap className="h-5 w-5" />
                +{lab.xp} XP
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                XP octroyé après validation du mini-quiz
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="flex items-center justify-center gap-1.5 text-2xl font-bold text-success">
                <ShieldCheck className="h-5 w-5" />
                Vérifié
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                compétence enregistrée
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-cyber-500" />
              Compétences validées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {lab.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-success/40 bg-success/10 text-success"
                >
                   {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-ink-dim">
              <span className="text-muted-foreground">Compétence :</span>{" "}
              {lab.skills[0]} — renforcée via une pratique externe réelle.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 border-cyber-500/40 bg-cyber-500/[0.06]">
          <CardContent className="flex flex-col items-center gap-4 p-5 sm:flex-row sm:justify-between">
            <div>
              <p className="font-semibold">Prochaine étape</p>
              <p className="mt-1 text-sm text-ink-dim">
                {level && (
                  <>
                    Retrouve la suite du niveau {lab.levelId} — {level.title}{" "}
                    dans ta roadmap.
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                variant="outline"
                className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
              >
                <Link href="/labs">Voir les missions</Link>
              </Button>
              <Button
                asChild
                className="bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
              >
                <Link href="/roadmap">
                  Ma roadmap <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ---------------- MINI-QUIZ ---------------- */
  if (step === "quiz") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          href="/labs"
          className="inline-flex items-center gap-1.5 text-sm text-cyber-400 hover:underline"
        >
          ← Retour aux missions
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10">
            <Globe className="h-6 w-6 text-cyber-500" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
              Vérification · {lab.platform}
            </p>
            <h1 className="text-2xl font-bold tracking-tight">{lab.title}</h1>
          </div>
        </div>

        <Card className="mt-5 border-cyber-500/40 bg-cyber-500/[0.06]">
          <CardContent className="p-5">
            <p className="flex items-start gap-2 text-sm text-ink-dim">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
              Pour valider la mission et recevoir l'XP, réponds aux questions
              de compréhension. CyberAcademy ne donne pas l'XP pour un simple
              clic sur un lien externe.
            </p>
          </CardContent>
        </Card>

        <form onSubmit={submitVerification} className="mt-4 space-y-4">
          {lab.verification.map((question, questionIndex) => (
            <Card key={questionIndex}>
              <CardContent className="p-5">
                <p className="font-medium">{question.question}</p>
                <div className="mt-3 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) =>
                          prev.map((a, i) =>
                            i === questionIndex ? optionIndex : a
                          )
                        )
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                        answers[questionIndex] === optionIndex
                          ? "border-cyber-500/60 bg-cyber-500/10 text-cyber-400"
                          : "border-border bg-night-900/40 hover:border-cyber-500/30"
                      )}
                    >
                      <Circle
                        className={cn(
                          "h-3.5 w-3.5 shrink-0",
                          answers[questionIndex] === optionIndex
                            ? "text-cyber-500"
                            : "text-muted-foreground"
                        )}
                      />
                      {option}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {wrong && (
            <div className="flex items-center gap-2 rounded-md border border-danger/50 bg-danger/10 p-3 text-sm text-danger">
              <XCircle className="h-4 w-4" />
              Au moins une réponse est incorrecte. Revois la mission et
              réessaie.
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Valider ma compréhension
          </Button>
        </form>
      </div>
    );
  }

  /* ---------------- BRIEFING / DÉCLARATION ---------------- */
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/labs"
        className="inline-flex items-center gap-1.5 text-sm text-cyber-400 hover:underline"
      >
        ← Retour aux missions
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10">
          <Globe className="h-6 w-6 text-cyber-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-cyber-400">
              Mission externe · Niveau {lab.levelId}
            </p>
            <Badge className="border-cyber-500/40 bg-cyber-500/10 text-cyber-400">
              {lab.platform}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{lab.title}</h1>
        </div>
      </div>

      <Card className="mt-5 border-cyber-500/40 bg-gradient-to-r from-cyber-500/[0.08] to-transparent">
        <CardContent className="p-5">
          <p className="text-sm font-medium text-ink-dim"> Mission</p>
          <p className="mt-2 text-base leading-relaxed text-ink">
            {lab.description}
          </p>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-5 text-sm">
            <p className="flex items-center justify-between">
              <span className="text-ink-dim">Plateforme</span>
              <span className={cn("font-medium", platformInfo.color)}>
                {lab.platform}
              </span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-ink-dim">Difficulté</span>
              <span className="font-medium">{lab.difficulty}</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-ink-dim">Durée</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-3.5 w-3.5 text-cyber-500" />
                {lab.duration}
              </span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-ink-dim">XP</span>
              <span className="font-medium text-cyber-400">+{lab.xp} XP</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-cyber-500" />
              Compétences travaillées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {lab.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-cyber-500/30 bg-cyber-500/[0.06] text-cyber-400"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-cyber-500" />
            Objectifs pédagogiques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {lab.learningObjectives.map((objective, index) => (
            <p key={index} className="flex items-start gap-2 text-sm text-ink-dim">
              <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyber-500" />
              {objective}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-4 border-cyber-500/40 bg-cyber-500/[0.05]">
        <CardContent className="space-y-3 p-5">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-cyber-400">
            <Sparkles className="h-3 w-3" />
            Pourquoi cette mission ?
          </p>
          <p className="text-sm leading-relaxed text-ink-dim">{lab.why}</p>
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Mission hébergée par {lab.platform} ({platformInfo.note}). Reviens
            ensuite valider ta compréhension pour gagner l'XP.
          </p>
        </CardContent>
      </Card>

      {lab.prerequisite && (
        <p className="mt-4 text-sm text-ink-dim">
          <span className="text-muted-foreground">Prérequis conseillé :</span>{" "}
          <span className="font-medium text-cyber-400">{lab.prerequisite}</span>
        </p>
      )}

      {step === "declared" && started ? (
        <>
          <Button
            onClick={declareDone}
            size="lg"
            className="mt-6 w-full bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            J'ai terminé la mission
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Une vérification par mini-quiz te fera gagner +{lab.xp} XP.
          </p>
        </>
      ) : (
        <>
          <Button
            onClick={startMission}
            size="lg"
            className="mt-6 w-full bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Commencer la mission
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Ouvre {lab.platform} dans un nouvel onglet, puis reviens ici.
          </p>
        </>
      )}
    </div>
  );
}

/* ==================================================================
   ENTRY POINT
   ================================================================== */
export default function LabPage({ params }: LabPageProps) {
  const { slug } = use(params);
  const native = getLab(slug);
  const external = getExternalLab(slug);

  if (!native && !external) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Activité introuvable</h1>
        <Button asChild className="mt-6 bg-cta-700 text-white hover:bg-cta-600">
          <Link href="/labs">Retour aux missions</Link>
        </Button>
      </div>
    );
  }

  return external ? <ExternalLabView lab={external} /> : <NativeLabView lab={native!} />;
}
