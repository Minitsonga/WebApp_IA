import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4001

app.use(cors({ origin: true }))
app.use(express.json())

const SYSTEM_PROMPT =
  "Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. Tu connais: Paris 1889 (Belle Époque, 4500€), Crétacé -65M (dinosaures, 8900€), Florence 1504 (Renaissance, 3800€). Réponds en français, sois concis et enthousiaste."

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY non configurée. Créez un fichier .env à la racine avec ANTHROPIC_API_KEY=votre_clé',
    })
  }

  const { messages } = req.body
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages requis (tableau non vide)' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const message = data.error?.message || data.message || JSON.stringify(data)
      return res.status(response.status).json({ error: message })
    }

    const text = data.content?.find((c) => c.type === 'text')?.text ?? ''
    return res.json({ content: text })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur serveur'
    return res.status(500).json({ error: message })
  }
})

app.listen(PORT, () => {
  console.log(`Serveur API sur http://localhost:${PORT}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nErreur: le port ${PORT} est déjà utilisé.`)
    console.error('Fermez l\'autre instance du serveur (autre terminal) ou exécutez:')
    console.error('  npx kill-port 3001')
    console.error('')
    process.exit(1)
  }
  throw err
})
