import LegalPageShell, {
  LegalSection,
  LegalP,
  LegalUl,
  LegalEmail,
} from "../agency/LegalPageShell";

export function DeleteAccountPage() {
  return (
    <LegalPageShell
      title="Delete your Spark Inventory account & data"
      subtitle="Last updated: 05/04/2026"
    >
      <LegalP>
        Spark Inventory (developed by Spark Inventory, INC) lets you request deletion of your account and the business data stored under it. Follow the steps below.
      </LegalP>

      <LegalSection title="How to Request Deletion">
        <ol className="space-y-4 text-[#b8bfcc]">
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-xs font-semibold mt-0.5">1</span>
            <span>Email <LegalEmail email="support@sparkinventory.com" /> from the email address associated with your Spark Inventory account.</span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-xs font-semibold mt-0.5">2</span>
            <span>Use the subject line <strong className="text-[#f0f2f5]/80">"Account deletion request"</strong>.</span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-xs font-semibold mt-0.5">3</span>
            <div>
              <p className="mb-2">In the body, include:</p>
              <LegalUl items={[
                "The email address on your Spark Inventory account.",
                "The business / organization name on the account.",
                "(Optional) Whether you want only your user removed, or the entire organization's data deleted.",
              ]} />
            </div>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-xs font-semibold mt-0.5">4</span>
            <span>We will verify your identity, confirm the request by email, and complete the deletion within <strong className="text-[#f0f2f5]/80">30 days</strong> of confirmation.</span>
          </li>
        </ol>

        <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <p className="text-amber-300/80 text-sm leading-relaxed">
            <strong className="text-amber-300 font-semibold">Organization owners:</strong> if you are the sole administrator of a Spark Inventory organization, deleting your user will also delete the organization and all of its business data unless you transfer ownership to another user first. Please mention this in your request if it applies.
          </p>
        </div>
      </LegalSection>

      <LegalSection title="What Gets Deleted">
        <LegalP>On completion of a deletion request, the following are permanently removed:</LegalP>
        <LegalUl items={[
          "Your user profile (name, email, password hash, profile photo, notification and dashboard preferences).",
          "Your membership and role in any Spark Inventory organization you own.",
          "If you are deleting an organization: all inventory items, vendors, customers, sales orders, purchase orders, invoices, members, attachments, and uploaded documents associated with that organization.",
          "Stored credentials and tokens for connected integrations (e.g. Amazon, Shopify, QuickBooks Online, Meta) under your organization.",
          "In-app notifications and activity history tied to your user.",
        ]} />
      </LegalSection>

      <LegalSection title="What Is Retained, and for How Long">
        <LegalUl items={[
          <><strong className="text-[#f0f2f5]/80">Encrypted database backups</strong> containing your data — up to 35 days after deletion. Disaster-recovery backups roll off automatically.</>,
          <><strong className="text-[#f0f2f5]/80">Billing and invoice records</strong> (subscription history, payment receipts) — up to 7 years. Required for tax and accounting compliance.</>,
          <><strong className="text-[#f0f2f5]/80">Anonymized / aggregated usage analytics</strong> — indefinitely. No longer linked to you and cannot be used to identify you.</>,
          <><strong className="text-[#f0f2f5]/80">Records required by law, court order, or to resolve a dispute</strong> — as required by the legal obligation.</>,
        ]} />
      </LegalSection>

      <LegalSection title="Questions">
        <LegalP>
          For questions about this process, contact <LegalEmail email="support@sparkinventory.com" />.
        </LegalP>
      </LegalSection>
    </LegalPageShell>
  );
}
