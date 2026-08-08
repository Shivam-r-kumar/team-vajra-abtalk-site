# ABTalks 60-Day Coding Challenge

## Project Links

| Resource | Link |
| --- | --- |
| Prompt history | [View `prompt.md`](./prompt/prompt.md) |
| Vercel live site | [team-vajra-abtalk-site.vercel.app](https://team-vajra-abtalk-site.vercel.app/) |
| GitHub repository | [Shivam-r-kumar/team-vajra-abtalk-site](https://github.com/Shivam-r-kumar/team-vajra-abtalk-site) |

## About the Project

This is a responsive React application for the ABTalks 60-Day Coding Challenge. It helps students build consistently, submit proof of work, track their progress, and stay connected with other learners.

The project includes a public landing page, a student dashboard, and a dedicated Day 12 challenge page.

## Main Features

### Landing Page

- Explains the purpose of the 60-day challenge.
- Shows how the daily Build, Push, and Share routine works.
- Introduces ABTalks, founder Anil Bajpai, and the community's learning goals.
- Includes direct links to the official ABTalks and founder LinkedIn profiles.
- Uses a responsive layout that works on mobile, tablet, and desktop screens.

### Student Dashboard

- Displays the student's current challenge, streak, completed days, and overall progress.
- Shows achievements such as the first-week milestone and total projects built.
- Includes a live countdown to midnight to help the student protect their streak.
- Provides a direct link to continue the current challenge.

### Personalised Learning Domains

- A first-visit popup asks the student to select Claude AI Mastery, Software Engineering, Data Science, or Artificial Intelligence.
- The choice is saved once on the device and can be changed later from the dashboard.
- Today's task and the complete 30-day history update for the selected domain.
- Every domain contains 30 separate challenge titles and descriptions.

### Challenge Submission

- The student can open the Day 12 challenge and review its requirements.
- A portfolio reference image is available and opens in a larger popup when clicked.
- The `Submit Your Work` button moves the student directly to the proof-of-work form.
- The student can submit a GitHub repository link and a LinkedIn progress-post link.
- Submitted proof is saved in the current browser and remains available after refresh.
- The student can reopen saved links or edit the submission.

### 30-Day Progress History

- `View more` is available in both the progress card and journey section.
- It opens a 30-day history with individual day circles.
- Every day is marked as done or not done.
- Clicking a day opens its challenge title, description, completion state, and submission status.
- Completed days include a `View submission` link.

### Ranking and Community

- The dashboard displays the student's rank and overall standing.
- `View more` opens the community leaderboard.
- The leaderboard shows top submissions for the current challenge.
- Friends are arranged in ascending rank order.
- The current student also appears in the friends list with a `You` label.
- Submitted friends have a `View submission` action.
- Their profile popup shows their About section, GitHub, LinkedIn, submission, and Connect option.
- Friends who have not submitted can be nudged inside the platform.
- After clicking `Nudge`, the button immediately confirms that the message was sent successfully.

### Theme and Responsive Design

- Dark mode is the default theme.
- Users can switch between dark and light modes.
- The selected theme is saved in the browser.
- Separate logo versions keep the ABTalks branding clear in both themes.
- The interface is designed to work at a 390px mobile width as well as on larger screens.

## User Flow

1. Open the landing page and learn about the challenge.
2. Enter the student dashboard.
3. Review the current challenge, progress, streak, and ranking.
4. Open Day 12 and complete the portfolio task.
5. Submit GitHub and LinkedIn proof of work.
6. Return to the dashboard and review the 30-day journey or community leaderboard.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page and About section |
| `/dashboard` | Student progress, ranking, achievements, and journey |
| `/day/12` | Day 12 challenge and proof-of-work submission |

Unknown routes automatically return to the home page. Direct route refreshes work on Vercel through the SPA rewrite in `vercel.json`.

## Technology

- React 19
- React Router
- Vite 8
- JavaScript and JSX
- Custom responsive CSS
- Browser local storage
- Vercel hosting

The current project does not require a backend, database, or environment variables.

## Run the Project Locally

### Requirements

- Node.js 24.x
- npm
- Git

### Installation

```bash
git clone https://github.com/Shivam-r-kumar/team-vajra-abtalk-site.git
cd team-vajra-abtalk-site
npm install
npm run dev
```

Open the local address shown in the terminal. By default, the project runs at:

```text
http://127.0.0.1:3000/
```

Do not open `index.html` directly. The application should be started through Vite with `npm run dev`.

## Production Build

```bash
npm run build
npm run preview
```

The production build is generated inside the `dist` folder.

## Important Project Files

```text
src/pages/LandingPage.jsx       Landing page and About content
src/pages/DashboardPage.jsx     Dashboard, ranking, profiles, and history
src/pages/DayChallengePage.jsx  Day 12 task and submission form
src/components/SiteHeader.jsx   Shared navigation
src/theme.jsx                   Dark/light theme handling
src/domain.jsx                  Saved domain selection and active track
src/data/student.json           Student ID, day, achievements, rank, and submissions
src/data/community.json         Friends and leaderboard profiles
src/data/domains.json           Four domains with 30 challenges each
css/styles.css                  Global and landing-page styles
dashboard/dashboard.css         Dashboard and popup styles
src/app.css                     Day 12 challenge styles
public/assets/                  Logos, founder image, and task reference
prompt/prompt.md                Timestamped prompt history
vercel.json                     Vercel build and route configuration
```

## Saved Browser Data

The demo saves only the following information:

- Selected dark or light theme
- Selected learning domain
- Day 12 completion status
- Submitted GitHub link
- Submitted LinkedIn link

Nudges and connection requests are demonstration interactions and reset after a page refresh.

## Vercel Deployment

Use these settings when importing the repository into Vercel:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `./` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

The output directory must be `dist`, not `client`.

## Current Demo Scope

- Only Day 12 currently has a complete challenge page.
- The journey popup shows 30 domain-specific challenges.
- Student, ranking, achievement, and friend data are sample data stored in the React code.
- Submission proof is stored only in the current browser.
- Nudge and Connect actions show the intended experience but are not connected to a real messaging service or backend.

These features can later be connected to authentication, a database, and real ABTalks community accounts.
