
import React, { useState } from 'react';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Send,
  Award,
  Mail
} from 'lucide-react';
import { useGlobalState } from '../App';
import { FranchiseInquiry } from '../types';

const IconMap = {
  TrendingUp: TrendingUp,
  Handshake: Handshake,
  MapPin: MapPin,
  Award: Award,
  Users: Users
};

export default function Franchise() {
  const { settings, franchiseSettings, inquiries, updateInquiries } = useGlobalState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    const newInquiry: FranchiseInquiry = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      date: today
    };
    
    // 1. 관리자 대시보드 저장을 위해 상태 업데이트
    updateInquiries([newInquiry, ...inquiries]);
    
    // 2. 이메일 전송 로직 (mailto)
    const subject = encodeURIComponent(`[${settings.siteName}] 창업 상담 신청 내역 - ${formData.name}님`);
    const body = encodeURIComponent(
      `바를정 핸드폰 창업 상담 신청이 접수되었습니다.\n\n` +
      `● 성함: ${formData.name}\n` +
      `● 연락처: ${formData.phone}\n` +
      `● 희망지역: ${formData.region}\n` +
      `● 문의내용:\n${formData.message}\n\n` +
      `--------------------------------\n` +
      `신청일시: ${today}`
    );
    
    // 이메일 주소로 메일 발송 창 열기
    window.location.href = `mailto:${franchiseSettings.contactEmail}?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    setFormData({ name: '', phone: '', region: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 mb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-6">
            FRANCHISE PARTNERSHIP
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter whitespace-pre-wrap">
            {franchiseSettings.heroTitle.includes(settings.siteName) 
              ? franchiseSettings.heroTitle 
              : franchiseSettings.heroTitle.replace('함께하세요', `${settings.siteName}와 함께하세요`)}
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap">
            {franchiseSettings.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {franchiseSettings.benefits.map((item) => {
            const Icon = IconMap[item.iconName] || TrendingUp;
            return (
              <div key={item.id} className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-purple-600/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-8 group-hover:bg-purple-600 transition-colors">
                  <Icon size={32} className="text-purple-400 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">성공의 시작,<br /><span className="text-purple-500">지금 문의하세요.</span></h2>
              <p className="text-zinc-400 mb-10 leading-relaxed">
                궁금하신 점을 남겨주시면 담당 전문가가 이메일과 전화로 상세한 상담을 도와드립니다.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-purple-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-medium">초기 자본금 맞춤형 컨설팅</span>
                </div>
                <div className="flex items-center space-x-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-purple-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-medium">본사 직영 인테리어 지원</span>
                </div>
                <div className="flex items-center space-x-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-purple-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-medium">실시간 재고 수급 시스템</span>
                </div>
              </div>
            </div>

            <div>
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-purple-600/10 rounded-3xl border border-purple-500/20 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-600/30">
                    <Mail size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">상담 신청이 접수되었습니다!</h3>
                  <p className="text-zinc-400">이메일 앱이 실행되지 않았다면 관리자에게 직접 연락 부탁드립니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">성함</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                        placeholder="홍길동" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">연락처</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                        placeholder="010-0000-0000" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">희망 지역</label>
                    <input 
                      type="text" 
                      value={formData.region}
                      onChange={e => setFormData({...formData, region: e.target.value})}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                      placeholder="예: 서울 강남구" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">문의 내용</label>
                    <textarea 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                      placeholder="상세한 문의 사항을 남겨주세요."
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/25">
                    <span>이메일로 상담 신청하기</span>
                    <Send size={18} />
                  </button>
                  <p className="text-[10px] text-zinc-600 text-center">신청하기 버튼을 누르면 이메일 작성 창이 활성화됩니다.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
