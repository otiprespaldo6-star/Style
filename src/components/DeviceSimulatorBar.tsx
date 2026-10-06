import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sparkles, 
  RotateCw, 
  Check, 
  X, 
  MessageCircle, 
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';

export type DeviceMode = 'auto' | 'iphone' | 'android' | 'tablet';

interface DeviceSimulatorBarProps {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  orientation: 'portrait' | 'landscape';
  setOrientation: (o: 'portrait' | 'landscape') => void;
}

export const DeviceSimulatorBar: React.FC<DeviceSimulatorBarProps> = ({
  deviceMode,
  setDeviceMode,
  orientation,
  setOrientation,
}) => {
  const { setIsSupportModalOpen } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-stone-950 text-white border-b border-stone-800 text-xs py-2 px-3 sm:px-6 relative z-50 transition-all select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Device & OS Compatibility info */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Multi-Dispositivo</span>
          </div>
          
          <span className="hidden sm:inline-block text-stone-300 text-[11px]">
            Optimizado para todos los modelos de <strong>iPhone, Android, Tablets y PC</strong>
          </span>
        </div>

        {/* Center: Device Switcher Buttons */}
        <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-2xl border border-stone-800">
          <button
            onClick={() => setDeviceMode('auto')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              deviceMode === 'auto'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="Vista fluida responsive (detecta automáticamente tu pantalla)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>PC / Fluido</span>
          </button>

          <button
            onClick={() => setDeviceMode('iphone')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              deviceMode === 'iphone'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="Simulador de iPhone (iOS 18 / Safari & Chrome)"
          >
            <Smartphone className="w-3.5 h-3.5 text-sky-300" />
            <span>iPhone</span>
          </button>

          <button
            onClick={() => setDeviceMode('android')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              deviceMode === 'android'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="Simulador de Android (Samsung Galaxy / Google Pixel)"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
            <span>Android</span>
          </button>

          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              deviceMode === 'tablet'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="Simulador de Tablet / iPad"
          >
            <Tablet className="w-3.5 h-3.5 text-purple-300" />
            <span>Tablet</span>
          </button>

          {deviceMode !== 'auto' && (
            <button
              onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
              className="p-1 px-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 text-[11px] flex items-center gap-1 transition-colors ml-1"
              title="Girar orientación de pantalla"
            >
              <RotateCw className="w-3 h-3" />
              <span className="capitalize hidden lg:inline">{orientation === 'portrait' ? 'Vertical' : 'Horizontal'}</span>
            </button>
          )}
        </div>

        {/* Right: Asesoría y Soporte (Wilma Hernández, Concepción, Chile) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold transition-all cursor-pointer"
            title="Asesoría y Soporte Wilma Hernández (Concepción, Chile)"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span className="truncate">Soporte: Wilma Hernández (Concepción)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
