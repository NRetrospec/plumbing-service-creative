import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 6000);
    }, 800);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(555) 123-4567',
      subtext: 'Call or text anytime',
      href: 'tel:5551234567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@aquaflowpro.com',
      subtext: 'Reply within 2 hours',
      href: 'mailto:info@aquaflowpro.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Flow Street, Suite 100',
      subtext: 'Service throughout the metro area',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon–Sat: 7 AM – 8 PM',
      subtext: 'Emergency service 24/7',
      href: '#',
    },
  ];

  const serviceAreas = [
    'Downtown', 'Midtown', 'Uptown', 'Westside', 'Eastside', 'Northshore',
    'Southpoint', 'Riverside', 'Lakewood', 'Highland', 'Oakwood', 'Fairview',
  ];

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'quote', label: 'Request a Quote' },
    { value: 'service', label: 'Service Question' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'partnership', label: 'Partnership' },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="Contact Us">
      <div className="absolute inset-0 liquid-bg" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <span className="section-label mb-5">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-4 mt-5">
            Get In
            <span className="shimmer-text"> Touch</span>
          </h2>
          <p className="text-white/65 max-w-xl mx-auto leading-relaxed">
            Ready for premium plumbing service? Reach out today for a free consultation
            and same-day scheduling.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-7">

          {/* Left: Contact info */}
          <aside className="lg:col-span-2 space-y-3">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                className="flex items-start gap-4 glass-card rounded-xl p-5 hover:border-aqua-500/28 transition-all"
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                aria-label={`${info.label}: ${info.value}`}
              >
                <div className="w-10 h-10 rounded-lg bg-aqua-500/10 border border-aqua-500/15 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-aqua-400" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs text-white/45 font-medium uppercase tracking-wider mb-0.5">{info.label}</div>
                  <div className="text-white font-semibold text-sm">{info.value}</div>
                  <div className="text-white/50 text-xs mt-0.5">{info.subtext}</div>
                </div>
              </motion.a>
            ))}

            {/* Service areas */}
            <motion.div
              className="glass-card rounded-xl p-5"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-white font-heading font-bold text-sm mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-aqua-400" aria-hidden="true" />
                Service Areas
              </h3>
              <div className="flex flex-wrap gap-1.5" role="list">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    role="listitem"
                    className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-xs text-white/60"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </aside>

          {/* Right: Contact Form */}
          <motion.div
            className="lg:col-span-3 glass-card rounded-3xl p-6 md:p-9"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-heading font-bold text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-aqua-400" aria-hidden="true" />
              Send Us a Message
            </h3>
            <p className="text-white/55 text-sm mb-7">We respond within 2 hours during business hours</p>

            {sent ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                role="alert"
                aria-live="polite"
              >
                <div className="w-16 h-16 bg-green-500/18 border border-green-500/28 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400" aria-hidden="true" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-white/60 text-sm">We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="form-label">Full Name</label>
                    <input
                      id="contact-name"
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
                    <label htmlFor="contact-email" className="form-label">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="form-label">
                      Phone Number <span className="text-white/35">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="form-label">Subject</label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input text-white/75"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-navy-900">Select a subject…</option>
                      {subjects.map(({ value, label }) => (
                        <option key={value} value={value} className="bg-navy-900">{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Tell us how we can help you…"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold text-base rounded-xl flex items-center justify-center gap-3 glow-button cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-aqua-500/20"
                  whileHover={!sending ? { scale: 1.02 } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                >
                  <Send className="w-5 h-5" aria-hidden="true" />
                  {sending ? 'Sending…' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
