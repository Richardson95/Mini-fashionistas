import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BagIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

const FREE_SHIP = 50;

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, clearCart, subtotal, cartCount, notify } = useStore();
  const [code, setCode] = useState('');
  const [promo, setPromo] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      setOrdered(false);
    };
  }, [cartOpen, setCartOpen]);

  const discount = promo ? subtotal * 0.15 : 0;
  const shipping = subtotal - discount >= FREE_SHIP || subtotal === 0 ? 0 : 4.99;
  const total = subtotal - discount + shipping;
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  const applyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === 'MINI15') {
      setPromo(true);
      notify('15% off applied');
    } else {
      notify('Code not valid');
    }
  };

  const checkout = () => {
    setOrdered(true);
    clearCart();
    setPromo(false);
    setCode('');
  };

  return (
    <>
      <div className={`drawer-overlay ${cartOpen ? 'is-open' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen} aria-label="Shopping bag">
        <div className="cart__head">
          <h3>
            Your Bag <span>({cartCount})</span>
          </h3>
          <button className="icon-btn" aria-label="Close bag" onClick={() => setCartOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {ordered ? (
          <div className="cart__empty">
            <span className="empty-icon">
              <CheckIcon />
            </span>
            <h4>Order placed!</h4>
            <p>Thank you for shopping with us.</p>
            <button className="btn" onClick={() => setCartOpen(false)}>
              Keep Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart__empty">
            <span className="empty-icon">
              <BagIcon />
            </span>
            <h4>Your bag is empty</h4>
            <p>Let's find something lovely.</p>
            <a className="btn" href="#shop" onClick={() => setCartOpen(false)}>
              Start Shopping
            </a>
          </div>
        ) : (
          <>
            <div className="ship">
              <p>
                {subtotal >= FREE_SHIP ? (
                  <>You've unlocked <b>free shipping!</b></>
                ) : (
                  <>
                    Add <b>${(FREE_SHIP - subtotal).toFixed(2)}</b> for free shipping
                  </>
                )}
              </p>
              <div className="ship__bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="cart__list">
              {cart.map(({ product: p, qty }) => (
                <li key={p.id} className="line">
                  <img className="line__img" src={p.image} alt={p.name} style={{ background: p.tint }} />
                  <div className="line__info">
                    <b>{p.name}</b>
                    <small>${p.price}</small>
                    <div className="qty qty--sm">
                      <button aria-label="Decrease" onClick={() => updateQty(p.id, qty - 1)}>
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span>{qty}</span>
                      <button aria-label="Increase" onClick={() => updateQty(p.id, qty + 1)}>
                        <PlusIcon width={14} height={14} />
                      </button>
                    </div>
                  </div>
                  <div className="line__end">
                    <b>${(p.price * qty).toFixed(2)}</b>
                    <button className="line__del" aria-label={`Remove ${p.name}`} onClick={() => removeFromCart(p.id)}>
                      <TrashIcon width={16} height={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart__foot">
              {!promo && (
                <form className="promo" onSubmit={applyCode}>
                  <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" aria-label="Promo code" />
                  <button className="btn btn--ghost btn--sm" type="submit">
                    Apply
                  </button>
                </form>
              )}
              <dl className="sum">
                <div>
                  <dt>Subtotal</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                {promo && (
                  <div className="sum__promo">
                    <dt>MINI15</dt>
                    <dd>−${discount.toFixed(2)}</dd>
                  </div>
                )}
                <div>
                  <dt>Shipping</dt>
                  <dd>{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</dd>
                </div>
                <div className="sum__total">
                  <dt>Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>
              <button className="btn btn--lg btn--block" onClick={checkout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
