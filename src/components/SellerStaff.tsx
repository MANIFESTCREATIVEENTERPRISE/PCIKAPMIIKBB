import React, { useState } from "react";
import { 
  UserCheck, Shield, Plus, Key, ToggleLeft, ToggleRight, 
  Trash2, Landmark, Clock, Activity, Lock, AlertCircle
} from "lucide-react";
import { Staff, AuditLog } from "../types/seller";
import { INITIAL_STAFFS, INITIAL_AUDIT_LOGS } from "../data/sellerMockData";

interface SellerStaffProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerStaff({
  isDarkMode,
  onTriggerNotification
}: SellerStaffProps) {
  const [staffs, setStaffs] = useState<Staff[]>(INITIAL_STAFFS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [showAddForm, setShowAddForm] = useState(false);

  // New staff form structure helper
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "Staff Operasional" as Staff["role"]
  });

  const handleAddNewStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) {
      onTriggerNotification("Input nama & email staf terlebih dahulu!");
      return;
    }

    const created: Staff = {
      id: `STF-00${staffs.length + 1}`,
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role,
      status: "aktif",
      permissions: {
        manageProducts: newStaff.role !== "Staff Operasional",
        manageFinances: newStaff.role === "Seller",
        manageStaff: newStaff.role === "Seller",
        manageOrders: true
      }
    };

    setStaffs(prev => [...prev, created]);
    setShowAddForm(false);
    onTriggerNotification(`Sukses mendaftarkan staff baru: ${created.name} (${created.role})`);
    
    // Add to audit logs
    const newLog: AuditLog = {
      id: `LOG-${Math.floor(9000 + Math.random() * 950)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      user: "Wahyu Setiawan",
      role: "Seller",
      action: `Mendaftarkan staff baru "${created.name}" dengan akses ${created.role}`,
      ip: "182.1.203.4"
    };
    setAuditLogs(prev => [newLog, ...prev]);

    setNewStaff({ name: "", email: "", role: "Staff Operasional" });
  };

  const togglePermission = (staffId: string, actionKey: keyof Staff["permissions"]) => {
    setStaffs(prev => prev.map(s => {
      if (s.id === staffId) {
        // Prevent editing Main Seller
        if (s.role === "Seller") {
          onTriggerNotification("Gagal! Akses owner/seller utama tidak dapat direduksi.");
          return s;
        }

        const nextVal = !s.permissions[actionKey];
        onTriggerNotification(`Akses ${actionKey} untuk ${s.name} diubah menjadi ${nextVal}`);
        return {
          ...s,
          permissions: {
            ...s.permissions,
            [actionKey]: nextVal
          }
        };
      }
      return s;
    }));
  };

  const handleDeleteStaff = (id: string, name: string) => {
    setStaffs(prev => prev.filter(s => s.id !== id));
    onTriggerNotification(`Staf "${name}" dinonaktifkan dari administrasi.`);
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans">Multi-User Staff &amp; Kontrol Hak Akses</h2>
          <p className="text-xs text-slate-400 font-medium">Delegasikan otorisasi pengemasan barang, filter wewenang kasir finansial, dan audit histori aktivitas IP address staf.</p>
        </div>

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus size={14} /> Daftarkan Staff Baru
        </button>
      </div>

      {/* Add Staff form */}
      {showAddForm && (
        <form onSubmit={handleAddNewStaff} className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"} space-y-4 animate-slideDown`}>
          <div className="flex justify-between items-center pb-2 border-b dark:border-slate-800">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest pl-1">Form Staff Baru</h3>
            <button type="button" className="text-xs font-bold text-slate-400" onClick={() => setShowAddForm(false)}>Batal</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Nama Lengkap Staff</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Linda Permatasari" 
                value={newStaff.name}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs outline-none focus:ring-2 focus:ring-blue-600" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">E-mail Akses Portal</label>
              <input 
                type="email" 
                required
                placeholder="linda@maretoko.com" 
                value={newStaff.email}
                onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs outline-none focus:ring-2 focus:ring-blue-600" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Pilih Role Jabatan</label>
              <select 
                value={newStaff.role}
                onChange={(e) => setNewStaff({...newStaff, role: e.target.value as any})}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs outline-none"
              >
                <option value="Admin Toko">Admin Toko</option>
                <option value="Staff Operasional">Staff Operasional</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            Suntikkan Akses Ke DB Staf Toko &rarr;
          </button>
        </form>
      )}

      {/* Main grids: Staff Table & Audit Trail Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column Staff List - cols 8 */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-8 flex flex-col text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
        }`}>
          <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800 mb-4">
            <h3 className="text-sm font-black tracking-tight">Otorisasi Staff Operator</h3>
            <span className="text-[10px] text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">Total: {staffs.length} Staf</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 font-extrabold text-[9px] uppercase tracking-wider border-b dark:border-slate-800">
                  <th className="px-3 py-2">Detail Operator</th>
                  <th className="px-3 py-2">Finansial</th>
                  <th className="px-3 py-2">Produk</th>
                  <th className="px-3 py-2">Transaksi</th>
                  <th className="px-3 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {staffs.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                    <td className="px-3 py-3 font-semibold">
                      <div className="flex flex-col">
                        <span>{s.name}</span>
                        <span className="text-[9px] text-slate-400 font-bold mt-1 font-mono uppercase">{s.role}</span>
                      </div>
                    </td>

                    <td className="px-3 py-3">
                      <button onClick={() => togglePermission(s.id, "manageFinances")} title="Ubah Otorisasi Finansial" className="cursor-pointer">
                        {s.permissions.manageFinances ? <ToggleRight size={18} className="text-blue-500" /> : <ToggleLeft size={18} className="text-slate-350" />}
                      </button>
                    </td>

                    <td className="px-3 py-3">
                      <button onClick={() => togglePermission(s.id, "manageProducts")} title="Ubah Otorisasi Katalog" className="cursor-pointer">
                        {s.permissions.manageProducts ? <ToggleRight size={18} className="text-blue-500" /> : <ToggleLeft size={18} className="text-slate-350" />}
                      </button>
                    </td>

                    <td className="px-3 py-3">
                      <button onClick={() => togglePermission(s.id, "manageOrders")} title="Ubah Otorisasi Kemas/Resi" className="cursor-pointer">
                        {s.permissions.manageOrders ? <ToggleRight size={18} className="text-blue-500" /> : <ToggleLeft size={18} className="text-slate-350" />}
                      </button>
                    </td>

                    <td className="px-3 py-3 text-right">
                      {s.role !== "Seller" && (
                        <button onClick={() => handleDeleteStaff(s.id, s.name)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Logger Audit Trail - cols 4 */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-4 text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
        }`}>
          <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800 mb-4">
            <h3 className="text-sm font-black tracking-tight">Audit Trail Operator Logs</h3>
            <Activity size={16} className="text-blue-500 animate-pulse" />
          </div>

          <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-850 text-[10px] leading-relaxed">
                <div className="flex justify-between items-center text-slate-400 font-bold mb-1 font-mono">
                  <span>{log.user} ({log.role})</span>
                  <span>{log.timestamp.slice(11, 16)}</span>
                </div>
                <p className="font-semibold text-slate-650 text-slate-500 dark:text-slate-305">{log.action}</p>
                <span className="text-[8px] mt-1.5 block text-slate-400 font-mono">IP Access: {log.ip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
