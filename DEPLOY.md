# Déploiement TimeTravel Agency

## Recommandé : Vercel (gratuit, simple)

Le projet est prêt pour **Vercel** : frontend Vite + API serverless dans le même dépôt.

### Étapes

1. **Pousser le code sur GitHub** (si ce n’est pas déjà fait).

2. **Sur [vercel.com](https://vercel.com)**  
   - Connexion avec GitHub  
   - **Add New Project** → importer le dépôt  
   - Vercel détecte Vite ; laisser **Build Command** et **Output Directory** tels quels (ou `npm run build` / `dist`).

3. **Variable d’environnement**  
   - Onglet **Settings** → **Environment Variables**  
   - Ajouter : **`GROQ_API_KEY`** = ta clé Groq  
   - Redéployer après avoir enregistré.

4. **Déploiement**  
   - Chaque push sur la branche principale déclenche un déploiement.  
   - L’URL sera du type `https://timetravel-agency-xxx.vercel.app`.

### En local avec la même config

```bash
npm i -g vercel
vercel dev
```

Tu peux définir `GROQ_API_KEY` dans un fichier `.env` à la racine (ou dans `.env.local`) pour `vercel dev`.

---

## Autres options

| Plateforme     | Idée                                                                 | À noter |
|----------------|----------------------------------------------------------------------|--------|
| **Netlify**    | Build Vite + Netlify Function pour `/api/chat`                        | Similaire à Vercel, il faudrait ajouter `netlify/functions/chat.js` et `netlify.toml`. |
| **GitHub Pages** | Frontend uniquement (statique)                                    | Le chatbot ne fonctionnera pas sans déployer l’API ailleurs (ex. Render + CORS). |
| **Render**     | Un seul service Node : Express sert le build + `/api/chat`           | Adapter le serveur pour servir `dist/` et déployer ce Node sur Render. |
| **Railway**    | Comme Render : un service Node qui sert tout                          | Même idée que Render. |

Pour un déploiement rapide avec chatbot qui marche, **Vercel** est le plus direct avec la config actuelle.
