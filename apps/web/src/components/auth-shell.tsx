import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { Brand } from "@/components/brand";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night-950 px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,209,197,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,61,145,0.25),transparent_50%)]"
      />
      <MatrixRain className="opacity-40" />
        <div className="relative w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link href="/">
            <Brand />
          </Link>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/80 p-8 backdrop-blur">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-cyber-500"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-ink-dim">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
