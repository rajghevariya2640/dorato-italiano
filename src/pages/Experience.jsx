/**
 * Experience.jsx — Ambiance & Private Dining Page
 * Private dining experiences in alternating editorial rows, plus an atmosphere gallery.
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeading, { Ornament } from '../components/SectionHeading';

const IMG = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const ease = [0.22, 1, 0.36, 1];

const experiences = [
  {
    title: 'The Tuscan Cellar',
    subtitle: 'Private Tasting Room',
    desc: 'An intimate room set apart from the main dining hall for multi-course tasting dinners, guided course by course by our team.',
    image: IMG('1510812431401-41d2bd2722f3'),
    capacity: 'Up to 14 guests',
  },
  {
    title: 'Chef’s Table',
    subtitle: 'Beside the Hearth',
    desc: 'Sit steps from the wood-fired oven and watch the kitchen at work as our chefs prepare off-menu dishes tailored to your table.',
    image: IMG('1577219491135-ce391730fb2c'),
    capacity: '8 guests',
  },
  {
    title: 'Pasta Masterclass',
    subtitle: 'Hands-on Workshop',
    desc: 'Learn to hand-roll tagliolini and shape tortellini from scratch, then sit down together to a three-course lunch.',
    image: IMG('1498579150354-977475b7ea0b'),
    capacity: 'Saturdays · 10 AM',
  },
];

const galleryImages = [
  { title: 'The Dining Room', image: IMG('1517248135467-4c7edcad34c4', 1200), span: 'md:col-span-2 md:row-span-2' },
  { title: 'From the Oven', image: IMG('1579751626657-72bc17010498', 800), span: '' },
  { title: 'Handmade Pasta', image: IMG('1473093295043-cdd812d0e601', 800), span: '' },
  { title: 'The Terrace', image: IMG('1537047902294-62a40c20a6ae', 800), span: '' },
  { title: 'Evening Service', image: IMG('1414235077428-338989a2e8c0', 800), span: '' },
  { title: 'Dolci', image: IMG('1571877227200-a0d98ea607e9', 800), span: '' },
];

export default function Experience() {
  return (
    <div className="bg-ink">
      <PageHeader
        eyebrow="L’Esperienza"
        title="Beyond the Table"
        subtitle="Private tastings, a seat by the hearth, and mornings spent learning to make pasta by hand."
        image={IMG('1414235077428-338989a2e8c0', 2000)}
      />

      {/* Experiences */}
      <section className="px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl space-y-28 lg:space-y-40">
          {experiences.map((exp, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div key={exp.title} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-0">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.2, ease }}
                  className={`img-zoom aspect-[4/3] lg:col-span-7 ${reversed ? 'lg:order-2 lg:col-start-6' : ''}`}
                >
                  <img src={exp.image} alt={exp.title} loading="lazy" className="h-full w-full object-cover" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.2, delay: 0.15, ease }}
                  className={`lg:col-span-4 ${reversed ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}
                >
                  <span className="font-serif text-sm italic text-gold">{String(idx + 1).padStart(2, '0')}</span>
                  <p className="eyebrow mt-4">{exp.subtitle}</p>
                  <h2 className="display mt-5 text-4xl sm:text-5xl text-ivory">{exp.title}</h2>
                  <Ornament className="mt-7" />
                  <p className="mt-7 text-lg leading-relaxed text-stone">{exp.desc}</p>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.26em] text-ivory/80">{exp.capacity}</p>
                  <Link to="/reservations" className="link-line mt-10">
                    Enquire <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-line bg-ink-2 px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeading badge="Atmosfera" title="Moments at Dorato" />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {galleryImages.map((img, i) => (
              <motion.figure
                key={img.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: (i % 3) * 0.1 }}
                className={`img-zoom group relative ${img.span}`}
              >
                <img src={img.image} alt={img.title} loading="lazy" className="h-full w-full object-cover" />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <span className="font-serif text-xl italic text-ivory">{img.title}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-28 text-center sm:px-8">
        <p className="eyebrow mb-6">Planning an Occasion?</p>
        <h2 className="display text-4xl sm:text-5xl text-ivory">Let us host your evening</h2>
        <Ornament className="mt-8 justify-center" />
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/reservations" className="btn btn-gold w-full sm:w-auto">Reserve</Link>
          <Link to="/contact" className="btn btn-ghost w-full sm:w-auto">Speak with Our Team</Link>
        </div>
      </section>
    </div>
  );
}
