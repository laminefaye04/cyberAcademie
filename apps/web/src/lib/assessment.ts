export interface AssessmentQuestion {
  id: string;
  domain: "fundamentals" | "linux" | "networking" | "web";
  question: string;
  options: string[];
  answerIndex: number;
}

export const ASSESSMENT_DOMAINS: {
  id: AssessmentQuestion["domain"];
  label: string;
  icon: string;
}[] = [
  { id: "fundamentals", label: "Fondamentaux informatiques", icon: "🖥️" },
  { id: "linux", label: "Linux", icon: "🐧" },
  { id: "networking", label: "Réseau", icon: "🌐" },
  { id: "web", label: "Web", icon: "🕸️" },
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "fund-1",
    domain: "fundamentals",
    question: "Qu'est-ce qu'un système d'exploitation ?",
    options: [
      "Un programme qui gère le matériel et les logiciels",
      "Un navigateur web",
      "Un type de processeur",
      "Une base de données",
    ],
    answerIndex: 0,
  },
  {
    id: "fund-2",
    domain: "fundamentals",
    question: "Quel composant stocke les données de façon permanente ?",
    options: ["La RAM", "Le processeur", "Le disque dur", "La carte mère"],
    answerIndex: 2,
  },
  {
    id: "linux-1",
    domain: "linux",
    question: "Quelle commande liste les fichiers d'un dossier ?",
    options: ["cd", "ls", "pwd", "rm"],
    answerIndex: 1,
  },
  {
    id: "linux-2",
    domain: "linux",
    question: "Quelle commande permet de changer de répertoire ?",
    options: ["ls", "mkdir", "cat", "cd"],
    answerIndex: 3,
  },
  {
    id: "net-1",
    domain: "networking",
    question: "Quel est le rôle d'une adresse IP ?",
    options: [
      "Identifier une machine sur un réseau",
      "Chiffrer les données",
      "Stocker des fichiers",
      "Afficher une page web",
    ],
    answerIndex: 0,
  },
  {
    id: "net-2",
    domain: "networking",
    question: "Quel port est utilisé par HTTPS par défaut ?",
    options: ["80", "443", "22", "8080"],
    answerIndex: 1,
  },
  {
    id: "web-1",
    domain: "web",
    question: "Quelle méthode HTTP est utilisée pour lire une ressource ?",
    options: ["POST", "GET", "DELETE", "PATCH"],
    answerIndex: 1,
  },
  {
    id: "web-2",
    domain: "web",
    question: "Qu'est-ce qu'un cookie ?",
    options: [
      "Une petite donnée stockée côté client par le navigateur",
      "Un virus",
      "Un type de serveur",
      "Un protocole de chiffrement",
    ],
    answerIndex: 0,
  },
];

/** Niveau de départ recommandé selon le score global (0-4, roadmap V1). */
export function recommendLevel(scorePct: number): number {
  if (scorePct < 35) return 0;
  if (scorePct < 50) return 1;
  if (scorePct < 70) return 2;
  if (scorePct < 85) return 3;
  return 4;
}
