import { useCallback, useEffect, useRef, useState } from 'react';
import type { Category } from '../types';
import { ArrowIcon } from './Icons';

interface Slide {
  eyebrow: string;
  title: string;
  accent: string;
  text: string;
  cta: string;
  category?: Category;
  image: string;
  focus: string;
  bg: string;
  cards: { img: string; title: string; sub: string }[];
  badge: { value: string; title: string; sub: string };
}

const slides: Slide[] = [
  {
    eyebrow: 'New Season · Ages 4–12',
    title: 'Little Looks,',
    accent: 'Big Smiles',
    text: 'Fashion, toys and fun picked for happy kids.',
    cta: 'Shop Now',
    image: '/images/hero/party.jpg',
    focus: 'center 30%',
    bg: '#ffe1f1',
    cards: [
      { img: '/images/products/cuddly-unicorn.jpg', title: 'Unicorn', sub: '$24' },
      { img: '/images/products/princess-tiara.jpg', title: 'Tiara', sub: '$12' },
    ],
    badge: { value: '−30%', title: 'Party Sale', sub: 'This week' },
  },
  {
    eyebrow: 'Party Wear',
    title: 'Twirl Into',
    accent: 'Pure Joy',
    text: 'Tutus and dresses made to dance in.',
    cta: 'Shop Fashion',
    category: 'Fashion',
    image: '/images/hero/tutu.jpg',
    focus: 'center 35%',
    bg: '#f3e1ff',
    cards: [
      { img: '/images/products/rainbow-tutu.jpg', title: 'Rainbow Tutu', sub: '$22' },
      { img: '/images/products/ballet-flats.jpg', title: 'Ballet Shoes', sub: '$28' },
    ],
    badge: { value: 'New', title: 'Fresh Drop', sub: 'Just landed' },
  },
  {
    eyebrow: 'Toy Shop',
    title: 'Cuddles',
    accent: 'Guaranteed',
    text: 'Soft friends and playful gifts.',
    cta: 'Shop Toys',
    category: 'Toys',
    image: '/images/hero/toys.jpg',
    focus: 'center 40%',
    bg: '#ffe6ef',
    cards: [
      { img: '/images/products/space-rocket-set.jpg', title: 'Rocket', sub: '$49' },
      { img: '/images/products/teddy-bear.jpg', title: 'Teddy', sub: '$21' },
    ],
    badge: { value: '4.9★', title: 'Top Rated', sub: '2k+ reviews' },
  },
  {
    eyebrow: 'Back to School',
    title: 'Ready, Set,',
    accent: 'Learn!',
    text: 'Bags, books and gear for bright minds.',
    cta: 'Shop Accessories',
    category: 'Accessories',
    image: '/images/hero/school.jpg',
    focus: 'center 25%',
    bg: '#ece3ff',
    cards: [
      { img: '/images/products/magic-story-book.jpg', title: 'Book Set', sub: '$15' },
      { img: '/images/products/art-studio-kit.jpg', title: 'Crayons', sub: '$29' },
    ],
    badge: { value: '−15%', title: 'Code MINI15', sub: 'First order' },
  },
];

const DELAY = 6000;

interface Props {
  onShop: (category?: Category) => void;
}

export default function Hero({ onShop }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // The active dot's fill animation doubles as the autoplay timer, so pausing
  // (hover, focus, hidden tab) freezes the progress bar and the timer together.
  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAutoplay(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <section
      className="hero"
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero__bg" aria-hidden="true">
        {slides.map((s, i) => (
          <span key={i} className={`hero__wash ${i === index ? 'is-active' : ''}`} style={{ '--wash': s.bg } as React.CSSProperties} />
        ))}
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">✦</span>
        <span className="sparkle s3">✧</span>
      </div>

      <div className="container hero__stage">
        {slides.map((s, i) => {
          const Title = i === 0 ? 'h1' : 'h2';
          return (
          <div
            key={i}
            className={`slide ${i === index ? 'is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            <div className="hero__copy">
              <span className="eyebrow">{s.eyebrow}</span>
              <Title className="hero__title">
                {s.title}
                <br />
                <span className="grad-text">{s.accent}</span>
              </Title>
              <p>{s.text}</p>
              <div className="hero__cta">
                <button className="btn btn--lg" tabIndex={i === index ? 0 : -1} onClick={() => onShop(s.category)}>
                  {s.cta} <ArrowIcon width={18} height={18} />
                </button>
                <a href="#ages" className="btn btn--ghost btn--lg" tabIndex={i === index ? 0 : -1}>
                  Shop by Age
                </a>
              </div>
            </div>

            <div className="hero__art" aria-hidden="true">
              <div className="hero__circle">
                <div className="hero__photo">
                  <img
                    className="hero__main"
                    src={s.image}
                    alt=""
                    style={{ objectPosition: s.focus }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                  />
                </div>
              </div>
              {s.cards.map((c, n) => (
                <div key={c.title} className={`float-card fc${n + 1}`}>
                  <img src={c.img} alt="" loading="lazy" />
                  <div>
                    <b>{c.title}</b>
                    <small>{c.sub}</small>
                  </div>
                </div>
              ))}
              <div className="float-card fc3">
                <span className="fc3__badge">{s.badge.value}</span>
                <div>
                  <b>{s.badge.title}</b>
                  <small>{s.badge.sub}</small>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="container hero__controls">
        <div className="hero__nav">
          <button className="hero__arrow" aria-label="Previous slide" onClick={prev}>
            <ArrowIcon width={18} height={18} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button className="hero__arrow" aria-label="Next slide" onClick={next}>
            <ArrowIcon width={18} height={18} />
          </button>
        </div>
        <div className="hero__dots" role="tablist" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
              className={`hero__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
            >
              {i === index && autoplay && (
                <span
                  key={index}
                  className="hero__dot-fill"
                  style={{ animationDuration: `${DELAY}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                  onAnimationEnd={next}
                />
              )}
            </button>
          ))}
        </div>
        <span className="hero__count">
          <b>{String(index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
