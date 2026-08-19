# Architecture & Design Decisions

### 1. Why this approach over building a synthetic project from scratch?

Instead of building a artificial toy app or starter template, I chose to redesign **Shivangikam Sangeet Kala Kendra**—a real-world dance and music academy website I built from scratch about two weeks ago, before this assignment was assigned. 

Redesigning an existing product forced me to solve real UX and technical constraints (working with actual course structures, media assets, branding, and navigation flows) rather than designing idealized UI blocks with lorem ipsum text. It provided a grounded context to evaluate what was lacking in the initial build—specifically hero section engagement, clear course discovery, and lead conversion—and implement targeted improvements on top of a functional codebase.

### 2. Trade-offs under the time limit & what I'd build with a full week

**Trade-off made:** To deliver a polished homepage within the time limit, I focused strictly on visual hierarchy, interactive UI components, responsive layout tuning, and frontend state management. I relied on static configuration for course cards and media feeds rather than completing a fully integrated CMS backend for real-time schedule management.

**What I'd do with a full week:** 
- Build a dynamic CMS integration so academy instructors can update course schedules, fees, and workshop dates without redeploying code.
- Implement an automated media optimization pipeline for high-resolution dance video embeds and gallery imagery (using next/image loader optimization and responsive srcset generation) to eliminate layout shifts and minimize initial bundle size on low-bandwidth mobile devices.
- Add comprehensive end-to-end integration tests (Playwright) covering trial class booking form validation and mobile navigation.

### 3. AI Tool (Antigravity) Usage & Personal Verification

The codebase and redesign were built by me. I used AI tools (Antigravity) exclusively when resolving bug fixes during dedicated bug-fixing git commits. 

Specifically:
- **Database Connection Retries (`badb3d8`):** When handling PgBouncer connection pooling errors, I used AI to assist in drafting retry logic for the Prisma client. Afterward, I personally reviewed the code to ensure backoff retry loops had maximum attempt caps and did not swallow unhandled connection timeouts.
- **Security & Route Guard Fixes (`df8789e`):** I used AI assistance to audit session check logic and remove hardcoded fallback JWT secrets. I personally verified the fix by writing manual test requests to route handlers using invalid tokens to confirm open redirects were blocked and unauthenticated requests correctly returned `401 Unauthorized`.
- **Media & UI Bug Fixes (`7f6df52`, `cdb7f7b`):** When fixing aspect-ratio layout shifts on video embeds and broken image paths, I used AI to inspect CSS rules, but personally tested and verified rendering performance across mobile and desktop viewports in the browser.
