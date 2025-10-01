# Undergraduation Admin Dashboard (MVP)

**Last updated:** October 01, 2025

A lightweight, internal-facing CRM-style dashboard for tracking student engagement, application progress, communications, notes, and reminders. Built with **Next.js (App Router)** + **Tailwind** + **Firestore**. Email is **mocked** (no real sends).

> Deliverables ready: GitHub repo, Loom demo, README, and sample screenshots.

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

### 1. Install deps
npm install


### 2. Environment
Copy `.env.local.example` → `.env.local` and fill Firebase client + Admin service account values.  

For demo, set Firestore rules to allow read/write temporarily, then lock down after the Loom:

// Firestore rules (demo only)
allow read, write: if true;



### 3. Seed sample data
npm run seed



### 4. Run
npm run dev

visit http://localhost:3000


---

## Firebase Setup (Full)

**A) Create a Firebase project**  
Go to https://console.firebase.google.com → Add project → name it (e.g., `undergraduatecom`).

**B) Enable Firestore**  
- Build → Firestore Database → Create database  
- Choose a region → Start in Test Mode (OK for demo; tighten later).

**C) Create a Web App (Client SDK)**  
- Project Settings → General → Your apps → Web  
- Register app → copy the config values (apiKey, authDomain, projectId, etc.)

**D) Create Service Account (Admin SDK)**  
- Project Settings → Service accounts → Generate new private key  
- This downloads a JSON key file. You will paste the values into `.env.local`.

**E) Environment Variables (`.env.local`)**

- **Client SDK (public, browser safe):**
  - `NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>`
  - `NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>`

- **Optional (Analytics):**
  - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<G-XXXXXXXXXX>`

- **Admin SDK (server-only):**
  - `FIREBASE_PROJECT_ID=<your-project-id>`
  - `FIREBASE_CLIENT_EMAIL=<service-account-email@<your-project-id>.iam.gserviceaccount.com>`
  - `FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_LINES_HERE\n-----END PRIVATE KEY-----\n"`


> Important: Keep the quotes around `FIREBASE_PRIVATE_KEY` and preserve the literal `\n` line breaks exactly as shown.

**F) (Optional) Enable Firebase Auth for login**  
- Build → Authentication → Get started  
- Add a provider (Email/Password or Google) if you want a gated demo.  
- This project does not require auth for the basic Loom demo.

**G) Create Composite Indexes (recommended)**  
Go to Firestore → Indexes → Composite → Add index (see list in “Firestore Indexes” below).

**H) Verify Connectivity**  
Run the dev server and open the debug endpoint:  
http://localhost:3000/api/_debug → should show your projectId and non-zero counts after seeding.

---

## What’s Implemented

- **Dashboard**: Summary stats + quick filters  
- **Student Directory**: Search by name/email, filter by status, open profile  
- **Student Profile**:
  - Basic info (name, email, phone, country)  
  - Status → progress bar  
  - Mocked AI Summary  
  - Communication: log message + mock email trigger  
  - Notes: add notes  
  - Reminders: schedule a reminder  
  - Interaction Timeline: placeholder (wire similarly to notes/communications)

**Collections used:**  
students, interactions, communications, notes, reminders

**Suggested indexes:**  
- students: (status ASC, country ASC, lastActive DESC)  
- interactions/communications/notes: (studentId ASC, timestamp DESC)  
- reminders: (assignedTo ASC, dueAt ASC, status ASC)

---

## File Map (important bits)
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

markdown
Copy code

---

## API Reference (Route Handlers)

- `GET /api/summary` → dashboard/navbar stats  
- `GET /api/students?q=&status=&filter=`  
  - filter ∈ notContacted7d | highIntent | needsEssayHelp  
- `POST /api/students` → create student (demo)  
- `GET /api/students/[id]` → single student (timestamps serialized)  
- `PATCH /api/students/[id]` → update student  
- `GET /api/interactions?studentId=&limit=` → interaction timeline (newest first)  
- `POST /api/communications` → log + mock email  
- `POST /api/notes` → add note  
- `POST /api/reminders` → schedule reminder  
- `GET /api/_debug` → quick projectId + collection presence check  

---

## Useful Commands
npm run dev # start Next.js locally
npm run seed # populate Firestore with demo data
npm run check # quick counts of all collections using Admin SDK

yaml
Copy code

---

## Firestore Indexes (Recommended)

Create in Firestore → Indexes → Composite → Add index:

- students: (status ASC, lastActive DESC)  
- students: (highIntent ASC, lastActive DESC)  
- students: (needsEssayHelp ASC, lastActive DESC)  
- communications: (studentId ASC, timestamp DESC)  
- interactions: (studentId ASC, timestamp DESC)

> Without these, the API falls back to a non-ordered query so things still work.

---

## Loom Demo Script (≤ 5 min)

1. Intro (stack + goal)  
2. Dashboard stats + quick filters  
3. Students list → search “aarav”, filter “Applying”  
4. Open a profile:  
   - Progress bar  
   - Add a note  
   - Send Mock Email (toast/alert)  
   - Schedule reminder  
   - AI Summary (mocked explanation)  
5. Close with how interactions/logs would be filled (already seeded)  

---

## Screenshots
- public/screenshots/dashboard.png  
- public/screenshots/students.png  

Use these in the repo README and/or your Loom intro overlay.

---

## License
For assessment/demo purposes only.












ChatGPT can make mistakes. Check important info.
