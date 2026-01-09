
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Zap,
  Star,
  Handshake,
  MapPin,
  Smile,
  Heart,
  Check
} from 'lucide-react';
import { useGlobalState } from '../App';

const IconMap: Record<string, any> = {
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Award,
  Zap,
  Smile,
  Heart,
  Check
};

const FeatureCard = ({ iconName, title, description }: { iconName: string, title: string, description: string }) => {
  const Icon = IconMap[iconName] || Zap;
  return (
    <div className="p-8 rounded-2xl bg-zinc-900/50 border border-purple-900/20 hover:border-purple-600/50 transition-all group">
      <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
        <Icon size={28} className="text-purple-400 group-hover:text-white" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

export default function Home() {
  const { products, settings } = useGlobalState();
  const featuredProducts = (products || []).filter(p => p.isFeatured).slice(0, 3);
  
  const heroTitle = settings?.heroTitle || "정직함이 곧 가치입니다";
  const heroSubtitle = settings?.heroSubtitle || "프리미엄 모바일 라이프의 시작, 바를정 핸드폰";
  const features = settings?.features || [];
  const testimonials = settings?.testimonials || [];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-20 overflow-hidden bg-black">
        {/* 상단 왼쪽 배지 이미지 (관리자 설정) */}
        {settings?.heroBadgeUrl && (
          <div className="absolute top-28 left-8 z-30 animate-pulse">
            <img 
              src={settings.heroBadgeUrl} 
              alt="Badge" 
              className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
          </div>
        )}

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={settings?.heroImageUrl || 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2000'} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
          <div 
            className="absolute inset-0 opacity-50"
            style={{ background: 'radial-gradient(circle at center, transparent 0%, black 100%)' }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-8">
            <Zap size={14} className="fill-current" />
            <span>프리미엄 혜택 상담 상시 대기중</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[1.1]">
            {heroTitle.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? "block mb-2" : "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"}>
                {word} {i === 0 && <br className="hidden md:block"/>}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="w-full sm:w-auto px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-purple-600/40">
              최신 기종 보러가기
            </Link>
            <Link to="/franchise" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-full font-bold text-lg transition-all transform hover:scale-105">
              1:1 컨설팅 신청
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4 block">New Arrivals</span>
              <h2 className="text-4xl font-bold text-white">이번 달 추천 기종</h2>
            </div>
            <Link to="/products" className="text-zinc-400 hover:text-purple-400 flex items-center group">
              전체 보기 <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link to="/products" key={product.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-3xl mb-6 bg-zinc-900">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-white font-bold text-lg">상세 스펙 확인</span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{product.name}</h3>
                    <span className="text-purple-500 font-bold">{product.price}</span>
                  </div>
                  <p className="text-zinc-500 text-sm">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Prop (Features) */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">왜 바를정 인가요?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">우리는 단순한 판매를 넘어, 고객의 디지털 삶을 업그레이드합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id}
                iconName={feature.iconName} 
                title={feature.title} 
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Franchise CTA Section */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-zinc-900 to-black p-12 md:p-20 rounded-[3rem] border border-purple-900/30 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center space-x-2 text-purple-400 font-bold mb-6">
                <Handshake size={24} />
                <span className="uppercase tracking-[0.2em] text-sm">Franchise Partnership</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                바를정 핸드폰과 함께할<br />
                <span className="text-purple-500">성공 파트너</span>를 모십니다.
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
                투명한 정산, 압도적 물량 지원, 상권 보호까지.<br />
                휴대폰 매장 창업의 가장 정직한 길을 제안합니다.
              </p>
              <Link to="/franchise" className="inline-flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:translate-x-2">
                <span>창업 안내 바로가기</span>
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className="w-full max-w-sm aspect-square bg-zinc-800/50 rounded-[3rem] border border-white/5 flex items-center justify-center p-12 relative">
               <div className="absolute inset-0 bg-purple-600/5 animate-pulse rounded-[3rem]"></div>
               <Handshake size={160} className="text-purple-500/20" />
               <div className="absolute -top-4 -right-4 bg-purple-600 text-white p-6 rounded-3xl font-black text-center shadow-xl shadow-purple-600/20">
                 <div className="text-xs uppercase opacity-80 mb-1">Success Rate</div>
                 <div className="text-3xl">98.5%</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section (Testimonials) */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black text-white mb-8">
                이미 수많은 분들이 <span className="text-purple-500">바를정</span>을 선택했습니다.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
                        <div className="flex justify-center mb-4 text-yellow-500">
                            {[...Array(5)].map((_, j) => (
                              <Star 
                                key={j} 
                                size={16} 
                                fill={j < testimonial.rating ? "currentColor" : "none"} 
                                className={j < testimonial.rating ? "" : "text-zinc-700"}
                              />
                            ))}
                        </div>
                        <p className="text-zinc-400 italic mb-4">"{testimonial.content}"</p>
                        <span className="text-zinc-500 text-sm">- {testimonial.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
