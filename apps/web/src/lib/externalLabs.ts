// ============================================================
// EXTERNAL LABS — challenges hébergés par des plateformes tierces
// (Hybrid Lab System V1 — spec §11 à §16)
//
// CyberAcademy référence simplement une activité externe :
// - aucun scraping, aucune API non officielle, aucun contenu
//   propriétaire reproduit (spec §13, §32).
// - la progression est déclarée par l'utilisateur puis validée
//   par un mini-quiz pédagogique (anti-cheat, spec §26).
// ============================================================

export type ExternalPlatform =
  | "TryHackMe"
  | "Hack The Box"
  | "Root-Me"
  | "PortSwigger";

export type ExternalCategory = "linux" | "web" | "network";

export interface ExternalLab {
  id: string;
  slug: string;
  type: "external_lab";
  host: "external";
  category: ExternalCategory;
  platform: ExternalPlatform;
  externalUrl: string;
  externalId?: string;
  title: string;
  description: string;
  difficulty: "facile" | "intermédiaire";
  levelId: number;
  duration: string;
  estimatedDurationMin: number;
  skills: string[];
  learningObjectives: string[];
  prerequisite?: string;
  why: string;
  xp: number;
  verification: {
    question: string;
    options: string[];
    answer: number;
  }[];
  active: boolean;
  lastVerifiedAt: string;
}

