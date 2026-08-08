# ABTalks 60-Day Coding Challenge

> **Team Note:** This project was originally planned as a team effort. During the development period, one of my team members faced an unexpected family situation and was unable to contribute. I therefore completed the current design, development, data structure, responsive testing, and deployment preparation independently. This note is included for transparent project evaluation.

## Project Links

| Resource | Link |
| --- | --- |
| Prompt history | [View `prompt.md`](./prompt/prompt.md) |
| Live website | [team-vajra-abtalk-site.vercel.app](https://team-vajra-abtalk-site.vercel.app/) |
| GitHub repository | [Shivam-r-kumar/team-vajra-abtalk-site](https://github.com/Shivam-r-kumar/team-vajra-abtalk-site) |

## Project Overview

The ABTalks 60-Day Coding Challenge is a personalised learning and consistency platform for students and early-career professionals. It turns a long coding challenge into a clear daily routine: choose a domain, complete one practical task, submit proof of work, and track progress.

The main idea behind the website is that every student should compete and grow within the domain they want to pursue instead of receiving the same challenge as everyone else. The current experience supports four learning tracks:

- Claude AI Mastery
- Software Engineering
- Data Science
- Artificial Intelligence

Once a student selects a domain, the dashboard, today's task, and 30-day challenge history automatically adapt to that choice.

## The Problem We Address

Students often start learning challenges but lose consistency because tasks are not personalised, progress is difficult to measure, and there is little community motivation. This platform brings all three elements together:

- **Personalised learning** through domain-specific challenges.
- **Visible progress** through streaks, achievements, and challenge history.
- **Healthy competition** through rankings, submissions, and community interactions.

## How the Experience Works

1. The student visits the landing page and learns about the 60-day challenge.
2. On the first dashboard visit, the student selects a learning domain.
3. The dashboard loads the student's domain-specific daily challenge and progress.
4. The student completes the task and submits GitHub and LinkedIn proof of work.
5. Progress, streaks, achievements, history, and ranking help the student stay consistent.

## Feature Highlights

### 1. Domain-Based Challenge Experience

The first-time domain popup lets the student choose the field in which they want to compete. The selection is saved on the device and can be changed later from the dashboard. Changing the domain updates today's challenge as well as the complete 30-day roadmap.

### 2. Personalised Student Dashboard

The dashboard provides a quick view of the student's current day, active challenge, selected domain, completion percentage, streak, achievements, student ID, and rank. This gives the student one central place to understand what to do next.

### 3. JSON-Driven Data

Student information, achievements, submissions, community profiles, and domain challenges are organised in JSON data files. The interface reads from this data so the same information stays consistent across the dashboard, challenge page, progress history, and ranking experience.

### 4. Daily Challenge and Proof of Work

Each challenge includes its title, description, difficulty, estimated time, requirements, and a visual reference where needed. The student can submit a GitHub repository and LinkedIn progress post as proof of work. Saved submission links can be viewed or edited later.

### 5. 30-Day Progress History

The progress and journey cards include a `View more` option. It opens a 30-day record showing completed, current, and upcoming days. Selecting a day reveals the challenge details and submission status for that specific day.

### 6. Ranking and Community Competition

The standing section shows the student's rank among other participants. Its detailed view includes top submissions and friends arranged by ascending rank. Students can inspect a participant's submission and profile, send a connection request, or nudge friends who have not submitted yet.

### 7. Streaks and Achievements

Daily streaks, progress percentages, completed-day counts, milestone badges, and a countdown to midnight encourage students to return and finish their work consistently.

### 8. Responsive Dark and Light Themes

Dark mode is the default experience, with an optional light theme. The layout, navigation, domain selection popup, challenge cards, and dashboard are responsive for desktop, tablet, and mobile screens, including a 390px viewport.

### 9. ABTalks Introduction

The landing page explains the ABTalks mission, introduces founder Anil Bajpai, and connects practical AI education with technology, leadership, career readiness, and community learning.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page, challenge introduction, and ABTalks information |
| `/dashboard` | Personalised challenge, progress, achievements, and ranking |
| `/day/12` | Challenge details and proof-of-work submission |

Direct route refreshes work on Vercel through the SPA rewrite configuration.

## Technology Used

- React 19
- React Router
- Vite 8
- JavaScript and JSX
- Custom responsive CSS
- JSON-based demo data
- Browser local storage
- Vercel deployment

## Project Structure

```text
src/pages/                 Main application pages
src/components/            Shared navigation and UI components
src/data/student.json      Student progress, rank, and achievements
src/data/community.json    Friends and leaderboard information
src/data/domains.json      Four domains with 30 challenges each
css/styles.css             Landing-page and global styling
dashboard/dashboard.css    Dashboard and popup styling
public/assets/             Logos, images, and challenge references
prompt/prompt.md           Timestamped development prompt history
vercel.json                Vercel build and SPA routing configuration
```

## Run Locally

```bash
git clone https://github.com/Shivam-r-kumar/team-vajra-abtalk-site.git
cd team-vajra-abtalk-site
npm install
npm run dev
```

Open the local URL shown in the terminal. The project must be started through Vite; opening `index.html` directly will not run the React application correctly.

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in the `dist` directory.

## Vercel Settings

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `./` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

## Current Demo Scope

This version demonstrates the complete product experience without a backend. Theme, domain selection, and proof-of-work data are stored in the current browser. Student, challenge, and leaderboard information use structured demo JSON. In a production version, these features can be connected to authentication, a database, real messaging, and official ABTalks student accounts.

## Presentation Summary

This project is more than a progress dashboard. It demonstrates how a coding challenge can become a personalised learning system where students compete in their chosen domain, build consistently, prove their work publicly, compare progress with peers, and develop an industry-ready portfolio over 60 days.
