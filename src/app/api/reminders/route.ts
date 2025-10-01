import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const { studentId, title, dueAt, assignedTo } = await request.json();
  await adminDb.collection("reminders").add({
    studentId, title, dueAt: new Date(dueAt), assignedTo, status: "open"
  });
  return NextResponse.json({ ok: true });
}
