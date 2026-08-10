import { DEMO_USER } from "./mock";
import { getCareerProgressPct, getRankTitle } from "./progress";
import { CAREER_GOAL } from "./progress";

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

export interface MentorReply {
  content?: string;
  handshake?: HandshakeReply;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content?: string;
  handshake?: HandshakeReply;
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
  { id: "c1", title: "Triple handshake TCP", time: "Il y a 2 min" },
  { id: "c2", title: "XSS stockée vs réfléchie", time: "Il y a 1 h" },
  { id: "c3", title: "Pourquoi Linux est important ?", time: "Hier" },
  { id: "c4", title: "Qu'est-ce que le DNS ?", time: "2 jours" },
  { id: "c5", title: "Qu'est-ce que le port 443 ?", time: "3 jours" },
];

export const MENTOR_FAQS = [
  "Explique-moi le triple handshake TCP",
  "Explique-moi le DNS simplement",
  "Différence GET et POST",
  "Qu'est-ce qu'une vulnérabilité ?",
  "Pourquoi Linux est important ?",
];

export const MENTOR_GREETING =
  "Bonjour ! Tu veux travailler sur quoi aujourd'hui ?";

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

Tu peux me demander, par exemple : « Explique-moi le triple handshake TCP », « Différence GET et POST », « Qu'est-ce que le DNS ? », ou « Pourquoi Linux est important ? ».`;

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
