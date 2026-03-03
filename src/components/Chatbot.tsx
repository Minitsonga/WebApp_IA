import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type Message = { role: 'user' | 'assistant'; content: string }

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Erreur ${response.status}`)
      }

      setMessages((m) => [...m, { role: 'assistant', content: data.content || '' }])
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: `Erreur: ${e instanceof Error ? e.message : 'Impossible de joindre le serveur.'}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-dark-bg shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center transition-shadow"
        aria-label="Ouvrir le chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] flex flex-col rounded-lg border border-gold/30 bg-dark-section shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gold/30 bg-dark-bg">
            <span className="font-serif font-semibold text-gold">Assistant TimeTravel</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && !loading && (
              <p className="text-white/50 text-sm">Posez-moi vos questions sur les voyages temporels...</p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-gold text-dark-bg'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white/70 rounded-lg px-3 py-2 text-sm flex items-center gap-1">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Posez-moi vos questions sur les voyages temporels..."
              className="flex-1 px-3 py-2 bg-dark-bg border border-white/20 rounded text-white placeholder-white/50 focus:border-gold outline-none text-sm"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              className="px-4 py-2 bg-gold text-dark-bg font-semibold rounded hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] disabled:opacity-50 transition-all text-sm"
            >
              Envoyer
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
