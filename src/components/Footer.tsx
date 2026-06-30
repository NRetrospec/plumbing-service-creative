import { motion } from 'framer-motion';
import { Droplets, Phone, Mail, MapPin, Clock, Globe, MessageCircle, Share2, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const quickLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'About Us', id: 'about' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Book Service', id: 'booking' },
  { label: 'Contact', id: 'contact' },
];

const serviceLinks = [
  'Drain Cleaning', 'Leak Detection', 'Water Heater', 'Pipe Replacement',
  'Sewer Repair', 'Emergency 24/7',
];

const contactDetails = [
  { icon: Phone, text: '(555) 123-4567' },
  { icon: Mail, text: 'info@aquaflowpro.com' },
  { icon: MapPin, text: '123 Flow St, Suite 100' },
  { icon: Clock, text: 'Mon–Sat 7 AM – 8 PM' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer role="contentinfo" className="relative bg-navy-950/95 backdrop-blur-xl">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua-500/20 to-transparent" aria-hidden="true" />

      {/* Emergency strip */}
      <div className="bg-gradient-to-r from-red-500/12 via-red-500/8 to-red-500/12 border-b border-red-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/18 border border-red-500/28 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-400" aria-hidden="true" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm">Plumbing Emergency?</span>
                <span className="text-white/55 text-sm ml-2">We respond in 30 minutes, 24/7.</span>
              </div>
            </div>
            <motion.a
              href="tel:5551234567"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-red-500/18 border border-red-500/30 rounded-full text-red-400 font-semibold text-sm hover:bg-red-500/25 hover:border-red-500/45 transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Call emergency line: 555-123-4567"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              (555) 123-4567
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand column */}
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 mb-5 group cursor-pointer"
              aria-label="AquaFlow Pro — Go home"
            >
              <div className="w-9 h-9 rounded-xl bg-aqua-500/12 border border-aqua-500/22 flex items-center justify-center group-hover:border-aqua-500/40 transition-colors">
                <Droplets className="w-5 h-5 text-aqua-400" aria-hidden="true" />
              </div>
              <div className="leading-none">
                <span className="text-base font-heading font-bold text-white block">AquaFlow</span>
                <span className="text-[0.625rem] font-semibold tracking-widest text-aqua-400 uppercase">Pro Plumbing</span>
              </div>
            </button>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              Premium plumbing solutions engineered for the modern home.
              Precision, reliability, and excellence in every job.
            </p>
            <div className="flex gap-2.5" aria-label="Social media links">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-aqua-400 hover:border-aqua-500/22 transition-all"
                  aria-label={['Website', 'Chat', 'Share'][i]}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick navigation links">
            <h3 className="text-xs font-heading font-bold text-white mb-5 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-sm text-white/55 hover:text-aqua-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Service links">
            <h3 className="text-xs font-heading font-bold text-white mb-5 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(s => (
                <li key={s}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-sm text-white/55 hover:text-aqua-400 transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-heading font-bold text-white mb-5 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              {contactDetails.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-aqua-400/55 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-white/55">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            &copy; 2026 AquaFlow Pro Plumbing. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <div className="flex gap-5">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
                <button
                  key={item}
                  className="text-xs text-white/35 hover:text-white/65 transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
