interface Props {
  light?: boolean;
}

export default function Logo({ light = false }: Props) {
  return (
    <a href="#top" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Mini-Fashionistas home">
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="mf-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff4fa3" />
            <stop offset="1" stopColor="#7b2ff7" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#mf-grad)" />
        <path d="M17 27l7 6 8-13 8 13 7-6-3 15H20z" fill="#fff" />
        <circle cx="17" cy="25" r="3.2" fill="#ffd6ec" />
        <circle cx="32" cy="17" r="3.4" fill="#ffd6ec" />
        <circle cx="47" cy="25" r="3.2" fill="#ffd6ec" />
        <rect x="20" y="45" width="24" height="4.5" rx="2.25" fill="#fff" />
        <path d="M51 47l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z" fill="#fff" opacity=".9" />
      </svg>
      <span className="logo__text">
        Mini<span className="logo__dash">-</span>Fashionistas
      </span>
    </a>
  );
}
