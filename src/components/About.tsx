export default function About() {
  const stats = [
    { value: '3 Époques disponibles', label: '' },
    { value: '1200+', label: 'Voyageurs satisfaits' },
    { value: '100%', label: 'Garanti ou remboursé' },
  ]

  return (
    <section id="about" className="py-16 sm:py-24 bg-dark-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-12">
          TimeTravel Agency réinvente le voyage. Grâce à nos technologies de pointe et nos partenariats
          exclusifs avec les gardiens du continuum, nous vous proposons des expériences temporelles
          uniques, sécurisées et inoubliables. De la Belle Époque aux terres des dinosaures, vivez
          l'histoire comme jamais auparavant.
        </p>
        <div className="border-t border-gold/50 pt-8 mb-10" aria-hidden />
        <ul className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
          {stats.map((stat) => (
            <li key={stat.value} className="text-center">
              <span className="block font-serif text-2xl sm:text-3xl font-semibold text-gold">
                {stat.value}
              </span>
              {stat.label && (
                <span className="text-sm text-white/70">{stat.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
