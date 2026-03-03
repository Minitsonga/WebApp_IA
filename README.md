# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive, créée avec IA générative. Vitrine luxe (dark mode, accents dorés), responsive, avec animations et chatbot conversationnel.

## 🛠️ Stack technique

- **Frontend** : React 18, TypeScript, Vite 5
- **Styles** : Tailwind CSS (palette custom dark / gold), Google Fonts (Playfair Display, Inter)
- **Animations** : Framer Motion
- **Backend** : Node.js, Express (dev local) ; Vercel serverless en production
- **IA** : Groq API — Llama 3.1 8B pour le chatbot
- **Hébergement** : Vercel

## ✨ Features

- **Landing** : Hero pleine page (titre animé, particules CSS), section À propos (stats, divider doré), footer avec apparition au scroll
- **Navigation** : Header sticky avec flou au scroll, liens vers À propos, Destinations, Réserver
- **Galerie** : 3 destinations temporelles (Paris 1889, Crétacé -65M, Florence 1504) — cartes avec image, description, prix, bouton Réserver, hover et animations au scroll
- **Quiz** : 4 questions à 3 choix, logique de scoring, résultat personnalisé avec image, prix et lien vers Destinations (AnimatePresence, barre de progression)
- **Chatbot IA** : Fenêtre flottante, historique de conversation, réponses en français ; clé API Groq gérée côté serveur (variable d’environnement)

## 🤖 IA utilisées (transparence)

- **Code** : Cursor (assistant IA) pour la conception et le développement
- **Chatbot** : Groq — Llama 3.1 8B (`llama-3.1-8b-instant`) via API ; prompt système TimeTravel Agency (destinations et prix)
- **Visuels** : Microsoft Bing (mai-image-1) 

## 📋 Crédits

- **APIs / modèles** : [Groq](https://groq.com), [Meta Llama](https://llama.meta.com)
- **Assets** : [Google Fonts](https://fonts.google.com) (Playfair Display, Inter) ; images actuelles : Imgur (placeholders)
- **Outils** : React, Vite, Tailwind CSS, Framer Motion, Express, Vercel

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA

---

*TimeTravel Agency — Le voyage dans le temps, réinventé.*
