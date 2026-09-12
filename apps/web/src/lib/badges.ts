import {
  Activity,
  Award,
  Code2,
  Database,
  FileText,
  Flag,
  Globe,
  Network,
  Swords,
  Terminal,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  criteria: string;
  progress: number;
  target: number;
  earned: boolean;
}

export const BADGES: Badge[] = [
  {
    id: "first-blood",
    icon: Swords,
    name: "First Blood",
    description: "Résoudre son premier challenge",
    criteria: "1 challenge résolu",
    progress: 1,
    target: 1,
    earned: true,
  },
  {
    id: "linux-warrior",
    icon: Terminal,
    name: "Linux Warrior",
    description: "Réussir des labs Linux",
    criteria: "10 labs Linux réussis",
    progress: 4,
    target: 10,
    earned: false,
  },
  {
    id: "sqli-hunter",
    icon: Database,
    name: "SQLi Hunter",
    description: "Exploiter des injections SQL",
    criteria: "5 injections SQL exploitées",
    progress: 1,
    target: 5,
    earned: false,
  },
  {
    id: "web-hunter",
    icon: Globe,
    name: "Web Hunter",
    description: "Résoudre des challenges Web",
    criteria: "20 challenges Web réussis",
    progress: 7,
    target: 20,
    earned: false,
  },
  {
    id: "rooted",
    icon: Terminal,
    name: "Rooted",
    description: "Obtenir son premier shell root",
    criteria: "1 escalade de privilèges réussie",
    progress: 1,
    target: 1,
    earned: true,
  },
  {
    id: "packet-sniffer",
    icon: Activity,
    name: "Packet Sniffer",
    description: "Analyser une capture réseau complète",
    criteria: "1 capture réseau analysée",
    progress: 0,
    target: 1,
    earned: false,
  },
  {
    id: "automator",
    icon: Code2,
    name: "Automator",
    description: "Soumettre un script de reconnaissance fonctionnel",
    criteria: "1 projet Python/Bash évalué",
    progress: 1,
    target: 1,
    earned: true,
  },
  {
    id: "ctf-recruit",
    icon: Flag,
    name: "CTF Recruit",
    description: "Participer à sa première CTF Arena",
    criteria: "1 CTF terminée",
    progress: 0,
    target: 1,
    earned: false,
  },
  {
    id: "ctf-champion",
    icon: Trophy,
    name: "CTF Champion",
    description: "Terminer dans le top 10 d'une CTF",
    criteria: "Top 10 en CTF Arena",
    progress: 0,
    target: 10,
    earned: false,
  },
  {
    id: "method-master",
    icon: FileText,
    name: "Pentester Junior",
    description: "Rapport de pentest noté ≥ 80%",
    criteria: "Rapport de pentest soumis",
    progress: 0,
    target: 1,
    earned: false,
  },
  {
    id: "ad-king",
    icon: Network,
    name: "AD King",
    description: "Compromission complète d'un lab Active Directory",
    criteria: "Domain admin obtenu",
    progress: 0,
    target: 1,
    earned: false,
  },
  {
    id: "junior-pentester",
    icon: Award,
    name: "Junior Pentester",
    description: "Terminer le parcours complet",
    criteria: "12 niveaux validés",
    progress: 12,
    target: 12,
    earned: true,
  },
];
