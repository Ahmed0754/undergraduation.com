import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });

import admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID!;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");
  admin.initializeApp({ credential: admin.credential.cert({ projectId, clientEmail, privateKey }) });
}
const db = admin.firestore();

const statuses = ["Exploring","Shortlisting","Applying","Submitted"] as const;
const countries = ["USA","India","Pakistan","UK","Canada","UAE","Bangladesh"];

function rand<T>(arr:T[]) { return arr[Math.floor(Math.random()*arr.length)]; }
function randBool(p=0.5){ return Math.random()<p; }
function days(n:number){ const d = new Date(); d.setDate(d.getDate()-n); return d; }

async function main() {
  for (let i=1;i<=30;i++){
    const name = i%3===0? `Aarav Mehta ${i}` : i%3===1? `Zara Khan ${i}` : `Ethan Li ${i}`;
    const studentRef = await db.collection("students").add({
      name,
      email: `${name.toLowerCase().replace(/\s+/g,'.')}@example.com`,
      phone: "+1 917 555 01" + String(30+i),
      grade: 12,
      country: rand(countries),
      status: rand(statuses),
      lastActive: days(Math.floor(Math.random()*14)),
      highIntent: randBool(0.35),
      needsEssayHelp: randBool(0.4)
    });

    for (let k=0;k<3;k++){
      await db.collection("interactions").add({
        studentId: studentRef.id,
        type: rand(["login","ai_question","doc_upload"]),
        meta: k===1 ? { question: "CommonApp prompt brainstorming" } : {},
        timestamp: days(Math.floor(Math.random()*14))
      });
    }

    for (let c=0;c<2;c++){
      await db.collection("communications").add({
        studentId: studentRef.id,
        channel: rand(["email","sms","call"]),
        subject: "Follow-up",
        message: "Checking progress on essays.",
        direction: "outbound",
        timestamp: days(Math.floor(Math.random()*10))
      });
    }

    await db.collection("notes").add({
      studentId: studentRef.id,
      note: "Promising candidate, needs essay scaffolding.",
      createdBy: "admin@undergraduation.com",
      timestamp: days(1)
    });

    await db.collection("reminders").add({
      studentId: studentRef.id,
      title: "Send essay outline resources",
      dueAt: days(-2),
      assignedTo: "ops@undergraduation.com",
      status: "open"
    });
  }
  console.log("Seed complete ✅");
}

main().catch(e=>{ console.error(e); process.exit(1); });
