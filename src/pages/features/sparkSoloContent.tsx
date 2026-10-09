// Sections for the Spark Solo page. Message wording follows the product's own
// SMS templates (server Areas/SmsAssistant): codes are a letter and a digit,
// and nothing changes until the owner replies YES with the code.
import ScrollReveal, { RevealItem } from '../../agency/ScrollReveal';

const scheduledTexts = [
  {
    label: 'Urgent alerts',
    when: 'As they happen',
    body: 'Spark Solo alert: A7: Classic Tee, Black, M will run out before the next delivery. Reply A7 for details, 1 A7 to approve, 2 A7 to dismiss, or ask me anything.',
  },
  {
    label: 'Morning brief',
    when: 'Every day at 8 AM',
    body: 'Spark Solo morning brief: 1 urgent, 6 open. 2 reorders are ready to approve. Ask me anything.',
  },
  {
    label: 'Evening wrap',
    when: 'Every day at 6 PM',
    body: 'Spark Solo evening wrap: 96 orders and $5,210.00 in sales today. Everything’s on track.',
  },
  {
    label: 'Weekly pulse',
    when: 'Mondays at 8 AM',
    body: 'Spark Solo weekly pulse: signals raised last week, what you handled by text, and what is still open.',
  },
];

/** What Spark Solo sends without being asked. */
export function SoloScheduleSection() {
  return (
    <section aria-labelledby="solo-schedule-heading" className="px-6 pb-16 md:px-8 lg:pb-20">
      <div className="mx-auto max-w-[1120px]">
        <ScrollReveal className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">What lands on your phone</p>
          <h2 id="solo-schedule-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">The business checks in with you</h2>
          <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
            Urgent signals arrive as they happen. A brief, a wrap, and a weekly pulse keep you current without opening the app. Turn each one on or off.
          </p>
        </ScrollReveal>
        <ScrollReveal staggerChildren={70} className="mt-8 grid gap-4 md:grid-cols-2">
          {scheduledTexts.map((text, index) => (
            <RevealItem key={text.label} index={index}>
              <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white">{text.label}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{text.when}</span>
                </div>
                <p className="mt-4 mr-6 rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-5 text-white/85">{text.body}</p>
              </article>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

const replies = [
  { text: 'A7', meaning: 'Show the details behind alert A7.' },
  { text: '1 A7', meaning: 'Approve it.' },
  { text: '2 A7', meaning: 'Dismiss it.' },
  { text: 'YES B3', meaning: 'Confirm the change Spark drafted as B3.' },
  { text: 'NO B3', meaning: 'Skip it. Nothing changes.' },
  { text: 'MORE', meaning: 'Send the rest of a long answer.' },
  { text: 'NEW', meaning: 'Start a fresh conversation.' },
];

const guardrails = [
  { title: 'Nothing changes until you say YES', body: 'Spark drafts the purchase order, transfer, or adjustment and texts you a code. It only runs when you reply YES with that code.' },
  { title: 'It checks which one you mean', body: 'When a request could match more than one item, Spark asks before drafting anything.' },
  { title: 'Codes expire', body: 'A drafted change has to be confirmed within 15 minutes. If the item changed in the meantime, nothing is done.' },
  { title: 'Quiet hours and a daily limit', body: 'Set the hours Spark stays quiet and the most texts it sends per day. Replies to your own texts never count against it.' },
  { title: 'Owners and admins only', body: 'Spark Solo answers the account owners and admins who turned it on, from the phone number they verified.' },
  { title: 'One record', body: 'Text conversations show up in Spark’s chat history, and anything drafted by text is marked that way in the Action Center.' },
];

/** Reply commands and the controls that keep texting safe. */
export function SoloControlSection() {
  return (
    <section aria-labelledby="solo-control-heading" className="px-6 pb-16 md:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1120px]">
        <ScrollReveal className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Reply to act</p>
          <h2 id="solo-control-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">A few characters do the work</h2>
          <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
            Ask in plain words, or answer an alert with its code. Every item Spark texts you has a short code, like A7.
          </p>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal>
            <dl className="h-full divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-[#0a0d14] px-5">
              {replies.map((reply) => (
                <div key={reply.text} className="flex items-center gap-4 py-3">
                  <dt className="w-20 shrink-0">
                    <span className="inline-flex rounded-full bg-gradient-to-r from-cyan-500/80 to-violet-500/80 px-3 py-1 font-mono text-xs font-semibold text-white">{reply.text}</span>
                  </dt>
                  <dd className="text-sm text-[#b8bfcc]">{reply.meaning}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
          <ScrollReveal staggerChildren={60} className="grid gap-3 sm:grid-cols-2">
            {guardrails.map((item, index) => (
              <RevealItem key={item.title} index={index}>
                <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#8b95a8]">{item.body}</p>
                </article>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
