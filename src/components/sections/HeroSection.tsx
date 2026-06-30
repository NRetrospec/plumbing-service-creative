import { motion } from 'framer-motion';
import { Shield, Clock, Wrench, BadgeDollarSign, ArrowRight, Phone, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const trustBadges = [
  { icon: Clock, label: '24/7 Service', desc: 'Round-the-clock' },
  { icon: Shield, label: 'Licensed & Insured', desc: 'Certified pros' },
  { icon: Wrench, label: 'Same-Day Repairs', desc: 'Fast response' },
  { icon: BadgeDollarSign, label: 'Financing Available', desc: 'Flexible plans' },
];

const badgeDelays = [0, 0.08, 0.16, 0.24];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero — AquaFlow Pro Plumbing"
    >
      {/* Background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/55 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-transparent to-navy-950/85" />
      </div>

      {/* Subtle dot-grid */}
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      {/* Animated horizontal water lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-aqua-500/12 to-transparent"
            style={{ top: `${22 + i * 13}%` }}
            animate={{ x: ['-100%', '100%'], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              delay: i * 1.8,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-aqua-500/4 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.18, 1], x: [0, 45, 0], y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/5 w-[420px] h-[420px] bg-teal-glow/4 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.15, 1, 1.15], x: [0, -35, 0], y: [0, 35, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Trust chip */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-aqua-500/10 border border-aqua-500/20 rounded-full mb-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="w-2 h-2 bg-aqua-400 rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-aqua-400 text-sm font-semibold tracking-wide">
            Trusted by 5,000+ homeowners
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-heading font-black leading-[0.9] tracking-tight mb-7 text-center"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white block">Modern Plumbing</span>
          <span className="shimmer-text block">Solutions With</span>
          <span className="text-white block">
            Precision{' '}
            <span className="relative inline-block">
              Flow
              <motion.span
                className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-aqua-500 via-teal-glow to-aqua-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
            </span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto mb-10 font-light leading-relaxed text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Premium plumbing services engineered for the modern home. From emergency
          repairs to complete installations — we deliver excellence through every pipe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Primary CTA */}
          <motion.button
            onClick={() => onNavigate('booking')}
            className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold text-[1.0625rem] rounded-2xl glow-button cursor-pointer shadow-lg shadow-aqua-500/25"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Book a plumbing service"
          >
            Book Service
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </motion.button>

          {/* Secondary CTA — Emergency */}
          <motion.button
            onClick={() => onNavigate('emergency')}
            className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-[1.0625rem] rounded-2xl hover:bg-red-500/18 hover:border-red-500/50 transition-all cursor-pointer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Request emergency plumbing repair"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Emergency
          </motion.button>
        </motion.div>

        {/* Trust badges — horizontal scroll on mobile, 4-col grid on md+ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          aria-label="Trust certifications"
        >
          {/* Mobile: centered horizontal pill strip */}
          <div className="flex md:hidden items-center justify-center gap-2.5 flex-wrap">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className="flex-shrink-0 flex items-center gap-2 glass-card rounded-full px-4 py-2.5"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.08, duration: 0.45 }}
              >
                <badge.icon className="w-4 h-4 text-aqua-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-white whitespace-nowrap">{badge.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Desktop: 4-col grid */}
          <div className="hidden md:grid grid-cols-4 gap-4 max-w-3xl mx-auto">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className="glass-card rounded-xl p-4 text-center group hover:border-aqua-500/30 cursor-default"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 + badgeDelays[index], duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <badge.icon
                  className="w-6 h-6 text-aqua-400 mx-auto mb-2.5 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <div className="text-sm font-semibold text-white">{badge.label}</div>
                <div className="text-xs text-white/55 mt-1">{badge.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="w-px h-6 bg-gradient-to-b from-transparent to-aqua-400/40" />
        <ChevronDown className="w-5 h-5 text-aqua-400/50" />
      </motion.div>
    </section>
  );
}
