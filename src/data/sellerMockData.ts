import { Product, ServiceItem, Order, Customer, Staff, AuditLog } from "../types/seller";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "PROD-001",
    name: "SaaS Business Template Pro",
    category: "Software Tool",
    sku: "SST-PRO-889",
    price: 349000,
    discountPrice: 299000,
    stock: 99,
    status: "trending",
    type: "digital",
    sales: 142,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Template React & Tailwind CSS premium siap pakai dengan dynamic chart dan clean SaaS architecture.",
    weight: 120
  },
  {
    id: "PROD-002",
    name: "Ergonomic Desk Organizer",
    category: "Home & Office",
    sku: "EDO-OFC-012",
    price: 189000,
    discountPrice: 159000,
    stock: 45,
    status: "aktif",
    type: "fisik",
    sales: 84,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Penyusun meja premium berbahan kayu jati pilihan dengan phone holder & slot wireless charger terintegrasi.",
    weight: 850
  },
  {
    id: "PROD-003",
    name: "Ultra Light Wireless Mouse",
    category: "Aksesoris Elektronik",
    sku: "ULW-MOU-991",
    price: 450000,
    discountPrice: 389000,
    stock: 0,
    status: "habis",
    type: "fisik",
    sales: 210,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Mouse nirkabel dengan sensor 16000 DPI, bobot 58g, dan baterai tahan hingga 70 jam gaming nonstop.",
    weight: 58
  },
  {
    id: "PROD-004",
    name: "E-Book: Mastery Digital Ads 2026",
    category: "E-Book",
    sku: "EBK-DA-2026",
    price: 120000,
    discountPrice: 89000,
    stock: 999,
    status: "aktif",
    type: "digital",
    sales: 312,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Panduan lengkap merancang iklan berkonversi tinggi di Google, TikTok, Facebook, dan Instagram dalam bahasa Indonesia.",
    weight: 110
  },
  {
    id: "PROD-005",
    name: "Smart Watch Active Pro",
    category: "Smart Wearables",
    sku: "SWA-ACT-302",
    price: 1250000,
    stock: 12,
    status: "ditolak",
    type: "fisik",
    sales: 3,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Smarwatch dengan monitoring heart rate, oksigen darah, GPS, dan multi sport mode.",
    weight: 232
  },
  {
    id: "PROD-006",
    name: "Minimalist Mechanical Keyboard 65%",
    category: "Aksesoris Elektronik",
    sku: "MMK-KEY-65",
    price: 799000,
    discountPrice: 699000,
    stock: 15,
    status: "draft",
    type: "fisik",
    sales: 0,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Mechanical keyboard kompak 65% dengan Gateron Brown switch hotswappable yang responsif.",
    weight: 710
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "SERV-001",
    name: "UI/UX Design Landing Page",
    category: "Desain",
    price: 1500000,
    duration: "3 Hari",
    status: "aktif",
    location: "Online / Remote",
    portfolioCount: 14,
    description: "Pembuatan wireframe & desain UI/UX web high fidelity di Figma sesuai dengan riset branding kompetitor Anda.",
    bookingSlots: [
      { date: "2026-05-26", time: "09:00 - 11:00", booked: false },
      { date: "2026-05-26", time: "13:00 - 15:00", booked: true },
      { date: "2026-05-27", time: "10:00 - 12:00", booked: false },
      { date: "2026-05-27", time: "15:30 - 17:30", booked: false }
    ]
  },
  {
    id: "SERV-002",
    name: "Custom Web Application Development",
    category: "Teknologi",
    price: 8500000,
    duration: "14 Hari",
    status: "aktif",
    location: "Online & Onsite Bandung",
    portfolioCount: 8,
    description: "Pembangunan web modern berbasis React, Node.js, dan database SQL/NoSQL yang aman, responsif, & SEO-friendly.",
    bookingSlots: [
      { date: "2026-05-28", time: "10:00 - 12:00", booked: true },
      { date: "2026-05-29", time: "14:00 - 16:00", booked: false }
    ]
  },
  {
    id: "SERV-003",
    name: "TikTok Shop & FB Ads Campaign Management",
    category: "Digital Marketing",
    price: 2400000,
    duration: "30 Hari",
    status: "aktif",
    location: "Online / Remote",
    portfolioCount: 22,
    description: "Setup iklan terarah, riset target konsumen (demografi, interest), optimasi anggaran harian, & pelaporan mingguan terukur.",
    bookingSlots: [
      { date: "2026-05-26", time: "10:00 - 11:30", booked: false },
      { date: "2026-05-28", time: "13:00 - 14:30", booked: false }
    ]
  },
  {
    id: "SERV-004",
    name: "Financial Audit & Corporate Tax Consultation",
    category: "Konsultan",
    price: 4500000,
    duration: "5 Hari",
    status: "draft",
    location: "Bandung Barat & Jakarta",
    portfolioCount: 5,
    description: "Pemeriksaan validasi alur keuangan korporat, optimalisasi pembayaran pajak legal, dan penyusunan laporan keuangan audit.",
    bookingSlots: [
      { date: "2026-05-30", time: "09:00 - 11:00", booked: false }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "TRX-10928",
    customerName: "Ahmad Mauludin",
    items: [
      { name: "SaaS Business Template Pro", qty: 1, price: 299000 },
      { name: "E-Book: Mastery Digital Ads 2026", qty: 2, price: 89000 }
    ],
    total: 477000,
    status: "masuk",
    date: "2026-05-25",
    paymentMethod: "Transfer Bank",
    courier: "Instant Delivery (Digital Mail)"
  },
  {
    id: "TRX-10925",
    customerName: "Siti Rahmawati",
    items: [
      { name: "Ergonomic Desk Organizer", qty: 1, price: 159000 }
    ],
    total: 159000,
    status: "diproses",
    date: "2026-05-24",
    paymentMethod: "E-Wallet",
    courier: "JNE Reguler"
  },
  {
    id: "TRX-10912",
    customerName: "Rian Hidayat",
    items: [
      { name: "SaaS Business Template Pro", qty: 1, price: 299000 }
    ],
    total: 299000,
    status: "selesai",
    date: "2026-05-23",
    paymentMethod: "Direct Escrow",
    courier: "Instant Delivery"
  },
  {
    id: "TRX-10905",
    customerName: "Dewi Lestari",
    items: [
      { name: "Ergonomic Desk Organizer", qty: 2, price: 159000 }
    ],
    total: 318000,
    status: "dikirim",
    date: "2026-05-22",
    paymentMethod: "COD",
    courier: "SiCepat Gokil",
    trackingNumber: "SPX-42289901"
  },
  {
    id: "TRX-10899",
    customerName: "Budi Pratama",
    items: [
      { name: "Ultra Light Wireless Mouse", qty: 1, price: 389000 }
    ],
    total: 389000,
    status: "komplain",
    date: "2026-05-21",
    paymentMethod: "Transfer Bank",
    courier: "J&T Express",
    trackingNumber: "JT-400928122"
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Ahmad Mauludin",
    email: "ahmad.maul@gmail.com",
    phone: "081234567890",
    tier: "Gold",
    totalSpent: 4500000,
    orderCount: 8,
    points: 450,
    status: "aktif"
  },
  {
    id: "CUST-002",
    name: "Siti Rahmawati",
    email: "siti.rahma@yahoo.com",
    phone: "082345678901",
    tier: "Platinum",
    totalSpent: 9200000,
    orderCount: 15,
    points: 920,
    status: "aktif"
  },
  {
    id: "CUST-003",
    name: "Rian Hidayat",
    email: "rian.hid@gmail.com",
    phone: "085678901234",
    tier: "Silver",
    totalSpent: 1200000,
    orderCount: 3,
    points: 120,
    status: "aktif"
  },
  {
    id: "CUST-004",
    name: "Dewi Lestari",
    email: "dewi.les@gmail.com",
    phone: "087890123456",
    tier: "Regular",
    totalSpent: 477000,
    orderCount: 1,
    points: 40,
    status: "aktif"
  },
  {
    id: "CUST-005",
    name: "Budi Pratama",
    email: "budi.prat99@hotmail.com",
    phone: "089012345678",
    tier: "Gold",
    totalSpent: 3500000,
    orderCount: 6,
    points: 350,
    status: "suspended"
  }
];

