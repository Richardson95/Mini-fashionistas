import { useStore } from '../context/StoreContext';
import type { Product } from '../types';
import { EyeIcon, HeartIcon, PlusIcon, StarIcon } from './Icons';

export default function ProductCard({ product: p }: { product: Product }) {
  const { addToCart, toggleWish, wishlist, setQuickView } = useStore();
  const wished = wishlist.includes(p.id);
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  return (
    <article className="card">
      <div className="card__media" style={{ background: p.tint }}>
        {p.badge && <span className={`badge badge--${p.badge.toLowerCase()}`}>{p.badge === 'Sale' ? `−${off}%` : p.badge}</span>}
        <button
          className={`card__wish ${wished ? 'is-on' : ''}`}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWish(p)}
        >
          <HeartIcon filled={wished} width={18} height={18} />
        </button>
        <img className="card__img" src={p.image} alt={p.name} loading="lazy" decoding="async" width={720} height={720} />
        <button className="card__quick" onClick={() => setQuickView(p)}>
          <EyeIcon width={16} height={16} /> Quick view
        </button>
      </div>

      <div className="card__body">
        <div className="card__meta">
          <span>{p.category}</span>
          <span className="card__rating">
            <StarIcon width={13} height={13} className="star" /> {p.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="card__title">{p.name}</h3>
        <div className="card__foot">
          <div className="price">
            <b>${p.price}</b>
            {p.oldPrice && <s>${p.oldPrice}</s>}
          </div>
          <button className="card__add" aria-label={`Add ${p.name} to bag`} onClick={() => addToCart(p)}>
            <PlusIcon width={18} height={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
