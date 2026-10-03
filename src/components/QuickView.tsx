import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CloseIcon, HeartIcon, MinusIcon, PlusIcon, StarIcon } from './Icons';

const sizes = ['4Y', '6Y', '8Y', '10Y', '12Y'];

export default function QuickView() {
  const { quickView: p, setQuickView, addToCart, toggleWish, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('6Y');
  const [color, setColor] = useState(0);

  useEffect(() => {
    if (!p) return;
    setQty(1);
    setColor(0);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setQuickView(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [p, setQuickView]);

  if (!p) return null;
  const wearable = p.category === 'Fashion' || p.category === 'Shoes';

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={() => setQuickView(null)}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn modal__close" aria-label="Close" onClick={() => setQuickView(null)}>
          <CloseIcon />
        </button>
        <div className="modal__media" style={{ background: p.tint }}>
          <img src={p.image} alt={p.name} />
        </div>
        <div className="modal__body">
          <span className="eyebrow">{p.category}</span>
          <h3>{p.name}</h3>
          <div className="modal__rating">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} width={16} height={16} className={i < Math.round(p.rating) ? 'star' : 'star star--off'} />
            ))}
            <span>({p.reviews})</span>
          </div>
          <div className="price price--lg">
            <b>${p.price}</b>
            {p.oldPrice && <s>${p.oldPrice}</s>}
          </div>
          <p className="muted">Soft, safe and made to play. Ages {p.ages.join(', ').replace(/-/g, '–')}.</p>

          <div className="opt">
            <span className="opt__label">Colour</span>
            <div className="swatches">
              {p.colors.map((c, i) => (
                <button
                  key={c}
                  className={`swatch ${color === i ? 'is-active' : ''}`}
                  style={{ background: c }}
                  aria-label={`Colour ${i + 1}`}
                  onClick={() => setColor(i)}
                />
              ))}
            </div>
          </div>

          {wearable && (
            <div className="opt">
              <span className="opt__label">Size</span>
              <div className="sizes">
                {sizes.map((s) => (
                  <button key={s} className={`size ${size === s ? 'is-active' : ''}`} onClick={() => setSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="modal__actions">
            <div className="qty">
              <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <MinusIcon width={16} height={16} />
              </button>
              <span>{qty}</span>
              <button aria-label="Increase" onClick={() => setQty((q) => q + 1)}>
                <PlusIcon width={16} height={16} />
              </button>
            </div>
            <button
              className="btn btn--grow"
              onClick={() => {
                addToCart(p, qty);
                setQuickView(null);
              }}
            >
              Add to Bag
            </button>
            <button
              className={`icon-btn icon-btn--outline ${wishlist.includes(p.id) ? 'is-on' : ''}`}
              aria-label="Wishlist"
              onClick={() => toggleWish(p)}
            >
              <HeartIcon filled={wishlist.includes(p.id)} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
