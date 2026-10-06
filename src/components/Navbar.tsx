import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppView } from '../types';
import { 
  Sparkles, 
  Camera, 
  Layers, 
  Palette, 
  User, 
  ShieldCheck, 
  Crown, 
  Menu, 
  X, 
  Download,
  LogOut,
  ChevronDown,
  MessageCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, 
    isAuthenticated, 
    currentView, 
    setCurrentView, 
    setIsPremiumModalOpen, 
    setIsAuthModalOpen, 
    logout,
    quickSwitchRole,
    setIsSupportModalOpen
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-[2px] shadow-sm group-hover:shadow-md transition-shadow">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-rose-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-stone-900 via-rose-950 to-stone-800 bg-clip-text text-transparent">
                Aura Color
              </span>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-rose-500 hidden sm:block">
                Colorimetría Personal
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => navigateTo('landing')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'landing'
                  ? 'text-rose-600 bg-rose-50 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => navigateTo('analyzer-select')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'analyzer-select' || currentView === 'analyzer-photo' || currentView === 'analyzer-quiz'
                  ? 'text-rose-600 bg-rose-50 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Camera className="w-4 h-4 text-rose-500" />
              Analizar Color
            </button>

            <button
              onClick={() => navigateTo('virtual-drape')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'virtual-drape'
                  ? 'text-rose-600 bg-rose-50 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Layers className="w-4 h-4 text-purple-500" />
              Draping Virtual
            </button>

            <button
              onClick={() => navigateTo('seasons-guide')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'seasons-guide'
                  ? 'text-rose-600 bg-rose-50 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Palette className="w-4 h-4 text-amber-500" />
              12 Estaciones
            </button>

            {user?.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'admin'
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                Panel Admin
              </button>
            )}

            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Asesoría y Soporte: Wilma Hernández (Concepción, Chile)"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Asesora WhatsApp</span>
            </button>
          </nav>

          {/* Action CTAs & Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Mode Switcher pill */}
            <div className="flex items-center bg-stone-100 p-1 rounded-full text-xs font-medium border border-stone-200">
              <button
                onClick={() => quickSwitchRole('user', user?.plan || 'free')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  user?.role === 'user' ? 'bg-white shadow-xs text-rose-600 font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Ver app como usuaria regular"
              >
                Usuaria
              </button>
              <button
                onClick={() => quickSwitchRole('admin', 'premium')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  user?.role === 'admin' ? 'bg-indigo-600 shadow-xs text-white font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Ver app con permisos de Administradora"
              >
                Admin
              </button>
            </div>

            {/* Premium Pill / Upgrade Button */}
            {user?.plan === 'premium' ? (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-300 rounded-full text-xs font-bold text-amber-800">
                <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>VIP Premium</span>
              </div>
            ) : (
              <button
                onClick={() => setIsPremiumModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-200 via-amber-100 to-rose-100 border border-amber-300 hover:shadow-xs transition-all cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>Plan VIP ($4.99)</span>
              </button>
            )}

            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-stone-200 hover:border-rose-300 bg-white hover:bg-stone-50 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                    {user?.firstName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-xs font-semibold text-stone-800 max-w-[100px] truncate">
                    {user?.firstName || 'Mi Cuenta'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900">{user?.displayName}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
                        {user?.role === 'admin' ? 'Administradora' : 'Usuaria'} • {user?.plan === 'premium' ? 'Plan VIP' : 'Plan Gratuito'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      Mi Perfil e Historial
                    </button>

                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          navigateTo('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                        Panel de Administración
                      </button>
                    )}

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true, 'login')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsPremiumModalOpen(true)}
              className="p-2 rounded-xl bg-amber-100 text-amber-800"
              title="Plan VIP"
            >
              <Crown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-rose-100 bg-white/98 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <button
            onClick={() => navigateTo('landing')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-rose-50"
          >
            Inicio
          </button>
          <button
            onClick={() => navigateTo('analyzer-select')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-rose-50 flex items-center gap-2"
          >
            <Camera className="w-4 h-4 text-rose-500" />
            Analizar mi Paleta
          </button>
          <button
            onClick={() => navigateTo('virtual-drape')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-rose-50 flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-purple-500" />
            Draping Virtual Interactivo
          </button>
          <button
            onClick={() => navigateTo('seasons-guide')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-rose-50 flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-amber-500" />
            Guía de las 12 Estaciones
          </button>

          <button
            onClick={() => {
              setIsSupportModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>Asesoría y Soporte: Wilma Hernández</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold">
              WhatsApp
            </span>
          </button>

          {user?.role === 'admin' && (
            <button
              onClick={() => navigateTo('admin')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-700 bg-indigo-50 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Panel de Administración
            </button>
          )}

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">Cambiar Rol Demo:</span>
            <div className="flex gap-2">
              <button
                onClick={() => quickSwitchRole('user', user?.plan || 'free')}
                className={`px-3 py-1 text-xs rounded-lg ${user?.role === 'user' ? 'bg-rose-600 text-white font-bold' : 'bg-stone-100 text-stone-700'}`}
              >
                Usuaria
              </button>
              <button
                onClick={() => quickSwitchRole('admin', 'premium')}
                className={`px-3 py-1 text-xs rounded-lg ${user?.role === 'admin' ? 'bg-indigo-600 text-white font-bold' : 'bg-stone-100 text-stone-700'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="pt-3">
            {isAuthenticated ? (
              <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-stone-800">{user?.displayName}</p>
                  <p className="text-[11px] text-stone-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-red-600 font-semibold px-2 py-1 rounded-md hover:bg-red-50"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true, 'login')}
                className="w-full py-2.5 text-center text-sm font-bold text-white bg-rose-600 rounded-xl"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
