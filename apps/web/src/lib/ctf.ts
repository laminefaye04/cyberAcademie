export type CtfCategory = "web" | "linux" | "crypto" | "forensics" | "osint";

export interface CtfChallenge {
  id: string;
  title: string;
  category: CtfCategory;
  difficulty: 1 | 2 | 3;
  points: number;
  solved: boolean;
  hint?: string;
}

export interface CtfLeader {
  rank: number;
  pseudo: string;
  points: number;
  solved: number;
}

export interface Ctf {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  participants: number;
  duration: string;
  challenges: CtfChallenge[];
  flagPrefix: string;
}

export const CTFS: Ctf[] = [
  {
    id: "ctf-01",
    name: "Rookie Hunt",
    emoji: "",
    tagline: "12 challenges d'échauffement pour valider les fondamentaux.",
    participants: 248,
    duration: "48 h",
    flagPrefix: "CA{",
    challenges: [
      { id: "web-1", title: "SQL Injection", category: "web", difficulty: 2, points: 150, solved: true, hint: "La citation dans l'URL de recherche casse la requête : ajoutez ' OR 1=1--." },
      { id: "web-2", title: "XSS Réfléchi", category: "web", difficulty: 1, points: 100, solved: false },
      { id: "web-3", title: "IDOR — Compte admin", category: "web", difficulty: 2, points: 150, solved: false },
      { id: "web-4", title: "JWT Non vérifié", category: "web", difficulty: 3, points: 250, solved: false },
      { id: "linux-1", title: "Permissions perdues", category: "linux", difficulty: 1, points: 100, solved: true },
      { id: "linux-2", title: "Binaire setuid", category: "linux", difficulty: 2, points: 150, solved: false },
      { id: "linux-3", title: "Fichier caché dans les logs", category: "linux", difficulty: 1, points: 100, solved: true },
      { id: "crypto-1", title: "César inversé", category: "crypto", difficulty: 1, points: 100, solved: false },
      { id: "crypto-2", title: "Base64 trop facile", category: "crypto", difficulty: 1, points: 100, solved: false },
      { id: "forensics-1", title: "Metadata JPEG", category: "forensics", difficulty: 1, points: 100, solved: false },
      { id: "forensics-2", title: "PCAP — mot de passe en clair", category: "forensics", difficulty: 2, points: 150, solved: false },
      { id: "osint-1", title: "Réseaux sociaux", category: "osint", difficulty: 2, points: 150, solved: false },
    ],
  },
];

export const CTF_CATEGORY_LABELS: Record<CtfCategory, string> = {
  web: "Web",
  linux: "Linux",
  crypto: "Crypto",
  forensics: "Forensics",
  osint: "OSINT",
};

export const CTF_LEADERBOARD: CtfLeader[] = [
  { rank: 1, pseudo: "hacker01", points: 1850, solved: 11 },
  { rank: 2, pseudo: "cypher_rookie", points: 1620, solved: 9 },
  { rank: 3, pseudo: "rootkid", points: 1450, solved: 8 },
  { rank: 4, pseudo: "nullpointer", points: 1320, solved: 7 },
  { rank: 5, pseudo: "sn1ff3r", points: 1100, solved: 6 },
];

export function getCtf(id: string): Ctf | undefined {
  return CTFS.find((ctf) => ctf.id === id);
}
