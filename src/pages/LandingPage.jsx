import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import { studentData } from "../data";

const values = [
  { title: "Daily Builds", text: "Build something meaningful every day.", icon: "✦" },
  { title: "GitHub Proof", text: "One commit a day. Show real progress.", icon: "⌘" },
  { title: "LinkedIn Visibility", text: "Share your journey and grow your network.", icon: "in" }
];

const steps = [
  ["01", "Choose a track", "Pick a track that fits your goals and skill level."],
  ["02", "Build today’s task", "Solve the daily challenge and build something meaningful."],
  ["03", "Submit proof of work", "Push your GitHub commit and share a LinkedIn post."],
  ["04", "Grow your streak", `Stay consistent for ${studentData.totalDays} days and keep building momentum.`]
];

const studentStories = [
  {
    name: "Aanya Sharma",
    course: "B.Tech CSE · Pune",
    quote: "The daily challenge turned coding into a habit. I stopped waiting for motivation and started showing up every day.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=192&q=82"
  },
  {
    name: "Arjun Mehta",
    course: "BCA · Jaipur",
    quote: "By the end of the challenge I had 60 project commits and a portfolio I could confidently share in interviews.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=192&q=82"
  },
  {
    name: "Meera Nair",
    course: "Data Science · Kochi",
    quote: "Submitting proof of work kept me accountable. My learning finally became visible, organised, and consistent.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=192&q=82"
  },
  {
    name: "Kabir Singh",
    course: "B.Tech IT · Chandigarh",
    quote: "Domain-based tasks meant every build supported my actual career goal instead of feeling like random practice.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=192&q=82"
  },
  {
    name: "Riya Verma",
    course: "AI & ML · Bengaluru",
    quote: "The streak and friends ranking gave me the push to finish even on busy college days. Small wins kept adding up.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=192&q=82"
  },
  {
    name: "Dev Malhotra",
    course: "MCA · Delhi",
    quote: "Building one small project daily taught me more than weeks of only watching tutorials. I learned by shipping.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=192&q=82"
  },
  {
    name: "Sana Khan",
    course: "Computer Science · Hyderabad",
    quote: "The 30-day history made progress feel real. Whenever I slowed down, seeing completed days helped me restart.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=192&q=82"
  },
  {
    name: "Ishaan Rao",
    course: "Electronics · Chennai",
    quote: "One focused challenge a day improved my time management and gave me practical projects beyond coursework.",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=192&q=82"
  }
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

function useStorySlider(count) {
  const sliderRef = useRef(null);
  const instantScrollRef = useRef(true);
  const resetTimerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(count);
  const [storyPaused, setStoryPaused] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    const activeCard = slider?.querySelector(`[data-story-index="${activeSlide}"]`);
    if (!slider || !activeCard) return undefined;

    const centerActiveSlide = () => {
      const target = activeCard.offsetLeft - ((slider.clientWidth - activeCard.offsetWidth) / 2);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      slider.scrollTo({
        left: target,
        behavior: reduced || instantScrollRef.current ? "auto" : "smooth"
      });
      instantScrollRef.current = false;
    };

    centerActiveSlide();
    window.addEventListener("resize", centerActiveSlide);

    if (activeSlide === count * 2) {
      resetTimerRef.current = window.setTimeout(() => {
        instantScrollRef.current = true;
        setActiveSlide(count);
      }, 700);
    }

    return () => {
      window.removeEventListener("resize", centerActiveSlide);
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, [activeSlide, count]);

  useEffect(() => {
    if (storyPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => setActiveSlide((current) => current + 1), 2600);
    return () => window.clearInterval(timer);
  }, [storyPaused]);

  return { sliderRef, activeSlide, setStoryPaused };
}

export default function LandingPage() {
  useReveal();
  const { sliderRef, activeSlide, setStoryPaused } = useStorySlider(studentStories.length);

  return (
    <div className="landing-page">
      <a className="skip-link" href="#main">Skip to content</a>

      <SiteHeader />

      <main id="main">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{studentData.totalDays}-Day Coding Challenge</span>
              <h1 className="hero-title">Build for {studentData.totalDays} Days.<br />Become <span className="mark">Impossible</span><br />to Ignore.</h1>
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
                <pre className="editor-code"><code><span className="c-key">const</span> <span className="c-var">day</span> = <span className="c-num">23</span>;{"\n"}<span className="c-key">while</span> (<span className="c-var">day</span> &lt;= <span className="c-num">{studentData.totalDays}</span>) &#123;{"\n"}  <span className="c-fn">build</span>(); <span className="c-fn">commit</span>(); <span className="c-fn">share</span>();{"\n"}&#125;</code></pre>
              </div>
              <div className="phone">
                <div className="phone-screen">
                  <div className="phone-topbar"><span className="phone-day">Day 23</span><span className="streak-chip">23 Day Streak 🔥</span></div>
                  <div className="progress-block">
                    <div className="progress-head"><span>Progress</span><span className="progress-val">23 / {studentData.totalDays}</span></div>
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
            <div className="about-grid">
              <header className="section-head about-section-head reveal">
                <span className="section-kicker">About ABTalks</span>
                <h2 className="section-title">Where technology meets leadership—and learning becomes action.</h2>
                <p className="section-sub">AB Talks is an AI-first career and learning community helping students and early-career professionals become industry-ready. Through practical AI education, hands-on challenges, and direct conversations with CEOs, founders, and technology leaders, members build real skills and prepare for the future of work.</p>
                <p className="about-detail">Led by founder Anil Bajpai, the community connects technology, business, and leadership with the questions young professionals care about most—from career growth and internships to the skills employers value today.</p>
                <div className="about-links" aria-label="Official AB Talks links">
                  <a href="https://www.linkedin.com/company/abtalks-on-ai/" target="_blank" rel="noreferrer"><span aria-hidden="true">in</span> Follow ABTalksOnAI <b aria-hidden="true">↗</b></a>
                  <a href="https://www.linkedin.com/in/anil-bajpai/" target="_blank" rel="noreferrer"><span aria-hidden="true">in</span> Meet founder Anil Bajpai <b aria-hidden="true">↗</b></a>
                </div>
                <p className="about-schedule"><span aria-hidden="true">●</span> New podcast conversations every Wednesday.</p>
              </header>

              <aside className="founder-card reveal" aria-labelledby="founderName">
                <a className="founder-card__image" href="https://www.linkedin.com/posts/abtalks-on-ai_talentacquisition-hiring-recruitment-activity-7428067928799117312-ws5J" target="_blank" rel="noreferrer" aria-label="View the official ABTalksOnAI post featuring Anil Bajpai">
                  <img src="/assets/anil-bajpai-founder.jpg" alt="Anil Bajpai, founder and podcast host at AB Talks" loading="lazy" />
                </a>
                <div className="founder-card__copy">
                  <span>Founder & podcast host</span>
                  <h3 id="founderName">Anil Bajpai</h3>
                  <p>Connecting young builders with practical AI learning and honest conversations from industry leaders.</p>
                  <a href="https://www.linkedin.com/in/anil-bajpai/" target="_blank" rel="noreferrer">View LinkedIn profile <span aria-hidden="true">↗</span></a>
                </div>
              </aside>
            </div>
            <div className="cards-3">
              {[['Learn by building', 'Turn practical AI lessons and hands-on challenges into skills you can demonstrate.'], ['Learn from leaders', 'Hear directly from founders, CEOs, and technology experts shaping the future of work.'], ['Grow with community', 'Build in public, exchange ideas, and move forward with people learning alongside you.']].map(([title, text]) => (
                <article className="card reveal" key={title}><h3 className="card-title">{title}</h3><p className="card-text">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sixty">
              <div className="sixty-copy reveal"><h2 className="section-title">Why {studentData.totalDays} days?</h2><p className="section-sub">Long enough to build momentum. Focused enough to finish.</p></div>
              <dl className="sixty-stats reveal">
                {[[studentData.totalDays, 'Days'], [studentData.totalDays, 'Builds'], ['1', 'Stronger Habit']].map(([number, label]) => <div className="stat" key={label}><dt className="stat-num">{number}</dt><dd className="stat-label">{label}</dd></div>)}
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
          <div className="container"><div className="cta-panel reveal"><h2 className="cta-title">Your next {studentData.totalDays} days can change how you build.</h2><p className="cta-sub">Show up daily. Build. Share. Keep moving.</p><Link to="/dashboard" className="btn btn-invert btn-lg">Open Your Dashboard</Link><p className="cta-note">Free to join · Hackathon demo</p></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <section className="student-stories" aria-label="Illustrative student testimonials">
          <div className="stories-slider" ref={sliderRef} onMouseEnter={() => setStoryPaused(true)} onMouseLeave={() => setStoryPaused(false)}>
            <div className="stories-track">
              {[0, 1, 2].flatMap((copy) => studentStories.map((story, index) => {
                const trackIndex = (copy * studentStories.length) + index;
                const isActive = trackIndex === activeSlide;

                return (
                  <div
                    className="story-slide"
                    data-story-index={trackIndex}
                    key={`${copy}-${story.name}`}
                    aria-hidden={copy === 1 ? undefined : "true"}
                  >
                    <article className={`story-card${isActive ? " is-active" : ""}`} aria-current={copy === 1 && isActive ? "true" : undefined}>
                      <div className="story-stars" aria-label="5 out of 5 stars">★★★★★</div>
                      <blockquote>“{story.quote}”</blockquote>
                      <div className="story-student">
                        <img src={story.image} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                        <div><strong>{story.name}</strong><span>{story.course}</span></div>
                      </div>
                    </article>
                  </div>
                );
              }))}
            </div>
          </div>
          <p className="stories-disclaimer">Illustrative demo testimonials shown with royalty-free stock photography from Unsplash.</p>
        </section>

        <div className="container footer-bottom"><p>© 2026 AB Talks. Built for the next generation of AI builders.</p><p>60 days · 60 builds · one stronger habit</p></div>
      </footer>
    </div>
  );
}
