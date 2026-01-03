
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  category: 'iPhone' | 'Galaxy' | 'Others';
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
}

export interface SiteSettings {
  siteName: string;
  contactNumber: string;
  address: string;
  instagram: string;
  kakaoId: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface GlobalState {
  products: Product[];
  posts: Post[];
  settings: SiteSettings;
  updateProducts: (products: Product[]) => void;
  updatePosts: (posts: Post[]) => void;
  updateSettings: (settings: SiteSettings) => void;
}
