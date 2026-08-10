import { DEMO_USER } from "./mock";
import { getCareerProgressPct, getRankTitle } from "./progress";
import { CAREER_GOAL } from "./progress";

export type MentorMode = "mentor" | "lab";

export interface MiniQuiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface HandshakeStep {
  num: number;
  title: string;
  description: string;
}

export interface HandshakeReply {
  intro: string;
  steps: HandshakeStep[];
  diagram: string[];
  conclusion: string;
  quiz: MiniQuiz;
}

export interface LabGuide {
  id: string;
  title: string;
  objective: string;
  hints: [string, string, string];
  solution: string;
}

export interface MentorReply {
  content?: string;
  handshake?: HandshakeReply;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content?: string;
  handshake?: HandshakeReply;
  labHint?: { level: number; text: string };
}

export interface MentorWeakness {
  topic: string;
  label: string;
  score: number;
}

export interface MentorConversation {
  id: string;
  title: string;
  time: string;
}

const rankTitle = getRankTitle(DEMO_USER.level);

export const MENTOR_CONTEXT = {
  pseudo: DEMO_USER.pseudo,
  level: DEMO_USER.level,
  rankTitle,
  goal: CAREER_GOAL,
  careerPct: getCareerProgressPct(),
  focus: "Networking — TCP/IP",
  xpIntoLevel: DEMO_USER.levelXp,
  xpIntoLevelMax: DEMO_USER.levelXpMax,
  streak: DEMO_USER.streak,
};

export const MENTOR_WEAKNESSES: MentorWeakness[] = [
  { topic: "TCP/IP", label: "Triple handshake TCP", score: 42 },
  { topic: "SSRF", label: "Server-Side Request Forgery", score: 35 },
  { topic: "XXE", label: "XXE — External Entities", score: 35 },
];

export const MENTOR_CONVERSATIONS: MentorConversation[] = [
  { id: "c1", title: "Explique-moi le triple handshake TCP", time: "Il y a 2 min" },
  { id: "c2", title: "Différence XSS stockée et réfléchie", time: "Il y a 1 h" },
  { id: "c3", title: "Pourquoi Linux est important ?", time: "Hier" },
  { id: "c4", title: "Aide sur le lab Find & grep", time: "2 jours" },
  { id: "c5", title: "Qu'est-ce que le DNS ?", time: "3 jours" },
];

export const MENTOR_FAQS = [
  "Qu'est-ce que le port 443 ?",
  "Explique-moi DNS",
  "Différence GET et POST",
  "Qu'est-ce qu'une vulnérabilité ?",
  "Aide sur un lab",
];

export type QuickActionId = "explain" | "lab" | "weaknesses" | "next";

export interface QuickAction {
  id: QuickActionId;
  title: string;
  description: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "explain",
    title: "Expliquer un concept",
    description: "Obtenir une explication claire",
  },
  {
    id: "lab",
    title: "M'aider sur un lab",
    description: "Obtenir un indice sans spoiler",
  },
  {
    id: "weaknesses",
    title: "Analyser mes faiblesses",
    description: "Voir mes points à améliorer",
  },
  {
    id: "next",
    title: "Voir ma prochaine étape",
    description: "Recommandation personnalisée",
  },
];

export const DAILY_TIP =
  "La pratique régulière est la clé. Même 30 minutes par jour peuvent faire une grande différence !";

export const HANDSHAKE_REPLY: HandshakeReply = {
  intro:
    "Le TCP 3-way handshake est le processus utilisé pour établir une connexion fiable entre un client et un serveur.",
  steps: [
    {
      num: 1,
      title: "SYN",
      description:
        "Le client envoie un paquet SYN au serveur pour demander l'ouverture de la connexion.",
    },
    {
      num: 2,
      title: "SYN-ACK",
      description:
        "Le serveur répond avec SYN-ACK pour confirmer la demande.",
    },
    {
      num: 3,
      title: "ACK",
      description: "Le client renvoie ACK pour confirmer.",
    },
  ],
  diagram: [
    "Client                      Serveur",
    "  |                            |",
    "  |        SYN ------------->  |",
    "  |                            |",
    "  |    <-------------- SYN-ACK |",
    "  |                            |",
    "  |        ACK ------------->  |",
    "  |                            |",
    "  |     Connexion établie ✓    |",
  ],
  conclusion:
    "Ce mécanisme permet de s'assurer que les deux côtés sont prêts à communiquer avant d'échanger des données.",
  quiz: {
    question: "Quel paquet contient le premier numéro de séquence ?",
    options: ["SYN", "SYN-ACK", "ACK"],
    answerIndex: 0,
    explanation:
      "Le paquet SYN du client initialise la connexion et embarque le numéro de séquence de départ (ISN). C'est lui qui déclenche le handshake.",
  },
};

