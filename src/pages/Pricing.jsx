/**
 * Pricing.jsx — Pricing Page
 * Pricing table with three tiers, feature comparison, and FAQ.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  CheckCircle2, X, ArrowRight, Sparkles, ChevronDown,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

/* ---------- Data ---------- */
const plans = [
  {
    name: 'Essentials',
    price: { monthly: 49, yearly: 39 },
    desc: 'Perfect for those just starting their wellness journey.',
    features: [
      { text: 'Access to group classes', included: true },
      { text: '2 classes per week', included: true },
      { text: 'Nutrition guide PDF', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Personal training sessions', included: false },
      { text: 'Spa & recovery access', included: false },
      { text: 'Retreat discounts', included: false },
      { text: 'Priority booking', included: false },
    ],
  },
  {
    name: 'Premium',
    price: { monthly: 99, yearly: 79 },
    desc: 'Our most popular plan for dedicated wellness seekers.',
    popular: true,
    features: [
      { text: 'Unlimited group classes', included: true },
      { text: '4 PT sessions / month', included: true },
      { text: 'Custom nutrition plan', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Spa & recovery access', included: true },
      { text: '10% retreat discount', included: true },
      { text: 'Priority booking', included: true },
      { text: 'VIP events', included: false },
    ],
  },
  {
    name: 'Elite',
    price: { monthly: 179, yearly: 149 },
    desc: 'The ultimate wellness experience with unlimited everything.',
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'Unlimited PT sessions', included: true },
      { text: 'AI-powered nutrition plan', included: true },
      { text: 'Dedicated wellness coach', included: true },
      { text: 'Full spa & recovery', included: true },
      { text: '25% retreat discount', included: true },
      { text: 'Priority booking', included: true },
      { text: 'VIP events & workshops', included: true },
    ],
  },
]

const faqs = [
  {
    q: 'Can I switch between plans at any time?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and any unused balance is prorated.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'Absolutely! Every new member gets a complimentary 7-day trial with full access to group classes and facilities. No credit card required to start.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'You can cancel your membership at any time with no penalties. We simply ask for a 30-day notice so we can process your cancellation properly.',
  },
  {
    q: 'Do you offer corporate or group rates?',
    a: 'Yes, we offer special pricing for teams of 5 or more. Contact our corporate wellness team for a customized package that fits your organization.',
  },
  {
    q: 'Are online sessions included in all plans?',
    a: 'Online live-streamed classes are included with Premium and Elite plans. Essentials members can add online access for an additional $15/month.',
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

function FAQItem({ faq, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-semibold text-lg pr-4" style={{ color: 'var(--text-primary)' }}>
          {faq.q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

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
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            Choose the plan that fits your wellness goals. No hidden fees,
            no long-term contracts. Cancel anytime.
          </motion.p>

          {/* Monthly / Yearly Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <span
              className={`font-medium ${!yearly ? 'text-emerald-500' : ''}`}
              style={{ color: yearly ? 'var(--text-muted)' : '#10b981' }}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className="relative w-14 h-7 rounded-full bg-emerald-500/20 transition-colors"
              aria-label="Toggle yearly pricing"
            >
              <motion.div
                animate={{ x: yearly ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-emerald-500"
              />
            </button>
            <span
              className={`font-medium ${yearly ? 'text-emerald-500' : ''}`}
              style={{ color: !yearly ? 'var(--text-muted)' : '#10b981' }}
            >
              Yearly
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ---- Pricing Cards ---- */}
      <ScrollSection className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`glass-card p-8 relative ${
                plan.popular ? 'ring-2 ring-emerald-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-500/25">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {plan.name}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                {plan.desc}
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  ${yearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-sm ml-1" style={{ color: 'var(--text-muted)' }}>
                  /month
                </span>
              </div>

              <Link
                to="/contact"
                className={`block w-full text-center py-3.5 rounded-full font-semibold text-lg transition-all duration-300 mb-8 ${
                  plan.popular
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25'
                    : 'glass hover:bg-emerald-500/10'
                }`}
                style={{ color: plan.popular ? 'white' : 'var(--text-primary)' }}
              >
                Get Started
              </Link>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                    )}
                    <span style={{ color: f.included ? 'var(--text-secondary)' : 'var(--text-muted)', opacity: f.included ? 1 : 0.5 }}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </ScrollSection>

      {/* ---- FAQ Section ---- */}
      <ScrollSection className="section-padding">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Got questions? We've got answers."
          />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} i={i} />
            ))}
          </div>
        </div>
      </ScrollSection>
    </>
  )
}
