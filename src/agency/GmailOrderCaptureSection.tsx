import { Bell, Check, FileText, Inbox, Mail, MailX, ShieldCheck, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

interface CaptureStep {
  title: string;
  detail: string;
  icon: LucideIcon;
}

const steps: CaptureStep[] = [
  {
    title: "Connect Gmail",
    detail: "Turn on order capture for your Gmail account in Spark and approve read-only access with Google.",
    icon: Mail,
  },
  {
    title: "Spark spots the orders",
    detail: "New inbox messages about purchase orders and sales orders, such as customer orders, supplier confirmations, and shipping notices, are picked out. Everything else is left alone.",
    icon: Inbox,
  },
  {
    title: "Orders stay current",
    detail: "Spark creates or updates the matching order, links it to the email it came from, and notifies you of anything that needs your attention.",
    icon: Bell,
  },
];

interface ExampleMessage {
  from: string;
  subject: string;
  result: string;
  tone: "update" | "create" | "skip";
}

const exampleMessages: ExampleMessage[] = [
  {
    from: "Supplier",
    subject: "PO 1042 confirmed, ship date moved to Friday",
    result: "Purchase order updated",
    tone: "update",
  },
  {
    from: "Customer",
    subject: "Order for 24 cases, delivery next week",
    result: "Sales order created",
    tone: "create",
  },
  {
    from: "Newsletter",
    subject: "This month's industry news",
    result: "Not an order, ignored",
    tone: "skip",
  },
];

const promises = [
  "Read-only: Spark never sends, changes, or deletes mail with this access",
  "Only your Inbox, not sent mail, drafts, spam, or trash",
  "Turn it off or disconnect Gmail at any time",
];

const toneClasses: Record<ExampleMessage["tone"], string> = {
  update: "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200",
  create: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300",
  skip: "border-white/[0.08] bg-white/[0.03] text-white/40",
};

export default function GmailOrderCaptureSection() {
  return (
    <section id="gmail-order-capture" className="relative scroll-mt-16 overflow-hidden bg-[#06080d] py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_45%,rgba(6,182,212,0.09),transparent_70%)]" />
      <div className="absolute inset-0 dot-grid opacity-25" />

      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-6 md:px-8 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-12">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 text-sm text-cyan-200">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Order capture from Gmail
          </div>
          <h2
            className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-[3.25rem]"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            Orders arrive by email.
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              Spark keeps up with them.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#b8bfcc] lg:text-lg">
            Connect your Gmail account and Spark watches your inbox for purchase orders and sales orders. When a customer
            places an order or a supplier confirms, changes, or ships one, Spark updates your orders and tells you what
            changed.
          </p>

          <ol className="mt-8 space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      <span className="mr-2 font-mono text-xs text-white/35">0{index + 1}</span>
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#8b95a8]">{step.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#090d15]/95 shadow-[0_32px_100px_rgba(0,0,0,0.48)]">
            <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

            <div className="flex min-h-14 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-300/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                </div>
                <span className="hidden font-mono text-[10px] tracking-[0.18em] text-white/35 sm:inline">SPARK / INBOX ORDER CAPTURE</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                READ-ONLY
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <p className="px-1 pb-3 font-mono text-[9px] tracking-[0.16em] text-white/30">NEW IN YOUR INBOX</p>
              <ul className="space-y-2.5">
                {exampleMessages.map((message) => {
                  const ResultIcon = message.tone === "skip" ? MailX : message.tone === "create" ? FileText : Check;
                  return (
                    <li
                      key={message.subject}
                      className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold tracking-wide text-white/40">{message.from.toUpperCase()}</p>
                        <p className="mt-1 text-sm leading-5 text-[#e3e6ed]">{message.subject}</p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[11px] font-medium sm:self-center ${toneClasses[message.tone]}`}
                      >
                        <ResultIcon className="h-3 w-3" aria-hidden="true" />
                        {message.result}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-5 space-y-3 border-t border-white/[0.07] pt-5">
                {promises.map((promise) => (
                  <li key={promise} className="flex items-start gap-3 text-sm text-[#d6dae2]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                      <Check className="h-3 w-3 text-emerald-300" aria-hidden="true" />
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] leading-5 text-white/30">Example messages for illustration.</p>

          <p className="mt-6 border-l border-cyan-400/30 pl-4 text-sm leading-6 text-[#8b95a8]">
            Your email is used only to keep your orders up to date. It is never sold, used for advertising, or used to train
            AI models. Read how Spark handles Gmail data in our{" "}
            <Link to="/privacy-policy/" className="text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
