import LegalPageShell, {
  LegalSection,
  LegalSubSection,
  LegalP,
  LegalUl,
  LegalEmail,
} from "../agency/LegalPageShell";

const linkClass = "text-cyan-400 hover:text-cyan-300 transition-colors";

export function ConnectAssistantPage() {
  return (
    <LegalPageShell title="Connect Spark to your AI assistant" subtitle="Setup, permissions, and help for ChatGPT and Claude connections">
      <LegalP>
        Connect your Spark Inventory workspace to a compatible AI assistant to find products,
        inspect stock, review purchase orders, and understand replenishment recommendations.
        Available tools depend on your workspace features and the access you approve.
      </LegalP>

      <LegalSection title="Before you connect">
        <LegalUl items={[
          "You need a Spark account with a verified email address and an administrator who can approve workspace access.",
          "Your workspace must allow AI assistant connections. Ask your Spark administrator if access is disabled.",
          "Your assistant account must support custom remote MCP connections. Your assistant's plan or workspace administrator may limit this feature.",
        ]} />
        <LegalP>
          New to Spark? Create and verify your account on Spark's website before connecting.
          Keep passwords and email verification codes in the browser sign-in flow, never in chat.
        </LegalP>
      </LegalSection>

      <LegalSection title="Connect your workspace">
        <LegalP>Use this server URL in your assistant's custom connection settings:</LegalP>
        <pre className="overflow-x-auto rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5 text-sm text-cyan-200" aria-label="Spark MCP server URL"><code>https://api.sparkinventory.com/mcp</code></pre>
        <LegalSubSection title="In ChatGPT">
          <LegalP>
            Enable <strong>Settings → Security and login → Developer mode</strong>, then open{" "}
            <a className={linkClass} href="https://chatgpt.com/plugins">ChatGPT Plugins</a> and select <strong>+</strong>.
            If this opens a conversation with Plugin Creator, use the separate <strong>Create MCP app</strong> control.
            Plugin Creator is a conversational builder, not the MCP connection form.
          </LegalP>
          <LegalP>
            Enter a unique test name, such as Spark Inventory (prod), and a short description. Under <strong>Connection</strong>, enter the public
            MCP URL above and use OAuth. Create the connection, then complete Spark sign-in and consent below.
            Review the discovered tools before testing. Availability depends on your account and workspace policy.
          </LegalP>
          <LegalP>
            After Spark's tool metadata changes, open the connection in <strong>Plugins</strong> and select{" "}
            <strong>Refresh</strong>. Add the connection to a new conversation to test it.
          </LegalP>
        </LegalSubSection>
        <LegalP>
          Use distinct custom test names, such as <strong>Spark Inventory (prod)</strong> and{" "}
          <strong>Spark Inventory (dev)</strong>, when connecting multiple environments. The public
          directory name remains Spark Inventory. Select the intended connection and verify its
          workspace before testing.
        </LegalP>
        <LegalSubSection title="In Claude">
          <LegalP>
            Open <strong>Customize → Connectors</strong> and add a custom connector using the server URL above.
            On Team or Enterprise, an owner first adds it in <strong>Organization settings → Connectors</strong>.
            Choose OAuth sign-in and automatic client registration if those options are requested, then connect.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection title="Approve access in Spark">
        <ol className="list-decimal pl-5 space-y-3 text-[#b8bfcc] leading-relaxed">
          <li>Start the connection and sign in to Spark in the browser window that opens.</li>
          <li>Check the requesting app, redirect destination, and intended workspace on Spark's consent screen.</li>
          <li>Choose Read-only for questions about your data. Choose Read &amp; write only if you want supported changes, and review any additional operational permissions.</li>
          <li>Approve the connection, return to the assistant, and try a question from the examples below.</li>
        </ol>
        </LegalSubSection>
        <LegalP>
          Menu names and connection availability can change. Follow the current host guidance for{" "}
          <a className={linkClass} href="https://developers.openai.com/plugins/deploy/connect-chatgpt">ChatGPT custom MCP testing</a>,{" "}
          <a className={linkClass} href="https://help.openai.com/en/articles/20001256-plugins-in-chatgpt-and-codex">Plugin Creator and MCP app controls</a>,{" "}
          or <a className={linkClass} href="https://claude.com/docs/connectors/custom/remote-mcp">Claude remote connectors</a>.
          Adding a custom connection does not mean Spark is listed or endorsed in either directory.
        </LegalP>
      </LegalSection>

      <LegalSection title="Try a first question">
        <LegalUl items={[
          '"Show five inventory items with their SKUs and warehouse availability."',
          '"What should I reorder, and why? Do not create any orders."',
          '"Show my five most recent purchase orders and their statuses."',
          '"What setup work remains in my Spark workspace?"',
        ]} />
        <LegalP>
          An empty workspace needs data before stock and purchasing answers are useful.
          Recommendations depend on the information in Spark; missing demand or sourcing data
          can limit the answer. Free forecasting and paid operational workflows have different
          feature access. See <a className={linkClass} href="/pricing">plans and pricing</a>.
        </LegalP>
      </LegalSection>

      <LegalSection title="Understand what you authorize">
        <LegalP>
          Read-only connections can retrieve permitted workspace information. Read-and-write
          connections can also perform supported changes. Some workflows separate preview from
          commitment; not every write has a preview. Check the requested action and any confirmation
          before approving a change. A connection cannot grant itself additional permissions.
        </LegalP>
        <LegalP>
          Tool results are shared with the assistant you connect. Business records may include
          personal information, so only connect an assistant your organization permits for that
          data. Its provider's terms and your account settings apply to the returned information.
          See our <a className={linkClass} href="/privacy-policy">Privacy Policy</a> and{" "}
          <a className={linkClass} href="/terms-of-service">Terms of Service</a>.
        </LegalP>
      </LegalSection>

      <LegalSection title="Disconnect or change access">
        <LegalP>
          Manage and revoke connections in Spark's AI Assistants settings. To change access,
          revoke the existing connection and reconnect with the intended permissions. You can
          also remove the connection in your assistant. Revoking access does not delete results
          already stored in an assistant conversation; use that provider's data controls for those copies.
        </LegalP>
      </LegalSection>

      <LegalSection title="If something is not working">
        <LegalUl items={[
          "If sign-in or consent fails, check that you are using the intended Spark account, your email is verified, and an authorized administrator is approving access.",
          "If Create MCP app shows a generic creation error, first check whether the chosen name already exists. Retry with an unused name when applicable. A duplicate name is one possible cause, not the explanation for every creation error.",
          "If the connection cannot be added, check your assistant plan and workspace connection policy, then confirm the exact server URL above.",
          "If a tool is unavailable or denied, check the connection's access level and the Spark feature permissions. Do not paste a token or password into chat to work around a denial.",
          "If results are empty, check the selected workspace and whether it contains the requested items or orders.",
        ]} />
        <LegalP>
          Contact <LegalEmail email="support@sparkinventory.com" /> with the assistant name,
          approximate time, and a redacted description of what happened. Never include passwords,
          access tokens, verification codes, or private customer records in a support screenshot.
        </LegalP>
      </LegalSection>
    </LegalPageShell>
  );
}
