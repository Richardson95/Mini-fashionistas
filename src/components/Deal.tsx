import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

const deal = products.find((p) => p.id === 8)!;
const off = deal.oldPrice ? Math.round((1 - deal.price / deal.oldPrice) * 100) : 0;

function untilMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function Deal() {
  const { addToCart } = useStore();
  const [t, setT] = useState(untilMidnight);

  useEffect(() => {
    const id = setInterval(() => setT(untilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" id="deals">
      <div className="container">
        <div className="deal">
          <div className="deal__art" aria-hidden="true">
            <span className="deal__ring" />
            <img className="deal__img" src={deal.image} alt="" loading="lazy" />
            {off > 0 && <span className="deal__tag">−{off}%</span>}
          </div>
          <div className="deal__copy">
            <span className="eyebrow eyebrow--light">Deal of the Day</span>
            <h2>{deal.name}</h2>
            <div className="price price--light">
              <b>${deal.price}</b>
              <s>${deal.oldPrice}</s>
            </div>
            <div className="timer" aria-label="Time left">
              {[
                ['Hrs', t.h],
                ['Min', t.m],
                ['Sec', t.s],
              ].map(([label, v]) => (
                <div key={label as string}>
                  <b>{pad(v as number)}</b>
                  <small>{label}</small>
                </div>
              ))}
            </div>
            <button className="btn btn--white btn--lg" onClick={() => addToCart(deal)}>
              Grab the Deal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
