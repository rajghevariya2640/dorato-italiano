/**
 * Blog.jsx — Blog Page
 * Masonry-style grid of wellness blog articles with hover effects.
 */
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

/* ---------- Data ---------- */
const posts = [
  {
    id: 1,
    title: '10 Morning Rituals That Will Transform Your Day',
    excerpt: 'Discover evidence-based morning habits that successful wellness practitioners swear by — from cold exposure to gratitude journaling.',
    image: 'https://picsum.photos/seed/blog1/800/600',
    category: 'Lifestyle',
    author: 'Dr. Maya Green',
    date: 'Sep 28, 2026',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 2,
    title: 'The Science Behind Forest Bathing',
    excerpt: 'Research shows that spending just two hours in nature can significantly reduce cortisol levels and boost immune function.',
    image: 'https://picsum.photos/seed/blog2/800/600',
    category: 'Nature',
    author: 'Liam O\'Connor',
    date: 'Sep 24, 2026',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Plant-Based Protein: A Complete Guide',
    excerpt: 'Everything you need to know about meeting your protein needs through whole-food plant sources — no supplements required.',
    image: 'https://picsum.photos/seed/blog3/800/600',
    category: 'Nutrition',
    author: 'Dr. Priya Sharma',
    date: 'Sep 20, 2026',
    readTime: '8 min',
  },
  {
    id: 4,
    title: 'Breathwork Techniques for Instant Calm',
    excerpt: 'Three powerful breathing patterns you can use anywhere to instantly activate your parasympathetic nervous system.',
    image: 'https://picsum.photos/seed/blog4/800/500',
    category: 'Mindfulness',
    author: 'Liam O\'Connor',
    date: 'Sep 16, 2026',
    readTime: '4 min',
  },
  {
    id: 5,
    title: 'Why Sleep Is Your Superpower',
    excerpt: 'Neuroscience reveals that quality sleep is the single most impactful thing you can do for your health, performance, and longevity.',
    image: 'https://picsum.photos/seed/blog5/800/700',
    category: 'Recovery',
    author: 'Dr. Maya Green',
    date: 'Sep 12, 2026',
    readTime: '6 min',
  },
  {
    id: 6,
    title: 'Building a Home Gym on a Budget',
    excerpt: "You don't need expensive equipment to stay fit. Here's how to create an effective workout space at home for under $200.",
    image: 'https://picsum.photos/seed/blog6/800/550',
    category: 'Fitness',
    author: 'Alex Rivera',
    date: 'Sep 8, 2026',
    readTime: '5 min',
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

export default function Blog() {
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

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
            Blog & Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Wellness Knowledge Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Expert articles, research insights, and practical tips to support
            your wellness journey — updated weekly.
          </motion.p>
        </div>
      </section>

      {/* ---- Featured Post ---- */}
      {featured && (
        <ScrollSection className="px-4 sm:px-6 lg:px-8 pb-12">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto glass-card overflow-hidden group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-emerald-500 text-sm font-medium mb-3">{featured.category}</span>
                <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {featured.title}
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featured.readTime}</span>
                </div>
                <span className="group/link inline-flex items-center gap-2 text-emerald-500 font-semibold">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.article>
        </ScrollSection>
      )}

      {/* ---- Blog Grid (Masonry) ---- */}
      <ScrollSection className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="masonry-grid">
            {rest.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="masonry-item glass-card overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-emerald-900 text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-emerald-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </ScrollSection>
    </>
  )
}
