import Link from "next/link";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#roadmap", label: "Roadmap" },
  { href: "#labs", label: "Labs" },
  { href: "#ia", label: "Mentor IA" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-night-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-dim transition-colors hover:text-cyber-500"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/auth/login">Se connecter</Link>
          </Button>
          <Button asChild size="sm" className="bg-cta-700 hover:bg-cta-600 text-white">
            <Link href="/auth/register">Commencer gratuitement</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
