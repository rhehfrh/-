
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
  contactNumber: string; // Added field for franchise-specific contact
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
