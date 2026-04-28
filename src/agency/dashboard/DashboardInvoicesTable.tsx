import React from "react";

const INVOICES = [
  { num: "95949", date: "1/28/2026,...", cust: "Sarah M.", amt: "$24.99" },
  { num: "95027", date: "1/28/2026,...", cust: "James K.", amt: "$59.99" },
  { num: "95921", date: "1/27/2026,...", cust: "Emily R.", amt: "$24.99" },
  { num: "95840", date: "1/27/2026,...", cust: "David L.", amt: "$59.99" },
  { num: "95026", date: "1/26/2026,...", cust: "Carlos T.", amt: "$59.99" },
];

export default function DashboardInvoicesTable() {
  return (
    <div className="dash-invoices rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <span className="text-[#f0f2f5] text-[10px] font-semibold flex items-center gap-1.5">
          <svg className="w-3 h-3 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Latest invoices
        </span>
        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[8px] font-semibold">Date ▾</span>
      </div>
      <div className="grid grid-cols-[60px_1fr_60px_70px] gap-1 text-[7px] font-mono uppercase tracking-widest text-white/30 mb-1.5 px-0.5 shrink-0">
        <span>Number</span><span>Date Created</span><span>Customer</span><span className="text-right">Total Amount</span>
      </div>
      <div className="flex flex-col flex-1">
        {INVOICES.map((inv, i) => (
          <div
            key={i}
            className="dash-row grid grid-cols-[60px_1fr_60px_70px] gap-1 text-[9px] px-0.5 border-t border-white/[0.04] flex-1 items-center hover:bg-white/[0.03] transition-colors duration-150"
            style={{ display: "grid", alignContent: "center", "--row-index": i } as React.CSSProperties}
          >
            <span className="font-mono text-white/70 py-2.5">{inv.num}</span>
            <span className="text-white/45 py-2.5">{inv.date}</span>
            <span className="text-white/45 py-2.5">{inv.cust}</span>
            <span className="text-right font-mono text-white/85 py-2.5">{inv.amt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
