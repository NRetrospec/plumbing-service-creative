import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Award, ThumbsUp } from 'lucide-react';

const reviews = [
  {
    name: 'Jennifer Hayes',
    rating: 5,
    text: 'AquaFlow Pro completely transformed our bathroom plumbing. The team was professional, clean, and finished ahead of schedule. Their attention to detail is unmatched!',
    service: 'Bathroom Renovation',
    date: 'January 2026',
    initials: 'JH',
  },
  {
    name: 'Robert Kim',
    rating: 5,
    text: 'Had a burst pipe at 2 AM and they were at our door within 25 minutes. Saved us from thousands in water damage. These guys are true professionals.',
    service: 'Emergency Repair',
    date: 'December 2025',
    initials: 'RK',
  },
  {
    name: 'Amanda Torres',
    rating: 5,
    text: 'Best plumbing experience ever. They used camera technology to find our hidden leak without tearing up the walls. Modern approach, fair pricing, amazing results.',
    service: 'Leak Detection',
    date: 'November 2025',
    initials: 'AT',
  },
  {
    name: 'David Chen',
    rating: 5,
    text: 'Installed a new tankless water heater. The installer explained everything, cleaned up after, and even gave tips on maintenance. Will use again for sure!',
    service: 'Water Heater Install',
    date: 'October 2025',
    initials: 'DC',
  },
  {
    name: 'Lisa Patel',
    rating: 5,
    text: 'Our commercial property needed a complete plumbing overhaul. AquaFlow managed the entire project seamlessly, keeping our business running throughout. Exceptional.',
    service: 'Commercial Plumbing',
    date: 'September 2025',
    initials: 'LP',
  },
  {
    name: 'Michael Brown',
    rating: 4,
    text: 'Great drain cleaning service. They were thorough and the price was exactly what was quoted. My kitchen drain has never worked better. Highly recommend!',
    service: 'Drain Cleaning',
    date: 'August 2025',
    initials: 'MB',
  },
];

const trustBadges = [
  { icon: Star, label: '4.9 / 5.0', desc: 'Average Rating' },
  { icon: ThumbsUp, label: '2,847', desc: 'Verified Reviews' },
  { icon: Award, label: '#1 Rated', desc: 'In the Region' },
  { icon: ShieldCheck, label: 'Verified', desc: 'Business' },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of ${max} stars`}>
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => navigate(1), 6500);
    return () => clearInterval(timer);
  }, [isPaused, navigate]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 280 : -280, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -280 : 280, opacity: 0, scale: 0.96 }),
  };

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="Customer Reviews">
      <div className="absolute inset-0 liquid-bg" aria-hidden="true" />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua-500/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label mb-5">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 mt-5">
            What Our Clients
            <br />
            <span className="shimmer-text">Are Saying</span>
          </h2>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              className="glass-card rounded-xl p-4 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <badge.icon className="w-5 h-5 text-aqua-400 mx-auto mb-1.5" aria-hidden="true" />
              <div className="text-lg font-bold text-white">{badge.label}</div>
              <div className="text-xs text-white/55">{badge.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main carousel */}
        <div
          className="relative max-w-4xl mx-auto mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Live region for screen readers */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            Review {current + 1} of {reviews.length}: {reviews[current].name} — {reviews[current].text}
          </div>

          <div className="overflow-hidden rounded-3xl" style={{ minHeight: '280px' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.article
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                className="glass-card rounded-3xl p-8 md:p-12"
                aria-label={`Review by ${reviews[current].name}`}
              >
                <Quote className="w-9 h-9 text-aqua-500/25 mb-6" aria-hidden="true" />
                <blockquote>
                  <p className="text-lg md:text-xl text-white/82 leading-relaxed mb-8 italic font-light">
                    "{reviews[current].text}"
                  </p>
                </blockquote>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-aqua-500/30 to-teal-glow/20 border border-aqua-500/22 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <span className="text-base font-bold text-aqua-400">{reviews[current].initials}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{reviews[current].name}</div>
                      <div className="text-white/50 text-xs mt-0.5">{reviews[current].service}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <StarRating rating={reviews[current].rating} />
                    <div className="text-white/35 text-xs">{reviews[current].date}</div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-7" role="group" aria-label="Review navigation">
            <motion.button
              onClick={() => navigate(-1)}
              className="p-2.5 glass-card rounded-full hover:border-aqua-500/35 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-white/65" />
            </motion.button>

            <div className="flex gap-2" role="tablist" aria-label="Jump to review">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Review ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === current
                      ? 'w-7 bg-aqua-400'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => navigate(1)}
              className="p-2.5 glass-card rounded-full hover:border-aqua-500/35 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-white/65" />
            </motion.button>
          </div>
        </div>

        {/* Mini review cards — hidden on mobile to reduce scroll clutter */}
        <div className="hidden sm:grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {reviews.slice(3, 6).map((review, i) => (
            <motion.div
              key={review.name}
              className="glass-card rounded-xl p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-white/65 mb-3 line-clamp-3 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-aqua-500/20 border border-aqua-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[0.625rem] font-bold text-aqua-400">{review.initials}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{review.name}</div>
                  <div className="text-[0.65rem] text-white/45">{review.service}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