export const INITIAL_STAFFS: Staff[] = [
  {
    id: "STF-001",
    name: "Wahyu Setiawan",
    email: "wahyu@maretoko.com",
    role: "Seller",
    status: "aktif",
    permissions: {
      manageProducts: true,
      manageFinances: true,
      manageStaff: true,
      manageOrders: true
    }
  },
  {
    id: "STF-002",
    name: "Linda Permatasari",
    email: "linda@maretoko.com",
    role: "Admin Toko",
    status: "aktif",
    permissions: {
      manageProducts: true,
      manageFinances: false,
      manageStaff: false,
      manageOrders: true
    }
  },
  {
    id: "STF-003",
    name: "Fajar Nugraha",
    email: "fajar@maretoko.com",
    role: "Staff Operasional",
    status: "aktif",
    permissions: {
      manageProducts: false,
      manageFinances: false,
      manageStaff: false,
      manageOrders: true
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "LOG-9921",
    timestamp: "2026-05-25 10:14:02",
    user: "Wahyu Setiawan",
    role: "Seller",
    action: "Melakukan penarikan dana Rp2.500.000 ke Bank Mandiri *7712",
    ip: "182.1.203.4"
  },
  {
    id: "LOG-9919",
    timestamp: "2026-05-25 08:33:15",
    user: "Linda Permatasari",
    role: "Admin Toko",
    action: "Mengubah harga produk 'SaaS Business Template Pro' menjadi Rp299.000",
    ip: "182.1.203.11"
  },
  {
    id: "LOG-9914",
    timestamp: "2026-05-24 16:45:50",
    user: "Fajar Nugraha",
    role: "Staff Operasional",
    action: "Mengubah status pesanan TRX-10905 ke 'Dikirim' via JNE",
    ip: "36.85.19.4"
  },
  {
    id: "LOG-9910",
    timestamp: "2026-05-24 11:20:10",
    user: "Wahyu Setiawan",
    role: "Seller",
    action: "Menolak akses staf untuk admin finansial pada role 'Admin Toko'",
    ip: "182.1.203.4"
  }
];

export const MOCK_REVIEWS = [
  {
    id: "REV-1",
    customerName: "Ahmad Mauludin",
    item: "SaaS Business Template Pro",
    rating: 5,
    comment: "Gokil template responsive-nya bersih banget dan sangat rapih! Terimakasih admin sangat komunikatif.",
    sentiment: "positive",
    reply: "Terimakasih banyak Sahabat Ahmad! Kami senantiasa berkomitmen menyajikan template SaaS terbaik industri.",
    date: "2026-05-24"
  },
  {
    id: "REV-2",
    customerName: "Siti Rahmawati",
    item: "Ergonomic Desk Organizer",
    rating: 5,
    comment: "Kayu jatinya beneran halus, pengerjaan mulus. Pengiriman aman pakai bubble wrap tebal. Sukses terus tokonya!",
    sentiment: "positive",
    reply: "",
    date: "2026-05-23"
  },
  {
    id: "REV-3",
    customerName: "Budi Pratama",
    item: "Ultra Light Wireless Mouse",
    rating: 2,
    comment: "Kardus penyok parah di jalan. Mouse kadang mati tiba-tiba, harus dicabut pasang dongle USB baru jalan lagi.",
    sentiment: "negative",
    reply: "",
    date: "2026-05-21"
  },
  {
    id: "REV-4",
    customerName: "Rian Hidayat",
    item: "UI/UX Design Landing Page",
    rating: 4,
    comment: "Desainernya sangat profesional dan bisa menterjemahkan wireframe dengan cepat. Mantap direkomendasikan.",
    sentiment: "positive",
    reply: "Terimakasih Sahabat Rian! Sukses untuk bisnis barunya ya.",
    date: "2026-05-20"
  }
];

export const MOCK_TUTORIALS = [
  {
    id: "TUT-1",
    title: "Mengatur Berat dan Pengaturan Ekspedisi Toko",
    duration: "4:15 m",
    category: "Logistik",
    videoThumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: "TUT-2",
    title: "Meningkatkan Konversi Penjualan Jasa via Booking System",
    duration: "6:30 m",
    category: "Strategi Bisnis",
    videoThumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: "TUT-3",
    title: "Mengintegrasikan Facebook Pixel & TikTok Shop dengan Sekali Klik",
    duration: "8:45 m",
    category: "Promosi",
    videoThumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60"
  }
];
