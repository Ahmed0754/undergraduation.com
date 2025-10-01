"use client";
import useSWR from "swr";
import { StatCards } from "@/app/(components)/StatCards";
const fetcher = async (u:string) => {
  const res = await fetch(u);
  if (!res.ok) throw new Error(`GET ${u} ${res.status}`);
  return res.json();
};

export default function Home() {
  const { data, error } = useSWR("/api/summary", fetcher);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      {error ? <div className="text-sm text-red-600">Failed to load stats</div> : <StatCards data={data}/>}
      <div className="flex gap-3">
        <a className="underline" href="/students?filter=notContacted7d">Students not contacted in 7 days</a>
        <a className="underline" href="/students?filter=highIntent">High intent</a>
        <a className="underline" href="/students?filter=needsEssayHelp">Needs essay help</a>
      </div>
    </main>
  );
}
