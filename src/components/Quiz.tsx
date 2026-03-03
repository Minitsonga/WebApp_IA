import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Choice = 1 | 2 | 3

const questions: { question: string; options: [string, string, string] }[] = [
  {
    question: 'Quel type d\'expérience recherchez-vous ?',
    options: ['Culturelle et artistique', 'Aventure et nature', 'Élégance et raffinement'],
  },
  {
    question: 'Votre période préférée ?',
    options: ['Histoire moderne XIXe-XXe', 'Temps anciens', 'Renaissance et classicisme'],
  },
  {
    question: 'Vous préférez :',
    options: ['L\'effervescence urbaine', 'La nature sauvage', 'L\'art et l\'architecture'],
  },
  {
    question: 'Votre activité idéale :',
    options: ['Visiter des monuments', 'Observer la faune', 'Explorer des musées'],
  },
]

const results = {
  paris: {
    title: 'Paris 1889 — Belle Époque',
    description: 'L\'effervescence de l\'Exposition Universelle et des boulevards parisiens vous attend.',
    price: 'À partir de 4 500 €',
    image: 'https://i.imgur.com/klIwyBD.jpeg',
  },
  cretace: {
    title: 'Crétacé — 65 millions av. J.-C.',
    description: 'Une aventure préhistorique unique parmi les dinosaures.',
    price: 'À partir de 8 900 €',
    image: 'https://i.imgur.com/LomiQvE.jpeg',
  },
  florence: {
    title: 'Florence 1504 — Renaissance',
    description: 'L\'art et l\'architecture de la Renaissance vous appellent.',
    price: 'À partir de 3 800 €',
    image: 'https://i.imgur.com/NKKXWQ6.jpeg',
  },
}

function getResult(choices: Choice[]): keyof typeof results {
  const counts = { 1: 0, 2: 0, 3: 0 }
  choices.forEach((c) => { counts[c]++ })
  if (counts[2] >= counts[1] && counts[2] >= counts[3]) return 'cretace'
  if (counts[3] >= counts[1] && counts[3] >= counts[2]) return 'florence'
  return 'paris'
}

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [choices, setChoices] = useState<Choice[]>([])

  const currentQuestion = questions[step]
  const isComplete = step === questions.length
  const resultKey = choices.length === 4 ? getResult(choices as Choice[]) : null

  const handleChoice = (choice: Choice) => {
    const next = [...choices, choice]
    setChoices(next)
    if (step + 1 < questions.length) setStep(step + 1)
    else setStep(questions.length)
  }

  const reset = () => {
    setStep(0)
    setChoices([])
  }

  return (
    <section className="py-16 sm:py-24 bg-dark-section">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl text-center text-white mb-10"
        >
          Quelle époque est faite pour vous ?
        </motion.h2>

        {/* Barre de progression */}
        <div className="h-1 bg-white/10 rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!isComplete && currentQuestion && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg text-white mb-6">{currentQuestion.question}</p>
              <ul className="space-y-3">
                {currentQuestion.options.map((option, i) => (
                  <li key={i}>
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-white/20 hover:border-gold/50 cursor-pointer transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/10">
                      <input
                        type="radio"
                        name={`q-${step}`}
                        value={i + 1}
                        checked={choices[step] === (i + 1)}
                        onChange={() => handleChoice((i + 1) as Choice)}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-white/90">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {isComplete && resultKey && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg overflow-hidden border border-gold/50 bg-dark-bg"
            >
              <div className="h-[200px] overflow-hidden">
                <img
                  src={results[resultKey].image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gold text-sm font-semibold mb-1">Votre destination idéale</p>
                <h3 className="font-serif text-xl text-white mb-2">{results[resultKey].title}</h3>
                <p className="text-white/80 text-sm mb-4">{results[resultKey].description}</p>
                <p className="text-gold font-semibold mb-6">{results[resultKey].price}</p>
                <div className="flex gap-3">
                  <a
                    href="#destinations"
                    className="flex-1 py-2.5 bg-gold text-dark-bg font-semibold rounded text-center hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-shadow"
                  >
                    Réserver
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="px-4 py-2.5 border border-gold/50 text-gold rounded hover:bg-gold/10 transition-colors"
                  >
                    Refaire
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
