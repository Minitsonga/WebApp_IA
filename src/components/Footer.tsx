import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      id="contact"
      className="border-t border-gold/50 py-8 bg-dark-bg"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-center text-white/70 text-sm">
        © 2025 TimeTravel Agency — Le voyage dans le temps, réinventé
      </p>
    </motion.footer>
  )
}
