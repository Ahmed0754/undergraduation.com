import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const { studentId, note, createdBy } = await request.json();
  await adminDb.collection("notes").add({
    studentId, note, createdBy, timestamp: new Date()
  });
  return NextResponse.json({ ok: true });
}
