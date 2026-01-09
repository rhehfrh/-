
import { Product, Post, SiteSettings, FranchiseSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: '1,900,000원~',
    description: '티타늄 디자인, 강력한 A17 Pro 칩셋 탑재.',
    imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    category: 'iPhone'
  },
  {
    id: '2',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: '1,690,000원~',
    description: 'Galaxy AI와 함께하는 새로운 모바일 경험.',
    imageUrl: 'https://images.unsplash.com/photo-1707148560341-2a106869009a?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    category: 'Galaxy'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '바를정 핸드폰 그랜드 오픈 이벤트',
    excerpt: '정직한 가격으로 승부하는 바를정 핸드폰이 오픈했습니다.',
    content: '신규 고객님들을 위한 특별 사은품과 통신비 컨설팅을 무료로 진행하고 있습니다. 지금 바로 방문해주세요.',
    date: '2024-05-20',
    author: '관리자',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: '바를정 핸드폰',
  contactNumber: '010-1234-5678',
  address: '서울특별시 강남구 테헤란로 123',
  instagram: 'bareuljeong_mobile',
  kakaoId: 'bareuljeong',
  heroTitle: '정직함이 곧 가치입니다',
  heroSubtitle: '프리미엄 모바일 라이프의 시작, 바를정 핸드폰',
  heroImageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2000',
  heroBadgeUrl: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304603353591041.svg',
  features: [
    {
      id: '1',
      iconName: 'Smartphone',
      title: '최신 기종 보유',
      description: '출시와 동시에 가장 빠르게 최신 기종을 확보하여 공급합니다.'
    },
    {
      id: '2',
      iconName: 'TrendingUp',
      title: '최저가 약속',
      description: '복잡한 결합 할인을 제외하더라도 정직한 가격으로 승부합니다.'
    },
    {
      id: '3',
      iconName: 'ShieldCheck',
      title: '철저한 사후관리',
      description: '기기 불량부터 데이터 이전까지 완벽하게 책임지고 도와드립니다.'
    },
    {
      id: '4',
      iconName: 'Award',
      title: '프리미엄 상담',
      description: '통신 경력 10년 이상의 전문가가 라이프스타일에 맞춘 요금제를 제안합니다.'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: '이정우 고객님',
      content: '설명이 너무 친절하시고, 제게 꼭 필요한 요금제만 골라주셔서 정말 만족스럽습니다.',
      rating: 5
    },
    {
      id: '2',
      name: '김서연 고객님',
      content: '다른 곳보다 지원금도 확실하고 데이터 이동도 깔끔하게 해주셔서 좋았어요.',
      rating: 5
    },
    {
      id: '3',
      name: '박진호 고객님',
      content: '매장이 깔끔하고 사장님이 정직하게 상담해주시는 게 느껴져서 믿음이 갑니다.',
      rating: 4
    }
  ]
};

export const INITIAL_FRANCHISE_SETTINGS: FranchiseSettings = {
  heroSubtitle: '바를정 핸드폰은 단순한 대리점을 넘어, 지역 No.1 모바일 리테일러로 성장할 파트너를 찾습니다. 체계적인 교육과 전폭적인 지원으로 무경험자도 성공할 수 있는 시스템을 제공합니다.',
  contactNumber: '010-8144-1109',
  benefits: [
    {
      id: '1',
      iconName: 'TrendingUp',
      title: '압도적 수익 구조',
      description: '업계 최고 수준의 마진율과 투명한 정산 시스템으로 가맹점의 실질적 수익을 최우선으로 합니다.'
    },
    {
      id: '2',
      iconName: 'Handshake',
      title: '본사 직접 지원',
      description: '개업 준비부터 운영 노하우 전수까지, 본사 전담 매니저가 상주하며 밀착 케어 서비스를 제공합니다.'
    },
    {
      id: '3',
      iconName: 'MapPin',
      title: '지역 상권 보호',
      description: '반경 내 추가 출점을 엄격히 제한하여 가맹점의 영업권을 확실하게 보장하고 상권을 분석해 드립니다.'
    }
  ]
};
