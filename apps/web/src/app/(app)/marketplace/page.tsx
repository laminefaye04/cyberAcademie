"use client";

import { useState } from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  Check,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Premium Étudiant",
    price: "9 000",
    period: "– 12 000 FCFA / mois",
    features: [
      "Roadmap complète (niveaux 0-11)",
      "Labs illimités",
      "IA Coach personnalisé",
      "Portfolio cyber public",
      "Tarif réduit sur justificatif étudiant",
    ],
    highlight: true,
  },
  {
    name: "Premium Professionnel",
    price: "20 000",
    period: "– 25 000 FCFA / mois",
    features: [
      "Tout Premium Étudiant",
      "Niveaux avancés : AD, Red Team, Cloud",
      "IA Career Advisor",
      "Certifications internes reconnues",
      "Support prioritaire",
    ],
    highlight: false,
  },
];

const CERTIFICATIONS = [
  {
    name: "Certification Linux & Networking",
    level: "Débutant",
    xp: "Valide les niveaux 0-2",
    badge: "Fondamentaux",
  },
  {
    name: "Certification Pentester Junior",
    level: "Intermédiaire",
    xp: "Valide les niveaux 3-6",
    badge: "OWASP · Web · Méthodo",
  },
  {
    name: "Certification Red Team",
    level: "Avancé",
    xp: "Valide les niveaux 7-10",
    badge: "AD · Red Team · CTF",
  },
];

export default function MarketplacePage() {
  const [selected, setSelected] = useState("Premium Étudiant");
  const [loading, setLoading] = useState(false);

  function subscribe() {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-6 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Marketplace
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-dim">
          Accédez aux offres premium, aux certifications internes vérifiables
          et aux contenus B2B. Payez par Stripe, Wave ou Orange Money.
        </p>
      </div>

      {/* Plans */}
      <div className="grid gap-4 md:grid-cols-2">
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative",
              plan.highlight &&
                "border-cyber-500/50 shadow-[0_0_30px_rgba(79,209,197,0.15)]"
            )}
          >
            <CardContent className="flex h-full flex-col p-6">
              {plan.highlight && (
                <Badge className="absolute right-4 top-4 bg-cyber-500 text-primary-foreground">
                  Populaire
                </Badge>
              )}
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyber-500" />
                <h2 className="text-lg font-semibold">{plan.name}</h2>
              </div>
              <p className="mt-3 text-3xl font-bold text-cyber-500">
                {plan.price}
                <span className="text-sm font-normal text-ink-dim">
                  {" "}
                  {plan.period}
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-ink-dim"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  setSelected(plan.name);
                  subscribe();
                }}
                className={cn(
                  "mt-6 w-full",
                  plan.highlight
                    ? "bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
                    : "bg-cta-700 text-white hover:bg-cta-600"
                )}
              >
                {loading && selected === plan.name ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Choisir {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4 text-cyber-500" />
            Paiements sécurisés
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {["Stripe", "Wave", "Orange Money"].map((provider) => (
            <Badge
              key={provider}
              variant="outline"
              className="border-cyber-500/40 bg-cyber-500/5 px-4 py-2 text-sm text-cyber-400"
            >
              {provider}
            </Badge>
          ))}
        </CardContent>
      </Card>

      {/* Certifications */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-cyber-500" />
          <h2 className="text-lg font-semibold">Certifications internes</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <Card key={cert.name} className="h-full">
              <CardContent className="flex h-full flex-col p-5">
                <BadgeCheck className="mb-3 h-6 w-6 text-cyber-500" />
                <h3 className="font-semibold leading-snug">{cert.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{cert.xp}</p>
                <div className="mt-auto pt-4">
                  <Badge variant="outline" className="border-cyber-500/40 text-cyber-400">
                    {cert.badge}
                  </Badge>
                  <Badge className="ml-2 bg-night-800 text-ink-dim">
                    {cert.level}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* B2B */}
      <Card className="border-cta-600/40 bg-gradient-to-br from-cta-800/20 to-night-900/40">
        <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-cyber-500" />
              <h2 className="text-lg font-semibold">Offre B2B</h2>
            </div>
            <p className="mt-2 text-sm text-ink-dim">
              Licences groupées pour les écoles, clubs cybersécurité
              universitaires et entreprises. Tableau de bord formateur, suivi de
              cohortes, contenus sur-mesure et facturation annuelle.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {["Licences groupées", "Suivi de cohortes", "Contenus sur-mesure"].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-sm text-ink-dim"
                  >
                    <Check className="h-4 w-4 text-cyber-500" /> {item}
                  </span>
                )
              )}
            </div>
          </div>
          <Button className="bg-cta-700 text-white hover:bg-cta-600">
            Contacter l'équipe B2B
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-start gap-3 p-5">
          <GraduationCap className="h-5 w-5 shrink-0 text-cyber-500" />
          <p className="text-sm text-ink-dim">
            Justificatif étudiant requis pour le tarif réduit. Les certifications
            internes sont générées automatiquement dans votre portfolio et
            vérifiables par critères objectifs (quiz ≥ 80%, labs validés, rapport
            noté).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
