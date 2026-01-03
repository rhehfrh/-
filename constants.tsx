
import { Product, Post, SiteSettings } from './types';

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
