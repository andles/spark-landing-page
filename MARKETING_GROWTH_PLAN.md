# Spark Inventory Marketing Growth Plan

## Growth objective

Build one connected acquisition system that produces:

1. Qualified free trials from product-led visitors.
2. Qualified sales conversations from higher-complexity operators.
3. Compounding organic traffic from high-intent inventory-management searches.

The homepage cannot do all of this alone. Spark needs a clear category position, intent-matched landing pages, credible proof, clean measurement, and a small content cluster that earns topical authority over time.

## Positioning decision

Spark should not present itself as another lightweight Shopify forecasting plugin or as a generic, implementation-heavy ERP.

The strongest position is:

> AI inventory management that turns multichannel sales into an approval-ready reorder plan.

This creates a useful middle ground:

- More operationally complete than a forecasting-only app.
- Faster to adopt than a traditional ERP.
- More actionable than a dashboard that only reports what already happened.
- Human-controlled: Spark drafts the decision; the operator approves it.

Primary audience: product businesses that have outgrown spreadsheet planning and operate across Shopify, Amazon, wholesale, multiple warehouses, or manufacturing workflows.

## Funnel architecture

### Primary conversion

`Start 14-Day Free Trial`

Use this for visitors with clear product intent. Carry landing-page attribution into the app and measure completion plus activation, not just outbound clicks.

### Secondary conversion

`Book a 30-Minute Demo`

Use this for operators with complex migration, manufacturing, warehouse, 3PL, or multichannel questions. A booking only counts when the meeting is confirmed.

### Activation event

Define activation as the earliest action that predicts future value. Recommended starting definition:

`A new workspace completes agent-guided onboarding or connects inventory data, then views its first reorder recommendation within 24 hours.`

Treat Sparki and MCP as first-class onboarding paths—not supporting import features. Attribute activation by `onboarding_path` (`sparki`, `mcp`, `integration`, or `spreadsheet`) so the team can compare time-to-value, completion, and retained usage.

Validate this definition against retention before using it as the permanent north-star activation event.

## Measurement specification

The current website has Google Ads tracking but no visible GA4 or product-analytics property in this repository. Before judging copy or traffic quality, instrument the complete cross-domain funnel.

| Stage | Event | Primary properties |
|---|---|---|
| Landing | `page_view` | path, referrer, source, medium, campaign, device |
| Interest | `primary_cta_click` | CTA text, placement, page, destination |
| Lead | `demo_scheduler_open` | page, source, campaign |
| Lead complete | `demo_booked` | source, campaign, landing page |
| Signup | `signup_started` | source, campaign, landing page |
| Signup complete | `signup_completed` | source, campaign, landing page |
| Activation | `inventory_plan_viewed` | time-to-value, onboarding path, channel |
| Revenue | `subscription_started` | plan, source, campaign, first landing page |

Report these rates by landing page, channel, device, and new/returning visitor:

- Visitor → primary CTA click
- CTA click → signup started
- Signup started → signup completed
- Signup completed → activated
- Activated → paid
- Visitor → demo booked
- Demo booked → qualified opportunity
- Qualified opportunity → paid

Guardrail metrics: lead quality, activation rate, paid conversion, support load, refund/cancellation rate, and sales-cycle length.

## Proof plan

The site should not use unverified testimonial names, customer counts, rankings, or logos. The next proof asset should be one documented customer story with permission to publish:

- Customer name and role.
- Business type and channel mix.
- Before-state workflow.
- Time to implementation.
- Baseline and after metrics.
- Exact measurement window.
- A direct customer quote.

Place a compact version directly below the hero and a full case study on its own indexable URL. Replace “observed cohort” language with a linked methodology page once the cohort size and calculation rules can be published.

## Organic search roadmap

Google recommends clear titles, crawlable internal links, useful page content, and a sitemap. The technical foundation now supports these. The next priority is a small set of substantial, non-duplicative pages.

### Bottom-of-funnel pages

1. `/shopify-inventory-management` — implemented.
2. `/amazon-inventory-management` — Amazon/FBA stock visibility, forecasting, and purchasing.
3. `/multichannel-inventory-management` — one source of truth across commerce, wholesale, and warehouses.
4. `/inventory-forecasting-software` — demand forecasting tied to reorder and PO execution.
5. `/purchase-order-software` — reorder recommendations, approvals, receiving, and supplier workflows.

