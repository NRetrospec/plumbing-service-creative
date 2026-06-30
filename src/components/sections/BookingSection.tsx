import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, Wrench, User, Mail, Phone, FileText,
  CheckCircle2, ArrowRight, ArrowLeft, Droplets
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const services = [
  'Drain Cleaning', 'Leak Detection', 'Water Heater Repair', 'Pipe Replacement',
  'Sewer Line Repair', 'Emergency Plumbing', 'Bathroom Plumbing', 'Commercial Plumbing',
  'Water Filtration', 'Gas Line Service', 'Garbage Disposal', 'Other',
];

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

const steps = [
  { num: 1, label: 'Service', icon: Wrench },
  { num: 2, label: 'Schedule', icon: Calendar },
  { num: 3, label: 'Details', icon: User },
];

type Priority = 'normal' | 'urgent' | 'emergency';

const priorities: { value: Priority; label: string; color: string; dot: string }[] = [
  { value: 'normal', label: 'Standard', color: 'bg-green-500/10 border-green-500/25 text-green-400', dot: 'bg-green-400' },
  { value: 'urgent', label: 'Urgent', color: 'bg-yellow-500/10 border-yellow-500/25 text-yellow-400', dot: 'bg-yellow-400' },
  { value: 'emergency', label: 'Emergency', color: 'bg-red-500/10 border-red-500/25 text-red-400', dot: 'bg-red-400' },
];

