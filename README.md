# CyberAcademy

> SaaS EdTech · Cybersécurité offensive · « Du zéro au professionnel »

Plateforme d'apprentissage de la cybersécurité offensive : roadmap guidée en
12 niveaux, labs pratiques en environnement isolé, gamification (XP, badges,
classements) et mentor IA personnalisé.

Specification : [`CyberAcademy_Cahier_des_charges.pdf`](CyberAcademy_Cahier_des_charges.pdf)

## Structure du monorepo (CDC §15.1)

```
cyberacademy/
├── apps/
│   ├── web/            (Next.js frontend — en cours de développement)
│   └── admin/          (back-office interne — à venir)
├── packages/
│   ├── ui/             (composants partagés shadcn/ui)
│   ├── database/       (schémas & migrations Supabase)
│   └── ai-core/        (orchestration IA, RAG, prompts)
├── supabase/
│   ├── migrations/
│   └── functions/      (Edge Functions)
├── docs/
└── README.md
```

## Stack (CDC §8)

| Couche      | Technologies                                             |
| ----------- | -------------------------------------------------------- |
| Frontend    | Next.js 15, React, TypeScript strict, Tailwind CSS, shadcn/ui, Framer Motion |
| Backend     | Supabase, PostgreSQL, Edge Functions                     |
| IA          | Qwen2.5 / Llama / DeepSeek, Ollama, RAG, pgvector        |
| Paiement    | Stripe, Wave, Orange Money                               |
| Déploiement | Vercel · Monitoring : Sentry, PostHog                    |

## Démarrage rapide

```bash
npm install
npm run dev          # démarre apps/web (http://localhost:3000)
```

Scripts disponibles :

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run lint` — ESLint (tous les workspaces)
- `npm run typecheck` — TypeScript strict (tous les workspaces)

## Convention de code (CDC §15.2)

- TypeScript strict activé sur l'ensemble du frontend
- Conventional Commits (`feat:`, `fix:`, `chore:`…)
- Linting (ESLint) et formatage (Prettier) appliqués en pré-commit
- Revue de code obligatoire avant fusion sur la branche principale

## État du frontend

Pages conformes au CDC §10.2 : Landing, Auth (login / inscription / mot de
passe oublié), Dashboard, Roadmap (12 niveaux 0-11) + détail de niveau, Cours
avec quiz, Labs (terminal + indices IA + flag), Chat Cyber Mentor IA, Profil,
Portfolio public, Marketplace.

> Document confidentiel — usage interne et investisseurs.
