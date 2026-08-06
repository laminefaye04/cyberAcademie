export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earned: boolean;
}

export const BADGES: Badge[] = [
  {
    id: "first-steps",
    name: "Premiers pas",
    description: "Terminer le niveau Computer Fundamentals",
    icon: "🧭",
    criteria: "Niveau 0 validé",
    earned: true,
  },
  {
    id: "shell-master",
    name: "Shell Master",
    description: "Valider les 5 labs terminal du niveau Linux",
    icon: "🐚",
    criteria: "5 labs terminal validés",
    earned: true,
  },
  {
    id: "first-root",
    name: "Premier Root",
    description: "Obtenir un accès root sur un lab",
    icon: "👑",
    criteria: "Escalade de privilèges réussie",
    earned: false,
  },
  {
    id: "packet-sniffer",
    name: "Packet Sniffer",
    description: "Analyser une capture réseau complète",
    icon: "📡",
    criteria: "Lab réseau validé",
    earned: false,
  },
  {
    id: "automator",
    name: "Automator",
    description: "Soumettre un script de reconnaissance fonctionnel",
    icon: "⚙️",
    criteria: "Projet Python/Bash évalué",
    earned: false,
  },
  {
    id: "xss-master",
    name: "Maître XSS",
    description: "Exploiter un XSS stocké en conditions réelles",
    icon: "⚡",
    criteria: "Lab XSS validé",
    earned: false,
  },
  {
    id: "owasp-10",
    name: "Chasseur OWASP",
    description: "Valider les 10 labs OWASP Top 10",
    icon: "🛡️",
    criteria: "10 labs OWASP validés",
    earned: false,
  },
  {
    id: "pentester",
    name: "Pentester Junior",
    description: "Rapport de pentest noté ≥ 80%",
    icon: "🎯",
    criteria: "Rapport de pentest soumis",
    earned: false,
  },
  {
    id: "ctf-champion",
    name: "CTF Champion",
    description: "Score minimum sur 10 challenges chronométrés",
    icon: "🏆",
    criteria: "10 challenges réussis",
    earned: false,
  },
  {
    id: "ad-king",
    name: "AD King",
    description: "Compromission complète d'un lab Active Directory",
    icon: "👑",
    criteria: "Domain admin obtenu",
    earned: false,
  },
  {
    id: "red-teamer",
    name: "Red Teamer",
    description: "Scénario Red Team validé par un mentor",
    icon: "🔥",
    criteria: "Scénario Red Team validé",
    earned: false,
  },
  {
    id: "cloud-knight",
    name: "Cloud Knight",
    description: "Valider les 3 labs cloud",
    icon: "☁️",
    criteria: "3 labs cloud validés",
    earned: false,
  },
];
