import Logo from './Logo';
import { SocialIcon } from './Icons';

const cols = [
  { title: 'Shop', links: ['Girls', 'Boys', 'Toys', 'New In', 'Sale'] },
  { title: 'Help', links: ['Shipping', 'Returns', 'Size Guide', 'Track Order'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Blog'] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo badge />
          <p>Joyful style for ages 4–12.</p>
          <div className="socials">
            {(['ig', 'fb', 'tt', 'yt'] as const).map((s) => (
              <a key={s} href="#top" aria-label={s}>
                <SocialIcon name={s} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="footer__col">
            <h4>{c.title}</h4>
            <ul>
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#top">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Mini-Fashionistas</span>
        <div className="pay">
          {['VISA', 'MC', 'PayPal', 'Apple Pay'].map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
