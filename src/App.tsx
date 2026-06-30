import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import WaterBackground from './components/WaterBackground';
import WaterTransition from './components/WaterTransition';
import Navigation from './components/Navigation';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import EmergencySection from './components/sections/EmergencySection';
import AboutSection from './components/sections/AboutSection';
import ReviewsSection from './components/sections/ReviewsSection';
import BookingSection from './components/sections/BookingSection';
import ContactSection from './components/sections/ContactSection';
import AdminDashboard from './components/pages/AdminDashboard';
import CustomerPortal from './components/pages/CustomerPortal';
import Footer from './components/Footer';
import { Droplets, Lock, MessageCircle, X, Send, ChevronUp, Phone, ArrowRight } from 'lucide-react';

type Page = 'home' | 'services' | 'emergency' | 'about' | 'reviews' | 'booking' | 'contact' | 'admin' | 'portal';

const BOT_REPLIES: Record<string, string> = {
  emergency: '🚨 For emergencies, call us immediately at (555) 123-4567. We have 24/7 service with a 30-minute response guarantee!',
  urgent: '🚨 For emergencies, call us immediately at (555) 123-4567. We have 24/7 service with a 30-minute response guarantee!',
  price: '💰 We offer free estimates! Standard services start from $99. Would you like to schedule a free consultation?',
  cost: '💰 We offer free estimates! Standard services start from $99. Would you like to schedule a free consultation?',
  quote: '💰 We offer free estimates! Standard services start from $99. Would you like to schedule a free consultation?',
  book: '📅 You can book directly on our site — just click "Book Service" in the navigation. Need a hand? I can walk you through it!',
  appoint: '📅 You can book directly on our site — just click "Book Service" in the navigation. Need a hand? I can walk you through it!',
  schedule: '📅 You can book directly on our site — just click "Book Service" in the navigation. Need a hand? I can walk you through it!',
  hours: '🕐 We\'re open Mon–Sat 7 AM–8 PM. Emergency service is available 24/7!',
  open: '🕐 We\'re open Mon–Sat 7 AM–8 PM. Emergency service is available 24/7!',
};

function getBotReply(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, reply] of Object.entries(BOT_REPLIES)) {
    if (lower.includes(key)) return reply;
  }
  return 'Thanks for your message! Our team will get back to you shortly. For immediate help, call (555) 123-4567.';
}

