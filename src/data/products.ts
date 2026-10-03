import type { AgeGroup, Category, Product } from '../types';

const img = (slug: string) => `/images/products/${slug}.jpg`;

export const products: Product[] = [
  { id: 1, name: 'Tulle Party Dress', price: 39, oldPrice: 55, category: 'Fashion', ages: ['4-6', '7-9'], image: img('tulle-party-dress'), tint: '#ffe0f0', rating: 4.9, reviews: 212, badge: 'Best', colors: ['#ff8cc6', '#b48cff', '#ffffff'] },
  { id: 2, name: 'Rainbow Sneakers', price: 45, category: 'Shoes', ages: ['7-9', '10-12'], image: img('glitter-sneakers'), tint: '#efe4ff', rating: 4.8, reviews: 154, badge: 'New', colors: ['#38bdf8', '#ff8cc6'] },
  { id: 3, name: 'Cuddly Unicorn', price: 24, category: 'Toys', ages: ['4-6'], image: img('cuddly-unicorn'), tint: '#fde2ff', rating: 5.0, reviews: 389, badge: 'Hot', colors: ['#ffffff', '#ffc2e2'] },
  { id: 4, name: 'Cosy Hoodie', price: 34, oldPrice: 42, category: 'Fashion', ages: ['4-6', '7-9'], image: img('star-hoodie'), tint: '#ece0ff', rating: 4.7, reviews: 98, badge: 'Sale', colors: ['#f43f5e', '#8b5cf6'] },
  { id: 5, name: 'Story Book Set', price: 15, category: 'Books', ages: ['4-6', '7-9'], image: img('magic-story-book'), tint: '#ffe8f3', rating: 4.9, reviews: 176, colors: ['#f9a8d4'] },
  { id: 6, name: 'Crayon Art Kit', price: 29, category: 'Arts', ages: ['4-6', '7-9', '10-12'], image: img('art-studio-kit'), tint: '#f3e6ff', rating: 4.8, reviews: 143, badge: 'New', colors: ['#facc15', '#c084fc'] },
  { id: 7, name: 'School Backpack', price: 32, category: 'Accessories', ages: ['7-9', '10-12'], image: img('sparkle-backpack'), tint: '#ffe0ef', rating: 4.6, reviews: 87, colors: ['#1f2937', '#a855f7'] },
  { id: 8, name: 'Princess Tiara', price: 12, oldPrice: 18, category: 'Accessories', ages: ['4-6', '7-9'], image: img('princess-tiara'), tint: '#f5e8ff', rating: 4.9, reviews: 301, badge: 'Sale', colors: ['#f9a8d4', '#fcd34d'] },
  { id: 9, name: 'Rainbow Tutu', price: 22, category: 'Fashion', ages: ['4-6', '7-9'], image: img('rainbow-tutu'), tint: '#ffe6f4', rating: 4.7, reviews: 65, colors: ['#f472b6', '#c4b5fd'] },
  { id: 10, name: 'Wooden Rocket', price: 49, category: 'Toys', ages: ['4-6', '7-9'], image: img('space-rocket-set'), tint: '#ebe2ff', rating: 4.8, reviews: 122, badge: 'Hot', colors: ['#ef4444'] },
  { id: 11, name: 'Satin Ballet Shoes', price: 28, category: 'Shoes', ages: ['4-6', '7-9', '10-12'], image: img('ballet-flats'), tint: '#ffe4f2', rating: 4.6, reviews: 74, colors: ['#fbcfe8', '#ddd6fe'] },
  { id: 12, name: 'Pink Journal Set', price: 14, category: 'Books', ages: ['10-12'], image: img('diary-with-lock'), tint: '#f1e4ff', rating: 4.9, reviews: 158, badge: 'Best', colors: ['#f9a8d4', '#a78bfa'] },
  { id: 13, name: 'Bead Jewelry Kit', price: 19, oldPrice: 25, category: 'Arts', ages: ['7-9', '10-12'], image: img('bead-jewelry-kit'), tint: '#ffe2f1', rating: 4.7, reviews: 109, badge: 'Sale', colors: ['#f0abfc'] },
  { id: 14, name: 'Cool Sunglasses', price: 16, category: 'Accessories', ages: ['4-6', '7-9', '10-12'], image: img('heart-sunglasses'), tint: '#eee2ff', rating: 4.5, reviews: 53, colors: ['#ffffff', '#ec4899'] },
  { id: 15, name: 'Dreamy Pajama Set', price: 27, category: 'Fashion', ages: ['4-6', '7-9', '10-12'], image: img('pajama-set'), tint: '#f6e6ff', rating: 4.8, reviews: 91, badge: 'New', colors: ['#ffffff', '#fbcfe8'] },
  { id: 16, name: 'Classic Teddy Bear', price: 21, category: 'Toys', ages: ['4-6'], image: img('teddy-bear'), tint: '#ffe9f4', rating: 4.9, reviews: 267, colors: ['#c08457'] },
];

export const categories: { name: Category; image: string }[] = [
  { name: 'Fashion', image: img('rainbow-tutu') },
  { name: 'Shoes', image: img('ballet-flats') },
  { name: 'Toys', image: img('cuddly-unicorn') },
  { name: 'Books', image: img('magic-story-book') },
  { name: 'Arts', image: img('art-studio-kit') },
  { name: 'Accessories', image: img('princess-tiara') },
];

export const ageGroups: { id: AgeGroup; label: string; tag: string; image: string }[] = [
  { id: '4-6', label: 'Little Stars', tag: 'Ages 4–6', image: '/images/ages/4-6.jpg' },
  { id: '7-9', label: 'Bright Sparks', tag: 'Ages 7–9', image: '/images/ages/7-9.jpg' },
  { id: '10-12', label: 'Trend Setters', tag: 'Ages 10–12', image: '/images/ages/10-12.jpg' },
];

export const testimonials = [
  { name: 'Amara O.', role: 'Mum of 2', text: 'Quality is amazing. My girls love every piece!' },
  { name: 'Daniel K.', role: 'Dad of 1', text: 'Fast delivery and beautiful packaging.' },
  { name: 'Sophie L.', role: 'Aunt', text: 'My go-to shop for birthday gifts.' },
];
