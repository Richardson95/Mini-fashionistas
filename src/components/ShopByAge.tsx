import { ageGroups, products } from '../data/products';
import type { AgeGroup } from '../types';
import { ArrowIcon } from './Icons';

interface Props {
  onPick: (age: AgeGroup) => void;
}

export default function ShopByAge({ onPick }: Props) {
  return (
    <section className="section" id="ages">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Made for every stage</span>
          <h2>Shop by Age</h2>
        </div>
        <div className="ages">
          {ageGroups.map((a, i) => (
            <button key={a.id} className={`age-card age-card--${i + 1}`} onClick={() => onPick(a.id)}>
              <img className="age-card__img" src={a.image} alt="" loading="lazy" />
              <span className="age-card__tag">{a.tag}</span>
              <span className="age-card__title">{a.label}</span>
              <span className="age-card__meta">
                {products.filter((p) => p.ages.includes(a.id)).length} items <ArrowIcon width={16} height={16} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
