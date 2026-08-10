"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (supabase && isSupabaseConfigured) {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const email = String(formData.get("email") ?? "");
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email);
      setLoading(false);
      if (resetError) {
        setError(resetError.message);
        return;
      }
      setSent(true);
      return;
    }

    // Mode démo
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  return (
    <AuthShell
      title="Récupération de mot de passe"
      subtitle="Recevez un lien de réinitialisation par e-mail."
    >
      {sent ? (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <MailCheck className="h-10 w-10 text-cyber-500" />
            <p className="text-sm text-ink-dim">
              Si un compte existe pour cette adresse, un lien de
              réinitialisation vient d'être envoyé.
            </p>
          </div>
          <Button asChild className="w-full bg-cta-700 text-white hover:bg-cta-600">
            <Link href="/auth/login">Retour à la connexion</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="vous@exemple.com"
              className="bg-night-800"
            />
          </div>

          {error && (
            <p className="rounded-md border border-danger/40 bg-danger/10 p-2.5 text-xs text-danger">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-cta-700 text-white hover:bg-cta-600"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Envoyer le lien
          </Button>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-cyber-500"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la connexion
          </Link>
        </form>
      )}
    </AuthShell>
  );
}
