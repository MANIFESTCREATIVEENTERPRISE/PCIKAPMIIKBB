export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  status: "aktif" | "draft" | "habis" | "ditolak" | "trending";
  type: "fisik" | "digital";
  sales: number;
  image: string;
  description: string;
  weight: number; // in grams
}

export interface ServiceItem {
  id: string;
  name: string;
  category: "Desain" | "Digital Marketing" | "Konstruksi" | "Konsultan" | "Event" | "Pendidikan" | "Teknologi" | "Servis";
  price: number;
  duration: string; // e.g., "3 Hari", "2 Jam"
  status: "aktif" | "draft" | "ditandai";
  location: string;
  portfolioCount: number;
  description: string;
  bookingSlots: { time: string; booked: boolean; date: string }[];
}

export interface Order {
  id: string;
  customerName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "masuk" | "menunggu_pembayaran" | "diproses" | "dikirim" | "selesai" | "refund" | "komplain";
  date: string;
  paymentMethod: "Transfer Bank" | "E-Wallet" | "COD" | "Direct Escrow";
  courier: string;
  trackingNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: "Platinum" | "Gold" | "Silver" | "Regular";
  totalSpent: number;
  orderCount: number;
  points: number;
  status: "aktif" | "suspended";
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "seller" | "ai";
  text: string;
  timestamp: string;
  fileUrl?: string;
  isVoiceNote?: boolean;
}

export interface HelpTicket {
  id: string;
  title: string;
  category: string;
  status: "open" | "in_progress" | "resolved";
  priority: "high" | "medium" | "low";
  date: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: "Seller" | "Admin Toko" | "Staff Operasional";
  status: "aktif" | "nonaktif";
  permissions: {
    manageProducts: boolean;
    manageFinances: boolean;
    manageStaff: boolean;
    manageOrders: boolean;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  ip: string;
}
