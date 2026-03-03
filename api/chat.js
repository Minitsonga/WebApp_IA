const SYSTEM_PROMPT =
  "Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. Tu connais: Paris 1889 (Belle Époque, 4500€), Crétacé -65M (dinosaures, 8900€), Florence 1504 (Renaissance, 3800€). Réponds en français, sois concis et enthousiaste."

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY non configurée. Définissez-la dans les variables d’environnement Vercel.',
    })
  }

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages requis (tableau non vide)' })
  }

  const conversationHistory = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ]

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: conversationHistory,
        max_tokens: 500,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const message = data.error?.message || data.message || JSON.stringify(data)
      return res.status(response.status).json({ error: message })
    }

    const text = data.choices?.[0]?.message?.content ?? ''
    return res.json({ content: text })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur serveur'
    return res.status(500).json({ error: message })
  }
}
