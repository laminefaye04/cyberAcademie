"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Globe,
  KeyRound,
  Link2,
  Loader2,
  Lock,
  ShieldCheck,
  Star,
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
import { BADGES } from "@/lib/badges";
import { DEMO_USER } from "@/lib/mock";
import { ROADMAP_LEVELS } from "@/lib/roadmap";

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

  const portfolioUrl = `/portfolio/${DEMO_USER.pseudo}`;

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
                {DEMO_USER.completedLevels.length}/12 niveaux
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-cyber-500" />
                Cameroun
              </span>
            </div>
          </div>
          <Button asChild variant="outline" className="border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10">
            <Link href={portfolioUrl}>
              <Link2 className="mr-2 h-4 w-4" />
              Voir mon portfolio
            </Link>
          </Button>
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
                <CardTitle className="text-base">Progression par niveau</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ROADMAP_LEVELS.slice(0, 6).map((level) => {
                  const isDone = DEMO_USER.completedLevels.includes(level.id);
                  const isCurrent = level.id === DEMO_USER.level;
                  return (
                    <div key={level.id}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <level.icon className="h-4 w-4 text-cyber-500" />
                          {level.title}
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
                        className={
                          isCurrent ? "h-1.5 bg-night-800" : "h-1.5 bg-night-800"
                        }
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lock className="h-4 w-4 text-cyber-500" />
                    Abonnement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Freemium</p>
                      <p className="text-xs text-muted-foreground">
                        Niveaux 0-1 · Cyber Mentor limité
                      </p>
                    </div>
                    <Badge className="bg-night-800 text-ink-dim">Gratuit</Badge>
                  </div>
                  <Button asChild className="w-full bg-cta-700 text-white hover:bg-cta-600">
                    <Link href="/marketplace">Passer au Premium</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BADGES.map((badge) => (
              <Card
                key={badge.id}
                className={badge.earned ? "border-cyber-500/50" : "opacity-60"}
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <span
                    className={`text-3xl ${
                      badge.earned ? "" : "grayscale"
                    }`}
                  >
                    {badge.icon}
                  </span>
                  <div>
                    <p className="font-medium">{badge.name}</p>
                    <p className="mt-1 text-sm text-ink-dim">
                      {badge.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {badge.criteria}
                    </p>
                    {badge.earned ? (
                      <Badge className="mt-2 bg-cyber-500 text-primary-foreground">
                        Débloqué
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="mt-2 border-border text-muted-foreground">
                        À débloquer
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
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
                        "Enregistré ✓"
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
