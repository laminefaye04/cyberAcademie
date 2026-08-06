"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, Lock } from "lucide-react";
import { GithubIcon, GoogleIcon } from "@/components/social-icons";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  }

  return (
    <AuthShell
      title="Connexion"
      subtitle="Retrouvez votre progression et vos labs."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="bg-night-800"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-cyber-500 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="bg-night-800"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-cta-700 text-white hover:bg-cta-600"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lock className="mr-2 h-4 w-4" />
          )}
          Se connecter
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">ou continuer avec</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="bg-night-800">
          <GoogleIcon className="mr-2 h-4 w-4" /> Google
        </Button>
        <Button variant="outline" className="bg-night-800">
          <GithubIcon className="mr-2 h-4 w-4" /> GitHub
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-ink-dim">
        Pas encore de compte ?{" "}
        <Link href="/auth/register" className="text-cyber-500 hover:underline">
          Créer un compte gratuit
        </Link>
      </p>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <KeyRound className="h-3.5 w-3.5" />
        2FA optionnelle disponible dans les paramètres du profil
      </div>
    </AuthShell>
  );
}
