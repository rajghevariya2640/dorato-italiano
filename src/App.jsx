/**
 * App.jsx — Main Application Router & Layout
 * Renders Navbar, Footer, Preloader, ScrollToTop,
 * and page routes with smooth Framer Motion page transitions.
 */
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layout & Global Utility Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Experience from './pages/Experience';
import Reservations from './pages/Reservations';
import Faq from './pages/Faq';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();

  return (
    <div className="grain relative min-h-screen flex flex-col bg-ink text-ivory">
      {/* Global Utilities */}
      <Preloader />
      <ScrollToTop />

      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Main Animated Route Container */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
