import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Crown, 
  Calendar, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const { 
    user, 
    analyses, 
    setCurrentAnalysis, 
    deleteAnalysis, 
    setCurrentView, 
    setIsPremiumModalOpen 
  } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-white rounded-3xl border border-stone-200">
        <User className="w-12 h-12 text-stone-400 mx-auto mb-3" />
        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Inicia sesión para ver tu perfil
        </h2>
        <p className="text-stone-500 text-xs mb-6">
          Guarda tus análisis de colorimetría para consultarlos en cualquier momento.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-[3px] shadow-md shrink-0">
            <div className="w-full h-full bg-rose-50 rounded-full flex items-center justify-center text-rose-700 font-serif text-2xl font-bold">
              {user.firstName?.charAt(0) || 'U'}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl font-bold text-stone-900">
                {user.displayName}
              </h1>
              {user.plan === 'premium' ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-500" />
                  <span>VIP Activo</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600">
                  Plan Gratuito
                </span>
              )}
            </div>

            <p className="text-xs text-stone-500">{user.email}</p>
            {user.birthDate && (
              <p className="text-[11px] text-stone-400">Fecha de nacimiento: {user.birthDate}</p>
            )}
            <p className="text-[10px] text-stone-400">
              Miembro desde {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Upgrade or Plan badge */}
        <div>
          {user.plan !== 'premium' ? (
            <button
              onClick={() => setIsPremiumModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-stone-900 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Mejorar a VIP ($4.99/mes)</span>
            </button>
          ) : (
            <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Suscripción VIP Activa</span>
            </div>
          )}
        </div>
      </div>

      {/* Analyses History Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              Tus Análisis Guardados ({analyses.length})
            </h2>
            <p className="text-xs text-stone-500">
              Consulta tus resultados previos o repite el test si tu tono cambia en verano/invierno.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('analyzer-select')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuevo Análisis</span>
          </button>
        </div>

        {analyses.length === 0 ? (
          <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200/60 space-y-3">
            <Sparkles className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="text-xs text-stone-600 font-medium">Aún no has guardado ningún análisis.</p>
            <button
              onClick={() => setCurrentView('analyzer-select')}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
            >
              Comenzar Ahora
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map(item => (
              <div 
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl border border-stone-200 hover:border-rose-300 bg-stone-50/50 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-stone-900">
                      {item.season.spanishTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      {item.season.subfamily}
                    </span>
                  </div>

                  {/* Swatches strip */}
                  <div className="flex gap-1.5">
                    {item.season.palette.slice(0, 6).map((c, i) => (
                      <div 
                        key={i} 
                        className="w-5 h-5 rounded shadow-2xs border border-black/5" 
                        style={{ backgroundColor: c.hex }} 
                        title={c.name}
                      />
                    ))}
                  </div>

                  <p className="text-[11px] text-stone-400">
                    Realizado el {new Date(item.createdAt).toLocaleDateString()} • Método: {item.method === 'photo' ? 'Foto con IA' : 'Cuestionario'}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setCurrentAnalysis(item);
                      setCurrentView('result');
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:border-rose-400 text-xs font-bold text-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Ver Resultado</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                  </button>

                  <button
                    onClick={() => deleteAnalysis(item.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Eliminar análisis"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
