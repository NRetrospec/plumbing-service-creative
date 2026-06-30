import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Users, TrendingUp, Bell,
  CheckCircle2, Clock, AlertTriangle, LogOut,
  Search, MoreVertical, Eye, Droplets
} from 'lucide-react';
import { useStore } from '../../store/useStore';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onLogout, onNavigate }: AdminDashboardProps) {
  const { appointments, updateAppointmentStatus, removeAppointment } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    emergency: appointments.filter(a => a.priority === 'emergency').length,
    revenue: appointments.filter(a => a.status === 'completed').length * 250,
  };

  const filteredAppointments = appointments.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'confirmed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'text-red-400';
      case 'urgent': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 liquid-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-black text-white">Admin Dashboard</h1>
            <p className="text-white/40 text-sm">Manage your plumbing business</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => onNavigate('home')}
              className="p-2 glass-card rounded-lg hover:border-aqua-500/30 transition-all cursor-pointer"
              whileTap={{ scale: 0.95 }}
              title="View Site"
            >
              <Eye className="w-5 h-5 text-white/60" />
            </motion.button>
            <motion.button
              className="p-2 glass-card rounded-lg hover:border-aqua-500/30 transition-all relative cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-white/60" />
              {stats.pending > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {stats.pending}
                </span>
              )}
            </motion.button>
            <motion.button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg hover:border-red-500/30 text-white/60 hover:text-red-400 transition-all cursor-pointer text-sm"
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                {[
                  { label: 'Total Jobs', value: stats.total, icon: Calendar, color: 'text-aqua-400' },
                  { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-400' },
                  { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: 'text-blue-400' },
                  { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-400' },
                  { label: 'Emergency', value: stats.emergency, icon: AlertTriangle, color: 'text-red-400' },
                  { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-400' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="glass-card rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent appointments */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-4">Recent Appointments</h3>
                <div className="space-y-3">
                  {appointments.slice(0, 5).map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(apt.priority)}`}>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(apt.priority)} ${apt.priority === 'emergency' ? 'animate-ping' : ''}`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{apt.name}</div>
                          <div className="text-xs text-white/40">{apt.service} • {apt.date}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search & Filter */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-aqua-500/50"
                  />
                </div>
              </div>

              {/* Appointment Cards */}
              <div className="space-y-3">
                {filteredAppointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    className="glass-card rounded-xl p-4 md:p-6"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-aqua-500/10 flex items-center justify-center shrink-0">
                          <Droplets className="w-5 h-5 text-aqua-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{apt.name}</span>
                            <span className={`text-xs font-medium ${getPriorityColor(apt.priority)}`}>
                              [{apt.priority}]
                            </span>
                          </div>
                          <div className="text-sm text-white/50 mt-1">{apt.service}</div>
                          <div className="text-xs text-white/30 mt-1">
                            {apt.date} at {apt.time} • {apt.email} • {apt.phone}
                          </div>
                          {apt.notes && (
                            <div className="text-xs text-white/40 mt-2 bg-white/5 rounded-lg px-3 py-2">
                              📝 {apt.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                        <div className="relative">
                          <button
                            onClick={() => setActionMenu(actionMenu === apt.id ? null : apt.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4 text-white/40" />
                          </button>
                          {actionMenu === apt.id && (
                            <motion.div
                              className="absolute right-0 top-full mt-1 w-44 glass-card rounded-xl p-1 z-50 shadow-xl"
                              initial={{ opacity: 0, scale: 0.9, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                            >
                              {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map(status => (
                                <button
                                  key={status}
                                  onClick={() => {
                                    updateAppointmentStatus(apt.id, status);
                                    setActionMenu(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-lg transition-colors cursor-pointer capitalize"
                                >
                                  Mark as {status}
                                </button>
                              ))}
                              <div className="my-1 h-px bg-white/10" />
                              <button
                                onClick={() => {
                                  removeAppointment(apt.id);
                                  setActionMenu(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredAppointments.length === 0 && (
                  <div className="text-center py-16 text-white/30">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No appointments found</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'customers' && (
            <motion.div
              key="customers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-6">Customer Directory</h3>
                <div className="space-y-3">
                  {appointments
                    .filter((a, i, arr) => arr.findIndex(b => b.email === a.email) === i)
                    .map((apt) => (
                      <div key={apt.email} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-aqua-500/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-aqua-400">
                              {apt.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{apt.name}</div>
                            <div className="text-xs text-white/40">{apt.email} • {apt.phone}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white/30">
                            {appointments.filter(a => a.email === apt.email).length} appointment(s)
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Revenue Chart Placeholder */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-6">Revenue Overview</h3>
                <div className="flex items-end gap-2 h-48">
                  {[65, 40, 85, 55, 90, 70, 95, 60, 80, 75, 88, 92].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-aqua-500/30 to-aqua-400/10 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.8 }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-white/30 mt-2">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                  <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                  <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
              </div>

              {/* Service Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-heading font-bold text-white mb-4">Service Breakdown</h3>
                  {[
                    { name: 'Drain Cleaning', pct: 28, color: 'bg-cyan-400' },
                    { name: 'Leak Detection', pct: 22, color: 'bg-teal-400' },
                    { name: 'Water Heater', pct: 18, color: 'bg-blue-400' },
                    { name: 'Emergency', pct: 15, color: 'bg-red-400' },
                    { name: 'Other', pct: 17, color: 'bg-purple-400' },
                  ].map((item, i) => (
                    <div key={item.name} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">{item.name}</span>
                        <span className="text-white/40">{item.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-heading font-bold text-white mb-4">Quick Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Avg Response Time', value: '28 min', trend: '↓ 12%' },
                      { label: 'Customer Satisfaction', value: '4.9/5', trend: '↑ 3%' },
                      { label: 'Repeat Customers', value: '67%', trend: '↑ 8%' },
                      { label: 'Monthly Revenue', value: '$48,500', trend: '↑ 15%' },
                    ].map(metric => (
                      <div key={metric.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-sm text-white/60">{metric.label}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-green-400">{metric.trend}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
