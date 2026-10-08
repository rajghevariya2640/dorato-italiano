/**
 * Preloader.jsx — Brand Loading Animation for Dorato Italiano
 * Quiet monogram reveal with a hairline progress rule.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Read by pages that time their entrance animations around the preloader
export let preloaderDone = false;

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      preloaderDone = true;
      setLoading(false);
    }, 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-ivory"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/60"
          >
            <span className="font-serif text-4xl font-light italic text-gold">D</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.42em' }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-serif text-2xl font-light pl-[0.42em]"
          >
            DORATO
          </motion.p>

          <div className="mt-6 h-px w-40 overflow-hidden bg-line">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              className="h-full w-full origin-left bg-gold"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
