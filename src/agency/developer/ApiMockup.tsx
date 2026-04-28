import { useState, useEffect } from "react";

interface Props {
  isActive: boolean;
}

export default function ApiMockup({ isActive }: Props) {
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
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.06] bg-[#080c14]">
          <span className="w-2 h-2 rounded-full bg-rose-400/50" />
          <span className="w-2 h-2 rounded-full bg-amber-400/50" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
          <span className="ml-3 px-3 py-0.5 rounded-t text-[9px] font-mono text-white/40 bg-white/[0.04] border border-b-0 border-white/[0.06]">bash</span>
        </div>
        <div className="p-4 font-mono text-[11px] leading-relaxed relative flex-1">
          <div className={base} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "0ms" }}>
            <span className="text-emerald-400">$</span>{" "}
            <span className="text-white/70">curl -X POST</span>{" "}
            <span className="text-cyan-400">https://api.spark.io/v1/orders</span>
          </div>
          <div className={`mt-2 flex items-center gap-2 ${base}`} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "150ms" }}>
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/15 text-emerald-400 font-medium">201 Created</span>
            <span className="text-white/20 text-[9px]">23ms</span>
          </div>
          <div className={`mt-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] ${base}`} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "300ms" }}>
            <div className="text-white/30">{"{"}</div>
            <div className="pl-4">
              <span className="text-violet-400">&quot;order_id&quot;</span><span className="text-white/30">: </span><span className="text-cyan-400">&quot;ORD-7293&quot;</span><span className="text-white/30">,</span>
            </div>
            <div className="pl-4">
              <span className="text-violet-400">&quot;channel&quot;</span><span className="text-white/30">: </span><span className="text-cyan-400">&quot;shopify&quot;</span><span className="text-white/30">,</span>
            </div>
            <div className="pl-4">
              <span className="text-violet-400">&quot;items&quot;</span><span className="text-white/30">: </span><span className="text-amber-400">3</span><span className="text-white/30">,</span>
            </div>
            <div className="pl-4">
              <span className="text-violet-400">&quot;total&quot;</span><span className="text-white/30">: </span><span className="text-amber-400">284.97</span><span className="text-white/30">,</span>
            </div>
            <div className="pl-4">
              <span className="text-violet-400">&quot;stock_reserved&quot;</span><span className="text-white/30">: </span><span className="text-cyan-400">true</span>
            </div>
            <div className="text-white/30">{"}"}</div>
          </div>
          <div className={`mt-3 flex items-center justify-between gap-3 ${base}`} style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: "500ms" }}>
            <div className="flex items-center gap-2 text-[10px]">
              <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-white/30">Webhook →</span>
              <span className="text-cyan-400">order.created</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[8px] font-medium">delivered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
