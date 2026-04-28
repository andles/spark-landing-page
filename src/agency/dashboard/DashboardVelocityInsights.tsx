import React from "react";

const ITEMS = [
  { name: "Evergreen Essential", loc: "Main warehouse", due: "93", range: "30 - 45" },
  { name: "Steady Seller Basic", loc: "Main warehouse", due: "102", range: "20 - 31" },
  { name: "TikTok Viral Thing", loc: "Main warehouse", due: "71", range: "10 - 15" },
];

export default function DashboardVelocityInsights() {
  return (
    <div className="dash-velocity rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 flex flex-col">
      <div className="flex items-center gap-1.5 mb-1.5">
        <svg className="w-3 h-3 text-violet-400" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        <span className="text-white text-[10px] font-semibold">Velocity Insights</span>
      </div>
      <div className="text-[7px] font-mono uppercase tracking-widest text-white/30 mb-2">Reorder Recommendations</div>
      <div className="flex flex-col gap-0 flex-1">
        {ITEMS.map((item, i) => (
          <div
            key={item.name}
            className="dash-row flex items-start gap-1.5 py-2 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors duration-150 rounded-sm px-1 -mx-1"
            style={{ "--row-index": i } as React.CSSProperties}
          >
            <svg className="w-2.5 h-2.5 mt-0.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <div>
              <div className="text-white/90 text-[9px] font-semibold">{item.name}</div>
              <div className="text-white/45 text-[8px]">{item.loc}</div>
              <div className="text-white/45 text-[8px]">{item.due} due to <span className="text-cyan-400">{item.range}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
