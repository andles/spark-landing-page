import LegalPageShell, {
  LegalSection,
  LegalSubSection,
  LegalP,
  LegalUl,
  LegalEmail,
  LegalAddress,
} from "../agency/LegalPageShell";

export function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      subtitle="Effective date: 05/01/2026"
    >
      <LegalP>
        This Privacy Policy describes how Spark Inventory, INC ("Spark Inventory", "we", "us", or "our") collects, uses, and shares information when you use the Spark Inventory mobile application (the "App") and related services (together, the "Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.
      </LegalP>

      <LegalSection title="1. Information We Collect">
        <LegalSubSection title="1.1 Information you provide">
          <LegalUl items={[
            <><strong className="text-[#f0f2f5]/80">Account information.</strong> When you sign in, we collect your email address and authentication credentials.</>,
            <><strong className="text-[#f0f2f5]/80">Workspace data.</strong> Inventory items, locations, sales orders, purchase orders, packing records, and other operational data you or your organization enter into the App.</>,
            <><strong className="text-[#f0f2f5]/80">Support communications.</strong> Messages, screenshots, or attachments you send to our support team.</>,
          ]} />
        </LegalSubSection>

        <LegalSubSection title="1.2 Information collected automatically">
          <LegalUl items={[
            <><strong className="text-[#f0f2f5]/80">Device information.</strong> Device model, operating system version, unique device identifiers, app version, and language settings.</>,
            <><strong className="text-[#f0f2f5]/80">Usage data.</strong> Screens viewed, features used, crash logs, and performance metrics, used to diagnose problems and improve the App.</>,
            <><strong className="text-[#f0f2f5]/80">Log data.</strong> IP address, access times, and request metadata when the App communicates with our servers.</>,
          ]} />
        </LegalSubSection>

        <LegalSubSection title="1.3 Camera and barcode scanning">
          <LegalP>
            The App uses your device's camera <strong className="text-[#f0f2f5]/80">only</strong> to scan barcodes and QR codes for inventory operations. Camera frames are processed on-device in real time and are <strong className="text-[#f0f2f5]/80">not stored, recorded, or transmitted</strong> to our servers or any third party. The decoded barcode value (a short string of text) is sent to our servers only when needed to look up or update inventory.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="1.4 Hardware barcode scanners">
          <LegalP>
            If you connect a hardware barcode scanner via Bluetooth or USB, the App receives the decoded text values from that device. We do not access any other Bluetooth or peripheral data.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="1.5 Information we do not collect">
          <LegalUl items={[
            "We do not collect your contacts, photos, microphone audio, precise location, or biometric data.",
            "We do not use third-party advertising networks or sell personal information.",
          ]} />
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="2. How We Use Information">
        <LegalP>We use the information we collect to:</LegalP>
        <LegalUl items={[
          "Provide, maintain, and improve the Service;",
          "Authenticate you and secure your account;",
          "Synchronize your workspace data across devices;",
          "Provide AI-assisted chat features (see Section 4);",
          "Diagnose and fix bugs, crashes, and performance issues;",
          "Communicate with you about service updates, security alerts, and support requests;",
          "Comply with legal obligations and enforce our terms.",
        ]} />
      </LegalSection>

      <LegalSection title="3. How We Share Information">
        <LegalP>We share information only as described below:</LegalP>
        <LegalUl items={[
          <><strong className="text-[#f0f2f5]/80">With your organization.</strong> Data you enter into a workspace is visible to other authorized members of that workspace.</>,
          <><strong className="text-[#f0f2f5]/80">With service providers.</strong> We use trusted third parties to host infrastructure, deliver push notifications, monitor errors, and process AI requests. These providers may only use your data to perform services for us.</>,
          <><strong className="text-[#f0f2f5]/80">For legal reasons.</strong> We may disclose information if required by law, subpoena, or to protect the rights, property, or safety of our users or others.</>,
          <><strong className="text-[#f0f2f5]/80">In a business transfer.</strong> If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</>,
        ]} />
        <LegalP>We do <strong className="text-[#f0f2f5]/80">not</strong> sell your personal information.</LegalP>
      </LegalSection>

      <LegalSection title="4. AI Features">
        <LegalP>
          The App includes an AI chat assistant. When you interact with it, your messages and relevant workspace context are sent to our AI processing provider to generate a response. We do not use your data to train third-party foundation models. You can avoid using AI features by not opening the chat tab.
        </LegalP>
      </LegalSection>

      <LegalSection title="5. Google Account Integration (Gmail)">
        <LegalP>
          Spark Inventory offers an optional integration that connects your Google account to allow the App to send emails on your behalf (for example, emailing purchase orders or invoices to vendors and customers). This section explains exactly how that integration works and what data we access.
        </LegalP>

        <LegalSubSection title="5.1 What we access">
          <LegalP>
            When you connect your Google account, we request only the <strong className="text-[#f0f2f5]/80">gmail.send</strong> OAuth scope. This allows the App to compose and send emails from your Gmail address. We do <strong className="text-[#f0f2f5]/80">not</strong> access, read, index, or store:
          </LegalP>
          <LegalUl items={[
            "Your inbox or any received emails;",
            "Your contacts, calendar, or Google Drive;",
            "Your email drafts or sent-mail folder (we only trigger the send action — Google records the sent copy in your Sent folder as normal).",
          ]} />
        </LegalSubSection>

        <LegalSubSection title="5.2 When emails are sent">
          <LegalP>
            The App sends an email through your Gmail account <strong className="text-[#f0f2f5]/80">only</strong> when you explicitly trigger the action — for example, by tapping "Send" on a purchase order or invoice. We never send emails automatically or without your direct instruction.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="5.3 What we store">
          <LegalUl items={[
            <><strong className="text-[#f0f2f5]/80">Encrypted OAuth refresh token.</strong> To avoid requiring you to re-authorize on every session, we store an encrypted refresh token on our servers. This token is used solely to obtain short-lived access tokens for the gmail.send scope.</>,
            <><strong className="text-[#f0f2f5]/80">Send audit log.</strong> For each email sent through the integration, we record the recipient address, subject line, timestamp, and the Spark Inventory document reference (e.g., PO #1234). This log is visible to workspace administrators and is retained as part of your workspace data under our standard retention policy (see Section 6).</>,
          ]} />
          <LegalP>
            We do not store the body or attachments of sent emails on our servers beyond the time required to deliver them.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="5.4 Third-party sharing">
          <LegalP>
            Data obtained through the Gmail integration is used solely to send emails on your behalf. It is not shared with any third party other than Google (via the Gmail API) and our infrastructure providers who host our servers under confidentiality obligations. We do not use this data to train AI models or for advertising.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="5.5 Revoking access">
          <LegalP>
            You can disconnect the Gmail integration at any time from the App's Settings screen. You can also revoke access directly at{" "}
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              myaccount.google.com/permissions
            </a>
            . Upon revocation, we delete your stored refresh token within 30 days.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="5.6 Google API Services User Data Policy">
          <LegalP>
            Spark Inventory's use and transfer of information received from Google APIs adheres to the{" "}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <LegalP>
          We retain your account and workspace data for as long as your account is active. If you or your organization delete your account, we delete associated data within 30 days, except where we are required to retain it for legal, tax, or audit purposes.
        </LegalP>
      </LegalSection>

      <LegalSection title="7. Data Security">
        <LegalP>
          We use industry-standard measures to protect your information, including encryption in transit (TLS) and at rest, role-based access controls, and audit logging. No system is perfectly secure; if we become aware of a breach affecting your data, we will notify you in accordance with applicable law.
        </LegalP>
      </LegalSection>

      <LegalSection title="8. Your Rights">
        <LegalP>Depending on where you live, you may have rights to:</LegalP>
        <LegalUl items={[
          "Access the personal data we hold about you;",
          "Correct or update inaccurate data;",
          "Delete your data;",
          "Object to or restrict certain processing;",
          "Receive a copy of your data in a portable format;",
          "Withdraw consent (where processing is based on consent);",
          "Lodge a complaint with a supervisory authority.",
        ]} />
        <LegalP>
          To exercise any of these rights, contact us at <LegalEmail email="support@sparkinventory.com" />. We will respond within the time required by applicable law.
        </LegalP>

        <LegalSubSection title="8.1 California residents (CCPA/CPRA)">
          <LegalP>
            California residents have additional rights under the California Consumer Privacy Act, including the right to know what personal information we collect and the right not to be discriminated against for exercising these rights. We do not sell or share personal information for cross-context behavioral advertising.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="8.2 European Economic Area, UK, and Switzerland (GDPR)">
          <LegalP>
            If you are in the EEA, UK, or Switzerland, our legal bases for processing are: performance of a contract (providing the Service), legitimate interests (improving and securing the Service), and consent (where applicable). Data may be transferred to and processed in countries outside your jurisdiction; where required, we use Standard Contractual Clauses or equivalent safeguards.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="9. Children">
        <LegalP>
          The Service is not directed to children under 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact <LegalEmail email="support@sparkinventory.com" /> and we will delete it.
        </LegalP>
      </LegalSection>

      <LegalSection title="10. International Users">
        <LegalP>
          The Service is operated from the State of New York. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries.
        </LegalP>
      </LegalSection>

      <LegalSection title="11. Changes to This Policy">
        <LegalP>
          We may update this Privacy Policy from time to time. We will post the new policy here and update the "Effective date" at the top. Material changes will be communicated via email or in-app notice.
        </LegalP>
      </LegalSection>

      <LegalSection title="12. Contact Us">
        <LegalP>If you have questions about this Privacy Policy or our data practices, contact us at:</LegalP>
        <LegalAddress />
      </LegalSection>
    </LegalPageShell>
  );
}
