
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Settings as SettingsIcon, 
  Phone, 
  Instagram, 
  MessageCircle,
} from 'lucide-react';
import { GlobalState, Product, Post, SiteSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_POSTS, INITIAL_SETTINGS } from './constants';

// Pages
import Home from './pages/Home';
import ProductGallery from './pages/ProductGallery';
import News from './pages/News';
import PostDetail from './pages/PostDetail';
import Admin from './pages/Admin';
import Franchise from './pages/Franchise';

const StateContext = createContext<GlobalState | undefined>(undefined);

export const useGlobalState = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error("useGlobalState must be used within StateProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useGlobalState();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                {settings.siteName}
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">홈</Link>
              <Link to="/products" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">제품 갤러리</Link>
              <Link to="/news" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">매장 소식</Link>
              <Link to="/franchise" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">창업문의</Link>
              <Link to="/admin" className="text-gray-500 hover:text-white px-3 py-2 transition-opacity opacity-50 hover:opacity-100">
                <SettingsIcon size={18} />
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black border-b border-purple-900/30 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-purple-900/20">홈</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-purple-900/20">제품 갤러리</Link>
          <Link to="/news" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-purple-900/20">매장 소식</Link>
          <Link to="/franchise" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-purple-900/20">창업문의</Link>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-500">관리자</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { settings } = useGlobalState();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer className="bg-zinc-950 border-t border-purple-900/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6 text-purple-400">{settings.siteName}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              정직함을 원칙으로 최상의 모바일 경험을 제공합니다.<br />
              고객님의 통신 환경을 분석하여 가장 합리적인 제안을 약속드립니다.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">고객센터</h4>
            <div className="space-y-4">
              <p className="flex items-center text-zinc-400 text-sm">
                <Phone size={16} className="mr-3 text-purple-500" /> {settings.contactNumber}
              </p>
              <p className="flex items-center text-zinc-400 text-sm">
                <MessageCircle size={16} className="mr-3 text-purple-500" /> 카카오톡: @{settings.kakaoId}
              </p>
              <p className="flex items-center text-zinc-400 text-sm">
                <Instagram size={16} className="mr-3 text-purple-500" /> 인스타그램: @{settings.instagram}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">위치 안내</h4>
            <p className="text-zinc-400 text-sm">{settings.address}</p>
            <div className="mt-6 flex space-x-4">
               <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-purple-600 transition-colors">
                 <Instagram size={20} />
               </a>
               <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-yellow-500 transition-colors">
                 <MessageCircle size={20} />
               </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs">
            © 2024 {settings.siteName}. All rights reserved. Designed for Premium Mobile Experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      console.error("Failed to parse products from localStorage", e);
      return INITIAL_PRODUCTS;
    }
  });
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch (e) {
      console.error("Failed to parse posts from localStorage", e);
      return INITIAL_POSTS;
    }
  });
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch (e) {
      console.error("Failed to parse settings from localStorage", e);
      return INITIAL_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const value: GlobalState = {
    products,
    posts,
    settings,
    updateProducts: setProducts,
    updatePosts: setPosts,
    updateSettings: setSettings
  };

  return (
    <StateContext.Provider value={value}>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductGallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<PostDetail />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </StateContext.Provider>
  );
}
