# Demand ESP landing-page evidence

Approved by the site owner in the landing-page review on 2026-09-14, including the instruction to commit and push to origin/main. Demand ESP (with a space) is the approved forecasting brand. The hero remains unchanged.

## 19% lower forecast error

Source: Spark benchmark program, branch `claude/spark-demandiq-benchmark-4f5de7`, `benchmarks/demandiq/results/IOWA-FINAL-modeA-postfix-v1/analysis/tables.json`, `by_horizon["6"]`.

Retrospective public Iowa wholesale-invoice cohort: 799 items, six-month forecast horizon, one eligible forecast origin. Product base commit `9e2e1b8ca`, server tree `97f8da3631e5b5ded0050fbfdfe2b4f45fcfec6b`. Spark pooled WAPE: 0.2202457649600182. Last-month (Naive) WAPE: 0.2710141357486641. Relative reduction: `(1 - Spark / Naive) * 100 = 18.732739%`, rounded to 19%. Not a 19-percentage-point reduction. No confidence interval at this horizon and no claim of superiority over all methods.

## 12% less inventory

Source: the same run's `sim/matched_service_0.98.md`. 400 public-data items, matched interpolated 98% fill rate, same order-up-to policy, 14-day lead time, lost sales, uniform $12 unit cost. Average on-hand cost approximately $4.11604M for Spark versus $4.67146M for last-month forecasting, about 11.89% lower. ETS and Theta required less inventory than Spark. No confidence interval. This measures a simulation, not realized customer savings; the on-page footnote and disclosure retain this distinction.

## Under one hour to forecast

Source: site owner's explicit attestation on 2026-09-14 of a completed onboarding flow using real customer data, from export files to a working forecast. Owner authorized the claim and removal of the internal-test qualifier. No customer identity or data is published. Timing logs and dataset details were not supplied in this review; no universal timing guarantee or purchasing-completion claim is made.

## Branding and media

Source copy, Fishbowl video narration, metadata, visible transcript, and captions use Demand ESP. The approved September 14 media refresh replaces the old homepage inside the original hero video’s laptop shot with a fitted current-brand layout, preserving the original soundtrack and runtime. The outgoing swipe moves the laptop and replacement display together. The Fishbowl video uses fresh synthetic Northstar demo charts and continuous ESP pronunciation. Final media is referenced through new filenames to avoid stale cached playback. Intermediate review drafts are not deployed.
