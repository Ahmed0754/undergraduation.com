"use client";
import { useEffect, useState } from "react";
import ProgressBar from "../../(components)/ProgressBar";
import AISummary from "../../(components)/AISummary";

export default function StudentProfile({ params }: { params: { id: string }}) {
  const { id } = params;
  const [student, setStudent] = useState<any>(null);

  useEffect(()=> {
    fetch(`/api/students/${id}`).then(r=>r.json()).then(setStudent);
  }, [id]);

  if (!student) return <main className="p-6">Loading…</main>;

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{student.name}</h1>
          <p className="text-sm text-gray-600">{student.email} • {student.phone || "—"} • {student.country || "—"}</p>
        </div>
        <div className="w-64">
          <ProgressBar status={student.status}/>
        </div>
      </div>

      <AISummary student={student}/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 border rounded p-4">
          <h3 className="font-medium mb-2">Interaction Timeline</h3>
          <p className="text-sm text-gray-500">Show logins, AI questions, doc uploads… (wire similarly to notes/communications)</p>
        </section>

        <section className="border rounded p-4">
          <h3 className="font-medium mb-2">Communication</h3>
          <form className="space-y-2" onSubmit={async e=>{
            e.preventDefault();
            const f = e.currentTarget as any;
            const message = f.message.value;
            await fetch("/api/communications", { method:"POST", body: JSON.stringify({
              studentId: id, channel: "email", subject: "Follow-up", message
            }), headers: { "Content-Type":"application/json" }});
            f.reset();
            alert("Mock email triggered + logged ✅");
          }}>
            <textarea name="message" required className="border p-2 rounded w-full" placeholder="Write a quick follow-up…"/>
            <button className="border px-3 py-1 rounded">Send (Mock)</button>
          </form>
        </section>

        <section className="md:col-span-2 border rounded p-4">
          <h3 className="font-medium mb-2">Notes</h3>
          <form className="flex gap-2" onSubmit={async e=>{
            e.preventDefault();
            const f = e.currentTarget as any;
            const note = f.note.value;
            await fetch("/api/notes", { method:"POST", headers:{"Content-Type":"application/json"},
              body: JSON.stringify({ studentId: id, note, createdBy: "admin@undergraduation.com" })
            });
            f.reset();
            alert("Note added ✅");
          }}>
            <input name="note" className="border p-2 rounded w-full" placeholder="Add note…" />
            <button className="border px-3 rounded">Add</button>
          </form>
        </section>

        <section className="border rounded p-4">
          <h3 className="font-medium mb-2">Reminders</h3>
          <form className="space-y-2" onSubmit={async e=>{
            e.preventDefault();
            const f = e.currentTarget as any;
            await fetch("/api/reminders", {
              method:"POST", headers: {"Content-Type":"application/json"},
              body: JSON.stringify({
                studentId: id, title: f.title.value, dueAt: f.dueAt.value, assignedTo: "ops@undergraduation.com"
              })
            });
            f.reset();
            alert("Reminder scheduled ✅");
          }}>
            <input name="title" className="border p-2 rounded w-full" placeholder="Reminder title" required/>
            <input name="dueAt" type="datetime-local" className="border p-2 rounded w-full" required/>
            <button className="border px-3 rounded">Schedule</button>
          </form>
        </section>
      </div>
    </main>
  );
}
