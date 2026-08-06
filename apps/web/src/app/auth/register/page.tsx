"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, UserPlus } from "lucide-react";
import { GithubIcon, GoogleIcon } from "@/components/social-icons";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pseudo, setPseudo] = useState("");
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
      title="Créer un compte gratuit"
      subtitle="Faites le test de niveau et commencez au bon endroit."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pseudo">Pseudo</Label>
          <Input
            id="pseudo"
            required
            placeholder="cypher_rookie"
            value={pseudo}
            onChange={(event) => setPseudo(event.target.value)}
            className="bg-night-800"
          />
        </div>
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
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            placeholder="8 caractères minimum"
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
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          Créer mon compte
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
        Déjà inscrit ?{" "}
        <Link href="/auth/login" className="text-cyber-500 hover:underline">
          Se connecter
        </Link>
      </p>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-cyber-500" />
        Hachage des mots de passe · 2FA optionnelle · RLS activée
      </div>
    </AuthShell>
  );
}
