import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark-bg via-dark-section to-dark-bg">
      {/* Particules CSS */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="particle" aria-hidden />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
        >
          Voyagez à travers le Temps
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto"
        >
          L'agence de voyage la plus exclusive de l'univers
        </motion.p>
        <motion.a
          href="#destinations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-block px-8 py-4 bg-gold text-dark-bg font-semibold rounded hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow duration-300"
        >
          Découvrir nos destinations
        </motion.a>
      </div>
    </section>
  )
}
