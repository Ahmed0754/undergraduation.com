import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const snap = await adminDb.collection("students").get();

    const byStatus: Record<string, number> = { Exploring:0, Shortlisting:0, Applying:0, Submitted:0 };
    let highIntent = 0;
    let needsEssayHelp = 0;

    snap.forEach(d => {
      const s = d.get("status");
      if (s && byStatus[s] !== undefined) byStatus[s]++;
      if (d.get("highIntent")) highIntent++;
      if (d.get("needsEssayHelp")) needsEssayHelp++;
    });

    const total = snap.size;
    const active = total;
    const essayStage = byStatus["Applying"] ?? 0;

    // notContacted7d = students with NO outbound comms in last 7d
    const since = new Date(); since.setDate(since.getDate() - 7);
    const comms = await adminDb.collection("communications").where("timestamp", ">=", since).get();
    const recentlyContacted = new Set(comms.docs.map(d => d.get("studentId")));
    const notContacted7d = total - Array.from(new Set(snap.docs.map(d=>d.id).filter(id => recentlyContacted.has(id)))).length;

    return NextResponse.json({
      totalStudents: total,
      activeStudents: active,
      essayStage,
      byStatus,
      highIntent,
      needsEssayHelp,
      notContacted7d
    });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
