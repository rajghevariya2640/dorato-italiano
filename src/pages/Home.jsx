/**
 * Home.jsx — Dorato Italiano Landing Page
 * Cinematic hero, house philosophy, signature dishes, guest reviews,
 * private dining teaser and reservation call-to-action.
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading, { Ornament } from '../components/SectionHeading';
import TestimonialSlider from '../components/TestimonialSlider';
import { SITE } from '../data/site';
import { preloaderDone } from '../components/Preloader';

const IMG = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const ease = [0.22, 1, 0.36, 1];

/* ---------- Signature Dishes ---------- */
const featuredDishes = [
  {
    name: 'Five Cheese Pizza',
    category: 'Pizzeria',
    description: 'A chef’s selection of five Italian cheeses melted over a gently spiced tomato base.',
    image: IMG('1513104890138-7c749659a591', 900),
  },
  {
    name: 'Mamma Rosa',
    category: 'Pasta',
    description: 'Our house pasta in a silken rosé sauce of San Marzano tomato, cream, garlic and Parmigiano.',
    image: IMG('1608897013039-887f21d8c804', 900),
  },
  {
    name: 'Burrata Neapolitana',
    category: 'Pizzeria',
    description: 'Pomodoro, wild arugula and lemon zest, crowned with a whole burrata and aged balsamic.',
    image: IMG('1593560708920-61dd98c46a4e', 900),
  },
  {
    name: 'Peri Peri',
    category: 'Pizzeria',
    description: 'Roasted peppers, zucchini and broccoli with mozzarella and a bright, fiery peri peri finish.',
    image: IMG('1590947132387-155cc02f3212', 900),
  },
  {
    name: 'Risotto al Tartufo',
    category: 'Risotto',
    description: 'Slow-stirred rice with wild mushroom broth, Parmigiano and a white truffle emulsion.',
    image: IMG('1633964913295-ceb43826e7c9', 900),
  },
  {
    name: 'Tiramisù',
    category: 'Dolci',
    description: 'Savoiardi soaked in espresso beneath clouds of whipped mascarpone and bitter cocoa.',
    image: IMG('1571877227200-a0d98ea607e9', 900),
  },
];

/* ---------- Google Reviews ---------- */
const googleReviews = [
  {
    author: 'G.D. Kathiriya',
    review: 'We tried the five cheese pizza, peri peri pizza, burrata pizza and mamma rosa pasta. Absolutely delicious and authentic Italian taste.',
    source: 'Google Review',
  },
  {
    author: 'Vikas Rajput',
    review: 'Food quality is very good, with a lovely ambience — a good place for couples and families. Ample seating and prompt service.',
    source: 'Google Review',
  },
  {
    author: 'Bhumika Talaviya',
    review: 'Tasty food and good service with supportive staff. A great place for authentic wood-fired pizzas.',
    source: 'Google Local Guide',
  },
];

