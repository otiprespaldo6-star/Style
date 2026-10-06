import React from 'react';
import { Sparkles, Heart, Shield, Smartphone, MessageCircle, MapPin, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsSupportModalOpen } = useAuth();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Highlight Banner: Asesoría y Soporte Wilma Hernández */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-stone-900 to-stone-950 rounded-3xl p-5 sm:p-7 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 fill-emerald-500/20" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Superusuario / Asesora Máster
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Concepción, Chile
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                Asesoría y Soporte: Wilma Hernández
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed max-w-xl">
                ¿Dudas con tu paleta, maquillaje o combinaciones de prendas? Contacta directamente por WhatsApp para asistencia y soporte personalizado.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-stretch sm:self-auto justify-center"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Consultar Soporte WhatsApp</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 p-[2px]">
                <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Aura Color
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Descubre los colores que te hacen brillar. Análisis de colorimetría personal con IA, las 12 estaciones de color, combinaciones de estilo y maquillaje personalizado.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-300">
              <Smartphone className="w-3.5 h-3.5" />
              <span>PWA instalable en iOS, Android, PC y Tablets</span>
            </div>
          </div>

          {/* Colorimetry seasons */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Las 4 Familias
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setCurrentView('seasons-guide')} className="hover:text-rose-400 transition-colors">
                  Primavera (Clara • Cálida • Brillante)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('seasons-guide')} className="hover:text-rose-400 transition-colors">
                  Verano (Claro • Frío • Suave)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('seasons-guide')} className="hover:text-rose-400 transition-colors">
                  Otoño (Suave • Cálido • Oscuro)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('seasons-guide')} className="hover:text-rose-400 transition-colors">
                  Invierno (Brillante • Frío • Oscuro)
                </button>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Herramientas
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setCurrentView('analyzer-photo')} className="hover:text-rose-400 transition-colors">
                  Escaneo Facial con IA
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('analyzer-quiz')} className="hover:text-rose-400 transition-colors">
                  Test de 7 Preguntas Manual
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('virtual-drape')} className="hover:text-rose-400 transition-colors">
                  Draping Virtual Interactivo
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('seasons-guide')} className="hover:text-rose-400 transition-colors">
                  Enciclopedia de Colorimetría
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Trust */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Seguridad y Privacidad
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>Tu privacidad es sagrada: tus fotos se procesan temporalmente de forma privada y no se venden a terceros.</p>
              </div>
              <p className="pt-2 text-[11px] text-stone-500">
                Creado para mujeres que quieren simplificar su armario y ganar seguridad al vestir.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Aura Color — Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para inspirar tu luz natural</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
