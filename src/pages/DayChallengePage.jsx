import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";

const challenge = {
  day: 12,
  title: "Build a Responsive Portfolio Website",
  difficulty: "Intermediate",
  time: "~45 min",
  brief: "Create a responsive portfolio that introduces you, showcases your best work, and makes it easy for someone to contact you.",
  requirements: [
    "A clear introduction and short about section",
    "At least three project cards with links",
    "Skills and contact sections",
    "A responsive layout that works at 390px",
    "A public GitHub repository and live preview"
  ]
};

function getSavedCompletion() {
  try {
    return localStorage.getItem("abtalks-day-12-complete") === "true";
  } catch (error) {
    return false;
  }
}

export default function DayChallengePage() {
  const [completed, setCompleted] = useState(getSavedCompletion);
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  useEffect(() => {
    document.title = `Day ${challenge.day}: ${challenge.title} — ABTalks`;
    return () => { document.title = "ABTalks — 60-Day Coding Challenge"; };
  }, []);

  function completeChallenge(event) {
    event.preventDefault();
    setCompleted(true);
    try {
      localStorage.setItem("abtalks-day-12-complete", "true");
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
            <div className="day-hero__eyebrow"><span>Day {challenge.day} of 60</span><span>{completed ? "Completed" : "Today"}</span></div>
            <h1 id="challengeTitle">{challenge.title}</h1>
            <p>{challenge.brief}</p>
            <div className="challenge-meta" aria-label="Challenge details"><span><span className="meta-dot" aria-hidden="true" />{challenge.difficulty}</span><span><span className="meta-clock" aria-hidden="true" />{challenge.time}</span></div>
          </div>
          <div className="day-hero__status" aria-label="Current challenge status">
            <span className="day-status__number">12</span>
            <div><strong>{completed ? "Day complete" : "Ready to build"}</strong><p>{completed ? "Your proof is saved in this browser." : "One focused session. Ship something real."}</p></div>
          </div>
        </section>

        <div className="day-layout">
          <div className="day-primary">
            <section className="day-section" aria-labelledby="requirementsTitle">
              <p className="dashboard-overline">The brief</p>
              <h2 id="requirementsTitle">What to build</h2>
              <p className="day-section__intro">Keep the design personal and restrained. The goal is a useful portfolio, not a collection of effects.</p>
              <ul className="requirement-list">
                {challenge.requirements.map((requirement) => <li key={requirement}><span aria-hidden="true">✓</span>{requirement}</li>)}
              </ul>
            </section>

            <section className="day-section" aria-labelledby="workflowTitle">
              <p className="dashboard-overline">Your workflow</p>
              <h2 id="workflowTitle">Build. Push. Share.</h2>
              <ol className="workflow-list">
                <li><span>01</span><div><h3>Build the portfolio</h3><p>Start mobile-first, then refine the wider layout.</p></div></li>
                <li><span>02</span><div><h3>Push to GitHub</h3><p>Use a clear README and include the live preview link.</p></div></li>
                <li><span>03</span><div><h3>Share your progress</h3><p>Write a short LinkedIn post about one thing you learned.</p></div></li>
              </ol>
            </section>
          </div>

          <aside className="submission-card" aria-labelledby="submissionTitle">
            <div className="submission-card__head"><p className="dashboard-overline">Proof of work</p><h2 id="submissionTitle">Finish Day 12</h2><p>Demo submission — links stay on this device.</p></div>
            {completed ? (
              <div className="completion-state" role="status"><span aria-hidden="true">✓</span><h3>Nice work, Shivam.</h3><p>Your Day 12 progress is marked complete on this device.</p><Link className="btn btn-primary" to="/dashboard">Return to dashboard</Link></div>
            ) : (
              <form className="submission-form" onSubmit={completeChallenge}>
                <label htmlFor="githubUrl">GitHub repository</label>
                <input id="githubUrl" type="url" placeholder="https://github.com/…" value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} required />
                <label htmlFor="linkedinUrl">LinkedIn progress post</label>
                <input id="linkedinUrl" type="url" placeholder="https://linkedin.com/posts/…" value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} required />
                <button className="btn btn-primary" type="submit">Mark Day 12 Complete <span aria-hidden="true">→</span></button>
                <p className="submission-note">No account or backend is connected in this demo.</p>
              </form>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