export const EXTERNAL_LABS: ExternalLab[] = [
  {
    id: "ext-01",
    slug: "thm-linux-fundamentals",
    type: "external_lab",
    host: "external",
    category: "linux",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/linuxfundamentalspart1",
    externalId: "linuxfundamentalspart1",
    title: "Linux Fundamentals (Part 1)",
    description:
      "Room gratuite TryHackMe : première approche pratique de Linux en ligne de commande.",
    difficulty: "facile",
    levelId: 1,
    duration: "30 min",
    estimatedDurationMin: 30,
    skills: ["Terminal Linux", "Permissions", "Processus"],
    learningObjectives: [
      "Manipuler le système de fichiers",
      "Lire et comprendre les permissions",
      "Lancer des commandes basiques",
    ],
    prerequisite: "Lab natif « Navigation dans le terminal »",
    why: "Cette room te fait pratiquer sur un vrai terminal Linux, comme dans un environnement de travail réel.",
    xp: 150,
    verification: [
      {
        question:
          "Quelle commande affiche le chemin absolu du répertoire courant ?",
        options: ["ls", "pwd", "cd", "whoami"],
        answer: 1,
      },
      {
        question:
          "Quel symbole indique que le fichier est exécutable dans ls -l ?",
        options: ["r", "x", "w", "-"],
        answer: 1,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-01",
  },
  {
    id: "ext-02",
    slug: "thm-intro-networking",
    type: "external_lab",
    host: "external",
    category: "network",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/introtonetworking",
    externalId: "introtonetworking",
    title: "Intro to Networking",
    description:
      "Room gratuite TryHackMe : protocoles, OSI, TCP/IP et les bases du réseau.",
    difficulty: "facile",
    levelId: 2,
    duration: "40 min",
    estimatedDurationMin: 40,
    skills: ["Networking", "TCP/IP", "OSI", "DNS"],
    learningObjectives: [
      "Comprendre le modèle OSI",
      "Associer ports et services",
      "Expliquer le rôle du DNS",
    ],
    prerequisite: "Lab natif « Comprendre les ports »",
    why: "Le réseau est la fondation de toute attaque. Cette room consolide ce que tu as appris dans tes cours et labs natifs.",
    xp: 180,
    verification: [
      {
        question: "Quel port utilise SSH par défaut ?",
        options: ["21", "22", "80", "443"],
        answer: 1,
      },
      {
        question: "Quelle couche du modèle OSI gère le routage ?",
        options: ["Transport", "Session", "Réseau", "Liaison"],
        answer: 2,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-01",
  },
  {
    id: "ext-03",
    slug: "thm-http-in-detail",
    type: "external_lab",
    host: "external",
    category: "web",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/httpindetail",
    externalId: "httpindetail",
    title: "HTTP in Detail",
    description:
      "Room gratuite TryHackMe : requêtes, méthodes et en-têtes HTTP.",
    difficulty: "facile",
    levelId: 4,
    duration: "30 min",
    estimatedDurationMin: 30,
    skills: ["HTTP", "Requêtes", "Méthodes", "Headers"],
    learningObjectives: [
      "Comprendre une requête HTTP",
      "Connaître les méthodes et statuts",
      "Lire les en-têtes",
    ],
    prerequisite: "Lab natif « Comprendre HTTP »",
    why: "Le HTTP est le langage du web. Cette room t'entraîne sur les fondamentaux avant d'attaquer les failles web.",
    xp: 150,
    verification: [
      {
        question: "Quelle méthode HTTP est utilisée pour envoyer des données ?",
        options: ["GET", "POST", "PUT", "HEAD"],
        answer: 1,
      },
      {
        question: "Quel statut HTTP signifie « Non autorisé » ?",
        options: ["200", "301", "401", "500"],
        answer: 2,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-01",
  },
  {
    id: "ext-04",
    slug: "rootme-http-headers",
    type: "external_lab",
    host: "external",
    category: "web",
    platform: "Root-Me",
    externalUrl: "https://www.root-me.org/en/Challenges/Web-Server/HTTP-Headers",
    title: "HTTP — Headers",
    description:
      "Challenge Root-Me : une information cachée dans les en-têtes HTTP.",
    difficulty: "facile",
    levelId: 4,
    duration: "20 min",
    estimatedDurationMin: 20,
    skills: ["HTTP", "Headers", "Reconnaissance"],
    learningObjectives: [
      "Inspecter une réponse HTTP",
      "Manipuler un en-tête pour obtenir l'accès",
    ],
    prerequisite: "Lab natif « Comprendre HTTP »",
    why: "Un challenge court qui t'oblige à lire les en-têtes comme le ferait un pentester.",
    xp: 150,
    verification: [
      {
        question:
          "Quel outil permet d'inspecter les en-têtes d'une réponse HTTP ?",
        options: ["tcpdump", "curl -v", "ps aux", "nmap"],
        answer: 1,
      },
      {
        question:
          "Comment un serveur peut-il cacher une fonctionnalité d'admin dans un header ?",
        options: [
          "Via un header personnalisé à renseigner",
          "Via le champ User-Agent uniquement",
          "Impossible, les headers ne sont jamais inspectés",
          "Via l'adresse MAC",
        ],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-01",
  },
  {
    id: "ext-05",
    slug: "portswigger-sqli-hidden-data",
    type: "external_lab",
    host: "external",
    category: "web",
    platform: "PortSwigger",
    externalUrl:
      "https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data",
    title: "SQLi — Récupérer des données cachées",
    description:
      "Lab PortSwigger (Web Security Academy) : injection SQL dans une clause WHERE.",
    difficulty: "intermédiaire",
    levelId: 4,
    duration: "30 min",
    estimatedDurationMin: 30,
    skills: ["SQL", "Injection", "Web Security"],
    learningObjectives: [
      "Identifier une injection dans une URL",
      "Modifier une requête pour exposer des données cachées",
    ],
    prerequisite: "Lab natif « Injection SQL — Login bypass »",
    why: "La Web Security Academy de PortSwigger est la référence pour pratiquer l'injection SQL en toute légalité.",
    xp: 250,
    verification: [
      {
        question: "Quelle clause SQL permet de filtrer les lignes d'un SELECT ?",
        options: ["WHERE", "ORDER BY", "JOIN", "GROUP BY"],
        answer: 0,
      },
      {
        question:
          "Quel caractère de commentaire SQL neutralise le reste de la requête ?",
        options: ["//", "--", "/*", "#*"],
        answer: 1,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-01",
  },
  {
    id: "ext-06",
    slug: "portswigger-reflected-xss",
    type: "external_lab",
    host: "external",
    category: "web",
    platform: "PortSwigger",
    externalUrl:
      "https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded",
    title: "XSS réfléchie — contexte HTML",
    description:
      "Lab PortSwigger (Web Security Academy) : première XSS réfléchie sans filtre.",
    difficulty: "intermédiaire",
    levelId: 4,
    duration: "30 min",
    estimatedDurationMin: 30,
    skills: ["XSS", "JavaScript", "Web Security"],
    learningObjectives: [
      "Repérer un point de réflexion d'entrée",
      "Injecter un payload JavaScript dans le contexte HTML",
    ],
    prerequisite: "Lab natif « Vol de session par cookie »",
    why: "La XSS est partout sur le web. Ce lab t'apprend à injecter du code JavaScript dans un contexte HTML.",
    xp: 250,
    verification: [
      {
        question: "Que signifie XSS ?",
        options: [
          "Extra Secure Site",
          "Cross-Site Scripting",
          "Cross Site Selection",
          "Extended Server Script",
        ],
        answer: 1,
      },
      {
        question:
          "Quel payload simple déclenche une XSS réfléchie dans un contexte HTML ?",
        options: [
          "<script>alert(1)</script>",
          "--script alert--",
          "'alert(1)'",
          "javascript:alert",
        ],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-01",
  },
];

export const EXTERNAL_PLATFORM_INFO: Record<
  ExternalPlatform,
  { color: string; note: string }
> = {
  TryHackMe: { color: "text-red-400", note: "Room gratuite" },
  "Hack The Box": { color: "text-green-400", note: "Machine / challenge" },
  "Root-Me": { color: "text-orange-400", note: "Challenge gratuit" },
  PortSwigger: { color: "text-sky-400", note: "Web Security Academy gratuite" },
};

export function getExternalLab(slug: string): ExternalLab | undefined {
  return EXTERNAL_LABS.find((lab) => lab.slug === slug);
}
