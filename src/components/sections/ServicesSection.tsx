import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets, Search, Flame, PipetteIcon, Construction,
  AlertTriangle, Bath, Building2, ArrowRight, X
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (section: string) => void;
}

const services = [
  {
    icon: Droplets,
    title: 'Drain Cleaning',
    desc: 'Professional drain clearing using advanced hydro-jetting technology.',
    details: 'Our state-of-the-art hydro-jetting equipment clears even the toughest blockages. We use camera inspection to identify the exact location and cause of clogs, ensuring a thorough and lasting solution.',
    color: 'from-cyan-400 to-blue-500',
    price: 'From $99',
  },
  {
    icon: Search,
    title: 'Leak Detection',
    desc: 'Non-invasive electronic leak detection for hidden water leaks.',
    details: 'Using acoustic listening devices and thermal imaging cameras, we locate leaks without destructive exploration. Our precision technology saves you time, money, and property damage.',
    color: 'from-teal-400 to-cyan-500',
    price: 'From $149',
  },
  {
    icon: Flame,
    title: 'Water Heater Repair',
    desc: 'Expert repair and installation of all water heater types.',
    details: 'Whether you have a traditional tank, tankless, or hybrid system, our certified technicians diagnose and repair all brands. We also offer energy-efficient upgrade consultations.',
    color: 'from-orange-400 to-red-400',
    price: 'From $129',
  },
  {
    icon: PipetteIcon,
    title: 'Pipe Replacement',
    desc: 'Full and partial pipe replacement with minimal disruption.',
    details: 'We specialize in trenchless pipe replacement technology, minimizing damage to your property. Our solutions include PEX, copper, and PVC options tailored to your needs.',
    color: 'from-blue-400 to-indigo-500',
    price: 'From $299',
  },
  {
    icon: Construction,
    title: 'Sewer Line Repair',
    desc: 'Complete sewer line inspection, repair, and replacement.',
    details: 'From root intrusion to collapsed lines, we handle all sewer issues. Our video inspection technology provides a clear picture of the problem before any work begins.',
    color: 'from-emerald-400 to-teal-500',
    price: 'From $349',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Plumbing',
    desc: '24/7 emergency response for urgent plumbing situations.',
    details: 'When disaster strikes, we respond within 30 minutes. Burst pipes, severe leaks, sewage backups — our emergency team is equipped to handle any crisis, day or night.',
    color: 'from-red-400 to-rose-500',
    price: 'Call Now',
  },
  {
    icon: Bath,
    title: 'Bathroom Plumbing',
    desc: 'Complete bathroom plumbing installation and renovation.',
    details: 'From simple fixture replacements to complete bathroom remodels, we handle every aspect of bathroom plumbing. Toilets, showers, bathtubs, vanities — expertly installed.',
    color: 'from-violet-400 to-purple-500',
    price: 'From $199',
  },
  {
    icon: Building2,
    title: 'Commercial Plumbing',
    desc: 'Full-scale commercial plumbing services for businesses.',
    details: 'We serve restaurants, offices, retail spaces, and industrial facilities. Our commercial team handles large-scale installations, maintenance contracts, and code compliance.',
    color: 'from-amber-400 to-orange-500',
    price: 'Custom Quote',
  },
];

export default function ServicesSection({ onNavigate }: ServicesSectionProps) {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const openService = (index: number) => setExpandedService(index);
  const closeService = () => setExpandedService(null);

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="Our Services">
      {/* Background — distinct tint + dot texture */}
      <div className="absolute inset-0 bg-navy-900" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua-500/40 to-transparent" aria-hidden="true" />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua-500/25 to-transparent" aria-hidden="true" />

      {/* Side accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aqua-500/15 to-transparent" aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aqua-500/15 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.65 }}
        >
          <motion.span
            className="section-label mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
          >
            Our Services
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight mt-5">
            Complete Plumbing
            <br />
            <span className="shimmer-text">Service Solutions</span>
          </h2>

          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            From routine maintenance to complex installations, our certified technicians
            deliver precision workmanship with every project.
          </p>

          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-aqua-500 to-teal-glow mx-auto mt-8 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.75 }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Service Grid — 2-col on mobile, 4-col on desktop */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
          role="list"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              role="listitem"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
            >
              <motion.button
                className="relative w-full text-left glass-card rounded-xl md:rounded-2xl p-3.5 md:p-6 h-full cursor-pointer overflow-hidden hover:border-aqua-500/32 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-aqua-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openService(index)}
                aria-haspopup="dialog"
                aria-label={`${service.title} — ${service.price}. Click for details`}
              >
                {/* Colored top bar — always slightly visible, brightens on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-30 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl md:rounded-t-2xl`}
                  aria-hidden="true"
                />

                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-400 rounded-xl md:rounded-2xl`}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  aria-hidden="true"
                >
                  <service.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-sm md:text-base font-heading font-bold text-white mb-1.5 md:mb-2 group-hover:text-aqua-300 transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs md:text-sm text-white/55 mb-3 md:mb-5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {service.desc}
                </p>

                {/* Price + arrow */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[0.65rem] md:text-xs font-semibold text-aqua-400 bg-aqua-500/10 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-aqua-500/15">
                    {service.price}
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/25 group-hover:text-aqua-400 group-hover:translate-x-1 transition-all"
                    aria-hidden="true"
                  />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={() => onNavigate('booking')}
            className="inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold text-lg rounded-2xl glow-button cursor-pointer shadow-lg shadow-aqua-500/22"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Schedule Any Service
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {expandedService !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={services[expandedService].title}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
              onClick={closeService}
            />
            <motion.div
              className="relative glass-card rounded-3xl p-8 max-w-lg w-full shadow-2xl"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            >
              <button
                onClick={closeService}
                className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/5 hover:bg-white/12 flex items-center justify-center text-white/45 hover:text-white transition-all cursor-pointer"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const service = services[expandedService];
                return (
                  <>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
                      aria-hidden="true"
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-aqua-400 font-semibold text-sm mb-5">{service.price}</p>
                    <p className="text-white/70 leading-relaxed mb-7">{service.details}</p>
                    <motion.button
                      onClick={() => {
                        closeService();
                        onNavigate('booking');
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold rounded-xl glow-button cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book This Service
                    </motion.button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
