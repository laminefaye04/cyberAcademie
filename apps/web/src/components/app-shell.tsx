"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitBranch,
  FlaskConical,
  MessageSquareText,
  Store,
  User,
  Trophy,
  LogOut,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DEMO_USER } from "@/lib/mock";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Roadmap", icon: GitBranch },
  { href: "/labs", label: "Labs", icon: FlaskConical },
  { href: "/chat", label: "Mentor IA", icon: MessageSquareText },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/profile", label: "Profil", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border/60 bg-night-900/60 lg:flex">
        <div className="flex h-16 items-center px-5">
          <Link href="/dashboard">
            <Brand />
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-cyber-500/10 text-cyber-500"
                    : "text-ink-dim hover:bg-secondary/50 hover:text-ink"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Separator className="my-4" />
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-dim transition-colors hover:bg-secondary/50 hover:text-ink"
          >
            <Trophy className="h-4 w-4" />
            Classement · n°{DEMO_USER.rank}
          </Link>
        </nav>
        <div className="border-t border-border/60 p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <Avatar className="h-8 w-8 border border-cyber-500/40">
              <AvatarImage src={DEMO_USER.avatarUrl ?? undefined} />
              <AvatarFallback className="bg-cta-700 text-xs">
                CR
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{DEMO_USER.pseudo}</p>
              <p className="truncate text-xs text-muted-foreground">
                Niveau {DEMO_USER.level}
              </p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Se déconnecter">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-night-950/80 px-4 backdrop-blur-md lg:hidden">
          <Link href="/dashboard">
            <Brand />
          </Link>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
