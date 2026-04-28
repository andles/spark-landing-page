import React from "react";

export default function DashboardSidebar() {
  return (
    <div className="dash-sidebar hidden lg:flex flex-col w-[185px] shrink-0 border-r border-white/[0.06] py-4 px-3" style={{ background: "rgba(8,11,20,0.7)" }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-2 mb-4">
        <img src="/spark_icon.png" alt="" className="w-7 h-7" />
        <span className="text-white text-[11px] font-bold tracking-tight whitespace-nowrap">Spark Inventory</span>
      </div>

      {/* Nav items */}
      <div className="space-y-0.5">
        {[
          { label: "Dashboard", active: true, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
          { label: "Inventory", chevron: true, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
          { label: "Sales", chevron: true, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg> },
          { label: "Purchasing", chevron: true, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
          { label: "Integrations", chevron: true, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
          { label: "Settings", chevron: true, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg> },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`dash-row flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] transition-all duration-150 ${
              item.active
                ? "bg-white/[0.08] text-white font-medium"
                : "text-[#b8bfcc] hover:bg-white/[0.04]"
            }`}
            style={{ "--row-index": i } as React.CSSProperties}
          >
            <span className="shrink-0 opacity-70">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.chevron && !item.active && (
              <svg className="w-3.5 h-3.5 text-[#8b95a8]/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-0.5">
        <div className="dash-row flex items-center justify-between px-2.5 py-[7px] rounded-lg text-[11px] text-[#8b95a8] transition-all duration-150 hover:bg-white/[0.04]" style={{ "--row-index": 6 } as React.CSSProperties}>
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.545 7.455L22 10l-7.455 2.545L12 20l-2.545-7.455L2 10l7.455-2.545z" /></svg>
            Signal
          </div>
          <span className="bg-rose-500/20 text-rose-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full">15</span>
        </div>
        <div className="dash-row flex items-center gap-2 px-2.5 py-[7px] rounded-lg text-[11px] text-[#8b95a8] transition-all duration-150 hover:bg-white/[0.04]" style={{ "--row-index": 7 } as React.CSSProperties}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Tasks
          <span className="bg-violet-500/20 text-violet-400 text-[7px] font-bold px-1.5 py-0.5 rounded ml-auto">BETA</span>
        </div>
        {/* User profile */}
        <div className="dash-row flex items-center gap-2 px-2.5 py-2.5 mt-2 border-t border-white/[0.04]" style={{ "--row-index": 8 } as React.CSSProperties}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">JW</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[#f0f2f5] text-[10px] font-medium">Jason Watts</span>
              <span className="bg-fuchsia-500/20 text-fuchsia-400 text-[6px] font-bold px-1 py-px rounded">PRO</span>
            </div>
            <div className="text-white/35 text-[8px]">Spark Demo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
