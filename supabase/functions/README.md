# Supabase — Edge Functions

Les opérations sensibles transitent exclusivement par des Edge Functions :
- Orchestrateur IA (modules 1 à 5, RAG + Ollama) — §7.7
- Provisioning des labs (Docker) — §11
- Paiements (Stripe, Wave, Orange Money) — §8.2
- Webhooks

Aucune logique métier ni clé secrète côté client.
