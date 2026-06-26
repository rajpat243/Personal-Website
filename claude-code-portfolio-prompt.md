# Claude Code Prompt — Rebuild Personal Site (React + Vite, multipage, animated)

> Run this from inside your existing site's repo. Before running: copy `Data_Resume.pdf` into the repo's `/public` folder so the resume download button works.

---

## Context

I have an existing one-page static personal website (the code is in this repo — explore it first). I want you to rebuild it as a **dynamic multipage React app**. The site's primary purpose is to **showcase my technical skills, projects, and experience** to recruiters and engineering teams. Preserve any content, copy, or visual identity worth keeping from the current site. Start by reading the current code and giving me a short summary of what exists, what's reusable (colors, fonts, copy, assets), and your migration plan. **Wait for my OK before scaffolding.**

## Tech stack

- **React + Vite**.
- **React Router** for multipage client-side routing.
- **Framer Motion** for animations (scroll-triggered reveals, page transitions, hover micro-interactions). Use `whileInView` / `useInView` for scroll effects.
- Styling: match the existing repo's approach; if it's bare, use [Tailwind CSS / CSS Modules — pick one].
- Static-deployable SPA, no backend required. Must build cleanly with `npm run build` and deploy to [Vercel / Netlify / GitHub Pages — pick one].

## Site structure (routes)

Shared responsive nav bar + footer across all pages:

1. **Home / Hero** (`/`) — name, headline, tagline, primary CTAs (View Projects / Download Resume), animated intro, and a prominent **skills showcase** section (this is the focus of the site).
2. **About** (`/about`) — bio, education, coursework, activities/leadership.
3. **Experience & Certifications** (`/experience`) — work timeline + AWS certifications badge grid.
4. **Projects / Portfolio** (`/projects`) — project cards with descriptions, tech tags, metrics, and GitHub links.
5. **Contact** (`/contact`) — contact links, a resume download button, optional `mailto:` contact form (no backend).

## Animation requirements (mix of subtle + bold)

- **Subtle (default everywhere):** fade-and-rise reveals on scroll for sections/cards, smooth route transitions, gentle hover states on buttons/cards/links, a sticky nav that condenses on scroll.
- **Bold (used sparingly):** an attention-grabbing hero (e.g., staggered text reveal or animated gradient/canvas background), one scroll-driven signature element (parallax, scroll progress indicator, or staggered card entrances on Projects), and an animated skills section (e.g., level indicators or staggered tech-tag reveals).
- Respect `prefers-reduced-motion`.
- Keep everything 60fps-smooth; prefer transform/opacity; avoid layout-thrashing effects.

## Design

- Reuse and modernize the existing site's palette/typography as a starting point; if bare, propose a clean, professional engineer-portfolio aesthetic and show me the direction first.
- Fully responsive (mobile-first), accessible (semantic HTML, keyboard nav, focus states, alt text, contrast), fast (lazy-load images, code-split routes).
- Per-route page titles + meta tags for SEO/sharing.

---

## Content to use

**Name:** Raj Patel

**Location:** East Hartford, CT

**Headline:** Associate Data Engineer @ Travelers

**Tagline (suggested, refine freely):** Data Engineer building ETL/ELT pipelines and bringing AI into enterprise analytics.

**About:**
B.S. in Computer Science (concentration in Software Engineering & Development) from the University of Connecticut, GPA 3.70/4.00. Associate Data Engineer at Travelers, designing data pipelines that power business analytics and integrating AI into enterprise applications. Comfortable across the stack — from ETL/ELT and data architecture to backend services and machine learning — with a strong foundation in software development and testing.

## Skills (group into categories; this section is the focus of the site)

- **Programming:** Python (Pandas, NumPy, Matplotlib), SQL (MySQL, PostgreSQL), NoSQL (MongoDB), JavaScript/TypeScript, C++, HTML/CSS
- **Frameworks & Libraries:** dbt, Spark, React.js, Node.js, Flask, REST APIs, Pytest, JUnit, Qlik Sense
- **Cloud & Tools:** AWS (Glue, Lambda, S3, EC2, Bedrock), Snowflake, Databricks, Azure AD, Docker, CI/CD, Git/GitHub/GitLab, VS Code, Postman
- **Methodologies:** ETL/ELT pipeline design, data architecture, system design, OOP, SDLC, Agile, Scrum, Kanban

## Experience (timeline)

**Associate Data Engineer — Travelers Insurance** · Hartford, CT · Jun 2025 – Present
- Designed and maintained ETL/ELT pipelines with dbt to ingest and transform data into Qlik Sense applications, enabling business partners to rapidly onboard new features and data sources.
- Built and deployed a Model Context Protocol (MCP) server integrating Claude AI into Qlik Sense applications, enabling natural-language querying of enterprise data assets and accelerating analyst workflows.
- Collaborated with business stakeholders to define data requirements, translate them into data models, and deliver scalable data architecture aligned with governance and security policies.
- Developed and optimized pipelines supporting real-time analytics dashboards, improving data freshness and reliability for downstream Qlik Sense consumers.

