import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FlaskConical,
  FileText,
  Star,
  Target,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROADMAP_LEVELS } from "@/lib/roadmap";
import { getCourse } from "@/lib/courses";
import { LABS } from "@/lib/labs";

interface LevelPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ROADMAP_LEVELS.map((level) => ({ slug: level.slug }));
}

export async function generateMetadata({
  params,
}: LevelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const level = ROADMAP_LEVELS.find((l) => l.slug === slug);
  if (!level) return { title: "Niveau introuvable" };
  return {
    title: `Niveau ${level.id} — ${level.title}`,
    description: level.objectives,
  };
}

export default async function LevelDetailPage({ params }: LevelPageProps) {
  const { slug } = await params;
  const level = ROADMAP_LEVELS.find((l) => l.slug === slug);
  if (!level) notFound();

  const course = getCourse(level.id);
  const levelLabs = LABS.filter((lab) => lab.levelId === level.id);
  const completedLabs = levelLabs.filter((lab) => lab.completed).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Link
        href="/roadmap"
        className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-cyber-500"
      >
        <ArrowLeft className="h-4 w-4" /> Retour à la roadmap
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="border-cyber-500/40 text-cyber-400">
          Niveau {level.id}
        </Badge>
        <Badge className="bg-cta-700 text-white">En cours</Badge>
      </div>

      <h1 className="mt-3 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
        <level.icon className="h-7 w-7 text-cyber-500" />
        {level.title}
      </h1>
      <p className="mt-2 text-lg text-ink-dim">{level.subtitle}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {level.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Star className="h-4 w-4 text-cyber-500" /> {level.xp} XP à gagner
        </span>
        <span className="flex items-center gap-1.5">
          <Target className="h-4 w-4" /> {level.validation}
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-cyber-500" /> Objectifs
                pédagogiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ink-dim">{level.objectives}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {level.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-cyber-500/40 bg-cyber-500/5 text-cyber-400"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-cyber-500" /> Cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              {course ? (
                <div className="space-y-4">
                  <p className="text-sm text-ink-dim">{course.description}</p>
                  <div className="space-y-3">
                    {course.modules.map((module) => (
                      <div
                        key={module.id}
                        className="rounded-md border border-border bg-night-800/50 p-4"
                      >
                        <p className="font-medium">{module.title}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {module.lessons.map((lesson) => (
                            <span
                              key={lesson.id}
                              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-ink-dim"
                            >
                              {lesson.title} · {lesson.duration}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="bg-cta-700 text-white hover:bg-cta-600">
                    <Link href={`/courses/${course.id}`}>
                      Accéder au cours
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Le contenu de ce niveau est en cours de création par
                  l'équipe pédagogique.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Labs */}
          {levelLabs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FlaskConical className="h-4 w-4 text-cyber-500" /> Labs du
                  niveau
                  <span className="ml-auto text-sm font-medium text-cyber-500">
                    {completedLabs}/{levelLabs.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {levelLabs.map((lab) => (
                  <Link
                    key={lab.id}
                    href={`/labs/${lab.slug}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-night-800/50 p-4 transition-colors hover:border-cyber-500/50"
                  >
                    <div className="flex items-center gap-3">
                      {lab.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-cyber-500" />
                      ) : (
                        <FlaskConical className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{lab.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {lab.difficulty} · {lab.duration} · {lab.xp} XP
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-ink-dim" />
                  </Link>
                ))}
                <Button asChild variant="outline" className="w-full border-cyber-500/40 bg-transparent text-cyber-400 hover:bg-cyber-500/10">
                  <Link href="/labs">Tous les labs</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Project */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-cyber-500" /> Projet de
                synthèse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ink-dim">
                {level.format} — <span className="text-cyber-400">{level.validation}</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-3 p-5">
              <p className="text-sm font-medium">Critère de validation</p>
              <div className="flex items-start gap-2 text-sm text-ink-dim">
                <Target className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                {level.validation}
              </div>
              <p className="text-sm font-medium">Format</p>
              <div className="flex items-start gap-2 text-sm text-ink-dim">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                {level.format}
              </div>
            </CardContent>
          </Card>
          <Card className="border-cyber-500/40 bg-cyber-500/[0.05]">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-cyber-400">
                Conseil de l'IA Coach
              </p>
              <p className="mt-2 text-sm text-ink-dim">
                Terminez les cours et quizzes avant d'attaquer les labs. Vous
                êtes à 45% de ce niveau — la validation du prochain lab vous
                fera gagner 300 XP.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
