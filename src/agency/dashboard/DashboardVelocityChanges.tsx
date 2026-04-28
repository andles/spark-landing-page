import { useCountUp } from "../../hooks/useCountUp";

const ITEMS = [
  { name: "Holiday Widget Pro", sku: "HWP-001", skuR: "HWP-001", pct: 1850 },
  { name: "Critical Stock Item", sku: "CSI-004", skuR: "CSB-004", pct: 350 },
  { name: "Fast Mover Elite", sku: "FME-117", skuR: "FME-117", pct: 326 },
  { name: "Steady Seller Basic", sku: "PSB-006", skuR: "PSB-006", pct: 217 },
  { name: "Summer Gadget Max", sku: "SG-426", skuR: "SG-429", pct: 104.2 },
];

export default function DashboardVelocityChanges({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="dash-changes rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
      <div className="text-[7px] font-mono uppercase tracking-widest text-white/30 mb-2">Significant Velocity Changes</div>
      {ITEMS.map((item, i) => (
        <VelocityRow key={item.sku} item={item} index={i} isVisible={isVisible} />
      ))}
    </div>
  );
}

function VelocityRow({ item, index, isVisible }: { item: typeof ITEMS[number]; index: number; isVisible: boolean }) {
  const hasDecimal = item.pct % 1 !== 0;
  const pctDisplay = useCountUp(item.pct, 1200, isVisible, {
    decimals: hasDecimal ? 1 : 0,
    prefix: "+",
    suffix: "%",
    separator: ",",
  });

  return (
    <div
      className="flex items-center justify-between py-[7px] border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors duration-150 rounded-sm px-1 -mx-1"
      style={isVisible ? {
        animation: `fade-up 0.4s ease-out ${0.95 + index * 0.08}s both`,
      } : { opacity: 0 }}
    >
      <div>
        <div className="text-white/85 text-[9px] font-medium">{item.name}</div>
        <div className="text-white/35 text-[7px] font-mono">{item.sku}</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-[10px] font-bold text-emerald-400">{pctDisplay}</div>
        <div className="text-white/35 text-[7px] font-mono">{item.skuR}</div>
      </div>
    </div>
  );
}
