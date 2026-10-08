/**
 * PageHeader.jsx — Cinematic banner for inner pages
 * Full-bleed photograph under a dark gradient with eyebrow, title and subtitle.
 */
import { motion } from 'framer-motion';
import { Ornament } from './SectionHeading';

export default function PageHeader({ eyebrow, title, subtitle, image, compact = false }) {
  return (
    <section
      className={`relative flex items-end overflow-hidden ${
        compact ? 'min-h-[46vh] sm:min-h-[52vh]' : 'min-h-[62vh] sm:min-h-[70vh]'
      }`}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pb-14 sm:pb-20 pt-36 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="eyebrow mb-5"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="display text-5xl sm:text-6xl lg:text-7xl text-ivory"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Ornament className="mt-7 justify-center" />
          {subtitle && (
            <p className="mt-6 text-base sm:text-lg text-stone max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