export default function App() {
  const { isTransitioning, setTransitioning, isAdminLoggedIn, setAdminLoggedIn } = useStore();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: string; text: string }[]>([
    { from: 'bot', text: 'Hi! Welcome to AquaFlow Pro. How can I help you today?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const navigateTo = useCallback((page: string) => {
    if (page === currentPage) return;

    if (page === 'admin' && !isAdminLoggedIn) {
      setShowAdminLogin(true);
      return;
    }

    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page as Page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setTransitioning(false), 600);
    }, 400);
  }, [currentPage, isAdminLoggedIn, setTransitioning]);

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123' || adminPassword === 'demo') {
      setAdminLoggedIn(true);
      setAdminError(false);
      setShowAdminLogin(false);
      setAdminPassword('');
      navigateTo('admin');
    } else {
      setAdminError(true);
      setTimeout(() => setAdminError(false), 3000);
    }
  };

  const handleChatSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages(prev => [...prev, { from: 'user', text }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { from: 'bot', text: getBotReply(text) }]);
    }, 900);
  };

  const isSpecialPage = currentPage === 'admin' || currentPage === 'portal';

  const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <div className="relative min-h-screen bg-navy-950 text-white overflow-x-hidden">
      <WaterBackground />
      <WaterTransition isActive={isTransitioning} />

      {!isSpecialPage && (
        <Navigation onNavigate={navigateTo} currentPage={currentPage} />
      )}

      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'home' && (
              <>
                <HeroSection onNavigate={navigateTo} />
                <SectionDivider />
                <ServicesSection onNavigate={navigateTo} />
                <SectionDivider />
                <ReviewsSection />
                <SectionDivider />
                <EmergencySection />
                <SectionDivider />
                <CTABanner onNavigate={navigateTo} />
              </>
            )}
            {currentPage === 'services' && <ServicesSection onNavigate={navigateTo} />}
            {currentPage === 'emergency' && <EmergencySection />}
            {currentPage === 'about' && <AboutSection />}
            {currentPage === 'reviews' && <ReviewsSection />}
            {currentPage === 'booking' && <BookingSection />}
            {currentPage === 'contact' && <ContactSection />}
            {currentPage === 'admin' && (
              <AdminDashboard
                onLogout={() => { setAdminLoggedIn(false); navigateTo('home'); }}
                onNavigate={navigateTo}
              />
            )}
            {currentPage === 'portal' && <CustomerPortal onNavigate={navigateTo} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {!isSpecialPage && <Footer onNavigate={navigateTo} />}

      {/* Portal & Admin quick access — stacked above chat button, right side */}
      {!isSpecialPage && (
        <div className="fixed bottom-24 right-5 z-[80] flex flex-col gap-1.5 items-end">
          <motion.button
            onClick={() => navigateTo('portal')}
            className="px-3 py-1.5 glass-card rounded-full text-[0.7rem] text-white/38 hover:text-aqua-400 hover:border-aqua-500/25 transition-all cursor-pointer flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to Customer Portal"
          >
            <Droplets className="w-2.5 h-2.5" aria-hidden="true" />
            Portal
          </motion.button>
          <motion.button
            onClick={() => { if (isAdminLoggedIn) navigateTo('admin'); else setShowAdminLogin(true); }}
            className="px-3 py-1.5 glass-card rounded-full text-[0.7rem] text-white/22 hover:text-white/50 hover:border-white/18 transition-all cursor-pointer flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isAdminLoggedIn ? 'Go to Admin Dashboard' : 'Admin Login'}
          >
            <Lock className="w-2.5 h-2.5" aria-hidden="true" />
            Admin
          </motion.button>
        </div>
      )}

      {/* Chat Widget */}
      <div className="fixed bottom-5 right-5 z-[90]">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              role="dialog"
              aria-label="AquaFlow Pro chat support"
              aria-modal="false"
              className="absolute bottom-[4.5rem] right-0 w-[22rem] sm:w-96 glass-card rounded-2xl overflow-hidden shadow-2xl shadow-navy-950/60"
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.92 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            >
              {/* Chat header */}
              <div className="bg-gradient-to-r from-aqua-500 to-teal-glow px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-navy-950/25 rounded-full flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-navy-950">AquaFlow Assistant</div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full" aria-hidden="true" />
                        <span className="text-xs text-navy-950/65">Online now</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-navy-950/55 hover:text-navy-950 cursor-pointer p-1 rounded-lg hover:bg-navy-950/12 transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-hide"
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
              >
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.from === 'user'
                          ? 'bg-aqua-500 text-navy-950 rounded-br-md font-medium'
                          : 'bg-white/8 text-white/82 rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/8">
                <div className="flex gap-2">
                  <label htmlFor="chat-input" className="sr-only">Type a message</label>
                  <input
                    id="chat-input"
                    type="text"
                    placeholder="Type a message…"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                    className="flex-1 px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-aqua-500/50 focus:ring-2 focus:ring-aqua-500/12 transition-all"
                    autoComplete="off"
                  />
                  <motion.button
                    onClick={handleChatSend}
                    className="p-2 bg-gradient-to-r from-aqua-500 to-teal-glow rounded-xl text-navy-950 cursor-pointer flex-shrink-0"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat toggle button */}
        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-gradient-to-r from-aqua-500 to-teal-glow rounded-full flex items-center justify-center shadow-xl shadow-aqua-500/28 cursor-pointer relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={!chatOpen ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2.2, repeat: !chatOpen ? Infinity : 0 }}
          aria-label={chatOpen ? 'Close chat' : 'Open chat support'}
          aria-expanded={chatOpen}
          aria-controls="chat-window"
        >
          <AnimatePresence mode="wait" initial={false}>
            {chatOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="w-6 h-6 text-navy-950" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageCircle className="w-6 h-6 text-navy-950" />
              </motion.span>
            )}
          </AnimatePresence>

          {!chatOpen && (
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold border-2 border-navy-950"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              aria-label="1 unread message"
            >
              1
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && !isSpecialPage && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-36 right-5 z-[80] w-10 h-10 glass-card rounded-full flex items-center justify-center text-white/45 hover:text-aqua-400 hover:border-aqua-500/25 cursor-pointer transition-colors"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top of page"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Admin Login"
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy-950/82 backdrop-blur-sm"
              onClick={() => { setShowAdminLogin(false); setAdminError(false); setAdminPassword(''); }}
            />
            <motion.div
              className="relative glass-card rounded-3xl p-8 w-full max-w-sm"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 26 }}
            >
              <button
                onClick={() => { setShowAdminLogin(false); setAdminError(false); setAdminPassword(''); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/12 flex items-center justify-center text-white/35 hover:text-white transition-all cursor-pointer"
                aria-label="Close admin login"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-7">
                <div className="w-14 h-14 bg-aqua-500/10 border border-aqua-500/22 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-aqua-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">Admin Access</h3>
                <p className="text-white/50 text-sm mt-1.5">Enter your admin password to continue</p>
              </div>

              <div className="mb-4">
                <label htmlFor="admin-password" className="form-label">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => { setAdminPassword(e.target.value); setAdminError(false); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  className={`form-input transition-all ${adminError ? 'border-red-500/50 bg-red-500/5 focus:border-red-500/60' : ''}`}
                  autoFocus
                  autoComplete="current-password"
                  aria-describedby={adminError ? 'admin-error' : undefined}
                />
                <AnimatePresence>
                  {adminError && (
                    <motion.p
                      id="admin-error"
                      role="alert"
                      className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Incorrect password. Try "admin123" or "demo".
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={handleAdminLogin}
                className="w-full py-3 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold rounded-xl glow-button cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
              <p className="text-center text-white/22 text-xs mt-4">
                Demo password: <code className="text-white/38">admin123</code>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────── Section Divider ───────── */
function SectionDivider() {
  return (
    <div className="relative h-px" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-aqua-500/22 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
        <motion.div
          className="w-2 h-2 bg-aqua-500/40 rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

/* ───────── CTA Banner ───────── */
function CTABanner({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Call to action">
      {/* Background treatment */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-aqua-500/8 via-teal-glow/5 to-aqua-500/8" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua-500/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-aqua-500/18 to-transparent" />
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[300px] bg-aqua-500/5 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label mb-6">Get Started Today</span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mt-6 mb-5 leading-tight">
            Ready for Premium
            <br />
            <span className="shimmer-text">Plumbing Service?</span>
          </h2>

          <p className="text-white/62 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of satisfied homeowners. Schedule your service today
            and experience the AquaFlow Pro difference.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => onNavigate('booking')}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold text-lg rounded-2xl glow-button cursor-pointer shadow-lg shadow-aqua-500/22 flex items-center justify-center gap-2.5"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Service Now
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </motion.button>

            <motion.a
              href="tel:5551234567"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 border border-white/12 rounded-2xl text-white/82 font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Call us at 555-123-4567"
            >
              <Phone className="w-5 h-5 text-aqua-400" aria-hidden="true" />
              Call (555) 123-4567
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
