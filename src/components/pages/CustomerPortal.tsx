import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, FileText, Clock, Upload,
  Download, MapPin, CheckCircle2, User, ArrowLeft
} from 'lucide-react';
import { useStore } from '../../store/useStore';

interface CustomerPortalProps {
  onNavigate: (page: string) => void;
}

export default function CustomerPortal({ onNavigate }: CustomerPortalProps) {
  const { appointments } = useStore();
  const [activeTab, setActiveTab] = useState('appointments');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  const customerAppointments = appointments.filter(
    a => a.email.toLowerCase() === loginEmail.toLowerCase()
  );

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'tracking', label: 'Track Technician', icon: MapPin },
    { id: 'history', label: 'Service History', icon: Clock },
    { id: 'upload', label: 'Upload Photos', icon: Upload },
  ];

  if (!isLoggedIn) {
    return (
      <section className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
        <div className="absolute inset-0 liquid-bg" />
        <motion.div
          className="relative z-10 w-full max-w-md mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass-card rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-aqua-500/10 border border-aqua-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-aqua-400" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">Customer Portal</h2>
              <p className="text-white/40 text-sm">Enter your email to view your appointments</p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-aqua-500/50 transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                defaultValue="demo"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-aqua-500/50 transition-colors"
              />
              <motion.button
                onClick={() => setIsLoggedIn(true)}
                className="w-full py-3 bg-gradient-to-r from-aqua-500 to-teal-glow text-navy-950 font-bold rounded-xl glow-button cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
              <p className="text-center text-white/30 text-xs">
                Demo: Use any email from existing appointments (e.g., john@example.com)
              </p>
            </div>

            <motion.button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-white/40 hover:text-white text-sm mt-6 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </motion.button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 liquid-bg" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-black text-white">My Portal</h1>
            <p className="text-white/40 text-sm">{loginEmail}</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 glass-card rounded-lg text-sm text-white/60 hover:text-white cursor-pointer"
            >
              Home
            </motion.button>
            <motion.button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 glass-card rounded-lg text-sm text-white/60 hover:text-red-400 cursor-pointer"
            >
              Sign Out
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto scrollbar-hide p-1 glass-card rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-aqua-500/20 text-aqua-400'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {customerAppointments.length > 0 ? (
                  customerAppointments.map(apt => (
                    <motion.div key={apt.id} className="glass-card rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white">{apt.service}</h3>
                          <p className="text-white/40 text-sm mt-1">{apt.date} at {apt.time}</p>
                          {apt.notes && <p className="text-white/30 text-sm mt-2">📝 {apt.notes}</p>}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          apt.status === 'confirmed' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                          apt.status === 'completed' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
                          apt.status === 'pending' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                          'text-red-400 bg-red-500/10 border-red-500/20'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-16 glass-card rounded-2xl">
                    <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40 mb-4">No appointments found for this email</p>
                    <motion.button
                      onClick={() => onNavigate('booking')}
                      className="px-6 py-2 bg-aqua-500/10 border border-aqua-500/20 rounded-xl text-aqua-400 text-sm cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                    >
                      Book Your First Appointment
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'invoices' && (
            <motion.div
              key="invoices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-6">Invoices</h3>
                {[
                  { id: 'INV-001', date: '2026-01-10', service: 'Drain Cleaning', amount: '$199', status: 'Paid' },
                  { id: 'INV-002', date: '2026-01-15', service: 'Leak Detection', amount: '$249', status: 'Pending' },
                ].map(inv => (
                  <div key={inv.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-3">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-aqua-400" />
                      <div>
                        <div className="text-sm font-medium text-white">{inv.id} - {inv.service}</div>
                        <div className="text-xs text-white/40">{inv.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white font-semibold">{inv.amount}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        inv.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {inv.status}
                      </span>
                      <button className="text-aqua-400 hover:text-aqua-300 cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'tracking' && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-aqua-500/5 border border-aqua-500/10 flex items-center justify-center relative">
                  <MapPin className="w-12 h-12 text-aqua-400" />
                  <motion.div
                    className="absolute inset-0 border-2 border-aqua-500/20 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Technician Tracking</h3>
                <p className="text-white/40 mb-4">Real-time tracking available when a technician is en route</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm">
                  <Clock className="w-4 h-4" />
                  No active service calls
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-6">Service History</h3>
                {customerAppointments.filter(a => a.status === 'completed').length > 0 ? (
                  customerAppointments.filter(a => a.status === 'completed').map(apt => (
                    <div key={apt.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{apt.service}</div>
                        <div className="text-xs text-white/40">{apt.date}</div>
                      </div>
                      <span className="text-green-400 text-xs">Completed</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-white/30">
                    <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No completed services yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-2">Upload Photos/Videos</h3>
                <p className="text-white/40 text-sm mb-6">Share images of your plumbing issue to help us prepare</p>
                
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-aqua-500/30 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50 mb-2">Drag & drop files here</p>
                  <p className="text-white/30 text-sm mb-4">or</p>
                  <button className="px-6 py-2 bg-aqua-500/10 border border-aqua-500/20 rounded-xl text-aqua-400 text-sm cursor-pointer hover:bg-aqua-500/20 transition-colors">
                    Browse Files
                  </button>
                  <p className="text-white/20 text-xs mt-4">Supports: JPG, PNG, MP4 (Max 50MB)</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