export const LAB_GUIDES: Record<string, LabGuide> = {
  "find-grep": {
    id: "find-grep",
    title: "find & grep",
    objective: "Localiser le fichier flag.txt et en extraire le contenu.",
    hints: [
      "Tu sais que tu cherches un fichier précis. Quelle commande Linux permet de rechercher des fichiers dans une arborescence ?",
      "Essaie de réfléchir à la commande find : on peut filtrer par nom avec l'option -name.",
      "Tu peux utiliser : find / -name flag.txt 2>/dev/null. Ensuite, comment afficher son contenu ?",
    ],
    solution:
      "Solution complète : find / -name flag.txt 2>/dev/null, puis cat <chemin/trouvé>/flag.txt pour lire le flag.",
  },
  "tcpdump-capture": {
    id: "tcpdump-capture",
    title: "Capture TCP",
    objective: "Capturer le trafic et analyser le handshake TCP avec tcpdump.",
    hints: [
      "Toute analyse réseau commence par identifier la bonne interface. Quelle commande liste les interfaces réseau ?",
      "Pense à tcpdump : l'option -i choisit l'interface et -w écrit le trafic dans un fichier .pcap.",
      "Tu peux utiliser : sudo tcpdump -i eth0 -w capture.pcap, puis analyser avec tcpdump -r capture.pcap.",
    ],
    solution:
      "Solution complète : sudo tcpdump -i eth0 -w capture.pcap pour capturer, puis tcpdump -r capture.pcap pour relire les paquets et extraire le flag transmis en clair.",
  },
};

const WEAKNESS_REPLY = `Analyse de tes dernières performances, ${DEMO_USER.pseudo} 👇

• TCP/IP — triple handshake : 42% au quiz. C'est ta plus grande lacune en ce moment.
• SSRF : 35% — la notion de requête côté serveur n'est pas encore ancrée.
• XXE : 35% — les entités externes XML restent floues.

Mon conseil : revois d'abord le triple handshake TCP (cours du niveau 2), car c'est la base de tout ce qui suit en réseau. Ensuite, on attaque SSRF avec un exemple concret. Tu veux que je t'explique le handshake ?`;

const NEXT_STEP_REPLY = `Ta prochaine étape, ${DEMO_USER.pseudo} :

1. Révise la leçon « Le triple handshake TCP » (Niveau 2 — Networking) pour corriger ton 42%.
2. Valide ensuite le lab « Capture TCP » pour ancrer la théorie.
3. Tu pourras alors enchaîner sur le niveau 3 : Python / Bash pour la cybersécurité.

Je peux aussi te tester avec une mini-question pour vérifier ta compréhension. Prêt(e) ?`;

const XSS_REPLY = `Très bonne question.

• XSS réfléchi : l'attaque est dans l'URL et renvoyée immédiatement par le serveur. Elle ne touche que la victime qui clique sur le lien malveillant.
• XSS stocké : l'attaque est enregistrée sur le serveur (commentaire, profil...) et exécutée par tous les visiteurs.

En résumé : réfléchi = à usage unique via le lien, stocké = persisté pour tous. Le stocké est le plus dangereux.`;

const LINUX_REPLY = `Linux est indispensable en cybersécurité offensive pour plusieurs raisons :

1. Tous les outils de pentest sont nés sur Linux : nmap, Metasploit, Wireshark, hashcat...
2. La ligne de commande te donne un contrôle total sur le système.
3. La majorité des serveurs du web tournent sous Linux : pour les attaquer, il faut le connaître.
4. Kali et Parrot OS sont des distributions pensées pour le pentest.

Ton niveau 1 (Linux Fundamentals) est déjà validé — tu as la base. Maintenant c'est la pratique qui compte.`;

