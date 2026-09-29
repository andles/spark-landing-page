import LegalPageShell, {
  LegalSection,
  LegalP,
  LegalUl,
  LegalEmail,
  LegalAddress,
} from "../agency/LegalPageShell";

export function TermsOfServicePage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      subtitle="Effective date: 09/28/2026"
    >
      <LegalP>
        These Terms of Service ("Terms") govern your access to and use of the Spark Inventory mobile application and related services (the "Service") provided by Spark Inventory, INC ("we", "us", or "our"). By creating an account or using the Service, you agree to these Terms.
      </LegalP>

      <LegalSection title="1. Eligibility and Account">
        <LegalP>
          You must be at least 18 years old, or the age of majority in your jurisdiction, to use the Service. You are responsible for keeping your login credentials confidential and for all activity under your account. Notify us immediately at <LegalEmail email="support@sparkinventory.com" /> if you suspect unauthorized use.
        </LegalP>
      </LegalSection>

      <LegalSection title="2. Workspaces and Roles">
        <LegalP>
          The Service is organized into workspaces. The organization that owns a workspace ("Customer") is responsible for managing access, roles, and data within that workspace. If you use the Service on behalf of a Customer, you represent that you are authorized to do so on their behalf.
        </LegalP>
      </LegalSection>

      <LegalSection title="3. Acceptable Use">
        <LegalP>You agree not to:</LegalP>
        <LegalUl items={[
          "Use the Service for any unlawful purpose;",
          "Attempt to gain unauthorized access to any part of the Service;",
          "Interfere with or disrupt the Service or its infrastructure;",
          "Reverse engineer, decompile, or disassemble the Service except as permitted by law;",
          "Upload malicious code, viruses, or harmful content;",
          "Use the Service to infringe any third party's rights, including intellectual property and privacy rights;",
          "Resell, sublicense, or commercially exploit the Service without our written permission.",
        ]} />
      </LegalSection>

      <LegalSection title="4. Customer Data">
        <LegalP>
          You retain all rights to data submitted, uploaded, imported, transmitted, synchronized, or otherwise made available to the Service by or on behalf of Customer ("Customer Data"). You grant us a limited, worldwide, non-exclusive license to access, host, copy, transmit, display, store, process, analyze, and transform Customer Data solely to provide the Service to Customer, including to provide demand forecasts, analytics, inventory planning, replenishment and purchasing recommendations, recommended order quantities, draft purchase order generation, alerts, reports, and other features of the Service, and as otherwise permitted by these Terms and our Privacy Policy.
        </LegalP>
        <LegalP>
          You are responsible for the accuracy, legality, and appropriateness of Customer Data and for obtaining all necessary rights and consents to provide or make Customer Data available to the Service.
        </LegalP>
      </LegalSection>

      <LegalSection title="5. Subscription and Fees">
        <LegalP>
          Some features of the Service may require a paid subscription. Fees, billing terms, and renewal terms are as set out in your order or subscription agreement. Unless otherwise stated, fees are non-refundable and exclusive of taxes.
        </LegalP>
      </LegalSection>

      <LegalSection title="6. Intellectual Property">
        <LegalP>
          The Service, including all software, content, designs, and trademarks, is owned by Spark Inventory, INC or its licensors and is protected by applicable intellectual property laws. We grant you a limited, revocable, non-exclusive, non-transferable license to use the Service in accordance with these Terms.
        </LegalP>
      </LegalSection>

      <LegalSection title="7. Third-Party Services">
        <LegalP>
          The Service may integrate with third-party services. Your use of those services is governed by their terms, not ours. We are not responsible for third-party services.
        </LegalP>
      </LegalSection>

      <LegalSection title="8. SMS / Text Message Programs">
        <LegalP>
          Spark Inventory offers two optional SMS text message programs to authenticated account holders. Participation in either program is entirely voluntary and is not required to use Spark Inventory. Consent to receive SMS is not a condition of any purchase.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Spark Inventory Notifications.</strong> A one-way program that sends transactional operational notifications about activity in your Spark Inventory account, including inventory alerts, order updates, and other operational events that need attention. Message frequency varies with your account activity and the notification types you enable, typically up to a few messages per day.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Texting with Spark (also called Spark by Text).</strong> A two-way program for the owners and admins of a Spark Inventory account. You text your business's dedicated Spark number with questions and requests about your own account, and Spark replies. Spark also sends operational alerts, a morning summary, and a weekly summary. Replies are generated by artificial intelligence from your account data and may be inaccurate, so review them before relying on them. Spark changes your account data from a text only after you confirm that specific change by replying YES with the code in the message. Message frequency: up to 10 alerts and summaries per day by default (you can change this limit in Spark), plus replies to the texts you send.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Not promotional.</strong> Both programs are operational. We do not send marketing or promotional content over SMS.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Eligibility.</strong> The SMS programs are available only to authenticated Spark Inventory account holders located in the United States, using US mobile phone numbers. You may not enroll a phone number that is not your own without the express prior consent of the number's owner.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Cost.</strong> Message and data rates may apply, as charged by your mobile carrier. Spark Inventory does not charge you for SMS.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Consent.</strong> By enabling SMS notifications, or by turning on Texting with Spark, in your Spark Inventory account settings, you affirmatively consent to receive the SMS described above for that program from Spark Inventory at the mobile number you provide.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Opt-out.</strong> You may revoke consent and stop receiving SMS at any time by:
        </LegalP>
        <LegalUl items={[
          <>Replying <strong className="text-[#f0f2f5]/80">STOP</strong> to any Spark Inventory SMS, or</>,
          <>Visiting <strong className="text-[#f0f2f5]/80">Profile → SMS</strong> inside your Spark Inventory account and turning off SMS notifications or Texting with Spark.</>,
        ]} />
        <LegalP>
          We record opt-outs immediately. After a STOP request is processed, you will receive one message confirming your opt-out and no further messages.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Support.</strong> Reply <strong className="text-[#f0f2f5]/80">HELP</strong> to any Spark Inventory SMS for assistance, or email <LegalEmail email="support@sparkinventory.com" />.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Carrier liability.</strong> Carriers are not liable for any delayed or undelivered messages.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Privacy.</strong> No mobile information will be sold or shared with third parties for promotional or marketing purposes. Text messaging opt-in data and consent are not shared with any third party. For details on how we collect, use, and protect SMS-related data, see our{" "}
          <a href="https://sparkinventory.com/privacy-policy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Privacy Policy
          </a>.
        </LegalP>
        <LegalP>
          <strong className="text-[#f0f2f5]/80">Program details.</strong> Program descriptions, sample messages, and the verbatim consent statements are available at{" "}
          <a href="https://app.sparkinventory.com/sms-program" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            app.sparkinventory.com/sms-program
          </a>{" "}
          and{" "}
          <a href="https://sparkinventory.com/sms-program" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            sparkinventory.com/sms-program
          </a>.
        </LegalP>
      </LegalSection>

      <LegalSection title="9. Termination">
        <LegalP>
          You may stop using the Service at any time. We may suspend or terminate your access if you violate these Terms, if required by law, or if continued provision becomes commercially unreasonable. On termination, your right to use the Service ceases immediately. Sections that by their nature should survive (including ownership, disclaimers, indemnity, and limitations of liability) will survive.
        </LegalP>
      </LegalSection>

      <LegalSection title="10. Disclaimers">
        <LegalP>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
        </LegalP>
      </LegalSection>

      <LegalSection title="11. Limitation of Liability">
        <LegalP>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPARK INVENTORY, INC WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE FEES YOU PAID US IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM, OR (B) USD 100.
        </LegalP>
      </LegalSection>

      <LegalSection title="12. Indemnification">
        <LegalP>
          You agree to indemnify and hold harmless Spark Inventory, INC and its officers, directors, employees, and agents from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising from your breach of these Terms, your Customer Data, or your misuse of the Service.
        </LegalP>
      </LegalSection>

      <LegalSection title="13. Governing Law and Disputes">
        <LegalP>
          These Terms are governed by the laws of the State of New York, without regard to conflict of laws principles. The courts located in the State of New York will have exclusive jurisdiction over any disputes, except that either party may seek injunctive relief in any competent court.
        </LegalP>
      </LegalSection>

      <LegalSection title="14. Changes">
        <LegalP>
          We may update these Terms from time to time. If we make material changes, we will notify you by email or in-app notice. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
        </LegalP>
      </LegalSection>

      <LegalSection title="15. Apple App Store Additional Terms">
        <LegalP>
          If you obtained the App from the Apple App Store, the following also applies: these Terms are between you and Spark Inventory, INC only, not Apple. Apple is not responsible for the App or its content. Apple has no obligation to provide maintenance or support for the App. In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any). Apple is a third-party beneficiary of these Terms and may enforce them against you.
        </LegalP>
      </LegalSection>

      <LegalSection title="16. Contact">
        <LegalAddress />
      </LegalSection>
    </LegalPageShell>
  );
}
