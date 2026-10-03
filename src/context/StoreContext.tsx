import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products } from '../data/products';
import type { CartItem, Product } from '../types';

interface Toast {
  id: number;
  text: string;
}

interface StoreValue {
  cart: CartItem[];
  wishlist: number[];
  toasts: Toast[];
  cartOpen: boolean;
  quickView: Product | null;
  cartCount: number;
  subtotal: number;
  addToCart: (p: Product, qty?: number) => void;
  updateQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  toggleWish: (p: Product) => void;
  setCartOpen: (open: boolean) => void;
  setQuickView: (p: Product | null) => void;
  notify: (text: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  // Re-link saved items to current product data so stale fields never render
  const [cart, setCart] = useState<CartItem[]>(() =>
    load<CartItem[]>('mf-cart', []).flatMap((i) => {
      const product = products.find((p) => p.id === i.product?.id);
      return product && i.qty > 0 ? [{ product, qty: i.qty }] : [];
    }),
  );
  const [wishlist, setWishlist] = useState<number[]>(() => load('mf-wish', []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  useEffect(() => save('mf-cart', cart), [cart]);
  useEffect(() => save('mf-wish', wishlist), [wishlist]);

  const notify = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(
    (p: Product, qty = 1) => {
      setCart((c) => {
        const found = c.find((i) => i.product.id === p.id);
        if (found) return c.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + qty } : i));
        return [...c, { product: p, qty }];
      });
      notify(`${p.name} added to bag`);
    },
    [notify],
  );

  const updateQty = useCallback((id: number, qty: number) => {
    setCart((c) =>
      qty <= 0 ? c.filter((i) => i.product.id !== id) : c.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((c) => c.filter((i) => i.product.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback(
    (p: Product) => {
      const has = wishlist.includes(p.id);
      setWishlist((w) => (has ? w.filter((x) => x !== p.id) : [...w, p.id]));
      notify(has ? 'Removed from wishlist' : `${p.name} saved to wishlist`);
    },
    [wishlist, notify],
  );

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      wishlist,
      toasts,
      cartOpen,
      quickView,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      subtotal: cart.reduce((n, i) => n + i.qty * i.product.price, 0),
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWish,
      setCartOpen,
      setQuickView,
      notify,
    }),
    [cart, wishlist, toasts, cartOpen, quickView, addToCart, updateQty, removeFromCart, clearCart, toggleWish, notify],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