const DNS_REPLY = `Le DNS (Domain Name System) est l'annuaire d'Internet.

Quand tu tapes « cyberacademy.app », ton ordinateur demande à un serveur DNS de traduire ce nom en adresse IP. Sans DNS, il faudrait mémoriser 2606:4700:... pour chaque site.

Un pentester regarde le DNS parce qu'il révèle des sous-domaines oubliés, des enregistrements MX, et parfois des zones mal configurées (zone transfer).`;

const PORT443_REPLY = `Le port 443 est le port par défaut du HTTPS.

• 443 = HTTPS (chiffré via TLS/SSL)
• 80 = HTTP (en clair)

Tout ce qui passe sur 443 est chiffré : un attaquant qui écoute le trafic ne voit que des octets illisibles. En pentest, un port 443 ouvert signifie souvent un serveur web ou une API à analyser.`;

const GETPOST_REPLY = `Différence GET et POST :

• GET : les données voyagent dans l'URL (visible, limité en taille, mémorisable). Utilisé pour lire une ressource.
• POST : les données voyagent dans le corps de la requête (invisible, sans limite pratique). Utilisé pour envoyer/modifier une ressource.

Côté sécurité : ne mets jamais de mot de passe en GET, il resterait dans l'URL, l'historique et les logs serveur. Les injections SQL visent souvent des paramètres GET.`;

const VULN_REPLY = `Une vulnérabilité, c'est une faiblesse dans un système qu'un attaquant peut exploiter.

Elle a souvent 3 composantes :
1. Une cause : erreur de code, mauvaise configuration, mot de passe faible...
2. Une exploitation : la façon de transformer la faiblesse en attaque.
3. Un impact : vol de données, prise de contrôle, indisponibilité...

Tu découvriras les 10 principales (OWASP Top 10) au niveau 5 de ton parcours. C'est la matière de base de tout pentester.`;

const FALLBACK_MENTOR = `Je préfère te guider vers un angle précis, ${DEMO_USER.pseudo}. Tes points faibles actuels sont TCP/IP, SSRF et XXE.

Tu peux me demander, par exemple : « Explique-moi le triple handshake TCP », « Différence GET et POST », « Qu'est-ce que le DNS ? », ou activer le Mode Lab Assistant si tu es bloqué sur un lab.`;

export function getMentorReply(raw: string): MentorReply {
  const t = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (t.includes("handshake") || t.includes("synchronisation")) {
    return { handshake: HANDSHAKE_REPLY };
  }
  if (t.includes("xss")) return { content: XSS_REPLY };
  if (t.includes("faiblesse") || t.includes("point") || t.includes("ameliorer")) {
    return { content: WEAKNESS_REPLY };
  }
  if (t.includes("etape") || t.includes("prochaine") || t.includes("ensuite")) {
    return { content: NEXT_STEP_REPLY };
  }
  if (t.includes("dns")) return { content: DNS_REPLY };
  if (t.includes("443") || t.includes("https")) return { content: PORT443_REPLY };
  if (t.includes("get") && t.includes("post")) return { content: GETPOST_REPLY };
  if (t.includes("vulnerabilite") || t.includes("faille")) return { content: VULN_REPLY };
  if (t.includes("linux")) return { content: LINUX_REPLY };
  return { content: FALLBACK_MENTOR };
}

export const LAB_MODE_INTRO = `Mode Lab Assistant activé, ${DEMO_USER.pseudo}.

Je suis là pour te guider sans te donner la solution d'un coup. Choisis ton lab, puis révèle les indices un par un. Décris-moi aussi précisément où tu es bloqué, et je t'orienterai.`;

export function getLabReply(raw: string): MentorReply {
  const t = raw.toLowerCase();
  if (t.includes("bloque") || t.includes("solution") || t.includes("indice")) {
    return {
      content:
        "Pas de panique. Prends une étape à la fois : commence par l'indice 1 ci-dessous, réfléchis, puis révèle le suivant seulement si nécessaire. La solution n'est jamais la meilleure façon d'apprendre.",
    };
  }
  if (t.includes("find") || t.includes("grep") || t.includes("fichier")) {
    return {
      content:
        "Bonne intuition. Indice 1 : quelle commande recherche des fichiers par nom dans toute l'arborescence ? Si tu es sûr(e), essaie de l'exécuter avec l'option -name.",
    };
  }
  return {
    content:
      "Je suis en Mode Lab Assistant : décris ton blocage précis (étape, commande, erreur) et je t'aiderai par indices progressifs. Tu peux aussi utiliser les boutons d'indices ci-dessous.",
  };
}