**Embedded Software Engineering Intern — General Dynamics Electric Boat** · Groton, CT · Jun 2024 – Jan 2025
- Developed and tested C++ utilities to validate embedded system functionality, applying structured unit test plans to ensure data accuracy, reliability, and compliance with system requirements.
- Conducted data-driven analysis of test results using Python and SQL, identifying performance gaps and delivering insights that improved system stability prior to integration.
- Collaborated in an Agile environment using Git, JIRA, and Confluence for version control and reproducible test documentation.

**End User IT Intern — iConnect** · Remote · May 2022 – Aug 2022
- Assisted in the successful migration of OSU Wexner Medical Center user data to the Azure cloud.

## Education

**University of Connecticut — Storrs** · B.S. Computer Science, Concentration in Software Engineering & Development · May 2025 · GPA 3.70/4.00
- Relevant coursework: Artificial Intelligence, Data Structures & Algorithms, Object-Oriented Programming, Principles of Databases, Cloud Computing, Mobile Application Development.
- Co-President, UConn BAPS Campus Fellowship.

## Certifications (display as a badge grid)

- **AWS Certified Developer – Associate** — Issued May 2026
- **AWS Certified Data Engineer – Associate** — Issued May 2026
- **AWS Certified AI Practitioner** — Issued Jan 2026
- **AWS Certified Cloud Practitioner** — Issued Nov 2025

## Projects (cards with tech tags, metrics, and GitHub links)

1. **AI-Powered Onboarding Assistant** (Hackathon) · Sept 2025
   - Built an AI onboarding platform that uses prior employee data to recommend role-appropriate permissions and SailPoint identity groups, reducing manual provisioning overhead.
   - Trained an AWS Bedrock Agent Core agent on synthetic employee and permissions data for natural-language Q&A, surfacing accurate access policies for new hires and team-switchers without IT escalation.
   - Integrated structured data pipelines to ingest, process, and query employee identity records as the agent's knowledge base.
   - Tech: AWS Bedrock Agent Core, Python, REST APIs, data pipelines. (No public repo for this one — present it as a full project card like the others, just without a GitHub link.)

2. **Real-Time Shark Tracking & Classification System** · Aug 2024 – May 2025 (UConn Senior Design)
   - Engineered real-time data pipelines using the ClusterDuck Protocol to transmit maritime sensor/movement data into OWL's cloud-based Data Management System.
   - Built and trained a CNN classifier (sharks vs. non-shark aquatic animals) achieving 85% accuracy on shark images and 80% overall.
   - Optimized the inference pipeline for edge deployment on the Coral Dev Board for real-time on-device classification.
   - Tech: Python, TensorFlow, CNN, TensorFlow Lite, Coral Dev Board, ClusterDuck Protocol.
   - GitHub: https://github.com/rajpat243/visual-shark-tracking

3. **The Clothes Exchange** · Jun 2025 – Jul 2025
   - MERN-stack online clothing store: browse, cart, user login, and secure Stripe checkout, with a K-Nearest Neighbors (KNN) model recommending similar products by price, description, and type.
   - Tech: MERN stack, KNN, Stripe.
   - GitHub: https://github.com/rajpat243/Online-Clothes-Store

4. **Airline Reservation System** · Mar 2024 – May 2024 (UConn)
   - Airline reservation system to add/search flights and find itineraries between airports filtered by lowest cost, earliest arrival, shortest flight time, and most comfort.
   - Tech: C++, UI.
   - GitHub: https://github.com/rajpat243/Airline-Reservation-system

5. **College Course Registration Clone** · Sep 2023 – Dec 2023 (UConn)
   - Course registration site with a Vue.js frontend and an AWS backend (Lambda + DynamoDB) connected via a REST API for responsive, scalable data storage and retrieval.
   - Tech: Vue.js, AWS Lambda, DynamoDB, REST API.
   - GitHub: https://github.com/rajpat243/College-registration-clone

## Contact / links

- Email: rajpat243@gmail.com
- LinkedIn: https://www.linkedin.com/in/rajpat243/
- GitHub: https://github.com/rajpat243
- Resume: use `Data_Resume.pdf` (placed in `/public`) as the main resume; wire a download button on Home + Contact.

---

## Workflow I want you to follow

1. Read the existing repo and report what's there + your migration plan. **Wait for my OK before scaffolding.**
2. Scaffold Vite + React + Router; set up the shared layout (nav + footer + page-transition wrapper).
3. Build pages one at a time, flagging anything that needs my input.
4. Add animations as a final polish pass once structure and content are solid.
5. Verify the production build succeeds and the site is responsive + accessible before finishing.

Ask me clarifying questions whenever something is ambiguous instead of guessing.
