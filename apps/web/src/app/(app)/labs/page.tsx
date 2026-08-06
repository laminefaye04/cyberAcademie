"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FlaskConical,
  Server,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { LABS, type LabType } from "@/lib/labs";
import { cn } from "@/lib/utils";

const FILTERS: { value: LabType | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "linux", label: "Linux" },
  { value: "web", label: "Web" },
  { value: "network", label: "Réseau" },
  { value: "ctf", label: "CTF" },
];

export default function LabsPage() {
  const [filter, setFilter] = useState<LabType | "all">("all");
  const labs = useMemo(
    () =>
      filter === "all" ? LABS : LABS.filter((lab) => lab.type === filter),
    [filter]
  );
  const completed = LABS.filter((lab) => lab.completed).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Labs pratiques</h1>
          <p className="mt-2 text-sm text-ink-dim">
            Environnements isolés provisionnés à la demande. Validation
            automatique par flag, scoring sur réussite, temps et indices.
          </p>
        </div>
        <Badge className="w-fit bg-cyber-500/15 text-cyber-400">
          {completed}/{LABS.length} validés
        </Badge>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <Button
            key={item.value}
            variant="outline"
            size="sm"
            onClick={() => setFilter(item.value)}
            className={cn(
              "border-border bg-night-800",
              filter === item.value &&
                "border-cyber-500/60 bg-cyber-500/10 text-cyber-400"
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {labs.map((lab) => (
          <Link key={lab.id} href={`/labs/${lab.slug}`} className="group block">
            <Card className="h-full transition-colors hover:border-cyber-500/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-night-800 text-cyber-500 transition-transform group-hover:scale-105">
                    <Server className="h-5 w-5" />
                  </div>
                  {lab.completed && (
                    <CheckCircle2 className="h-5 w-5 text-cyber-500" />
                  )}
                </div>
                <h2 className="mt-3 font-semibold">{lab.title}</h2>
                <p className="mt-1 text-sm text-ink-dim">
                  Niveau {lab.levelId} · {lab.difficulty}
                </p>
                <ul className="mt-3 space-y-1">
                  {lab.objectives.map((objective, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-ink-dim"
                    >
                      <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyber-500" />
                      {objective}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {lab.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-cyber-500" /> {lab.xp} XP
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="outline" className="border-cyber-500/40 text-cyber-400">
                    {lab.type === "linux"
                      ? "Linux"
                      : lab.type === "web"
                        ? "Web"
                        : lab.type === "network"
                          ? "Réseau"
                          : "CTF"}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-sm text-cyber-500">
                    Démarrer <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
