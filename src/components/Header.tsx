import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import Logo from './Logo';
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from './Icons';

const links = [
  { href: '#shop', label: 'Shop' },
  { href: '#ages', label: 'By Age' },
  { href: '#categories', label: 'Categories' },
  { href: '#deals', label: 'Deals' },
  { href: '#reviews', label: 'Reviews' },
];

interface Props {
  search: string;
  onSearch: (v: string) => void;
}

export default function Header({ search, onSearch }: Props) {
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="announce">
        <span>Free shipping over $50</span>
        <span className="announce__dot" />
        <span>Code <b>MINI15</b> = 15% off</span>
      </div>

      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <button className="icon-btn header__burger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </button>

          <Logo />

          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
              <SearchIcon />
            </button>
            <button className="icon-btn hide-sm" aria-label="Account">
              <UserIcon />
            </button>
            <a className="icon-btn hide-sm" href="#shop" aria-label="Wishlist">
              <HeartIcon />
              {wishlist.length > 0 && <span className="pill">{wishlist.length}</span>}
            </a>
            <button className="icon-btn icon-btn--bag" aria-label="Open bag" onClick={() => setCartOpen(true)}>
              <BagIcon />
              {cartCount > 0 && <span className="pill">{cartCount}</span>}
            </button>
          </div>
        </div>

        <form className={`searchbar ${searchOpen ? 'searchbar--open' : ''}`} onSubmit={submitSearch}>
          <div className="container searchbar__inner">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search dresses, toys, books…"
              aria-label="Search products"
            />
            <button type="submit" className="btn btn--sm">
              Search
            </button>
          </div>
        </form>
      </header>

      <div className={`drawer-overlay ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <Logo />
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__promo">
          <b>15% off</b>
          <span>first order · MINI15</span>
        </div>
      </aside>
    </>
  );
}
