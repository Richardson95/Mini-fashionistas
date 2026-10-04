interface Props {
  badge?: boolean;
}

export default function Logo({ badge = false }: Props) {
  if (badge) {
    return (
      <a href="#top" className="logo logo--badge" aria-label="Mini-Fashionistas home">
        <img className="logo__badge" src="/images/logo.png" alt="Mini-Fashionistas" width={512} height={512} loading="lazy" />
      </a>
    );
  }

  return (
    <a href="#top" className="logo" aria-label="Mini-Fashionistas home">
      <img className="logo__mark" src="/images/logo-192.png" alt="" width={192} height={192} />
      <span className="logo__text">
        Mini<span className="logo__dash">-</span>Fashionistas
      </span>
    </a>
  );
}
