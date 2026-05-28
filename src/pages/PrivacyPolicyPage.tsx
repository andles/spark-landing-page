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
      subtitle="Effective date: 05/26/2026"
    >
      <LegalP>
        This Privacy Policy describes how Spark Inventory, INC ("Spark Inventory", "we", "us", or "our") collects, uses, and shares information when you use the Spark Inventory mobile and web applications (the "App") and related services (together, the "Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.
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

      <LegalSection title="5. Google account integration (Gmail)">
        <LegalP>
          Spark Inventory offers an optional integration with your Gmail account so you can send replies to suppliers and customers directly from the address they know you by. This section describes how we handle data accessed via Google's APIs.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">What we access.</strong> When you choose to connect a Gmail account in Spark Inventory, we request a single Google OAuth scope: gmail.send (described to you on Google's consent screen as "Send email on your behalf"). This is the narrowest Gmail scope that permits sending.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">What we do not access.</strong> With this scope, we cannot read, search, modify, label, archive, delete, or otherwise interact with any messages in your Gmail mailbox. We do not have access to your inbox, contacts, drafts, or any other Gmail data.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">How we use it.</strong> We send a message via Gmail only when you explicitly click "Send" on a reply or follow-up you have composed inside Spark Inventory. We do not send autonomous, bulk, or marketing email through this integration.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">How we store the data.</strong> Spark Inventory stores an encrypted OAuth refresh token tied to your Spark Inventory account so the integration continues to work without re-authentication. Outgoing messages and the events that triggered them are recorded in our internal logs for diagnostic and audit purposes.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Third parties.</strong> Outgoing messages are transmitted only between Spark Inventory's servers and Google's Gmail API. No other third party receives data obtained via Google's APIs.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">How to revoke access.</strong> You can disconnect your Gmail account at any time from Spark Inventory's Email accounts page (Profile → Email accounts). You can also revoke Spark Inventory's access directly from your Google Account at{" "}
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            myaccount.google.com/permissions
          </a>
          . Disconnection deletes the stored refresh token within 30 days.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Limited Use compliance.</strong> Spark Inventory's use of information received from Google APIs adheres to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. We do not transfer, use, or store Google user data for serving advertisements, and we do not allow humans to read Google user data except (a) with your explicit consent, (b) for security purposes such as investigating abuse, (c) to comply with applicable law, or (d) for limited internal operations where the data has been aggregated and anonymized.
        </LegalP>
      </LegalSection>

      <LegalSection title="6. SMS / Text Message Communications">
        <LegalP>
          This section describes how we collect, use, and protect the information you provide when you opt in to receive SMS text messages from Spark Inventory.
        </LegalP>

        <LegalSubSection title="What we collect when you opt in to SMS">
          <LegalP>
            When you enable SMS notifications from your Spark Inventory account settings, we collect and store:
          </LegalP>
          <LegalUl items={[
            "The mobile phone number you provide",
            "The date and time you opted in",
            "The IP address and user-agent string of the device used to opt in",
            "The exact version identifier of the consent statement you agreed to",
            "Your per-notification-type preferences (which message categories you've enabled or disabled)",
          ]} />
          <LegalP>
            We also retain a per-message delivery log (timestamp, carrier-reported status, and provider message identifier) so that we can troubleshoot delivery problems and honor opt-out requests reliably.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="How we use this information">
          <LegalP>
            Mobile phone numbers collected through the SMS opt-in are used solely to deliver the transactional operational notifications you have subscribed to (inventory alerts, order updates, and similar operational events in your Spark account), and to support opt-out (STOP) and help (HELP) requests. We do not use SMS opt-in data for marketing or promotional outreach. We do not send marketing SMS.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="How we protect and share this information">
          <LegalP>
            No mobile information will be sold or shared with third parties for promotional or marketing purposes. We do not rent, sell, or otherwise make available any mobile phone numbers, opt-in records, or related data to third parties for advertising or marketing.
          </LegalP>
          <LegalP>
            We share mobile phone numbers only with the SMS service provider that delivers the messages on our behalf (currently Twilio), strictly for the purpose of sending the message and receiving delivery status confirmations. Our SMS service provider is bound by their own contractual confidentiality and data-handling obligations.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="How to revoke consent">
          <LegalP>You can revoke your consent to receive SMS at any time by either:</LegalP>
          <LegalUl items={[
            <>Replying <strong className="text-[#f0f2f5]/80">STOP</strong> to any Spark Inventory SMS — your opt-out is recorded immediately, and you will not receive further messages.</>,
            <>Visiting <strong className="text-[#f0f2f5]/80">Profile → SMS notifications</strong> inside your Spark Inventory account and clicking "Turn off SMS".</>,
          ]} />
          <LegalP>
            Replying <strong className="text-[#f0f2f5]/80">HELP</strong> to any Spark Inventory SMS will return a brief description of the program and our support contact (<LegalEmail email="support@sparkinventory.com" />).
          </LegalP>
          <LegalP>
            For full details about the SMS program, including the verbatim consent statement, frequency expectations, and sample message content, see{" "}
            <a href="https://sparkinventory.com/sms-program" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              sparkinventory.com/sms-program
            </a>.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="7. Data Retention">
        <LegalP>
          We retain your account and workspace data for as long as your account is active. If you or your organization delete your account, we delete associated data within 30 days, except where we are required to retain it for legal, tax, or audit purposes.
        </LegalP>
      </LegalSection>

      <LegalSection title="8. Data Security">
        <LegalP>
          We use industry-standard measures to protect your information, including encryption in transit (TLS) and at rest, role-based access controls, and audit logging. No system is perfectly secure; if we become aware of a breach affecting your data, we will notify you in accordance with applicable law.
        </LegalP>
      </LegalSection>

      <LegalSection title="9. Your Rights">
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

        <LegalSubSection title="9.1 California residents (CCPA/CPRA)">
          <LegalP>
            California residents have additional rights under the California Consumer Privacy Act, including the right to know what personal information we collect and the right not to be discriminated against for exercising these rights. We do not sell or share personal information for cross-context behavioral advertising.
          </LegalP>
        </LegalSubSection>

        <LegalSubSection title="9.2 European Economic Area, UK, and Switzerland (GDPR)">
          <LegalP>
            If you are in the EEA, UK, or Switzerland, our legal bases for processing are: performance of a contract (providing the Service), legitimate interests (improving and securing the Service), and consent (where applicable). Data may be transferred to and processed in countries outside your jurisdiction; where required, we use Standard Contractual Clauses or equivalent safeguards.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="10. Children">
        <LegalP>
          The Service is not directed to children under 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact <LegalEmail email="support@sparkinventory.com" /> and we will delete it.
        </LegalP>
      </LegalSection>

      <LegalSection title="11. International Users">
        <LegalP>
          The Service is operated from the State of New York. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries.
        </LegalP>
      </LegalSection>

      <LegalSection title="12. Changes to This Policy">
        <LegalP>
          We may update this Privacy Policy from time to time. We will post the new policy here and update the "Effective date" at the top. Material changes will be communicated via email or in-app notice.
        </LegalP>
      </LegalSection>

      <LegalSection title="13. Contact Us">
        <LegalP>If you have questions about this Privacy Policy or our data practices, contact us at:</LegalP>
        <LegalAddress />
      </LegalSection>
    </LegalPageShell>
  );
}
