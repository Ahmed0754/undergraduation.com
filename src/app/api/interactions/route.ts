import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  const limit = Number(searchParams.get("limit") || 25);
  if (!studentId) return NextResponse.json({ error: "studentId required" }, { status: 400 });

  const snap = await adminDb
    .collection("interactions")
    .where("studentId", "==", studentId)
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get();

  const items = snap.docs.map(d => {
    const data = d.data();
    return {
      id: d.id,
      type: data.type,
      meta: data.meta || {},
      timestamp: data.timestamp?.toDate?.() ? data.timestamp.toDate().toISOString() : data.timestamp,
    };
  });

  return NextResponse.json({ items });
}
