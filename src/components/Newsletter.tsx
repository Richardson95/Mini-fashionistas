import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function Newsletter() {
  const { notify } = useStore();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notify('Please enter a valid email');
      return;
    }
    setDone(true);
    setEmail('');
    notify('Welcome to the club!');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="news">
          <h2>Join the Club</h2>
          <p>Get 15% off your first order.</p>
          {done ? (
            <div className="news__done">You're in! Check your inbox.</div>
          ) : (
            <form className="news__form" onSubmit={submit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                required
              />
              <button className="btn" type="submit">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
