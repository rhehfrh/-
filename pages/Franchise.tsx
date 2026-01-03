
import React from 'react';
import { 
  TrendingUp, 
  Handshake, 
  MapPin, 
  Zap,
  ChevronRight,
  Smartphone,
  CheckCircle2,
  Phone,
  Award,
  Users
} from 'lucide-react';
import { useGlobalState } from '../App';

const IconMap: Record<string, any> = {
  TrendingUp,
  Handshake,
  MapPin,
  Award,
  Users,
  Smartphone
};

const AdvantageItem = ({ iconName, title, desc }: { iconName: string, title: string, desc: string }) => {
  const Icon = IconMap[iconName] || Zap;
  return (
    <div className="flex items-start space-x-6 p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/30 transition-all">
      <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 shrink-0">
        <Icon size={28} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default function Franchise() {
  const { franchiseSettings } = useGlobalState();

  return (
    <div className="bg-black min-h-screen text-white selection:bg-purple-500/30">
      <section className="relative pt-48 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-purple-400 text-xs font-black tracking-widest uppercase mb-8">
            <Zap size={14} className="fill-current" />
            <span>Premium Partnership</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            성공적인 창업,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">바를정</span>이 답입니다.
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            {franchiseSettings.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {franchiseSettings.benefits.map((benefit) => (
            <AdvantageItem 
              key={benefit.id}
              iconName={benefit.iconName}
              title={benefit.title}
              desc={benefit.description}
            />
          ))}
          {franchiseSettings.benefits.length < 4 && (
             <AdvantageItem 
                iconName="Smartphone" 
                title="안정적인 물량 공급" 
                desc="최신 플래그십 기종부터 인기 모델까지, 시장 수요에 맞춰 끊김 없는 물량 수급을 지원합니다."
              />
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-48">
        <div className="relative p-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-white/10 to-purple-500/20">
          <div className="bg-zinc-900/90 backdrop-blur-3xl rounded-[calc(3rem-4px)] p-12 text-center">
            <h3 className="text-3xl font-black mb-6">자세한 상담이 필요하신가요?</h3>
            <p className="text-zinc-500 mb-10 leading-relaxed">
              가맹 절차, 예상 매출, 상권 분석 등 궁금하신 모든 사항을<br />
              본사 전문 상담사가 직접 안내해 드립니다.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={`tel:${franchiseSettings.contactNumber}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl shadow-purple-600/20"
              >
                <Phone size={20} />
                <span>본사 창업 상담 연결</span>
              </a>
              <button className="w-full sm:w-auto flex items-center justify-center space-x-2 text-zinc-400 hover:text-white font-bold transition-colors">
                <span>카카오톡 채널 문의</span>
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2 text-xs text-zinc-600 font-bold">
                <CheckCircle2 size={14} className="text-purple-500" />
                <span>가맹비 한시적 면제</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-zinc-600 font-bold">
                <CheckCircle2 size={14} className="text-purple-500" />
                <span>인테리어 본사 지원</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-sm font-bold uppercase tracking-[0.3em]">
          Honesty is the Best Value
        </p>
      </footer>
    </div>
  );
}
