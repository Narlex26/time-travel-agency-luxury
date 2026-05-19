# TimeTravel Agency — Webapp Interactive

> **Auteurs** : Alexandre Boyer & Job Hermann MOUNCHILI TESSO
> **Cadre** : Projet Supervisé IA M2 — Session 2 (Webapp & IA Agents) — travail en groupe

Webapp interactive pour une agence fictive de voyage temporel de luxe. Trois destinations — **Paris 1889**, **le Crétacé**, **Florence 1504** — présentées dans une interface immersive sombre/dorée, avec un **chatbot IA Groq** et un **quiz de recommandation personnalisée** alimenté par IA.

---

## 🛠 Stack technique

- **React 19** + **TypeScript**
- **TanStack Start** — file-based routing, SSR-ready, build Cloudflare
- **Vite 7** — dev server + build
- **Tailwind CSS 4** — design tokens OKLCH (palette navy/gold)
- **Framer Motion 12** — animations scroll, parallax, micro-interactions
- **Lucide React** — icônes
- **shadcn/ui** (Radix) — composants disponibles
- **Groq API** — modèle `llama-3.3-70b-versatile` (chatbot + quiz)

---

## ✨ Features implémentées

### Landing page
- Hero avec parallax au scroll et ciel étoilé animé (90 étoiles, dont quelques dorées)
- Présentation de l'agence (3 piliers : sécurité quantique, guides historiens, immersion)
- Galerie des 3 destinations en cards animées (hover scale + zoom de l'image, lazy loading)
- Section témoignages clients
- Footer avec formulaire newsletter et réseaux sociaux

### Agent conversationnel (Phase 3.1)
- Bouton flottant doré en bas à droite, panneau 400×600 desktop / fullscreen mobile (< 768 px)
- Chatbot branché sur l'**API Groq** (`llama-3.3-70b-versatile`)
- System prompt strict : refus des hors-sujets (code, calculs, recettes, etc.), vouvoiement, verrou terminologique **Crétacé ≠ Crète**
- Historique limité aux **10 derniers messages** envoyés à l'API pour économiser les tokens
- 3 dots dorés animés pendant l'attente, gestion d'erreur graceful

### Quiz de recommandation IA (Phase 3.2 — automatisation/personnalisation)
- Quiz de **4 questions** sur les préférences (type d'expérience, période, ambiance, activité)
- Algorithme de scoring qui désigne la destination dominante
- **Recommandation personnalisée générée par IA** : Groq rédige une explication contextualisée en 2-3 phrases citant les réponses du visiteur
- Fallback texte statique si l'API échoue
- Possibilité de refaire le quiz à la fin

### UI / UX
- Thème sombre **navy** (oklch) + accents **gold**
- Typographie **Playfair Display** (titres) + **Inter** (corps)
- Animations Framer Motion : fade-up au scroll, parallax hero, hover sur cards, transitions entre étapes du quiz
- Responsive mobile-first ; chatbot fullscreen sous 768 px

---

## 🤖 Outils & modèles IA utilisés (transparence)

| Usage | Outil / Modèle |
|---|---|
| Génération initiale du site (landing, design system) | **Lovable.dev** |
| Implémentation chatbot + quiz + raffinements UI | **Claude Code** (Claude Opus 4.7, IDE) |
| Inférence chatbot + recommandations quiz | **Groq** — `llama-3.3-70b-versatile` |
| Visuels (3 images de destinations) | Générés en Session 1 du projet |

---

## 📁 Structure du projet

```
src/
├── assets/                  # 3 images des destinations (Session 1)
├── components/
│   ├── Chatbot.tsx         # Widget chatbot Groq
│   ├── Quiz.tsx            # Quiz personnalisation IA
│   └── ui/                 # Composants shadcn/ui
├── hooks/
│   └── use-mobile.tsx      # Détection breakpoint mobile
├── lib/                    # Utils + error capture
├── routes/
│   ├── __root.tsx
│   └── index.tsx           # Header / Hero / About / Destinations / Quiz / Témoignages / Footer
└── styles.css              # Design tokens Tailwind v4
```

---

## 🚀 Installation & lancement

### Prérequis
- Node.js 20+
- Une clé API Groq (gratuite) sur https://console.groq.com/keys

### Setup
```bash
# 1. Installer les dépendances
npm install

# 2. Créer un fichier .env.local à la racine (cf. .env.example)
echo "VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxx" > .env.local

# 3. Lancer le serveur de dev
npm run dev
```

L'app tourne sur http://localhost:8080.

### Build production
```bash
npm run build       # produit le bundle dans .output/
npm run preview     # preview du build
```

---

## 🧠 Réflexion sur le processus

**Approche** : génération-then-refinement plutôt que tout-en-un.

1. **Phase 1 (Lovable)** — génération de la landing page complète (structure, styles, animations Framer Motion) en quelques prompts. Gain de temps massif sur la base UI : palette, typographie, hero, cards de destinations, témoignages, footer.
2. **Phase 2 (Claude Code dans l'IDE)** — itérations précises pour le **chatbot** (état, appel API, anti-hallucination), le **quiz** (logique de scoring, animation step-by-step, recommandation IA), et la documentation.

**Apprentissages clés** :

- **Context is king** : le premier system prompt du chatbot, trop générique, conduisait à des dérives — le modèle inventait des prix, confondait "Crétacé" et "Crète" (île grecque), et acceptait de répondre à des hors-sujets (script Python de calculatrice). La résolution n'est PAS dans le code, mais dans le system prompt : règles absolues numérotées, exemples explicites de refus, verrou terminologique. Trois itérations pour stabiliser.
- **Vibe coding = bon brouillon, pas livraison** : Lovable génère vite mais empile parfois des features hors brief. Le refactoring manuel (imports morts, simplification d'animations, alignement avec les tokens design) reste indispensable.
- **Économie de tokens** : limiter l'historique chatbot aux 10 derniers messages réduit le coût et évite le drift du contexte.
- **Algorithme + IA pour le quiz** : combiner un scoring déterministe (qui garantit la cohérence du résultat) avec une explication générée par IA (qui personnalise le ton) donne le meilleur des deux mondes — fiabilité ET personnalisation.

---

## 📚 Crédits

- **Groq** — inférence ultra-rapide (https://groq.com)
- **Meta Llama 3.3 70B Versatile** — modèle de langage
- **Lovable.dev** — génération initiale du site
- **Anthropic Claude** (Opus 4.7) — assistance IDE pour le chatbot, le quiz et la doc
- **TanStack Start**, **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, **shadcn/ui**, **Radix UI**, **Lucide**
- **Google Fonts** — Playfair Display & Inter

---

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA. Code libre de réutilisation à des fins pédagogiques.
