import { testimonials } from '../data/products';
import { LeafIcon, ReturnIcon, ShieldIcon, StarIcon, TruckIcon } from './Icons';

const trust = [
  { icon: ShieldIcon, label: 'Kid Safe' },
  { icon: LeafIcon, label: 'Eco Pack' },
  { icon: TruckIcon, label: 'Fast Ship' },
  { icon: ReturnIcon, label: 'Easy Returns' },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .replace('.', '');

export default function Testimonials() {
  return (
    <section className="section section--tint" id="reviews">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Loved by parents</span>
          <h2>Happy Families</h2>
        </div>
        <div className="reviews">
          {testimonials.map((r) => (
            <figure className="review" key={r.name}>
              <div className="review__stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} width={16} height={16} className="star" />
                ))}
              </div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                <span className="review__avatar">{initials(r.name)}</span>
                <span>
                  <b>{r.name}</b>
                  <small>{r.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ul className="trust">
          {trust.map(({ icon: Icon, label }) => (
            <li key={label}>
              <Icon width={18} height={18} /> {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
