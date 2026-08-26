// FAQ content for the /charity-retail solutions page. Kept separate from
// campaignFaqs.ts so the charity page (British English, demo-led, no trial
// CTA) does not widen the CampaignKind union used by the shared sections.

export interface CharityFaq {
  question: string;
  answer: string;
}

export const charityFaqs: CharityFaq[] = [
  {
    question: "Do volunteers need training to use Spark?",
    answer:
      "No. If a volunteer can take a photo, they can run intake. Spark handles identification, pricing, and labelling; the volunteer confirms the result and moves to the next item. A new starter and a 20-year veteran price identically.",
  },
  {
    question: "Does Spark replace our EPOS or till systems?",
    answer:
      "No. The pilot runs standalone alongside your existing tills, so there is nothing to integrate before you start. Deeper integration is a decision for later, once the pilot has proved its numbers.",
  },
  {
    question: "How does Gift Aid compliance work?",
    answer:
      "Intake links each item to its donor at the moment of donation, so Gift Aid capture rises without changing how shop teams work. The digital record Spark creates for every item keeps the HMRC audit trail complete and automatic.",
  },
  {
    question: "Who owns the data Spark collects?",
    answer:
      "Your charity does. The item records, prices, donor links, and sales history generated through Spark belong to you.",
  },
  {
    question: "How is a pilot structured and priced?",
    answer:
      "A pilot starts with intake and pricing in 15 to 20 shops, measured against comparable baseline shops. Pricing depends on the scale and scope of your estate, so the practical next step is a 30-minute conversation. Book a demo and we will shape it together.",
  },
];

export function buildCharityFaqSchema(): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: charityFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
