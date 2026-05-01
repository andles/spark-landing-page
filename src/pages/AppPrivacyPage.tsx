import LegalPageShell, {
  LegalSection,
  LegalSubSection,
  LegalP,
  LegalUl,
  LegalDl,
  LegalBadge,
} from "../agency/LegalPageShell";

export function AppPrivacyPage() {
  return (
    <LegalPageShell
      title="App Privacy Details"
      subtitle="Apple App Store — App Privacy. Kept in sync with our Privacy Policy and Google Play Data Safety form."
    >
      <LegalSection title="Privacy Practices">
        <LegalSubSection title="Data Linked to You">
          <LegalP>Data we collect that is linked to the user's identity:</LegalP>
          <LegalDl items={[
            {
              term: "Contact Info → Email Address",
              definition: "Used for: App Functionality, Account Management · Linked to user: Yes · Used for tracking: No",
            },
            {
              term: "Identifiers → User ID",
              definition: "Used for: App Functionality, Analytics · Linked to user: Yes · Used for tracking: No",
            },
            {
              term: "Usage Data → Product Interaction",
              definition: "Used for: Analytics, App Functionality · Linked to user: Yes · Used for tracking: No",
            },
            {
              term: "Diagnostics → Crash Data, Performance Data",
              definition: "Used for: App Functionality, Analytics · Linked to user: Yes · Used for tracking: No",
            },
          ]} />
        </LegalSubSection>

        <LegalSubSection title="Data Not Linked to You">
          <LegalP>None — all data we collect is associated with an authenticated account.</LegalP>
        </LegalSubSection>

        <LegalSubSection title="Data Used to Track You">
          <LegalP>
            None. We do not use any data for tracking as defined by Apple (linking user or device data with third-party data for advertising or sharing with data brokers).
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="Data Types Explicitly Not Collected">
        <LegalUl items={[
          "Health & Fitness",
          "Financial Info",
          "Location (precise or coarse)",
          "Sensitive Info",
          "Contacts",
          "User Content (photos, videos, audio, or customer support communications beyond what the user voluntarily emails to support)",
          "Browsing History",
          "Search History",
        ]} />
      </LegalSection>

      <LegalSection title="Camera Usage">
        <LegalP>
          The app's <code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">Info.plist</code> includes{" "}
          <code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">NSCameraUsageDescription</code>{" "}
          because the camera is used to scan barcodes.{" "}
          <strong className="text-[#f0f2f5]/80">Camera frames are not collected, stored, or transmitted.</strong>{" "}
          Only the decoded barcode value (a short string) is sent to our servers when needed for inventory lookups.
        </LegalP>
        <LegalP>
          In App Privacy, this means <strong className="text-[#f0f2f5]/80">Camera does not appear</strong> under collected data types — the camera is used in-session only.
        </LegalP>
      </LegalSection>

      <LegalSection title="Permissions Strings">
        <LegalDl items={[
          {
            term: "NSCameraUsageDescription",
            definition: '"Spark Inventory uses the camera to scan barcodes and QR codes for inventory operations. Camera frames are processed on-device and are not stored or transmitted."',
          },
          {
            term: "NSBluetoothAlwaysUsageDescription (if hardware scanner support is enabled)",
            definition: '"Spark Inventory connects to Bluetooth barcode scanners to capture inventory data."',
          },
        ]} />
      </LegalSection>

      <LegalSection title="Privacy Manifest (PrivacyInfo.xcprivacy)">
        <LegalP>
          iOS 17+ and App Store submissions require a Privacy Manifest. The app declares all "required reason" APIs it uses:
        </LegalP>
        <LegalDl items={[
          {
            term: <span><code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">NSPrivacyAccessedAPICategoryUserDefaults</code> — reason <LegalBadge>CA92.1</LegalBadge></span> as any,
            definition: "Accessing UserDefaults to read/write information that is only accessible to the app itself.",
          },
          {
            term: <span><code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">NSPrivacyAccessedAPICategoryFileTimestamp</code> — reason <LegalBadge>C617.1</LegalBadge></span> as any,
            definition: "Display to the user.",
          },
          {
            term: <span><code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">NSPrivacyAccessedAPICategoryDiskSpace</code> — reason <LegalBadge>E174.1</LegalBadge></span> as any,
            definition: "Write or delete files based on available space.",
          },
          {
            term: <span><code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">NSPrivacyAccessedAPICategorySystemBootTime</code> — reason <LegalBadge>35F9.1</LegalBadge></span> as any,
            definition: "System boot time access.",
          },
        ]} />
      </LegalSection>

      <LegalSection title="Privacy Nutrition Label — Summary">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <LegalP>
            Spark Inventory collects only the data needed to run your account: your email, basic device identifiers, app usage and crash diagnostics, and the inventory data your team enters. We do not track you across apps, do not sell your data, and do not use third-party advertising SDKs. The camera is used for on-device barcode scanning only — no photos or video are ever recorded or uploaded.
          </LegalP>
        </div>
      </LegalSection>
    </LegalPageShell>
  );
}
