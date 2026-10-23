# শিখুন (Shikhun) — Bengali E-Learning Platform

A vibrant, human-crafted Bengali e-learning platform inspired by modern digital academies, tailored for Bangladeshi learners pursuing freelancing, programming, and creative design careers. Features gamified interactive quizzes, structured video/PDF milestone tracking, collaborative student community discussions, and an intuitive Super Admin control suite.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and design choices have been aligned with your preferences and the design constitution:

- **Confirmed Domain & Curriculum**: High-growth career skills — Full-Stack Web Development with React/Node, UI/UX Design with Figma, Freelancing Masterclass (Upwork/Fiverr), and Graphic & Motion Design.
- **Confirmed Gamification Engine**: Dual-layer system combining daily study streaks, XP points, level progression, and live leaderboards with milestone unlock checkpoints and downloadable course certificates upon quiz completion.
- **Confirmed Brand Identity**: **শিখুন (Shikhun)** — Vibrant, youthful, clean, avoiding heavy pill badges, dark fat borders, or aggressive bolding.
- **Confirmed Bengali Typography**: Google Font **Hind Siliguri** (হিন্দ শিলিগুড়ি) integrated with balanced line heights, 65–75ch comfortable reading measure, and zero italic skewing.
- **Single Super Admin Architecture**: Dedicated admin console toggleable for testing, providing full CRUD control over courses, chapters, video links, attached PDFs, quiz authoring, student milestone tracking, and discussion moderation.

---

### 1. Overview & Core Concept

- **What It Does**: Provides Bangladeshi students and career switchers with an end-to-end learning environment in natural, fluent Bengali. Students enroll in multiple courses, stream video lessons, review companion PDF lecture notes, take gamified chapter quizzes to earn XP and unlock consecutive lessons, track progress milestones, and collaborate on a course-specific community forum.
- **Target Audience / Persona**: Bangladeshi students, college graduates, and young professionals seeking hands-on freelancing, programming, and design skills taught in clear Bengali without unnecessary jargon.
- **Key Value**: A fast, distraction-free learning experience with breathable layouts, authentic native Bengali typography, real progress momentum through gamified challenges, and administrative agility for course instructors.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Discovery & Enrollment**: Students browse curated career tracks (Programming, UI/UX, Freelancing), view detailed syllabi with lesson breakdowns, instructor credentials, and prerequisite lists, and click "কোর্সে যুক্ত হোন" (Enroll Now) to add to their active dashboard.
2. **Interactive Classroom & Milestone Player**:
   - Clean 16:9 responsive video player with lecture progress scrub-points.
   - Resource drawer switching seamlessly between **লেকচার নোটস (Lecture Notes)**, **পিডিএফ রিসোর্স (PDF Guides & Slides)**, **আলোচনা (Lesson Discussion)**, and **কুইজ টেস্ট (Gamified Quiz)**.
   - Milestone checklist marking completed modules with instant visual feedback and next-lesson unlocking.
3. **Gamified Daily Quiz & XP Engine**:
   - Interactive timed and untimed Bengali quizzes with instant feedback, explanation modals, XP reward animations, streak counters, and leaderboard rankings.
   - Certificate generation preview when completing 100% of milestones and final exam.
4. **Community Discussion Board**:
   - Filter by course, ask questions with code/design context, reply to peers, and mark helpful answers.
5. **Super Admin Management Console**:
   - High-level overview: total enrolled students, course completion rates, active community topics.
   - Course & Content Editor: add/edit courses, upload/embed video links, attach downloadable PDFs, configure quiz questions and pass marks.
   - Student Milestone Inspector: search students, check module progress, inspect quiz scores, and reset milestones if requested.
   - Community Moderation: pin announcements or remove spam questions.

#### Visual Identity & Theme
- **Aesthetic Direction**: Vibrant, airy, purposeful, and breathable. Soft hairline dividers (`border-slate-100` and `border-slate-200`), comfortable padding (`px-6 py-8`), subtle soft corners (`rounded-lg`, 8px radius maximum, avoiding balloon bubbles or pill shapes).
- **Color Palette (60-30-10 discipline)**:
  - *60% Dominant Neutral Canvas*: Crisp off-white (`#FBFBFD` / `#F8FAFC`) with pure white card surfaces (`#FFFFFF`).
  - *30% Structural Surfaces & Typography*: Soft slate cards (`#F1F5F9`), hairline borders (`#E2E8F0`), deep slate primary text (`#0F172A`), and calm neutral secondary text (`#64748B`).
  - *10% Vibrant Focal Accents*: Electric Emerald (`#10B981` / `#059669`) for progress, learning success, and XP; Royal Indigo/Violet (`#4F46E5`) for primary brand actions and course track highlights; Warm Amber (`#F59E0B`) for daily streak flames.
