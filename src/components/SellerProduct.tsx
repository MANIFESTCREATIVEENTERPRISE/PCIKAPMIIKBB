import React, { useState, Dispatch, SetStateAction } from "react";
import { 
  Plus, Edit2, Trash2, ArrowUpRight, ArrowDownLeft, Sparkles, 
  Upload, Eye, HelpCircle, ToggleLeft, ToggleRight, CheckCircle, Smartphone
} from "lucide-react";
import { Product } from "../types/seller";

interface SellerProductProps {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerProduct({
  products,
  setProducts,
  isDarkMode,
  onTriggerNotification
}: SellerProductProps) {
  const [activeTab, setActiveTab] = useState<"semua" | "aktif" | "draft" | "habis" | "ditolak" | "trending">("semua");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [generatedAiDesc, setGeneratedAiDesc] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiHeadline, setAiHeadline] = useState("");

  // Product Preview Modal or Detail
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // New Product Form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Aksesoris Elektronik",
    sku: "",
    price: "",
    discountPrice: "",
    stock: "",
    type: "fisik" as "fisik" | "digital",
    image: "",
    description: "",
    weight: "200"
  });

  // Generate AI descriptions
  const handleGenerateAiDescription = () => {
    if (!newProduct.name || !newProduct.category) {
      onTriggerNotification("Gagal! Masukkan 'Nama Produk' dan 'Kategori' terlebih dahulu untuk data AI.");
      return;
    }
    setAiGenerating(true);
    setTimeout(() => {
      const generated = `🔥 TEMUKAN SOLUSI TERBAIK UNTUK ANDA! 🔥

Memperkenalkan "${newProduct.name}", sebuah terobosan baru kategori ${newProduct.category} yang dirancang khusus untuk kenyamanan maksimal Anda.

Keunggulan Produk Kami:
✅ Kualitas Premium Terbaik: Dibuat dari material premium yang kuat, tahan lama, dan berestetika tinggi.
✅ Desain Ergonomis & Modern: Sangat cocok untuk mendampingi gaya hidup profesional aktif masa kini.
✅ Garansi Resmi Toko Mitra: Layanan support purna jual 24 jam penuh untuk kepuasan Anda.
✅ Ramah Lingkungan: Diproses secara higienis menggunakan kemasan mudah didaur ulang.

Beli sekarang dan dapatkan diskon promo terbatas ini hanya di Maretoko Marketplace!`;
      setGeneratedAiDesc(generated);
      setNewProduct(prev => ({ ...prev, description: generated }));
      setAiGenerating(false);
      onTriggerNotification("AI Deskripsi berhasil dibuat secara otomatis!");
    }, 1200);
  };

  // Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      onTriggerNotification("Gagal! Mohon lengkapi semua tanda wajib.");
      return;
    }

    const priceNum = parseFloat(newProduct.price);
    const discountNum = newProduct.discountPrice ? parseFloat(newProduct.discountPrice) : undefined;
    const stockNum = parseInt(newProduct.stock);

    const created: Product = {
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: newProduct.name,
      category: newProduct.category,
      sku: newProduct.sku || `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      price: priceNum,
      discountPrice: discountNum,
      stock: stockNum,
      status: stockNum === 0 ? "habis" : "aktif",
      type: newProduct.type,
      sales: 0,
      image: newProduct.image || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: newProduct.description,
      weight: parseFloat(newProduct.weight)
    };

    setProducts(prev => [created, ...prev]);
    setShowAddForm(false);
    onTriggerNotification(`Sukses! Produk "${created.name}" berhasil ditambahkan ke katalog.`);
    
    // Reset state
    setNewProduct({
      name: "",
      category: "Aksesoris Elektronik",
      sku: "",
      price: "",
      discountPrice: "",
      stock: "",
      type: "fisik" as "fisik" | "digital",
      image: "",
      description: "",
      weight: "200"
    });
    setGeneratedAiDesc("");
  };

  // Delete product
  const handleDeleteProduct = (id: string, name: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    onTriggerNotification(`Produk "${name}" berhasil dihapus dari katalog.`);
  };

  // Simulated Bulk Upload Submit
  const [csvFile, setCsvFile] = useState<string>("");
  const handleBulkUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile) {
      onTriggerNotification("Mohon salin teks CSV terlebih dahulu.");
      return;
    }

    // Just load a default simulated set of products from the CSV block
    setTimeout(() => {
      onTriggerNotification("Katalog massal berhasil divalidasi & 4 Produk baru berhasil diunggah!");
      setShowBulkUpload(false);
      setCsvFile("");
    }, 1000);
  };

  // Switch status product
  const toggleProductStatus = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === "aktif" ? "draft" : "aktif";
        onTriggerNotification(`Status produk ${p.name} diubah menjadi ${nextStatus}`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const filteredProducts = products.filter(p => {
    if (activeTab === "semua") return true;
    return p.status === activeTab;
  });

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Page header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Katalog Manajemen Produk</h2>
          <p className="text-xs text-slate-400 font-medium">Kelola, sunting, buat varian dan pantau ketersediaan stok produk Anda.</p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setShowBulkUpload(!showBulkUpload)}
            className={`px-4 py-2 border rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              isDarkMode ? "border-slate-800 hover:bg-slate-800 text-slate-200" : "border-slate-150 hover:bg-slate-50 text-slate-700"
            }`}
          >
            <Upload size={14} /> Mass Import
          </button>
          
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl text-xs bg-blue-600 hover:bg-blue-700 text-white font-black flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10"
          >
            <Plus size={14} /> Tambah Produk Baru
          </button>
        </div>
      </div>

      {/* CSV Bulk Upload Simulator Panel */}
      {showBulkUpload && (
        <div id="bulk-upload-widget" className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} shadow-xl animate-slideDown`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-black text-slate-805 dark:text-slate-100">Bulk Upload CSV Generator</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Salin data spreadsheet barang Anda untuk impor otomatis secara instan.</p>
            </div>
            <button className="text-xs text-slate-400 font-bold hover:underline" onClick={() => setShowBulkUpload(false)}>Tutup</button>
          </div>
          
          <form onSubmit={handleBulkUploadSubmit} className="space-y-4">
            <textarea 
              rows={4}
              value={csvFile}
              onChange={(e) => setCsvFile(e.target.value)}
              placeholder="nama_produk,kategori,sku,harga_satuan,stok_gudang,tipe_produk&#10;Keychron K2 Switch,Elektronik,KCH-01,980000,24,fisik&#10;Mentoring Figma,Pendidikan,MNT-FG,120000,999,digital"
              className="w-full p-3 font-mono text-[10px] border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
            <button 
              type="submit"
              className="w-full py-2 rounded-xl bg-slate-705 hover:bg-slate-800 text-xs text-white font-extrabold cursor-pointer"
            >
              Unggah File &amp; Sinkronkan Katalog
            </button>
          </form>
        </div>
      )}

      {/* Product Form Panel */}
      {showAddForm && (
        <div id="product-registration-form" className={`p-8 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} shadow-2xl animate-slideDown`}>
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
            <h3 className="text-base font-black text-blue-600">Form Tambah Produk Baru</h3>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-700" onClick={() => setShowAddForm(false)}>Batal &amp; Tutup</button>
          </div>

          <form onSubmit={handleAddProductSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Product input left */}
              <div className="space-y-4 md:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nama Produk *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ergonomic Desk Organizer"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Kategori Produk *</label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800"
                    >
                      <option value="Aksesoris Elektronik">Aksesoris Elektronik</option>
                      <option value="Home & Office">Home & Office</option>
                      <option value="Software Tool">Software Tool</option>
                      <option value="E-Book">E-Book</option>
                      <option value="Smart Wearables">Smart Wearables</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">SKU / Kode Unik</label>
                    <input 
                      type="text" 
                      placeholder="e.g. KCH-092-ORG"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Stok Awal *</label>
                    <input 
                      type="number" 
                      required
                      placeholder="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tipe Produk</label>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setNewProduct({...newProduct, type: "fisik"})}
                        className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg border transition-all ${
                          newProduct.type === "fisik" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 dark:bg-slate-950 border-slate-200 text-slate-400"
                        }`}
                      >
                        Fisik
                      </button>
                      <button 
                        type="button"
                        onClick={() => setNewProduct({...newProduct, type: "digital"})}
                        className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg border transition-all ${
                          newProduct.type === "digital" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 dark:bg-slate-950 border-slate-200 text-slate-400"
                        }`}
                      >
                        Digital
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Harga Normal (Rp) *</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 189000"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Harga Diskon (Rp)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 159000"
                      value={newProduct.discountPrice}
                      onChange={(e) => setNewProduct({...newProduct, discountPrice: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Berat Kirim (Gram)</label>
                    <input 
                      type="number" 
                      disabled={newProduct.type === "digital"}
                      placeholder="200"
                      value={newProduct.weight}
                      onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* AI Description Creator */}
                <div className="space-y-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-100/50">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 flex items-center gap-1.5 animate-pulse">
                      <Sparkles size={14} /> AI Product Description Generator
                    </span>
                    <button 
                      type="button"
                      onClick={handleGenerateAiDescription}
                      disabled={aiGenerating}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[9px] font-black tracking-widest uppercase cursor-pointer disabled:opacity-50"
                    >
                      {aiGenerating ? "Membuat..." : "Buat Deskripsi AI &rarr;"}
                    </button>
                  </div>
                  <textarea 
                    rows={5}
                    placeholder="Tulis deskripsi produk secara manual atau gunakan generator AI di atas..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full p-3 text-xs border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed font-semibold text-slate-700 dark:text-slate-300"
                  ></textarea>
                </div>
              </div>

              {/* Cover Image URL Selection Right panel */}
              <div className="md:col-span-4 space-y-4 text-center flex flex-col justify-between">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 text-left">URL Foto Sampul Produk</label>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/... (Image URL)"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 outline-none text-xs font-medium focus:ring-2 focus:ring-blue-600 dark:border-slate-800"
                  />
                  <div className={`mt-4 border border-dashed rounded-2xl p-6 flex flex-col justify-center items-center gap-3 transition-colors ${
                    isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-150"
                  }`}>
                    {newProduct.image ? (
                      <img src={newProduct.image} className="w-full h-36 object-contain rounded-xl" alt="Preview Image" />
                    ) : (
                      <>
                        <Upload size={28} className="text-slate-300" />
                        <span className="text-[10px] text-slate-400 font-bold">Preview Foto Kosong</span>
                        <span className="text-[8px] text-slate-400 uppercase font-bold tracking-widest pl-1">Masukan URL unsplash pilihan Anda</span>
                      </>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Publish Produk ke Toko &rarr;
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tabs list filtering */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 flex-wrap gap-2">
        {(["semua", "aktif", "draft", "habis", "ditolak", "trending"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest relative cursor-pointer ${
              activeTab === tab 
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
            {tab !== "semua" && (
              <span className="ml-1.5 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-slate-500">
                {products.filter(p => p.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table Data Catalog */}
      <div className={`overflow-x-auto rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"}`}>
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className={`border-b border-slate-100 dark:border-slate-800 ${
              isDarkMode ? "bg-slate-950/40 text-slate-400" : "bg-slate-50/50 text-slate-400"
            }`}>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px]">Detail Produk</th>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px]">Kategori &amp; SKU</th>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px]">Tipe</th>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px]">Harga</th>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px]">Stok</th>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px]">Sales</th>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px]">Status</th>
              <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px] text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-950/20 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-12 h-12 object-cover rounded-xl border border-slate-100 dark:border-slate-800 shrink-0" alt="" referrerPolicy="no-referrer" />
                    <div>
                      <span className="font-sans font-extrabold block text-slate-800 dark:text-slate-200">{p.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-1">ID: # {p.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-500">
                  <span className="block">{p.category}</span>
                  <span className="text-[10px] text-slate-400 mt-1 block font-mono uppercase">{p.sku}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    p.type === "digital" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {p.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-black text-slate-850 dark:text-slate-100">
                  {p.discountPrice ? (
                    <div>
                      <span className="block">Rp {p.discountPrice.toLocaleString()}</span>
                      <span className="text-[9px] text-slate-400 line-through">Rp {p.price.toLocaleString()}</span>
                    </div>
                  ) : (
                    "Rp " + p.price.toLocaleString()
                  )}
                </td>
                <td className="px-6 py-4 font-sans font-bold text-slate-700 dark:text-slate-300">
                  <span className={p.stock === 0 ? "text-red-500 font-extrabold" : ""}>{p.stock} Qty</span>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-slate-500">
                  {p.sales}pcs
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleProductStatus(p.id)}
                    className={`px-2 w-max inline-block py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      p.status === "aktif" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" :
                      p.status === "trending" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40" :
                      p.status === "draft" ? "bg-slate-100 text-slate-500" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <button 
                      onClick={() => setPreviewProduct(p)}
                      title="Preview Halaman Toko" 
                      className="p-1.5 rounded-lg border hover:bg-slate-50 text-slate-500 cursor-pointer"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      onClick={() => toggleProductStatus(p.id)}
                      title="Ubah Aktif/Draft" 
                      className="p-1.5 rounded-lg border hover:bg-slate-50 text-slate-500 cursor-pointer"
                    >
                      {p.status === "aktif" ? <ToggleRight size={14} className="text-blue-500" /> : <ToggleLeft size={14} />}
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(p.id, p.name)}
                      title="Hapus Produk" 
                      className="p-1.5 rounded-lg border hover:bg-red-50 text-red-500 cursor-pointer border-none"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dynamic Simulator Product Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className={`p-8 rounded-[2.5rem] border max-w-lg w-full relative shrink-0 ${
            isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-100 text-slate-800"
          }`}>
            <button 
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center hover:bg-slate-10s text-slate-400 cursor-pointer"
            >
              &times;
            </button>
            <div className="flex gap-2 items-center mb-4">
              <span className="text-[10px] text-white bg-blue-600 font-extrabold uppercase px-3 py-1 rounded-full">SIMULASI PREVIEW TOKO</span>
              <span className={`text-[10px] font-black uppercase ${previewProduct.type === "digital" ? "text-purple-500" : "text-amber-500"}`}>{previewProduct.type}</span>
            </div>
            
            <img src={previewProduct.image} className="w-full h-44 object-cover rounded-2xl mb-4 border" alt="" referrerPolicy="no-referrer" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{previewProduct.sku}</span>
            <h4 className="text-xl font-display font-black tracking-tight mt-1 leading-tight text-slate-900 dark:text-white">{previewProduct.name}</h4>
            
            <div className="flex items-center gap-3 mt-3">
              <span className="text-lg font-black font-mono text-blue-600">Rp {previewProduct.discountPrice?.toLocaleString() || previewProduct.price.toLocaleString()}</span>
              {previewProduct.discountPrice && (
                <span className="text-xs text-slate-400 line-through">Rp {previewProduct.price.toLocaleString()}</span>
              )}
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 max-h-32 overflow-y-auto">
              {previewProduct.description || "Tidak ada deskripsi detail produk."}
            </p>

            <div className="mt-4 pt-4 border-t dark:border-slate-800 flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase">
              <span>Stok: {previewProduct.stock} pcs</span>
              <span>Berat: {previewProduct.weight} Gram</span>
            </div>
            
            <button 
              onClick={() => { setPreviewProduct(null); onTriggerNotification("Beralih ke mockup editor"); }}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-905 text-white rounded-2xl text-xs font-black uppercase tracking-wider mt-5"
            >
              Simulasikan Transaksi Pelanggan &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
