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
  {
    id: "ext-07",
    slug: "thm-introductory-researching",
    type: "external_lab",
    host: "external",
    category: "linux",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/introtoresearch",
    externalId: "introtoresearch",
    title: "Introductory Researching",
    description:
      "Room gratuite TryHackMe : les fondamentaux de la recherche en cybersécurité (moteurs, CVE, man pages).",
    difficulty: "facile",
    levelId: 0,
    duration: "40 min",
    estimatedDurationMin: 40,
    skills: ["Recherche", "Google Dorking", "CVE", "Man pages"],
    learningObjectives: [
      "Rechercher efficacement une information",
      "Consulter les bases de vulnérabilités (CVE)",
      "Lire les pages de manuel Linux",
    ],
    prerequisite: "Lab natif « Découverte du système »",
    why: "Savoir chercher est la première compétence du métier : un pentester passe plus de temps à chercher qu'à exploiter.",
    xp: 150,
    verification: [
      {
        question: "Où consulte-t-on les vulnérabilités publiques (CVE) ?",
        options: [
          "La base NVD (National Vulnerability Database)",
          "Le menu de configuration du BIOS",
          "Les cookies du navigateur",
          "Le fichier /etc/hosts",
        ],
        answer: 0,
      },
      {
        question: "Quelle commande affiche le manuel d'une commande Linux ?",
        options: ["man <commande>", "help --liste", "doc <commande>", "info -a"],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-08",
    slug: "rootme-encoding-ascii",
    type: "external_lab",
    host: "external",
    category: "linux",
    platform: "Root-Me",
    externalUrl: "https://www.root-me.org/en/Challenges/Cryptanalysis/Encoding-ASCII",
    title: "Encoding — ASCII",
    description:
      "Challenge Root-Me : décoder un fichier hexadécimal pour retrouver le mot de passe.",
    difficulty: "facile",
    levelId: 0,
    duration: "15 min",
    estimatedDurationMin: 15,
    skills: ["Hexadécimal", "ASCII", "Encodage", "Décodage"],
    learningObjectives: [
      "Reconnaître une chaîne hexadécimale",
      "Décoder des données encodées",
    ],
    prerequisite: "Lab natif « Explorateur de fichiers »",
    why: "Données chiffrées ou encodées, un pentester sait les reconnaître et les décoder : c'est la base de toute analyse.",
    xp: 120,
    verification: [
      {
        question: "Que représente 0x41 en ASCII ?",
        options: ["La lettre A", "Le chiffre 0", "Un espace", "La lettre z"],
        answer: 0,
      },
      {
        question:
          "Quel outil en ligne de commande convertit de l'hexadécimal en texte ?",
        options: ["xxd -r -p", "ls -la", "ps aux", "whoami"],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-09",
    slug: "thm-linux-fundamentals-part2",
    type: "external_lab",
    host: "external",
    category: "linux",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/linuxfundamentalspart2",
    externalId: "linuxfundamentalspart2",
    title: "Linux Fundamentals (Part 2)",
    description:
      "Room gratuite TryHackMe : SSH, flags et options, permissions et répertoires système.",
    difficulty: "facile",
    levelId: 1,
    duration: "45 min",
    estimatedDurationMin: 45,
    skills: ["SSH", "Man pages", "Permissions", "Répertoires système"],
    learningObjectives: [
      "Se connecter à distance avec SSH",
      "Lire les manuels et les options des commandes",
      "Comprendre les permissions et les répertoires système",
    ],
    prerequisite: "Lab natif « Processus Linux »",
    why: "Cette room te fait passer du terminal local au terminal distant, un saut indispensable pour tout pentest.",
    xp: 180,
    verification: [
      {
        question: "Quel port utilise le protocole SSH par défaut ?",
        options: ["21", "22", "80", "443"],
        answer: 1,
      },
      {
        question: "Dans quel répertoire les journaux système sont-ils stockés ?",
        options: ["/var/log", "/tmp", "/home", "/usr/share"],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-10",
    slug: "thm-intro-to-lan",
    type: "external_lab",
    host: "external",
    category: "network",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/introtolan",
    externalId: "introtolan",
    title: "Intro to LAN",
    description:
      "Room gratuite TryHackMe : les réseaux locaux, l'ARP, les adresses MAC et IP.",
    difficulty: "facile",
    levelId: 2,
    duration: "45 min",
    estimatedDurationMin: 45,
    skills: ["LAN", "ARP", "MAC", "IP", "Networking"],
    learningObjectives: [
      "Comprendre le fonctionnement d'un LAN",
      "Expliquer le rôle de l'ARP",
      "Distinguer adresses MAC et IP",
    ],
    prerequisite: "Lab natif « Comprendre les ports »",
    why: "Avant d'attaquer un réseau, il faut comprendre comment les machines s'y trouvent et s'y parlent.",
    xp: 180,
    verification: [
      {
        question: "Quel protocole associe une adresse IP à une adresse MAC ?",
        options: ["ARP", "SMTP", "FTP", "IMAP"],
        answer: 0,
      },
      {
        question: "Une adresse MAC identifie...",
        options: [
          "La carte réseau physique d'une machine",
          "Le mot de passe d'un serveur",
          "Le nom d'un site web",
          "La version du noyau Linux",
        ],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-11",
    slug: "rootme-telnet-auth",
    type: "external_lab",
    host: "external",
    category: "network",
    platform: "Root-Me",
    externalUrl: "https://www.root-me.org/en/Challenges/Network/TELNET-authentication",
    title: "TELNET — authentication",
    description:
      "Challenge Root-Me : analyser une capture réseau pour retrouver un mot de passe TELNET.",
    difficulty: "facile",
    levelId: 2,
    duration: "25 min",
    estimatedDurationMin: 25,
    skills: ["TELNET", "Capture réseau", "Analyse de trafic", "Sniffing"],
    learningObjectives: [
      "Analyser une capture réseau",
      "Comprendre pourquoi TELNET transmet les identifiants en clair",
    ],
    prerequisite: "Lab natif « Capture TCP »",
    why: "Ce challenge illustre concrètement pourquoi un protocole non chiffré expose les identifiants à quiconque écoute.",
    xp: 150,
    verification: [
      {
        question: "Pourquoi TELNET est-il dangereux ?",
        options: [
          "Il transmet les identifiants en clair",
          "Il chiffre tout par défaut",
          "Il ne fonctionne qu'en local",
          "Il ne supporte pas les mots de passe",
        ],
        answer: 0,
      },
      {
        question: "Quel outil permet d'analyser une capture réseau ?",
        options: ["Wireshark", "ls", "mkdir", "cat"],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-12",
    slug: "thm-python-basics",
    type: "external_lab",
    host: "external",
    category: "linux",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/pythonbasics",
    externalId: "pythonbasics",
    title: "Python Basics",
    description:
      "Room gratuite TryHackMe : les bases du Python pour la cybersécurité (variables, boucles, fichiers).",
    difficulty: "facile",
    levelId: 3,
    duration: "60 min",
    estimatedDurationMin: 60,
    skills: ["Python", "Variables", "Boucles", "Fonctions"],
    learningObjectives: [
      "Écrire ses premières instructions Python",
      "Utiliser variables, boucles et fonctions",
      "Lire et écrire des fichiers",
    ],
    prerequisite: "Lab natif « Scanner de ports en Python »",
    why: "Python est le langage du pentester : cette room te donne les bases pour écrire tes propres outils.",
    xp: 200,
    verification: [
      {
        question: "Quelle instruction affiche du texte à l'écran en Python ?",
        options: ["print()", "echo()", "show()", "display()"],
        answer: 0,
      },
      {
        question: "Comment ouvre-t-on un fichier en lecture en Python ?",
        options: [
          "open('fichier', 'r')",
          "read('fichier', 1)",
          "load('fichier')",
          "import('fichier')",
        ],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-13",
    slug: "rootme-bash-system-1",
    type: "external_lab",
    host: "external",
    category: "linux",
    platform: "Root-Me",
    externalUrl: "https://www.root-me.org/en/Challenges/App-Script/Bash-System-1",
    title: "App-Script — Bash - System 1",
    description:
      "Challenge Root-Me : exploiter une mauvaise configuration d'un script Bash pour élever ses privilèges.",
    difficulty: "intermédiaire",
    levelId: 3,
    duration: "40 min",
    estimatedDurationMin: 40,
    skills: ["Bash", "PATH", "Scripting", "Privilege Escalation"],
    learningObjectives: [
      "Analyser un script Bash vulnérable",
      "Exploiter une manipulation du PATH",
    ],
    prerequisite: "Lab natif « Scanner de ports en Python »",
    why: "Un script mal écrit peut transformer une configuration banale en porte d'entrée : c'est exactement ce que ce challenge montre.",
    xp: 220,
    verification: [
      {
        question: "Que contrôle la variable d'environnement PATH ?",
        options: [
          "Les répertoires où le shell cherche les commandes",
          "Le mot de passe de l'utilisateur",
          "L'adresse IP de la machine",
          "La taille de la mémoire",
        ],
        answer: 0,
      },
      {
        question:
          "Pourquoi placer un répertoire personnalisé au début du PATH est risqué ?",
        options: [
          "Le shell peut y exécuter une commande piégée",
          "Le disque se remplit plus vite",
          "Les fichiers s'effacent tout seuls",
          "La machine redémarre",
        ],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-14",
    slug: "thm-owasp-juice-shop",
    type: "external_lab",
    host: "external",
    category: "web",
    platform: "TryHackMe",
    externalUrl: "https://tryhackme.com/r/room/owaspjuiceshop",
    externalId: "owaspjuiceshop",
    title: "OWASP Juice Shop",
    description:
      "Room TryHackMe : une application web volontairement vulnérable pour pratiquer les failles du OWASP Top 10.",
    difficulty: "intermédiaire",
    levelId: 4,
    duration: "90 min",
    estimatedDurationMin: 90,
    skills: ["OWASP Top 10", "Injection", "XSS", "Autorisations"],
    learningObjectives: [
      "Identifier des failles web dans une vraie application",
      "Exploiter les vulnérabilités du OWASP Top 10",
    ],
    prerequisite: "Lab natif « Injection SQL — Login bypass »",
    why: "Juice Shop te fait pratiquer sur une application complète, pas sur des exemples isolés : la vraie vie d'un pentester web.",
    xp: 300,
    verification: [
      {
        question: "Qu'est-ce que Juice Shop ?",
        options: [
          "Une application web volontairement vulnérable",
          "Un antivirus commercial",
          "Un serveur de messagerie",
          "Un logiciel de dessin",
        ],
        answer: 0,
      },
      {
        question:
          "Quel classe de failles l'injection de commandes dans un paramètre illustre-t-elle ?",
        options: [
          "Les failles d'injection",
          "Les failles de matériel",
          "Les erreurs de saisie clavier",
          "Les problèmes de réseau",
        ],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
  },
  {
    id: "ext-15",
    slug: "rootme-http-user-agent",
    type: "external_lab",
    host: "external",
    category: "web",
    platform: "Root-Me",
    externalUrl: "https://www.root-me.org/en/Challenges/Web-Server/HTTP-User-agent",
    title: "HTTP — User-agent",
    description:
      "Challenge Root-Me : un serveur se cache derrière une vérification du User-Agent. À toi de le contourner.",
    difficulty: "facile",
    levelId: 4,
    duration: "20 min",
    estimatedDurationMin: 20,
    skills: ["HTTP", "User-Agent", "En-têtes", "curl"],
    learningObjectives: [
      "Comprendre le rôle de l'en-tête User-Agent",
      "Forger une requête HTTP avec curl",
    ],
    prerequisite: "Lab natif « Comprendre HTTP »",
    why: "Un en-tête est un indice, jamais une preuve : ce challenge prouve qu'une restriction fondée sur le User-Agent est triviale à contourner.",
    xp: 150,
    verification: [
      {
        question: "Quel en-tête de requête indique au serveur le logiciel client ?",
        options: ["User-Agent", "Content-Length", "X-Forwarded-For", "Cookie"],
        answer: 0,
      },
      {
        question: "Comment curl définit-il un en-tête personnalisé ?",
        options: ["-H", "-l", "-d", "-p"],
        answer: 0,
      },
    ],
    active: true,
    lastVerifiedAt: "2026-08-10",
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
