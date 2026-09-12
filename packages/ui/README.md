# @cyberacademy/ui — Design System CyberAcademy

Système sémantique unique pour l'ensemble du monorepo. Les pages consomment
uniquement ces tokens/variants — aucune classe de couleur "en dur" (hex ou
`color-*` arbitraire) hors de `globals.css`.

## Tokens sémantiques (globals.css — source unique)

Chaque palier est déclaré comme CSS variable dans `--color-night|cyber|success|warning|danger|gold|info|...`
puis re-typé en utilitaires Tailwind v4 (`--color-success`, `bg-success`, `text-success`, `border-success`…).

| Rôle | Token | Usage type |
|------|-------|-----------|
| Succès / Validé / Disponible | `success` | badge « Disponible » labs vert, statut « Validé » |
| Attention / À renforcer / In-progress | `warning` | coach (priorité orange), roadmap statut |
| Danger / Verrouillé | `danger` | map « Avancé », statuts bloqués |
| Action terminée / XP / reco | `success`+`cyber` + `gold` | barres XP, recommandations IA |
| Fond nuit (terminal) | `night-*` | cards default, fonds |
| Accent cyber | `cyber-*` | liens, glow priorité |

Combinaisons AA sur fond `night-950` : toujours `text-{token}` sur `bg-{token}/10`
ou `border-{token}/30`. Les foregrounds explicites (`text-success-foreground`) existent
pour les fonds pleins.

## Composants

### `DifficultyBadge` (`difficulty-badge.tsx`)
Badge de difficulté **unique coloré** (remplace la notation en étoiles) :
- Props : `difficulty: "facile" | "intermédiaire" | "avancé"` **ou** `stars: number`
  (3-5 allumé). Normalise les libellés (`normalizeDifficulty`).
- Mapping : `facile → success` (vert), `intermédiaire → warning` (ambre),
  `avancé → danger` (rouge). Mono + uppercase, AA.
- Utilisé par : **roadmap** (étoiles du niveau → badge), **labs** (chaque activité),
  **ctf** (tableaux de challenges).
- Import : `import { DifficultyBadge } from "@cyberacademy/ui/difficulty-badge"`.

### `Card` (`card.tsx`) — variants
`cardVariants` (cva) : `default` | `priority` | `success` | `locked`
- `priority` : bordure orange (`border-warning`) + liseré gauche `border-l-warning`
  + élévation hover → carte Coach / priorités.
- `success` / `locked` : fonds sémantiques.
- `hover` : `-translate-y-1` + ombre cyber au survol (activé par `hover` prop).
- `CardAction` : action en coin (colonne auto). Utilisé pour la coach card.

### `MatrixRain` / `matrix-rain`
Pluie de code terminal (katakana + glyphes) en canvas animé, décor `aria-hidden`.
Canal « identité hacker » : utilisé en fond du login (`auth-shell`).

## Nouveaux composants = tokens existants
Principe : étendre un token sémantique existant, jamais définir de hex en dur.
Ex : coach = `priority` warning ; « Disponible » labs = `success` ; RFID =
`danger`. Documentation d'un nouveau token : ajouter la CSS var dans `globals.css`
PUIS documenter ici.
