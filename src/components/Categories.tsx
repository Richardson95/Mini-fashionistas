import { categories } from '../data/products';
import type { Category } from '../types';

interface Props {
  onPick: (c: Category) => void;
}

export default function Categories({ onPick }: Props) {
  return (
    <section className="section section--tint" id="categories">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Explore</span>
          <h2>Top Categories</h2>
        </div>
        <div className="cats">
          {categories.map((c) => (
            <button key={c.name} className="cat" onClick={() => onPick(c.name)}>
              <span className="cat__bubble">
                <img src={c.image} alt="" loading="lazy" />
              </span>
              <span className="cat__name">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
