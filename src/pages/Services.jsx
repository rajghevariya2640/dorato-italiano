/**
 * Services.jsx — Services Page
 * Detailed listing of all wellness services with animated cards.
 */
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  Heart, Brain, Dumbbell, Salad, Flower2, Wind, Sun, Moon,
  ArrowRight, CheckCircle2,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

/* ---------- Data ---------- */
const services = [
  {
    icon: Brain,
    title: 'Mindfulness & Meditation',
    desc: 'Cultivate inner peace with guided meditation sessions, breathwork practices, and mindfulness training tailored to your experience level.',
    features: ['Guided group sessions', 'One-on-one coaching', 'Breathwork techniques', 'Stress reduction protocols'],
    image: 'https://picsum.photos/seed/service-mind/600/400',
  },
  {
    icon: Dumbbell,
    title: 'Personal Training',
    desc: 'Achieve your fitness goals with customized workout programs designed by certified trainers who understand your body and ambitions.',
    features: ['Custom workout plans', 'Progress tracking', 'Injury prevention', 'Strength & conditioning'],
    image: 'https://picsum.photos/seed/service-fitness/600/400',
  },
  {
    icon: Salad,
    title: 'Nutrition Coaching',
    desc: 'Transform your relationship with food through science-backed nutritional guidance and personalized meal planning.',
    features: ['Personalized meal plans', 'Macro tracking', 'Supplement guidance', 'Dietary assessments'],
    image: 'https://picsum.photos/seed/service-nutrition/600/400',
  },
  {
    icon: Flower2,
    title: 'Yoga & Flexibility',
    desc: 'Explore various yoga traditions from gentle restorative flows to challenging vinyasa sequences in our peaceful studio spaces.',
    features: ['Hatha & Vinyasa', 'Restorative yoga', 'Prenatal classes', 'Flexibility workshops'],
    image: 'https://picsum.photos/seed/service-yoga/600/400',
  },
  {
    icon: Wind,
    title: 'Recovery & Spa',
    desc: 'Accelerate your recovery with advanced therapeutic treatments including massage, cryotherapy, and infrared sauna sessions.',
    features: ['Deep tissue massage', 'Cryotherapy', 'Infrared sauna', 'Float therapy'],
    image: 'https://picsum.photos/seed/service-spa/600/400',
  },
  {
    icon: Heart,
    title: 'Wellness Retreats',
    desc: 'Immersive multi-day retreats in stunning natural settings designed for deep transformation and lasting renewal.',
    features: ['Weekend retreats', 'Week-long immersions', 'Corporate wellness', 'Nature immersion'],
    image: 'https://picsum.photos/seed/service-retreat/600/400',
  },
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

export default function Services() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className="relative pt-32 pb-16 section-padding">
        <div className="absolute inset-0 gradient-emerald opacity-5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-emerald-500 font-medium text-sm uppercase tracking-wider mb-4 block"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Comprehensive Wellness Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            From mindful meditation to high-performance training, we offer a complete
            spectrum of services designed to meet you exactly where you are.
          </motion.p>
        </div>
      </section>

      {/* ---- Services Grid ---- */}
      <ScrollSection className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
                style={{ direction: !isEven ? 'rtl' : 'ltr' }}
              >
                {/* Image */}
                <div className="rounded-3xl overflow-hidden" style={{ direction: 'ltr' }}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[350px] object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div style={{ direction: 'ltr' }}>
                  <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-6">
                    <Icon className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                  </h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                    {service.desc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((f) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 text-emerald-500 font-semibold hover:text-emerald-600 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </ScrollSection>

      {/* ---- CTA ---- */}
      <ScrollSection className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-emerald opacity-95" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-emerald-100/80 mb-10">
            Our wellness advisors will help you find the perfect combination of
            services tailored to your goals and lifestyle.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-emerald-900 font-semibold text-lg hover:bg-emerald-50 transition-all duration-300"
          >
            Schedule a Free Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollSection>
    </>
  )
}
