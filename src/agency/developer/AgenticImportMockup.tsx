import { useEffect, useState } from 'react';

export default function AgenticImportMockup({ isActive }: { isActive: boolean }) {
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedIn(isActive), isActive ? 140 : 0);
    return () => clearTimeout(timer);
  }, [isActive]);

  const enter = 'transition-all duration-500 ease-out';
  const style = (delay: number) => ({
    opacity: animatedIn ? 1 : 0,
    transform: animatedIn ? 'translateY(0)' : 'translateY(8px)',
    transitionDelay: `${delay}ms`,
  });

  return (
    <div className="mx-auto w-full max-w-[430px]">
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0e17] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#080c14] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-[10px] font-black text-white">S</span>
            <span className="text-[11px] font-semibold text-white/75">Onboarding command center</span>
          </div>
          <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-2 py-1 font-mono text-[8px] text-emerald-300">GOVERNED</span>
        </div>

        <div className="p-4">
          <div className={`grid grid-cols-3 gap-2 ${enter}`} style={style(0)}>
            {[
              ['Connect', 'Shopify'],
              ['Upload', 'CSV · XLSX'],
              ['Assistant', 'MCP'],
            ].map(([label, value], index) => (
              <div key={label} className={`rounded-lg border p-2.5 ${index === 2 ? 'border-violet-300/25 bg-violet-300/[0.08]' : 'border-white/[0.06] bg-white/[0.025]'}`}>
                <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/30">{label}</p>
                <p className="mt-1 text-[10px] font-semibold text-white/75">{value}</p>
              </div>
            ))}
          </div>

          <div className={`mt-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 ${enter}`} style={style(130)}>
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8px] tracking-[0.1em] text-cyan-300">READINESS CHECK</p>
              <span className="text-[8px] text-white/30">Maple Lane Press</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {[
                ['Inventory', 'Items · costs · stock', '100%', 'bg-emerald-400'],
                ['Sales history', '18 months classified', '100%', 'bg-violet-400'],
                ['Purchasing', 'Suppliers · lead times', '75%', 'bg-cyan-400'],
              ].map(([label, note, pct, color]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-[9px]"><span className="text-white/65">{label}</span><span className="text-white/30">{note}</span></div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${color}`} style={{ width: pct }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-3 grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.045] p-3 ${enter}`} style={style(280)}>
            <div>
              <p className="text-[10px] font-semibold text-white">Import proposal ready</p>
              <p className="mt-1 text-[8px] leading-4 text-white/35">428 items · 1,842 sales orders · 64 purchase orders</p>
            </div>
            <span className="rounded-md bg-gradient-to-r from-cyan-500 to-violet-500 px-3 py-1.5 text-[9px] font-semibold text-white">Review</span>
          </div>

          <div className={`mt-3 flex items-center gap-2 font-mono text-[8px] text-white/30 ${enter}`} style={style(430)}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Nothing lands before approval · readiness verifies after import
          </div>
        </div>
      </div>
    </div>
  );
}
