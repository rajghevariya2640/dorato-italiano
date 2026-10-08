/**
 * Navbar.jsx — Fixed Navigation Bar
 * Centred wordmark with split navigation, transparent over hero imagery and
 * solid on scroll. Mobile opens a full-screen overlay menu.
 */
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../data/site';

const leftItems = [
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
];

const rightItems = [
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

const mobileItems = [{ name: 'Home', path: '/' }, ...leftItems, { name: 'Reservations', path: '/reservations' }, ...rightItems];

function Wordmark({ className = '' }) {
  return (
    <Link to="/" className={`group flex flex-col items-center leading-none ${className}`} aria-label={`${SITE.name} — Home`}>
      <span className="font-serif text-[1.65rem] sm:text-3xl font-normal tracking-[0.32em] text-ivory transition-colors duration-500 group-hover:text-gold pl-[0.32em]">
        DORATO
      </span>
      <span className="mt-1.5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.45em] text-gold pl-[0.45em]">
        Italiano
      </span>
    </Link>
  );
}

function DesktopLink({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `relative py-2 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-500 ${
          isActive ? 'text-gold' : 'text-ivory/80 hover:text-ivory'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {item.name}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-0.5 left-0 right-0 mx-auto h-px w-full bg-gold"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
}

const luxe = [0.22, 1, 0.36, 1];

/**
 * Full-screen mobile menu. Rendered into <body> via a portal so it is never
 * clipped by the header's backdrop-filter (which would otherwise become the
 * containing block for this fixed element and cause flicker on open/close).
 */
function MobileMenu({ open, onClose, compact }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.45, ease: luxe } }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: luxe, delay: 0.05 } }}
          className="lg:hidden fixed inset-0 z-[90] flex flex-col bg-ink will-change-[opacity]"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Top bar mirrors the header so the wordmark doesn't shift */}
          <div className={`grid grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 ${compact ? 'py-3' : 'py-6'}`}>
            <div />
            <Wordmark />
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="relative flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
              >
                <span className="absolute block h-px w-7 rotate-45 bg-ivory" />
                <span className="absolute block h-px w-7 -rotate-45 bg-ivory" />
              </button>
            </div>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-5 px-6" aria-label="Mobile">
            {mobileItems.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.1 + i * 0.045, ease: luxe } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="will-change-transform"
              >
                <NavLink
                  to={item.path}
                  end
                  onClick={onClose}
                  className={({ isActive }) =>
                    `font-serif text-4xl font-light transition-colors duration-300 ${isActive ? 'text-gold italic' : 'text-ivory hover:text-gold'}`
                  }
                >
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="border-t border-line px-6 py-8 text-center space-y-2"
          >
            <a href={SITE.phoneHref} className="block text-sm tracking-[0.2em] text-ivory">{SITE.phone}</a>
            <p className="text-xs text-stone">{SITE.addressShort}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close if the route changes by any other means (back button, etc.)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock page scroll behind the open menu without layout shift
  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-700 ${
          scrolled
            ? 'bg-ink/92 backdrop-blur-md border-b border-line py-3'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
          {/* Left */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
            {leftItems.map((item) => <DesktopLink key={item.path} item={item} />)}
          </nav>
          <div className="lg:hidden" />

          {/* Centre wordmark */}
          <Wordmark />

          {/* Right */}
          <div className="flex items-center justify-end gap-10">
            <nav className="hidden lg:flex items-center gap-10" aria-label="Secondary">
              {rightItems.map((item) => <DesktopLink key={item.path} item={item} />)}
            </nav>
            <Link to="/reservations" className="btn btn-ghost hidden lg:inline-flex !px-6 !py-3">
              Reserve
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-[7px]"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="block h-px w-7 bg-ivory" />
              <span className="block h-px w-7 bg-ivory" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} compact={scrolled} />
    </>
  );
}
