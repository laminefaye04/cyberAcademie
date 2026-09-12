export const DEMO_USER = {
  id: "demo-user-1",
  pseudo: "cypher_rookie",
  email: "demo@cyberacademy.app",
  avatarUrl: null,
  bio: "Étudiant en informatique, en route vers le pentest. Cursus complet parcouru en mode démo.",
  country: "CM",
  level: 11,
  xp: 16000,
  xpToNextLevel: 16000,
  levelXp: 2450,
  levelXpMax: 5000,
  streak: 12,
  rank: 124,
  totalUsers: 4820,
  role: "learner" as const,
  completedLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  labsCompleted: 1,
  challengesSolved: 4,
  quizAverage: 78,
  weakSkills: ["TCP/IP handshake", "SSRF", "XXE"],
  quizErrors: [
    {
      topic: "TCP/IP",
      lesson: "Le triple handshake TCP",
      score: 42,
    },
    {
      topic: "SSRF",
      lesson: "SSRF — Server-Side Request Forgery",
      score: 35,
    },
  ],
  levelTitle: "Cloud Knight",
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

export interface WeeklyStat {
  label: string;
  value: number;
}

export const WEEKLY_STATS: { xp: number; labs: number; challenges: number; quizAverage: number; days: WeeklyStat[] } = {
  xp: 1240,
  labs: 8,
  challenges: 4,
  quizAverage: 78,
  days: [
    { label: "Lun", value: 4 },
    { label: "Mar", value: 7 },
    { label: "Mer", value: 2 },
    { label: "Jeu", value: 5 },
    { label: "Ven", value: 8 },
    { label: "Sam", value: 3 },
    { label: "Dim", value: 6 },
  ],
};

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

export const AI_RECOMMENDATIONS_CONTEXT = {
  intro: `Bonjour ${DEMO_USER.pseudo}  Je suis ton Cyber Mentor.

Je connais ta progression : tu viens de terminer le niveau ${DEMO_USER.level} (${DEMO_USER.levelTitle}). Deux points faibles détectés sur tes derniers quiz :
• TCP/IP (42% au triple handshake)
• SSRF / XXE (35%)

Je te recommande de revoir ces leçons avant de passer aux labs suivants. Tu veux qu'on commence ?`,
  review: `Révision recommandée :
→ TCP 3-way handshake (module 2)

Veux-tu une explication avec un schéma, ou préfères-tu un quiz d'entraînement ciblé ?`,
};
