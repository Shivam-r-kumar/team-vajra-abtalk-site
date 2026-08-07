# ABTalks Redesign — AI Prompt History

## Project
ABTalks 60-Day Coding Challenge — Student Experience Redesign

## AI-Assisted Development
AI tools were used for:
- Product and UX ideation
- Mobile-first layout planning
- Landing page implementation
- Dashboard implementation
- Challenge-day implementation
- Responsive design
- Light and dark mode
- CSS organization
- UI refinement

> Note: This log contains prompts that were actually used during development.
> Exact timestamps were not manually recorded for some earlier prompts, so they are marked as "Not captured" instead of using fabricated timestamps.

---

# Prompt 01 — Initial Product Direction

**Timestamp:** Not captured  
**Tool:** ChatGPT / AI design planning

## Prompt

We are redesigning the ABTalks website for a hackathon.

ABTalks runs a 60-day coding challenge for Indian college students.

Students build something every day and submit:
- a GitHub commit
- a LinkedIn post

The redesign must feel simple, elegant, premium, intentional, and human-designed.

It should not look obviously AI-generated.

The product is primarily used on mobile phones, especially by students late at night after college.

The judges will inspect the website at approximately 390px width.

We need to build three routes:

/
 /dashboard
 /day/12

Use a carefully coordinated light color palette with blue as the primary accent, warm orange/yellow only for streak and motivation states, soft green for successful/completed states, clean typography, generous spacing, subtle borders, and minimal clutter.

The design must prioritize:
- clarity
- trust
- motivation
- mobile usability
- student experience

---

# Prompt 02 — Landing Page Design

**Timestamp:** Not captured  
**Route:** `/`

## Prompt

Build ONLY the landing page (`/`) for the ABTalks 60-Day Coding Challenge.

Use the supplied reference image as the primary visual reference.

The page should preserve the same:
- light premium visual language
- typography hierarchy
- spacing
- card treatment
- blue accent system
- subtle orange motivation details
- clean white/off-white surfaces

Do not completely redesign the reference.

The landing page is for a student who has never heard of ABTalks.

Within a few seconds, the student should understand:

- what ABTalks is
- what the 60-day challenge is
- how it works
- why they should join

The experience should create:

- trust
- clarity
- motivation

Use ONLY:

- HTML5
- CSS3
- Vanilla JavaScript

Do not use frameworks or a backend.

Design mobile-first for approximately 390px width.

The hero should communicate:

"Build for 60 Days.
Become Impossible to Ignore."

Supporting copy should explain that Indian college students build every day, submit GitHub and LinkedIn proof of work, and develop consistency, portfolio strength, and visibility.

Include:

- ABTalks logo
- 60-Day Challenge badge
- Join the 60-Day Challenge CTA
- See how it works CTA
- Daily Builds
- GitHub Proof
- LinkedIn Visibility
- How It Works
- Why Students Join
- Why 60 Days?
- Built for Late-Night Builders
- Final motivational CTA

Keep everything clean and restrained.

Do not create:
- excessive gradients
- random floating cards
- heavy glassmorphism
- neon UI
- generic AI SaaS visuals

---

# Prompt 03 — Navigation Refinement

**Timestamp:** Not captured  
**Route:** `/`

## Prompt

Keep the approved landing-page design.

Use the official supplied ABTalks logo.

Add easy navigation without changing the visual direction.

Navbar should include:

- Home
- About
- Dashboard
- Light/Dark mode toggle

On desktop, navigation can appear normally.

On mobile around 390px:
- logo on the left
- theme toggle
- compact menu if needed

Do not overcrowd the mobile navbar.

Home should represent the current page.

About should scroll to the informational section.

Dashboard should navigate to:

/dashboard

Keep the navbar simple, elegant, and consistent with the approved landing page.

---

# Prompt 04 — Light and Dark Theme

**Timestamp:** Not captured

## Prompt

Add complete light and dark mode support while preserving the approved ABTalks visual identity.

Light mode should use:

- warm off-white background
- white cards
- dark navy/charcoal text
- refined royal/deep blue primary accent
- muted gray secondary text
- warm orange only for streak/motivation
- soft green for completion/success
- subtle borders and shadows

Dark mode should feel like the same product.

Use:
- deep charcoal/navy background
- slightly elevated dark surfaces
- soft off-white text
- controlled blue accent
- muted secondary text
- orange for streak
- green for success

Avoid:
- neon
- cyberpunk purple
- excessive glow
- heavy glassmorphism

Use Vanilla JavaScript.

Theme behavior:
- respect system preference initially
- allow manual toggle
- save selected theme in localStorage
- preserve theme after refresh

---

# Prompt 05 — Student Dashboard

**Timestamp:** Not captured  
**Route:** `/dashboard`

