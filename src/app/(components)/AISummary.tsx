export default function AISummary({ student }: { student:any }) {
  const bits:string[] = [];
  if (student.highIntent) bits.push("high engagement");
  if (student.needsEssayHelp) bits.push("needs essay support");
  const mood = bits.length ? bits.join(" and ") : "steady engagement";

  const next =
    student.status === "Exploring" ? "share program discovery resources"
    : student.status === "Shortlisting" ? "send 2–3 target school suggestions"
    : student.status === "Applying" ? "provide essay outline + deadlines checklist"
    : "confirm submission milestones";

  const country = student.country ? ` from ${student.country}` : "";

  const text = `AI Summary: ${student.name}${country} shows ${mood}.
Recommended next action: ${next}.`;

  return (
    <div className="border rounded p-4 bg-gray-50">
      <h3 className="font-medium mb-1">AI Summary</h3>
      <p className="text-sm whitespace-pre-line">{text}</p>
    </div>
  );
}
