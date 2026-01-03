
import React, { useState, useEffect } from 'react';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Send,
  Award,
  Mail,
  Zap,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  BarChart3
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

const ProcessStep = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm group hover:bg-zinc-800/60 transition-all">
    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/20">
      {number}
    </div>
    <h4 className="text-xl font-bold text-white mb-3 mt-2">{title}</h4>
    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default function Franchise() {
  const { settings, franchiseSettings, inquiries, updateInquiries } = useGlobalState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 인공적인 지연으로 '처리 중' 느낌 부여
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const newInquiry: FranchiseInquiry = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        date: today
      };
      
      updateInquiries([newInquiry, ...inquiries]);
      
      const recipient = 'rhehfrh@hanmail.net';
      const subject = encodeURIComponent(`[창업문의] ${formData.name}님 상담 신청 내역 (${settings.siteName})`);
      const body = encodeURIComponent(
        `안녕하세요, ${settings.siteName} 창업 지원팀입니다.\n\n` +
        `신규 창업 상담 신청 내역을 전달해 드립니다.\n\n` +
        `---------- 신청자 정보 ----------\n` +
        `● 성함: ${formData.name}\n` +
        `● 연락처: ${formData.phone}\n` +
        `● 희망지역: ${formData.region}\n\n` +
        `---------- 문의 상세내용 ----------\n` +
        `${formData.message || '별도 내용 없음'}\n\n` +
        `----------------------------------\n` +
        `접수 일시: ${today}\n` +
        `본 메일은 홈페이지 문의 시스템을 통해 자동 생성되었습니다.`
      );
      
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', region: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 1500);
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-purple-500/30">
      {/* Premium Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-purple-400 text-xs font-black tracking-widest uppercase mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={14} className="fill-current" />
            <span>Success Partnership With {settings.siteName}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            당신의 열정이<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600">확실한 수익</span>이 되도록
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mx-auto font-light animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            {franchiseSettings.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Advantage Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {franchiseSettings.benefits.map((item, idx) => {
            const Icon = IconMap[item.iconName] || TrendingUp;
            return (
              <div key={item.id} className={`p-12 rounded-[3rem] bg-zinc-900/30 border border-white/5 hover:border-purple-600/40 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-${idx * 200}`}>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon size={160} />
                </div>
                <div className="w-20 h-20 rounded-[2rem] bg-purple-600/10 flex items-center justify-center mb-10 group-hover:bg-purple-600 transition-all transform group-hover:rotate-6 shadow-xl">
                  <Icon size={40} className="text-purple-400 group-hover:text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{item.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-zinc-950/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">오픈까지의 완벽한 로드맵</h2>
              <p className="text-zinc-500 text-lg">막막한 시작, 바를정 핸드폰의 전문가 그룹이 모든 과정을 함께합니다.</p>
            </div>
            <div className="mt-8 md:mt-0">
               <div className="flex items-center space-x-2 text-purple-400 font-bold">
                 <span>창업 문의 rhehfrh@hanmail.net</span>
                 <ArrowRight size={20} />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProcessStep number="01" title="창업 상담 접수" desc="온라인 폼이나 전화를 통해 문의 주시면 전담 매니저가 24시간 내 배정됩니다." />
            <ProcessStep number="02" title="상권 분석 및 매칭" desc="데이터 기반으로 유동인구와 타겟층을 분석하여 최적의 입지를 제안합니다." />
            <ProcessStep number="03" title="가맹 계약 체결" desc="투명하고 합리적인 조건으로 계약을 진행하며 본사의 지원 사항을 확약합니다." />
            <ProcessStep number="04" title="실전 교육 및 오픈" desc="운영 노하우부터 전산 교육까지 마스터한 후 화려하게 오픈을 진행합니다." />
          </div>
        </div>
      </section>

      {/* High-Fidelity Inquiry Form */}
      <section id="inquiry-form" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="relative p-1 rounded-[4rem] overflow-hidden bg-gradient-to-br from-white/10 via-purple-500/20 to-white/10 shadow-[0_0_80px_rgba(139,92,246,0.1)]">
          <div className="bg-zinc-900/90 backdrop-blur-3xl rounded-[calc(4rem-4px)] p-8 md:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center space-x-2 text-purple-400 font-bold mb-6 text-sm uppercase tracking-widest">
                  <Mail size={16} />
                  <span>Get in Touch</span>
                </div>
                <h2 className="text-5xl font-black text-white mb-10 leading-tight tracking-tighter">
                  지금, 성공의<br />
                  <span className="text-purple-500 italic">터닝포인트</span>를<br />
                  만나보세요.
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg">
                      <BarChart3 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">정확한 수익 시뮬레이션</h4>
                      <p className="text-zinc-500 text-sm">상담 시 예상 매출과 수익 구조를 투명하게 공개합니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">철저한 지역 독점권 보장</h4>
                      <p className="text-zinc-500 text-sm">가맹점 간의 불필요한 경쟁을 막기 위해 확실한 영업권을 보장합니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">최신 기종 수급 지원</h4>
                      <p className="text-zinc-500 text-sm">인기 기종과 신제품 출시 시 가장 우선적으로 물량을 공급합니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-purple-600/5 rounded-[3rem] border border-purple-500/20 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white mb-8 shadow-2xl shadow-purple-600/40 animate-bounce">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">상담 신청이 완료되었습니다!</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      요청하신 내용은 <b>rhehfrh@hanmail.net</b>으로 안전하게 전달되었습니다.<br />
                      이메일 앱에서 '보내기'를 완료해주시면 담당자가 빠르게 연락드리겠습니다.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="mt-10 text-purple-400 font-bold hover:underline">새 문의 작성하기</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] px-1">신청자 성함</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 focus:bg-zinc-800 transition-all text-lg shadow-inner" 
                          placeholder="홍길동" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] px-1">연락처</label>
                        <input 
                          required 
                          type="tel" 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 focus:bg-zinc-800 transition-all text-lg shadow-inner" 
                          placeholder="010-1234-5678" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] px-1">희망 창업 지역</label>
                      <input 
                        type="text" 
                        value={formData.region}
                        onChange={e => setFormData({...formData, region: e.target.value})}
                        className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 focus:bg-zinc-800 transition-all text-lg shadow-inner" 
                        placeholder="예: 서울 강남구 또는 경기도 수원시" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] px-1">문의 및 요청사항 (선택)</label>
                      <textarea 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full h-40 bg-zinc-800/50 border border-white/5 rounded-3xl p-6 text-white focus:outline-none focus:border-purple-500 focus:bg-zinc-800 transition-all text-lg shadow-inner resize-none leading-relaxed" 
                        placeholder="궁금하신 사항이나 추가 요청 사항을 자유롭게 적어주세요."
                      ></textarea>
                    </div>
                    
                    <button 
                      disabled={isLoading}
                      type="submit" 
                      className="w-full py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-black text-xl rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-[0_20px_40px_rgba(139,92,246,0.25)] transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>처리 중...</span>
                        </>
                      ) : (
                        <>
                          <span>이메일로 상담 신청하기</span>
                          <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <div className="pt-4 flex items-center justify-center space-x-3 text-zinc-600">
                      <ShieldCheck size={14} />
                      <p className="text-[11px] font-bold uppercase tracking-widest">
                        귀하의 정보는 rhehfrh@hanmail.net 으로만 안전하게 전달됩니다.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer CTA */}
      <section className="py-24 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-4">
           <p className="text-zinc-500 mb-6 font-bold uppercase tracking-[0.3em] text-sm">Ready to Start?</p>
           <h3 className="text-3xl md:text-4xl font-black text-white mb-10">정직한 가치로 증명하는 압도적 성장, <br className="hidden md:block"/>바를정 핸드폰이 함께합니다.</h3>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href={`tel:${settings.contactNumber}`} className="flex items-center space-x-2 text-white font-bold hover:text-purple-400 transition-colors">
                 <Smartphone size={20} />
                 <span>직통 전화: {settings.contactNumber}</span>
              </a>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 hidden sm:block"></div>
              <div className="flex items-center space-x-2 text-zinc-400">
                 <Mail size={18} />
                 <span>rhehfrh@hanmail.net</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
