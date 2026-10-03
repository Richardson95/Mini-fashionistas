export type Category = 'Fashion' | 'Shoes' | 'Toys' | 'Books' | 'Arts' | 'Accessories';
export type AgeGroup = '4-6' | '7-9' | '10-12';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: Category;
  ages: AgeGroup[];
  image: string;
  tint: string;
  rating: number;
  reviews: number;
  badge?: 'New' | 'Hot' | 'Sale' | 'Best';
  colors: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
}
