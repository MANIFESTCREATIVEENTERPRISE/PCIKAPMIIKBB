import { useState, Dispatch, SetStateAction } from "react";
import { 
  Plus, ClipboardList, CheckCircle2, ChevronRight, FileText, Truck, 
  MapPin, Clock, Printer, ToggleLeft, ToggleRight, XCircle, RefreshCw, Box
} from "lucide-react";
import { Order } from "../types/seller";

interface SellerOrderProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerOrder({
  orders,
  setOrders,
  isDarkMode,
  onTriggerNotification
}: SellerOrderProps) {
  const [activeTab, setActiveTab] = useState<"semua" | "masuk" | "diproses" | "dikirim" | "selesai" | "refund" | "komplain">("semua");
  
  // Modals for print simulation
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [resiOrder, setResiOrder] = useState<Order | null>(null);

  // Status step transitions
  const handleUpdateOrderStatus = (orderId: string, currentStatus: Order["status"], nextStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        onTriggerNotification(`Status transaksi ${orderId} diubah dari ${currentStatus} ke ${nextStatus}`);
        return {
          ...o,
          status: nextStatus,
          trackingNumber: nextStatus === "dikirim" ? `SPX-${Math.floor(10000000 + Math.random() * 90000000)}` : o.trackingNumber
        };
      }
      return o;
    }));
  };

  // Simulated dispute resolution
  const handleResolveDispute = (orderId: string, action: "refund" | "tolak") => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const nextStatus = action === "refund" ? "refund" : "selesai";
        onTriggerNotification(`Komplain transaksi ${orderId} ditiadakan. Hasil: ${action.toUpperCase()}`);
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  const filteredOrders = orders.filter(o => {
    if (activeTab === "semua") return true;
    return o.status === activeTab;
  });

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Manajemen Transaksi Ekosistem</h2>
        <p className="text-xs text-slate-400 font-medium">Lacak orderan masuk, print resi pengiriman bersandi barcode, urus COD, dan tanggapi klaim refund.</p>
      </div>

      {/* Tabs list bar */}
      <div className="flex border-b border-slate-100 dark:border-slate-850 flex-wrap gap-1.5 scrollbar-thin">
        {(["semua", "masuk", "diproses", "dikirim", "selesai", "refund", "komplain"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 text-xs font-black uppercase tracking-widest relative cursor-pointer ${
              activeTab === tab 
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.replace("_", " ")}
            <span className="ml-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-slate-500">
              {tab === "semua" ? orders.length : orders.filter(o => o.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Pipeline Orders List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.length === 0 ? (
          <div className={`p-12 rounded-[2rem] border text-center ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
            <ClipboardList className="mx-auto text-slate-300 mb-3" size={32} />
            <span className="text-xs pl-1 block font-bold text-slate-450 text-slate-400 uppercase tracking-widest">Tidak Ada Pesanan</span>
            <p className="text-[10px] text-slate-400 font-semibold mt-1 pl-1">Belum ada transaksi di tab ini atau data telah disaring selesai.</p>
          </div>
        ) : (
          filteredOrders.map((o) => (
            <div 
              key={o.id} 
              className={`p-6 rounded-3xl border transition-all hover:shadow-md ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
              }`}
            >
              {/* Card Header information */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b dark:border-slate-850 pb-3 gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200">{o.id}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-[11px] font-bold text-slate-400">{o.date} &bull; {o.customerName}</span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 text-[9px] rounded-full font-black uppercase tracking-wider ${
                    o.status === "masuk" ? "bg-blue-50 text-blue-600" :
                    o.status === "diproses" ? "bg-amber-50 text-amber-600" :
                    o.status === "dikirim" ? "bg-indigo-50 text-indigo-600" :
                    o.status === "selesai" ? "bg-green-50 text-green-600 text-green-700" :
                    "bg-red-50 text-red-600"
                  }`}>
                    {o.status.replace("_", " ")}
                  </span>
                  
                  <span className="text-[10px] text-slate-400 font-bold bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-md font-mono">
                    {o.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Items listing row */}
              <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block pl-0.5">Daftar Rincian Barang</span>
                  {o.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-xs font-bold pl-0.5 text-slate-700 dark:text-slate-300">
                      <span>{item.name} <span className="text-slate-400 text-[10px] font-bold">x{item.qty}</span></span>
                      <span className="font-mono text-slate-505 font-black">Rp {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping metadata / Expedisi right column */}
                <div className="md:col-span-3 text-xs leading-relaxed space-y-1.5 border-l-0 md:border-l pl-0 md:pl-6 dark:border-slate-850">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Truck size={12} /> Ekspedi &amp; Kurir
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-extrabold">{o.courier}</div>
                  {o.trackingNumber && (
                    <div className="text-[10px] text-blue-500 font-bold font-mono bg-blue-500/10 px-2 py-0.5 rounded-md w-max">
                      No Resi: {o.trackingNumber}
                    </div>
                  )}
                </div>

                {/* Total value side panel */}
                <div className="md:col-span-3 text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Total Pembayaran</span>
                  <span className="text-base font-black font-mono text-blue-600 block mt-1">Rp {o.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="pt-3 border-t dark:border-slate-850 flex flex-wrap gap-2.5 items-center justify-between">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setInvoiceOrder(o)}
                    className="px-3 py-1.5 border text-[10px] font-extrabold uppercase tracking-wide rounded-lg flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Printer size={12} /> Invoice
                  </button>
                  <button 
                    onClick={() => setResiOrder(o)}
                    className="px-3 py-1.5 border text-[10px] font-extrabold uppercase tracking-wide rounded-lg flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Printer size={12} /> Label Alamat/Resi
                  </button>
                </div>

                <div className="flex gap-2">
                  {o.status === "masuk" && (
                    <button 
                      onClick={() => handleUpdateOrderStatus(o.id, "masuk", "diproses")}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Terima &amp; Proses Pesanan &rarr;
                    </button>
                  )}
                  {o.status === "diproses" && (
                    <button 
                      onClick={() => handleUpdateOrderStatus(o.id, "diproses", "dikirim")}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Atur Pick Up / Kirim Barang &rarr;
                    </button>
                  )}
                  {o.status === "dikirim" && (
                    <button 
                      onClick={() => handleUpdateOrderStatus(o.id, "dikirim", "selesai")}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Konfirmasi Selesai (Simulasi) &rarr;
                    </button>
                  )}
                  {o.status === "komplain" && (
                    <div className="flex gap-2.5">
                      <button 
                        onClick={() => handleResolveDispute(o.id, "refund")}
                        className="px-3 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer"
                      >
                        Setujui Refund Dana
                      </button>
                      <button 
                        onClick={() => handleResolveDispute(o.id, "tolak")}
                        className="px-3 py-1.5 bg-slate-700 text-white hover:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer"
                      >
                        Tolak Komplain
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invoice Simulation Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] border max-w-lg w-full text-slate-800 relative shadow-2xl shrink-0">
            <button 
              onClick={() => setInvoiceOrder(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-lg cursor-pointer"
            >
              &times;
            </button>
            
            <div className="text-center pb-4 border-b">
              <span className="font-sans font-black text-lg tracking-tight uppercase text-blue-600">MARETOKO MARKETPLACE</span>
              <p className="text-[9px] text-slate-400 capitalize tracking-widest mt-1">Sertifikat Invoice Digital Pengguna Resmi</p>
            </div>

            <div className="py-4 space-y-3 text-xs leading-relaxed">
              <div className="flex justify-between font-bold dark:text-slate-700">
                <span>Nomor Invoice:</span>
                <span>INV/{invoiceOrder.id}/MARE/2026</span>
              </div>
              <div className="flex justify-between font-semibold dark:text-slate-700">
                <span>Tanggal Pembelian:</span>
                <span>{invoiceOrder.date}</span>
              </div>
              <div className="flex justify-between font-semibold dark:text-slate-700">
                <span>Detail Customer:</span>
                <span>{invoiceOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Metode Pembayaran:</span>
                <span className="font-bold">{invoiceOrder.paymentMethod}</span>
              </div>

              <div className="border-t border-b py-2 space-y-1 mt-4">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block mb-2">Item Belanja</span>
                {invoiceOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs dark:text-slate-700">
                    <span>{it.name} (x{it.qty})</span>
                    <span>Rp {(it.qty * it.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm font-black text-blue-600 pt-2">
                <span>Total Bersih:</span>
                <span>Rp {invoiceOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => { setInvoiceOrder(null); onTriggerNotification("Invoice berhasil dicetak!"); }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl mt-4 cursor-pointer"
            >
              Cetak Dokumen Invoice (PDF)
            </button>
          </div>
        </div>
      )}

      {/* Label Packaging Resi simulation */}
      {resiOrder && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] border max-w-md w-full text-slate-800 relative shadow-2xl shrink-0">
            <button 
              onClick={() => setResiOrder(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100% hover:bg-slate-200 flex items-center justify-center font-bold text-lg cursor-pointer"
            >
              &times;
            </button>

            <div className="border-2 border-black p-4 space-y-4 rounded-xl text-left">
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div className="flex flex-col">
                  <span className="text-xs font-black">EXPEDISI: {resiOrder.courier}</span>
                  <span className="text-[10px] font-bold mt-1">COD: {resiOrder.paymentMethod === "COD" ? "YA (Rp " + resiOrder.total.toLocaleString() + ")" : "TIDAK"}</span>
                </div>
                <div className="bg-black text-white px-2 py-1 text-xs font-black tracking-widest uppercase">
                  REGULER
                </div>
              </div>

              {/* Barcode visual simulation */}
              <div className="py-2 flex flex-col items-center justify-center border-b-2 border-black">
                <div className="h-10 w-full flex items-center justify-between gap-px bg-slate-900 border-none px-4 py-1 self-stretch">
                  <span className="text-white text-[9px] font-mono tracking-widest text-center w-full">||||| | |||| | ||||| | |||| | |||</span>
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase mt-1">*{resiOrder.id}*</span>
              </div>

              <div className="text-[11px] leading-relaxed space-y-2 font-sans">
                <div>
                  <span className="font-bold uppercase tracking-wider text-[9px] text-slate-400 block">Penerima:</span>
                  <span className="font-extrabold block text-xs">{resiOrder.customerName}</span>
                  <span className="text-[10px] text-slate-500 font-medium block">Jl. Merdeka Baru No. 88, Ngamprah, Kab. Bandung Barat, Jawa Barat - 40552</span>
                </div>
                <div className="border-t pt-2">
                  <span className="font-bold uppercase tracking-wider text-[9px] text-slate-400 block">Pengirim:</span>
                  <span className="font-bold block text-xs">Maretoko Seller Center</span>
                  <span className="text-[10px] text-slate-500 font-medium block">Bandung Barat - Office Cluster G-12</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setResiOrder(null); onTriggerNotification("Barcode label pengiriman dicetak!"); }}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl mt-5 cursor-pointer"
            >
              Cetak Label Alamat &amp; Barcode &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
