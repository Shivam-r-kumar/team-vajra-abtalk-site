import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DomainPicker from "../components/DomainPicker";
import SiteHeader from "../components/SiteHeader";
import { useDomain } from "../domain";
import { communityData, getChallengeForDay, getStudentSubmission, studentData } from "../data";

const achievementIcons = { fire: "🔥", medal: "🏅", laptop: "💻" };

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
  const student = studentData;
  const { domains, activeDomain, selectedDomainId, hasSelectedDomain, selectDomain } = useDomain();
  const [domainPickerOpen, setDomainPickerOpen] = useState(!hasSelectedDomain);
  const [standingOpen, setStandingOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [nudgedFriends, setNudgedFriends] = useState([]);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [selectedJourneyDay, setSelectedJourneyDay] = useState(null);
  const standingTriggerRef = useRef(null);
  const profileTriggerRef = useRef(null);
  const journeyTriggerRef = useRef(null);
  const journeyDayTriggerRef = useRef(null);
  const timeLeft = useMidnightCountdown();
  const completedCount = student.completedDays.length;
  const challenge = useMemo(() => getChallengeForDay(activeDomain, student.currentDay), [activeDomain, student.currentDay]);
  const communityProfiles = useMemo(() => {
    const profiles = Object.fromEntries(communityData.profiles.map((profile) => [profile.id, profile]));
    const latestSubmission = getStudentSubmission(student.completedDays.at(-1));
    profiles[student.slug] = {
      id: student.slug,
      name: student.name,
      initials: student.initials,
      rank: student.rank,
      title: challenge.title,
      about: student.profile.about,
      githubHref: student.profile.githubHref,
      linkedinHref: student.profile.linkedinHref,
      submissionHref: latestSubmission?.repositoryUrl || student.profile.githubHref,
      submitted: true,
      isCurrentUser: true
    };
    return profiles;
  }, [challenge.title, student]);
  const topSubmissions = useMemo(() => communityData.topSubmissionIds.map((id) => communityProfiles[id] ? { ...communityProfiles[id], title: challenge.title } : null).filter(Boolean), [challenge.title, communityProfiles]);
  const friendStandings = useMemo(() => communityData.friendIds
    .map((id) => communityProfiles[id])
    .filter(Boolean)
    .map((profile) => profile.submitted ? { ...profile, title: challenge.title } : profile)
    .sort((firstFriend, secondFriend) => {
      if (firstFriend.rank == null && secondFriend.rank == null) return 0;
      if (firstFriend.rank == null) return 1;
      if (secondFriend.rank == null) return -1;
      return firstFriend.rank - secondFriend.rank;
    }), [challenge.title, communityProfiles]);
  const journeyRecords = useMemo(() => activeDomain.challenges.slice(0, student.historyDays).map((item) => {
    const submission = getStudentSubmission(item.day);
    return {
      ...item,
      done: student.completedDays.includes(item.day),
      isToday: item.day === student.currentDay,
      submissionHref: submission?.repositoryUrl || null
    };
  }), [activeDomain, student]);
  const progressPercent = Math.round((student.currentDay / student.totalDays) * 100);
  const completedPercent = (completedCount / student.totalDays) * 100;
  const journey = useMemo(() => Array.from({ length: 5 }, (_, index) => Math.max(1, student.currentDay - 3) + index)
    .filter((day) => day <= student.totalDays)
    .map((day) => ({
      day,
      state: student.completedDays.includes(day) ? "done" : day === student.currentDay ? "today" : "upcoming"
    })), [student.completedDays, student.currentDay, student.totalDays]);

  const chooseDomain = (domainId) => {
    selectDomain(domainId);
    setDomainPickerOpen(false);
  };

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

  useEffect(() => {
    if (!journeyOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeAndRestoreFocus = () => {
      setJourneyOpen(false);
      setSelectedJourneyDay(null);
      window.requestAnimationFrame(() => journeyTriggerRef.current?.focus());
    };
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (selectedJourneyDay) {
        setSelectedJourneyDay(null);
        window.requestAnimationFrame(() => journeyDayTriggerRef.current?.focus());
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
  }, [journeyOpen, selectedJourneyDay]);

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

  const openJourney = (event) => {
    journeyTriggerRef.current = event.currentTarget;
    setJourneyOpen(true);
  };

  const closeJourney = () => {
    setJourneyOpen(false);
    setSelectedJourneyDay(null);
    window.requestAnimationFrame(() => journeyTriggerRef.current?.focus());
  };

  const openJourneyDay = (record, event) => {
    journeyDayTriggerRef.current = event.currentTarget;
    setSelectedJourneyDay(record);
  };

  const closeJourneyDay = () => {
    setSelectedJourneyDay(null);
    window.requestAnimationFrame(() => journeyDayTriggerRef.current?.focus());
  };

  return (
    <div className="dashboard-page">
      <a className="skip-link" href="#dashboardMain">Skip to dashboard</a>
      <SiteHeader />

      <main className="dashboard-shell dashboard-main" id="dashboardMain">
        <section className="dashboard-greeting" aria-labelledby="greetingTitle">
          <div>
            <p className="dashboard-overline">Student dashboard</p>
            <h1 id="greetingTitle">Good evening{student.displayName ? `, ${student.displayName}` : ""} <span aria-hidden="true">👋</span></h1>
            <p>{student.missedYesterday ? "You missed yesterday, but your journey isn’t over. Start today and keep moving." : "Keep showing up. Great things take time."}</p>
          </div>
          <div className="dashboard-greeting__actions">
            <p className="dashboard-date">{new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(new Date())}</p>
            <button className="domain-switch" type="button" onClick={() => setDomainPickerOpen(true)} aria-haspopup="dialog"><span aria-hidden="true">{activeDomain.symbol}</span><b>{activeDomain.name}</b><small>Change</small></button>
          </div>
        </section>

        <div className="dashboard-layout">
          <div className="dashboard-primary">
            <section className="today-section" id="today" aria-labelledby="todayTitle">
              <p className="dashboard-overline dashboard-overline--blue">Today’s challenge</p>
              <article className="challenge-card">
                <div className="challenge-card__content">
                  <div className="challenge-day-row"><div className="challenge-card__chips"><span className="day-chip">Day {challenge.day}</span><span className="domain-chip">{activeDomain.shortName}</span></div><span className="challenge-status"><span aria-hidden="true" /> Ready when you are</span></div>
                  <h2 id="todayTitle">{challenge.title}</h2>
                  <div className="challenge-meta" aria-label="Challenge details"><span><span className="meta-dot" aria-hidden="true" />{challenge.difficulty}</span><span><span className="meta-clock" aria-hidden="true" />{challenge.estimatedTime}</span></div>
                  <p className="challenge-description">{challenge.brief}</p>
                  <Link className="btn btn-primary challenge-cta" to={`/day/${challenge.day}`}>Continue Day {challenge.day}<span className="cta-arrow" aria-hidden="true">→</span></Link>
                </div>
                <div className="challenge-visual" aria-hidden="true">
                  <div className="visual-browser"><div className="visual-browser__bar"><i /><i /><i /></div><div className="visual-browser__body"><span className="visual-kicker" /><span className="visual-title" /><span className="visual-title visual-title--short" /><div className="visual-grid"><i /><i /><i /></div></div></div>
                  <div className="visual-phone"><i /><span /><span /><span /></div><div className="visual-code">{activeDomain.symbol}</div>
                </div>
              </article>
            </section>

            <section className="progress-card" aria-labelledby="progressTitle">
              <div className="progress-card__header">
                <p className="progress-kicker" id="progressTitle">Your progress</p>
                <button type="button" onClick={openJourney} aria-haspopup="dialog">View more <span aria-hidden="true">→</span></button>
              </div>
              <div className="progress-summary">
                <div className="progress-ring" style={{ "--progress": progressPercent }} role="progressbar" aria-label="Challenge progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progressPercent}>
                  <div className="progress-ring__inner"><span>Day</span><strong>{student.currentDay}</strong><small>of {student.totalDays}</small></div>
                </div>
                <div className="progress-copy"><p className="streak-line"><span aria-hidden="true">🔥</span>{student.currentStreak ? `${student.currentStreak} Day Streak` : "Your first streak starts today"}</p><p className="progress-encouragement">You’re building real momentum.</p></div>
              </div>
              <div className="linear-progress"><div className="linear-progress__labels"><strong>{progressPercent}% complete</strong><span>{completedCount} completed days</span></div><div className="linear-progress__track" role="progressbar" aria-label="Days completed" aria-valuemin="0" aria-valuemax={student.totalDays} aria-valuenow={completedCount}><span style={{ width: `${completedPercent}%` }} /></div></div>
            </section>

            <section className="rescue-card" aria-labelledby="rescueTitle">
              <div className="rescue-icon" aria-hidden="true"><span className="rescue-moon" /></div>
              <div className="rescue-copy"><h2 id="rescueTitle">Midnight Rescue</h2><p>Finish today’s challenge before midnight to protect your streak.</p></div>
              <a className="rescue-time" href="#today" aria-label={`${timeLeft}. Go to today’s challenge`}>{timeLeft}</a>
            </section>

            <section className="journey-section" id="journey" aria-labelledby="journeyTitle">
              <div className="section-heading-row"><div><p className="dashboard-overline">{activeDomain.name}</p><h2 id="journeyTitle">Your Journey</h2></div><div className="journey-heading-actions"><span>{completedCount} / {student.totalDays} days</span><button type="button" onClick={openJourney} aria-haspopup="dialog">View more <span aria-hidden="true">→</span></button></div></div>
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
                {student.achievements.map((achievement) => <article className={`achievement achievement--${achievement.style}`} key={achievement.id}><span className="achievement__icon" aria-hidden="true">{achievementIcons[achievement.icon]}</span><p><strong>{achievement.title}</strong><span>{achievement.description}</span></p></article>)}
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
            <section className="profile-nudge" id="profile"><div><h2>Profile ready</h2><p>{student.id} · {activeDomain.name}</p></div><Link to="/">ABTalks home</Link></section>
          </aside>
        </div>
      </main>

      {domainPickerOpen && <DomainPicker domains={domains} currentDomainId={selectedDomainId} onSelect={chooseDomain} onClose={() => setDomainPickerOpen(false)} required={!hasSelectedDomain} />}

      {standingOpen && (
        <div className="leaderboard-modal" onMouseDown={(event) => event.target === event.currentTarget && closeStanding()}>
          <section className="leaderboard-dialog" role="dialog" aria-modal="true" aria-labelledby="leaderboardTitle" aria-describedby="leaderboardDescription" aria-hidden={selectedProfile ? true : undefined} inert={selectedProfile ? true : undefined}>
            <header className="leaderboard-dialog__header">
              <div>
                <p className="dashboard-overline dashboard-overline--blue">Community leaderboard</p>
                <h2 id="leaderboardTitle">Rankings & submissions</h2>
                <p id="leaderboardDescription">See standout {activeDomain.name} work and check how your friends are doing today.</p>
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

      {journeyOpen && (
        <div className="journey-modal" onMouseDown={(event) => event.target === event.currentTarget && closeJourney()}>
          <section className="journey-dialog" role="dialog" aria-modal="true" aria-labelledby="journeyDialogTitle" aria-describedby="journeyDialogDescription" aria-hidden={selectedJourneyDay ? true : undefined} inert={selectedJourneyDay ? true : undefined}>
            <header className="journey-dialog__header">
              <div><p className="dashboard-overline dashboard-overline--blue">30-day · {activeDomain.name}</p><h2 id="journeyDialogTitle">Your challenge journey</h2><p id="journeyDialogDescription">Select any day to see its challenge and submission record.</p></div>
              <button className="leaderboard-close" type="button" onClick={closeJourney} aria-label="Close journey record" autoFocus>×</button>
            </header>

            <div className="journey-record-summary"><span><i className="is-done" /> {journeyRecords.filter((record) => record.done).length} done</span><span><i className="is-pending" /> {journeyRecords.filter((record) => !record.done).length} not done</span></div>

            <ol className="journey-calendar" aria-label="First 30 challenge days">
              {journeyRecords.map((record) => (
                <li key={record.day}>
                  <button className={`journey-calendar__day ${record.done ? "is-done" : "is-not-done"}${record.isToday ? " is-today" : ""}`} type="button" onClick={(event) => openJourneyDay(record, event)} aria-haspopup="dialog" aria-label={`Day ${record.day}, ${record.done ? "done" : "not done"}. View challenge details.`}>
                    <span>{record.day}</span><strong>Day {record.day}</strong><small>{record.done ? "Done" : "Not done"}</small>
                  </button>
                </li>
              ))}
            </ol>
          </section>

          {selectedJourneyDay && (
            <div className="journey-detail-layer" onMouseDown={(event) => event.target === event.currentTarget && closeJourneyDay()}>
              <section className="journey-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="journeyDayTitle" aria-describedby="journeyDayDescription">
                <header>
                  <div><p className="dashboard-overline dashboard-overline--blue">Day {selectedJourneyDay.day} challenge</p><span className={`journey-detail-status ${selectedJourneyDay.done ? "is-done" : "is-not-done"}`}>{selectedJourneyDay.done ? "✓ Done" : "Not done"}</span></div>
                  <button className="leaderboard-close" type="button" onClick={closeJourneyDay} aria-label={`Close Day ${selectedJourneyDay.day} details`} autoFocus>×</button>
                </header>
                <div className="journey-detail-copy"><h2 id="journeyDayTitle">{selectedJourneyDay.title}</h2><p id="journeyDayDescription">{selectedJourneyDay.brief}</p></div>
                <div className="journey-detail-meta"><span>Day {selectedJourneyDay.day} of {student.totalDays}</span><span>{selectedJourneyDay.done ? "Proof submitted" : selectedJourneyDay.isToday ? "Today’s challenge" : "Submission pending"}</span></div>
                <footer>
                  {selectedJourneyDay.submissionHref ? <a href={selectedJourneyDay.submissionHref} target="_blank" rel="noreferrer">View submission <span aria-hidden="true">↗</span></a> : <button type="button" disabled>View submission</button>}
                  {!selectedJourneyDay.submissionHref && <small>No submission yet for this challenge.</small>}
                </footer>
              </section>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
