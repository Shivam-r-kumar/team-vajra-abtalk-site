import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import { useDomain } from "../domain";
import { getChallengeForDay, studentData } from "../data";

function getSavedSubmission(storageKey, allowLegacyData) {
  try {
    const storedSubmission = JSON.parse(localStorage.getItem(storageKey) || (allowLegacyData ? localStorage.getItem("abtalks-day-12-submission") : null));
    if (storedSubmission) {
      return {
        completed: Boolean(storedSubmission.completed),
        githubUrl: storedSubmission.githubUrl || "",
        linkedinUrl: storedSubmission.linkedinUrl || ""
      };
    }
    return {
      completed: allowLegacyData && localStorage.getItem("abtalks-day-12-complete") === "true",
      githubUrl: "",
      linkedinUrl: ""
    };
  } catch (error) {
    return { completed: false, githubUrl: "", linkedinUrl: "" };
  }
}

export default function DayChallengePage() {
  const { activeDomain } = useDomain();
  const challenge = useMemo(() => getChallengeForDay(activeDomain, studentData.currentDay), [activeDomain]);
  const submissionStorageKey = `abtalks-${activeDomain.id}-day-${challenge.day}-submission`;
  const isSoftwareDomain = activeDomain.id === "software-engineering";
  const [savedSubmission] = useState(() => getSavedSubmission(submissionStorageKey, isSoftwareDomain));
  const [completed, setCompleted] = useState(savedSubmission.completed);
  const [githubUrl, setGithubUrl] = useState(savedSubmission.githubUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(savedSubmission.linkedinUrl);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const referenceTriggerRef = useRef(null);

  useEffect(() => {
    document.title = `Day ${challenge.day}: ${challenge.title} — ABTalks`;
    return () => { document.title = "ABTalks — 60-Day Coding Challenge"; };
  }, [challenge.day, challenge.title]);

  useEffect(() => {
    if (!referenceOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setReferenceOpen(false);
      window.requestAnimationFrame(() => referenceTriggerRef.current?.focus());
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [referenceOpen]);

  function closeReference() {
    setReferenceOpen(false);
    window.requestAnimationFrame(() => referenceTriggerRef.current?.focus());
  }

  function completeChallenge(event) {
    event.preventDefault();
    setCompleted(true);
    try {
      localStorage.setItem(submissionStorageKey, JSON.stringify({ completed: true, domainId: activeDomain.id, day: challenge.day, githubUrl, linkedinUrl }));
      if (isSoftwareDomain) localStorage.setItem("abtalks-day-12-complete", "true");
    } catch (error) {
      // Completion still works for the current session.
    }
  }

  return (
    <div className="day-page">
      <a className="skip-link" href="#dayMain">Skip to challenge</a>
      <SiteHeader />

      <main className="day-shell day-main" id="dayMain">
        <Link className="day-back" to="/dashboard"><span aria-hidden="true">←</span> Back to dashboard</Link>

        <section className="day-hero" aria-labelledby="challengeTitle">
          <div className="day-hero__copy">
            <div className="day-hero__eyebrow"><span>Day {challenge.day} of {studentData.totalDays}</span><span>{activeDomain.name}</span><span>{completed ? "Completed" : "Today"}</span></div>
            <h1 id="challengeTitle">{challenge.title}</h1>
            <p>{challenge.brief}</p>
            <div className="challenge-meta" aria-label="Challenge details"><span><span className="meta-dot" aria-hidden="true" />{challenge.difficulty}</span><span><span className="meta-clock" aria-hidden="true" />{challenge.estimatedTime}</span></div>
            <a className="btn btn-primary day-submit-jump" href="#proofOfWork">Submit Your Work <span aria-hidden="true">↓</span></a>
          </div>
          <div className="day-hero__aside">
            {isSoftwareDomain ? <div className="day-reference-card">
              <button className="day-reference-trigger" type="button" ref={referenceTriggerRef} onClick={() => setReferenceOpen(true)} aria-haspopup="dialog" aria-label="Enlarge the portfolio reference image">
                <img src="/assets/day-12-portfolio-reference.png" alt="Reference design showing a responsive developer portfolio in desktop and mobile layouts" />
                <span className="day-reference-hint" aria-hidden="true">Click to enlarge <b>↗</b></span>
              </button>
            </div> : <div className={`day-domain-brief day-domain-brief--${activeDomain.id}`}><span aria-hidden="true">{activeDomain.symbol}</span><p>Selected domain</p><h2>{activeDomain.name}</h2><small>{activeDomain.description}</small></div>}
            <div className="day-hero__status" aria-label="Current challenge status">
              <span className="day-status__number">{challenge.day}</span>
              <div><strong>{completed ? "Day complete" : "Ready to build"}</strong><p>{completed ? "Your proof is saved in this browser." : isSoftwareDomain ? "Use the reference for direction, then make it your own." : "Follow the brief, test the result, and document what you learn."}</p></div>
            </div>
          </div>
        </section>

        <div className="day-layout">
          <div className="day-primary">
            <section className="day-section" aria-labelledby="requirementsTitle">
              <p className="dashboard-overline">The brief</p>
              <h2 id="requirementsTitle">What to build</h2>
              <p className="day-section__intro">Complete the core requirements, test the result, and publish clear proof of your work.</p>
              <ul className="requirement-list">
                {challenge.requirements.map((requirement) => <li key={requirement}><span aria-hidden="true">✓</span>{requirement}</li>)}
              </ul>
            </section>

            <section className="day-section" aria-labelledby="workflowTitle">
              <p className="dashboard-overline">Your workflow</p>
              <h2 id="workflowTitle">Build. Push. Share.</h2>
              <ol className="workflow-list">
                <li><span>01</span><div><h3>Build the challenge</h3><p>Follow the {activeDomain.shortName} brief and validate every requirement.</p></div></li>
                <li><span>02</span><div><h3>Push to GitHub</h3><p>Use a clear README and include the live preview link.</p></div></li>
                <li><span>03</span><div><h3>Share your progress</h3><p>Write a short LinkedIn post about one thing you learned.</p></div></li>
              </ol>
            </section>
          </div>

          <aside className="submission-card" id="proofOfWork" aria-labelledby="submissionTitle">
            <div className="submission-card__head"><p className="dashboard-overline">{activeDomain.name} · Proof of work</p><h2 id="submissionTitle">Finish Day {challenge.day}</h2><p>Demo submission — links stay on this device.</p></div>
            {completed ? (
              <div className="completion-state" role="status">
                <span aria-hidden="true">✓</span>
                <h3>Nice work, {studentData.displayName}.</h3>
                <p>Your Day {challenge.day} proof is saved on this device.</p>
                <div className="saved-proof-links">
                  {githubUrl ? <a href={githubUrl} target="_blank" rel="noreferrer">GitHub repository <span aria-hidden="true">↗</span></a> : null}
                  {linkedinUrl ? <a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn post <span aria-hidden="true">↗</span></a> : null}
                </div>
                <button className="btn btn-ghost" type="button" onClick={() => setCompleted(false)}>Edit Proof</button>
                <Link className="btn btn-primary" to="/dashboard">Return to dashboard</Link>
              </div>
            ) : (
              <form className="submission-form" onSubmit={completeChallenge}>
                <label htmlFor="githubUrl">GitHub repository</label>
                <input id="githubUrl" type="url" placeholder="https://github.com/…" value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} required />
                <label htmlFor="linkedinUrl">LinkedIn progress post</label>
                <input id="linkedinUrl" type="url" placeholder="https://linkedin.com/posts/…" value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} required />
                <button className="btn btn-primary" type="submit">Mark Day {challenge.day} Complete <span aria-hidden="true">→</span></button>
                <p className="submission-note">No account or backend is connected in this demo.</p>
              </form>
            )}
          </aside>
        </div>
      </main>

      {referenceOpen && isSoftwareDomain && (
        <div className="day-reference-modal" onMouseDown={(event) => event.target === event.currentTarget && closeReference()}>
          <section className="day-reference-dialog" role="dialog" aria-modal="true" aria-labelledby="referenceDialogTitle" aria-describedby="referenceDialogDescription">
            <header>
              <div><p className="dashboard-overline dashboard-overline--blue">Day 12 reference</p><h2 id="referenceDialogTitle">Responsive portfolio example</h2></div>
              <button type="button" onClick={closeReference} aria-label="Close reference image" autoFocus>×</button>
            </header>
            <div className="day-reference-dialog__image"><img src="/assets/day-12-portfolio-reference.png" alt="Full reference design showing a developer portfolio across desktop and mobile layouts" /></div>
            <p id="referenceDialogDescription">Use the layout for direction, then personalise the colours, copy and projects to make the portfolio yours.</p>
          </section>
        </div>
      )}
    </div>
  );
}
