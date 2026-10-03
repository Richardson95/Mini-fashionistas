import { ArrowIcon, StarIcon } from './Icons';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">✦</span>
        <span className="sparkle s3">✧</span>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy reveal">
          <span className="eyebrow">New Season · Ages 4–12</span>
          <h1>
            Little Looks,
            <br />
            <span className="grad-text">Big Smiles</span>
          </h1>
          <p>Fashion, toys and fun picked for happy kids.</p>
          <div className="hero__cta">
            <a href="#shop" className="btn btn--lg">
              Shop Now <ArrowIcon width={18} height={18} />
            </a>
            <a href="#ages" className="btn btn--ghost btn--lg">
              Shop by Age
            </a>
          </div>
          <ul className="hero__stats">
            <li>
              <b>50k+</b>
              <span>Happy kids</span>
            </li>
            <li>
              <b>4.9</b>
              <span>
                <StarIcon width={14} height={14} className="star" /> Rating
              </span>
            </li>
            <li>
              <b>800+</b>
              <span>Products</span>
            </li>
          </ul>
        </div>

        <div className="hero__art reveal" aria-hidden="true">
          <div className="hero__circle">
            <img className="hero__main" src="/images/hero.jpg" alt="" fetchPriority="high" />
          </div>
          <div className="float-card fc1">
            <img src="/images/products/cuddly-unicorn.jpg" alt="" />
            <div>
              <b>Unicorn</b>
              <small>$24</small>
            </div>
          </div>
          <div className="float-card fc2">
            <img src="/images/products/princess-tiara.jpg" alt="" />
            <div>
              <b>Tiara</b>
              <small>$12</small>
            </div>
          </div>
          <div className="float-card fc3">
            <span className="fc3__badge">−30%</span>
            <div>
              <b>Party Sale</b>
              <small>This week</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
