/**
 * Reservations.jsx — Table Booking & Reservation Page
 * Reservation form with field validation, seating preference,
 * and an animated booking confirmation dialog.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { Ornament } from '../components/SectionHeading';
import { SITE } from '../data/site';

const timeSlots = ['12:00 PM', '1:30 PM', '5:30 PM', '7:00 PM', '8:30 PM', '10:00 PM'];

const seatingAreas = ['Main Dining Room', 'Courtyard Terrace', 'The Cellar', 'Chef’s Counter'];

const today = new Date().toISOString().split('T')[0];

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#d27a6a]">
      <AlertCircle className="h-3 w-3" /> {message}
    </p>
  );
}

function StepTitle({ numeral, children }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-line pb-4">
      <span className="font-serif text-lg italic text-gold">{numeral}</span>
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-ivory">{children}</h2>
    </div>
  );
}

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: today,
    time: '7:00 PM',
    seating: 'Main Dining Room',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number';
    if (!formData.date) errs.date = 'Please select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setIsSubmitted(true);
  };

  const formattedDate = formData.date
    ? new Date(`${formData.date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="bg-ink">
      <PageHeader
        compact
        eyebrow="Prenota un Tavolo"
        title="Reservations"
        subtitle="Reserve your table below. For parties of more than twelve, please call us directly."
        image="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Details panel */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-12">
              <div className="img-zoom aspect-[4/5] hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"
                  alt="A table set for dinner"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="eyebrow mb-4">Hours</p>
                {SITE.hours.map((h) => (
                  <p key={h.days} className="text-stone">
                    <span className="text-ivory">{h.days}</span><br />{h.time}
                  </p>
                ))}
              </div>
              <div>
                <p className="eyebrow mb-4">By Telephone</p>
                <a href={SITE.phoneHref} className="font-serif text-3xl font-light text-ivory hover:text-gold transition-colors">
                  {SITE.phone}
                </a>
                <p className="mt-3 text-sm text-stone">
                  Large parties, celebrations and private dining are best arranged with our team by phone.
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-16 lg:col-span-8">
            <div>
              <StepTitle numeral="I">Your Details</StepTitle>
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="res-name" className="field-label">Full Name</label>
                  <input id="res-name" type="text" autoComplete="name" value={formData.name} onChange={update('name')}
                    placeholder="Your name" className={`field ${errors.name ? 'field-error' : ''}`} />
                  <FieldError message={errors.name} />
                </div>
                <div>
                  <label htmlFor="res-email" className="field-label">Email</label>
                  <input id="res-email" type="email" autoComplete="email" value={formData.email} onChange={update('email')}
                    placeholder="you@example.com" className={`field ${errors.email ? 'field-error' : ''}`} />
                  <FieldError message={errors.email} />
                </div>
                <div>
                  <label htmlFor="res-phone" className="field-label">Phone</label>
                  <input id="res-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={update('phone')}
                    placeholder="+91 98765 43210" className={`field ${errors.phone ? 'field-error' : ''}`} />
                  <FieldError message={errors.phone} />
                </div>
                <div>
                  <label htmlFor="res-guests" className="field-label">Guests</label>
                  <select id="res-guests" value={formData.guests} onChange={update('guests')} className="field cursor-pointer">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <StepTitle numeral="II">Date &amp; Time</StepTitle>
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="res-date" className="field-label">Date</label>
                  <input id="res-date" type="date" min={today} value={formData.date} onChange={update('date')}
                    className={`field ${errors.date ? 'field-error' : ''}`} />
                  <FieldError message={errors.date} />
                </div>
                <fieldset>
                  <legend className="field-label mb-4">Time</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData({ ...formData, time: slot })}
                        aria-pressed={formData.time === slot}
                        className={`border py-3 text-xs tracking-wider transition-colors duration-500 ${
                          formData.time === slot
                            ? 'border-gold bg-gold text-ink'
                            : 'border-line-strong text-stone hover:border-gold hover:text-ivory'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div>
              <StepTitle numeral="III">Preferences</StepTitle>
              <fieldset>
                <legend className="field-label mb-4">Seating</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {seatingAreas.map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setFormData({ ...formData, seating: area })}
                      aria-pressed={formData.seating === area}
                      className={`border px-3 py-4 font-serif text-base transition-colors duration-500 ${
                        formData.seating === area
                          ? 'border-gold text-gold'
                          : 'border-line-strong text-stone hover:border-gold hover:text-ivory'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-10">
                <label htmlFor="res-notes" className="field-label">Occasion or Dietary Notes</label>
                <textarea id="res-notes" rows="3" value={formData.notes} onChange={update('notes')}
                  placeholder="An anniversary, a birthday, an allergy we should know about…" className="field resize-none" />
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-sm text-stone">
                All fields except notes are required.
              </p>
              <button type="submit" className="btn btn-gold w-full sm:w-auto">
                Request Reservation
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Confirmation */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-5 backdrop-blur-sm"
            onClick={() => setIsSubmitted(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="res-confirm-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg border border-line-strong bg-ink-3 px-8 py-12 text-center sm:px-12"
            >
              <button onClick={() => setIsSubmitted(false)} aria-label="Close" className="absolute right-5 top-5 text-stone hover:text-gold">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <p className="eyebrow">Grazie</p>
              <h3 id="res-confirm-title" className="display mt-4 text-4xl text-ivory">Your table is requested</h3>
              <Ornament className="mt-6 justify-center" />

              <dl className="mt-8 divide-y divide-line border-y border-line text-left text-sm">
                {[
                  ['Name', formData.name],
                  ['Party', `${formData.guests} ${formData.guests === '1' ? 'guest' : 'guests'}`],
                  ['When', `${formattedDate} · ${formData.time}`],
                  ['Seating', formData.seating],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3">
                    <dt className="text-[11px] uppercase tracking-[0.24em] text-stone">{k}</dt>
                    <dd className="text-right text-ivory">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-sm leading-relaxed text-stone">
                A summary will be sent to <span className="text-ivory">{formData.email}</span>. We look forward to welcoming you to {SITE.name}.
              </p>

              <button onClick={() => setIsSubmitted(false)} className="btn btn-ghost mt-8 w-full">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
