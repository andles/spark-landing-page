import { useState, useEffect } from "react";

interface Props {
  isActive: boolean;
}

const devices = [
  { name: "MacBook Pro", type: "desktop", status: "Active now", icon: "laptop", online: true },
  { name: "iPad Air", type: "tablet", status: "Active now", icon: "tablet", online: true },
  { name: "iPhone 15", type: "phone", status: "Synced 2m ago", icon: "phone", online: true },
  { name: "Warehouse Scanner", type: "scanner", status: "Offline — 3 queued", icon: "scanner", online: false },
];

const activity = [
  { device: "iPhone 15", icon: "phone", action: "Cycle count done", detail: "Aisle C-4 · 36 items verified", time: "Just now", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" },
  { device: "MacBook Pro", icon: "laptop", action: "Bulk transfer", detail: "Warehouse A → B · 120 units", time: "3m ago", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { device: "iPad Air", icon: "tablet", action: "Receiving logged", detail: "PO-3019 · 48 cartons checked in", time: "7m ago", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
];

function DeviceIcon({ type, className }: { type: string; className?: string }) {
  const cls = className || "w-3 h-3";
  switch (type) {
    case "laptop": return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case "tablet": return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case "phone": return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case "scanner": return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>;
    default: return null;
  }
}

export default function CrossPlatformMockup({ isActive }: Props) {
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setAnimatedIn(true), 150);
      return () => clearTimeout(t);
    }
    setAnimatedIn(false);
  }, [isActive]);

  const base = "transition-all duration-500 ease-out";

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0e17] overflow-hidden shadow-2xl shadow-black/40 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#080c14]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/25 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <span className="text-white text-xs font-semibold">Device Sync</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[9px] text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />3 online</span>
            <span className="text-white/15 text-[9px]">·</span>
            <span className="flex items-center gap-1 text-[9px] text-amber-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />1 offline</span>
          </div>
        </div>
        <div className="p-3 space-y-2 flex-1">
          <div className={base} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "0ms" }}>
            <div className="grid grid-cols-4 gap-1.5">
              {devices.map((d) => (
                <div key={d.name} className={`rounded-lg border px-2 py-1.5 text-center ${d.online ? "border-white/[0.06] bg-white/[0.02]" : "border-amber-500/15 bg-amber-500/[0.03]"}`}>
                  <div className={`mx-auto mb-1 ${d.online ? "text-white/50" : "text-amber-400/60"}`}><DeviceIcon type={d.icon} className="w-3.5 h-3.5 mx-auto" /></div>
                  <div className="text-white/60 text-[7px] font-medium truncate">{d.name.split(" ")[0]}</div>
                  <div className="flex items-center justify-center gap-0.5 mt-0.5">
                    <span className={`w-1 h-1 rounded-full ${d.online ? "bg-emerald-400" : "bg-amber-400/60"}`} />
                    <span className={`text-[6px] ${d.online ? "text-emerald-400/70" : "text-amber-400/60"}`}>{d.online ? "on" : "off"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={base} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "150ms" }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/30 text-[8px] font-medium uppercase tracking-wider">Live Activity</span>
              <span className="flex items-center gap-1 text-[8px] text-fuchsia-400/60"><span className="w-1 h-1 rounded-full bg-fuchsia-400 animate-pulse" />streaming</span>
            </div>
          </div>
          {activity.map((item, i) => (
            <div key={i} className={base} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(6px)", transitionDelay: `${200 + i * 100}ms` }}>
              <div className={`rounded-lg border ${item.border} ${item.bg} px-3 py-1.5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={item.color}><DeviceIcon type={item.icon} className="w-2.5 h-2.5" /></span>
                    <span className={`text-[9px] font-semibold ${item.color}`}>{item.action}</span>
                    <span className="text-white/25 text-[8px]">·</span>
                    <span className="text-white/35 text-[8px]">{item.detail}</span>
                  </div>
                  <span className="text-white/20 text-[8px] shrink-0 ml-2">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
