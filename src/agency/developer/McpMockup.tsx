import { useState, useEffect } from "react";

interface Props {
  isActive: boolean;
}

export default function McpMockup({ isActive }: Props) {
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
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0e17] overflow-hidden shadow-2xl shadow-black/40 min-h-[372px] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#080c14]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            </div>
            <span className="text-white text-xs font-semibold">Spark MCP Agent</span>
          </div>
          <span className="flex items-center gap-1.5 text-[9px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Connected
          </span>
        </div>
        <div className="p-4 space-y-3 flex-1">
          <div className={`flex justify-end ${base}`} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "0ms" }}>
            <div className="max-w-[85%] px-3 py-2 rounded-xl rounded-tr-sm bg-white/[0.06] border border-white/[0.06]">
              <p className="text-white/80 text-[11px] leading-relaxed">Draft a PO for anything running low this week.</p>
            </div>
          </div>
          <div className={base} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "200ms" }}>
            <div className="max-w-[90%] rounded-lg border border-violet-500/20 bg-violet-500/[0.04] overflow-hidden">
              <div className="px-3 py-1.5 border-b border-violet-500/10 flex items-center gap-2">
                <svg className="w-3 h-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <span className="text-violet-400 text-[9px] font-mono font-medium">tool_use: create_purchase_order</span>
              </div>
              <div className="px-3 py-2 font-mono text-[10px]">
                <span className="text-white/30">{"{ "}</span>
                <span className="text-violet-400">&quot;vendor&quot;</span><span className="text-white/30">: </span><span className="text-cyan-400">&quot;TechSource Ltd&quot;</span>
                <span className="text-white/30">, </span><span className="text-violet-400">&quot;items&quot;</span><span className="text-white/30">: </span><span className="text-amber-400">2</span>
                <span className="text-white/30">{" }"}</span>
              </div>
            </div>
          </div>
          <div className={base} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "400ms" }}>
            <div className="max-w-[90%] rounded-lg border border-violet-500/15 bg-violet-500/[0.06] p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img src="/spark_icon.png" alt="" className="w-3.5 h-3.5" />
                  <span className="text-white text-[10px] font-semibold">PO-3042</span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/15 text-emerald-400 font-medium">Draft</span>
                </div>
                <span className="text-white/25 text-[9px]">$6,840</span>
              </div>
              <div className="space-y-1 text-[9px]">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Ceramic Diffuser Set</span>
                  <span className="text-white/60 font-mono">×200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Bamboo Shelf Unit</span>
                  <span className="text-white/60 font-mono">×75</span>
                </div>
              </div>
            </div>
          </div>
          <div className={base} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "600ms" }}>
            <div className="max-w-[90%] px-3 py-2 rounded-xl rounded-tl-sm bg-violet-500/10 border border-violet-500/15">
              <p className="text-white/70 text-[11px] leading-relaxed">
                Done — <span className="text-white font-medium">PO-3042</span> covers 2 items that&apos;ll stockout within 7 days. Ready for your approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
