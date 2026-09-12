import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  Copy,
  FileCheck2,
  GitBranch,
  Link2,
  Star,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BADGES } from "@/lib/badges";
import { DEMO_USER } from "@/lib/mock";
import { Button } from "@/components/ui/button";
import {
  CAREER_GOAL,
  getCompletedLevelsCount,
  getGlobalProgressPct,
  getMasteredSkills,
  getRankTitle,
  getTotalLevels,
} from "@/lib/progress";

interface PortfolioPageProps {
  params: Promise<{ pseudo: string }>;
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { pseudo } = await params;
  return {
    title: `Portfolio de ${pseudo} — CyberAcademy`,
    description: `Compétences, badges et projets validés de ${pseudo} sur CyberAcademy.`,
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { pseudo } = await params;

  const skills = getMasteredSkills();
  const earnedBadges = BADGES.filter((badge) => badge.earned);
  const completedCount = getCompletedLevelsCount();
  const totalLevels = getTotalLevels();
  const globalPct = getGlobalProgressPct();
  const rankTitle = getRankTitle(DEMO_USER.level);

  return (
    <div className="min-h-screen bg-night-950 text-ink">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Link href="/">
            <Brand />
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10"
          >
            <Copy className="mr-2 h-3.5 w-3.5" />
            Copier le lien
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <Card>
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24 border-2 border-cyber-500/50">
              <AvatarFallback className="bg-cta-700 text-3xl font-bold">
                {pseudo.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{pseudo}</h1>
                <Badge className="bg-cyber-500/15 text-cyber-400">
                  {rankTitle} · {globalPct}%
                </Badge>
              </div>
              <p className="mt-2 text-sm text-ink-dim">{DEMO_USER.bio}</p>
              <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-cyber-500" />
                  {DEMO_USER.xp.toLocaleString("fr-FR")} XP
                </span>
                <span className="flex items-center gap-1.5">
                  <GitBranch className="h-4 w-4 text-cyber-500" />
                  {completedCount}/{totalLevels} niveaux
                </span>
                <a
                  href="https://github.com/cypher_rookie"
                  className="flex items-center gap-1.5 hover:text-cyber-500"
                >
                  <Link2 className="h-4 w-4 text-cyber-500" /> github.com/cypher_rookie
                </a>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Labs validés", value: String(DEMO_USER.labsCompleted) },
                  { label: "Challenges", value: String(DEMO_USER.challengesSolved) },
                  { label: "CTFs", value: "0" },
                  { label: "Moyenne quiz", value: `${DEMO_USER.quizAverage}%` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-md border border-border bg-night-800/50 p-3 text-center"
                  >
                    <p className="text-lg font-bold text-cyber-400">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Compétences maîtrisées</span>
              <span className="text-sm font-medium text-cyber-500">
                {skills.length} compétences
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-night-800">
              <div
                className="h-full rounded-full bg-cyber-500"
                style={{ width: `${globalPct}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-cyber-500/40 bg-cyber-500/5 text-cyber-400"
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Objectif de carrière : {CAREER_GOAL}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Badges obtenus</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-2 rounded-md border border-cyber-500/40 bg-night-800/60 px-3 py-2"
              >
                <badge.icon className="h-4 w-4 text-cyber-500" />
                <span className="text-sm">{badge.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Projets réalisés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                title: "Rapport de pentest — réseau local simulé",
                description:
                  "Reconnaissance, énumération, exploitation d'un service SMB vulnérable et rapport complet.",
                badge: "Pentesting Methodology",
              },
              {
                title: "Lab Terminal — Escalade de privilèges",
                description:
                  "Exploitation d'un binaire setuid dans un conteneur Linux isolé (objectif root).",
                badge: "Linux Fundamentals",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="rounded-md border border-border bg-night-800/50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{project.title}</p>
                  <FileCheck2 className="h-4 w-4 shrink-0 text-cyber-500" />
                </div>
                <p className="mt-1 text-sm text-ink-dim">{project.description}</p>
                <Badge variant="outline" className="mt-2 border-border text-xs text-muted-foreground">
                  {project.badge}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-cyber-500/40 bg-cyber-500/[0.05]">
          <CardContent className="flex items-start gap-3 p-5">
            <Badge className="bg-cyber-500 text-primary-foreground">
              Vérifié
            </Badge>
            <p className="text-sm text-ink-dim">
              Ce portfolio est généré automatiquement par CyberAcademy à partir
              de la progression validée de {pseudo}. Chaque badge et
              certification est vérifiable par critères objectifs.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
