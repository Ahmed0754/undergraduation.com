import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const { studentId, channel, subject, message } = await request.json();
  await adminDb.collection("communications").add({
    studentId, channel, subject, message, direction: "outbound", timestamp: new Date()
  });
  return NextResponse.json({ ok: true, mocked: true });
}
