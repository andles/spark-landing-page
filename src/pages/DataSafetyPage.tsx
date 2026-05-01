import LegalPageShell, {
  LegalSection,
  LegalP,
  LegalTable,
} from "../agency/LegalPageShell";

export function DataSafetyPage() {
  return (
    <LegalPageShell
      title="Google Play — Data Safety Form"
      subtitle="Answers to the Play Console Data safety form (Policy → App content → Data safety). Kept in sync with our Privacy Policy."
    >
      <LegalSection title="Data Collection and Security">
        <LegalTable
          headers={["Question", "Answer"]}
          rows={[
            ["Does your app collect or share any of the required user data types?", <strong className="text-[#f0f2f5]/80">Yes</strong>],
            ["Is all of the user data collected by your app encrypted in transit?", <strong className="text-[#f0f2f5]/80">Yes</strong>],
            [
              "Do you provide a way for users to request that their data is deleted?",
              <><strong className="text-[#f0f2f5]/80">Yes</strong> — via <a href="mailto:support@sparkinventory.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">support@sparkinventory.com</a> or workspace admin</>,
            ],
            ["Is your app committed to following the Play Families Policy?", "No — the app is not directed at children"],
            ["Has your app been independently security-reviewed against a global standard?", "No (or Yes if a SOC 2 / ISO 27001 audit has been completed)"],
          ]}
        />
      </LegalSection>

      <LegalP>
        For each data type below: <strong className="text-[#f0f2f5]/80">Shared = No</strong> — we do not share data with third parties for their own use.
      </LegalP>

      <LegalSection title="Personal Info">
        <LegalTable
          headers={["Type", "Collected", "Purpose", "Required"]}
          rows={[
            ["Name", "No", "—", "—"],
            ["Email address", <strong className="text-[#f0f2f5]/80">Yes</strong>, "Account management, communication", "Required"],
            ["User IDs", <strong className="text-[#f0f2f5]/80">Yes</strong>, "Account management, analytics", "Required"],
            ["Address, phone, race/ethnicity, political beliefs, sexual orientation, religion, other personal info", "No", "—", "—"],
          ]}
        />
      </LegalSection>

      <LegalSection title="Financial Info">
        <LegalTable
          headers={["Type", "Collected", "Purpose", "Required"]}
          rows={[["All categories", "No", "—", "—"]]}
        />
      </LegalSection>

      <LegalSection title="Location">
        <LegalTable
          headers={["Type", "Collected", "Purpose", "Required"]}
          rows={[["Approximate / Precise location", "No", "—", "—"]]}
        />
      </LegalSection>

      <LegalSection title="App Activity">
        <LegalTable
          headers={["Type", "Collected", "Purpose", "Required"]}
          rows={[
            ["App interactions", <strong className="text-[#f0f2f5]/80">Yes</strong>, "Analytics, app functionality", "Optional"],
            ["In-app search history", "No", "—", "—"],
            ["Other actions", "No", "—", "—"],
          ]}
        />
      </LegalSection>

      <LegalSection title="App Info and Performance">
        <LegalTable
          headers={["Type", "Collected", "Purpose", "Required"]}
          rows={[
            ["Crash logs", <strong className="text-[#f0f2f5]/80">Yes</strong>, "Diagnostics", "Required"],
            ["Diagnostics", <strong className="text-[#f0f2f5]/80">Yes</strong>, "App functionality, analytics", "Required"],
            ["Other app performance data", "No", "—", "—"],
          ]}
        />
      </LegalSection>

      <LegalSection title="Device or Other IDs">
        <LegalTable
          headers={["Type", "Collected", "Purpose", "Required"]}
          rows={[
            ["Device or other IDs", <strong className="text-[#f0f2f5]/80">Yes</strong>, "Analytics, fraud prevention, app functionality", "Required"],
          ]}
        />
      </LegalSection>

      <LegalSection title="Photos, Videos, Audio, Files, Calendar, Contacts, Messages, Health, Web Browsing">
        <LegalP>All <strong className="text-[#f0f2f5]/80">No</strong>.</LegalP>
      </LegalSection>

      <LegalSection title="Camera">
        <LegalP>
          The Play Data Safety form considers "Camera" as part of <em>Photos and videos</em> only if you collect or upload images. We use the camera <strong className="text-[#f0f2f5]/80">only</strong> to decode barcodes on-device — frames are not stored or transmitted — so this is <strong className="text-[#f0f2f5]/80">No</strong> under "Photos and videos collected".
        </LegalP>
        <LegalP>
          The Play Console will still flag the <code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">CAMERA</code> permission and require a privacy policy URL, which is provided at <a href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 transition-colors">sparkinventory.com/privacy-policy</a>.
        </LegalP>
      </LegalSection>

      <LegalSection title="Notes">
        <ul className="list-disc list-inside space-y-2 text-[#b8bfcc]">
          <li>"Required" means the user cannot opt out and continue using the feature.</li>
          <li>"Optional" means the user can use the app without that data being collected (e.g. analytics could be opt-in).</li>
          <li>Re-review this whenever you add SDKs (analytics, crash reporting, push notifications, AI providers) — each may add new data types.</li>
        </ul>
      </LegalSection>
    </LegalPageShell>
  );
}
