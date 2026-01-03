
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
  heroSubtitle: '프리미엄 모바일 라이프의 시작, 바를정 핸드폰'
};

export const INITIAL_FRANCHISE_SETTINGS: FranchiseSettings = {
  heroSubtitle: '바를정 핸드폰은 단순한 대리점을 넘어, 지역 No.1 모바일 리테일러로 성장할 파트너를 찾습니다. 체계적인 교육과 전폭적인 지원으로 무경험자도 성공할 수 있는 시스템을 제공합니다.',
  contactNumber: '010-8144-1109', // Updated to the requested head office number
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
