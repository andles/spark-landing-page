import { useInView } from "../../hooks/useInView";
import DashboardSidebar from "./DashboardSidebar";
import DashboardStatsBar from "./DashboardStatsBar";
import DashboardChart from "./DashboardChart";
import DashboardVelocityInsights from "./DashboardVelocityInsights";
import DashboardInvoicesTable from "./DashboardInvoicesTable";
import DashboardTopSelling from "./DashboardTopSelling";
import DashboardVelocityChanges from "./DashboardVelocityChanges";

export default function DashboardMockup() {
  const [ref, isVisible] = useInView(0.1);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`dashboard-mockup${isVisible ? " is-visible" : ""}`}>
      {/* Branded glow behind */}
      <div className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-60" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.15), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.12), transparent 55%)" }} />

      {/* Card */}
      <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: "linear-gradient(145deg, rgba(17,22,34,0.95), rgba(12,16,25,0.98))", contain: "content" }}>
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 min-w-0">
            <div className="px-4 lg:px-5 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-[#f0f2f5] text-sm font-semibold">Dashboard</span>
            </div>
            <div className="p-3 lg:p-4">
              <DashboardStatsBar isVisible={isVisible} />
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-3 mb-[14px]">
                <DashboardChart isVisible={isVisible} />
                <DashboardVelocityInsights />
              </div>
              <div className="dash-bottom grid grid-cols-1 lg:grid-cols-[1fr_1fr_200px] gap-3">
                <DashboardInvoicesTable />
                <DashboardTopSelling />
                <DashboardVelocityChanges isVisible={isVisible} />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#06080d] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
