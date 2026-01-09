
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  stock: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  loyaltyPoints: number;
  location: string;
  preferences?: {
    newsletter: boolean;
    darkMode: boolean;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Advertisement {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  adType: 'hero' | 'side' | 'banner';
  price?: string;
  saleText?: string;
}

export type ViewState = 'home' | 'product-detail' | 'cart' | 'admin' | 'category' | 'profile' | 'blog' | 'products-list' | 'best-sellers' | 'contact' | 'checkout';

export interface AppState {
  view: ViewState;
  products: Product[];
  blogs: BlogPost[];
  categories: Category[];
  advertisements: Advertisement[];
  selectedProductId?: string;
  selectedCategory?: string;
  cart: CartItem[];
  user: User | null;
  searchQuery: string;
  recentlyViewed: string[];
  productReviews: Record<string, Review[]>;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'signup';
}