Each page must include unique examples, product screenshots, objections, internal links, and a clear next step. Do not create thin location/keyword variants.

### Comparison pages

Only publish comparisons that are factual, sourced, and maintained:

- Spark vs. Prediko: full inventory operations vs. Shopify-first planning.
- Spark vs. Cin7: faster adoption and decision workflow vs. broad ERP depth.
- Spark vs. Fishbowl: the existing page should remain the model—source public review themes and distinguish reported claims from Spark claims.

### Educational cluster

Create practical tools and guides that demonstrate expertise instead of repeating category definitions:

- Reorder point calculator with lead-time and safety-stock inputs.
- Inventory planning spreadsheet template that naturally graduates into Spark.
- Guide: how to forecast Shopify inventory by SKU and variant.
- Guide: how to calculate stockout cost and excess-inventory carrying cost.
- Guide: purchase-order approval workflow for growing ecommerce teams.
- Guide: when to move from spreadsheets to inventory-management software.

Every guide should link to the relevant feature and solution pages. Every commercial page should link back to the supporting guide where it answers an objection.

## CRO experiment backlog

Do not A/B test until event definitions and assignment are reliable. Low-traffic pages should use customer interviews, five-second tests, and sales-call review first.

| Priority | Hypothesis | Primary metric | Guardrail | ICE |
|---|---|---|---|---:|
| 1 | Adding one verified customer result below the hero will reduce trust anxiety and increase qualified trial starts. | Activated trials / visitor | Activation quality | 9.0 |
| 2 | An interactive inventory cash/reorder assessment will turn problem-aware organic visitors into qualified leads. | Qualified leads / visitor | Sales acceptance rate | 8.3 |
| 3 | Showing a sample reorder recommendation before signup will make the AI outcome concrete and increase signup completion. | Signup completion | Activated trials | 8.0 |
| 4 | Segment-specific CTA copy on Shopify and manufacturing pages will improve intent match. | CTA click-through | Downstream activation | 7.7 |
| 5 | Adding transparent implementation expectations near pricing will reduce uncertainty and increase demo bookings. | Demo bookings | Opportunity quality | 7.3 |

For a valid A/B test, preregister the hypothesis, primary metric, guardrails, minimum detectable effect, sample size, and duration. Target at least 95% confidence, 80% power, and one to two full business cycles. Do not stop early for a temporary lift.

## Voice-of-Customer research

Before the next major copy rewrite:

1. Review at least 10 recent sales calls.
2. Interview 5 successful customers and 3 lost prospects.
3. Mine support conversations for implementation and integration objections.
4. Tag exact language as pain, desired outcome, trigger, objection, or value.
5. Update the homepage only when a repeated message is stronger than the current positioning.

Questions to answer:

- What happened that made the buyer start looking now?
- Which spreadsheet or system is being replaced?
- Who feels the pain and who approves the purchase?
- What makes a forecast believable enough to act on?
- Which integration or workflow blocks adoption?
- What result made the product feel valuable for the first time?

## 90-day operating plan

### Days 1–14

- Deploy the current conversion and technical SEO foundation.
- Connect GA4 or a product-analytics platform across the marketing site and app.
- Verify Google Ads conversions and deduplication.
- Submit the sitemap in Google Search Console.
- Request indexing for the homepage, Shopify page, and highest-value feature pages.
- Begin customer proof interviews.

### Days 15–30

- Publish the first verified case study.
- Publish Amazon, multichannel, forecasting, and purchase-order landing pages.
- Add screenshots that show the recommendation-to-approval workflow.
- Review search queries and sales-call language weekly.

### Days 31–60

- Launch the reorder point or inventory cash calculator.
- Publish two high-utility guides from the educational cluster.
- Add lead routing and qualification reporting for demos.
- Run five-second and message tests on the homepage and Shopify page.

### Days 61–90

- Start the highest-priority experiment only if sample size is sufficient.
- Expand the content cluster based on impressions and qualified conversions, not raw traffic alone.
- Refresh internal links toward pages earning impressions but weak rankings.
- Review activated-trial and paid conversion by original landing page.

## Source references

- [Google: influencing title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google: crawlable ecommerce site structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure)
- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Shopify inventory management category language](https://www.shopify.com/inventory-management)
- [Prediko product positioning](https://www.prediko.io/)
- [Cin7 ecommerce inventory positioning](https://www.cin7.com/industries/retail-and-ecommerce/)
