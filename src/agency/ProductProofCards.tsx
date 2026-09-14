import { ChartNoAxesCombined, ClipboardList, ShieldCheck } from "lucide-react";
import ScrollReveal, { RevealItem } from "./ScrollReveal";

const capabilities = [
  { icon: ChartNoAxesCombined, title: "See demand clearly", label: "Spark Farsight", description: "Explore sales history, seasonal patterns, and the forecast behind your next buying decision." },
  { icon: ClipboardList, title: "Know what to buy", label: "From insight to action", description: "Review suggested quantities alongside stock and incoming supply. Turn the recommendation into a draft purchase order." },
  { icon: ShieldCheck, title: "Keep control", label: "Sparki or your AI assistant", description: "Prepare the order with Sparki in Spark, or use your preferred AI assistant through an MCP connector. Same capabilities, your choice of workspace. Review the details and confirm before the draft is created." },
];

export default function ProductProofCards() {
  return (
    <ScrollReveal staggerChildren={120} className="mt-10 lg:mt-14 w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
      {capabilities.map(({ icon: Icon, title, label, description }, i) => (
        <RevealItem key={title} index={i} className="h-full">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 lg:p-8 h-full hover:bg-white/[0.06] transition-colors">
            <Icon aria-hidden="true" className="h-7 w-7 text-cyan-400 mb-5" />
            <p className="text-xs font-semibold tracking-wide text-violet-300 mb-2">{label}</p>
            <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
            <p className="text-[#b8bfcc] text-sm leading-relaxed">{description}</p>
          </div>
        </RevealItem>
      ))}
    </ScrollReveal>
  );
}
