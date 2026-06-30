import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertTriangle, Clock, Zap, ShieldCheck, MapPin, Send } from 'lucide-react';

const emergencyTypes = [
  'Burst Pipes', 'Flooding', 'Sewage Backup', 'Gas Leaks',
  'No Hot Water', 'Frozen Pipes', 'Overflowing Toilet', 'Major Leaks',
];

const features = [
  { icon: Clock, title: '30-Min Response', desc: 'Guaranteed arrival' },
  { icon: Zap, title: 'Instant Diagnosis', desc: 'On-site assessment' },
  { icon: ShieldCheck, title: 'No Hidden Fees', desc: 'Transparent pricing' },
  { icon: MapPin, title: 'Local Teams', desc: 'Citywide coverage' },
];

export default function EmergencySection() {
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', issue: '', urgency: 'high'
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="Emergency Plumbing Service">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <img src="/images/emergency-bg.jpg" alt="" className="w-full h-full object-cover opacity-12" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/92 to-navy-950" />
      </div>

      {/* Pulsing red ambient */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Emergency Header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/28 rounded-full mb-6"
            animate={{ scale: [1, 1.018, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AlertTriangle className="w-4 h-4 text-red-400" aria-hidden="true" />
            <span className="text-red-400 font-semibold text-sm">Emergency Service Available 24/7</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4">
            Plumbing
            <span className="text-red-400"> Emergency?</span>
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            Don't wait. Our emergency response team arrives within 30 minutes,
            24 hours a day, 7 days a week.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left: Emergency CTA + features */}
          <div className="space-y-5">
            {/* Main call button */}
            <motion.a
              href="tel:5551234567"
              className="block w-full p-7 bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/30 rounded-3xl text-center group hover:border-red-500/50 hover:from-red-500/25 hover:to-red-600/15 transition-all emergency-pulse"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Call our emergency line at 555-123-4567"
            >
              <Phone className="w-11 h-11 text-red-400 mx-auto mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <div className="text-3xl font-heading font-black text-white mb-2">
                (555) 123-4567
              </div>
              <div className="text-red-400 font-bold tracking-widest text-sm uppercase">
                Tap to Call Now
              </div>
              <div className="text-white/50 text-sm mt-2">Average response: 28 minutes</div>
            </motion.a>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="glass-card rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <feature.icon className="w-6 h-6 text-aqua-400 mx-auto mb-2" aria-hidden="true" />
                  <div className="text-sm font-bold text-white">{feature.title}</div>
                  <div className="text-xs text-white/55 mt-0.5">{feature.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Common emergencies */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-heading font-bold text-white mb-4">
                Common Emergencies We Handle
              </h3>
              <ul className="grid grid-cols-2 gap-2" role="list">
                {emergencyTypes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Quick Request Form */}
          <motion.div
            className="glass-card rounded-3xl p-6 md:p-8"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
          >
            <h3 className="text-xl font-heading font-bold text-white mb-1">
              Quick Emergency Request
            </h3>
            <p className="text-white/55 text-sm mb-6">We'll call you back within 5 minutes</p>

            {submitted ? (
              <motion.div
                className="text-center py-14"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                role="alert"
                aria-live="polite"
              >
                <div className="w-16 h-16 bg-green-500/18 border border-green-500/28 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-green-400" aria-hidden="true" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Request Submitted!</h4>
                <p className="text-white/60 text-sm">Our emergency team will contact you within 5 minutes.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                <div>
                  <label htmlFor="emergency-name" className="form-label">Full Name</label>
                  <input
                    id="emergency-name"
                    type="text"
                    placeholder="Jane Smith"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="emergency-phone" className="form-label">Phone Number</label>
                  <input
                    id="emergency-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="emergency-address" className="form-label">Service Address</label>
                  <input
                    id="emergency-address"
                    type="text"
                    placeholder="123 Main St, City"
                    required
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="emergency-urgency" className="form-label">Urgency Level</label>
                  <select
                    id="emergency-urgency"
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="form-input text-white/80"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="critical" className="bg-navy-900">🔴 Critical — Active flooding / gas leak</option>
                    <option value="high" className="bg-navy-900">🟠 High — Major leak / no water</option>
                    <option value="medium" className="bg-navy-900">🟡 Medium — Urgent but contained</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="emergency-issue" className="form-label">Describe the Emergency</label>
                  <textarea
                    id="emergency-issue"
                    placeholder="Brief description of the issue..."
                    required
                    rows={3}
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    className="form-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-base rounded-xl flex items-center justify-center gap-3 glow-button cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                >
                  <Send className="w-5 h-5" aria-hidden="true" />
                  {submitting ? 'Sending Request…' : 'Send Emergency Request'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
