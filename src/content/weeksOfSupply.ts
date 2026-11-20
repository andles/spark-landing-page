// Weeks of supply math for the public calculator page. Every input is a
// hypothetical the visitor types in; nothing here is a measured Spark result.

export interface WeeksOfSupplyInput {
  /** Units on hand now. */
  onHandUnits: number;
  /** Units already ordered and not yet received (optional). */
  onOrderUnits?: number;
  /** Units sold over the sales window. */
  unitsSold: number;
  /** Length of the sales window in weeks. */
  salesWeeks: number;
  /** Optional: how many weeks of supply you want to hold after ordering. */
  targetWeeks?: number;
}

export interface WeeksOfSupplyResult {
  /** Average units sold per week over the window. */
  weeklySales: number;
  /** Weeks the stock on hand lasts at that pace. */
  weeksOnHand: number;
  /** Weeks on hand plus on order. Equal to weeksOnHand when nothing is on order. */
  weeksWithOnOrder: number;
  /** Days of supply for the on-hand stock (weeks × 7). */
  daysOnHand: number;
  /** Present only when a target was given: units to order to reach it (never below zero). */
  unitsToTarget?: number;
}

const positive = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

/** Returns null when there are no sales or no sales window, since weeks of supply is then undefined. */
export function calculateWeeksOfSupply(input: WeeksOfSupplyInput): WeeksOfSupplyResult | null {
  const salesWeeks = positive(input.salesWeeks);
  const unitsSold = positive(input.unitsSold);
  if (salesWeeks === 0 || unitsSold === 0) return null;

  const weeklySales = unitsSold / salesWeeks;
  const onHand = positive(input.onHandUnits);
  const onOrder = positive(input.onOrderUnits);
  const weeksOnHand = onHand / weeklySales;
  const result: WeeksOfSupplyResult = {
    weeklySales,
    weeksOnHand,
    weeksWithOnOrder: (onHand + onOrder) / weeklySales,
    daysOnHand: weeksOnHand * 7,
  };
  const target = positive(input.targetWeeks);
  if (target > 0) result.unitsToTarget = Math.max(0, Math.ceil(target * weeklySales - onHand - onOrder));
  return result;
}

export const weeksOfSupplyFaqs = [
  {
    question: 'What is the weeks of supply formula?',
    answer: 'Weeks of supply = units on hand ÷ average units sold per week. With 600 units in stock and sales of 50 units a week, you have 12 weeks of supply. Add units already on order to the top of the formula to see how long stock lasts once they arrive.',
  },
  {
    question: 'How do you calculate weeks of supply?',
    answer: 'Total the units sold over a recent window, such as the last 4, 8 or 13 weeks, and divide by the number of weeks to get average weekly sales. Then divide units on hand by that weekly rate. Use the same window for every product so the results compare, and leave out weeks when the item was out of stock, since they understate real demand.',
  },
  {
    question: 'What is forward weeks of supply?',
    answer: 'Forward weeks of supply divides stock by forecast sales for the coming weeks instead of past sales. It matters when demand is changing: before a peak season, past sales make stock look like it lasts longer than it will. Spark Inventory uses the forward view, based on each SKU’s Demand ESP forecast.',
  },
  {
    question: 'How many weeks of supply should I keep?',
    answer: 'Enough to cover your supplier lead time plus your safety stock, plus the time between orders. A product with a 4 week lead time that you order every 2 weeks, with 1 week of safety stock, needs about 7 weeks at the moment you place an order. Far more than that usually means cash tied up in overstock.',
  },
  {
    question: 'Is weeks of supply the same as days of supply or weeks on hand?',
    answer: 'They measure the same thing in different units. Days of supply = weeks of supply × 7. Weeks on hand and weeks of cover are other common names. Retail planners often say weeks of supply, while warehouses and finance teams often say days on hand.',
  },
  {
    question: 'How does Spark Inventory track weeks of supply?',
    answer: 'Spark shows days on hand for every SKU and warehouse, using the higher of the Demand ESP forecast and recent sales as the planning rate. It hides the number when there is no real demand signal, shows a range when demand is lumpy, and counts stock past 180 days of supply as excess by default (you can change the bands). Reorder recommendations net stock on hand and on order against the forecast.',
  },
] as const;
