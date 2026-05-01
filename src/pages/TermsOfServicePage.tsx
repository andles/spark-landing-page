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
      subtitle="Effective date: 05/01/2026"
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
          You retain all rights to data you submit to the Service ("Customer Data"). You grant us a limited, worldwide, non-exclusive license to host, copy, transmit, display, and process Customer Data solely to provide the Service and as otherwise permitted by these Terms and our Privacy Policy.
        </LegalP>
        <LegalP>
          You are responsible for the accuracy, legality, and appropriateness of Customer Data and for obtaining all necessary rights and consents to submit it to the Service.
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

      <LegalSection title="8. Termination">
        <LegalP>
          You may stop using the Service at any time. We may suspend or terminate your access if you violate these Terms, if required by law, or if continued provision becomes commercially unreasonable. On termination, your right to use the Service ceases immediately. Sections that by their nature should survive (including ownership, disclaimers, indemnity, and limitations of liability) will survive.
        </LegalP>
      </LegalSection>

      <LegalSection title="9. Disclaimers">
        <LegalP>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
        </LegalP>
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <LegalP>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPARK INVENTORY, INC WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE FEES YOU PAID US IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM, OR (B) USD 100.
        </LegalP>
      </LegalSection>

      <LegalSection title="11. Indemnification">
        <LegalP>
          You agree to indemnify and hold harmless Spark Inventory, INC and its officers, directors, employees, and agents from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising from your breach of these Terms, your Customer Data, or your misuse of the Service.
        </LegalP>
      </LegalSection>

      <LegalSection title="12. Governing Law and Disputes">
        <LegalP>
          These Terms are governed by the laws of the State of New York, without regard to conflict of laws principles. The courts located in the State of New York will have exclusive jurisdiction over any disputes, except that either party may seek injunctive relief in any competent court.
        </LegalP>
      </LegalSection>

      <LegalSection title="13. Changes">
        <LegalP>
          We may update these Terms from time to time. If we make material changes, we will notify you by email or in-app notice. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
        </LegalP>
      </LegalSection>

      <LegalSection title="14. Apple App Store Additional Terms">
        <LegalP>
          If you obtained the App from the Apple App Store, the following also applies: these Terms are between you and Spark Inventory, INC only, not Apple. Apple is not responsible for the App or its content. Apple has no obligation to provide maintenance or support for the App. In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any). Apple is a third-party beneficiary of these Terms and may enforce them against you.
        </LegalP>
      </LegalSection>

      <LegalSection title="15. Contact">
        <LegalAddress />
      </LegalSection>
    </LegalPageShell>
  );
}
