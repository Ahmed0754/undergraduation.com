import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").toLowerCase();
    const status = searchParams.get("status") || "";
    const filter = searchParams.get("filter") || "";

    let ref: FirebaseFirestore.Query = adminDb.collection("students");
    if (status) ref = ref.where("status", "==", status);
    if (filter === "highIntent") ref = ref.where("highIntent", "==", true);
    if (filter === "needsEssayHelp") ref = ref.where("needsEssayHelp", "==", true);

    async function loadOrdered() {
      const snap = await ref.orderBy("lastActive", "desc").limit(400).get();
      return snap.docs.map(d => {
        const data = d.data();
        const lastActive = data.lastActive?.toDate?.()
          ? data.lastActive.toDate().toISOString()
          : (data.lastActive || null);
        return { id: d.id, ...data, lastActive };
      });
    }

    let items: any[] = [];
    try {
      items = await loadOrdered();
    } catch {
      const snap = await ref.limit(400).get();
      items = snap.docs.map(d => {
        const data = d.data();
        const lastActive = data.lastActive?.toDate?.()
          ? data.lastActive.toDate().toISOString()
          : (data.lastActive || null);
        return { id: d.id, ...data, lastActive };
      });
    }

    if (q) {
      items = items.filter((s: any) =>
        (s.name || "").toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q)
      );
    }

    if (filter === "notContacted7d") {
      const since = new Date(); since.setDate(since.getDate() - 7);
      const comms = await adminDb.collection("communications").where("timestamp", ">=", since).get();
      const recent = new Set(comms.docs.map(d => d.get("studentId")));
      items = items.filter((s: any) => !recent.has(s.id));
    }

    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ items: [], error: String(e?.message || e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const doc = await adminDb.collection("students").add({ ...body, lastActive: new Date() });
  return NextResponse.json({ id: doc.id }, { status: 201 });
}
