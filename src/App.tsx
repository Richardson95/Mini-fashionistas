import { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Perks from './components/Perks';
import ShopByAge from './components/ShopByAge';
import Categories from './components/Categories';
import Shop, { type Filters } from './components/Shop';
import Deal from './components/Deal';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickView from './components/QuickView';
import { BackToTop, Toasts } from './components/Extras';

const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  const [filters, setFilters] = useState<Filters>({ category: 'All', age: 'All' });
  const [search, setSearch] = useState('');

  return (
    <StoreProvider>
      <Header search={search} onSearch={setSearch} />
      <main>
        <Hero />
        <Perks />
        <ShopByAge
          onPick={(age) => {
            setFilters({ category: 'All', age });
            scrollToShop();
          }}
        />
        <Shop filters={filters} setFilters={setFilters} search={search} clearSearch={() => setSearch('')} />
        <Categories
          onPick={(category) => {
            setFilters({ category, age: 'All' });
            scrollToShop();
          }}
        />
        <Deal />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <QuickView />
      <Toasts />
      <BackToTop />
    </StoreProvider>
  );
}
