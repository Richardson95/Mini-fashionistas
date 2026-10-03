import { useMemo, useState } from 'react';
import { ageGroups, categories, products } from '../data/products';
import type { AgeGroup, Category } from '../types';
import ProductCard from './ProductCard';
import { SearchIcon } from './Icons';

export interface Filters {
  category: Category | 'All';
  age: AgeGroup | 'All';
}

type Sort = 'popular' | 'low' | 'high' | 'rating';

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
  search: string;
  clearSearch: () => void;
}

const PAGE = 8;

export default function Shop({ filters, setFilters, search, clearSearch }: Props) {
  const [sort, setSort] = useState<Sort>('popular');
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = products.filter(
      (p) =>
        (filters.category === 'All' || p.category === filters.category) &&
        (filters.age === 'All' || p.ages.includes(filters.age)) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)),
    );
    const sorters: Record<Sort, (a: (typeof out)[0], b: (typeof out)[0]) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...out].sort(sorters[sort]);
  }, [filters, search, sort]);

  const update = (f: Filters) => {
    setFilters(f);
    setShown(PAGE);
  };

  const hasFilters = filters.category !== 'All' || filters.age !== 'All' || search.trim() !== '';

  return (
    <section className="section" id="shop">
      <div className="container">
        <div className="section__head section__head--row">
          <div>
            <span className="eyebrow">Trending now</span>
            <h2>Shop Favourites</h2>
          </div>
          <label className="select">
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="low">Price: low → high</option>
              <option value="high">Price: high → low</option>
            </select>
          </label>
        </div>

        <div className="filters">
          <div className="chips" role="group" aria-label="Category">
            {(['All', ...categories.map((c) => c.name)] as const).map((c) => (
              <button
                key={c}
                className={`chip ${filters.category === c ? 'is-active' : ''}`}
                onClick={() => update({ ...filters, category: c })}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="chips chips--age" role="group" aria-label="Age">
            {(['All', ...ageGroups.map((a) => a.id)] as const).map((a) => (
              <button
                key={a}
                className={`chip chip--age ${filters.age === a ? 'is-active' : ''}`}
                onClick={() => update({ ...filters, age: a })}
              >
                {a === 'All' ? 'All ages' : `${a} yrs`}
              </button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <div className="results">
            <span>
              {list.length} result{list.length === 1 ? '' : 's'}
              {search.trim() && (
                <>
                  {' '}
                  for “<b>{search.trim()}</b>”
                </>
              )}
            </span>
            <button
              className="link"
              onClick={() => {
                update({ category: 'All', age: 'All' });
                clearSearch();
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {list.length ? (
          <div className="grid">
            {list.slice(0, shown).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <span className="empty-icon">
              <SearchIcon />
            </span>
            <p>No matches yet. Try another filter.</p>
          </div>
        )}

        {shown < list.length && (
          <div className="center">
            <button className="btn btn--ghost" onClick={() => setShown((s) => s + PAGE)}>
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
