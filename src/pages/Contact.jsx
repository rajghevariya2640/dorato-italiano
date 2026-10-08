/**
 * Contact.jsx — Contact & Location Page for Dorato Italiano Surat
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { Ornament } from '../components/SectionHeading';
import { Instagram, Facebook, Twitter, TripAdvisor } from '../components/SocialIcons';
import { SITE } from '../data/site';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: TripAdvisor, href: '#', label: 'TripAdvisor' },
];

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#d27a6a]">
      <AlertCircle className="h-3 w-3" /> {message}
    </p>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number';
    if (!formData.message.trim()) errs.message = 'Please write a message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-ink">
      <PageHeader
        compact
        eyebrow="Contatti"
        title="Contact & Location"
        subtitle="Find us at Meridian Business Hub in Mota Varachha, or send a note to our team."
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Get in Touch</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">We look forward to welcoming you</h2>
            <Ornament className="mt-7" />

            <dl className="mt-12 divide-y divide-line border-y border-line">
              <div className="grid grid-cols-[110px_1fr] gap-6 py-6">
                <dt className="pt-1 text-[11px] uppercase tracking-[0.24em] text-gold">Address</dt>
                <dd className="text-stone leading-relaxed">
                  {SITE.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
                  <a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer" className="link-line mt-4">
                    Directions <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-6 py-6">
                <dt className="pt-1 text-[11px] uppercase tracking-[0.24em] text-gold">Telephone</dt>
                <dd><a href={SITE.phoneHref} className="font-serif text-2xl text-ivory hover:text-gold transition-colors">{SITE.phone}</a></dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-6 py-6">
                <dt className="pt-1 text-[11px] uppercase tracking-[0.24em] text-gold">Email</dt>
                <dd><a href={`mailto:${SITE.email}`} className="break-all text-ivory hover:text-gold transition-colors">{SITE.email}</a></dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-6 py-6">
                <dt className="pt-1 text-[11px] uppercase tracking-[0.24em] text-gold">Hours</dt>
                <dd className="text-stone">
                  {SITE.hours.map((h) => <span key={h.days} className="block">{h.days}<br />{h.time}</span>)}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-stone transition-colors duration-500 hover:border-gold hover:text-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-line bg-ink-2 p-8 sm:p-12">
              <h3 className="font-serif text-3xl font-light text-ivory">Send a Message</h3>
              <p className="mt-3 text-sm text-stone">
                Group bookings, celebrations, menu questions — we’ll reply as soon as we can.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="py-16 text-center"
                >
                  <p className="eyebrow">Grazie</p>
                  <h4 className="display mt-4 text-4xl text-ivory">Message received</h4>
                  <Ornament className="mt-6 justify-center" />
                  <p className="mt-6 text-sm text-stone">
                    Our team will be in touch at <span className="text-ivory">{formData.phone}</span> shortly.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="link-line mt-8">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-8">
                  <div>
                    <label htmlFor="c-name" className="field-label">Your Name</label>
                    <input id="c-name" type="text" autoComplete="name" value={formData.name} onChange={update('name')}
                      placeholder="Full name" className={`field ${errors.name ? 'field-error' : ''}`} />
                    <FieldError message={errors.name} />
                  </div>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-phone" className="field-label">Phone</label>
                      <input id="c-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={update('phone')}
                        placeholder="+91 98765 43210" className={`field ${errors.phone ? 'field-error' : ''}`} />
                      <FieldError message={errors.phone} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="field-label">Email <span className="normal-case tracking-normal text-mute">(optional)</span></label>
                      <input id="c-email" type="email" autoComplete="email" value={formData.email} onChange={update('email')}
                        placeholder="you@example.com" className="field" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-message" className="field-label">Message</label>
                    <textarea id="c-message" rows="4" value={formData.message} onChange={update('message')}
                      placeholder="How can we help?" className={`field resize-none ${errors.message ? 'field-error' : ''}`} />
                    <FieldError message={errors.message} />
                  </div>
                  <button type="submit" className="btn btn-gold w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[460px] border-t border-line">
        <iframe
          title="Map showing Dorato Italiano in Mota Varachha, Surat"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.12459103408!2d72.87115867595567!3d21.226922280470716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f03ad06d15b%3A0x6b2b73ec4cb185c!2sMota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="map-dark"
        />
      </section>
    </div>
  );
}
