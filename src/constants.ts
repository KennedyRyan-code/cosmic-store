import { Product, User, BlogPost } from './types';

export const CATEGORIES = [
  'All Categories',
  'Smartphones',
  'Laptops',
  'Headphones',
  'Cameras',
  'Tablets',
  'Accessories'
];

export const BRANDS = [
  { name: 'Jared Rouse', logo: 'https://picsum.photos/seed/brand1/120/60' },
  { name: 'Cocoon Nil', logo: 'https://picsum.photos/seed/brand2/120/60' },
  { name: 'Projets Uay', logo: 'https://picsum.photos/seed/brand3/120/60' },
  { name: 'Neueorder', logo: 'https://picsum.photos/seed/brand4/120/60' },
  { name: 'Kitchen Sync', logo: 'https://picsum.photos/seed/brand5/120/60' },
  { name: 'Synergy Solutions', logo: 'https://picsum.photos/seed/brand6/120/60' },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    user: 'John Doe',
    role: 'Web Designer',
    comment: 'Vivamus gravida est ac dictum pretium. Suspendisse potenti. Nullam venenatis dolor tortor. Fusce ac vulputate ligula. Aenean sem mi, placerat ut enim ultrices.',
    avatar: 'https://i.pravatar.cc/150?u=t1',
    rating: 5
  },
  {
    id: 't2',
    user: 'Jane Smith',
    role: 'Tech Lead',
    comment: 'Curabitur imperdiet, diam non finibus placerat, justo enim pellentesque ex, eu pellentesque mi purus ac nisi. Integer sollicitudin congue purus.',
    avatar: 'https://i.pravatar.cc/150?u=t2',
    rating: 4
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'BQ618 Bluetooth Wireless Headphone - Black',
    category: 'Headphones',
    price: 309.99,
    originalPrice: 400.00,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    rating: 4,
    reviews: 12,
    description: 'High-quality wireless sound with adaptive noise cancellation.',
    tags: ['wireless', 'audio', 'premium'],
    stock: 15,
    isNew: false
  },
  {
    id: '2',
    name: 'Samsung Galaxy J7 Prime - 5.5" - 32GB - Single SIM',
    category: 'Smartphones',
    price: 249.99,
    originalPrice: 299.99,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 156,
    description: 'Reliable smartphone with a brilliant display.',
    tags: ['mobile', 'samsung'],
    stock: 20,
    isNew: true
  },
  {
    id: '3',
    name: 'Lenovo IdeaPad 110-15ISK Laptop - 15.6"',
    category: 'Laptops',
    price: 500.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
    rating: 4,
    reviews: 48,
    description: 'Perfect for everyday computing tasks.',
    tags: ['lenovo', 'laptop', 'office'],
    stock: 10,
    isNew: true
  },
  {
    id: '4',
    name: 'Xiaomi Redmi 4X - 5" - 16GB - 2GB RAM',
    category: 'Smartphones',
    price: 99.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 83,
    description: 'Compact and powerful smartphone for value seekers.',
    tags: ['xiaomi', 'redmi'],
    stock: 35,
    isNew: false
  },
  {
    id: '5',
    name: 'Infinix (X572) Note 4 - 5.7" - 13MP Camera',
    category: 'Smartphones',
    price: 309.99,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop',
    rating: 4,
    reviews: 12,
    description: 'Large screen and great camera for the price.',
    tags: ['infinix', 'smartphone'],
    stock: 5,
    isNew: true
  },
  {
    id: '6',
    name: 'Bluedio F800 ANC Noise Cancelling Bluetooth',
    category: 'Headphones',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 156,
    description: 'Immersive audio with active noise cancellation.',
    tags: ['bluedio', 'audio'],
    stock: 12,
    isNew: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'What Can You Do To Save Your Technology From Destruction By Social Media?',
    excerpt: 'Explore the impact of social media habits on your hardware longevity and mental focus.',
    content: 'Social media can be a double-edged sword...',
    author: 'Elena Vance',
    date: 'March 24, 2024',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    category: 'Tech Safety',
    readTime: '5 min read'
  },
  {
    id: 'b2',
    title: '5 Surefire Ways Technology Will Drive Your Business Into The Ground',
    excerpt: 'A critical look at over-automation and technological dependency in modern businesses.',
    content: 'While automation increases efficiency...',
    author: 'Mark Sterling',
    date: 'March 20, 2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    category: 'Business',
    readTime: '8 min read'
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?u=u1',
  loyaltyPoints: 1250,
  location: 'New York, USA'
};
