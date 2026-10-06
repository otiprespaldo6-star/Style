import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SEASONS_LIST } from '../data/seasons';
import { 
  Users, 
  Palette, 
  CreditCard, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  UserCheck, 
  UserX, 
  Crown, 
  Calendar, 
  Settings, 
  FileText,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    user, 
    allUsers, 
    analyses, 
    adminLogs, 
    updateUserRole, 
    updateUserPlan, 
    toggleUserStatus,
    setCurrentView 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'palettes' | 'pricing' | 'logs'>('dashboard');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'premium'>('all');

  // Calculate metrics
  const totalUsers = allUsers.length;
  const totalAnalyses = analyses.length;
  const activePremiums = allUsers.filter(u => u.plan === 'premium').length;
  const estimatedRevenue = activePremiums * 4.99;

  // 7-day activity simulation
  const last7Days = [
    { day: 'Lun', users: 3, analyses: 8 },
    { day: 'Mar', users: 5, analyses: 14 },
    { day: 'Mié', users: 4, analyses: 11 },
    { day: 'Jue', users: 7, analyses: 18 },
    { day: 'Vie', users: 6, analyses: 16 },
    { day: 'Sáb', users: 9, analyses: 24 },
    { day: 'Dom', users: 11, analyses: 28 },
  ];

  const maxVal = Math.max(...last7Days.map(d => Math.max(d.users, d.analyses)));

  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.displayName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesPlan = planFilter === 'all' || u.plan === planFilter;
    return matchesSearch && matchesRole && matchesPlan;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-300">
              Consola de Administración
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold">
            Panel de Control Aura Color
          </h1>
          <p className="text-xs text-stone-400">
            Administradora activa: <strong>{user?.displayName}</strong> ({user?.email})
          </p>
        </div>

        {/* Tab selection in header */}
        <div className="flex flex-wrap gap-1.5 bg-stone-800/80 p-1.5 rounded-2xl border border-stone-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'users' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Usuarios ({totalUsers})
          </button>
          <button
            onClick={() => setActiveTab('palettes')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'palettes' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            12 Estaciones
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'pricing' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Precios
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'logs' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Logs
          </button>
        </div>
      </div>

      {/* Tab 1: Dashboard View */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Usuarios Totales</span>
                <Users className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900">
                {totalUsers}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span>+14% vs mes anterior</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Análisis Realizados</span>
                <Palette className="w-5 h-5 text-rose-500" />
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900">
                {totalAnalyses}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span>88% con foto IA</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Suscripciones VIP</span>
                <Crown className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900">
                {activePremiums}
              </div>
              <p className="text-[11px] text-stone-500 font-semibold">
                Tasa de conversión: {Math.round((activePremiums / totalUsers) * 100)}%
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Ingresos Mensuales</span>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900">
                ${estimatedRevenue.toFixed(2)}
              </div>
              <p className="text-[11px] text-stone-400">
                Basado en $4.99/suscripción
              </p>
            </div>

          </div>

          {/* 7-Day Activity Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Actividad de los Últimos 7 Días
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Comparativa de nuevos registros y análisis de colorimetría completados.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-500" />
                  <span className="text-stone-600">Análisis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-indigo-500" />
                  <span className="text-stone-600">Nuevos Usuarios</span>
                </div>
              </div>
            </div>

            {/* Visual Bar Graph */}
            <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-stone-100">
              {last7Days.map((item, idx) => {
                const analysisHeight = Math.round((item.analyses / maxVal) * 100);
                const userHeight = Math.round((item.users / maxVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex justify-center items-end gap-1.5 h-full">
                      {/* Analysis Bar */}
                      <div 
                        className="w-1/3 bg-rose-500 hover:bg-rose-600 rounded-t-lg transition-all relative group-hover:shadow-md"
                        style={{ height: `${analysisHeight}%` }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-stone-900 text-white px-1.5 py-0.5 rounded transition-opacity">
                          {item.analyses}
                        </span>
                      </div>

                      {/* Users Bar */}
                      <div 
                        className="w-1/3 bg-indigo-500 hover:bg-indigo-600 rounded-t-lg transition-all relative group-hover:shadow-md"
                        style={{ height: `${userHeight}%` }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-stone-900 text-white px-1.5 py-0.5 rounded transition-opacity">
                          {item.users}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-stone-600 mt-2">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Users Management Table */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Gestión de Usuarios
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Modifica roles de acceso, cambia planes y modera cuentas.
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Buscar usuaria..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-700"
              >
                <option value="all">Todos los roles</option>
                <option value="user">Solo Usuarias</option>
                <option value="admin">Solo Admins</option>
              </select>

              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value as any)}
                className="px-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-700"
              >
                <option value="all">Todos los planes</option>
                <option value="free">Plan Free</option>
                <option value="premium">Plan VIP ($4.99)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Usuaria</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Rol</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUsers.map(u => (
                  <tr key={u.uid} className="hover:bg-stone-50/70 transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center shrink-0 ${
                          u.isMaster ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xs' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {u.firstName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-stone-900">{u.displayName}</p>
                            {u.isMaster && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Superusuario
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-500">
                            {u.location ? `${u.location} • ` : ''}Reg: {new Date(u.createdAt).toLocaleDateString()}
                          </p>
                          {u.isMaster && (
                            <p className="text-[9px] text-emerald-700 font-medium">
                              Asesora & Soporte WhatsApp {u.whatsappNumber ? u.whatsappNumber : '(En blanco)'}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-stone-600">
                      {u.email}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.role === 'admin' 
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' 
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {u.role === 'admin' ? 'Administradora' : 'Usuaria'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-max ${
                        u.plan === 'premium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {u.plan === 'premium' && <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />}
                        <span>{u.plan === 'premium' ? 'VIP ($4.99)' : 'Gratuito'}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {u.status === 'active' ? 'Activo' : 'Suspendido'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      {u.isMaster ? (
                        <span className="text-[10px] text-emerald-800 font-bold px-2 py-1 bg-emerald-100 rounded-lg border border-emerald-300">
                          Máster / Superusuario
                        </span>
                      ) : (
                        <>
                          {/* Toggle Role Button */}
                          <button
                            onClick={() => updateUserRole(u.uid, u.role === 'admin' ? 'user' : 'admin')}
                            className="px-2.5 py-1 rounded-lg border border-stone-200 hover:border-indigo-300 text-[11px] font-semibold text-stone-700 hover:bg-indigo-50 cursor-pointer"
                            title="Alternar rol admin/user"
                          >
                            {u.role === 'admin' ? 'Hacer Usuaria' : 'Hacer Admin'}
                          </button>

                          {/* Toggle Plan Button */}
                          <button
                            onClick={() => updateUserPlan(u.uid, u.plan === 'premium' ? 'free' : 'premium')}
                            className="px-2.5 py-1 rounded-lg border border-stone-200 hover:border-amber-300 text-[11px] font-semibold text-stone-700 hover:bg-amber-50 cursor-pointer"
                            title="Alternar suscripción premium"
                          >
                            {u.plan === 'premium' ? 'Quitar VIP' : 'Asignar VIP'}
                          </button>

                          {/* Suspend Toggle */}
                          <button
                            onClick={() => toggleUserStatus(u.uid)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              u.status === 'active' 
                                ? 'border-stone-200 hover:border-red-300 text-stone-400 hover:text-red-600 hover:bg-red-50' 
                                : 'border-red-300 bg-red-50 text-red-600'
                            }`}
                            title={u.status === 'active' ? 'Suspender cuenta' : 'Reactivar cuenta'}
                          >
                            {u.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          </button>
                        </>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Tab 3: Master Seasons Palettes Inspector */}
      {activeTab === 'palettes' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Colección Maestra de Paletas (Firestore `palettes`)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Inspección de las 12 estaciones de colorimetría para calibración.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEASONS_LIST.map(s => (
              <div key={s.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900">{s.spanishTitle}</span>
                  <span className="text-[10px] text-stone-500 font-mono">{s.id}</span>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {s.palette.map((c, i) => (
                    <div 
                      key={i} 
                      className="h-6 rounded shadow-2xs" 
                      style={{ backgroundColor: c.hex }} 
                      title={`${c.name} (${c.hex})`} 
                    />
                  ))}
                </div>
                <div className="text-[10px] text-stone-600 flex justify-between">
                  <span>Metal: <strong>{s.metals.best[0]}</strong></span>
                  <span>12 colores activos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Pricing Settings */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 animate-in fade-in max-w-2xl">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Configuración de Planes y Tarifas
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Control de precios de suscripción para el mercado hispanohablante.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-stone-900 block">Plan Mensual VIP</span>
                <span className="text-xs text-stone-500">Acceso total a maquillaje HEX, armario cápsula y draping</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl font-bold text-stone-900">$4.99 USD</span>
                <span className="text-[10px] text-emerald-600 block">Activo</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-stone-900 block">Plan Anual VIP (Ahorro 33%)</span>
                <span className="text-xs text-stone-500">12 meses completos con renovación anual</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl font-bold text-stone-900">$39.99 USD</span>
                <span className="text-[10px] text-emerald-600 block">Activo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Admin Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Registro de Auditoría (`adminLogs`)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Historial de acciones administrativas realizadas en la plataforma.
            </p>
          </div>

          <div className="space-y-3">
            {adminLogs.map(log => (
              <div key={log.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{log.action}</span>
                    <span className="text-[10px] text-stone-500">por {log.adminEmail}</span>
                  </div>
                  <p className="text-stone-600">{log.details}</p>
                </div>
                <div className="text-right text-[10px] text-stone-400 shrink-0">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
