"use client";
import { useEffect, useMemo, useState } from "react";
import { daysAgo } from "@/lib/utils";
import StatusBadge from "@/app/(components)/StatusBadge";

export default function StudentsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);

  // read ?filter= & ?status= on first load
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const f = sp.get("filter") || "";
    const s = sp.get("status") || "";
    if (f) setFilter(f);
    if (s) setStatus(s);
  }, []);

  async function load() {
    const url = new URL("/api/students", window.location.origin);
    if (q) url.searchParams.set("q", q);
    if (status) url.searchParams.set("status", status);
    if (filter) url.searchParams.set("filter", filter);
    const res = await fetch(url.toString());
    const data = await res.json();
    setItems(data.items || []);
  }
  useEffect(()=>{ load(); /* eslint-disable-next-line */ }, [q, status, filter]);

  // purely cosmetic: keep status narrowed in UI even if server fell back
  const visible = useMemo(() => (status ? items.filter(s => s.status === status) : items), [items, status]);

  return (
    <main className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Students</h2>
      <div className="flex flex-wrap gap-3 items-center">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name or email" className="border p-2 rounded w-72"/>
        <select value={status} onChange={e=>{
          const v = e.target.value; setStatus(v);
          const sp = new URLSearchParams(window.location.search);
          if (v) sp.set("status", v); else sp.delete("status");
          history.replaceState(null, "", `/students?${sp.toString()}`);
        }} className="border p-2 rounded">
          <option value="">All Statuses</option>
          <option>Exploring</option><option>Shortlisting</option><option>Applying</option><option>Submitted</option>
        </select>

        <div className="text-sm flex gap-2">
          <button className={`underline ${filter==='notContacted7d'?'font-semibold':''}`} onClick={()=>setFilter('notContacted7d')}>Not contacted in 7 days</button>
          <button className={`underline ${filter==='highIntent'?'font-semibold':''}`} onClick={()=>setFilter('highIntent')}>High intent</button>
          <button className={`underline ${filter==='needsEssayHelp'?'font-semibold':''}`} onClick={()=>setFilter('needsEssayHelp')}>Needs essay help</button>
          {filter && <button className="underline opacity-70" onClick={()=>setFilter("")}>Clear</button>}
        </div>
      </div>

      <table className="w-full text-sm">
        <thead><tr className="text-left border-b">
          <th className="py-2">Name</th><th>Email</th><th>Country</th><th>Status</th><th>Last Active</th>
        </tr></thead>
        <tbody>
          {visible.map((s:any)=>(
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="py-2"><a className="underline" href={`/students/${s.id}`}>{s.name}</a></td>
              <td>{s.email}</td>
              <td>{s.country || "—"}</td>
              <td><StatusBadge status={s.status}/></td>
              <td>{daysAgo(s.lastActive ? new Date(s.lastActive) : undefined)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
