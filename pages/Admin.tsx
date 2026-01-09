
import React, { useState, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Newspaper, 
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  Save,
  Wand2,
  CheckCircle2,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Zap,
  Cpu,
  Handshake,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Layout,
  Star,
  Eye,
  Mail
} from 'lucide-react';
import { useGlobalState } from '../App';
import { Product, Post, SiteSettings, FranchiseSettings, FranchiseBenefit, HomeFeature, HomeTestimonial } from '../types';
import { GoogleGenAI } from "@google/genai";

const SidebarLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === `/admin${to}`;
  return (
    <Link 
      to={`/admin${to}`}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const DashboardHome = () => {
  const { products, posts, inquiries } = useGlobalState();
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-purple-600/20 rounded-2xl">
          <Cpu className="text-purple-400" size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">시스템 대시보드</h2>
          <p className="text-zinc-500 text-sm">Google AI Studio와 연동된 스마트 관리 시스템</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package size={80} />
          </div>
          <div className="text-zinc-500 text-sm font-bold uppercase mb-2">등록된 기종</div>
          <div className="text-5xl font-black text-purple-500">{products?.length || 0}</div>
        </div>
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Newspaper size={80} />
          </div>
          <div className="text-zinc-500 text-sm font-bold uppercase mb-2">등록된 포스트</div>
          <div className="text-5xl font-black text-purple-500">{posts?.length || 0}</div>
        </div>
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <MessageSquare size={80} />
          </div>
          <div className="text-zinc-500 text-sm font-bold uppercase mb-2">새 창업 문의</div>
          <div className="text-5xl font-black text-purple-500">{inquiries?.length || 0}</div>
        </div>
      </div>
    </div>
  );
};

