"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  GitBranch,
  FlaskConical,
  MessageSquareText,
  User,
  LogOut,
  Menu,
  X,
  Flame,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getRankTitle } from "@/lib/progress";
import { DEMO_USER } from "@/lib/mock";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Roadmap", icon: GitBranch },
  { href: "/labs", label: "Labs", icon: FlaskConical },
  { href: "/mentor", label: "Mentor IA", icon: MessageSquareText },
  { href: "/profile", label: "Profil", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const rankTitle = getRankTitle(DEMO_USER.level);
  const levelXpPct = Math.min(
    100,
    Math.round((DEMO_USER.levelXp / DEMO_USER.levelXpMax) * 100)
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const navContent = (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-cyber-500/10 text-cyber-500"
                : "text-ink-dim hover:bg-secondary/50 hover:text-ink"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const userBlock = (
    <div className="space-y-2 rounded-md px-2 py-2">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border border-cyber-500/40">
          <AvatarImage src={DEMO_USER.avatarUrl ?? undefined} />
          <AvatarFallback className="bg-cta-700 text-xs">CR</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{DEMO_USER.pseudo}</p>
          <p className="truncate text-xs text-muted-foreground">
            Niveau {DEMO_USER.level} · {rankTitle}
          </p>
        </div>
        <Button variant="ghost" size="icon" aria-label="Se déconnecter">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-[11px]">
          <span className="text-ink-dim">XP du niveau</span>
          <span className="font-mono text-cyber-400">
            {DEMO_USER.levelXp.toLocaleString("fr-FR")} /{" "}
            {DEMO_USER.levelXpMax.toLocaleString("fr-FR")} XP
          </span>
        </div>
        <Progress value={levelXpPct} className="h-1.5 bg-night-800" />
      </div>

      <p className="flex items-center gap-1.5 text-[11px] text-warning">
        <Flame className="h-3.5 w-3.5" />
        Série actuelle · {DEMO_USER.streak} jours
        <span className="text-muted-foreground">· Continue comme ça !</span>
      </p>

      <Button
        asChild
        variant="outline"
        size="sm"
        className="w-full border-border bg-transparent text-ink-dim hover:bg-secondary/50 hover:text-ink"
      >
        <Link href="/profile" onClick={() => setMobileOpen(false)}>
          Voir mon profil
        </Link>
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border/60 bg-night-900/60 lg:flex">
        <div className="flex h-16 items-center px-5">
          <Link href="/dashboard">
            <Brand />
          </Link>
        </div>
        {navContent}
        <div className="border-t border-border/60 p-3">{userBlock}</div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-night-950/70 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border/60 bg-night-900/95 transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <Brand />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {navContent}
          <div className="border-t border-border/60 p-3">{userBlock}</div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-night-950/80 px-4 backdrop-blur-md lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/dashboard">
            <Brand />
          </Link>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
