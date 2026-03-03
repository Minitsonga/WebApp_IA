import { motion } from 'framer-motion'

const destinations = [
  {
    id: 'paris',
    image: 'https://i.imgur.com/klIwyBD.jpeg',
    title: 'Paris 1889 — Belle Époque',
    description:
      'Vivez l\'inauguration de la Tour Eiffel lors de l\'Exposition Universelle. Flânez sur les boulevards haussmanniens, découvrez les cabarets du Moulin Rouge naissant.',
    price: 'À partir de 4 500 €',
  },
  {
    id: 'cretace',
    image: 'https://i.imgur.com/LomiQvE.jpeg',
    title: 'Crétacé — 65 millions av. J.-C.',
    description:
      'Une aventure préhistorique unique. Observez les dinosaures dans leur habitat naturel, accompagné de nos guides experts en paléontologie temporelle.',
    price: 'À partir de 8 900 €',
  },
  {
    id: 'florence',
    image: 'https://i.imgur.com/NKKXWQ6.jpeg',
    title: 'Florence 1504 — Renaissance',
    description:
      'Côtoyez Léonard de Vinci et Michel-Ange dans leur période la plus créative. Assistez à la naissance des chefs-d\'œuvre de la Renaissance italienne.',
    price: 'À partir de 3 800 €',
  },
]

export default function Destinations() {
  return (
    <section id="destinations" className="py-16 sm:py-24 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl text-center text-white mb-12"
        >
          Nos Destinations Temporelles
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <motion.article
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg overflow-hidden bg-dark-section border border-white/10 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
            >
              <div className="h-[250px] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-gold mb-2">{dest.title}</h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-3">{dest.description}</p>
                <p className="text-gold font-semibold mb-4">{dest.price}</p>
                <button
                  type="button"
                  className="w-full py-2.5 bg-gold text-dark-bg font-semibold rounded hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-shadow"
                >
                  Réserver
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