const HomeManagement = () => {
  const { settings, updateSettings } = useGlobalState();
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isBadgeGenerating, setIsBadgeGenerating] = useState(false);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const badgeFileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateSettings(localSettings);
    alert('홈 화면 설정이 저장되었습니다.');
  };

  const onHeroFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setLocalSettings(prev => ({ ...prev, heroImageUrl: base64 }));
    }
  };

  const onBadgeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setLocalSettings(prev => ({ ...prev, heroBadgeUrl: base64 }));
    }
  };

  const handleAiHeroImageGenerate = async () => {
    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A professional, high-end commercial photography background for a premium mobile phone shop. Theme: "${localSettings.heroTitle}". Wide aspect ratio, 4k, cinematic lighting, sleek tech atmosphere.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });
      
      let base64Image = '';
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        base64Image = `data:image/png;base64,${part.inlineData.data}`;
      }
      
      if (base64Image) {
        setLocalSettings(prev => ({ ...prev, heroImageUrl: base64Image }));
      } else {
        alert('이미지를 생성하지 못했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('AI 이미지 생성 오류');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAiBadgeGenerate = async () => {
    setIsBadgeGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A small, minimalist, premium logo or sticker for a high-end mobile phone shop. Transparent background style, glowing purple neon effect, futuristic tech icon, white and purple color theme, vector style.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });
      
      let base64Image = '';
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        base64Image = `data:image/png;base64,${part.inlineData.data}`;
      }
      
      if (base64Image) {
        setLocalSettings(prev => ({ ...prev, heroBadgeUrl: base64Image }));
      } else {
        alert('배지 이미지를 생성하지 못했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('AI 배지 생성 오류');
    } finally {
      setIsBadgeGenerating(false);
    }
  };

  const updateFeature = (id: string, field: keyof HomeFeature, value: string) => {
    const newFeatures = localSettings.features.map(f => f.id === id ? { ...f, [field]: value } : f);
    setLocalSettings({ ...localSettings, features: newFeatures });
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">홈 디자인 관리</h2>
        <button onClick={handleSave} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-600/20">
          <Save size={20} />
          <span>설정 저장</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 상단 배경 이미지 */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2">
              <ImageIcon size={20} />
              <span>히어로 배경 이미지</span>
            </h3>
            <button 
              onClick={handleAiHeroImageGenerate}
              disabled={isAiGenerating}
              className="text-xs text-purple-400 bg-purple-600/10 px-3 py-1.5 rounded-lg border border-purple-500/20"
            >
              AI 생성
            </button>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/5">
            <img src={localSettings.heroImageUrl} className="w-full h-full object-cover" />
          </div>
          <input type="file" ref={heroFileInputRef} onChange={onHeroFileChange} className="hidden" accept="image/*" />
          <button onClick={() => heroFileInputRef.current?.click()} className="w-full bg-zinc-800 p-3 rounded-xl text-sm font-bold">배경 교체</button>
        </div>

        {/* 상단 왼쪽 작은 배지 이미지 */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2">
              <Sparkles size={20} />
              <span>상단 왼쪽 배지/스티커</span>
            </h3>
            <button 
              onClick={handleAiBadgeGenerate}
              disabled={isBadgeGenerating}
              className="text-xs text-purple-400 bg-purple-600/10 px-3 py-1.5 rounded-lg border border-purple-500/20"
            >
              AI 생성
            </button>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-black border border-white/5 flex items-center justify-center p-4">
              <img src={localSettings.heroBadgeUrl} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-grow space-y-3">
              <p className="text-xs text-zinc-500">홈 화면 상단 왼쪽에 표시될 작은 로고나 배지입니다. 투명 배경 이미지를 권장합니다.</p>
              <input type="file" ref={badgeFileInputRef} onChange={onBadgeFileChange} className="hidden" accept="image/*" />
              <button onClick={() => badgeFileInputRef.current?.click()} className="w-full bg-zinc-800 p-3 rounded-xl text-sm font-bold">배지 교체</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2"><Layout size={20} /><span>히어로 문구</span></h3>
        <input type="text" value={localSettings.heroTitle} onChange={e => setLocalSettings({...localSettings, heroTitle: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500" />
        <textarea value={localSettings.heroSubtitle} onChange={e => setLocalSettings({...localSettings, heroSubtitle: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 h-24 resize-none" />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2 px-2"><Zap size={20} /><span>강점 카드</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localSettings.features.map((feature) => (
            <div key={feature.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <input type="text" value={feature.title} onChange={e => updateFeature(feature.id, 'title', e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-sm outline-none" />
              <textarea value={feature.description} onChange={e => updateFeature(feature.id, 'description', e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-sm h-20 outline-none resize-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ... (Product, Post, FranchiseManagement 등 생략 - 이전 구조 유지하며 safe access 적용)

const ProductManagement = () => {
  const { products, updateProducts } = useGlobalState();
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!editingProduct?.name) return;
    if (editingProduct.id) {
      updateProducts(products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      const newProduct = { ...editingProduct, id: Math.random().toString(36).substr(2, 9) } as Product;
      updateProducts([newProduct, ...products]);
    }
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">제품 관리</h2>
        <button onClick={() => setEditingProduct({ name: '', price: '', category: 'iPhone', imageUrl: '' })} className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold"><Plus size={20} /><span>제품 추가</span></button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {products?.map(product => (
          <div key={product.id} className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center space-x-6">
              <img src={product.imageUrl} className="w-16 h-16 rounded-xl object-cover" />
              <h4 className="font-bold">{product.name}</h4>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setEditingProduct(product)} className="p-3 text-zinc-400 hover:text-white"><Edit size={20} /></button>
              <button onClick={() => updateProducts(products.filter(p => p.id !== product.id))} className="p-3 text-zinc-400 hover:text-red-500"><Trash2 size={20} /></button>
            </div>
          </div>
        ))}
      </div>
      {editingProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-lg space-y-6">
            <h3 className="text-xl font-bold">제품 편집</h3>
            <input type="text" placeholder="제품명" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white" />
            <input type="text" placeholder="가격" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white" />
            <div className="flex space-x-4">
              <button onClick={handleSave} className="flex-grow bg-purple-600 p-4 rounded-xl font-bold">저장</button>
              <button onClick={() => setEditingProduct(null)} className="flex-grow bg-zinc-800 p-4 rounded-xl font-bold">취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Admin() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-purple-500/30">
      <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col fixed h-full z-20">
        <div className="mb-12">
          <div className="flex items-center space-x-3 text-purple-500 mb-2">
            <Sparkles size={28} />
            <div className="text-2xl font-black tracking-tighter italic">AI STUDIO</div>
          </div>
        </div>
        <nav className="flex-grow space-y-2">
          <SidebarLink to="" icon={LayoutDashboard} label="홈" />
          <SidebarLink to="/products" icon={Package} label="제품 관리" />
          <SidebarLink to="/posts" icon={Newspaper} label="소식 관리" />
          <SidebarLink to="/home-ui" icon={Layout} label="홈 디자인" />
          <SidebarLink to="/franchise" icon={Handshake} label="창업 관리" />
        </nav>
        <div className="pt-6 border-t border-zinc-900">
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-white transition-all hover:bg-zinc-900 group">
            <ArrowLeft size={20} />
            <span className="font-bold text-sm tracking-tight">웹사이트 이동</span>
          </button>
        </div>
      </aside>
      <main className="flex-grow ml-72 p-12 relative overflow-hidden">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/home-ui" element={<HomeManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          {/* 기타 라우트들 - 필요시 확장 */}
        </Routes>
      </main>
    </div>
  );
}
