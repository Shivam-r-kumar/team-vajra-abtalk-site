import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";

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

const communityProfiles = {
  shivam: {
    id: "shivam",
    name: "Shivam Kumar",
    initials: "SK",
    rank: 142,
    title: "Responsive portfolio website",
    about: "Learning in public, building one practical project every day, and sharing the process with the ABTalks community.",
    githubHref: "https://github.com/Shivam-r-kumar",
    linkedinHref: "https://www.linkedin.com/",
    submissionHref: "https://github.com/Shivam-r-kumar",
    submitted: true,
    isCurrentUser: true
  },
  aanya: {
    id: "aanya",
    name: "Aanya Sharma",
    initials: "AS",
    rank: 1,
    title: "Editorial developer portfolio",
    about: "Frontend developer focused on accessible interfaces, thoughtful typography, and small details that make products feel effortless.",
    githubHref: "https://github.com/topics/react-portfolio",
    linkedinHref: "https://www.linkedin.com/",
    submissionHref: "https://github.com/topics/react-portfolio",
    submitted: true
  },
  dev: {
    id: "dev",
    name: "Dev Malhotra",
    initials: "DM",
    rank: 2,
    title: "Motion-first personal website",
    about: "Creative developer exploring motion, interaction design, and React experiences that stay fast on every device.",
    githubHref: "https://github.com/topics/developer-portfolio",
    linkedinHref: "https://www.linkedin.com/",
    submissionHref: "https://github.com/topics/developer-portfolio",
    submitted: true
  },
  meera: {
    id: "meera",
    name: "Meera Iyer",
    initials: "MI",
    rank: 3,
    title: "Accessible product portfolio",
    about: "Product-minded engineer who enjoys turning complex ideas into clear, inclusive, and responsive web experiences.",
    githubHref: "https://github.com/topics/portfolio",
    linkedinHref: "https://www.linkedin.com/",
    submissionHref: "https://github.com/topics/portfolio",
    submitted: true
  },
  riya: {
    id: "riya",
    name: "Riya",
    initials: "R",
    rank: 86,
    title: "Playful frontend portfolio",
    about: "Design learner and frontend builder experimenting with color, layout, and friendly interactions through daily challenges.",
    githubHref: "https://github.com/topics/react-portfolio",
    linkedinHref: "https://www.linkedin.com/",
    submissionHref: "https://github.com/topics/react-portfolio",
    submitted: true
  },
  aditya: {
    id: "aditya",
    name: "Aditya",
    initials: "A",
    rank: 205,
    title: "Developer portfolio system",
    about: "JavaScript developer building reusable UI systems and using the 60-day challenge to improve consistency.",
    githubHref: "https://github.com/topics/developer-portfolio",
    linkedinHref: "https://www.linkedin.com/",
    submissionHref: "https://github.com/topics/developer-portfolio",
    submitted: true
  },
  neha: { id: "neha", name: "Neha", initials: "N", submitted: false },
  kabir: { id: "kabir", name: "Kabir", initials: "K", submitted: false }
};

const topSubmissions = [communityProfiles.aanya, communityProfiles.dev, communityProfiles.meera];
const friendStandings = [communityProfiles.shivam, communityProfiles.riya, communityProfiles.aditya, communityProfiles.neha, communityProfiles.kabir]
  .sort((firstFriend, secondFriend) => {
    if (firstFriend.rank == null && secondFriend.rank == null) return 0;
    if (firstFriend.rank == null) return 1;
    if (secondFriend.rank == null) return -1;
    return firstFriend.rank - secondFriend.rank;
  });

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

