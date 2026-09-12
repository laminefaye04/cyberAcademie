"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Globe,
  KeyRound,
  Loader2,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { BADGES } from "@/lib/badges";
import { DEMO_USER } from "@/lib/mock";
import { V1_LEVELS } from "@/lib/roadmap";
import {
  CAREER_GOAL,
  getCareerProgressPct,
  getCompletedLevelsCount,
  getGlobalProgressPct,
  getRankTitle,
  getTotalLevels,
} from "@/lib/progress";

const SKILL_DOMAINS = [
  { name: "Linux", levels: 2, max: 2 },
  { name: "Network", levels: 2, max: 2 },
  { name: "Web", levels: 3, max: 3 },
  { name: "Offensif", levels: 4, max: 5 },
];

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 600);
  }

  const rankTitle = getRankTitle(DEMO_USER.level);
  const xpPct = Math.min(100, Math.round((DEMO_USER.xp / DEMO_USER.xpToNextLevel) * 100));
  const completedCount = getCompletedLevelsCount();
  const totalLevels = getTotalLevels();
  const globalPct = getGlobalProgressPct();
  const careerPct = getCareerProgressPct();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      {/* Header */}
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20 border-2 border-cyber-500/50">
            <AvatarFallback className="bg-cta-700 text-2xl font-bold">
              {DEMO_USER.pseudo.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                {DEMO_USER.pseudo}
              </h1>
              <Badge className="bg-cyber-500/15 text-cyber-400">
                Niveau {DEMO_USER.level}
              </Badge>
              <Badge variant="outline" className="border-cyber-500/40 text-cyber-400">
                {rankTitle}
              </Badge>
              <Badge variant="outline" className="border-border text-ink-dim">
                Apprenant
              </Badge>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink-dim">{DEMO_USER.bio}</p>
            <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-cyber-500" />
                {DEMO_USER.xp.toLocaleString("fr-FR")} XP
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-cyber-500" />
                {completedCount}/{totalLevels} niveaux
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-cyber-500" />
                Cameroun
              </span>
            </div>
            {/* XP bar + career goal */}
            <div className="mt-4 max-w-md space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {globalPct >= 100 ? "Cursus complété" : `${xpPct}% du niveau ${DEMO_USER.level}`}
                </span>
                <span className="text-cyber-400">
                  {DEMO_USER.xp.toLocaleString("fr-FR")} /{" "}
                  {DEMO_USER.xpToNextLevel.toLocaleString("fr-FR")} XP
                </span>
              </div>
              <Progress value={xpPct} className="h-2 bg-night-800" />
              <div className="flex items-center justify-between rounded-md border border-cyber-500/30 bg-cyber-500/[0.06] px-3 py-2 text-xs">
                <span className="flex items-center gap-1.5 text-cyber-400">
                  <Target className="h-3.5 w-3.5" /> Objectif : {CAREER_GOAL}
                </span>
                <span className="text-ink-dim">
                  {completedCount}/{totalLevels} niveaux · {careerPct}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="bg-night-800">
          <TabsTrigger value="overview">
            <UserRound className="mr-2 h-4 w-4" /> Aperçu
          </TabsTrigger>
          <TabsTrigger value="badges">
            <Trophy className="mr-2 h-4 w-4" /> Badges
          </TabsTrigger>
          <TabsTrigger value="settings">
            <KeyRound className="mr-2 h-4 w-4" /> Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4 text-cyber-500" />
                  Compétences par domaine
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SKILL_DOMAINS.map((domain) => {
                  const pct = Math.round((domain.levels / domain.max) * 100);
                  return (
                    <div key={domain.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-cyber-500" />
                          {domain.name}
                        </span>
                        <span className="font-mono text-xs text-cyber-400">
                          {domain.levels}/{domain.max} niveaux
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        className="h-1.5 bg-night-800 [&>div]:bg-cyber-500"
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progression par niveau</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {V1_LEVELS.map((level) => {
                  const isDone = DEMO_USER.completedLevels.includes(level.id);
                  const isCurrent = level.id === DEMO_USER.level;
                  return (
                    <div key={level.id}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <level.icon className="h-4 w-4 text-cyber-500" />
                          <span className="truncate">{level.title}</span>
                        </span>
                        <span
                          className={
                            isDone
                              ? "text-cyber-500"
                              : isCurrent
                                ? "text-warning"
                                : "text-muted-foreground"
                          }
                        >
                          {isDone ? "Validé" : isCurrent ? "En cours · 45%" : "Verrouillé"}
                        </span>
                      </div>
                      <Progress
                        value={isDone ? 100 : isCurrent ? 45 : 0}
                        className="h-1.5 bg-night-800"
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Award className="h-4 w-4 text-cyber-500" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 rounded-md border border-border bg-night-800/50 p-4">
                    <ShieldCheck className="h-8 w-8 text-cyber-500" />
                    <div>
                      <p className="font-medium">Certification Linux — niveau 1</p>
                      <p className="text-xs text-muted-foreground">
                        Délivrée le 12/07/2026 · vérifiable
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-ink-dim">
                    Passez les niveaux 4-6 pour débloquer la certification
                    « Pentester Junior ».
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BADGES.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
              >
              <Card
                key={badge.id}
                className={badge.earned ? "border-cyber-500/50" : "opacity-80"}
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <badge.icon
                    className={cn(
                      "h-8 w-8",
                      badge.earned ? "text-cyber-500" : "text-muted-foreground grayscale"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{badge.name}</p>
                    <p className="mt-1 text-sm text-ink-dim">
                      {badge.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {badge.criteria}
                    </p>
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                        <span>
                          {Math.min(badge.progress, badge.target)}/
                          {badge.target}
                        </span>
                        {badge.earned && (
                          <span className="text-cyber-500">Terminé</span>
                        )}
                      </div>
                      <Progress
                        value={Math.min(
                          100,
                          Math.round((badge.progress / badge.target) * 100)
                        )}
                        className="h-1 bg-night-800"
                      />
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <form onSubmit={saveProfile}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pseudo">Pseudo public</Label>
                  <Input
                    id="pseudo"
                    defaultValue={DEMO_USER.pseudo}
                    className="bg-night-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    defaultValue="Cameroun"
                    className="bg-night-800"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    defaultValue={DEMO_USER.bio}
                    className="bg-night-800"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="portfolio-links">Liens du portfolio public</Label>
                  <div className="flex gap-2">
                    <Input
                      id="portfolio-links"
                      defaultValue="https://github.com/cypher_rookie"
                      placeholder="GitHub, LinkedIn, blog..."
                      className="bg-night-800"
                    />
                    <Button type="submit" className="shrink-0 bg-cta-700 text-white hover:bg-cta-600">
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : saved ? (
                        "Enregistré "
                      ) : (
                        "Enregistrer"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-4 w-4 text-cyber-500" />
                Sécurité du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-md border border-border bg-night-800/50 p-4">
                <div>
                  <p className="font-medium">Authentification à deux facteurs (2FA)</p>
                  <p className="text-sm text-ink-dim">
                    Optionnelle, recommandée. Authentification forte et hachage
                    des mots de passe.
                  </p>
                </div>
                <Badge variant="outline" className="border-cyber-500/40 text-cyber-400">
                  Non activée
                </Badge>
              </div>
              <Button variant="outline" className="border-border text-ink-dim">
                Modifier le mot de passe
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
