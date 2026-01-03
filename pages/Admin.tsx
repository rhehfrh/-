
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
  Upload
} from 'lucide-react';
import { useGlobalState } from '../App';
import { Product, Post, SiteSettings } from '../types';
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
  const { products, posts } = useGlobalState();
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">대시보드 개요</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="text-zinc-500 text-sm font-bold uppercase mb-2">등록된 기종</div>
          <div className="text-5xl font-black text-purple-500">{products.length}</div>
        </div>
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="text-zinc-500 text-sm font-bold uppercase mb-2">등록된 포스트</div>
          <div className="text-5xl font-black text-purple-500">{posts.length}</div>
        </div>
        <div className="p-8 rounded-2xl bg-purple-600/10 border border-purple-600/30">
          <div className="text-purple-400 text-sm font-bold uppercase mb-2">방문자 현황</div>
          <div className="text-5xl font-black text-white">READY</div>
        </div>
      </div>
    </div>
  );
};

const ProductManagement = () => {
  const { products, updateProducts } = useGlobalState();
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      updateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!editingProduct?.name) return;
    if (editingProduct.id) {
      updateProducts(products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      const newProduct = {
        ...editingProduct,
        id: Math.random().toString(36).substr(2, 9),
        isFeatured: editingProduct.isFeatured || false
      } as Product;
      updateProducts([newProduct, ...products]);
    }
    setEditingProduct(null);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setEditingProduct(prev => prev ? { ...prev, imageUrl: base64 } : null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">제품 관리</h2>
        <button 
          onClick={() => setEditingProduct({ name: '', brand: '', price: '', category: 'iPhone', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800' })}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold"
        >
          <Plus size={20} />
          <span>제품 추가</span>
        </button>
      </div>

      {editingProduct ? (
        <div className="p-8 rounded-2xl bg-zinc-900 border border-purple-600/30 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">제품명</label>
              <input 
                type="text" 
                value={editingProduct.name}
                onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">가격 문구</label>
              <input 
                type="text" 
                value={editingProduct.price}
                onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400 block mb-2">제품 이미지</label>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
                {editingProduct.imageUrl ? (
                  <img src={editingProduct.imageUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-zinc-600" />
                )}
              </div>
              <div className="space-y-3">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={onFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                >
                  <Upload size={16} />
                  <span>이미지 업로드</span>
                </button>
                <p className="text-xs text-zinc-500">이미지 파일을 선택하여 직접 업로드하세요.</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">상세 설명</label>
            <textarea 
              value={editingProduct.description}
              onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
              className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2">
              <Save size={18} /> <span>저장하기</span>
            </button>
            <button onClick={() => setEditingProduct(null)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-8 py-3 rounded-xl font-bold">취소</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map(product => (
            <div key={product.id} className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="flex items-center space-x-6">
                <img src={product.imageUrl} className="w-16 h-16 rounded-xl object-cover bg-zinc-800" />
                <div>
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-zinc-500 text-sm">{product.price}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setEditingProduct(product)} className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PostManagement = () => {
  const { posts, updatePosts } = useGlobalState();
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAiGenerate = async () => {
    if (!editingPost?.title) return alert('제목을 먼저 입력해주세요.');
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `핸드폰 대리점 소식글을 작성해주세요. 제목은 "${editingPost.title}"입니다. 
                  매장 이름은 바를정 핸드폰입니다. 친절하고 신뢰감 있는 말투로 3~4문장의 내용을 작성해주세요.`,
      });
      setEditingPost({ ...editingPost, content: response.text });
    } catch (error) {
      console.error(error);
      alert('AI 생성에 실패했습니다.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    if (!editingPost?.title) return;
    if (editingPost.id) {
      updatePosts(posts.map(p => p.id === editingPost.id ? (editingPost as Post) : p));
    } else {
      const newPost = {
        ...editingPost,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        author: '관리자',
        imageUrl: editingPost.imageUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200'
      } as Post;
      updatePosts([newPost, ...posts]);
    }
    setEditingPost(null);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setEditingPost(prev => prev ? { ...prev, imageUrl: base64 } : null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">소식/이벤트 관리</h2>
        <button 
          onClick={() => setEditingPost({ title: '', excerpt: '', content: '', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200' })}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold"
        >
          <Plus size={20} />
          <span>소식 추가</span>
        </button>
      </div>

      {editingPost ? (
        <div className="p-8 rounded-2xl bg-zinc-900 border border-purple-600/30 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">제목</label>
            <input 
              type="text" 
              value={editingPost.title}
              onChange={e => setEditingPost({...editingPost, title: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
              placeholder="예: 아이폰 15 할인 프로모션"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400 block mb-2">소식 대표 사진</label>
            <div className="flex items-center space-x-6">
              <div className="w-48 h-32 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
                {editingPost.imageUrl ? (
                  <img src={editingPost.imageUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-zinc-600" />
                )}
              </div>
              <div className="space-y-3">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={onFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                >
                  <Upload size={16} />
                  <span>이미지 업로드</span>
                </button>
                <p className="text-xs text-zinc-500">배너로 사용할 사진을 선택하세요.</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">간략 요약</label>
            <input 
              type="text" 
              value={editingPost.excerpt}
              onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
              placeholder="매장 메인에 노출될 짧은 설명"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
               <label className="text-sm font-bold text-zinc-400">본문 내용</label>
               <button 
                 onClick={handleAiGenerate}
                 disabled={isAiLoading}
                 className="text-xs flex items-center space-x-1 text-purple-400 hover:text-purple-300 disabled:opacity-50"
               >
                 <Wand2 size={14} />
                 <span>{isAiLoading ? 'AI 작성 중...' : 'AI로 내용 채우기'}</span>
               </button>
            </div>
            <textarea 
              value={editingPost.content}
              onChange={e => setEditingPost({...editingPost, content: e.target.value})}
              className="w-full h-64 bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2">
              <Save size={18} /> <span>저장하기</span>
            </button>
            <button onClick={() => setEditingPost(null)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-8 py-3 rounded-xl font-bold">취소</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map(post => (
            <div key={post.id} className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="flex items-center space-x-6">
                <img src={post.imageUrl} className="w-16 h-16 rounded-xl object-cover bg-zinc-800" />
                <div>
                  <h4 className="font-bold text-lg">{post.title}</h4>
                  <p className="text-zinc-500 text-sm">{post.date}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setEditingPost(post)} className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg">
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => { if(confirm('삭제하시겠습니까?')) updatePosts(posts.filter(p => p.id !== post.id)) }} 
                  className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsManagement = () => {
  const { settings, updateSettings } = useGlobalState();
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">사이트 설정</h2>
        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold"
        >
          <Save size={20} />
          <span>설정 저장</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-purple-400 border-b border-zinc-800 pb-2">기본 정보</h3>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase">사이트명</label>
            <input 
              type="text" 
              value={localSettings.siteName}
              onChange={e => setLocalSettings({...localSettings, siteName: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase">연락처</label>
            <input 
              type="text" 
              value={localSettings.contactNumber}
              onChange={e => setLocalSettings({...localSettings, contactNumber: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-purple-400 border-b border-zinc-800 pb-2">소셜 & 브랜딩</h3>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase">인스타그램 ID</label>
            <input 
              type="text" 
              value={localSettings.instagram}
              onChange={e => setLocalSettings({...localSettings, instagram: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase">카카오톡 ID</label>
            <input 
              type="text" 
              value={localSettings.kakaoId}
              onChange={e => setLocalSettings({...localSettings, kakaoId: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-10 right-10 flex items-center space-x-3 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
          <CheckCircle2 size={24} />
          <span className="font-bold">성공적으로 저장되었습니다!</span>
        </div>
      )}
    </div>
  );
};

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col fixed h-full z-20">
        <div className="mb-12">
          <div className="text-2xl font-black text-purple-500 mb-2">관리자 센터</div>
          <p className="text-xs text-zinc-500">바를정 핸드폰 통합 관리 시스템</p>
        </div>
        
        <nav className="flex-grow space-y-2">
          <SidebarLink to="" icon={LayoutDashboard} label="홈" />
          <SidebarLink to="/products" icon={Package} label="제품 관리" />
          <SidebarLink to="/posts" icon={Newspaper} label="소식 관리" />
          <SidebarLink to="/settings" icon={SettingsIcon} label="사이트 설정" />
        </nav>

        <div className="pt-6 border-t border-zinc-900">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center space-x-2 px-4 py-3 rounded-xl text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>메인으로 돌아가기</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow ml-72 p-12">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/posts" element={<PostManagement />} />
          <Route path="/settings" element={<SettingsManagement />} />
        </Routes>
      </main>
    </div>
  );
}
