/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AnalyzerSelect } from './components/AnalyzerSelect';
import { PhotoUploader } from './components/PhotoUploader';
import { ColorQuiz } from './components/ColorQuiz';
import { AnalysisResultView } from './components/AnalysisResultView';
import { VirtualDraper } from './components/VirtualDraper';
import { SeasonsDirectory } from './components/SeasonsDirectory';
import { UserProfileView } from './components/UserProfileView';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { PremiumModal } from './components/PremiumModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { SupportAdvisorWidget } from './components/SupportAdvisorWidget';
import { BottomMobileNav } from './components/BottomMobileNav';
import { DeviceSimulatorBar, DeviceMode } from './components/DeviceSimulatorBar';
import { Wifi, Battery, Signal } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, user, setCurrentView } = useAuth();
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'analyzer-select':
        return <AnalyzerSelect />;
      case 'analyzer-photo':
        return <PhotoUploader />;
      case 'analyzer-quiz':
        return <ColorQuiz />;
      case 'result':
        return <AnalysisResultView />;
      case 'virtual-drape':
        return <VirtualDraper />;
      case 'seasons-guide':
        return <SeasonsDirectory />;
      case 'profile':
        return <UserProfileView />;
      case 'admin':
        if (user?.role !== 'admin') {
          return (
            <div className="max-w-md mx-auto my-16 text-center p-8 bg-white rounded-3xl border border-stone-200">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Acceso restringido a Administradoras
              </h2>
              <p className="text-stone-500 text-xs mb-6">
                Puedes cambiar a rol Administradora en el selector superior para probar el panel de control.
              </p>
              <button
                onClick={() => setCurrentView('landing')}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
              >
                Volver al Inicio
              </button>
            </div>
          );
        }
        return <AdminPanel />;
      default:
        return <LandingPage />;
    }
  };

  const appCore = (
    <div className="min-h-full flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900 pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      
      {/* Mobile Bottom Navigation Dock (Visible on Mobile) */}
      <BottomMobileNav />

      {/* Global Modals & Support Widget */}
      <SupportAdvisorWidget />
      <AuthModal />
      <PremiumModal />
      <PWAInstallBanner />
    </div>
  );

  // When simulated device frame is active
  if (deviceMode !== 'auto') {
    let widthClass = 'w-[393px] h-[852px]'; // iPhone portrait
    let frameRound = 'rounded-[50px]';

    if (deviceMode === 'iphone') {
      if (orientation === 'landscape') {
        widthClass = 'w-[852px] h-[410px]';
        frameRound = 'rounded-[44px]';
      } else {
        widthClass = 'w-[393px] h-[852px]';
        frameRound = 'rounded-[50px]';
      }
    } else if (deviceMode === 'android') {
      if (orientation === 'landscape') {
        widthClass = 'w-[880px] h-[412px]';
        frameRound = 'rounded-[36px]';
      } else {
        widthClass = 'w-[412px] h-[880px]';
        frameRound = 'rounded-[44px]';
      }
    } else if (deviceMode === 'tablet') {
      if (orientation === 'landscape') {
        widthClass = 'w-[1024px] h-[720px]';
        frameRound = 'rounded-[32px]';
      } else {
        widthClass = 'w-[768px] h-[980px]';
        frameRound = 'rounded-[36px]';
      }
    }

    return (
      <div className="min-h-screen bg-stone-900 flex flex-col">
        <DeviceSimulatorBar 
          deviceMode={deviceMode} 
          setDeviceMode={setDeviceMode}
          orientation={orientation}
          setOrientation={setOrientation}
        />

        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto">
          {/* Simulated Device Bezel */}
          <div 
            className={`relative ${widthClass} ${frameRound} bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[10px] border-stone-800 ring-1 ring-stone-700/60 overflow-hidden flex flex-col shrink-0 transition-all duration-300`}
          >
            {/* Top Device Header: Status bar & Dynamic Island / Camera */}
            {deviceMode === 'iphone' && orientation === 'portrait' && (
              <div className="bg-white/95 px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-stone-900 z-50 shrink-0 select-none border-b border-rose-50/50">
                <span>9:41</span>
                {/* Dynamic Island */}
                <div className="w-24 h-5 bg-black rounded-full mx-auto shadow-xs flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800 mr-2" />
                </div>
                <div className="flex items-center gap-1.5 text-stone-800">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {deviceMode === 'android' && orientation === 'portrait' && (
              <div className="bg-white/95 px-4 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-semibold text-stone-900 z-50 shrink-0 select-none border-b border-stone-100">
                <span>12:30</span>
                {/* Punch Hole Camera */}
                <div className="w-3 h-3 rounded-full bg-black mx-auto ring-1 ring-stone-800" />
                <div className="flex items-center gap-1.5 text-stone-800">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-stone-50 relative scroll-smooth">
              {appCore}
            </div>

            {/* Home Indicator Bar on iOS / Android */}
            {orientation === 'portrait' && (
              <div className="h-5 bg-white flex items-center justify-center shrink-0 border-t border-stone-100 select-none">
                <div className="w-32 h-1 bg-stone-300 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Auto/Fluid Responsive mode
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900">
      <DeviceSimulatorBar 
        deviceMode={deviceMode} 
        setDeviceMode={setDeviceMode}
        orientation={orientation}
        setOrientation={setOrientation}
      />
      {appCore}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
