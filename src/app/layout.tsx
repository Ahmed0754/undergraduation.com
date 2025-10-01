export const metadata = { title: "Undergraduation Admin", description: "Internal CRM dashboard" };
import "./globals.css";
import useSWR from "swr";

function NavStats() {
  const { data } = useSWR("/api/summary", (u)=>fetch(u).then(r=>r.json()));
  if (!data) return null;
  return (
    <div className="hidden md:flex gap-3 text-xs">
      <span className="border rounded px-2 py-0.5">Students: {data.totalStudents}</span>
      <span className="border rounded px-2 py-0.5">Applying: {data.byStatus?.Applying ?? 0}</span>
      <span className="border rounded px-2 py-0.5">High intent: {data.highIntent ?? 0}</span>
      <span className="border rounded px-2 py-0.5">Essay help: {data.needsEssayHelp ?? 0}</span>
      <span className="border rounded px-2 py-0.5">Not contacted 7d: {data.notContacted7d ?? 0}</span>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b">
          <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="font-semibold">Undergraduation Admin</a>
              <nav className="text-sm flex gap-4">
                <a href="/" className="hover:underline">Dashboard</a>
                <a href="/students" className="hover:underline">Students</a>
              </nav>
            </div>
            {/* navbar stats */}
            {typeof window !== "undefined" ? <NavStats /> : null}
          </div>
        </header>
        <div className="max-w-6xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
