import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import ThemeButton from "../components/ThemeButton";

const values = [
  { title: "Daily Builds", text: "Build something meaningful every day.", icon: "✦" },
  { title: "GitHub Proof", text: "One commit a day. Show real progress.", icon: "⌘" },
  { title: "LinkedIn Visibility", text: "Share your journey and grow your network.", icon: "in" }
];

const steps = [
  ["01", "Choose a track", "Pick a track that fits your goals and skill level."],
  ["02", "Build today’s task", "Solve the daily challenge and build something meaningful."],
  ["03", "Submit proof of work", "Push your GitHub commit and share a LinkedIn post."],
  ["04", "Grow your streak", "Stay consistent for 60 days and keep building momentum."]
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  return (
    <div className="landing-page">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header" id="top">
        <div className="container header-inner">
          <Brand />
          <nav className="nav-desktop" aria-label="Primary">
            <Link to="/" className="nav-link is-active" aria-current="page">Home</Link>
            <a href="#about" className="nav-link">About</a>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </nav>
          <div className="header-actions">
            <ThemeButton />
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg className="icon-menu" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              <svg className="icon-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        </div>
        {!menuOpen ? null : (
          <div className="mobile-menu" id="mobileMenu">
            <nav className="container mobile-menu-inner" aria-label="Mobile">
              <Link to="/" className="mobile-link is-active" onClick={() => setMenuOpen(false)}>Home</Link>
              <a href="#about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</a>
              <Link to="/dashboard" className="mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            </nav>
          </div>
        )}
      </header>

      <main id="main">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />60-Day Coding Challenge</span>
              <h1 className="hero-title">Build for 60 Days.<br />Become <span className="mark">Impossible</span><br />to Ignore.</h1>
              <p className="hero-sub">A coding challenge for Indian college students. Build daily, submit a GitHub commit and a LinkedIn post, and grow your consistency, portfolio, and visibility.</p>
              <div className="hero-actions">
                <Link to="/dashboard" className="btn btn-primary btn-lg">Enter Your Dashboard</Link>
                <a href="#how" className="btn btn-ghost btn-lg">See how it works <span aria-hidden="true">→</span></a>
              </div>
              <ul className="hero-meta"><li>Free to join</li><li>Any track</li><li>Build in public</li></ul>
            </div>

            <div className="hero-visual reveal" aria-hidden="true">
              <div className="editor-panel">
                <div className="editor-bar"><span /><span /><span /></div>
                <pre className="editor-code"><code><span className="c-key">const</span> <span className="c-var">day</span> = <span className="c-num">23</span>;{"\n"}<span className="c-key">while</span> (<span className="c-var">day</span> &lt;= <span className="c-num">60</span>) &#123;{"\n"}  <span className="c-fn">build</span>(); <span className="c-fn">commit</span>(); <span className="c-fn">share</span>();{"\n"}&#125;</code></pre>
              </div>
              <div className="phone">
                <div className="phone-screen">
                  <div className="phone-topbar"><span className="phone-day">Day 23</span><span className="streak-chip">23 Day Streak 🔥</span></div>
                  <div className="progress-block">
                    <div className="progress-head"><span>Progress</span><span className="progress-val">23 / 60</span></div>
                    <div className="progress-track"><div className="progress-fill" /></div>
                  </div>
                  <ul className="task-list">
                    {[["Today’s Build", "Completed"], ["GitHub Commit", "Completed"], ["LinkedIn Post", "Posted"]].map(([title, status]) => (
                      <li className="task task-done" key={title}>
                        <span className="task-tick">✓</span>
                        <span className="task-text"><strong>{title}</strong><em>{status}</em></span>
                      </li>
                    ))}
                  </ul>
                  <div className="phone-foot"><div className="dots">{Array.from({ length: 10 }, (_, index) => <i className={index < 7 ? "on" : ""} key={index} />)}</div><span className="phone-foot-label">37 days to go</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-tight" aria-label="What you do every day">
          <div className="container">
            <ul className="value-strip">
              {values.map((value) => (
                <li className="value-item reveal" key={value.title}>
                  <span className="value-icon text-icon" aria-hidden="true">{value.icon}</span>
                  <div><h3>{value.title}</h3><p>{value.text}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <header className="section-head reveal"><span className="section-kicker">The routine</span><h2 className="section-title">How it works</h2><p className="section-sub">Four small steps, repeated until they become who you are.</p></header>
            <ol className="steps">
              {steps.map(([number, title, text]) => (
                <li className="step reveal" key={number}><span className="step-num">{number}</span><div className="step-body"><h3>{title}</h3><p>{text}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-surface" id="about">
          <div className="container">
            <header className="section-head reveal"><span className="section-kicker">About ABTalks</span><h2 className="section-title">Why students join</h2><p className="section-sub">Showing up daily is what separates people who talk about building from people who build.</p></header>
            <div className="cards-3">
              {[['Build consistency', 'Turn motivation into a habit that lasts.'], ['Create a public portfolio', 'Real projects. Real proof. Real you.'], ['Stay visible', 'Build in public and make your progress easier to discover.']].map(([title, text]) => (
                <article className="card reveal" key={title}><h3 className="card-title">{title}</h3><p className="card-text">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sixty">
              <div className="sixty-copy reveal"><h2 className="section-title">Why 60 days?</h2><p className="section-sub">Long enough to build momentum. Focused enough to finish.</p></div>
              <dl className="sixty-stats reveal">
                {[['60', 'Days'], ['60', 'Builds'], ['1', 'Stronger Habit']].map(([number, label]) => <div className="stat" key={label}><dt className="stat-num">{number}</dt><dd className="stat-label">{label}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>

        <section className="section night">
          <div className="container night-grid">
            <div className="night-copy reveal"><span className="section-kicker">Made for real schedules</span><h2 className="section-title">Built for late-night builders</h2><p className="section-sub">College schedules are busy. ABTalks keeps the daily experience focused, mobile-friendly, and easy to complete even when you’re building after classes.</p><ul className="night-list">{['Mobile-first experience', 'Minimal distraction', 'Quick proof-of-work submission'].map((item) => <li key={item}><span className="night-tick" aria-hidden="true">✓</span>{item}</li>)}</ul></div>
            <div className="night-art reveal" aria-hidden="true"><div className="night-sky"><span className="css-moon" />{Array.from({ length: 6 }, (_, index) => <span className={`star s${index + 1}`} key={index} />)}<div className="night-card"><span className="night-card-time">11:47 PM</span><span className="night-card-title">Day 23 submitted</span><span className="night-card-meta">Streak safe 🔥</span></div></div></div>
          </div>
        </section>

        <section className="section cta-section" id="start">
          <div className="container"><div className="cta-panel reveal"><h2 className="cta-title">Your next 60 days can change how you build.</h2><p className="cta-sub">Show up daily. Build. Share. Keep moving.</p><Link to="/dashboard" className="btn btn-invert btn-lg">Open Your Dashboard</Link><p className="cta-note">Free to join · Hackathon demo</p></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner"><Brand /><nav className="footer-nav" aria-label="Footer"><Link to="/">Home</Link><a href="#about">About</a><Link to="/dashboard">Dashboard</Link></nav><p className="footer-note">Built for the ABTalks hackathon demo.</p></div>
      </footer>
    </div>
  );
}
