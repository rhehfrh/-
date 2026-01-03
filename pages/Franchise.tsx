
import React, { useState } from 'react';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Send
} from 'lucide-react';
import { useGlobalState } from '../App';

export default function Franchise() {
  const { settings } = useGlobalState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            정직한 성장의 동반자,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              {settings.siteName}
            </span>와 함께하세요.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            체계적인 시스템과 검증된 수익 모델로 안정적인 창업을 지원합니다.<br />
            허위 매물 없는 정직한 매장 운영의 가치를 실현합니다.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: "검증된 수익 구조",
              desc: "투명한 정산 시스템과 높은 인센티브 구조로 가맹점의 실질 수익을 극대화합니다."
            },
            {
              icon: Handshake,
              title: "체계적인 교육 지원",
              desc: "상담 기법부터 전산 업무까지, 초보 창업자도 전문가가 될 수 있도록 1:1 맞춤 교육을 제공합니다."
            },
            {
              icon: MapPin,
              title: "상권 분석 및 보호",
              desc: "데이터 기반 상권 분석으로 최적의 입지를 제안하며, 확실한 영업권 보호 정책을 고수합니다."
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-purple-600/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-8 group-hover:bg-purple-600 transition-colors">
                <item.icon size={32} className="text-purple-400 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">성공의 시작,<br /><span className="text-purple-500">지금 문의하세요.</span></h2>
              <p className="text-zinc-400 mb-10 leading-relaxed">
                궁금하신 점을 남겨주시면 담당 전문가가 24시간 이내에 상세한 상담을 도와드립니다.
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
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">상담 신청 완료!</h3>
                  <p className="text-zinc-400">담당자가 곧 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">성함</label>
                      <input required type="text" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="홍길동" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">연락처</label>
                      <input required type="tel" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="010-0000-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">희망 지역</label>
                    <input type="text" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="예: 서울 강남구" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">문의 내용</label>
                    <textarea className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="상세한 문의 사항을 남겨주세요."></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/25">
                    <span>상담 신청하기</span>
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
