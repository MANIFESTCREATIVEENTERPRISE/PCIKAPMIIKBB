import { useState, FormEvent } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Star, 
  MessageSquare, 
  Briefcase, 
  UploadCloud, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  Plus, 
  Minus, 
  X, 
  ArrowRight, 
  CreditCard, 
  Tag, 
  Percent, 
  Clock, 
  Search, 
  Info,
  Calendar,
  Building2,
  Bookmark
} from "lucide-react";
import { 
  PHYSICAL_PRODUCTS, 
  SERVICES_CATALOG, 
  KAMARA_PACKAGES, 
  PROMO_ITEMS,
  ProductItem,
  ServiceItem,
  PackageItem,
  PromoItem
} from "../data/kamaraData";

export default function UMKM() {
  return (
    <div className="py-12 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="katalog" element={<KatalogView />} />
          <Route path="kerjasama" element={<KerjasamaForm />} />
          <Route path="/" element={<KatalogView />} />
        </Routes>
      </div>
    </div>
  );
}

function KatalogView() {
  const [activeTab, setActiveTab] = useState<"products" | "services" | "packages" | "promos">("products");
  
  // Custom products from Mitra KAMARA dashboard
  const [customProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem("kamara_custom_products");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const mergedProducts = [...customProducts, ...PHYSICAL_PRODUCTS];
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Category filter state
  const [productCat, setProductCat] = useState<string>("Semua");
  const [serviceCat, setServiceCat] = useState<string>("Semua");

  // Tag filter state (Recommendation)
  const [productTag, setProductTag] = useState<string>("");
  const [serviceTag, setServiceTag] = useState<string>("");

  // Modals state
  const [detailItem, setDetailItem] = useState<{
    type: "product" | "service" | "package";
    data: any;
  } | null>(null);

  const [orderItem, setOrderItem] = useState<{
    type: "product" | "service" | "package" | "promo";
    data: any;
  } | null>(null);

  // Shopping Cart States
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart Checkout form fields
  const [cartForm, setCartForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "BSI-Transfer",
    notes: ""
  });

  // Form checkout state
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    notes: "",
    paymentMethod: "BSI-Transfer",
    serviceActionType: "Konsultasi"
  });

  const [orderCompleted, setOrderCompleted] = useState<any | null>(null);

  const handleOpenOrder = (type: "product" | "service" | "package" | "promo", data: any) => {
    setOrderForm({
      name: "",
      phone: "",
      address: "",
      quantity: 1,
      notes: "",
      paymentMethod: "BSI-Transfer",
      serviceActionType: "Konsultasi"
    });
    setOrderCompleted(null);
    setOrderItem({ type, data });
  };

  const handleAddToCart = (product: ProductItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`Berhasil menambahkan "${product.name}" ke keranjang!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCartQtyChange = (productId: string, val: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + val;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as { product: ProductItem; quantity: number }[];
    });
  };

  const handleCartCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const invoiceId = "CART-" + Math.floor(100000 + Math.random() * 900000);
    const grandTotalNum = cart.reduce((total, c) => total + (c.product.priceNum * c.quantity), 0);
    
    // Compile items text
    const compiledItemNames = cart.map(c => `${c.product.name} (x${c.quantity})`).join(", ");
    
    // Create the orderCompleted format for cart checkout
    const cartInvoice = {
      id: invoiceId,
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
      item: compiledItemNames,
      price: "Rincian di WA / List Keranjang",
      quantity: cart.reduce((total, c) => total + c.quantity, 0),
      total: "Rp " + grandTotalNum.toLocaleString("id-ID"),
      payment: cartForm.paymentMethod === "BSI-Transfer" 
        ? "Transfer Bank Syariah Mandiri (BSI)" 
        : cartForm.paymentMethod === "EWallet-QRIS" 
          ? "QRIS KAMARA (DANA/Ovo/ShopeePay)"
          : "Cash on Delivery (COD) / Ambil Sekretariat",
      buyer: cartForm.name,
      phone: cartForm.phone,
      address: cartForm.address,
      notes: cartForm.notes,
      isCart: true,
      itemsBreakdown: cart.map(c => ({
        name: c.product.name,
        qty: c.quantity,
        price: c.product.price,
        subtotal: "Rp " + (c.product.priceNum * c.quantity).toLocaleString("id-ID")
      }))
    };

    setOrderCompleted(cartInvoice);
    setCart([]); // Clear cart after checking out
    setIsCartOpen(false);
  };

  const handleQtyChange = (val: number) => {
    setOrderForm(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + val)
    }));
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Calculate total price based on product vs service vs package
    let itemName = orderItem?.data?.name || "Layanan/Produk";
    let itemPriceStr = orderItem?.data?.price || orderItem?.data?.priceStart || orderItem?.data?.promoPrice || "0";
    let itemPriceNum = orderItem?.data?.priceNum || orderItem?.data?.priceStartNum || 0;
    
    // Parse promo price numbers
    if (orderItem?.type === "promo" && !itemPriceNum) {
      const match = itemPriceStr.replace(/[^0-9]/g, "");
      itemPriceNum = parseInt(match) || 0;
    }

    const isConsultation = orderItem?.type === "service" && orderForm.serviceActionType === "Konsultasi";
    const total = isConsultation ? 0 : (itemPriceNum * orderForm.quantity);
    
    const invoiceId = isConsultation 
      ? "KONSUL-" + Math.floor(100000 + Math.random() * 900000)
      : "KAMARA-" + Math.floor(100000 + Math.random() * 900000);
      
    const invoice = {
      id: invoiceId,
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
      item: itemName + (isConsultation ? " [KONSULTASI JASA]" : ""),
      price: isConsultation ? "Gratis Sesi Diskusi" : itemPriceStr,
      quantity: orderForm.quantity,
      total: isConsultation ? "Rp 0 (Gratis Sesi Diskusi)" : ("Rp " + total.toLocaleString("id-ID")),
      payment: isConsultation 
        ? "Konsultasi Terbuka (Via WhatsApp)" 
        : (orderForm.paymentMethod === "BSI-Transfer" 
          ? "Transfer Bank Syariah Mandiri (BSI)" 
          : orderForm.paymentMethod === "EWallet-QRIS" 
            ? "QRIS KAMARA (DANA/Ovo/ShopeePay)"
            : "Cash on Delivery (COD) / Ambil Sekretariat"),
      buyer: orderForm.name,
      phone: orderForm.phone,
      address: orderForm.address,
      notes: orderForm.notes
    };

    setOrderCompleted(invoice);
  };

  const sendWhatsAppInvoice = () => {
    if (!orderCompleted) return;
    
    const whatsAppNumber = "6282115991771"; // Koperasi KAMARA Care
    const isConsultation = orderCompleted.id.startsWith("KONSUL-");
    const isCartInvoice = orderCompleted.isCart;
    
    let message = "";
    if (isConsultation) {
      message = `*PERMINTAAN KONSULTASI JASA KAMARA* 💬
-------------------------------------------
🆔 *No. Konsultasi*: #${orderCompleted.id}
📅 *Tanggal*: ${orderCompleted.date}
👤 *Nama*: ${orderCompleted.buyer}
📞 *No. WhatsApp*: ${orderCompleted.phone}
📌 *Alamat / Lokasi*: ${orderCompleted.address}
-------------------------------------------
💼 *Layanan Jasa*: ${orderCompleted.item}
💬 *Status*: Memerlukan Sesi Diskusi / Konsultasi Awal (Gratis)
📝 *Topik / Catatan*: ${orderCompleted.notes || "Ingin berdiskusi mengenai penawaran dan prosedur layanan."}
-------------------------------------------
_Mohon jadwalkan sesi konsultasi dengan admin untuk kelanjutan proyek kami. Terima kasih_ 🙏`;
    } else if (isCartInvoice) {
      const itemsText = orderCompleted.itemsBreakdown.map((it: any, idx: number) => {
        return `${idx + 1}. *${it.name}* (x${it.qty}) -> ${it.subtotal}`;
      }).join("\n");

      message = `*NOTA PEMESANAN KERANJANG KAMARA* 🛒📦
-------------------------------------------
🆔 *No. Tagihan*: #${orderCompleted.id}
📅 *Tanggal*: ${orderCompleted.date}
👤 *Nama Pembeli*: ${orderCompleted.buyer}
📞 *No. WhatsApp*: ${orderCompleted.phone}
🏠 *Alamat Kirim*: ${orderCompleted.address}
-------------------------------------------
🛍️ *Rincian Belanja*:
${itemsText}

💰 *Total Pembayaran*: *${orderCompleted.total}*
💳 *Metode Bayar*: ${orderCompleted.payment}
📝 *Catatan Khusus*: ${orderCompleted.notes || "-"}
-------------------------------------------
_Terima kasih telah berbelanja melalui ekosistem alumni PMII Bandung Barat. Bukti transfer akan kami kirimkan dalam obrolan chat ini_ 🙏`;
    } else {
      message = `*NOTA PEMESANAN PASAR KAMARA* 📦
-------------------------------------------
🆔 *No. Tagihan*: #${orderCompleted.id}
📅 *Tanggal*: ${orderCompleted.date}
👤 *Nama Pembeli*: ${orderCompleted.buyer}
📞 *No. WhatsApp*: ${orderCompleted.phone}
🏠 *Alamat Kirim*: ${orderCompleted.address}
-------------------------------------------
🛍️ *Item*: ${orderCompleted.item}
💵 *Harga*: ${orderCompleted.price}
🔢 *Jumlah*: ${orderCompleted.quantity} Pcs / Paket
💰 *Total Tagihan*: ${orderCompleted.total}

💳 *Metode Bayar*: ${orderCompleted.payment}
📝 *Catatan*: ${orderCompleted.notes || "-"}
-------------------------------------------
_Terima kasih telah memesan melalui ekosistem alumni PMII Bandung Barat. Silakan transfer ke rekening resmi atau lakukan pembayaran sesuai panduan_ 🙏`;
    }

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsAppNumber}?text=${encodedText}`, "_blank");
  };

  // Pre-filter variables and search logic
  const filteredProducts = mergedProducts.filter(p => {
    const sQuery = searchQuery.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(sQuery) || 
                        p.description.toLowerCase().includes(sQuery) ||
                        p.provider.toLowerCase().includes(sQuery) ||
                        p.subCategory.toLowerCase().includes(sQuery);

    const matchCategory = productCat === "Semua" || p.category === productCat || p.subCategory === productCat;
    
    // Tag filter helpers
    let matchTag = true;
    if (productTag === "Terlaris") {
      matchTag = p.rating >= 4.8;
    } else if (productTag === "Baru") {
      matchTag = p.id === "prod-1" || p.id === "prod-5" || p.id === "prod-9" || p.id === "prod-16";
    } else if (productTag === "Mitra") {
      matchTag = p.provider.includes("Mitra") || p.provider.includes("Alumni") || p.provider.includes("Kriya");
    }

    return matchSearch && matchCategory && matchTag;
  });

  const filteredServices = SERVICES_CATALOG.filter(s => {
    const sQuery = searchQuery.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(sQuery) ||
                        s.description.toLowerCase().includes(sQuery) ||
                        s.provider.toLowerCase().includes(sQuery);

    const matchCategory = serviceCat === "Semua" || s.category === serviceCat || s.subCategory === serviceCat;

    let matchTag = true;
    if (serviceTag === "Favorit") {
      matchTag = s.id === "serv-1" || s.id === "serv-2" || s.id === "serv-4";
    }

    return matchSearch && matchCategory && matchTag;
  });

  return (
    <div className="space-y-10">
      {/* Dynamic Header Banner - Custom themed as focus 1 selector */}
      <div id="kamara-header-banner" className="flex flex-col md:flex-row justify-between items-center gap-6 bg-primary p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)]"></div>
        <div className="space-y-3 relative z-10 text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} /> Ekosistem Ekonomi Kreatif PMII KBB
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-accent tracking-tight leading-none">
            Pasar Kader Mandiri Nusantara <span className="text-white">KAMARA</span>
          </h2>
          <p className="text-gray-300 font-medium text-sm md:text-base leading-relaxed">
            Menyatukan karya produk fisik unggulan, jasa keahlian digital, dan strategi branding terbaik alumni PMII Kabupaten Bandung Barat untuk mewujudkan kedaulatan ekonomi.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 relative z-10 w-full md:w-auto items-center md:items-end justify-center">
          <Link 
            to="/produk-umkm/kerjasama" 
            className="w-full sm:w-auto text-center justify-center bg-accent text-primary px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            Daftarkan Produk <Briefcase size={16} />
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={16} /> Keranjang Belanja Anda
            {cart.length > 0 && (
              <span className="bg-white text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Minimalism search bar and main service types */}
      <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Main Tabs Navigation */}
          <div className="flex overflow-x-auto w-full md:w-auto p-1 bg-gray-50 rounded-2xl gap-1 no-scrollbar">
            <button
              onClick={() => { setActiveTab("products"); setSearchQuery(""); }}
              className={`flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "products" 
                  ? "bg-primary text-white shadow-md font-extrabold scale-102" 
                  : "text-gray-500 hover:text-primary hover:bg-gray-100"
              }`}
            >
              <ShoppingBag size={15} /> Produk Fisik
            </button>
            <button
              onClick={() => { setActiveTab("services"); setSearchQuery(""); }}
              className={`flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "services" 
                  ? "bg-primary text-white shadow-md font-extrabold scale-102" 
                  : "text-gray-500 hover:text-primary hover:bg-gray-100"
              }`}
            >
              <Briefcase size={15} /> Katalog Jasa
            </button>
            <button
              onClick={() => { setActiveTab("packages"); setSearchQuery(""); }}
              className={`flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "packages" 
                  ? "bg-primary text-white shadow-md font-extrabold scale-102" 
                  : "text-gray-500 hover:text-primary hover:bg-gray-100"
              }`}
            >
              <Building2 size={15} /> Paket Solusi
            </button>
            <button
              onClick={() => { setActiveTab("promos"); setSearchQuery(""); }}
              className={`flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "promos" 
                  ? "bg-primary text-white shadow-md font-extrabold scale-102" 
                  : "text-gray-500 hover:text-primary hover:bg-gray-100"
              }`}
            >
              <Tag size={15} /> Promo & Diskon
            </button>
          </div>

          {/* Clean Realtime Search */}
          {(activeTab === "products" || activeTab === "services") && (
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cari ${activeTab === "products" ? "produk" : "layanan jasa"} KAMARA...`}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={16} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-primary"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Inner Subcategory Filtering Rows */}
        {activeTab === "products" && (
          <div className="pt-2 border-t border-gray-50 flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mr-2">Grup:</span>
              {["Semua", "Consumer Goods", "Produk Kreatif", "Produk UMKM Lokal"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProductCat(cat)}
                  className={`py-1.5 px-3.5 rounded-lg text-[11px] font-bold transition-all ${
                    productCat === cat 
                      ? "bg-accent text-primary shadow-xs" 
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 items-center bg-yellow-50/50 px-3 py-1 rounded-xl border border-yellow-105/50">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600 mr-1 flex items-center gap-1">
                <Sparkles size={11} /> Unggulan:
              </span>
              {[
                { label: "Semua", val: "" },
                { label: "Terlaris 🔥", val: "Terlaris" },
                { label: "Produk Baru ✨", val: "Baru" },
                { label: "Mitra Sahabat 🤝", val: "Mitra" }
              ].map((t) => (
                <button
                  key={t.label}
                  onClick={() => setProductTag(t.val)}
                  className={`py-1 px-2.5 rounded-md text-[10px] font-extrabold transition-all ${
                    productTag === t.val
                      ? "bg-primary text-white" 
                      : "text-amber-700 hover:bg-yellow-100/55"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="pt-2 border-t border-gray-50 flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mr-2">Keahlian:</span>
              {["Semua", "Media Kreatif", "Digital", "Pelayanan", "Jasa Perantara & Pengadaan"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setServiceCat(cat)}
                  className={`py-1.5 px-3.5 rounded-lg text-[11px] font-bold transition-all ${
                    serviceCat === cat 
                      ? "bg-accent text-primary shadow-xs" 
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 items-center bg-indigo-50/50 px-3 py-1 rounded-xl border border-indigo-100">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 mr-1 flex items-center gap-1">
                <Bookmark size={11} /> Rekomendasi:
              </span>
              {[
                { label: "Semua Jasa", val: "" },
                { label: "Jasa Terfavorit ⭐", val: "Favorit" }
              ].map((t) => (
                <button
                  key={t.label}
                  onClick={() => setServiceTag(t.val)}
                  className={`py-1 px-2.5 rounded-md text-[10px] font-extrabold transition-all ${
                    serviceTag === t.val
                      ? "bg-primary text-white" 
                      : "text-indigo-700 hover:bg-indigo-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid View Controller */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + productCat + productTag + serviceCat + serviceTag}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* TAP 1: PHYSICAL PRODUCTS */}
          {activeTab === "products" && (
            <div className="space-y-6">
              {filteredProducts.length === 0 ? (
                <NoItemsFound text="Tidak ada produk fisik KAMARA yang sesuai dengan filter Anda." />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => {
                    const statusColors = {
                      "Tersedia": "bg-emerald-50 text-emerald-700 border-emerald-100",
                      "Pre-Order": "bg-blue-50 text-blue-700 border-blue-100",
                      "Stok Terbatas": "bg-amber-50 text-amber-700 border-amber-100"
                    };

                    return (
                      <div 
                        key={p.id}
                        className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                      >
                        {/* PRODUCT IMAGE - PEKECIL SESUAI PERMINTAAN */}
                        <div className="aspect-[4/3] w-full max-h-40 overflow-hidden relative bg-gray-50 flex items-center justify-center border-b border-gray-100">
                          <img 
                            src={p.image} 
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2 py-1 rounded-md border ${statusColors[p.stockStatus]}`}>
                            {p.stockStatus}
                          </span>
                          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-amber-500 text-[10px] font-extrabold px-1.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                            <Star size={11} fill="currentColor" /> {p.rating}
                          </span>
                        </div>

                        {/* PRODUCT CONTENT */}
                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              <MapPin size={10} className="text-accent" />
                              <span className="truncate max-w-[150px]">{p.provider}</span>
                            </div>
                            <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">{p.name}</h3>
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{p.description}</p>
                          </div>

                          <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Harga Pas</p>
                            <p className="text-base font-extrabold text-primary font-display">{p.price}</p>
                          </div>

                          {/* 4 ACTION BUTTONS GRID - COMPRESSED & SPACE-EFFICIENT */}
                          <div className="space-y-1.5 pt-2 border-t border-gray-100 flex flex-col">
                            {/* Row 1: Add to Cart and Buy Direct */}
                            <div className="grid grid-cols-2 gap-1.5">
                              <button
                                onClick={() => handleAddToCart(p)}
                                className="py-2 px-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-850 font-extrabold text-[9.5px] sm:text-[10px] rounded-lg border border-emerald-100/50 transition-colors flex items-center justify-center gap-1 active:scale-95 cursor-pointer leading-tight"
                                title="Masukkan ke Keranjang Belanja"
                              >
                                <svg className="w-3 h-3 fill-current text-emerald-600 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11 9H9V12H6V14H9V17H11V14H14V12H11V9ZM20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8H20V18Z" />
                                </svg>
                                + Keranjang
                              </button>
                              <button
                                onClick={() => handleOpenOrder("product", p)}
                                className="py-2 px-1 bg-primary hover:bg-accent hover:text-primary text-white font-extrabold text-[9.5px] sm:text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer shadow-xs leading-tight"
                                title="Beli Langsung Lewat Form"
                              >
                                <ShoppingBag size={10.5} className="shrink-0" /> Beli Langsung
                              </button>
                            </div>

                            {/* Row 2: Deskripsi and Tanya Produk */}
                            <div className="grid grid-cols-2 gap-1.5">
                              <button
                                onClick={() => setDetailItem({ type: "product", data: p })}
                                className="py-1.5 px-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-[9.5px] sm:text-[10px] rounded-lg border border-gray-150 transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer leading-tight"
                                title="Lihat Deskripsi Mutu, Kualitas & Kuantitas"
                              >
                                <Info size={11} className="text-gray-400 shrink-0" /> Deskripsi
                              </button>
                              <a
                                href={`https://wa.me/6282115991771?text=${encodeURIComponent(
                                  `Halo Admin Koperasi KAMARA Care, saya ingin bertanya mengenai ketersediaan dan penawaran spesifik untuk produk: *${p.name}* (${p.subCategory}). Terima kasih!`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="py-1.5 px-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[9.5px] sm:text-[10px] rounded-lg border border-amber-100/70 transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer text-center leading-tight"
                                title="Tanya Detail via WhatsApp"
                              >
                                <svg className="w-3 h-3 fill-current text-amber-600 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Tanya Produk
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAP 2: SERVICES CATALOG */}
          {activeTab === "services" && (
            <div className="space-y-6">
              {filteredServices.length === 0 ? (
                <NoItemsFound text="Tidak ada layanan kreatif KAMARA yang sesuai dengan kriteria Anda." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((s) => (
                    <div 
                      key={s.id}
                      className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest bg-indigo-50 text-indigo-700 rounded-md px-2.5 py-1 border border-indigo-100">
                            {s.subCategory}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <Clock size={11} /> {s.estimation}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-primary">{s.name}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-3">{s.description}</p>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="space-y-1 bg-gray-50/50 p-3 rounded-xl border border-gray-50">
                          <p className="text-[9px] uppercase font-extrabold text-blue-900 tracking-wider mb-1 flex items-center gap-1">
                            <CheckCircle size={10} className="text-blue-500" /> Output Pelayanan:
                          </p>
                          <ul className="grid grid-cols-1 gap-1 text-[11px] text-gray-500 font-medium">
                            {s.benefits.slice(0, 3).map((b, idx) => (
                              <li key={idx} className="flex items-center gap-1.5 text-ellipsis overflow-hidden whitespace-nowrap">
                                <span className="w-1 h-1 rounded-full bg-indigo-400"></span> {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-50 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Biaya Mulai</span>
                          <span className="text-base font-black text-primary font-display">{s.priceStart}</span>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              handleOpenOrder("service", s);
                              // Auto set to Pemesanan/Penawaran
                              setOrderForm(prev => ({ ...prev, serviceActionType: "Pemesanan" }));
                            }}
                            className="w-full py-2.5 px-2 bg-primary hover:bg-accent hover:text-primary text-white font-extrabold text-[11px] rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
                          >
                            <ShoppingBag size={13} /> Request Penawaran
                          </button>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setDetailItem({ type: "service", data: s })}
                              className="py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-[10px] rounded-lg border border-gray-100 transition-colors flex items-center justify-center gap-1 active:scale-95"
                            >
                              <Info size={12} className="text-gray-400" /> Detail Jasa
                            </button>
                            <a
                              href={`https://wa.me/6282115991771?text=${encodeURIComponent(
                                `Halo Admin Mitra Kamara, saya tertarik berkonsultasi terlebih dahulu mengenai layanan jasa: *${s.name}* (${s.subCategory}). Mohon arahan pengerjaan dan detail harganya. Terima kasih!`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-705 font-extrabold text-[10px] rounded-lg border border-emerald-100/70 transition-all flex items-center justify-center gap-1 active:scale-95"
                            >
                              <MessageSquare size={12} className="text-emerald-500" /> Konsultasi WA
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAP 3: BUNDLED PACKAGES */}
          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-4">
                <span className="text-[9px] uppercase font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                  Paket Usaha All-in-One KAMARA
                </span>
                <h3 className="text-2xl font-display font-bold text-primary">Solusi Transformasi UMKM</h3>
                <p className="text-xs text-gray-400">Pilih paket solusi terintegrasi hemat hingga 40% dibandingkan memesan secara satuan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {KAMARA_PACKAGES.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className="bg-white rounded-[2.5rem] border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
                  >
                    {/* Ribbon badge */}
                    <div className="absolute top-4 right-[-32px] rotate-45 bg-accent text-primary text-[8px] font-black px-8 py-1 uppercase tracking-widest border-b border-primary/10">
                      {pkg.bannerText}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-black text-primary leading-tight">{pkg.name}</h4>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{pkg.description}</p>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-2xl border border-primary/5 text-center">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Investasi Mulai</span>
                        <p className="text-2xl font-black text-primary font-display mt-0.5">{pkg.price}</p>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle size={12} className="text-accent" /> Layanan Yang Didapat:
                        </p>
                        <ul className="space-y-1.5 text-xs text-gray-500">
                          {pkg.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex gap-2 items-start font-medium">
                              <span className="text-accent mt-0.5 font-bold">✓</span>
                              <span className="leading-tight">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleOpenOrder("package", pkg)}
                        className="w-full py-3.5 bg-primary hover:bg-accent hover:text-primary text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all uppercase tracking-wider"
                      >
                        Pesan Paket Sekarang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAP 4: PROMO & DISKONS */}
          {activeTab === "promos" && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-4">
                <span className="text-[9px] uppercase font-extrabold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1 w-max mx-auto">
                  <Percent size={12} /> Halaman Promo Spesial
                </span>
                <h3 className="text-2xl font-display font-bold text-primary">Diskon Hemat Anggota</h3>
                <p className="text-xs text-gray-400">Dapatkan potongan khusus untuk anggota koperasi andalan dan masyarakat sekitar Bandung Barat.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROMO_ITEMS.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-gradient-to-br from-white to-rose-50/10 rounded-[2.5rem] border border-rose-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6"
                  >
                    <div className="space-y-3 flex-grow text-center md:text-left">
                      <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white px-2.5 py-1 rounded-lg">
                          {item.discountBadge}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-gray-150 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-100">
                          {item.type}
                        </span>
                        {item.endsInHours && (
                          <span className="text-[9px] font-extrabold text-rose-600 flex items-center gap-1">
                            <Clock size={11} className="animate-pulse" /> Sisa {item.endsInHours} Jam!
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-primary leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-405 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-white p-4.5 rounded-2xl border border-rose-50/60 shadow-xs w-full md:w-44 shrink-0 text-center space-y-3">
                      <div>
                        <span className="text-[9px] font-bold text-gray-450 line-through block">{item.originalPrice}</span>
                        <span className="text-lg font-black text-rose-605 block font-display leading-tight">{item.promoPrice}</span>
                      </div>
                      <button
                        onClick={() => handleOpenOrder("promo", item)}
                        className="w-full py-2 px-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-[10px] rounded-lg tracking-wider uppercase transition-colors"
                      >
                        Klaim Promo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* MODAL 1: BRAND MARKETING & DETAIL DRAWER */}
      {detailItem && (
        <div className="className-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xs">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full p-6 md:p-8 border border-gray-150 relative overflow-hidden"
          >
            <button
              onClick={() => setDetailItem(null)}
              className="absolute top-5 right-5 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-6">
              {/* Image if product */}
              {detailItem.type === "product" && (
                <div className="aspect-[2.39/1] w-full rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={detailItem.data.image} 
                    alt={detailItem.data.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black bg-primary/10 text-primary px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {detailItem.data.subCategory || detailItem.data.category}
                  </span>
                  {detailItem.data.rating && (
                    <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                      <Star size={11} fill="currentColor" /> {detailItem.data.rating} Rating
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-primary leading-tight pr-10">
                  {detailItem.data.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Building2 size={13} className="text-accent" />
                  <span>Disediakan oleh: <strong className="text-gray-700">{detailItem.data.provider}</strong></span>
                </div>
              </div>

              {/* Price Tag */}
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/5 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Investasi / Harga</span>
                <span className="text-2xl font-black text-primary font-display">
                  {detailItem.data.price || detailItem.data.priceStart}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-primary uppercase tracking-wider">Deskripsi Singkat</h4>
                <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                  {detailItem.data.description}
                </p>
              </div>

              {/* BRAND MARKETING BRIEF - DETIL AS REQUESTED */}
              {detailItem.data.marketingBrief && (
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-500 fill-amber-50" /> Strategi Pemasaran Brand (KAMARA Brief)
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-amber-50/30 p-3 rounded-lg border border-amber-100/45 space-y-1">
                      <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">🎯 Target Pasar Utama</span>
                      <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">
                        {detailItem.data.marketingBrief.targetMarket}
                      </p>
                    </div>

                    <div className="bg-amber-50/30 p-3 rounded-lg border border-amber-100/45 space-y-1">
                      <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">✨ Keunikan Layanan (USP)</span>
                      <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">
                        {detailItem.data.marketingBrief.uniqueSellingPoint}
                      </p>
                    </div>

                    <div className="md:col-span-2 bg-yellow-50/30 p-3.5 rounded-lg border border-yellow-100 space-y-1">
                      <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1">
                        🚀 Pesan Marketing Persuasif
                      </span>
                      <p className="text-xs text-primary font-bold italic">
                        "{detailItem.data.marketingBrief.marketingMessage}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits if service */}
              {detailItem.type === "service" && detailItem.data.benefits && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest">Detail Output & Deliverables Jasa</h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                    {detailItem.data.benefits.map((b: string, idx: number) => (
                      <li key={idx} className="flex gap-2 items-center">
                        <span className="text-indigo-600 font-bold">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom Actions inside detailed sheet */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDetailItem(null)}
                  className="flex-grow py-3 bg-gray-100 hover:bg-gray-200 text-gray-650 font-bold text-xs rounded-xl transition-all uppercase tracking-wider"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    const item = detailItem.data;
                    const type = detailItem.type;
                    setDetailItem(null);
                    handleOpenOrder(type, item);
                  }}
                  className="flex-grow py-3 bg-primary hover:bg-accent hover:text-primary text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: ORDER FORM & PAYMENT TRANSACTION FLOW */}
      {orderItem && (
        <div className="className-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xs overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full p-6 border border-gray-100 relative my-8"
          >
            <button
              onClick={() => { setOrderItem(null); setOrderCompleted(null); }}
              className="absolute top-5 right-5 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-all z-20"
            >
              <X size={18} />
            </button>

            {!orderCompleted ? (
              // STEP 1: FORM PEMESANAN & PAYMENT SELECTOR
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                <div className="space-y-1 pb-2 border-b border-gray-100">
                  <span className="text-[10px] uppercase font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                    Langkah Pembelian (Asisten Check-out)
                  </span>
                  <h3 className="text-xl font-display font-bold text-primary mt-1">Form Pemesanan & Pembayaran</h3>
                  <p className="text-xs text-gray-400">Pemesanan Anda diteruskan resmi ke WhatsApp Koperasi KAMARA KBB.</p>
                </div>

                {/* Selected Item Summary in Form */}
                <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center border border-gray-100">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400">Item Terpilih</span>
                    <h4 className="text-sm font-bold text-primary mt-0.5">{orderItem.data.name}</h4>
                    <span className="text-[10px] font-medium text-accent block">{orderItem.data.provider}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">Investasi Satuan</span>
                    <span className="text-sm font-black text-primary font-display">
                      {orderItem.data.price || orderItem.data.priceStart || orderItem.data.promoPrice}
                    </span>
                  </div>
                </div>

                {/* Form Fields Fields */}
                <div className="space-y-3.5">
                  {orderItem.type === "service" && (
                    <div className="space-y-2 bg-indigo-50/45 p-4 rounded-2xl border border-indigo-100">
                      <label className="text-[10px] font-black text-indigo-800 uppercase tracking-widest block ml-1">
                        Sifat Pemesanan Layanan:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setOrderForm(prev => ({ ...prev, serviceActionType: "Konsultasi" }))}
                          className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-black transition-all border ${
                            orderForm.serviceActionType === "Konsultasi"
                              ? "bg-primary text-white border-primary shadow-xs"
                              : "bg-white text-gray-400 border-gray-150 hover:bg-gray-50 hover:text-gray-600"
                          }`}
                        >
                          💬 Konsultasi Dulu
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderForm(prev => ({ ...prev, serviceActionType: "Pemesanan" }))}
                          className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-black transition-all border ${
                            orderForm.serviceActionType === "Pemesanan"
                              ? "bg-primary text-white border-primary shadow-xs"
                              : "bg-white text-gray-400 border-gray-150 hover:bg-gray-50 hover:text-gray-650"
                          }`}
                        >
                          📋 Ajukan Penawaran
                        </button>
                      </div>
                      <p className="text-[10px] text-indigo-750 text-center leading-normal">
                        {orderForm.serviceActionType === "Konsultasi" 
                          ? "✓ Disarankan: Diskusi / konsultasi konsep gratis dengan admin via WA terlebih dahulu." 
                          : "✓ Ajukan spesifikasi langsung ke admin untuk kebutuhan pemesanan cepat."}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                      Nama Pembeli / Organisasi <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda..."
                      value={orderForm.name}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                      No. WhatsApp Anda <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0821xxxxxxx"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  {/* Quantity selector (only relevant for physical products/tickets) */}
                  {orderItem.type !== "service" && (
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <span className="text-xs font-bold text-gray-550 block ml-1">Jumlah Pemesanan</span>
                      <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-150">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(-1)}
                          className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-bold"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-black text-primary w-6 text-center">{orderForm.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(1)}
                          className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-bold"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                      Alamat Pengiriman / Spesifikasi Khusus <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Tuliskan nama jalan, kelurahan, kecamatan di KBB, atau instruksi pengerjaan..."
                      value={orderForm.address}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full bg-gray-55 border border-gray-200 rounded-xl p-4 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  {/* METODE PEMBAYARAN - AS REQUESTED (Hides during consultation) */}
                  {!(orderItem.type === "service" && orderForm.serviceActionType === "Konsultasi") && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1 flex items-center gap-1">
                        <CreditCard size={12} className="text-accent" /> Pilih Metode Pembayaran
                      </label>
                      
                      <div className="space-y-2">
                        <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          orderForm.paymentMethod === "BSI-Transfer" 
                            ? "bg-accent/10 border-accent text-primary font-bold" 
                            : "bg-white border-gray-150 hover:border-gray-300 text-gray-500"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="BSI-Transfer"
                            checked={orderForm.paymentMethod === "BSI-Transfer"}
                            onChange={() => setOrderForm(prev => ({ ...prev, paymentMethod: "BSI-Transfer" }))}
                            className="mt-0.5 accent-primary h-4 w-4"
                          />
                          <div className="text-left space-y-0.5">
                            <span className="text-xs font-extrabold block">Transfer Bank Syariah Mandiri (BSI)</span>
                            <span className="text-[10px] text-gray-400 block font-normal leading-tight">
                              Rek. PC IKA PMII KBB / KAMARA: <strong>7212-009-292</strong> (Bayar digital lewat m-banking).
                            </span>
                          </div>
                        </label>

                        <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          orderForm.paymentMethod === "EWallet-QRIS" 
                            ? "bg-accent/10 border-accent text-primary font-bold" 
                            : "bg-white border-gray-150 hover:border-gray-300 text-gray-500"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="EWallet-QRIS"
                            checked={orderForm.paymentMethod === "EWallet-QRIS"}
                            onChange={() => setOrderForm(prev => ({ ...prev, paymentMethod: "EWallet-QRIS" }))}
                            className="mt-0.5 accent-primary h-4 w-4"
                          />
                          <div className="text-left space-y-0.5">
                            <span className="text-xs font-extrabold block">QRIS Link Koperasi KAMARA</span>
                            <span className="text-[10px] text-gray-400 block font-normal leading-tight">
                              Scan barcode QRIS digital instan (Mendukung DANA, OVO, GoPay, ShopeePay).
                            </span>
                          </div>
                        </label>

                        <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          orderForm.paymentMethod === "COD" 
                            ? "bg-accent/10 border-accent text-primary font-bold" 
                            : "bg-white border-gray-150 hover:border-gray-300 text-gray-500"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            checked={orderForm.paymentMethod === "COD"}
                            onChange={() => setOrderForm(prev => ({ ...prev, paymentMethod: "COD" }))}
                            className="mt-0.5 accent-primary h-4 w-4"
                          />
                          <div className="text-left space-y-0.5">
                            <span className="text-xs font-extrabold block">Bayar di Tempat (COD) / Ambil Langsung</span>
                            <span className="text-[10px] text-gray-400 block font-normal leading-tight">
                              Bayar tunai di lokasi sekretariat pusat IKA PMII KBB saat pengambilan barang/acara selesai.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-accent hover:text-primary text-white font-extrabold text-xs rounded-xl shadow-lg transition-all uppercase tracking-wider"
                  >
                    {orderItem.type === "service" && orderForm.serviceActionType === "Konsultasi"
                      ? "Mulai Sesi Diskusi / Konsultasi"
                      : "Proses Pemesanan & Buat Nota"}
                  </button>
                </div>
              </form>
            ) : (
              // STEP 2: NOTA TRANSAKSI / INVOICE DIGITAL READY FOR WHATSAPP
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle size={36} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display font-bold text-primary">Nota Pemesanan Berhasil Dibuat!</h3>
                  <p className="text-xs text-gray-400">Satu langkah lagi untuk merampungkan transaksi Anda via WhatsApp.</p>
                </div>

                {/* Digital Receipt Styling */}
                <div className="bg-amber-50/20 border border-amber-100 rounded-3xl p-5 text-left space-y-4 font-mono text-xs text-gray-600 relative overflow-hidden">
                  <span className="absolute top-0 right-0 bg-accent text-primary text-[8px] font-black px-4 py-1 uppercase tracking-widest leading-none rounded-bl-xl">
                    Nota Tagihan
                  </span>

                  <div className="border-b border-dashed border-amber-200/60 pb-3 flex justify-between items-center">
                    <div>
                      <p className="font-sans font-bold text-primary">Koperasi Mandiri KAMARA</p>
                      <p className="text-[9px] text-gray-400">Bandung Barat, INA</p>
                    </div>
                    <p className="font-bold text-right text-gray-700">#{orderCompleted.id}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="flex justify-between"><span>Tgl Pemesanan:</span> <strong className="text-primary">{orderCompleted.date}</strong></p>
                    <p className="flex justify-between"><span>Nama Pembeli:</span> <strong className="text-primary">{orderCompleted.buyer}</strong></p>
                    <p className="flex justify-between"><span>No. WhatsApp:</span> <strong className="text-primary">{orderCompleted.phone}</strong></p>
                    <p className="flex justify-between"><span className="shrink-0 mr-4">Alamat Kirim:</span> <strong className="text-primary text-right break-words max-w-[200px]">{orderCompleted.address}</strong></p>
                  </div>

                  <div className="border-t border-b border-dashed border-amber-200/60 py-3 space-y-1.5 font-sans">
                    {orderCompleted.isCart ? (
                      <div className="space-y-2">
                        {orderCompleted.itemsBreakdown.map((it: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-xs font-bold text-primary border-b border-gray-100/40 pb-1.5 last:border-0 last:pb-0">
                            <div className="text-left pr-4">
                              <span className="leading-tight block">{it.name}</span>
                              <span className="text-[9px] text-gray-400 block font-semibold leading-none mt-1">Qty: {it.qty} x {it.price}</span>
                            </div>
                            <span className="text-gray-700 font-mono text-[11px] shrink-0">{it.subtotal}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="flex justify-between text-xs font-bold text-primary">
                          <span>{orderCompleted.item}</span>
                          <span>x{orderCompleted.quantity}</span>
                        </p>
                        <p className="text-[10px] text-gray-400 italic">Satuan: {orderCompleted.price}</p>
                      </>
                    )}
                  </div>

                  <div className="font-sans flex justify-between items-center pt-1">
                    <span className="text-xs font-extrabold text-primary">Total Pembayaran</span>
                    <span className="text-lg font-black text-rose-600 font-display">{orderCompleted.total}</span>
                  </div>

                  <div className="bg-white/80 p-3 rounded-xl border border-amber-100/60 font-sans leading-relaxed text-[11px] text-gray-500">
                    <span className="block font-bold text-primary uppercase text-[9px] tracking-wider mb-0.5">Panduan Penyelesaian</span>
                    {orderCompleted.id.startsWith("KONSUL-") ? (
                      <p>Sesi Konsultasi Anda sepenuhnya <strong>Gratis</strong>. Silakan klik tombol di bawah untuk mengirim data ke admin WhatsApp agar jadwal sesi diskusi konsep bisa segera ditentukan.</p>
                    ) : (
                      <>
                        {orderForm.paymentMethod === "BSI-Transfer" && (
                          <p>Silakan lakukan transfer ke Bank BSI <strong>7212-009-292</strong> (an. Koperasi KAMARA KBB), lalu sertakan bukti transfer saat mengirim invoice di tombol WhatsApp di bawah.</p>
                        )}
                        {orderForm.paymentMethod === "EWallet-QRIS" && (
                          <p>Silakan scan barcode QRIS resmi Koperasi KAMARA saat admin WhatsApp menanggapi detail pesanan digital Anda di chat.</p>
                        )}
                        {orderForm.paymentMethod === "COD" && (
                          <p>Pembayaran akan dilunasi tunai saat penyerahan barang di Sekretariat IKA PMII Bandung Barat.</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Final Checkout actions */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={sendWhatsAppInvoice}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-emerald-100 flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer scale-102"
                  >
                    <MessageSquare size={16} /> {orderCompleted.id.startsWith("KONSUL-") ? "Hubungi Admin via WhatsApp" : "Kirim Nota ke WhatsApp"}
                  </button>
                  <button
                    onClick={() => { setOrderItem(null); setOrderCompleted(null); }}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-xs rounded-xl transition-all uppercase tracking-wider"
                  >
                    Kembali Belanja
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* MODAL 3: SHOPPING CART OVERLAY AND CHECKOUT */}
      {isCartOpen && (
        <div className="className-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/45 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl max-w-5xl w-full p-6 md:p-8 border border-gray-150 relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
                  <ShoppingBag size={18} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-display font-bold text-primary">Keranjang Belanja Anda</h3>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Multi-Item Checkout Koperasi KAMARA</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Area */}
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 space-y-5 text-center flex-grow">
                <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center border border-gray-100">
                  <ShoppingBag size={36} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest">Keranjang Kosong</h4>
                  <p className="text-xs text-gray-400 max-w-xs leading-relaxed font-semibold">Anda belum memasukkan produk apapun ke dalam keranjang. Silakan pilih produk unggulan kami di katalog!</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-accent hover:text-primary transition-all cursor-pointer"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto py-5 pr-1 flex-grow">
                {/* List Items Column */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest text-left">Daftar Produk ({cart.length})</h4>
                  
                  <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                    {cart.map((c) => (
                      <div key={c.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100/50 items-center">
                        <img
                          src={c.product.image}
                          alt={c.product.name}
                          className="w-14 h-14 object-cover rounded-xl border border-gray-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow min-w-0 text-left">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{c.product.subCategory}</span>
                          <h5 className="text-xs font-extrabold text-primary truncate leading-tight">{c.product.name}</h5>
                          <p className="text-xs font-extrabold text-emerald-700 font-display mt-0.5">{c.product.price} <span className="text-[10px] text-gray-400 font-medium">/ pcs</span></p>
                        </div>
                        
                        {/* Qty Controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCartQtyChange(c.product.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 font-bold transition-transform cursor-pointer"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-6 text-center text-xs font-extrabold text-primary font-mono">{c.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleCartQtyChange(c.product.id, 1)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 font-bold transition-transform cursor-pointer"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="w-24 text-right shrink-0">
                          <p className="text-[10px] text-gray-400 font-medium">Subtotal</p>
                          <p className="text-xs font-extrabold text-primary font-mono">
                            Rp {(c.product.priceNum * c.quantity).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculation Box */}
                  <div className="bg-emerald-50/20 border border-emerald-100/80 p-5 rounded-2xl space-y-2.5">
                    <div className="flex justify-between items-center text-xs text-emerald-800 font-semibold">
                      <span>Total Item Terpilih:</span>
                      <span>{cart.reduce((tot, c) => tot + c.quantity, 0)} Pcs</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-emerald-100">
                      <span className="text-xs font-black text-emerald-900 uppercase tracking-widest">Total Belanja (Harga Pas)</span>
                      <span className="text-xl font-black text-emerald-700 font-display">
                        Rp {cart.reduce((tot, c) => tot + (c.product.priceNum * c.quantity), 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Fields Column */}
                <form onSubmit={handleCartCheckoutSubmit} className="lg:col-span-12 xl:col-span-5 bg-gray-50/60 border border-gray-100 p-5 rounded-3xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1 text-left">
                      <Sparkles size={13} className="text-accent" /> Data Pengiriman & Bayar
                    </h4>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-gray-405 uppercase tracking-wider block ml-1 text-left">
                        Nama Lengkap Pembeli / Ormas <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Sahabat M. Iqbal / PAC PMII Cipatat"
                        value={cartForm.name}
                        onChange={(e) => setCartForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-gray-405 uppercase tracking-wider block ml-1 text-left">
                        No. WhatsApp Penerima <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 08123456789"
                        value={cartForm.phone}
                        onChange={(e) => setCartForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all shadow-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-gray-405 uppercase tracking-wider block ml-1 text-left">
                        Alamat Pengiriman Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Sebutkan nama jalan, RT/RW, kelurahan, kecamatan di Kabupaten Bandung Barat..."
                        value={cartForm.address}
                        onChange={(e) => setCartForm(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs focus:outline-none focus:border-primary transition-all shadow-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-405 uppercase tracking-wider block ml-1 text-left">
                        Pilih Metode Pembayaran
                      </label>
                      <select
                        value={cartForm.paymentMethod}
                        onChange={(e) => setCartForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all shadow-xs"
                      >
                        <option value="BSI-Transfer">Transfer Bank Syariah Mandiri (BSI)</option>
                        <option value="EWallet-QRIS">QRIS KAMARA (DANA/OVO/LinkAja)</option>
                        <option value="COD">Cash on Delivery (COD) / Bayar di Tempat</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-gray-450 uppercase tracking-widest block ml-1 text-left">Catatan Tambahan (Boleh Kosong)</label>
                      <input
                        type="text"
                        placeholder="Contoh: Kirim sebelum sore, varian basreng pedas..."
                        value={cartForm.notes}
                        onChange={(e) => setCartForm(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-accent transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-xl shadow-lg hover:shadow-emerald-100 transition-all uppercase tracking-widest cursor-pointer mt-3"
                  >
                    Proses Pemesanan & Buat Nota
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Toast Notification Manager */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-55 max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <p className="text-xs font-semibold leading-relaxed text-left">{toastMessage}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function NoItemsFound({ text }: { text: string }) {
  return (
    <div className="text-center py-20 px-4 bg-white border border-gray-100 rounded-3xl space-y-4">
      <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto border border-gray-100">
        <Search size={20} />
      </div>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider max-w-sm mx-auto">{text}</p>
    </div>
  );
}

function KerjasamaForm() {
  const [formData, setFormData] = useState<any>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="text-center mb-20 space-y-6">
        <h2 className="text-5xl font-display font-bold text-primary">Formulir <span className="text-accent">Kerjasama</span></h2>
        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        <p className="text-gray-550 font-medium max-w-xl mx-auto">Daftarkan usaha Anda untuk masuk ke dalam ekosistem ekonomi kreatif alumni PMII.</p>
      </div>

      {sent ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-16 rounded-[4rem] shadow-2xl text-center border border-gray-100"
        >
           <div className="w-24 h-24 bg-accent/20 text-primary rounded-3xl flex items-center justify-center mx-auto mb-10 border border-accent/20 shadow-inner">
              <ShoppingBag size={48} />
           </div>
           <h3 className="text-3xl font-display font-bold mb-6 text-primary italic">Pengajuan Berhasil!</h3>
           <p className="text-gray-550 mb-10 leading-relaxed max-w-md mx-auto">Tim kurasi Koperasi KAMARA akan memverifikasi data produk Anda. Anda akan dihubungi melalui WhatsApp setelah produk disetujui.</p>
           <Link to="/produk-umkm/katalog" className="bg-primary text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">Kembali ke Katalog</Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-gray-50 space-y-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Nama Pengusaha" name="owner" required onChange={(v: string) => setFormData({...formData, owner: v})} value={formData.owner} />
            <Select label="Kategori Produk" name="category" options={["F&B", "Fashion", "Jasa", "Kriya", "Teknologi"]} onChange={(v: string) => setFormData({...formData, category: v})} value={formData.category} />
            <Input label="Kapasitas Produksi / Bln" name="capacity" onChange={(v: string) => setFormData({...formData, capacity: v})} value={formData.capacity} />
            <Input label="Harga Rata-rata" name="priceRange" onChange={(v: string) => setFormData({...formData, priceRange: v})} value={formData.priceRange} />
            <Input label="Jumlah Stok Produk" name="stock" type="number" placeholder="Contoh: 100" onChange={(v: string) => setFormData({...formData, stock: v})} value={formData.stock} />
            
            <div className="md:col-span-2 space-y-3 text-left">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">Foto Produk Utama</label>
              <div 
                onClick={() => document.getElementById("umkm-file-input")?.click()}
                onDragOver={(e: any) => e.preventDefault()}
                onDrop={(e: any) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    const file = e.dataTransfer.files[0];
                    const r = new FileReader();
                    r.onload = () => setFormData({ ...formData, imageUrl: r.result as string });
                    r.readAsDataURL(file);
                  }
                }}
                className="border-2 border-dashed border-gray-100 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 hover:border-accent/50 transition-all cursor-pointer group relative overflow-hidden min-h-[220px]"
              >
                {formData.imageUrl ? (
                  <>
                    <img src={formData.imageUrl} alt="Uploaded product preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black uppercase tracking-widest">Ganti Gambar</div>
                  </>
                ) : (
                  <>
                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:text-accent transition-colors">
                        <UploadCloud size={32} />
                     </div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase group-hover:text-primary transition-colors">Pilih gambar resolusi tinggi (Klik / Tarik ke sini)</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                id="umkm-file-input" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const r = new FileReader();
                    r.onload = () => setFormData({ ...formData, imageUrl: r.result as string });
                    r.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <Input label="Deskripsi Lengkap Produk" name="desc" colSpan={2} onChange={(v: string) => setFormData({...formData, desc: v})} value={formData.desc} placeholder="Tuliskan spesifikasi, keunggulan, varian rasa, atau porsi detail produk..." />
            <Input label="Alamat Pengiriman / Produksi" name="address" colSpan={2} onChange={(v: string) => setFormData({...formData, address: v})} value={formData.address} />
            <Input label="Kontak WhatsApp Bisnis" name="whatsapp" required placeholder="08xxxx" onChange={(v: string) => setFormData({...formData, whatsapp: v})} value={formData.whatsapp} />
          </div>
          <button type="submit" className="w-full bg-accent text-primary font-bold py-6 rounded-3xl shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all text-xl cursor-pointer">
            Daftarkan Produk Sekarang
          </button>
        </form>
      )}
    </div>
  );
}

function Input({ label, required = false, colSpan = 1, placeholder = "", type = "text", value, onChange }: any) {
  return (
    <div className={`${colSpan === 2 ? 'md:col-span-2' : ''} space-y-2 text-left`}>
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">{label}</label>
      <select 
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm appearance-none"
      >
        <option value="">Pilih...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
