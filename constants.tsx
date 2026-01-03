
import React from 'react';
import { Product, Post, SiteSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: '1,900,000원~',
    description: '티타늄 디자인, 강력한 A17 Pro 칩셋 탑재.',
    imageUrl: 'https://picsum.photos/seed/iphone15/800/800',
    isFeatured: true,
    category: 'iPhone'
  },
  {
    id: '2',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: '1,690,000원~',
    description: 'Galaxy AI와 함께하는 새로운 모바일 경험.',
    imageUrl: 'https://picsum.photos/seed/s24/800/800',
    isFeatured: true,
    category: 'Galaxy'
  },
  {
    id: '3',
    name: 'Galaxy Z Fold5',
    brand: 'Samsung',
    price: '2,090,000원~',
    description: '대화면의 몰입감, 압도적인 멀티태스킹.',
    imageUrl: 'https://picsum.photos/seed/fold5/800/800',
    isFeatured: false,
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
    imageUrl: 'https://picsum.photos/seed/news1/1200/600'
  },
  {
    id: '2',
    title: '아이폰 16 사전예약 알림 서비스',
    excerpt: '가장 먼저 최신 기종을 만나보세요.',
    content: '곧 출시될 최신 기종 사전예약 리스트를 작성 중입니다. 상담 신청 시 우선 순위를 부여해드립니다.',
    date: '2024-05-25',
    author: '상담 실장',
    imageUrl: 'https://picsum.photos/seed/news2/1200/600'
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
