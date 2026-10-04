import { useCallback, useRef, useState } from 'react';
import type { Category } from '../types';
import { ArrowIcon, PauseIcon, PlayIcon } from './Icons';

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

function SlideView({ s, i, live, onShop }: { s: Slide; i: number; live: boolean; onShop: Props['onShop'] }) {
  const Title = i === 0 && live ? 'h1' : 'h2';
  const tab = live ? 0 : -1;
  return (
    <div className="slide__inner container">
      <div className="hero__copy">
        <span className="eyebrow">{s.eyebrow}</span>
        <Title className="hero__title">
          {s.title}
          <br />
          <span className="grad-text">{s.accent}</span>
        </Title>
        <p>{s.text}</p>
        <div className="hero__cta">
          <button className="btn btn--lg" tabIndex={tab} onClick={() => onShop(s.category)}>
            {s.cta} <ArrowIcon width={18} height={18} />
          </button>
          <a href="#ages" className="btn btn--ghost btn--lg" tabIndex={tab}>
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
}

export default function Hero({ onShop }: Props) {
  const count = slides.length;
  // pos runs 0..count; position `count` is a copy of slide 1 so the track can
  // keep sliding forward, then silently snap back to the real slide 1.
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(true);
  const touchX = useRef<number | null>(null);
  const active = pos % count;

  const next = useCallback(() => {
    setAnimate(true);
    setPos((p) => Math.min(p + 1, count));
  }, [count]);

  const prev = useCallback(() => {
    if (pos === 0) {
      // jump to the copy without animating, then slide back one
      setAnimate(false);
      setPos(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setPos(count - 1);
        }),
      );
    } else {
      setAnimate(true);
      setPos((p) => p - 1);
    }
  }, [pos, count]);

  const goTo = (i: number) => {
    setAnimate(true);
    setPos(i);
  };

  const onTrackEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (pos === count) {
      setAnimate(false);
      setPos(0);
    }
  };

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
      onKeyDown={onKey}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero__bg" aria-hidden="true">
        {slides.map((s, i) => (
          <span key={i} className={`hero__wash ${i === active ? 'is-active' : ''}`} style={{ '--wash': s.bg } as React.CSSProperties} />
        ))}
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">✦</span>
        <span className="sparkle s3">✧</span>
      </div>

      <div className="hero__viewport">
        <div
          className={`hero__track ${animate ? 'is-animating' : ''}`}
          style={{ transform: `translate3d(${-pos * 100}%, 0, 0)` }}
          onTransitionEnd={onTrackEnd}
          aria-live={playing ? 'off' : 'polite'}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== active}
            >
              <SlideView s={s} i={i} live={i === active} onShop={onShop} />
            </div>
          ))}
          <div className="slide" aria-hidden="true">
            <SlideView s={slides[0]} i={-1} live={false} onShop={onShop} />
          </div>
        </div>
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
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
              className={`hero__dot ${i === active ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            >
              {i === active && (
                // This fill is the autoplay clock: when it finishes, advance.
                <span
                  className="hero__dot-fill"
                  style={{ '--delay': `${DELAY}ms`, animationPlayState: playing ? 'running' : 'paused' } as React.CSSProperties}
                  onAnimationEnd={next}
                />
              )}
            </button>
          ))}
        </div>
        <button
          className="hero__arrow hero__play"
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <PauseIcon width={16} height={16} /> : <PlayIcon width={16} height={16} />}
        </button>
        <span className="hero__count">
          <b>{String(active + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
