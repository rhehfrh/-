
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
  Mail,
  Link as LinkIcon
} from 'lucide-react';
import { useGlobalState } from '../App';
import { Product, Post, SiteSettings, FranchiseSettings, FranchiseBenefit, HomeFeature, HomeTestimonial } from '../types';
import { GoogleGenAI } from "@google/genai";

const SidebarLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = (to === "" && location.pathname === "/admin") || (to !== "" && location.pathname === `/admin${to}`);
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
    <div className="space-y-8 animate-in fade-in duration-500">
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
      const prompt = `A professional, premium high-end mobile store interior or luxury tech background. Theme: "${localSettings.heroTitle}". Cinematic lighting, 4k resolution, futuristic vibe.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setLocalSettings(prev => ({ ...prev, heroImageUrl: `data:image/png;base64,${part.inlineData.data}` }));
      }
    } catch (error) {
      alert('AI 이미지 생성 중 오류가 발생했습니다.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAiBadgeGenerate = async () => {
    setIsBadgeGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Minimalist premium technology logo icon, circle shape, purple glowing neon, transparent background style, high quality vector art.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setLocalSettings(prev => ({ ...prev, heroBadgeUrl: `data:image/png;base64,${part.inlineData.data}` }));
      }
    } catch (error) {
      alert('AI 배지 생성 중 오류가 발생했습니다.');
    } finally {
      setIsBadgeGenerating(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">홈 디자인 관리</h2>
        <button onClick={handleSave} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
          <Save size={20} />
          <span>저장하기</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 히어로 배경 관리 */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2">
              <ImageIcon size={20} />
              <span>히어로 배경</span>
            </h3>
            <button onClick={handleAiHeroImageGenerate} disabled={isAiGenerating} className="text-xs text-purple-400 bg-purple-600/10 px-3 py-1.5 rounded-lg border border-purple-500/20 hover:bg-purple-600/20 transition-all">
              {isAiGenerating ? '생성 중...' : 'AI 생성'}
            </button>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/5 shadow-inner">
            <img src={localSettings.heroImageUrl} className="w-full h-full object-cover" alt="Preview" />
          </div>
          <input type="file" ref={heroFileInputRef} onChange={onHeroFileChange} className="hidden" accept="image/*" />
          <button onClick={() => heroFileInputRef.current?.click()} className="w-full bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl text-sm font-bold transition-colors">이미지 업로드</button>
        </div>

        {/* 배지 및 링크 관리 */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2">
              <Sparkles size={20} />
              <span>상단 왼쪽 배지 관리</span>
            </h3>
            <button onClick={handleAiBadgeGenerate} disabled={isBadgeGenerating} className="text-xs text-purple-400 bg-purple-600/10 px-3 py-1.5 rounded-lg border border-purple-500/20 hover:bg-purple-600/20 transition-all">
              {isBadgeGenerating ? '생성 중...' : 'AI 생성'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 flex items-center justify-center p-4">
                <img src={localSettings.heroBadgeUrl} className="max-w-full max-h-full object-contain" alt="Badge Preview" />
              </div>
              <input type="file" ref={badgeFileInputRef} onChange={onBadgeFileChange} className="hidden" accept="image/*" />
              <button onClick={() => badgeFileInputRef.current?.click()} className="w-full bg-zinc-800 hover:bg-zinc-700 p-2.5 rounded-xl text-xs font-bold transition-colors">배지 이미지 교체</button>
            </div>
            
            <div className="flex flex-col justify-end space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 flex items-center space-x-1">
                  <LinkIcon size={12} />
                  <span>배지 클릭 시 이동할 URL</span>
                </label>
                <input 
                  type="text" 
                  value={localSettings.heroBadgeLinkUrl || ''} 
                  placeholder="예: 사전승낙서 이미지 URL 또는 페이지 주소"
                  onChange={e => setLocalSettings({...localSettings, heroBadgeLinkUrl: e.target.value})} 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                배지는 홈 화면 상단 왼쪽에 표시되며, 현재 크기가 3배 확대되어 노출됩니다. 투명 배경 이미지를 사용하면 더욱 깔끔합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2"><Layout size={20} /><span>텍스트 설정</span></h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">메인 타이틀</label>
            <input type="text" value={localSettings.heroTitle} onChange={e => setLocalSettings({...localSettings, heroTitle: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">서브 타이틀</label>
            <textarea value={localSettings.heroSubtitle} onChange={e => setLocalSettings({...localSettings, heroSubtitle: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 h-24 resize-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ... (Rest of Admin code remains the same as before)

const ProductManagement = () => {
  const { products, updateProducts } = useGlobalState();
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleSave = () => {
    if (!editingProduct?.name) return;
    if (editingProduct.id) {
      updateProducts(products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      const newProduct = { ...editingProduct, id: Math.random().toString(36).substr(2, 9), isFeatured: false } as Product;
      updateProducts([newProduct, ...products]);
    }
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">제품 관리</h2>
        <button onClick={() => setEditingProduct({ name: '', price: '', category: 'iPhone', imageUrl: '', brand: '', description: '' })} className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
          <Plus size={20} /><span>제품 추가</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {products?.map(product => (
          <div key={product.id} className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 group hover:border-purple-500/30 transition-all">
            <div className="flex items-center space-x-6">
              <img src={product.imageUrl} className="w-16 h-16 rounded-xl object-cover bg-zinc-800" alt={product.name} />
              <div>
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-zinc-500 text-sm">{product.price}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setEditingProduct(product)} className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"><Edit size={20} /></button>
              <button onClick={() => updateProducts(products.filter(p => p.id !== product.id))} className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={20} /></button>
            </div>
          </div>
        ))}
      </div>
      {editingProduct && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] w-full max-w-xl space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-bold text-white">제품 정보 편집</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="제품명" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white" />
              <input type="text" placeholder="가격 (예: 1,000,000원)" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white" />
            </div>
            <textarea placeholder="제품 설명" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white h-24" />
            <div className="flex space-x-4">
              <button onClick={handleSave} className="flex-grow bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-bold transition-all">저장</button>
              <button onClick={() => setEditingProduct(null)} className="flex-grow bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl font-bold transition-all">취소</button>
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
      <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col fixed h-full z-50">
        <div className="mb-12">
          <div className="flex items-center space-x-3 text-purple-500 mb-2">
            <Sparkles size={28} className="animate-pulse" />
            <div className="text-2xl font-black tracking-tighter italic">AI STUDIO</div>
          </div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-1">Management Portal</div>
        </div>
        <nav className="flex-grow space-y-1">
          <SidebarLink to="" icon={LayoutDashboard} label="대시보드" />
          <SidebarLink to="/products" icon={Package} label="제품 관리" />
          <SidebarLink to="/home-ui" icon={Layout} label="홈 디자인" />
          <SidebarLink to="/franchise" icon={Handshake} label="창업 관리" />
          <SidebarLink to="/news" icon={Newspaper} label="소식 관리" />
        </nav>
        <div className="pt-6 border-t border-zinc-900">
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-white transition-all hover:bg-zinc-900 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm tracking-tight">웹사이트 이동</span>
          </button>
        </div>
      </aside>
      <main className="flex-grow ml-72 p-12 relative overflow-y-auto h-screen bg-zinc-950/50">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/home-ui" element={<HomeManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="*" element={<DashboardHome />} />
        </Routes>
      </main>
    </div>
  );
}
