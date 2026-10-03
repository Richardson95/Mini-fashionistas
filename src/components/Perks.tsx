import { LeafIcon, ReturnIcon, ShieldIcon, TruckIcon } from './Icons';

const perks = [
  { icon: TruckIcon, title: 'Free Delivery', text: 'Orders over $50' },
  { icon: ReturnIcon, title: 'Easy Returns', text: '30-day returns' },
  { icon: ShieldIcon, title: 'Secure Pay', text: '100% protected' },
  { icon: LeafIcon, title: 'Kid Safe', text: 'Non-toxic materials' },
];

export default function Perks() {
  return (
    <section className="perks">
      <div className="container">
        <div className="perks__grid">
          {perks.map(({ icon: Icon, title, text }) => (
            <div className="perk" key={title}>
              <span className="perk__icon">
                <Icon />
              </span>
              <div>
                <b>{title}</b>
                <small>{text}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
