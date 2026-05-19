# TimeTravel Agency

Landing page d'une agence de voyage temporel de luxe (Vite + React + TanStack Start + Tailwind).

## Installation

```bash
npm install
```

## Configuration du chatbot (Groq)

Le chatbot intégré utilise l'API Groq.

1. Récupérer une clé sur https://console.groq.com/keys
2. Créer un fichier `.env.local` à la racine (copier `.env.example`) :

   ```
   VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxx
   ```

3. Le fichier `.env.local` est ignoré par git (`*.local` dans `.gitignore`) — ne jamais le commiter.

## Lancer le projet

```bash
npm run dev
```

Le chatbot apparaît en bas à droite (bouton doré). Cliquer pour ouvrir.

## Modèle utilisé

- Endpoint : `https://api.groq.com/openai/v1/chat/completions`
- Modèle : `llama-3.3-70b-versatile`
- `max_tokens` : 500 — `temperature` : 0.7
- Historique limité aux 10 derniers messages pour économiser les tokens.
