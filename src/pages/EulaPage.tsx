import LegalPageShell, {
  LegalSection,
  LegalP,
  LegalUl,
  LegalAddress,
} from "../agency/LegalPageShell";

export function EulaPage() {
  return (
    <LegalPageShell
      title="End User License Agreement (EULA)"
      subtitle="Effective date: 05/01/2026"
    >
      <LegalP>
        This End User License Agreement ("EULA") is between you and Spark Inventory, INC ("we", "us", or "our") and governs your use of the Spark Inventory mobile application (the "Software"). By installing or using the Software, you agree to this EULA.
      </LegalP>

      <LegalSection title="1. License Grant">
        <LegalP>
          We grant you a limited, non-exclusive, non-transferable, revocable license to install and use the Software on a device that you own or control, solely for your personal or internal business use, in accordance with our Terms of Service.
        </LegalP>
      </LegalSection>

      <LegalSection title="2. Restrictions">
        <LegalP>You may not:</LegalP>
        <LegalUl items={[
          "Copy, modify, or create derivative works of the Software;",
          "Reverse engineer, decompile, or disassemble the Software, except as permitted by applicable law;",
          "Rent, lease, sell, sublicense, or transfer the Software;",
          "Remove any proprietary notices or labels;",
          "Use the Software in any way that violates applicable laws.",
        ]} />
      </LegalSection>

      <LegalSection title="3. Updates">
        <LegalP>
          The Software may automatically download and install updates. Updates may add, modify, or remove features. This EULA governs all updates unless an update is accompanied by a separate license.
        </LegalP>
      </LegalSection>

      <LegalSection title="4. Ownership">
        <LegalP>
          The Software is licensed, not sold. We and our licensors retain all right, title, and interest in and to the Software, including all intellectual property rights.
        </LegalP>
      </LegalSection>

      <LegalSection title="5. Termination">
        <LegalP>
          This EULA is effective until terminated. It will terminate automatically if you fail to comply with any of its terms. On termination, you must stop using the Software and delete all copies.
        </LegalP>
      </LegalSection>

      <LegalSection title="6. Disclaimers and Limitation of Liability">
        <LegalP>
          The Software is provided "AS IS" without warranty of any kind. To the maximum extent permitted by law, we disclaim all warranties, express or implied. Our liability is limited as described in our Terms of Service.
        </LegalP>
      </LegalSection>

      <LegalSection title="7. Apple-Specific Terms">
        <LegalP>If you obtained the Software from the Apple App Store:</LegalP>
        <LegalUl items={[
          "This EULA is between you and Spark Inventory, INC only, not Apple.",
          "Apple is not responsible for the Software or its content.",
          "Apple has no obligation to provide maintenance and support.",
          "In the event of any failure of the Software to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any) for the Software. Apple has no other warranty obligations.",
          "Apple is not responsible for addressing any claims relating to the Software, including product liability, legal or regulatory compliance, or consumer protection claims.",
          "You represent that you are not located in a country subject to a U.S. government embargo and are not on any U.S. government prohibited or restricted parties list.",
          "Apple and its subsidiaries are third-party beneficiaries of this EULA and may enforce it against you.",
        ]} />
      </LegalSection>

      <LegalSection title="8. Governing Law">
        <LegalP>
          This EULA is governed by the laws of the State of New York.
        </LegalP>
      </LegalSection>

      <LegalSection title="9. Contact">
        <LegalAddress />
      </LegalSection>
    </LegalPageShell>
  );
}
