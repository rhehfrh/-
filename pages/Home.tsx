
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Zap,
  Star
} from 'lucide-react';
import { useGlobalState } from '../App';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 rounded-2xl bg-zinc-900/50 border border-purple-900/20 hover:border-purple-600/50 transition-all group">
    <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
      <Icon size={28} className="text-purple-400 group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
  </div>
);

export default function Home() {
  const { products, settings, posts } = useGlobalState();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);
  const latestPost = posts[0];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-20 bg-purple-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8 animate-bounce">
            <Zap size={14} />
            <span>프리미엄 혜택 상담 상시 대기중</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[1.1]">
            {settings.heroTitle.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? "block mb-2" : "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"}>
                {word} {i === 0 && <br className="hidden md:block"/>}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 mb-12 font-light max-w-2xl mx-auto">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="w-full sm:w-auto px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25">
              최신 기종 보러가기
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-full font-bold text-lg transition-all">
              1:1 컨설팅 신청
            </button>
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

      {/* Value Prop */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">왜 바를정 인가요?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">우리는 단순한 판매를 넘어, 고객의 디지털 삶을 업그레이드합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Smartphone} 
              title="최신 기종 보유" 
              description="출시와 동시에 가장 빠르게 최신 기종을 확보하여 공급합니다."
            />
            <FeatureCard 
              icon={TrendingUp} 
              title="최저가 약속" 
              description="복잡한 결합 할인을 제외하더라도 정직한 가격으로 승부합니다."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="철저한 사후관리" 
              description="기기 불량부터 데이터 이전까지 완벽하게 책임지고 도와드립니다."
            />
            <FeatureCard 
              icon={Award} 
              title="프리미엄 상담" 
              description="통신 경력 10년 이상의 전문가가 라이프스타일에 맞춘 요금제를 제안합니다."
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-8 leading-tight">
                이미 수많은 분들이<br />
                <span className="text-purple-500">바를정</span>의 진심을 경험했습니다.
              </h2>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex space-x-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1 text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                      <p className="text-zinc-300 text-sm mb-2 italic">
                        "처음에는 반신반의했는데 상담 받고 바로 믿음이 갔어요. 강매 없이 제 상황에 딱 맞는 것만 추천해주시더라고요."
                      </p>
                      <span className="text-zinc-500 text-xs">- {i === 1 ? '김*준' : i === 2 ? '이*희' : '박*민'} 고객님</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-purple-900/30">
                <img src="https://picsum.photos/seed/shop/800/1000" alt="Store Front" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-12">
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 w-full">
                    <h4 className="text-2xl font-bold text-white mb-2">방문 상담 예약</h4>
                    <p className="text-zinc-300 text-sm mb-6">기다림 없이 최고의 서비스를 받아보세요.</p>
                    <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-colors">
                      지금 바로 전화하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
