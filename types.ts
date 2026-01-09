
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

export interface HomeFeature {
  id: string;
  iconName: 'Smartphone' | 'TrendingUp' | 'ShieldCheck' | 'Award' | 'Zap' | 'Smile' | 'Heart' | 'Check';
  title: string;
  description: string;
}

export interface HomeTestimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
}

export interface SiteSettings {
  siteName: string;
  contactNumber: string;
  address: string;
  instagram: string;
  kakaoId: string;
  heroTitle: string;
  heroSubtitle: string;
  features: HomeFeature[];
  testimonials: HomeTestimonial[];
}

export interface FranchiseInquiry {
  id: string;
  name: string;
  phone: string;
  region: string;
  message: string;
  date: string;
}

export interface FranchiseBenefit {
  id: string;
  iconName: 'TrendingUp' | 'Handshake' | 'MapPin' | 'Award' | 'Users';
  title: string;
  description: string;
}

export interface FranchiseSettings {
  heroSubtitle: string;
  contactNumber: string;
  benefits: FranchiseBenefit[];
}

export interface GlobalState {
  products: Product[];
  posts: Post[];
  settings: SiteSettings;
  franchiseSettings: FranchiseSettings;
  inquiries: FranchiseInquiry[];
  updateProducts: (products: Product[]) => void;
  updatePosts: (posts: Post[]) => void;
  updateSettings: (settings: SiteSettings) => void;
  updateFranchiseSettings: (settings: FranchiseSettings) => void;
  updateInquiries: (inquiries: FranchiseInquiry[]) => void;
}
