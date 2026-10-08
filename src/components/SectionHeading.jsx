/**
 * SectionHeading.jsx — Reusable Section Title Component
 * Eyebrow label, light serif heading, subtitle and a gold ornament rule.
 */
import { motion } from 'framer-motion';

export function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
      <span className="h-px w-10 bg-gold/50" />
    </div>
  );
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}
    >
      {badge && <p className="eyebrow mb-5">{badge}</p>}

      <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory">
        {title}
      </h2>

      <Ornament className={`mt-7 ${centered ? 'justify-center' : 'justify-start'}`} />

      {subtitle && (
        <p className={`mt-7 text-base sm:text-lg text-stone leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
