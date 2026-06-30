import { create } from 'zustand';

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  service: string;
}

interface AppState {
  currentSection: number;
  isMenuOpen: boolean;
  isTransitioning: boolean;
  isDarkMode: boolean;
  isAdminLoggedIn: boolean;
  appointments: Appointment[];
  activeModal: string | null;
  
  setCurrentSection: (section: number) => void;
  setMenuOpen: (open: boolean) => void;
  setTransitioning: (transitioning: boolean) => void;
  toggleDarkMode: () => void;
  setAdminLoggedIn: (loggedIn: boolean) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  removeAppointment: (id: string) => void;
  setActiveModal: (modal: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  currentSection: 0,
  isMenuOpen: false,
  isTransitioning: false,
  isDarkMode: true,
  isAdminLoggedIn: false,
  appointments: [
    {
      id: '1',
      name: 'John Mitchell',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      service: 'Leak Detection',
      date: '2026-01-20',
      time: '10:00 AM',
      notes: 'Kitchen sink has been dripping for 2 days',
      priority: 'normal',
      status: 'confirmed',
      createdAt: '2026-01-15',
    },
    {
      id: '2',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      service: 'Water Heater Repair',
      date: '2026-01-21',
      time: '2:00 PM',
      notes: 'No hot water, unit is 8 years old',
      priority: 'urgent',
      status: 'pending',
      createdAt: '2026-01-16',
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '(555) 456-7890',
      service: 'Emergency Plumbing',
      date: '2026-01-18',
      time: '8:00 AM',
      notes: 'Burst pipe in basement - flooding',
      priority: 'emergency',
      status: 'completed',
      createdAt: '2026-01-17',
    },
  ],
  activeModal: null,
  
  setCurrentSection: (section) => set({ currentSection: section }),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setAdminLoggedIn: (loggedIn) => set({ isAdminLoggedIn: loggedIn }),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointmentStatus: (id, status) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    })),
  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
    })),
  setActiveModal: (modal) => set({ activeModal: modal }),
}));
