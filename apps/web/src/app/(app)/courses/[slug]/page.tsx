"use client";

import Link from "next/link";
import { use } from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Circle,
  PlayCircle,
  TerminalSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { COURSES, type LessonBlock } from "@/lib/courses";
import { getLevel } from "@/lib/roadmap";
import { cn } from "@/lib/utils";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  const { slug } = use(params);
  const course = useMemo(
    () => COURSES.find((course) => course.id === slug),
    [slug]
  );
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Cours introuvable</h1>
        <Button asChild className="mt-6 bg-cta-700 text-white hover:bg-cta-600">
          <Link href="/roadmap">Retour à la roadmap</Link>
        </Button>
      </div>
    );
  }

  const modules = course.modules;
  const allLessons = modules.flatMap((module) => module.lessons);
  const lessonIndex =
    modules
      .slice(0, currentModule)
      .reduce((acc, module) => acc + module.lessons.length, 0) + currentLesson;
  const lesson = modules[currentModule].lessons[currentLesson];
  const isLastLesson = lessonIndex === allLessons.length - 1;
  const isQuiz = lesson.type === "quiz";
  const quiz = lesson.quiz ?? [];
  const completedPct = Math.round(
    ((lessonIndex + 1) / allLessons.length) * 100
  );

  const score = Object.keys(quizAnswers).filter(
    (key) => quizAnswers[Number(key)] === quiz[Number(key)]?.answer
  ).length;
  const passed = quizSubmitted && score / quiz.length >= 0.8;

  function resetQuiz() {
    setQuizAnswers({});
    setQuizSubmitted(false);
  }

  function goTo(moduleIndex: number, lessonIdx: number) {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIdx);
    resetQuiz();
  }

  function next() {
    if (lessonIndex < allLessons.length - 1) {
      if (currentLesson + 1 < modules[currentModule].lessons.length) {
        goTo(currentModule, currentLesson + 1);
      } else {
        goTo(currentModule + 1, 0);
      }
    }
  }

  function prev() {
    if (lessonIndex > 0) {
      if (currentLesson > 0) {
        goTo(currentModule, currentLesson - 1);
      } else {
        goTo(currentModule - 1, modules[currentModule - 1].lessons.length - 1);
      }
    }
  }

  function renderBlock(block: LessonBlock, index: number) {
    switch (block.type) {
      case "heading":
        return (
          <h3 key={index} className="pt-2 text-base font-semibold text-ink">
            {block.text}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="text-sm leading-relaxed text-ink-dim">
            {block.text}
          </p>
        );
      case "list":
        return (
          <ul
            key={index}
            className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-dim"
          >
            {block.items?.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      case "code":
        return (
          <pre
            key={index}
            className="overflow-x-auto rounded-md border border-border bg-night-900 p-4 font-mono text-sm leading-relaxed text-cyber-400"
          >
            {block.code}
          </pre>
        );
      case "callout":
        return (
          <div
            key={index}
            className={cn(
              "rounded-md border p-4 text-sm leading-relaxed",
              block.variant === "warning" &&
                "border-warning/50 bg-warning/10 text-warning",
              block.variant === "danger" &&
                "border-danger/50 bg-danger/10 text-danger",
              block.variant === "tip" &&
                "border-cyber-500/40 bg-cyber-500/10 text-cyber-400",
              (!block.variant || block.variant === "info") &&
                "border-cyber-500/40 bg-cyber-500/5 text-cyber-400"
            )}
          >
            {block.text}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <Link
        href={`/roadmap/${getLevel(course.levelId).slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-cyber-500"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au niveau
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
          <p className="mt-1 text-sm text-ink-dim">{course.description}</p>
        </div>
        <Badge className="bg-cyber-500/15 text-cyber-400">
          {course.xp} XP
        </Badge>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Progress value={completedPct} className="h-1.5 bg-night-800" />
        <span className="shrink-0 text-xs text-muted-foreground">
          {completedPct}%
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        {/* Module sidebar */}
        <aside className="lg:col-span-1">
          <div className="space-y-4">
            {modules.map((module, moduleIndex) => (
              <div key={module.id}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {module.title}
                </p>
                <div className="space-y-1">
                  {module.lessons.map((item, lessonIdx) => {
                    const idx =
                      modules
                        .slice(0, moduleIndex)
                        .reduce((acc, m) => acc + m.lessons.length, 0) +
                      lessonIdx;
                    const active =
                      moduleIndex === currentModule &&
                      lessonIdx === currentLesson;
                    return (
                      <button
                        key={item.id}
                        onClick={() => goTo(moduleIndex, lessonIdx)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                          active
                            ? "bg-cyber-500/10 text-cyber-500"
                            : "text-ink-dim hover:bg-secondary/50 hover:text-ink"
                        )}
                      >
                        {idx < lessonIndex ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyber-500" />
                        ) : item.type === "video" ? (
                          <PlayCircle className="h-4 w-4 shrink-0" />
                        ) : item.type === "quiz" ? (
                          <CheckSquare className="h-4 w-4 shrink-0" />
                        ) : item.type === "exercise" ? (
                          <TerminalSquare className="h-4 w-4 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0" />
                        )}
                        <span className="line-clamp-1">{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Lesson content */}
        <div className="lg:col-span-3">
          <motion.div
            key={`${currentModule}-${currentLesson}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-cyber-500/40 text-cyber-400"
                  >
                    {lesson.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {lesson.duration}
                  </span>
                </div>
                <CardTitle className="mt-2 text-xl">
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {lesson.type === "video" && (
                  <div className="mb-4 flex h-44 items-center justify-center rounded-md border border-border bg-night-900">
                    <PlayCircle className="h-12 w-12 text-cyber-500" />
                  </div>
                )}
                {lesson.type === "exercise" && (
                  <div className="mb-4 rounded-md border border-border bg-night-900 p-4 font-mono text-sm text-cyber-400">
                    <p className="text-ink-dim">$</p>
                    <p>port_quiz --level networking</p>
                    <p className="mt-2 text-ink">
                      Lancez l'exercice dans le terminal du lab associé.
                    </p>
                  </div>
                )}
                <div className="space-y-4">
                  {lesson.blocks.map((block, index) => renderBlock(block, index))}
                </div>

                {isQuiz && quiz.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {quiz.map((question, questionIndex) => {
                      const selected = quizAnswers[questionIndex];
                      const showState =
                        quizSubmitted && selected !== undefined;
                      return (
                        <div
                          key={questionIndex}
                          className="rounded-md border border-border bg-night-800/50 p-4"
                        >
                          <p className="font-medium">
                            {questionIndex + 1}. {question.question}
                          </p>
                          <div className="mt-3 space-y-2">
                            {question.options.map((option, optionIndex) => {
                              const isCorrect =
                                quizSubmitted &&
                                optionIndex === question.answer;
                              const isWrong =
                                quizSubmitted &&
                                selected === optionIndex &&
                                optionIndex !== question.answer;
                              return (
                                <button
                                  key={optionIndex}
                                  onClick={() =>
                                    setQuizAnswers({
                                      ...quizAnswers,
                                      [questionIndex]: optionIndex,
                                    })
                                  }
                                  disabled={quizSubmitted}
                                  className={cn(
                                    "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                                    isCorrect
                                      ? "border-cyber-500 bg-cyber-500/10 text-cyber-400"
                                      : isWrong
                                        ? "border-danger bg-danger/10 text-danger"
                                        : selected === optionIndex
                                          ? "border-cyber-500/60 bg-cyber-500/5"
                                          : "border-border hover:border-cyber-500/40"
                                  )}
                                >
                                  {showState && isCorrect ? (
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyber-500" />
                                  ) : showState && isWrong ? (
                                    <Circle className="h-4 w-4 shrink-0 text-danger" />
                                  ) : (
                                    <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                                  )}
                                  {option}
                                </button>
                              );
                            })}
                          </div>
                          {quizSubmitted && (
                            <p className="mt-2 text-xs text-ink-dim">
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {!quizSubmitted ? (
                      <Button
                        onClick={() => setQuizSubmitted(true)}
                        disabled={Object.keys(quizAnswers).length < quiz.length}
                        className="bg-cta-700 text-white hover:bg-cta-600"
                      >
                        Valider le quiz
                      </Button>
                    ) : (
                      <div
                        className={cn(
                          "flex items-center gap-3 rounded-md border p-4",
                          passed
                            ? "border-cyber-500/50 bg-cyber-500/10"
                            : "border-warning/50 bg-warning/10"
                        )}
                      >
                        <p className="text-sm">
                          Score : <span className="font-bold">{score}</span>/
                          {quiz.length} —{" "}
                          {passed
                            ? "Quiz validé ! +150 XP"
                            : "Seuil non atteint (≥ 80%). Recommencez."}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prev}
                    disabled={lessonIndex === 0}
                    className="text-ink-dim"
                  >
                    <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
                    Précédent
                  </Button>
                  {!isLastLesson ? (
                    <Button
                      size="sm"
                      onClick={next}
                      className="bg-cta-700 text-white hover:bg-cta-600"
                    >
                      Leçon suivante
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      className="bg-cyber-500 text-primary-foreground hover:bg-cyber-400"
                    >
                      <Link href="/labs">
                        Passer aux labs <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
