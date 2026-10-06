import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Crown, Check, X, Sparkles, Shield, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PremiumModal: React.FC = () => {
  const { isPremiumModalOpen, setIsPremiumModalOpen, upgradeToPremium } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isPremiumModalOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPremium();
      setIsProcessing(false);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-stone-900 rounded-3xl max-w-lg w-full text-white p-6 sm:p-8 space-y-6 shadow-2xl border border-rose-500/30 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsPremiumModalOpen(false)}
          className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 mx-auto flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Desbloquea tu Dossier VIP
          </h2>
          <p className="text-xs text-rose-200/80">
            Todo lo que necesitas para transformar tu imagen personal y comprar con total seguridad.
          </p>
        </div>

        {/* Billing cycle toggle */}
        <div className="flex justify-center">
          <div className="bg-stone-800 p-1 rounded-2xl border border-stone-700 flex text-xs font-semibold">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                billingPeriod === 'monthly' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              Mensual ($4.99)
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                billingPeriod === 'yearly' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              <span>Anual ($39.99)</span>
              <span className="text-[10px] bg-amber-400 text-stone-900 font-extrabold px-1.5 rounded-full">
                -33%
              </span>
            </button>
          </div>
        </div>

        {/* VIP Perks */}
        <div className="space-y-3 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 text-xs">
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Paleta completa de 12 colores con códigos HEX y RGB para compras</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Tocador de maquillaje con tonos exactos de labiales, colorete y base</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Armario cápsula de 6 prendas clave de temporada</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Tarjeta de bolsillo digital interactiva para llevar en tiendas</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Draping virtual ilimitado y análisis ilimitados de temporada</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3 pt-2">
          <button
            disabled={isProcessing}
            onClick={handleSubscribe}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 hover:from-amber-300 hover:to-rose-400 text-stone-900 font-bold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4 text-stone-900" />
            <span>
              {isProcessing 
                ? 'Activando Membresía VIP...' 
                : `Suscribirme por ${billingPeriod === 'monthly' ? '$4.99/mes' : '$39.99/año'}`}
            </span>
          </button>

          <p className="text-[10px] text-center text-stone-400 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Cancela en cualquier momento con 1 clic. Sin compromisos de permanencia.</span>
          </p>
        </div>

      </div>
    </div>
  );
};