- **Typography & Bengali Hierarchy**:
  - Primary Font: **Hind Siliguri** (`Hind Siliguri, sans-serif`) with fallback to system sans.
  - Heading Weights: Regular 500 and SemiBold 600 only (prohibiting aggressive black/extra-bold fonts everywhere).
  - Body Text: Regular 400 with 1.6 line height for effortless Bengali glyph reading (avoiding cramped diacritic marks / hoshonto / ref).
  - Code/Numbers: `tabular-nums` with clean sans numerals for timers, scores, and rankings.
- **Anti-Slop Restraints**:
  - No pill badge sandwiches; metadata rendered with clean typographic dots (`·`).
  - No thick colored left accent bars (`border-l-4`).
  - No decorative pulsing dots or fake version engine tickers.
  - Strict top bar contract: 1-line Brand wordmark, 4 concise single-line nav items, 1 student profile/admin toggle.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native Bengali First with Hind Siliguri Font**
  - *Chosen Approach*: Dynamic Google Font injection with dedicated typographic rules for Bengali conjuncts and diacritics. All UI micro-copy, navigation, course lessons, and quiz questions will be presented in natural Bengali.
  - *Why*: Ensures culturally authentic learning without awkward literal machine translations.
- **Decision 2: Comprehensive In-Memory & LocalStorage State Architecture**
  - *Chosen Approach*: Reactive state layer preloaded with realistic course catalogs, lessons, mock video streams, downloadable PDF assets, interactive community discussions, and student profile progress, synchronized with `localStorage`.
  - *Why*: Enables instant, latency-free user testing, switching between student and super-admin personas without server setup hurdles, while persisting changes across page reloads.
- **Decision 3: Gamified Quiz Mechanics with Checkpoints**
  - *Chosen Approach*: Progressive milestone unlocks — quizzes cannot be skipped to unlock the next module unless passing criteria are met. XP points increment dynamically with celebratory sound/haptic visual cues.
  - *Why*: Directly fulfills user request to keep students engaged during their daily learning sessions while preventing passive video skimming.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [শিখুন Shikhun]  ──  [সকল কোর্স · আমার ক্লাসরুম · কমিউনিটি · লিডারবোর্ড]  ──  [রোল পরিবর্তন / প্রোফাইল]
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴───────────────────────────┐
         ▼                                                      ▼
┌──────────────────────────────────┐   ┌────────────────────────────────┐
│         Student Classroom        │   │       Super Admin Panel        │
│ ┌──────────────────────────────┐ │   │ ┌────────────────────────────┐ │
│ │ Course Catalog & Enrolled    │ │   │ │ Overview & Student Metrics │ │
│ ├──────────────────────────────┤ │   │ ├────────────────────────────┤ │
│ │ Video Player & PDF Viewer    │ │   │ │ Course & Lesson Manager    │ │
│ ├──────────────────────────────┤ │   │ ├────────────────────────────┤ │
│ │ Interactive Quiz & XP Engine │ │   │ │ Quiz & Certificate Builder │ │
│ ├──────────────────────────────┤ │   │ ├────────────────────────────┤ │
│ │ Community Forum & Q&A        │ │   │ │ Community Discussion Mod   │ │
│ └──────────────────────────────┘ │   │ └────────────────────────────┘ │
└─────────────────┬────────────────┘   └────────────────┬───────────────┘
                  │                                     │
                  └──────────────────┬──────────────────┘
                                     ▼
        ┌─────────────────────────────────────────────────────────┐
        │                Unified Reactive State Layer              │
        │ - Enrolled Courses, Progress Milestones & XP Records    │
        │ - Course Curriculum (Chapters, Videos, PDFs, Quizzes)   │
        │ - Gamification Store (Streaks, Badges, Leaderboard)     │
        │ - Community Board Threads, Replies & Upvotes            │
        │ - Super Admin Permissions & Mutation Handlers           │
        └─────────────────────────────────────────────────────────┘
```

#### Key Data Entities
1. `Course`: `id`, `titleBn`, `subtitleBn`, `category`, `instructor`, `duration`, `thumbnailUrl`, `enrolledCount`, `rating`, `chapters[]`.
2. `Chapter` & `Lesson`: `id`, `titleBn`, `duration`, `videoUrl`, `summaryBn`, `pdfResourceUrl`, `pdfTitle`, `quiz?`.
3. `Quiz`: `id`, `titleBn`, `passPercentage`, `xpReward`, `questions[{ questionBn, optionsBn[], correctIndex, explanationBn }]`.
4. `StudentProgress`: `courseId`, `completedLessonIds[]`, `quizScores{}`, `milestoneStatus`, `totalXp`, `streakDays`, `certificateUnlocked`.
5. `CommunityThread`: `id`, `courseId`, `authorName`, `authorAvatar`, `date`, `titleBn`, `contentBn`, `upvotes`, `replies[]`.
6. `AdminMetrics`: `activeStudents`, `totalEnrollments`, `avgCompletionRate`, `pendingDiscussions`.
