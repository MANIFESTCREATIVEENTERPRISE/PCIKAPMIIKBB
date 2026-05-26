import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Publications from "./pages/Publications";
import MemberRegistration from "./pages/MemberRegistration";
import UMKM from "./pages/UMKM";
import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import Login from "./pages/Login";
import Donation from "./pages/Donation";
import AlumniProfileModal from "./components/AlumniProfileModal";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import bannerImg from "./assets/images/popup.png";

export default function App() {
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [location.pathname]);

  const isSellerRoute = location.pathname.startsWith("/seller");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/profil/*" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/visi-misi-program/*" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/publikasi/*" element={<PageWrapper><Publications /></PageWrapper>} />
            <Route path="/daftar-anggota" element={<PageWrapper><MemberRegistration /></PageWrapper>} />
            <Route path="/produk-umkm/*" element={<PageWrapper><UMKM /></PageWrapper>} />
            <Route path="/siap" element={<PageWrapper><MemberDashboard /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            <Route path="/seller" element={<PageWrapper><SellerDashboard /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/donasi" element={<PageWrapper><Donation /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isSellerRoute && <Footer />}

      <AlumniProfileModal />

      <AnimatePresence>
        {showWelcome && (
          <WelcomePopup onClose={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function WelcomePopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 bg-primary/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, rotateX: 10 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative max-w-5xl w-full bg-transparent rounded-[1rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-50 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border-2 border-white/20 shadow-2xl"
          aria-label="Tutup"
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        <div className="relative w-full group flex items-center justify-center rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src={bannerImg}
            alt="Welcome Banner"
            className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
