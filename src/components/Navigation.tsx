import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Menu, X, Phone, Shield, Clock, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentPage: string;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'about', label: 'About' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const { isMenuOpen, setMenuOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled || isMenuOpen
            ? 'bg-navy-950/92 backdrop-blur-2xl border-b border-aqua-500/10 shadow-lg shadow-navy-950/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <motion.button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="AquaFlow Pro — Go to homepage"
            >
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aqua-500/20 to-teal-glow/10 border border-aqua-500/30 flex items-center justify-center group-hover:border-aqua-500/50 transition-colors">
                  <Droplets className="w-5 h-5 text-aqua-400 group-hover:text-cyan-glow transition-colors" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-aqua-400/15 rounded-xl blur-lg"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.65, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[1.0625rem] font-bold tracking-tight text-white font-heading">
                  AquaFlow
                </span>
                <span className="text-[0.625rem] font-semibold tracking-[0.22em] text-aqua-400 uppercase mt-0.5">
                  Pro Plumbing
                </span>
              </div>
            </motion.button>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                  className={`relative px-4 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    currentPage === item.id
                      ? 'text-aqua-400'
                      : 'text-white/65 hover:text-white'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-gradient-to-r from-aqua-500 to-teal-glow rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Right CTA group */}
            <div className="flex items-center gap-2.5">
              <motion.a
                href="tel:5551234567"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-aqua-500/10 border border-aqua-500/20 rounded-full text-aqua-400 text-sm font-medium hover:bg-aqua-500/18 hover:border-aqua-500/35 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Call us at 555-123-4567"
              >
                <Phone className="w-3.5 h-3.5" />
                (555) 123-4567
              </motion.a>

              <motion.button
                onClick={() => onNavigate('booking')}
                className="hidden sm:block px-5 py-2.5 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 text-sm font-bold rounded-full glow-button cursor-pointer shadow-md shadow-aqua-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Service
              </motion.button>

              <motion.button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white/75 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu — z-[110] so it fully covers the header */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            className="fixed inset-0 z-[110] lg:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-navy-950/97 backdrop-blur-2xl" />

            {/* Content */}
            <motion.div
              className="relative flex flex-col h-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05, duration: 0.28 }}
            >
              {/* Menu header */}
              <div className="flex items-center justify-between px-6 h-16 flex-shrink-0 border-b border-white/6">
                <button
                  onClick={() => { onNavigate('home'); closeMenu(); }}
                  className="flex items-center gap-2.5 cursor-pointer"
                  aria-label="AquaFlow Pro — Go home"
                >
                  <div className="w-8 h-8 rounded-lg bg-aqua-500/15 border border-aqua-500/25 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-aqua-400" aria-hidden="true" />
                  </div>
                  <div className="leading-none">
                    <span className="text-sm font-bold text-white font-heading block">AquaFlow</span>
                    <span className="text-[0.55rem] font-semibold tracking-widest text-aqua-400 uppercase">Pro Plumbing</span>
                  </div>
                </button>
                <button
                  onClick={closeMenu}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/55 hover:text-white hover:bg-white/12 transition-all cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8 py-8 overflow-y-auto">
                {/* Nav links */}
                <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-1 w-full max-w-xs mb-6">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => { onNavigate(item.id); closeMenu(); }}
                      aria-current={currentPage === item.id ? 'page' : undefined}
                      className={`w-full text-center py-3.5 px-6 rounded-xl text-xl font-heading font-bold tracking-tight cursor-pointer transition-all ${
                        currentPage === item.id
                          ? 'bg-aqua-500/12 text-aqua-400 border border-aqua-500/20'
                          : 'text-white/65 hover:text-white hover:bg-white/5'
                      }`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: 0.08 + index * 0.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* CTAs */}
                <motion.div
                  className="flex flex-col gap-3 w-full max-w-xs"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                >
                  <motion.button
                    onClick={() => { onNavigate('booking'); closeMenu(); }}
                    className="py-3.5 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold rounded-xl glow-button cursor-pointer"
                    whileTap={{ scale: 0.97 }}
                  >
                    Book Service
                  </motion.button>
                  <a
                    href="tel:5551234567"
                    className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/12 rounded-xl text-white/80 font-medium hover:bg-white/10 transition-all"
                    aria-label="Call us at 555-123-4567"
                  >
                    <Phone className="w-4 h-4 text-aqua-400" aria-hidden="true" />
                    (555) 123-4567
                  </a>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  className="flex items-center gap-5 text-white/40 text-xs mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.52 }}
                >
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-aqua-500/55" aria-hidden="true" />
                    24/7
                  </span>
                  <span className="w-px h-3.5 bg-white/15" aria-hidden="true" />
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-aqua-500/55" aria-hidden="true" />
                    Licensed
                  </span>
                  <span className="w-px h-3.5 bg-white/15" aria-hidden="true" />
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-aqua-500/55" aria-hidden="true" />
                    4.9 Rating
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
