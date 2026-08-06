export const DEMO_USER = {
  id: "demo-user-1",
  pseudo: "cypher_rookie",
  email: "demo@cyberacademy.app",
  avatarUrl: null,
  bio: "Étudiant en informatique, en route vers le pentest. Niveau Networking en cours.",
  country: "CM",
  level: 2,
  xp: 1850,
  xpToNextLevel: 2600,
  streak: 12,
  rank: 124,
  totalUsers: 4820,
  role: "learner" as const,
  completedLevels: [0, 1],
};

export interface XpEvent {
  amount: number;
  label: string;
  createdAt: string;
}

export const XP_HISTORY: XpEvent[] = [
  { amount: 150, label: "Quiz Linux — permissions", createdAt: "2026-08-05T10:30:00Z" },
  { amount: 200, label: "Lab terminal — find & grep", createdAt: "2026-08-05T09:12:00Z" },
  { amount: 120, label: "Cours — processus Linux", createdAt: "2026-08-04T18:40:00Z" },
  { amount: 250, label: "Lab terminal — escalade de privilèges", createdAt: "2026-08-03T14:05:00Z" },
  { amount: 100, label: "Badge Shell Master débloqué", createdAt: "2026-08-02T11:00:00Z" },
];

export interface AiRecommendation {
  type: "lesson" | "lab" | "review" | "ctf";
  title: string;
  description: string;
}

export const AI_RECOMMENDATIONS: AiRecommendation[] = [
  {
    type: "lesson",
    title: "Module 2.3 — Le modèle OSI",
    description: "Temps passé faible sur les couches transport : une révision de 15 min est conseillée.",
  },
  {
    type: "lab",
    title: "Lab — Capture TCP avec tcpdump",
    description: "Vous validez ce lab aujourd'hui pour débloquer le niveau 3 (Python/Bash).",
  },
  {
    type: "review",
    title: "Révision ciblée — permissions chmod",
    description: "3 erreurs récurrentes détectées sur les bits setuid. Plan de révision de 10 min.",
  },
];
