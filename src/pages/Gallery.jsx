/**
 * Gallery.jsx — Gallery Page
 * Pinterest-style masonry grid of wellness images with lightbox-style hover.
 */
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Maximize2 } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

/* ---------- Data ---------- */
const images = [
  { id: 1, src: 'https://picsum.photos/seed/gal1/600/800', alt: 'Morning yoga session', category: 'Yoga' },
  { id: 2, src: 'https://picsum.photos/seed/gal2/600/600', alt: 'Peaceful meditation space', category: 'Meditation' },
  { id: 3, src: 'https://picsum.photos/seed/gal3/600/700', alt: 'Outdoor fitness training', category: 'Fitness' },
  { id: 4, src: 'https://picsum.photos/seed/gal4/600/500', alt: 'Healthy meal preparation', category: 'Nutrition' },
  { id: 5, src: 'https://picsum.photos/seed/gal5/600/900', alt: 'Nature retreat trail', category: 'Retreats' },
  { id: 6, src: 'https://picsum.photos/seed/gal6/600/650', alt: 'Group wellness workshop', category: 'Community' },
  { id: 7, src: 'https://picsum.photos/seed/gal7/600/750', alt: 'Recovery spa treatment', category: 'Recovery' },
  { id: 8, src: 'https://picsum.photos/seed/gal8/600/550', alt: 'Sunrise beach meditation', category: 'Meditation' },
  { id: 9, src: 'https://picsum.photos/seed/gal9/600/680', alt: 'Strength training session', category: 'Fitness' },
  { id: 10, src: 'https://picsum.photos/seed/gal10/600/600', alt: 'Plant-based cooking class', category: 'Nutrition' },
  { id: 11, src: 'https://picsum.photos/seed/gal11/600/850', alt: 'Forest therapy walk', category: 'Retreats' },
  { id: 12, src: 'https://picsum.photos/seed/gal12/600/500', alt: 'Community yoga event', category: 'Community' },
]

function ScrollSection({ children, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function Gallery() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className="relative pt-32 pb-16 section-padding">
        <div className="absolute inset-0 gradient-emerald opacity-5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-500 font-medium text-sm uppercase tracking-wider mb-4 block"
          >
            Gallery
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Moments of Wellness
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            A visual journey through our studios, retreats, and community —
            capturing the essence of the Verdant experience.
          </motion.p>
        </div>
      </section>

      {/* ---- Masonry Gallery ---- */}
      <ScrollSection className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="masonry-grid">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="masonry-item group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent flex flex-col justify-end p-6 transition-opacity"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-lg">{img.alt}</p>
                        <p className="text-emerald-300 text-sm">{img.category}</p>
                      </div>
                      <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>
    </>
  )
}
