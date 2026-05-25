import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import logoImg from "../assets/images/logo.png";

export default function Footer() {
  const [suggestion, setSuggestion] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/critics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suggestion),
      });
      setSent(true);
      setSuggestion({ name: "", contact: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
        {/* Column 1: Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="PC IKA PMII Kabupaten Bandung Barat" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallbackStar = e.currentTarget.parentElement?.querySelector(".footer-logo-star");
                if (fallbackStar) fallbackStar.classList.remove("hidden");
              }}
            />
            <div className="footer-logo-star hidden w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-black text-lg border border-accent/40 shrink-0">
              ★
            </div>
          </div>
          <p className="text-sm italic text-white/80">"Satu Angkatan satu jiwa, Putera Bangsa Bebas Merdeka"</p>
          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-3 text-sm text-white/70">
              <MapPin size={18} className="shrink-0 text-accent" />
              <span>Kp. Babakan Rt 003 Rw 007 Desa Tanimulya Kecamatan Ngamrah Kabupaten Bandung Barat</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Phone size={18} className="text-accent" />
              <span>082115991771</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Mail size={18} className="text-accent" />
              <span>pcikapmiibandungbarat@gmail.com</span>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            {[Facebook, Instagram, Youtube, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-xl border-l-4 border-accent pl-4 text-accent">Profil Organisasi</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/profil/pc" className="hover:text-accent transition-colors">Pengurus Cabang</Link></li>
            <li><Link to="/profil/pac" className="hover:text-accent transition-colors">Pengurus Anak Cabang</Link></li>
            <li><Link to="/profil/ranting" className="hover:text-accent transition-colors">Pengurus Ranting</Link></li>
            <li><Link to="/profil/lbh" className="hover:text-accent transition-colors">LBH IKA PMII</Link></li>
            <li><Link to="/profil/koperasi" className="hover:text-accent transition-colors">Koperasi KAMARA</Link></li>
          </ul>
        </div>

        {/* Column 3: Critics/Suggestions */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-xl border-l-4 border-accent pl-4 text-accent">Kritik & Saran</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-accent"
              value={suggestion.name}
              onChange={(e) => setSuggestion({ ...suggestion, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Kontak (WA/Email)"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-accent"
              value={suggestion.contact}
              onChange={(e) => setSuggestion({ ...suggestion, contact: e.target.value })}
              required
            />
            <textarea
              placeholder="Pesan, Kritik, atau Saran..."
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-accent"
              value={suggestion.message}
              onChange={(e) => setSuggestion({ ...suggestion, message: e.target.value })}
              required
            />
            <button type="submit" className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:brightness-110 transition-all">
              {sent ? "Terkirim!" : "Kirim Aspirasi"}
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center text-xs text-white/50 space-y-2">
        <p>© 2026 PC IKA PMII Kabupaten Bandung Barat. All rights reserved.</p>
        <p>Crafted by manifestation of creative enterprise corp. @manifestcreatifenterprise.corp</p>
      </div>
    </footer>
  );
}
