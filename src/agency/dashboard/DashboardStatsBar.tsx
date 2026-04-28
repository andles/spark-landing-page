import { useCountUp } from "../../hooks/useCountUp";

export default function DashboardStatsBar({ isVisible }: { isVisible: boolean }) {
  const salesCount = useCountUp(1876, 1200, isVisible, { separator: "," });
  const turnover = useCountUp(91985.48, 1400, isVisible, { decimals: 2, prefix: "$", separator: "," });

  return (
    <div className="dash-stats flex flex-wrap items-center gap-3 lg:gap-5 mb-4 rounded-lg bg-white/[0.02] border border-white/[0.06] px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-violet-500/15 text-violet-400 text-[9px] font-semibold">
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Sales
        </span>
        <span className="font-mono text-base font-bold text-white">{salesCount}</span>
        <span className="text-white/60 text-[9px]">Sales</span>
      </div>
      <div className="h-5 w-px bg-white/[0.06]" />
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="font-mono text-base font-bold text-emerald-400">{turnover}</span>
        <span className="text-white/60 text-[9px]">Total turnover</span>
      </div>
      <div className="h-5 w-px bg-white/[0.06] hidden sm:block" />
      <div className="hidden sm:flex items-center gap-2">
        <span className="font-mono text-base font-bold text-white">1</span>
        <span className="text-white/60 text-[9px]">E-Commerce customers</span>
      </div>
      <div className="ml-auto hidden md:flex items-center gap-2">
        <span className="px-3 py-1 rounded-md bg-cyan-500/15 text-cyan-400 text-[9px] font-semibold">Date</span>
        <span className="flex items-center justify-center gap-[3px] px-2 py-1 rounded-md hover:bg-white/[0.06] cursor-pointer transition-colors duration-150">
          <span className="w-[3px] h-[3px] rounded-full bg-white/50" />
          <span className="w-[3px] h-[3px] rounded-full bg-white/50" />
          <span className="w-[3px] h-[3px] rounded-full bg-white/50" />
        </span>
      </div>
    </div>
  );
}
