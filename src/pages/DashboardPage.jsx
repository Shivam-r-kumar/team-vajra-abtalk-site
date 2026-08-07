import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Brand from "../components/Brand";
import ThemeButton from "../components/ThemeButton";

const dashboardData = {
  student: {
    name: "Shivam",
    initials: "SK",
    currentDay: 12,
    totalDays: 60,
    completedDays: 11,
    currentStreak: 11,
    projectsBuilt: 10,
    rank: 142,
    totalStudents: 820,
    standingPercent: 18,
    missedYesterday: false
  },
  challenge: {
    day: 12,
    title: "Build a Responsive Portfolio Website",
    difficulty: "Intermediate",
    estimatedTime: "~45 min",
    description: "Create a responsive portfolio that showcases your work, skills, and contact information."
  }
};

function getTimeLeft() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const minutesLeft = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 60000));
  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;
  return hours ? `${hours}h ${String(minutes).padStart(2, "0")}m left today` : `${minutes}m left today`;
}

function useMidnightCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 30000);
    return () => window.clearInterval(interval);
  }, []);
  return timeLeft;
}

function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="dashboard-shell dashboard-header__inner">
        <Brand className="dashboard-brand" />
        <nav className="dashboard-top-nav" aria-label="Dashboard">
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink to="/day/12">Challenge</NavLink>
          <a href="#journey">Progress</a>
        </nav>
        <div className="dashboard-header__actions">
          <ThemeButton />
          <a className="profile-button" href="#profile" aria-label="Open profile for Shivam">SK</a>
        </div>
      </div>
    </header>
  );
}

