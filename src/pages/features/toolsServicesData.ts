export const toolsServicesFaqs = [
  {
    question: 'What is Sparki?',
    answer: 'Sparki is Spark’s in-app AI inventory agent. It can inspect connected data, guide onboarding, explain inventory signals, prepare recommendations, and help operators complete governed workflows inside Spark.',
  },
  {
    question: 'What is Spark MCP?',
    answer: 'Spark MCP is Spark’s implementation of the Model Context Protocol. It gives compatible AI assistants access to approved Spark inventory tools and context through scoped credentials, previews, approval gates, and an audit trail.',
  },
  {
    question: 'Can I use ChatGPT or Claude with Spark?',
    answer: 'Yes. Compatible versions of ChatGPT, Claude, and other MCP clients can connect to Spark MCP. Your assistant uses the same governed Spark tools while your team controls access and approves operational changes.',
  },
  {
    question: 'What can an AI assistant do in Spark?',
    answer: 'An approved assistant can inspect onboarding state, data readiness, inventory, demand, suppliers, price books, and planning context. It can also prepare imports or operational actions for review when the connected tools and permissions allow it.',
  },
  {
    question: 'How does Spark keep AI actions under control?',
    answer: 'Spark uses scoped credentials, role-based permissions, previews, explicit approval steps, and an audit trail. Imports and operational writes can be reviewed before they change workspace data.',
  },
  {
    question: 'Are Sparki and MCP workflows included in Spark pricing?',
    answer: 'Sparki and governed MCP workflows are part of the Spark product experience. Each plan includes an AI usage allotment, with the available operational capabilities determined by the plan and workspace permissions.',
  },
] as const;
