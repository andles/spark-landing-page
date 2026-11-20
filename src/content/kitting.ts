// Copy for the kitting inventory page. Every Spark claim here describes
// shipped behavior in the Spark monorepo: bundle items with components
// (Items/ItemBundleComponent), component reservation on sales orders
// (SalesOrderService), bundle availability derived from component stock
// (ItemType.NonStockable), and BOMs with manufacturing orders. Keep it that way.

export const kittingFaqs = [
  {
    question: 'What is kitting in inventory?',
    answer: 'Kitting is grouping separate items into one sellable unit with its own SKU: a gift set, a starter kit, a subscription box or a set of parts for an assembly line. The kit is what the customer orders, but every component still has to be counted, reordered and picked, so your inventory system has to track both.',
  },
  {
    question: 'What is the difference between kitting and bundling?',
    answer: 'The words are often used interchangeably. In practice, a bundle is usually sold as a group but stored as separate items and picked when an order arrives, while a kit is often assembled ahead of time and stored ready to ship. Spark handles both: a bundle item draws on component stock at order time, and a manufacturing order turns components into finished kits in stock.',
  },
  {
    question: 'What is pre-kitting?',
    answer: 'Pre-kitting means assembling kits before orders arrive, so packing is faster when they do. It suits kits that sell steadily or that take time to put together. The tradeoff is that components are locked inside finished kits and cannot be sold on their own, so build to your forecast rather than filling every shelf.',
  },
  {
    question: 'How do you track kit inventory?',
    answer: 'Give each kit its own SKU and a list of components with the quantity of each per kit. For kits assembled on demand, the number of kits you can sell is limited by the scarcest component. For pre-built kits, record each build so the components come out of stock and the finished kits go in. Count components, not just kits, or a single shared part can stop several kits at once.',
  },
  {
    question: 'How many kits can I sell with the stock I have?',
    answer: 'For each component, divide the units on hand by the quantity used per kit, then take the smallest result. If a kit needs 2 candles and 1 box, and you have 90 candles and 60 boxes, you can make 45 kits: the candles run out first, and 15 boxes are left over.',
  },
  {
    question: 'Does Spark Inventory support kits and bundles?',
    answer: 'Yes. Create a bundle item and list its components and the quantity of each. A bundle carries no stock of its own: Spark works out how many are available from component stock, and when a sales order for the bundle is reserved, Spark reserves each component times the quantity ordered. For kits you assemble ahead of time, define a bill of materials and run a manufacturing order to move components into finished kits.',
  },
] as const;

export interface KitComponentInput {
  /** Units of this component on hand. */
  onHand: number;
  /** Units of this component used in one kit. */
  perKit: number;
}

export interface KitsAvailableResult {
  /** Whole kits the components can make. */
  kits: number;
  /** Index of the component that runs out first. */
  limitingIndex: number;
  /** Units of each component left after building that many kits. */
  leftover: number[];
}

const positive = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

/**
 * How many whole kits the components on hand can make: the smallest of
 * on hand ÷ per kit across components. Components with no per-kit quantity
 * are ignored; returns null when none is left.
 */
export function calculateKitsAvailable(components: KitComponentInput[]): KitsAvailableResult | null {
  const used = components
    .map((c, index) => ({ index, onHand: positive(c.onHand), perKit: positive(c.perKit) }))
    .filter((c) => c.perKit > 0);
  if (used.length === 0) return null;

  let limiting = used[0];
  let kits = Math.floor(limiting.onHand / limiting.perKit);
  for (const c of used.slice(1)) {
    const possible = Math.floor(c.onHand / c.perKit);
    if (possible < kits) {
      kits = possible;
      limiting = c;
    }
  }
  const leftover = components.map((c) => {
    const perKit = positive(c.perKit);
    return positive(c.onHand) - (perKit > 0 ? kits * perKit : 0);
  });
  return { kits, limitingIndex: limiting.index, leftover };
}
