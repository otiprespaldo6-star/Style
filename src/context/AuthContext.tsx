import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, UserPlan, UserSubscription, AdminLog, AppView } from '../types';
import { AnalysisResult, classifySeason } from '../lib/colorAnalysis';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  analyses: AnalysisResult[];
  currentAnalysis: AnalysisResult | null;
  allUsers: UserProfile[];
  adminLogs: AdminLog[];
  currentView: AppView;
  isPremiumModalOpen: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  setCurrentView: (view: AppView) => void;
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  setIsPremiumModalOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean, mode?: 'login' | 'register') => void;
  login: (email: string, name?: string) => void;
  loginWithGoogle: () => void;
  register: (data: { email: string; firstName: string; lastName: string; birthDate?: string }) => void;
  logout: () => void;
  saveAnalysis: (analysis: AnalysisResult) => void;
  deleteAnalysis: (id: string) => void;
  upgradeToPremium: () => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  updateUserPlan: (userId: string, plan: UserPlan) => void;
  toggleUserStatus: (userId: string) => void;
  quickSwitchRole: (role: UserRole, plan: UserPlan) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  updateMasterWhatsApp: (phone: string) => void;
  isMobilePreviewMode: boolean;
  setIsMobilePreviewMode: (mode: boolean | ((prev: boolean) => boolean)) => void;
}

const STORAGE_KEYS = {
  USER: 'aura_color_user',
  ANALYSES: 'aura_color_analyses',
  ALL_USERS: 'aura_color_all_users',
  ADMIN_LOGS: 'aura_color_admin_logs',
};

// Seed initial users for Admin demonstration
const INITIAL_USERS: UserProfile[] = [
  {
    uid: 'usr_admin_master',
    email: 'wilma.hernandez@auracolor.app',
    displayName: 'Wilma Hernández',
    firstName: 'Wilma',
    lastName: 'Hernández',
    birthDate: '1988-03-24',
    role: 'admin',
    plan: 'premium',
    location: 'Concepción, Chile',
    specialTitle: 'Superusuario / Asesora Máster y Soporte WhatsApp',
    whatsappNumber: '', // En blanco según instrucción
    isMaster: true,
    createdAt: '2025-01-01T08:00:00Z',
    status: 'active'
  },
  {
    uid: 'usr_2',
    email: 'valeria.m@example.com',
    displayName: 'Valeria Morales',
    firstName: 'Valeria',
    lastName: 'Morales',
    birthDate: '1996-08-22',
    role: 'user',
    plan: 'premium',
    location: 'Santiago, Chile',
    createdAt: '2025-02-14T14:30:00Z',
    status: 'active'
  },
  {
    uid: 'usr_3',
    email: 'camila.garcia@example.com',
    displayName: 'Camila García',
    firstName: 'Camila',
    lastName: 'García',
    birthDate: '1999-11-05',
    role: 'user',
    plan: 'free',
    createdAt: '2025-02-28T09:15:00Z',
    status: 'active'
  },
  {
    uid: 'usr_4',
    email: 'elena.sanchez@example.com',
    displayName: 'Elena Sánchez',
    firstName: 'Elena',
    lastName: 'Sánchez',
    birthDate: '1989-03-12',
    role: 'user',
    plan: 'free',
    createdAt: '2025-03-01T16:45:00Z',
    status: 'active'
  }
];

