export function StatCards({ data }:{ data?: any }) {
  if (!data) return <div className="text-sm text-gray-500">Loading stats…</div>;
  const { totalStudents, activeStudents, essayStage, byStatus } = data;
  const Card = ({title,val}:{title:string,val:any})=>(
    <div className="border rounded p-4 min-w-[160px]">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{val}</div>
    </div>
  );
  return (
    <div className="flex gap-3 flex-wrap">
      <Card title="Total Students" val={totalStudents}/>
      <Card title="Active Students" val={activeStudents}/>
      <Card title="In Essay Stage (Applying)" val={essayStage}/>
      <Card title="By Status" val={
        <div className="text-sm">{Object.entries(byStatus).map(([k,v])=><div key={k}>{k}: {v as number}</div>)}</div>
      }/>
    </div>
  );
}