export default function DashboardPage() {
  const { student, challenge } = dashboardData;
  const [standingOpen, setStandingOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [nudgedFriends, setNudgedFriends] = useState([]);
  const standingTriggerRef = useRef(null);
  const profileTriggerRef = useRef(null);
  const timeLeft = useMidnightCountdown();
  const progressPercent = Math.round((student.currentDay / student.totalDays) * 100);
  const completedPercent = (student.completedDays / student.totalDays) * 100;
  const journey = useMemo(() => [9, 10, 11, 12, 13].map((day) => ({
    day,
    state: day < student.currentDay ? "done" : day === student.currentDay ? "today" : "upcoming"
  })), [student.currentDay]);

  useEffect(() => {
    if (!standingOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeAndRestoreFocus = () => {
      setStandingOpen(false);
      setSelectedProfile(null);
      window.requestAnimationFrame(() => standingTriggerRef.current?.focus());
    };
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (selectedProfile) {
        setSelectedProfile(null);
        window.requestAnimationFrame(() => profileTriggerRef.current?.focus());
        return;
      }
      closeAndRestoreFocus();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProfile, standingOpen]);

  const closeStanding = () => {
    setStandingOpen(false);
    setSelectedProfile(null);
    window.requestAnimationFrame(() => standingTriggerRef.current?.focus());
  };

  const openProfile = (profile, event) => {
    profileTriggerRef.current = event.currentTarget;
    setSelectedProfile(profile);
  };

  const closeProfile = () => {
    setSelectedProfile(null);
    window.requestAnimationFrame(() => profileTriggerRef.current?.focus());
  };

  const sendConnectionRequest = (profileId) => {
    setConnectionRequests((current) => current.includes(profileId) ? current : [...current, profileId]);
  };

  const sendNudge = (friendId) => {
    setNudgedFriends((current) => current.includes(friendId) ? current : [...current, friendId]);
  };

  return (
    <div className="dashboard-page">
      <a className="skip-link" href="#dashboardMain">Skip to dashboard</a>
      <SiteHeader />

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
            <section className="standing-card" aria-labelledby="standingTitle">
              <div className="standing-card__icon" aria-hidden="true">↗</div>
              <div>
                <p className="dashboard-overline">Your Standing</p>
                <h2 id="standingTitle">Top {student.standingPercent}%</h2>
                <p><strong>#{student.rank}</strong> of {student.totalStudents} students</p>
              </div>
              <button className="standing-view-more" type="button" ref={standingTriggerRef} onClick={() => setStandingOpen(true)} aria-haspopup="dialog">
                View more <span aria-hidden="true">→</span>
              </button>
            </section>
            <section className="profile-nudge" id="profile"><div><h2>Profile ready</h2><p>Your challenge progress is connected to Shivam.</p></div><Link to="/">ABTalks home</Link></section>
          </aside>
        </div>
      </main>

      {standingOpen && (
        <div className="leaderboard-modal" onMouseDown={(event) => event.target === event.currentTarget && closeStanding()}>
          <section className="leaderboard-dialog" role="dialog" aria-modal="true" aria-labelledby="leaderboardTitle" aria-describedby="leaderboardDescription" aria-hidden={selectedProfile ? true : undefined} inert={selectedProfile ? true : undefined}>
            <header className="leaderboard-dialog__header">
              <div>
                <p className="dashboard-overline dashboard-overline--blue">Community leaderboard</p>
                <h2 id="leaderboardTitle">Rankings & submissions</h2>
                <p id="leaderboardDescription">See standout work and check how your friends are doing today.</p>
              </div>
              <button className="leaderboard-close" type="button" onClick={closeStanding} aria-label="Close rankings" autoFocus>×</button>
            </header>

            <section className="leaderboard-section" aria-labelledby="topSubmissionsTitle">
              <div className="leaderboard-section__heading">
                <div><p className="dashboard-overline">Today</p><h3 id="topSubmissionsTitle">Top submissions</h3></div>
                <span>Day {challenge.day}</span>
              </div>
              <ol className="top-submissions">
                {topSubmissions.map((submission) => (
                  <li key={submission.rank}>
                    <span className={`submission-rank submission-rank--${submission.rank}`} aria-label={`Rank ${submission.rank}`}>#{submission.rank}</span>
                    <div><strong>{submission.name}</strong><span>{submission.title}</span></div>
                    <button className="submission-action" type="button" onClick={(event) => openProfile(submission, event)} aria-haspopup="dialog">View submission <span aria-hidden="true">→</span></button>
                  </li>
                ))}
              </ol>
            </section>

            <section className="leaderboard-section" aria-labelledby="friendsRankingTitle">
              <div className="leaderboard-section__heading">
                <div><p className="dashboard-overline">Your circle</p><h3 id="friendsRankingTitle">Friends ranking</h3></div>
                <span>{friendStandings.filter((friend) => friend.submitted).length} submitted</span>
              </div>
              <ul className="friends-ranking">
                {friendStandings.map((friend) => (
                    <li key={friend.name}>
                      <span className={`friend-avatar${friend.isCurrentUser ? " is-current-user" : ""}`} aria-hidden="true">{friend.initials}</span>
                      <div className="friend-details"><span className="friend-name"><strong>{friend.name}</strong>{friend.isCurrentUser && <em>You</em>}</span><span className={friend.submitted ? "is-submitted" : "is-pending"}>{friend.submitted ? `Rank #${friend.rank} · Submitted` : "Submission pending"}</span></div>
                      {friend.submitted ? (
                        <button className="friend-action friend-action--link" type="button" onClick={(event) => openProfile(friend, event)} aria-haspopup="dialog">View submission <span aria-hidden="true">→</span></button>
                      ) : (
                        <button className={`friend-action friend-action--nudge${nudgedFriends.includes(friend.id) ? " is-sent" : ""}`} type="button" onClick={() => sendNudge(friend.id)} disabled={nudgedFriends.includes(friend.id)} aria-live="polite">
                          {nudgedFriends.includes(friend.id) ? "Sent successfully ✓" : "Nudge"}
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
              <p className="leaderboard-note"><span aria-hidden="true">ⓘ</span> Nudge is sent inside ABTalks and updates here instantly.</p>
            </section>
          </section>

          {selectedProfile && (
            <div className="profile-popup-layer" onMouseDown={(event) => event.target === event.currentTarget && closeProfile()}>
              <section className="submission-profile-dialog" role="dialog" aria-modal="true" aria-labelledby="submissionProfileTitle" aria-describedby="submissionProfileAbout">
                <header className="submission-profile-header">
                  <span className="submission-profile-avatar" aria-hidden="true">{selectedProfile.initials}</span>
                  <div>
                    <p className="dashboard-overline dashboard-overline--blue">Student profile</p>
                    <h2 id="submissionProfileTitle">{selectedProfile.name}</h2>
                    <p>{selectedProfile.isCurrentUser ? "Your profile" : `Rank #${selectedProfile.rank}`} · Day {challenge.day} submitted</p>
                  </div>
                  <button className="leaderboard-close" type="button" onClick={closeProfile} aria-label={`Close ${selectedProfile.name}'s profile`} autoFocus>×</button>
                </header>

                <div className="submission-profile-about">
                  <p className="dashboard-overline">About</p>
                  <p id="submissionProfileAbout">{selectedProfile.about}</p>
                </div>

                <article className="submission-profile-project">
                  <div><p className="dashboard-overline">Day {challenge.day} submission</p><h3>{selectedProfile.title}</h3></div>
                  <a href={selectedProfile.submissionHref} target="_blank" rel="noreferrer">Open submission <span aria-hidden="true">↗</span></a>
                </article>

                <div className="submission-profile-links" aria-label={`${selectedProfile.name}'s links`}>
                  <a href={selectedProfile.githubHref} target="_blank" rel="noreferrer"><span aria-hidden="true">GH</span><strong>GitHub</strong><small>View profile</small></a>
                  <a href={selectedProfile.linkedinHref} target="_blank" rel="noreferrer"><span aria-hidden="true">in</span><strong>LinkedIn</strong><small>View profile</small></a>
                </div>

                <footer className="submission-profile-footer">
                  {selectedProfile.isCurrentUser ? (
                    <span className="profile-self-label"><span aria-hidden="true">✓</span> This is you</span>
                  ) : (
                    <button className={`profile-connect${connectionRequests.includes(selectedProfile.id) ? " is-sent" : ""}`} type="button" onClick={() => sendConnectionRequest(selectedProfile.id)} disabled={connectionRequests.includes(selectedProfile.id)}>
                      {connectionRequests.includes(selectedProfile.id) ? "Request sent ✓" : "+ Connect"}
                    </button>
                  )}
                </footer>
              </section>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