## Prompt

Continue the existing ABTalks 60-Day Coding Challenge redesign project.

Build ONLY the student dashboard:

/dashboard

Do not redesign or modify the approved landing page.

Reuse:
- ABTalks logo
- typography
- color system
- CSS variables
- spacing
- buttons
- cards
- light/dark theme
- overall visual language

The approved visual direction is:

- simple
- elegant
- premium
- human-designed
- clean
- restrained
- student-focused
- not obviously AI-generated

Use ONLY:

- HTML5
- CSS3
- Vanilla JavaScript

Do NOT introduce:

- React
- Next.js
- Vue
- Tailwind
- Bootstrap
- jQuery
- backend
- database
- authentication
- component frameworks

Work inside the existing project structure.

This dashboard is MOBILE-FIRST.

The judges will primarily inspect it around:

390px width

Optimize especially for:

390 × 844
390 × 900

Desktop is secondary.

At 390px:

- absolutely no horizontal scrolling
- no tiny cards
- no crowded statistics
- no desktop layout squeezed into mobile
- large tap targets
- comfortable spacing
- strong hierarchy
- today's task should be immediately obvious

The user should understand what to do next within 3 seconds.

ABTalks runs a 60-day coding challenge for Indian college students.

Every day students:

1. complete a coding/build challenge
2. push proof to GitHub
3. share their progress on LinkedIn
4. maintain their learning streak

The dashboard is the student's home screen after login.

Its most important job is answering:

"What should I do today?"

Secondary information:

- Current streak
- Progress through 60 days
- Today's challenge
- Journey
- Achievements
- Student standing

Do NOT overload the dashboard.

Priority hierarchy:

1. Today's challenge
2. Current progress
3. Streak
4. Journey
5. Achievements
6. Standing

Use realistic mocked data:

Name:
Shivam

Current Day:
12

Total Days:
60

Completed Days:
11

Current Streak:
11

Today's Challenge:
Build a Responsive Portfolio Website

Difficulty:
Intermediate

Estimated Time:
~45 min

Rank:
142

Total Students:
820

Standing:
Top 18%

Projects Built:
10

Create a compact mobile header.

Left:
ABTalks official logo from the existing project.

Right:
theme toggle and simple profile control.

The dashboard should include:

- greeting
- Day 12 of 60
- 11-day streak
- challenge progress
- Today's Challenge card
- Continue Day 12 CTA
- Your Journey
- achievements
- student standing
- compact mobile bottom navigation

---

# Prompt 06 — Midnight Rescue Feature

**Timestamp:** Not captured  
**Route:** `/dashboard`

## Prompt

Add a thoughtful feature called:

"Midnight Rescue"

Many ABTalks students complete their daily challenge late at night after college.

The feature should gently remind the student how much time remains before midnight.

Example:

"Finish today's challenge before midnight to protect your streak."

"2h 14m left today"

Use Vanilla JavaScript to calculate the actual local time remaining until midnight.

Do not create a huge anxiety-inducing countdown.

The feature should feel supportive, subtle, and useful.

Use orange only as a small streak/motivation accent.

Dark mode should make this experience comfortable for late-night use.

---

# Prompt 07 — Dashboard Edge Cases

**Timestamp:** Not captured

## Prompt

Make the dashboard architecture support realistic edge cases through mocked JavaScript data.

FIRST DAY / NO STREAK

Example:

currentDay: 1
completedDays: 0
currentStreak: 0

Do not display:

"0 Day Streak"

Instead show:

"Your first streak starts today."

CTA:

"Start Day 1"

MISSED DAY

Show a supportive message:

"You missed yesterday, but your journey isn't over."

"Start today's challenge and keep moving."

Do not shame the student.
Do not use aggressive red warning styling.

EMPTY PROFILE

If the student's name is missing, use:

"Good evening 👋"

Optionally show:

"Complete your profile"

The page must not break.

---

# Prompt 08 — CSS Architecture Refactor

**Timestamp:** Not captured  
**Tool:** VS Code AI Chat

## Prompt

Inspect the current ABTalks project in this workspace before making any changes.

Right now multiple pages are using the same CSS file.

Refactor the styling so every page has its own CSS file while keeping only truly shared styles in one global stylesheet.

Target structure:

css/
├── global.css
├── landing.css
├── dashboard.css
└── challenge.css

global.css should contain only genuinely shared styles:

- reset
- box sizing
- base typography
- CSS variables
- light/dark theme variables
- shared colors
- spacing
- radii
- shadows
- shared buttons
- form basics
- theme toggle
- focus/accessibility styles

landing.css should contain styles specific to:

/

dashboard.css should contain styles specific to:

/dashboard

challenge.css should contain styles specific to:

/day/12

Do not redesign anything.

