import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  X, 
  ExternalLink, 
  Edit3, 
  Check, 
  Phone, 
  Sparkles,
  Heart,
  Clock
} from 'lucide-react';

export const SupportAdvisorWidget: React.FC = () => {
  const { 
    isSupportModalOpen, 
    setIsSupportModalOpen, 
    allUsers, 
    user, 
    updateMasterWhatsApp 
  } = useAuth();

  // Find Wilma Hernández (Master)
  const masterUser = allUsers.find(u => u.isMaster || u.email.includes('wilma')) || {
    displayName: 'Wilma Hernández',
    location: 'Concepción, Chile',
    specialTitle: 'Superusuario / Asesora Máster y Soporte WhatsApp',
    whatsappNumber: '',
    email: 'wilma.hernandez@auracolor.app'
  };

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(masterUser.whatsappNumber || '');
  const [copiedLink, setCopiedLink] = useState(false);

  const isCurrentUserMaster = user?.isMaster || user?.email.includes('wilma');

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    updateMasterWhatsApp(phoneNumber.trim());
    setIsEditingPhone(false);
  };

  const handleOpenWhatsApp = () => {
    const cleanPhone = (masterUser.whatsappNumber || phoneNumber || '').replace(/[^0-9]/g, '');
    const prefilledText = encodeURIComponent(
      'Hola Wilma, te contacto desde Aura Color (Concepción, Chile) para solicitar asesoría personalizada de colorimetría personal y soporte.'
    );

    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${prefilledText}`, '_blank');
    } else {
      // If phone number is left in blank as instructed, prompt to open WhatsApp or specify number
      window.open(`https://api.whatsapp.com/send?text=${prefilledText}`, '_blank');
    }
  };

  return (
    <>
      {/* Floating Action Badge on desktop and mobile */}
      <button
        onClick={() => setIsSupportModalOpen(true)}
        className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 cursor-pointer border-2 border-white/40 group animate-in slide-in-from-bottom-3"
        title="Asesoría y Soporte con Wilma Hernández"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[11px] font-bold leading-tight">Asesoría & Soporte</p>
          <p className="text-[9px] text-emerald-100 leading-tight">Wilma Hernández • Concepción, Chile</p>
        </div>
      </button>

      {/* Support & Advisor Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 relative">
            
            {/* Close button */}
            <button
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Master Superusuario Badge */}
            <div className="text-center space-y-2 pt-2">
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 p-[3px] mx-auto shadow-lg">
                  <div className="w-full h-full bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 font-serif text-2xl font-bold">
                    WH
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-md" title="Superusuario Verificada">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Superusuario Máster
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  Wilma Hernández
                </h3>
                <p className="text-xs text-stone-500 flex items-center justify-center gap-1 mt-0.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Concepción, Chile</span>
                </p>
              </div>
            </div>

            {/* Role & Services Description */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Asesora Máster y Soporte WhatsApp</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Wilma Hernández coordina la atención directa de colorimetría personal y soporte de la plataforma en Concepción, Chile. Brinda asesoría especializada para resolver dudas sobre tu paleta, maquillaje y outfits ideales.
              </p>
            </div>

            {/* WhatsApp Contact Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Canal Directo de WhatsApp</span>
                </span>
                {isCurrentUserMaster && (
                  <button
                    onClick={() => setIsEditingPhone(!isEditingPhone)}
                    className="text-[10px] text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isEditingPhone ? 'Cancelar' : 'Editar Número'}</span>
                  </button>
                )}
              </div>

              {/* Number state or Edit Form */}
              {isEditingPhone ? (
                <form onSubmit={handleSavePhone} className="space-y-2 pt-1">
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Dejar en blanco o +56 9..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-emerald-300 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      Guardar
                    </button>
                  </div>
                  <span className="text-[10px] text-stone-500 block">
                    Número configurado en blanco por defecto. Puedes agregar número con código de país (+56) o dejarlo en blanco.
                  </span>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs text-stone-600 bg-white/70 p-2.5 rounded-xl border border-emerald-100">
                  <span className="font-medium">Número de WhatsApp:</span>
                  <span className="font-mono text-xs font-bold text-stone-800">
                    {masterUser.whatsappNumber && masterUser.whatsappNumber.trim() !== '' ? masterUser.whatsappNumber : '(En blanco)'}
                  </span>
                </div>
              )}

              {/* Primary WhatsApp Action Button */}
              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Contactar a Wilma por WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
              </button>
            </div>

            {/* Operating info */}
            <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Horario Chile Continental (CLT)</span>
              </span>
              <span>Concepción, Región del Biobío</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
