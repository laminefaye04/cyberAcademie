export type LabType = "linux" | "web" | "network" | "ctf";

export interface Lab {
  id: string;
  slug: string;
  title: string;
  type: LabType;
  difficulty: "facile" | "intermédiaire" | "avancé";
  levelId: number;
  duration: string;
  objectives: string[];
  xp: number;
  completed: boolean;
}

export const LABS: Lab[] = [
  {
    id: "lab-01",
    slug: "find-grep",
    title: "find & grep",
    type: "linux",
    difficulty: "facile",
    levelId: 1,
    duration: "20 min",
    objectives: [
      "Localiser le fichier flag.txt avec find",
      "Extraire le contenu du flag avec grep",
    ],
    xp: 200,
    completed: true,
  },
  {
    id: "lab-02",
    slug: "permissions",
    title: "Escalade setuid",
    type: "linux",
    difficulty: "intermédiaire",
    levelId: 1,
    duration: "30 min",
    objectives: [
      "Identifier un binaire setuid",
      "Exploiter le bit setuid pour obtenir root",
      "Lire le flag dans /root/flag.txt",
    ],
    xp: 250,
    completed: false,
  },
  {
    id: "lab-03",
    slug: "tcpdump-capture",
    title: "Capture TCP",
    type: "network",
    difficulty: "intermédiaire",
    levelId: 2,
    duration: "40 min",
    objectives: [
      "Capturer le trafic sur l'interface réseau",
      "Analyser le handshake TCP avec tcpdump",
      "Extraire le flag transmis en clair",
    ],
    xp: 300,
    completed: false,
  },
  {
    id: "lab-04",
    slug: "sql-injection",
    title: "Injection SQL — Login bypass",
    type: "web",
    difficulty: "intermédiaire",
    levelId: 5,
    duration: "30 min",
    objectives: [
      "Identifier une injection dans le formulaire de login",
      "Contourner l'authentification",
      "Soumettre le flag de session",
    ],
    xp: 300,
    completed: false,
  },
];
