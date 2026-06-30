import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Calendar, ThumbsUp, CheckCircle2 } from 'lucide-react';

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Calendar, value: 15, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 5000, suffix: '+', label: 'Happy Customers' },
  { icon: ThumbsUp, value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { icon: Award, value: 25, suffix: '+', label: 'Awards Won' },
];

const timeline = [
  { year: '2010', title: 'Founded', desc: 'AquaFlow Pro started with a vision to modernize plumbing services for the modern home.' },
  { year: '2014', title: 'Expansion', desc: 'Grew to 15 certified technicians serving the entire metropolitan area.' },
  { year: '2018', title: 'Innovation', desc: 'Introduced smart leak detection and high-pressure hydro-jetting technology.' },
  { year: '2022', title: 'Recognition', desc: 'Named #1 plumbing service in the region for 3 consecutive years running.' },
  { year: '2025', title: 'Digital Era', desc: 'Launched customer portal and real-time technician tracking platform.' },
];

const certifications = [
  'Master Plumber Licensed',
  'EPA Certified',
  'OSHA Safety Certified',
  'BBB A+ Rating',
  'Angi Super Service',
  'HomeAdvisor Top Rated',
];

const teamMembers = [
  { name: 'Marcus Reynolds', role: 'Founder & Master Plumber', exp: '20+ yrs' },
  { name: 'Sarah Chen', role: 'Operations Director', exp: '12+ yrs' },
  { name: 'David Martinez', role: 'Lead Technician', exp: '15+ yrs' },
  { name: 'Emily Thompson', role: 'Customer Success', exp: '8+ yrs' },
];

export default function AboutSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="About AquaFlow Pro">
      <div className="absolute inset-0" aria-hidden="true">
        <img src="/images/about-bg.jpg" alt="" className="w-full h-full object-cover opacity-8" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/96 to-navy-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label mb-5">About Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 mt-5">
            Building Trust
            <br />
            <span className="shimmer-text">Drop by Drop</span>
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            For over 15 years, AquaFlow Pro has been the gold standard in plumbing excellence,
            combining cutting-edge technology with old-fashioned craftsmanship.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center group hover:border-aqua-500/28 transition-all"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <stat.icon className="w-7 h-7 text-aqua-400 mx-auto mb-3" aria-hidden="true" />
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl md:text-3xl font-heading font-bold text-white text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h3>

          <div className="relative" role="list" aria-label="Company timeline">
            {/* Vertical timeline line */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-aqua-500/45 via-aqua-500/18 to-transparent"
              aria-hidden="true"
            />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                role="listitem"
                className={`relative flex items-start mb-9 md:mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <div className="glass-card rounded-xl p-5 inline-block max-w-sm">
                    <div className="text-aqua-400 font-heading font-bold text-lg mb-1">{item.year}</div>
                    <div className="text-white font-semibold mb-1.5">{item.title}</div>
                    <div className="text-white/62 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-aqua-400 rounded-full border-2 border-navy-950 mt-2 z-10"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-aqua-400 rounded-full animate-ping opacity-25" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl md:text-3xl font-heading font-bold text-white text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {teamMembers.map((member, i) => (
              <motion.article
                key={member.name}
                className="glass-card rounded-2xl p-6 text-center group hover:border-aqua-500/28 transition-all"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-aqua-500/22 to-teal-glow/12 border border-aqua-500/22 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-xl font-heading font-bold text-aqua-400">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-base font-heading font-bold text-white mb-1">{member.name}</h4>
                <p className="text-aqua-400 text-xs font-semibold mb-1">{member.role}</p>
                <p className="text-white/50 text-xs">{member.exp} experience</p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-heading font-bold text-white mb-8">
            Certifications &amp; Awards
          </h3>
          <div className="flex flex-wrap justify-center gap-3" role="list">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                role="listitem"
                className="flex items-center gap-2 px-4 py-2 bg-aqua-500/10 border border-aqua-500/18 rounded-full"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.04 }}
              >
                <CheckCircle2 className="w-4 h-4 text-aqua-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-white/82 font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
