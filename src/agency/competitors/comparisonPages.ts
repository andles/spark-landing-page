// The four main comparison pages. Each one links to the others, and the
// pricing and features pages link to all four, so keep this list in sync with
// the routes in App.tsx.
export const comparisonPages = [
  { href: '/fishbowl-alternative/', label: 'Spark vs Fishbowl', competitor: 'Fishbowl' },
  { href: '/cin7-alternative/', label: 'Spark vs Cin7', competitor: 'Cin7' },
  { href: '/zoho-inventory-alternative/', label: 'Spark vs Zoho Inventory', competitor: 'Zoho Inventory' },
  { href: '/inflow-alternative/', label: 'Spark vs inFlow', competitor: 'inFlow' },
] as const;

export function otherComparisonPages(currentHref: string) {
  return comparisonPages.filter((page) => page.href !== currentHref);
}