export default function BookingSection() {
  const { addAppointment } = useStore();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    service: '',
    date: '',
    time: '',
    priority: 'normal' as Priority,
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const updateForm = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = () => {
    addAppointment({
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      date: form.date,
      time: form.time,
      notes: form.notes,
      priority: form.priority,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setSubmitted(true);
  };

  const canProceed = () => {
    if (step === 1) return form.service !== '';
    if (step === 2) return form.date !== '' && form.time !== '';
    if (step === 3) return form.name !== '' && form.email !== '' && form.phone !== '';
    return true;
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <section
        className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
        aria-label="Booking Confirmed"
      >
        <div className="absolute inset-0 liquid-bg" aria-hidden="true" />
        <motion.div
          className="relative z-10 text-center max-w-lg mx-auto px-4"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 22 }}
          role="alert"
          aria-live="polite"
        >
          <motion.div
            className="w-20 h-20 bg-green-500/18 border border-green-500/28 rounded-full flex items-center justify-center mx-auto mb-8"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <CheckCircle2 className="w-10 h-10 text-green-400" aria-hidden="true" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-white/65 text-lg mb-2">
            Your appointment has been scheduled successfully.
          </p>
          <div className="glass-card rounded-2xl p-6 mt-8 text-left space-y-3">
            {[
              ['Service', form.service],
              ['Date', form.date],
              ['Time', form.time],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-white/50 text-sm">{label}:</span>
                <span className="text-white font-medium text-sm">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Status:</span>
              <span className="text-yellow-400 font-medium text-sm">Pending Confirmation</span>
            </div>
          </div>
          <p className="text-white/35 text-sm mt-6">
            A confirmation email will be sent to {form.email}
          </p>
          <motion.button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm({ service: '', date: '', time: '', priority: 'normal', name: '', email: '', phone: '', notes: '' });
            }}
            className="mt-6 px-8 py-3 bg-aqua-500/10 border border-aqua-500/22 rounded-xl text-aqua-400 font-medium hover:bg-aqua-500/18 transition-all cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            Book Another Service
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="Book a Service">
      <div className="absolute inset-0 liquid-bg" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
        >
          <span className="section-label mb-5">Book Now</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-4 mt-5">
            Schedule Your
            <br />
            <span className="shimmer-text">Service Today</span>
          </h2>
          <p className="text-white/65 max-w-md mx-auto">
            Complete your booking in 3 simple steps. Same-day service available.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <nav aria-label="Booking progress" className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    isDone
                      ? 'bg-aqua-500/15 border-aqua-500/25 text-aqua-400'
                      : isActive
                      ? 'bg-aqua-500/18 border-aqua-500/32 text-aqua-400'
                      : 'bg-white/4 border-white/10 text-white/35'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <s.icon className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                  <span className="text-xs font-bold sm:hidden">{s.num}</span>
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 md:w-14 h-px transition-colors ${step > s.num ? 'bg-aqua-500/45' : 'bg-white/10'}`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-6 md:p-10">
          <AnimatePresence mode="wait">

            {/* Step 1: Choose Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ type: 'spring', damping: 28 }}
              >
                <h3 className="text-lg font-heading font-bold text-white mb-6 flex items-center gap-2.5">
                  <Wrench className="w-5 h-5 text-aqua-400" aria-hidden="true" />
                  Select a Service
                </h3>

                <fieldset>
                  <legend className="sr-only">Choose a service type</legend>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {services.map((service) => (
                      <motion.button
                        key={service}
                        type="button"
                        role="radio"
                        aria-checked={form.service === service}
                        onClick={() => updateForm('service', service)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          form.service === service
                            ? 'bg-aqua-500/18 border-aqua-500/42 text-aqua-400'
                            : 'bg-white/4 border-white/10 text-white/65 hover:bg-white/8 hover:border-white/18 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Droplets className="w-4 h-4 mb-2 opacity-55" aria-hidden="true" />
                        <div className="text-sm font-medium leading-snug">{service}</div>
                      </motion.button>
                    ))}
                  </div>
                </fieldset>

                {/* Priority */}
                <div className="mt-6">
                  <fieldset>
                    <legend className="form-label mb-3">Priority Level</legend>
                    <div className="flex gap-2.5">
                      {priorities.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          role="radio"
                          aria-checked={form.priority === p.value}
                          onClick={() => updateForm('priority', p.value)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                            form.priority === p.value ? p.color : 'bg-white/4 border-white/10 text-white/40'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${form.priority === p.value ? p.dot : 'bg-white/25'}`} aria-hidden="true" />
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ type: 'spring', damping: 28 }}
              >
                <h3 className="text-lg font-heading font-bold text-white mb-6 flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-aqua-400" aria-hidden="true" />
                  Choose Date & Time
                </h3>

                <div className="mb-6">
                  <label htmlFor="booking-date" className="form-label">Preferred Date</label>
                  <input
                    id="booking-date"
                    type="date"
                    min={getMinDate()}
                    value={form.date}
                    onChange={(e) => updateForm('date', e.target.value)}
                    className="form-input [color-scheme:dark]"
                    required
                  />
                </div>

                <div>
                  <fieldset>
                    <legend className="form-label mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      Available Time Slots
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          type="button"
                          role="radio"
                          aria-checked={form.time === time}
                          onClick={() => updateForm('time', time)}
                          className={`py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                            form.time === time
                              ? 'bg-aqua-500/18 border-aqua-500/42 text-aqua-400'
                              : 'bg-white/4 border-white/10 text-white/65 hover:bg-white/8 hover:border-white/18'
                          }`}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ type: 'spring', damping: 28 }}
              >
                <h3 className="text-lg font-heading font-bold text-white mb-6 flex items-center gap-2.5">
                  <User className="w-5 h-5 text-aqua-400" aria-hidden="true" />
                  Your Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="booking-name" className="form-label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/28" aria-hidden="true" />
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="Jane Smith"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        className="form-input pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="form-label">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/28" aria-hidden="true" />
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="jane@example.com"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="form-input pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="form-label">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/28" aria-hidden="true" />
                      <input
                        id="booking-phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        required
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="form-input pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-notes" className="form-label">Additional Notes <span className="text-white/35">(optional)</span></label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-white/28" aria-hidden="true" />
                      <textarea
                        id="booking-notes"
                        placeholder="Any details about your issue..."
                        rows={3}
                        value={form.notes}
                        onChange={(e) => updateForm('notes', e.target.value)}
                        className="form-input pl-11 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary panel */}
                <div className="mt-6 glass-card-light rounded-xl p-4 space-y-2.5" aria-label="Booking summary">
                  <h4 className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-3">Booking Summary</h4>
                  {[
                    ['Service', form.service],
                    ['Date', form.date],
                    ['Time', form.time],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-white/45">{label}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm">
                    <span className="text-white/45">Priority:</span>
                    <span className={`font-medium ${
                      form.priority === 'emergency' ? 'text-red-400'
                        : form.priority === 'urgent' ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}>
                      {form.priority.charAt(0).toUpperCase() + form.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/6">
            {step > 1 ? (
              <motion.button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all cursor-pointer text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </motion.button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <motion.button
                type="button"
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-7 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  canProceed()
                    ? 'bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 glow-button shadow-md shadow-aqua-500/20'
                    : 'bg-white/5 text-white/25 cursor-not-allowed'
                }`}
                whileHover={canProceed() ? { scale: 1.03 } : {}}
                whileTap={canProceed() ? { scale: 0.97 } : {}}
                aria-disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={() => canProceed() && handleSubmit()}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-base transition-all cursor-pointer ${
                  canProceed()
                    ? 'bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 glow-button shadow-lg shadow-aqua-500/22'
                    : 'bg-white/5 text-white/25 cursor-not-allowed'
                }`}
                whileHover={canProceed() ? { scale: 1.03 } : {}}
                whileTap={canProceed() ? { scale: 0.97 } : {}}
                aria-disabled={!canProceed()}
              >
                Confirm Booking
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