Do not visually change the approved landing page or dashboard.

Do not duplicate the entire old stylesheet into multiple files.

Actually separate styles according to responsibility.

Each page should load:

global.css
+
its own page stylesheet.

After refactoring verify:

- `/` looks unchanged
- `/dashboard` looks unchanged
- light mode works
- dark mode works
- theme persistence works
- 390px layout works
- no horizontal overflow
- navigation still works

Make changes directly in the workspace.

---

# Prompt 09 — Challenge Day Page

**Timestamp:** Not captured  
**Route:** `/day/12`

## Prompt

Continue the existing ABTalks redesign project.

Build ONLY:

/day/12

Do not redesign or modify:

/
or
/dashboard

Reuse the existing:

- ABTalks logo
- typography
- colors
- spacing
- CSS variables
- button system
- light/dark theme
- overall visual language

Use ONLY:

- HTML5
- CSS3
- Vanilla JavaScript

The page is MOBILE-FIRST and should be optimized especially for approximately 390px width.

The hierarchy should be:

Challenge
↓
Mission
↓
Requirements
↓
Streak motivation
↓
Proof of Work
↓
Submit

Header:

- back to dashboard
- ABTalks logo

Challenge:

Day 12 of 60

Build a Responsive Portfolio Website

Intermediate
~45 min

Today's Mission:

"Create a clean, modern, mobile-friendly portfolio that showcases your projects, skills, and provides easy ways for people to contact you."

What You'll Build:

- Hero section with name and short introduction
- Projects section with at least 2 projects
- Skills section highlighting top skills
- Contact section
- Mobile-responsive layout

Include a small "You're done when" section explaining:

- project works correctly on mobile
- code is pushed to GitHub
- progress is shared publicly on LinkedIn

Include streak motivation:

"Complete today to extend your streak to 12 days"

Use a subtle time-remaining indicator.

Proof of Work requires two fields:

1. GitHub repository / commit URL
2. LinkedIn post URL

Use proper labels and URL inputs.

Validate with Vanilla JavaScript.

GitHub:
- required
- valid URL
- github.com domain

LinkedIn:
- required
- valid URL
- linkedin.com domain

Display inline validation errors.

Do not use alert().

Primary CTA:

"Submit Day 12"

After successful validation, show a polished success state:

"Day 12 Complete"

"12 Day Streak"

"You showed up today."

Add:

"Back to Dashboard"

Use localStorage to preserve the mocked Day 12 completion state after refresh.

Do not add:
- chat
- AI assistant
- leaderboard
- comments
- authentication
- backend
- code editor
- unnecessary features

Keep the experience focused.

---

# Prompt 10 — 390px UI Refinement

**Timestamp:** Not captured

## Prompt

Review the current ABTalks implementation specifically at exactly 390px width.

Do not add new features or sections.

Refine only:

- typography
- spacing
- visual hierarchy
- alignment
- card sizing
- button sizing
- touch targets
- mobile navigation
- challenge prominence
- form field sizing
- timeline sizing
- dark/light theme consistency

Remove anything that feels unnecessary or like generic AI-generated UI.

The result should feel like a designer manually refined every spacing and typography decision.

Verify:

- no horizontal overflow
- no clipped content
- no tiny touch targets
- consistent page padding
- clean vertical rhythm
- readable text
- usable forms
- consistent design across all three routes

Routes:

/
/dashboard
/day/12

---

# Prompt 11 — Project Implementation / Vibe Coding Context

**Timestamp:** Not captured  
**Tool:** Codex / VS Code AI Agent

## Prompt

Act as the primary development partner for the ABTalks redesign project.

Inspect the existing workspace before changing files.

You may:
- create files
- modify files
- reorganize code
- debug issues
- improve responsive behavior
- test layouts

Work incrementally.

Do not:
- push to GitHub unless explicitly instructed
- introduce unnecessary frameworks
- introduce backend/database/authentication
- remove useful existing work without reason

Primary requirement:

Build a polished mobile-first experience for approximately 390px width.

Prioritize:

1. clarity
2. usability
3. visual consistency
4. realistic student experience
5. performance
6. accessibility

Keep the implementation understandable and maintainable.

---

# Prompt 12 — Prompt History Documentation

**Timestamp:** 2026-08-08 01:15 IST  
**Tool:** ChatGPT

## Prompt

Create a clean prompt history for `prompt/prompt.md` using the actual prompts used during the ABTalks redesign process.

Include:
- project direction
- landing page
- navigation
- theme system
- student dashboard
- Midnight Rescue
- edge cases
- CSS refactor
- challenge-day page
- mobile refinement
- development workflow

Do not fabricate previous timestamps.

Use the current timestamp only where it is actually known.

---

## Current Required Routes

```text
/
/dashboard
/day/12