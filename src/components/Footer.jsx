/**
 * Footer.jsx — Site Footer for Dorato Italiano
 * Wordmark, visit details, opening hours, contact and social links.
 */
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, TripAdvisor } from './SocialIcons';
import { Ornament } from './SectionHeading';
import { SITE } from '../data/site';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: TripAdvisor, href: '#', label: 'TripAdvisor' },
];

const footerNav = [
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Reservations', path: '/reservations' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2 text-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <span className="font-serif text-4xl sm:text-5xl font-light tracking-[0.32em] pl-[0.32em]">DORATO</span>
          <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.5em] text-gold pl-[0.5em]">Italiano</span>
          <Ornament className="mt-8 justify-center" />
          <p className="mt-6 max-w-lg font-serif text-xl italic font-light text-stone">
            Wood-fired tradition and Italian hospitality, served nightly in Surat.
          </p>
        </div>

        {/* Columns */}
        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-14 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <h3 className="eyebrow mb-5">Visit</h3>
            <address className="not-italic text-sm leading-7 text-stone">
              {SITE.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
            </address>
            <a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer" className="link-line mt-5">
              Get Directions
            </a>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Hours</h3>
            {SITE.hours.map((h) => (
              <div key={h.days} className="text-sm leading-7 text-stone">
                <span className="block text-ivory">{h.days}</span>
                <span className="block">{h.time}</span>
              </div>
            ))}
            <p className="mt-4 text-sm text-stone">Dine-in · Takeaway · Delivery</p>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Reservations</h3>
            <a href={SITE.phoneHref} className="block font-serif text-2xl text-ivory hover:text-gold transition-colors">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-stone hover:text-gold transition-colors">
              {SITE.email}
            </a>
            <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-stone transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-line pt-8 text-[11px] uppercase tracking-[0.22em] text-mute md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3" aria-label="Footer">
            {footerNav.map((item) => (
              <Link key={item.path} to={item.path} className="hover:text-gold transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>
          <p>{SITE.rating} ★ Google · {SITE.reviewCount}+ reviews</p>
        </div>
      </div>
    </footer>
  );
 }
