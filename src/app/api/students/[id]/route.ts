import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  try {
    const doc = await adminDb.collection("students").doc(params.id).get();
    if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const data = doc.data() || {};
    const lastActive = data.lastActive?.toDate?.()
      ? data.lastActive.toDate().toISOString()
      : (data.lastActive || null);
    return NextResponse.json({ id: doc.id, ...data, lastActive });
  } catch (e:any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string }}) {
  const body = await request.json();
  await adminDb.collection("students").doc(params.id).update(body);
  return NextResponse.json({ ok: true });
}
