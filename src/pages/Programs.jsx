/**
 * Programs.jsx — Programs / Classes Page
 * Pinterest-style masonry grid of wellness programs with filters.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Users, Zap, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

/* ---------- Data ---------- */
const categories = ['All', 'Yoga', 'Fitness', 'Meditation', 'Nutrition', 'Recovery']

const programs = [
  { id: 1, title: 'Morning Vinyasa Flow', category: 'Yoga', duration: '60 min', level: 'All Levels', capacity: 20, image: 'https://picsum.photos/seed/prog1/600/800', desc: 'Start your day with an energizing vinyasa sequence that builds heat, strength, and mental clarity.', rating: 4.9, popular: true },
  { id: 2, title: 'HIIT Burn Challenge', category: 'Fitness', duration: '45 min', level: 'Intermediate', capacity: 15, image: 'https://picsum.photos/seed/prog2/600/600', desc: 'High-intensity interval training designed to maximize calorie burn and boost cardiovascular fitness.', rating: 4.8 },
  { id: 3, title: 'Guided Meditation Circle', category: 'Meditation', duration: '30 min', level: 'Beginner', capacity: 25, image: 'https://picsum.photos/seed/prog3/600/700', desc: 'A peaceful guided session to calm the mind, reduce anxiety, and cultivate present-moment awareness.', rating: 5.0, popular: true },
  { id: 4, title: 'Plant-Based Cooking Workshop', category: 'Nutrition', duration: '90 min', level: 'All Levels', capacity: 12, image: 'https://picsum.photos/seed/prog4/600/500', desc: 'Learn to prepare delicious, nutrient-dense plant-based meals with our expert chef.', rating: 4.7 },
  { id: 5, title: 'Restorative Yin Yoga', category: 'Yoga', duration: '75 min', level: 'All Levels', capacity: 18, image: 'https://picsum.photos/seed/prog5/600/900', desc: 'Slow-paced yoga with deep stretches held for extended periods to release tension and improve flexibility.', rating: 4.9 },
  { id: 6, title: 'Strength Fundamentals', category: 'Fitness', duration: '50 min', level: 'Beginner', capacity: 10, image: 'https://picsum.photos/seed/prog6/600/650', desc: 'Master proper lifting form and build a strong foundation for your fitness journey.', rating: 4.6 },
  { id: 7, title: 'Sound Bath Healing', category: 'Meditation', duration: '60 min', level: 'All Levels', capacity: 30, image: 'https://picsum.photos/seed/prog7/600/750', desc: 'Immerse yourself in the healing vibrations of crystal singing bowls and gongs for deep relaxation.', rating: 4.8 },
  { id: 8, title: 'Recovery & Mobility Lab', category: 'Recovery', duration: '45 min', level: 'All Levels', capacity: 12, image: 'https://picsum.photos/seed/prog8/600/550', desc: 'Active recovery session combining foam rolling, stretching, and mobility drills for faster recovery.', rating: 4.7 },
  { id: 9, title: 'Macro Nutrition Masterclass', category: 'Nutrition', duration: '60 min', level: 'Intermediate', capacity: 20, image: 'https://picsum.photos/seed/prog9/600/680', desc: 'Deep dive into macronutrient balance, meal timing, and fueling strategies for optimal performance.', rating: 4.5 },
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

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? programs
    : programs.filter((p) => p.category === activeCategory)

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
            Programs & Classes
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Find Your Perfect Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Choose from over 200 programs across yoga, fitness, meditation,
            nutrition, and recovery — designed for every skill level.
          </motion.p>
        </div>
      </section>

      {/* ---- Filter Tabs + Masonry Grid ---- */}
      <ScrollSection className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'glass hover:bg-emerald-500/10'
                }`}
                style={{
                  color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((program) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="masonry-item"
                >
                  <div className="glass-card overflow-hidden group">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{ height: `${250 + ((program.id * 37) % 150)}px` }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Popular Badge */}
                      {program.popular && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Popular
                        </div>
                      )}

                      {/* Category Tag */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-emerald-900 text-xs font-medium">
                        {program.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {program.rating}
                        </span>
                      </div>

                      <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                        {program.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                        {program.desc}
                      </p>

                      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {program.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> {program.capacity} max
                        </span>
                      </div>

                      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-glass)' }}>
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: 'var(--bg-glass)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {program.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </ScrollSection>

      {/* ---- CTA ---- */}
      <ScrollSection className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-emerald opacity-95" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-emerald-100/80 mb-10">
            Your first class is on us. Experience the Verdant difference with a
            complimentary trial session.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-emerald-900 font-semibold text-lg hover:bg-emerald-50 transition-all duration-300"
          >
            Claim Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollSection>
    </>
  )
}
