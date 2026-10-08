/**
 * TestimonialSlider.jsx — Guest Review Slider
 * One large editorial quote at a time, auto-advancing, with numbered controls.
 */
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TestimonialSlider({ reviews }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % reviews.length), [reviews.length]);
  const prev = () => setCurrent((p) => (p - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, current]);

  const review = reviews[current];

  return (
    <div className="relative mx-auto max-w-4xl text-center">
      <span className="block font-serif text-8xl leading-none text-gold/40 select-none" aria-hidden="true">“</span>

      <div className="min-h-[220px] sm:min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[2.4rem] font-light italic leading-snug text-ivory">
              {review.review}
            </blockquote>
            <figcaption className="mt-9">
              <span className="block text-[11px] font-medium uppercase tracking-[0.3em] text-ivory">{review.author}</span>
              <span className="mt-2 block text-xs text-stone">{review.source}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-8">
        <button onClick={prev} aria-label="Previous review" className="text-stone hover:text-gold transition-colors">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-3">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Show review ${idx + 1}`}
              className={`h-px transition-all duration-700 ${idx === current ? 'w-12 bg-gold' : 'w-6 bg-line-strong hover:bg-stone'}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next review" className="text-stone hover:text-gold transition-colors">
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