const highlights = [
  { value: SITE.rating, label: 'Google rating' },
  { value: `${SITE.reviewCount}+`, label: 'Guest reviews' },
  { value: '72h', label: 'Fermented dough' },
  { value: '900°F', label: 'Wood-fired oven' },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 180]);
  const heroFade = useTransform(scrollY, [0, 600], [1, 0]);
  // Hold the hero entrance until the preloader has lifted on first visit
  const d = preloaderDone ? 0 : 1.8;

  return (
    <div className="relative bg-ink">
      {/* -------------------- HERO -------------------- */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={IMG('1579751626657-72bc17010498', 2000)}
            alt="Neapolitan pizza resting before the wood-fired oven"
            className="h-full w-full object-cover animate-slow-zoom"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,13,11,0.7)_100%)]" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 mx-auto max-w-5xl px-5 pt-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: d + 0.1 }}
            className="eyebrow mb-8"
          >
            Ristorante · Pizzeria · Surat
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: d + 0.2, ease }}
            className="display text-[3.4rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] text-ivory"
          >
            The Art of the
            <span className="block italic text-gold">Italian Table</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: d + 0.6 }}
          >
            <Ornament className="mt-10 justify-center" />
            <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-ivory/75">
              Wood-fired Neapolitan pizza, handmade pasta and unhurried Italian hospitality in the heart of Mota Varachha.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/reservations" className="btn btn-gold w-full sm:w-auto">
                Reserve a Table
              </Link>
              <Link to="/menu" className="btn btn-ghost w-full sm:w-auto">
                Discover the Menu
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: d + 1 }}
          className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-line md:block"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-line px-8 text-center text-[11px] uppercase tracking-[0.26em] text-stone">
            <p className="py-6">Open daily · 12 PM – 12 AM</p>
            <p className="py-6">{SITE.addressShort}</p>
            <p className="py-6">{SITE.rating} ★ on Google · {SITE.reviewCount}+ reviews</p>
          </div>
        </motion.div>
      </section>

      {/* -------------------- PHILOSOPHY -------------------- */}
      <section className="relative px-5 py-28 sm:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease }}
            className="relative lg:col-span-6"
          >
            <div className="img-zoom aspect-[4/5] w-[82%]">
              <img
                src={IMG('1517248135467-4c7edcad34c4', 1100)}
                alt="The dining room at Dorato Italiano"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="img-zoom absolute bottom-[-10%] right-0 aspect-square w-[46%] border-[10px] border-ink">
              <img
                src={IMG('1414235077428-338989a2e8c0', 700)}
                alt="A plated course served at the table"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <p className="eyebrow mb-6">La Nostra Filosofia</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory">
              Fire, flour <span className="italic text-gold">&amp; patience</span>
            </h2>
            <Ornament className="mt-8" />
            <p className="mt-8 text-lg leading-relaxed text-stone">
              At Dorato Italiano, every dough rests for seventy-two hours before it meets the flame. Sauces are built
              from San Marzano tomatoes, pasta is finished by hand, and each plate leaves the kitchen only when it is
              exactly as it should be.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-stone">
              It is cooking rooted in Italian tradition — and a table set for long evenings with the people you love.
            </p>
            <Link to="/about" className="link-line mt-10">
              Our Story <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* -------------------- HIGHLIGHTS -------------------- */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line md:grid-cols-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12 }}
              className="bg-ink-2 py-14 text-center"
            >
              <p className="font-serif text-5xl font-light text-gold">{h.value}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-stone">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* -------------------- SIGNATURE DISHES -------------------- */}
      <section className="px-5 py-28 sm:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="La Selezione"
            title="Signatures of the House"
            subtitle="The dishes our guests return for — prepared the same way, every evening."
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDishes.map((dish, idx) => (
              <motion.article
                key={dish.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: (idx % 3) * 0.12, ease }}
                className={`group ${idx % 3 === 1 ? 'lg:mt-16' : ''}`}
              >
                <div className="img-zoom relative aspect-[4/5]">
                  <img src={dish.image} alt={dish.name} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-ink/10 transition-colors duration-700 group-hover:bg-transparent" />
                </div>
                <div className="mt-7 flex items-baseline gap-4">
                  <span className="font-serif text-sm italic text-gold">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone">{dish.category}</p>
                    <h3 className="mt-2 font-serif text-3xl font-light text-ivory transition-colors duration-500 group-hover:text-gold">
                      {dish.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">{dish.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link to="/menu" className="btn btn-ghost">
              View the Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------- REVIEWS -------------------- */}
      <section className="border-t border-line bg-ink-2 px-5 py-28 sm:px-8 lg:py-36">
        <p className="eyebrow mb-10 text-center">Words from Our Guests</p>
        <TestimonialSlider reviews={googleReviews} />
      </section>

      {/* -------------------- PRIVATE DINING BAND -------------------- */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <img
          src={IMG('1414235077428-338989a2e8c0', 2000)}
          alt="Candlelit table set for an evening celebration"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease }}
          className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
        >
          <div className="max-w-lg">
            <p className="eyebrow mb-6">Celebrations &amp; Private Dining</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory">
              An evening <span className="italic text-gold">made to measure</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-stone">
              Anniversaries, family gatherings and quiet proposals — our team will shape the table, the menu and the
              pace of the evening around your occasion.
            </p>
            <Link to="/experience" className="link-line mt-10">
              Explore Experiences <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* -------------------- RESERVE -------------------- */}
      <section className="px-5 py-28 sm:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            badge="Prenota"
            title="Your Table Awaits"
            subtitle="Reserve online in a moment, or call us and we will arrange everything for you."
            className="!mb-12"
          />

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/reservations" className="btn btn-gold w-full sm:w-auto">
              Book a Table
            </Link>
            <a href={SITE.phoneHref} className="btn btn-ghost w-full sm:w-auto">
              Call {SITE.phone}
            </a>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-12 text-sm sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-3">Hours</p>
              <p className="text-stone">Daily<br />12:00 PM – 12:00 AM</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Address</p>
              <p className="text-stone">Meridian Business Hub<br />Mota Varachha, Surat</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Order In</p>
              <p className="text-stone">Zomato · Swiggy<br />District</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
