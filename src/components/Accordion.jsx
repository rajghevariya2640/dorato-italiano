/**
 * Accordion.jsx — FAQ Accordion Component
 * Hairline-ruled expandable rows for Frequently Asked Questions.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-line">
            <button
              onClick={() => toggle(index)}
              className="group flex w-full items-start gap-6 py-7 text-left"
              aria-expanded={isOpen}
            >
              <span className="pt-1.5 font-serif text-sm italic text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`flex-1 font-serif text-xl sm:text-2xl font-light transition-colors duration-500 ${isOpen ? 'text-gold' : 'text-ivory group-hover:text-gold'}`}>
                {item.question}
              </span>
              <span className="relative mt-3 h-3 w-3 shrink-0" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-3 bg-gold" />
                <span className={`absolute left-1/2 top-0 h-3 w-px bg-gold transition-transform duration-500 ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 pl-12 pr-8 text-base leading-relaxed text-stone">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
