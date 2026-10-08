/**
 * About.jsx — About Dorato Italiano Page
 * House story, guiding principles, kitchen imagery and visit details.
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeading, { Ornament } from '../components/SectionHeading';
import { SITE } from '../data/site';

const IMG = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const ease = [0.22, 1, 0.36, 1];

const pillars = [
  { numeral: 'I', title: 'The Wood Fire', desc: 'Dome ovens burning at 900°F give every crust its leopard-spotted char and tender, airy crumb.' },
  { numeral: 'II', title: 'Patient Dough', desc: 'Seventy-two hours of cold fermentation for a base that is light, flavourful and easy to digest.' },
  { numeral: 'III', title: 'For Every Guest', desc: 'Vegan cheeses, plant-based pastas and gluten-free preparations, made with the same care.' },
  { numeral: 'IV', title: 'A Warm Table', desc: 'A room made for long dinners — for couples, families and celebrations alike.' },
];

export default function About() {
  return (
    <div className="bg-ink">
      <PageHeader
        eyebrow="La Nostra Storia"
        title="Our Story"
        subtitle="Traditional Italian cooking, an open flame, and a dining room made for lingering."
        image={IMG('1517248135467-4c7edcad34c4', 2000)}
      />

      {/* Story */}
      <section className="px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-6">Benvenuti</p>
            <blockquote className="display text-4xl sm:text-5xl text-ivory">
              “We bring the traditional flavours of Italy to your plate —{' '}
              <span className="italic text-gold">with every bite.</span>”
            </blockquote>
            <Ornament className="mt-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.15, ease }}
            className="space-y-6 text-lg leading-relaxed text-stone lg:col-span-6 lg:col-start-7 lg:pt-14"
          >
            <p>
              <span className="float-left mr-3 mt-1 font-serif text-7xl leading-[0.8] text-gold">D</span>
              orato Italiano is Surat’s home for authentic Italian cooking in a warm and inviting room. Specialising in
              wood-fired pizza, our kitchen at Meridian Business Hub in Mota Varachha brings the spirit of the Italian
              trattoria to the city.
            </p>
            <p>
              We cook with durum wheat semolina, extra virgin olive oil, San Marzano tomatoes and fresh herbs — and
              let the fire do the rest. From the Five Cheese and Burrata pizzas to our signature Mamma Rosa pasta, every
              plate is prepared to order by a team that cares deeply about getting it right.
            </p>
            <p>
              The result has been the kind of welcome we hoped for: a {SITE.rating}-star rating from more than{' '}
              {SITE.reviewCount} guests, and tables that fill with familiar faces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image pair */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-5">
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease }}
            className="img-zoom aspect-[4/3] md:col-span-3 md:aspect-auto md:h-[560px]"
          >
            <img src={IMG('1571997478779-2adcbbe9ab2f')} alt="Neapolitan pizza fresh from the oven" loading="lazy" className="h-full w-full object-cover" />
          </motion.figure>
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
            className="img-zoom aspect-[4/3] md:col-span-2 md:mt-24 md:aspect-auto md:h-[560px]"
          >
            <img src={IMG('1498579150354-977475b7ea0b', 1000)} alt="Fresh pasta, tomatoes and basil" loading="lazy" className="h-full w-full object-cover" />
          </motion.figure>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-5 py-28 sm:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading badge="What Guides Us" title="Four Principles" />
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12 }}
                className="bg-ink px-8 py-12 text-center"
              >
                <span className="font-serif text-3xl italic text-gold">{p.numeral}</span>
                <h3 className="mt-6 font-serif text-2xl font-light text-ivory">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-stone">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="border-t border-line bg-ink-2 px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-6">Visit Us</p>
          <h2 className="display text-4xl sm:text-5xl text-ivory">Meridian Business Hub, Surat</h2>
          <Ornament className="mt-8 justify-center" />
          <address className="mt-8 not-italic text-lg leading-relaxed text-stone">
            {SITE.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
          </address>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/reservations" className="btn btn-gold w-full sm:w-auto">Reserve a Table</Link>
            <a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full sm:w-auto">
              Get Directions <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
