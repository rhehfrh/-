
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
  Handshake,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  MapPin,
  Award,
  Users,
  Smartphone as SmartphoneIcon,
  Mail,
  Sparkles,
  Zap,
  Cpu,
  Monitor,
  Eye
} from 'lucide-react';
import { useGlobalState } from '../App';
import { Product, Post, SiteSettings, FranchiseSettings, FranchiseBenefit, FranchiseInquiry } from '../types';
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

const IconMap = {
  TrendingUp: TrendingUp,
  Handshake: Handshake,
  MapPin: MapPin,
  Award: Award,
  Users: Users
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
          <div className="text-5xl font-black text-purple-500">{products.length}</div>
        </div>
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Newspaper size={80} />
          </div>
          <div className="text-zinc-500 text-sm font-bold uppercase mb-2">등록된 포스트</div>
          <div className="text-5xl font-black text-purple-500">{posts.length}</div>
        </div>
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <MessageSquare size={80} />
          </div>
          <div className="text-zinc-500 text-sm font-bold uppercase mb-2">새 창업 문의</div>
          <div className="text-5xl font-black text-purple-500">{inquiries.length}</div>
        </div>
      </div>
    </div>
  );
};

const FranchiseManagement = () => {
  const { settings, franchiseSettings, updateFranchiseSettings, inquiries, updateInquiries } = useGlobalState();
  const [localSettings, setLocalSettings] = useState<FranchiseSettings>(franchiseSettings);
  const [activeTab, setActiveTab] = useState<'content' | 'inquiries'>('content');
  const [expandedInquiry, setExpandedInquiry] = useState<string | null>(null);

  const handleSaveSettings = () => {
    updateFranchiseSettings(localSettings);
    alert('창업 페이지 설정이 사이트에 저장되었습니다.');
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('이 문의 내역을 삭제하시겠습니까?')) {
      updateInquiries(inquiries.filter(iq => iq.id !== id));
    }
  };

  const updateBenefit = (id: string, field: keyof FranchiseBenefit, value: string) => {
    const newBenefits = localSettings.benefits.map(b => b.id === id ? { ...b, [field]: value } : b);
    setLocalSettings({ ...localSettings, benefits: newBenefits });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">창업 관리</h2>
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'content' ? 'bg-purple-600 text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            컨텐츠 수정
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'inquiries' ? 'bg-purple-600 text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            문의 내역 ({inquiries.length})
          </button>
        </div>
      </div>

      {activeTab === 'content' ? (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
          <div className="xl:col-span-3 space-y-8">
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-purple-400">메인 섹션 및 이메일 설정</h3>
                <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>Live Editing Mode</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">문의 수신 이메일 (상담 신청 전송 대상)</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
                    <input 
                      type="email"
                      value={localSettings.contactEmail}
                      onChange={e => setLocalSettings({...localSettings, contactEmail: e.target.value})}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 pl-12 text-white focus:outline-none focus:border-purple-500 text-sm font-mono"
                      placeholder="rhehfrh@hanmail.net"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-600 px-1 mt-1">※ 고객이 상담 폼 작성 시 위 주소로 이메일 발송 창이 열립니다.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">메인 타이틀</label>
                  <textarea 
                    value={localSettings.heroTitle}
                    onChange={e => setLocalSettings({...localSettings, heroTitle: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 h-24 text-sm resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">서브텍스트</label>
                  <textarea 
                    value={localSettings.heroSubtitle}
                    onChange={e => setLocalSettings({...localSettings, heroSubtitle: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 h-32 text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-400 px-2">성공 포인트 관리</h3>
              <div className="grid grid-cols-1 gap-4">
                {localSettings.benefits.map((benefit, idx) => (
                  <div key={benefit.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-white">포인트 {idx + 1}</h4>
                      </div>
                      <select 
                        value={benefit.iconName}
                        onChange={e => updateBenefit(benefit.id, 'iconName', e.target.value as any)}
                        className="bg-zinc-800 border border-zinc-700 rounded-md p-1 text-[10px] text-zinc-300 outline-none"
                      >
                        <option value="TrendingUp">성장</option>
                        <option value="Handshake">협력</option>
                        <option value="MapPin">지역</option>
                        <option value="Award">품질</option>
                        <option value="Users">고객</option>
                      </select>
                    </div>
                    <input 
                      type="text" 
                      value={benefit.title}
                      onChange={e => updateBenefit(benefit.id, 'title', e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-sm focus:border-purple-500 outline-none"
                    />
                    <textarea 
                      value={benefit.description}
                      onChange={e => updateBenefit(benefit.id, 'description', e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-sm h-20 focus:border-purple-500 outline-none resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSaveSettings}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-2xl font-bold shadow-lg shadow-purple-600/20 transition-all transform hover:scale-[1.01]"
            >
              <Save size={20} />
              <span>사이트 설정 저장 및 반영</span>
            </button>
          </div>

          {/* Pro Preview Column with Google AI Studio Styling */}
          <div className="xl:col-span-2 sticky top-12 space-y-6 hidden xl:block">
            {/* Google AI Studio Inspired Header */}
            <div className="relative group p-[2px] rounded-3xl overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy group-hover:duration-500"></div>
               <div className="relative bg-zinc-950/95 backdrop-blur-xl p-6 rounded-[calc(1.5rem-1px)] border border-white/5">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                       <div className="relative">
                          <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304603353591041.svg" className="w-8 h-8 animate-pulse" alt="Gemini" />
                          <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full animate-pulse"></div>
                       </div>
                       <div>
                          <div className="text-white text-sm font-black tracking-tight leading-none mb-1 uppercase italic">Google AI Studio</div>
                          <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Adaptive Pro Preview</div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
                       <span className="text-[9px] font-black text-green-500 tracking-tighter uppercase">Active</span>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="flex -space-x-1">
                       <div className="w-5 h-5 rounded-full border-2 border-zinc-900 bg-blue-500"></div>
                       <div className="w-5 h-5 rounded-full border-2 border-zinc-900 bg-purple-500"></div>
                       <div className="w-5 h-5 rounded-full border-2 border-zinc-900 bg-pink-500"></div>
                    </div>
                    <div className="text-[9px] text-zinc-500 font-medium">Gemini-Powered Visual Optimization</div>
                 </div>
               </div>
            </div>
            
            <div className="relative mx-auto w-full max-w-[360px] h-[720px] bg-zinc-950 rounded-[3rem] border-[12px] border-zinc-900 shadow-[0_0_100px_rgba(139,92,246,0.2)] overflow-hidden flex flex-col group">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-[1.5rem] z-20 flex items-center justify-center">
                 <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
              </div>
              
              <div className="flex-grow overflow-y-auto custom-scrollbar bg-black relative">
                {/* AI Aurora background effect */}
                <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-purple-600/10 via-blue-500/5 to-transparent pointer-events-none"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full"></div>
                
                <div className="relative z-10 pt-16 px-6 pb-12">
                  <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/10 ring-8 ring-purple-600/5 group-hover:ring-purple-600/10 transition-all">
                        <SmartphoneIcon size={28} className="text-purple-400 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <h1 className="text-xl font-black text-white mb-4 tracking-tighter whitespace-pre-wrap leading-tight">
                      {localSettings.heroTitle}
                    </h1>
                    <p className="text-[10px] text-zinc-500 leading-relaxed max-w-[220px] mx-auto whitespace-pre-wrap">
                      {localSettings.heroSubtitle}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {localSettings.benefits.map((item) => {
                      const Icon = IconMap[item.iconName] || TrendingUp;
                      return (
                        <div key={item.id} className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm shadow-2xl transform transition-transform hover:translate-x-1">
                          <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center mb-3">
                            <Icon size={16} className="text-purple-400" />
                          </div>
                          <h3 className="text-xs font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-zinc-500 text-[9px] leading-relaxed">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Form Preview with highlighted email action */}
                  <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 text-center relative overflow-hidden group/form">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover/form:h-2 transition-all"></div>
                    <div className="text-white text-[11px] font-black mb-4 flex items-center justify-center uppercase tracking-widest">
                      <Mail size={12} className="mr-2 text-purple-400" /> Consultation Form
                    </div>
                    <div className="space-y-2 opacity-30 mb-5">
                      <div className="w-full h-8 bg-zinc-800 rounded-lg"></div>
                      <div className="w-full h-8 bg-zinc-800 rounded-lg"></div>
                    </div>
                    <div className="w-full h-12 bg-purple-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-purple-600/20 group-hover/form:bg-purple-500 transition-colors">
                      <div className="text-[10px] font-black">상담 신청하기</div>
                      <div className="text-[7px] opacity-70 font-mono">Send to: rhehfrh@hanmail.net</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-8 bg-zinc-950 flex items-center justify-center pb-2">
                <div className="w-28 h-1.5 bg-zinc-800 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-zinc-600">
               <Eye size={12} />
               <p className="text-[9px] font-bold uppercase tracking-widest">Pixel-perfect rendering by Gemini-Pro Vision</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="p-20 text-center bg-zinc-900 rounded-3xl border border-zinc-800">
              <MessageSquare size={48} className="mx-auto text-zinc-700 mb-4" />
              <p className="text-zinc-500">아직 접수된 창업 문의가 없습니다.</p>
            </div>
          ) : (
            inquiries.map((iq) => (
              <div key={iq.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all hover:border-zinc-700">
                <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => setExpandedInquiry(expandedInquiry === iq.id ? null : iq.id)}>
                  <div className="flex items-center space-x-6">
                    <div className="bg-purple-600/10 text-purple-400 p-3 rounded-xl font-bold text-sm">{iq.date}</div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{iq.name} 고객님 <span className="text-zinc-500 text-sm font-normal ml-2">({iq.region})</span></h4>
                      <p className="text-zinc-500 font-mono text-sm">{iq.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteInquiry(iq.id); }} className="p-2 text-zinc-500 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                    {expandedInquiry === iq.id ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
                  </div>
                </div>
                {expandedInquiry === iq.id && (
                  <div className="p-8 bg-zinc-950 border-t border-zinc-800 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center space-x-2 mb-4">
                       <Mail size={14} className="text-purple-400" />
                       <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Inquiry Message</span>
                    </div>
                    <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-lg">{iq.message || '내용 없음'}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const PostManagement = () => {
  const { posts, updatePosts } = useGlobalState();
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAiTextGenerate = async () => {
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
      alert('AI 텍스트 생성에 실패했습니다.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAiImageGenerate = async () => {
    if (!editingPost?.title) return alert('이미지를 생성하려면 제목을 먼저 입력해주세요.');
    setIsImageGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A professional and sleek marketing banner photography for a mobile phone shop. Theme: "${editingPost.title}". Modern tech atmosphere, 4k, cinematic lighting.` }]
        }
      });
      
      let base64Image = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
      
      if (base64Image) {
        setEditingPost({ ...editingPost, imageUrl: base64Image });
      }
    } catch (error) {
      console.error(error);
      alert('AI 이미지 생성에 실패했습니다.');
    } finally {
      setIsImageGenerating(false);
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
          onClick={() => setEditingPost({ title: '', excerpt: '', content: '', imageUrl: '' })}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-600/20"
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
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 focus:outline-none focus:border-purple-500"
              placeholder="예: 아이폰 15 할인 프로모션"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-zinc-400">대표 사진 (AI 이미지 생성)</label>
              <button 
                onClick={handleAiImageGenerate}
                disabled={isImageGenerating}
                className="flex items-center space-x-2 text-xs text-purple-400 hover:text-white bg-purple-600/10 px-4 py-2 rounded-xl transition-all border border-purple-500/20 disabled:opacity-50"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>{isImageGenerating ? 'Gemini Drawing...' : 'AI 이미지 생성'}</span>
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-64 h-40 rounded-3xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center relative group shadow-2xl">
                {editingPost.imageUrl ? (
                  <img src={editingPost.imageUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-zinc-600" />
                )}
                {isImageGenerating && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Zap className="text-purple-500 animate-bounce mb-2" size={24} />
                    <span className="text-[10px] text-purple-400 font-black animate-pulse uppercase">AI Studio Rendering</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-2xl text-sm font-bold border border-white/5"
                >
                  <Upload size={16} />
                  <span>파일 직접 업로드</span>
                </button>
                <p className="text-[10px] text-zinc-600 font-medium">Google Gemini Pro Vision 엔진이 제목에<br />최적화된 고해상도 이미지를 생성합니다.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
               <label className="text-sm font-bold text-zinc-400 px-1">본문 내용</label>
               <button onClick={handleAiTextGenerate} disabled={isAiLoading} className="text-xs flex items-center space-x-2 text-purple-400 bg-purple-600/10 px-3 py-1.5 rounded-lg border border-purple-500/10 hover:bg-purple-600/20 disabled:opacity-50">
                 <Wand2 size={14} />
                 <span>{isAiLoading ? 'Gemini Writing...' : 'AI 문구 자동 생성'}</span>
               </button>
            </div>
            <textarea 
              value={editingPost.content}
              onChange={e => setEditingPost({...editingPost, content: e.target.value})}
              className="w-full h-48 bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center space-x-2 shadow-xl shadow-purple-600/20">
              <Save size={18} /> <span>포스트 저장하기</span>
            </button>
            <button onClick={() => setEditingPost(null)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-10 py-4 rounded-2xl font-bold transition-colors">취소</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map(post => (
            <div key={post.id} className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all shadow-xl">
              <div className="flex items-center space-x-6">
                <img src={post.imageUrl} className="w-16 h-16 rounded-2xl object-cover bg-zinc-800" />
                <div>
                  <h4 className="font-bold text-lg text-white">{post.title}</h4>
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{post.date} • {post.author}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setEditingPost(post)} className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors">
                  <Edit size={20} />
                </button>
                <button onClick={() => { if(confirm('삭제하시겠습니까?')) updatePosts(posts.filter(p => p.id !== post.id)) }} className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
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
          onClick={() => setEditingProduct({ name: '', brand: '', price: '', category: 'iPhone', imageUrl: '' })}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-600/20"
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
              <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">가격 문구</label>
              <input type="text" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-purple-500" />
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
              <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-sm font-bold">이미지 업로드</button>
            </div>
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
                <h4 className="font-bold text-lg text-white">{product.name}</h4>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setEditingProduct(product)} className="p-3 text-zinc-400 hover:text-white rounded-lg">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-3 text-zinc-400 hover:text-red-500 rounded-lg">
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
      <h2 className="text-3xl font-bold">사이트 설정</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="space-y-4">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">사이트명</label>
          <input type="text" value={localSettings.siteName} onChange={e => setLocalSettings({...localSettings, siteName: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500" />
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">연락처</label>
          <input type="text" value={localSettings.contactNumber} onChange={e => setLocalSettings({...localSettings, contactNumber: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500" />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">인스타그램 ID</label>
          <input type="text" value={localSettings.instagram} onChange={e => setLocalSettings({...localSettings, instagram: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500" />
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">카카오톡 ID</label>
          <input type="text" value={localSettings.kakaoId} onChange={e => setLocalSettings({...localSettings, kakaoId: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500" />
        </div>
      </div>
      <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-purple-600/20 transition-all flex items-center space-x-2">
        <Save size={20} />
        <span>전체 설정 저장</span>
      </button>
      {showToast && (
        <div className="fixed bottom-10 right-10 flex items-center space-x-3 bg-green-500 text-white px-8 py-5 rounded-3xl shadow-3xl animate-bounce z-50">
          <CheckCircle2 size={24} />
          <span className="font-black text-sm uppercase tracking-tighter">System settings synchronized.</span>
        </div>
      )}
    </div>
  );
};

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-purple-500/30">
      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 240% 240%;
          animation: gradient-xy 4s ease infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
      <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col fixed h-full z-20">
        <div className="mb-12">
          <div className="flex items-center space-x-3 text-purple-500 mb-2">
            <Sparkles size={28} className="animate-pulse" />
            <div className="text-2xl font-black tracking-tighter italic">AI STUDIO</div>
          </div>
          <div className="px-1">
             <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-1">Management Portal</div>
             <div className="h-0.5 w-8 bg-purple-600"></div>
          </div>
        </div>
        
        <nav className="flex-grow space-y-2">
          <SidebarLink to="" icon={LayoutDashboard} label="홈" />
          <SidebarLink to="/products" icon={Package} label="제품 관리" />
          <SidebarLink to="/posts" icon={Newspaper} label="소식 관리" />
          <SidebarLink to="/franchise" icon={Handshake} label="창업 관리" />
          <SidebarLink to="/settings" icon={SettingsIcon} label="사이트 설정" />
        </nav>

        <div className="pt-6 border-t border-zinc-900">
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-white transition-all hover:bg-zinc-900 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm tracking-tight">메인 웹사이트 이동</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow ml-72 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none select-none">
          <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304603353591041.svg" alt="Google AI" className="w-48 animate-pulse rotate-12" />
        </div>
        <div className="relative z-10">
           <Routes>
             <Route path="/" element={<DashboardHome />} />
             <Route path="/products" element={<ProductManagement />} />
             <Route path="/posts" element={<PostManagement />} />
             <Route path="/franchise" element={<FranchiseManagement />} />
             <Route path="/settings" element={<SettingsManagement />} />
           </Routes>
        </div>
      </main>
    </div>
  );
}
