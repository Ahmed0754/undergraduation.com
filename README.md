# Undergraduation Admin Dashboard (MVP)

**Last updated:** October 01, 2025

A lightweight, internal-facing CRM-style dashboard for tracking student engagement, application progress, communications, notes, and reminders. Built with **Next.js (App Router)** + **Tailwind** + **Firestore**. Email is **mocked** (no real sends).

> ✅ Deliverables ready: GitHub repo, Loom demo, README, and sample screenshots.

---

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TailwindCSS
- **Backend**: Next.js Route Handlers (serverless) + Firebase Admin SDK
- **Database**: Firestore
- **Auth**: (Optional for demo) Firebase Auth
- **Email**: Mocked via `/api/communications` (simulates Customer.io call)
- **Seed**: TypeScript script using Admin SDK

---

## Quick Start

1. **Install deps**
```bash
npm install
```

2. **Environment**
- Copy `.env.local.example` → `.env.local` and fill Firebase client + Admin service account values.

> For demo, set Firestore rules to allow read/write temporarily, then lock down after the Loom:
```
// Firestore rules (demo only)
allow read, write: if true;
```

3. **Seed sample data**
```bash
npm run seed
```

4. **Run**
```bash
npm run dev
# visit http://localhost:3000
```

---

## What’s Implemented

- **Dashboard**: Summary stats + quick filters links
- **Student Directory**: Search by name/email, filter by status, open profile
- **Student Profile**:
  - Basic info (name, email, phone, country)
  - Status → progress bar
  - Mocked **AI Summary**
  - **Communication**: log message + mock email trigger
  - **Notes**: add notes
  - **Reminders**: schedule a reminder
  - **Interaction Timeline**: placeholder (wire similarly to notes/communications)

**Collections used**:
- `students`, `interactions`, `communications`, `notes`, `reminders`

**Suggested indexes**:
- `students`: (status ASC, country ASC, lastActive DESC)
- `interactions/communications/notes`: (studentId ASC, timestamp DESC)
- `reminders`: (assignedTo ASC, dueAt ASC, status ASC)

---

## File Map (important bits)

```
src/
  app/
    api/
      summary/route.ts
      students/route.ts
      students/[id]/route.ts
      communications/route.ts
      notes/route.ts
      reminders/route.ts
      interactions/route.ts
    (components)/
      AISummary.tsx
      ProgressBar.tsx
      StatCards.tsx
      StatusBadge.tsx
    page.tsx
    layout.tsx
    globals.css
  lib/
    firebaseAdmin.ts
    firebaseClient.ts
    models.ts
    utils.ts
scripts/
  seed.ts
public/
  screenshots/
    dashboard.png
    students.png
```

---

## Loom Demo Script (≤ 5 min)

1. Intro (stack + goal)
2. Dashboard stats + quick filters
3. Students list → search “aarav”, filter “Applying”
4. Open a profile:
   - Progress bar
   - Add a note
   - Send **Mock Email** (toast/alert)
   - Schedule reminder
   - AI Summary (mocked explanation)
5. Close with how interactions/logs would be filled (already seeded)

---

## Notes & Next Steps

- Replace mock email with Customer.io call in `/api/communications`.
- Add Auth guard (Firebase Auth) if needed.
- Implement **Interaction Timeline** fetch (query last N interactions for student, sort by timestamp desc).
- Tighten Firestore rules for prod.

---

## Screenshots

- `public/screenshots/dashboard.png`
- `public/screenshots/students.png`

> Use these in the repo README and/or your Loom intro overlay.

---

## License

For assessment/demo purposes only.
