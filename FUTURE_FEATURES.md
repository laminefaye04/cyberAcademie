# FUTURE FEATURES — Backlog V2

Référence : MASTER IMPLEMENTATION SPECIFICATION V1, §37.
Les éléments ci-dessous sont explicitement **hors périmètre V1** et ne doivent
pas être implémentés avant la V2.

## Infrastructure Labs
- **Vraies machines isolées** (Docker/KasmVNC, environnement web-app réelles)
  — remplacement du simulateur terminal actuel.
- **Provisioning à la demande** par activité (`container_config`, `machine`,
  `tools`, `reset_strategy`) — colonnes déjà présentes dans `0002`.
- **Environnements de type CTF** internes (flag à capturer sur infra dédiée).
- **Infrastructure comme code** (Terraform/Ansible) et authentification
  lab ↔ plateforme CyberAcademy.
- **Rate-limiting / quotas** par utilisateur sur les infras isolées.

## Catalogue & Plateformes
- **Hack The Box Academy** en plus de TryHackMe / Root-Me / PortSwigger.
- **OverTheWire Bandit** et **PicoCTF** (catégories défi à la demande).
- **CMS d'administration** pour gérer labs/activités sans déploiement.
- **Soumission de labs par la communauté** (modération, revue XP).

## Analytics & Apprentissage
- **Analytique avancée** : courbes de progression, taux d'abandon par
  activité, temps moyen par lab, segmentation par niveau.
- **Recommandations IA** pilotées par les `learning_activity_events`
  (tables présentes en `0002`), au-delà de la heuristique V1.
- **Replay sessions** et revue guidée post-échec.

## Économie & Gamification
- **Passer au Premium / Abonnement** — réactivé uniquement quand l'offre
  payante est définie (V1 = gratuit).
- **Marketplace de skins/thèmes**, compteur de kills CTF, classements
  hebdomadaires.
- **Badges & séries (streaks) avancés**, succès cachés.

## Plateforme
- **Backend réel branché** (migration `0001`/`0002` appliquées) — V1 = mocks.
- **Webhooks** d'événements lab pour intégrations tierces.
- **Export PDF de progression / certificats vérifiables**.
