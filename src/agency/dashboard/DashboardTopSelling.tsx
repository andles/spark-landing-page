import React from "react";

const ITEMS = [
  { name: "Seasonal Gift Set", qty: "894", amt: "$33,631.60" },
  { name: "Evergreen Essential", qty: "838", amt: "$20,941.62" },
  { name: "Fast Mover Elite", qty: "587", amt: "$3,239.19" },
  { name: "Summer Gadget...", qty: "481", amt: "$4,330.99" },
  { name: "Steady Seller Basic", qty: "320", amt: "$1,199.40" },
];

export default function DashboardTopSelling() {
  return (
    <div className="dash-top-selling rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <span className="text-[#f0f2f5] text-[10px] font-semibold flex items-center gap-1.5">
          <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          Top selling items
        </span>
        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[8px] font-semibold">Date ▾</span>
      </div>
      <div className="grid grid-cols-[1fr_50px_80px] gap-1 text-[7px] font-mono uppercase tracking-widest text-white/30 mb-1.5 px-0.5 shrink-0">
        <span>Name</span><span className="text-right">Qty</span><span className="text-right">Total Amount</span>
      </div>
      <div className="flex flex-col flex-1">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="dash-row grid grid-cols-[1fr_50px_80px] gap-1 text-[9px] px-0.5 border-t border-white/[0.04] flex-1 hover:bg-white/[0.03] transition-colors duration-150"
            style={{ display: "grid", alignContent: "center", "--row-index": i } as React.CSSProperties}
          >
            <span className="text-white/70 truncate py-2.5">{item.name}</span>
            <span className="text-right font-mono text-white/50 py-2.5">{item.qty}</span>
            <span className="text-right font-mono text-white/85 py-2.5">{item.amt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
