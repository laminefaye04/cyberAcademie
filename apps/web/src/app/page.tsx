"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Check,
  FlaskConical,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ROADMAP_LEVELS } from "@/lib/roadmap";
import { BADGES } from "@/lib/badges";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const STATS = [
  { value: "12", label: "niveaux guidés" },
  { value: "100+", label: "labs isolés" },
  { value: "5", label: "modules IA" },
  { value: "4 820", label: "apprenants" },
];

const TRUST_LOGOS = ["TryHackMe", "HTB", "Root-Me", "PortSwigger", "Udemy"];

export default function HomePage() {
  return (
    <div className="bg-night-950 text-ink">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,209,197,0.12),transparent_55%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(11,61,145,0.25),transparent_50%)]"
          />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-24 pt-24 text-center sm:pt-32"
          >
            <motion.div variants={fadeUp}>
              <Badge
                variant="outline"
                className="mb-6 border-cyber-500/40 bg-cyber-500/10 text-cyber-400"
              >
                Cybersécurité offensive · du zéro au professionnel
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
            >
              La seule plateforme qui vous dit{" "}
              <span className="text-cyber-500">exactement quoi apprendre</span>,
              dans quel ordre.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg text-ink-dim"
            >
              Un mentor IA s'adapte à votre niveau, une roadmap en 12 niveaux
              vous guide du premier jour jusqu'au poste de pentester. Théorie
              immédiatement suivie de labs pratiques en environnement isolé.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="bg-cta-700 px-8 text-base text-white hover:bg-cta-600"
              >
                <Link href="/auth/register">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cyber-500/40 bg-transparent px-8 text-base text-cyber-400 hover:bg-cyber-500/10"
              >
                <Link href="#roadmap">
                  Voir la roadmap
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-12 flex items-center gap-6 text-sm text-ink-dim"
            >
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-500" /> Sans carte bancaire
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-500" /> Labs 100% légaux et
                isolés
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-500" /> Communauté active
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="border-y border-border/60 bg-night-900/40 py-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4">
            {TRUST_LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-sm font-medium text-muted-foreground/70"
              >
                {logo}
              </span>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-lg border border-border/60 bg-card p-6 text-center"
              >
                <p className="text-3xl font-bold text-cyber-500">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-ink-dim">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="scroll-mt-20 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Une roadmap en{" "}
                <span className="text-cyber-500">12 niveaux</span>, jamais de
                surcharge de choix
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-ink-dim">
                Un seul chemin recommandé à la fois. Chaque niveau débloque le
                suivant par des critères de validation objectifs, comme un arbre
                de compétences.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ROADMAP_LEVELS.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.06 }}
                >
                  <Link
                    href={`/roadmap/${level.slug}`}
                    className="group block h-full"
                  >
                    <Card className="h-full transition-colors hover:border-cyber-500/50 hover:bg-cyber-500/5">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-night-800 text-cyber-500 transition-transform group-hover:scale-105">
                            <level.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Niveau {level.id}
                            </p>
                            <h3 className="font-semibold leading-tight">
                              {level.title}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm text-ink-dim">
                          {level.objectives}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {level.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-border bg-night-800 px-2.5 py-0.5 text-xs text-ink-dim"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IA MENTOR */}
        <section
          id="ia"
          className="scroll-mt-20 border-y border-border/60 bg-night-900/40 py-16"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-cyber-500/10 text-cyber-400">
                5 modules IA
              </Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Un mentor IA à chaque étape de votre apprentissage
              </h2>
              <p className="mt-4 text-ink-dim">
                Entièrement auto-hébergé, open source, ancré sur le contenu
                pédagogique officiel de la plateforme grâce au RAG.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  ["Cyber Mentor", "Répond à vos questions, adapte son niveau de vulgarisation."],
                  ["IA Coach", "Analyse vos erreurs et ajuste votre plan en continu."],
                  ["IA Lab Assistant", "Des indices progressifs sans jamais révéler la solution."],
                  ["IA Challenge Generator", "Des exercices calibrés à votre niveau réel."],
                  ["IA Career Advisor", "Certifications et carrière personnalisées."],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <Bot className="mt-0.5 h-5 w-5 shrink-0 text-cyber-500" />
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-ink-dim">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyber-500/10 to-cta-700/20 blur-xl"
              />
              <Card className="relative border-cyber-500/30">
                <CardContent className="space-y-4 p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 text-cyber-500">
                    <Bot className="h-4 w-4" />
                    <span>cyber-mentor@academy:~$</span>
                  </div>
                  <p className="text-ink">
                    J'ai analysé votre dernier lab. Vos requêtes SQL sont
                    solides, mais le bit setuid vous échappe encore.
                  </p>
                  <p className="text-ink-dim">
                    → Revoir les permissions chmod (10 min)
                    <br />
                    → Refaire le lab « Escalade setuid » avec indice
                  </p>
                  <div className="border-t border-border pt-3 text-xs text-muted-foreground">
                    Recommandation générée par IA Coach · ancrée sur la
                    progression réelle
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* LABS */}
        <section id="labs" className="scroll-mt-20 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Des labs pratiques en{" "}
                <span className="text-cyber-500">environnement isolé</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-ink-dim">
                Chaque notion théorique est immédiatement suivie d'un lab. Un
                conteneur Docker dédié, aucune cible réelle, validation
                automatique par flag.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["Web labs", "Applications vulnérables pour pratiquer l'OWASP Top 10."],
                ["Linux labs", "Système, permissions, escalade de privilèges."],
                ["Network labs", "Réseaux simulés, capture et analyse de trafic."],
                ["CTF labs", "Challenges chronométrés avec classement."],
              ].map(([title, desc], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-5">
                      <FlaskConical className="mb-3 h-6 w-6 text-cyber-500" />
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-2 text-sm text-ink-dim">{desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GAMIFICATION */}
        <section className="border-y border-border/60 bg-night-900/40 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-cyber-500/10 text-cyber-400">
                Gamification
              </Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Progression mesurable, motivation sans fin
              </h2>
              <p className="mt-4 text-ink-dim">
                XP, niveaux, badges, challenges chronométrés et classements
                communautaires : votre progression reflète une compétence
                réelle validée.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {BADGES.filter((badge) => badge.earned).map((badge) => (
                  <span
                    key={badge.id}
                    className="flex items-center gap-2 rounded-md border border-cyber-500/40 bg-cyber-500/10 px-3 py-1.5 text-sm"
                  >
                    <span>{badge.icon}</span> {badge.name}
                  </span>
                ))}
                {BADGES.filter((badge) => !badge.earned)
                  .slice(0, 3)
                  .map((badge) => (
                    <span
                      key={badge.id}
                      className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground opacity-60"
                    >
                      <Trophy className="h-4 w-4" /> {badge.name}
                    </span>
                  ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyber-500/40 bg-cyber-500/10 font-mono text-sm font-bold text-cyber-500">
                        #1
                      </div>
                      <div>
                        <p className="font-medium">NovaSec</p>
                        <p className="text-xs text-muted-foreground">
                          Pays · Promotion Hiver 2026
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-cyber-500">
                      12 480 XP
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-night-800 font-mono text-sm font-bold">
                        #2
                      </div>
                      <div>
                        <p className="font-medium">H4ck_el</p>
                        <p className="text-xs text-muted-foreground">
                          Classement par pays
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-ink-dim">11 920 XP</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-night-800 font-mono text-sm font-bold">
                        #3
                      </div>
                      <div>
                        <p className="font-medium">root_ctf</p>
                        <p className="text-xs text-muted-foreground">
                          Événements CTF réguliers
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-ink-dim">11 410 XP</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden border-t border-border/60 py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,209,197,0.12),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-cyber-500" />
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Prêt à devenir pentester ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-dim">
              Faites le test de niveau et commencez au bon endroit dès
              aujourd'hui. Gratuit, sans carte bancaire.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-cta-700 px-8 text-base text-white hover:bg-cta-600"
            >
              <Link href="/auth/register">
                Commencer le test de niveau
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" /> Rejoignez 4 820 apprenants actifs
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="text-sm text-ink-dim">
            © 2026 CyberAcademy. Cybersécurité enseignée dans un cadre
            strictement légal et encadré.
          </div>
          <div className="flex items-center gap-6 text-sm text-ink-dim">
            <a href="#" className="hover:text-cyber-500">Communauté</a>
            <a href="#" className="hover:text-cyber-500">Mentors</a>
            <a href="#" className="hover:text-cyber-500">CGU</a>
            <a href="#" className="hover:text-cyber-500">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