export default function DashboardPage() {
  const { student, challenge } = dashboardData;
  const timeLeft = useMidnightCountdown();
  const progressPercent = Math.round((student.currentDay / student.totalDays) * 100);
  const completedPercent = (student.completedDays / student.totalDays) * 100;
  const journey = useMemo(() => [9, 10, 11, 12, 13].map((day) => ({
    day,
    state: day < student.currentDay ? "done" : day === student.currentDay ? "today" : "upcoming"
  })), [student.currentDay]);

  return (
    <div className="dashboard-page">
      <a className="skip-link" href="#dashboardMain">Skip to dashboard</a>
      <DashboardHeader />

      <main className="dashboard-shell dashboard-main" id="dashboardMain">
        <section className="dashboard-greeting" aria-labelledby="greetingTitle">
          <div>
            <p className="dashboard-overline">Student dashboard</p>
            <h1 id="greetingTitle">Good evening{student.name ? `, ${student.name}` : ""} <span aria-hidden="true">👋</span></h1>
            <p>{student.missedYesterday ? "You missed yesterday, but your journey isn’t over. Start today and keep moving." : "Keep showing up. Great things take time."}</p>
          </div>
          <p className="dashboard-date">{new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(new Date())}</p>
        </section>

        <div className="dashboard-layout">
          <div className="dashboard-primary">
            <section className="today-section" id="today" aria-labelledby="todayTitle">
              <p className="dashboard-overline dashboard-overline--blue">Today’s challenge</p>
              <article className="challenge-card">
                <div className="challenge-card__content">
                  <div className="challenge-day-row"><span className="day-chip">Day {challenge.day}</span><span className="challenge-status"><span aria-hidden="true" /> Ready when you are</span></div>
                  <h2 id="todayTitle">{challenge.title}</h2>
                  <div className="challenge-meta" aria-label="Challenge details"><span><span className="meta-dot" aria-hidden="true" />{challenge.difficulty}</span><span><span className="meta-clock" aria-hidden="true" />{challenge.estimatedTime}</span></div>
                  <p className="challenge-description">{challenge.description}</p>
                  <Link className="btn btn-primary challenge-cta" to={`/day/${challenge.day}`}>Continue Day {challenge.day}<span className="cta-arrow" aria-hidden="true">→</span></Link>
                </div>
                <div className="challenge-visual" aria-hidden="true">
                  <div className="visual-browser"><div className="visual-browser__bar"><i /><i /><i /></div><div className="visual-browser__body"><span className="visual-kicker" /><span className="visual-title" /><span className="visual-title visual-title--short" /><div className="visual-grid"><i /><i /><i /></div></div></div>
                  <div className="visual-phone"><i /><span /><span /><span /></div><div className="visual-code">&lt;/&gt;</div>
                </div>
              </article>
            </section>

            <section className="progress-card" aria-labelledby="progressTitle">
              <div className="progress-summary">
                <div className="progress-ring" style={{ "--progress": progressPercent }} role="progressbar" aria-label="Challenge progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progressPercent}>
                  <div className="progress-ring__inner"><span>Day</span><strong>{student.currentDay}</strong><small>of {student.totalDays}</small></div>
                </div>
                <div className="progress-copy"><p className="progress-kicker" id="progressTitle">Your progress</p><p className="streak-line"><span aria-hidden="true">🔥</span>{student.currentStreak ? `${student.currentStreak} Day Streak` : "Your first streak starts today"}</p><p className="progress-encouragement">You’re building real momentum.</p></div>
              </div>
              <div className="linear-progress"><div className="linear-progress__labels"><strong>{progressPercent}% complete</strong><span>{student.completedDays} completed days</span></div><div className="linear-progress__track" role="progressbar" aria-label="Days completed" aria-valuemin="0" aria-valuemax={student.totalDays} aria-valuenow={student.completedDays}><span style={{ width: `${completedPercent}%` }} /></div></div>
            </section>

            <section className="rescue-card" aria-labelledby="rescueTitle">
              <div className="rescue-icon" aria-hidden="true"><span className="rescue-moon" /></div>
              <div className="rescue-copy"><h2 id="rescueTitle">Midnight Rescue</h2><p>Finish today’s challenge before midnight to protect your streak.</p></div>
              <a className="rescue-time" href="#today" aria-label={`${timeLeft}. Go to today’s challenge`}>{timeLeft}</a>
            </section>

            <section className="journey-section" id="journey" aria-labelledby="journeyTitle">
              <div className="section-heading-row"><div><p className="dashboard-overline">Progress</p><h2 id="journeyTitle">Your Journey</h2></div><span>{student.completedDays} / {student.totalDays} days</span></div>
              <ol className="journey-stepper" aria-label="Recent challenge days">
                {journey.map(({ day, state }) => {
                  const stateLabel = state === "done" ? "Done" : state === "today" ? "Today" : "Upcoming";
                  return <li className={`journey-step is-${state}`} aria-label={`Day ${day}, ${stateLabel}`} key={day}><span className="journey-node" aria-hidden="true">{state === "done" ? "✓" : day}</span><span className="journey-day">Day {day}</span><span className="journey-state">{stateLabel}</span></li>;
                })}
              </ol>
            </section>
          </div>

          <aside className="dashboard-secondary" aria-label="Achievements and standing">
            <section className="achievements-section" aria-labelledby="achievementsTitle">
              <div className="section-heading-row"><div><p className="dashboard-overline">Milestones</p><h2 id="achievementsTitle">Achievements</h2></div></div>
              <div className="achievements-grid">
                <article className="achievement achievement--streak"><span className="achievement__icon" aria-hidden="true">🔥</span><p><strong>{student.currentStreak} Day Streak</strong><span>Keep it going</span></p></article>
                <article className="achievement achievement--week"><span className="achievement__icon" aria-hidden="true">🏅</span><p><strong>First Week</strong><span>Milestone earned</span></p></article>
                <article className="achievement achievement--projects"><span className="achievement__icon" aria-hidden="true">💻</span><p><strong>{student.projectsBuilt} Projects</strong><span>Built so far</span></p></article>
              </div>
            </section>
            <section className="standing-card" aria-labelledby="standingTitle"><div className="standing-card__icon" aria-hidden="true">↗</div><div><p className="dashboard-overline">Your Standing</p><h2 id="standingTitle">Top {student.standingPercent}%</h2><p><strong>#{student.rank}</strong> of {student.totalStudents} students</p></div></section>
            <section className="profile-nudge" id="profile"><div><h2>Profile ready</h2><p>Your challenge progress is connected to Shivam.</p></div><Link to="/">ABTalks home</Link></section>
          </aside>
        </div>
      </main>

      <nav className="bottom-nav" aria-label="Mobile dashboard navigation">
        <NavLink className={({ isActive }) => `bottom-nav__item${isActive ? " is-active" : ""}`} to="/dashboard"><span className="nav-glyph nav-glyph--home" aria-hidden="true" /><span>Home</span></NavLink>
        <NavLink className={({ isActive }) => `bottom-nav__item${isActive ? " is-active" : ""}`} to="/day/12"><span className="nav-glyph nav-glyph--code" aria-hidden="true">&lt;/&gt;</span><span>Challenge</span></NavLink>
        <a className="bottom-nav__item" href="#journey"><span className="nav-glyph nav-glyph--progress" aria-hidden="true" /><span>Progress</span></a>
        <a className="bottom-nav__item" href="#profile"><span className="nav-glyph nav-glyph--profile" aria-hidden="true" /><span>Profile</span></a>
      </nav>
    </div>
  );
}