const INITIAL_LOGS: AdminLog[] = [
  {
    id: 'log_1',
    adminId: 'usr_admin_1',
    adminEmail: 'admin@auracolor.app',
    action: 'Verificación de Paletas',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    details: 'Actualización y calibración de las 12 estaciones de colorimetría.'
  },
  {
    id: 'log_2',
    adminId: 'usr_admin_1',
    adminEmail: 'admin@auracolor.app',
    action: 'Activación de Suscripción',
    targetEmail: 'valeria.m@example.com',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    details: 'Plan Premium anual activado con éxito.'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Start logged in as default admin/user for instant delight
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_LOGS);
      return saved ? JSON.parse(saved) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  });

  const [analyses, setAnalyses] = useState<AnalysisResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYSES);
      if (saved) return JSON.parse(saved);
      // Seed a starter sample analysis
      const sample = classifySeason({
        undertone: 'warm',
        contrast: 'medium',
        value: 'medium',
        chroma: 'bright',
        skinHex: '#F6D2B5',
        method: 'photo'
      });
      sample.aiNotes = 'Detectamos en tus facciones un tono dorado suave con alto brillo natural en la mirada.';
      return [sample];
    } catch {
      return [];
    }
  });

  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(analyses[0] || null);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isMobilePreviewMode, setIsMobilePreviewMode] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(analyses));
  }, [analyses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_LOGS, JSON.stringify(adminLogs));
  }, [adminLogs]);

  const login = (email: string, name?: string) => {
    const existing = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
    } else {
      const newUser: UserProfile = {
        uid: 'usr_' + Date.now(),
        email,
        displayName: name || email.split('@')[0],
        firstName: name ? name.split(' ')[0] : 'Usuaria',
        lastName: name && name.split(' ').length > 1 ? name.split(' ')[1] : '',
        role: email.includes('admin') ? 'admin' : 'user',
        plan: 'free',
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      setAllUsers(prev => [newUser, ...prev]);
      setUser(newUser);
    }
    setIsAuthModalOpen(false);
  };

  const loginWithGoogle = () => {
    const googleUser: UserProfile = {
      uid: 'usr_g_' + Date.now(),
      email: 'claudia.diseñadora@gmail.com',
      displayName: 'Claudia Rivas',
      firstName: 'Claudia',
      lastName: 'Rivas',
      role: 'user',
      plan: 'premium',
      createdAt: new Date().toISOString(),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active'
    };
    setAllUsers(prev => {
      const filtered = prev.filter(u => u.email !== googleUser.email);
      return [googleUser, ...filtered];
    });
    setUser(googleUser);
    setIsAuthModalOpen(false);
  };

  const register = (data: { email: string; firstName: string; lastName: string; birthDate?: string }) => {
    const newUser: UserProfile = {
      uid: 'usr_' + Date.now(),
      email: data.email,
      displayName: `${data.firstName} ${data.lastName}`.trim(),
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      role: 'user',
      plan: 'free',
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setAllUsers(prev => [newUser, ...prev]);
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const saveAnalysis = (analysis: AnalysisResult) => {
    setAnalyses(prev => [analysis, ...prev]);
    setCurrentAnalysis(analysis);
    setCurrentView('result');
  };

  const deleteAnalysis = (id: string) => {
    setAnalyses(prev => prev.filter(a => a.id !== id));
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(analyses.find(a => a.id !== id) || null);
    }
  };

  const upgradeToPremium = () => {
    if (!user) {
      handleOpenAuthModal(true, 'register');
      return;
    }
    const updated: UserProfile = { ...user, plan: 'premium' };
    setUser(updated);
    setAllUsers(prev => prev.map(u => u.uid === user.uid ? updated : u));
    setIsPremiumModalOpen(false);
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    setAllUsers(prev => prev.map(u => {
      if (u.uid === userId) {
        const mod = { ...u, role };
        if (user?.uid === userId) setUser(mod);
        return mod;
      }
      return u;
    }));

    if (user) {
      const target = allUsers.find(u => u.uid === userId);
      const newLog: AdminLog = {
        id: 'log_' + Date.now(),
        adminId: user.uid,
        adminEmail: user.email,
        action: `Cambio de Rol a ${role.toUpperCase()}`,
        targetUserId: userId,
        targetEmail: target?.email,
        timestamp: new Date().toISOString(),
        details: `Rol actualizado a ${role} para el usuario ${target?.displayName || userId}`
      };
      setAdminLogs(prev => [newLog, ...prev]);
    }
  };

  const updateUserPlan = (userId: string, plan: UserPlan) => {
    setAllUsers(prev => prev.map(u => {
      if (u.uid === userId) {
        const mod = { ...u, plan };
        if (user?.uid === userId) setUser(mod);
        return mod;
      }
      return u;
    }));
  };

  const toggleUserStatus = (userId: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.uid === userId) {
        const newStatus = u.status === 'active' ? 'suspended' : 'active';
        const mod = { ...u, status: newStatus as 'active' | 'suspended' };
        if (user?.uid === userId) setUser(mod);
        return mod;
      }
      return u;
    }));
  };

  const quickSwitchRole = (role: UserRole, plan: UserPlan) => {
    if (!user) {
      const dummy: UserProfile = {
        uid: 'usr_demo',
        email: role === 'admin' ? 'admin@auracolor.app' : 'usuaria@auracolor.app',
        displayName: role === 'admin' ? 'Sofía Valenzuela (Admin)' : 'Camila Valdés',
        firstName: role === 'admin' ? 'Sofía' : 'Camila',
        lastName: role === 'admin' ? 'Valenzuela' : 'Valdés',
        role,
        plan,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      setUser(dummy);
    } else {
      const updated: UserProfile = { ...user, role, plan };
      setUser(updated);
      setAllUsers(prev => prev.map(u => u.uid === user.uid ? updated : u));
    }
  };

  const handleOpenAuthModal = (open: boolean, mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(open);
  };

  const updateMasterWhatsApp = (phone: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.isMaster || u.email.includes('wilma')) {
        const mod = { ...u, whatsappNumber: phone };
        if (user?.uid === u.uid) setUser(mod);
        return mod;
      }
      return u;
    }));
    if (user && (user.isMaster || user.email.includes('wilma'))) {
      setUser(prev => prev ? { ...prev, whatsappNumber: phone } : null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        analyses,
        currentAnalysis,
        allUsers,
        adminLogs,
        currentView,
        isPremiumModalOpen,
        isAuthModalOpen,
        authModalMode,
        setCurrentView,
        setCurrentAnalysis,
        setIsPremiumModalOpen,
        setIsAuthModalOpen: handleOpenAuthModal,
        login,
        loginWithGoogle,
        register,
        logout,
        saveAnalysis,
        deleteAnalysis,
        upgradeToPremium,
        updateUserRole,
        updateUserPlan,
        toggleUserStatus,
        quickSwitchRole,
        isSupportModalOpen,
        setIsSupportModalOpen,
        updateMasterWhatsApp,
        isMobilePreviewMode,
        setIsMobilePreviewMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
