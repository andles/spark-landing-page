import LegalPageShell, {
  LegalSection,
  LegalSubSection,
  LegalP,
  LegalUl,
  LegalEmail,
  LegalAddress,
} from "../agency/LegalPageShell";

export function SupportPage() {
  return (
    <LegalPageShell title="Support">
      <LegalP>We're here to help you get the most out of Spark Inventory.</LegalP>

      <LegalSection title="Contact Us">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[#b8bfcc]/50 text-sm w-28 shrink-0">Email</span>
            <LegalEmail email="support@sparkinventory.com" />
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#b8bfcc]/50 text-sm w-28 shrink-0">Response time</span>
            <span className="text-[#b8bfcc] text-sm">Within 1 business day, Monday – Friday</span>
          </div>
        </div>

        <LegalP>When emailing, please include:</LegalP>
        <LegalUl items={[
          "Where you're working (web, iOS, or Android) and your browser or device",
          "The app version, when reporting a mobile issue (Settings → About)",
          "A description of what you were trying to do",
          "A screenshot or screen recording, if possible",
        ]} />
      </LegalSection>

      <LegalSection title="Common Topics">
        <LegalSubSection title="Getting Started and Imports">
          <LegalUl items={[
            "Choose how to start: connect a sales channel, upload spreadsheets for Sparki, or connect your AI assistant through MCP.",
            "Review the onboarding readiness checks for inventory, sales history, suppliers, lead times, and purchase orders.",
            "Approve proposed imports and verify the resulting counts before moving into live planning.",
          ]} />
        </LegalSubSection>

        <LegalSubSection title="Barcode Scanning">
          <LegalUl items={[
            "The camera scanner works with most 1D and 2D barcode formats.",
            "For high-volume scanning, you can connect a Bluetooth or USB hardware scanner. Once paired with your device, it will work directly inside the app.",
          ]} />
        </LegalSubSection>

        <LegalSubSection title="Connectivity and Sync">
          <LegalP>
            Spark Inventory requires an internet connection to load and sync data. If you encounter sync issues, pull down to refresh on most screens.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="Account and Access">
          <LegalUl items={[
            "Workspace administrators manage user invites and roles. Contact your admin to request access changes.",
            <>To reset your password, use the "Forgot password?" link on the login screen.</>,
          ]} />
        </LegalSubSection>

        <LegalSubSection title="Reporting a Bug">
          <LegalP>
            Please email <LegalEmail email="support@sparkinventory.com" /> with the details listed above. If the app has crashed, we may already have the crash log, but a description of what you were doing helps us reproduce it faster.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="Privacy and Legal">
        <LegalUl items={[
          <><a href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</a></>,
          <><a href="/terms-of-service" className="text-cyan-400 hover:text-cyan-300 transition-colors">Terms of Service</a></>,
        ]} />
      </LegalSection>

      <LegalSection title="Company">
        <LegalAddress />
      </LegalSection>
    </LegalPageShell>
  );
}
