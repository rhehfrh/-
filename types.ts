
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

// Added FranchiseInquiry interface for franchise consultation requests
export interface FranchiseInquiry {
  id: string;
  name: string;
  phone: string;
  region: string;
  message: string;
  date: string;
}

// Added FranchiseBenefit interface for the benefit items on the franchise page
export interface FranchiseBenefit {
  id: string;
  iconName: 'TrendingUp' | 'Handshake' | 'MapPin' | 'Award' | 'Users';
  title: string;
  description: string;
}

// Added FranchiseSettings interface for content specific to the franchise section
export interface FranchiseSettings {
  heroSubtitle: string;
  benefits: FranchiseBenefit[];
}

export interface GlobalState {
  products: Product[];
  posts: Post[];
  settings: SiteSettings;
  // Added franchise-related state properties to resolve missing property errors
  franchiseSettings: FranchiseSettings;
  inquiries: FranchiseInquiry[];
  updateProducts: (products: Product[]) => void;
  updatePosts: (posts: Post[]) => void;
  updateSettings: (settings: SiteSettings) => void;
  // Added franchise-related update methods to resolve missing property errors
  updateFranchiseSettings: (settings: FranchiseSettings) => void;
  updateInquiries: (inquiries: FranchiseInquiry[]) => void;
}
