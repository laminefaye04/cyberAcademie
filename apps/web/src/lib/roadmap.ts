import {
  Cpu,
  Terminal,
  Network,
  FileCode2,
  Globe,
  ShieldAlert,
  Crosshair,
  Swords,
  Bug,
  Landmark,
  Skull,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export type LevelStatus = "locked" | "available" | "in-progress" | "completed";

export interface RoadmapLevel {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  objectives: string;
  skills: string[];
  format: string;
  validation: string;
  xp: number;
  duration: string;
  icon: LucideIcon;
}

export const ROADMAP_LEVELS: RoadmapLevel[] = [
  {
    id: 0,
    slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    subtitle: "Fondamentaux informatiques",
    objectives:
      "Comprendre le fonctionnement d'un ordinateur et d'un système d'exploitation.",
    skills: ["Systèmes de fichiers", "Processus", "Permissions"],
    format: "Cours + quiz + mini-lab",
    validation: "Quiz ≥ 80% + lab validé",
    xp: 500,
    duration: "2 semaines",
    icon: Cpu,
  },
  {
    id: 1,
    slug: "linux-fundamentals",
    title: "Linux Fundamentals",
    subtitle: "Maîtriser la ligne de commande",
    objectives:
      "Maîtriser l'environnement Linux en ligne de commande, base de tout pentester.",
    skills: ["Bash", "Gestion de fichiers", "Permissions", "Processus"],
    format: "Cours interactif + labs terminal",
    validation: "5 labs terminal validés",
    xp: 750,
    duration: "3 semaines",
    icon: Terminal,
  },
  {
    id: 2,
    slug: "networking",
    title: "Networking",
    subtitle: "Protocoles et architecture réseau",
    objectives:
      "Comprendre les protocoles et l'architecture réseau, fondement de toute attaque.",
    skills: ["TCP/IP", "DNS", "HTTP", "Sniffing basique"],
    format: "Cours + schémas + lab réseau simulé",
    validation: "Lab de capture/analyse réseau validé",
    xp: 750,
    duration: "3 semaines",
    icon: Network,
  },
  {
    id: 3,
    slug: "python-bash",
    title: "Python / Bash pour la cybersécurité",
    subtitle: "Automatiser la reconnaissance",
    objectives:
      "Automatiser des tâches de reconnaissance et d'exploitation basique.",
    skills: ["Scripting", "Parsing", "Requêtes HTTP"],
    format: "Exercices de code + projet",
    validation: "Script fonctionnel soumis et évalué",
    xp: 1000,
    duration: "4 semaines",
    icon: FileCode2,
  },
  {
    id: 4,
    slug: "web-security",
    title: "Web Security",
    subtitle: "Architecture web et failles",
    objectives:
      "Comprendre l'architecture des applications web et leurs failles.",
    skills: ["HTTP", "Sessions", "Cookies", "Requêtes"],
    format: "Cours + labs web isolés",
    validation: "3 labs web validés",
    xp: 1000,
    duration: "4 semaines",
    icon: Globe,
  },
  {
    id: 5,
    slug: "owasp-top-10",
    title: "OWASP Top 10",
    subtitle: "Les 10 vulnérabilités majeures",
    objectives: "Identifier et exploiter les 10 vulnérabilités web majeures.",
    skills: ["Injection", "XSS", "IDOR", "SSRF"],
    format: "Cours par vulnérabilité + lab dédié",
    validation: "10 labs (un par vulnérabilité) validés",
    xp: 1500,
    duration: "6 semaines",
    icon: ShieldAlert,
  },
  {
    id: 6,
    slug: "pentesting-methodology",
    title: "Pentesting Methodology",
    subtitle: "Structurer un test d'intrusion",
    objectives: "Structurer une démarche de test d'intrusion complète.",
    skills: ["Reconnaissance", "Énumération", "Exploitation", "Reporting"],
    format: "Projet guidé de bout en bout",
    validation: "Rapport de pentest soumis et noté",
    xp: 1500,
    duration: "5 semaines",
    icon: Crosshair,
  },
  {
    id: 7,
    slug: "ctf-training",
    title: "CTF Training",
    subtitle: "S'entraîner en conditions de compétition",
    objectives: "S'entraîner en conditions de compétition chronométrées.",
    skills: ["Challenges", "Gestion du temps", "Méthodologie rapide"],
    format: "Challenges notés + classement",
    validation: "Score minimum sur 10 challenges",
    xp: 1000,
    duration: "4 semaines",
    icon: Swords,
  },
  {
    id: 8,
    slug: "bug-bounty",
    title: "Bug Bounty",
    subtitle: "Recherche de failles encadrée",
    objectives: "Comprendre la méthodologie de recherche de failles réelles encadrée.",
    skills: ["Scope", "Triage", "Rédaction de rapport"],
    format: "Simulation de programme bug bounty",
    validation: "Rapport de vulnérabilité validé par un mentor",
    xp: 1000,
    duration: "4 semaines",
    icon: Bug,
  },
  {
    id: 9,
    slug: "active-directory",
    title: "Active Directory",
    subtitle: "Windows d'entreprise",
    objectives: "Attaquer et sécuriser un environnement Windows d'entreprise.",
    skills: ["Kerberos", "GPO", "Mouvement latéral"],
    format: "Labs AD en environnement isolé",
    validation: "Compromission complète d'un lab AD",
    xp: 2000,
    duration: "6 semaines",
    icon: Landmark,
  },
  {
    id: 10,
    slug: "red-team",
    title: "Red Team",
    subtitle: "Attaque complète multi-étapes",
    objectives: "Simuler une attaque complète multi-étapes.",
    skills: ["Persistence", "Évasion", "C2"],
    format: "Projet Red Team complet",
    validation: "Scénario Red Team validé par un mentor",
    xp: 2000,
    duration: "6 semaines",
    icon: Skull,
  },
  {
    id: 11,
    slug: "cloud-security",
    title: "Cloud Security",
    subtitle: "AWS / Azure / GCP",
    objectives: "Sécuriser et attaquer des environnements cloud (AWS/Azure/GCP).",
    skills: ["IAM", "Buckets mal configurés", "Conteneurs"],
    format: "Labs cloud isolés",
    validation: "3 labs cloud validés",
    xp: 2000,
    duration: "6 semaines",
    icon: Cloud,
  },
];

export function getLevel(id: number): RoadmapLevel {
  return ROADMAP_LEVELS[id];
}

export function levelStatus(
  level: RoadmapLevel,
  completedLevels: number[]
): LevelStatus {
  if (completedLevels.includes(level.id)) return "completed";
  if (completedLevels.includes(level.id - 1) || level.id === 0)
    return "in-progress";
  return "locked";
}

export const TOTAL_ROADMAP_XP = ROADMAP_LEVELS.reduce(
  (sum, level) => sum + level.xp,
  0
);

/**
 * Périmètre V1 : seuls les 5 premiers niveaux sont visibles
 * (Computer Fundamentals → Introduction to Web Security).
 * Les niveaux 5-11 restent dans le code mais hors roadmap V1.
 */
export const V1_LEVELS = ROADMAP_LEVELS.slice(0, 5);
export const V1_LEVEL_IDS = new Set(V1_LEVELS.map((level) => level.id));
