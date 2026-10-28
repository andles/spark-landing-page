import { describe, expect, it } from 'vitest';
import { calculateEoq, holdingCostPerUnit } from './eoq';

const example = { annualDemand: 3650, orderingCost: 50, holdingCostMode: 'percent' as const, unitCost: 12, holdingRatePct: 24 };

describe('calculateEoq', () => {
  it('applies the Wilson formula with holding cost as a percent of unit cost', () => {
    // H = 12 x 0.24 = 2.88; sqrt(2 x 3650 x 50 / 2.88) = 356.0
    const result = calculateEoq(example);
    expect(result?.holdingCostPerUnit).toBeCloseTo(2.88);
    expect(result?.rawEoq).toBeCloseTo(356.0, 1);
    expect(result?.eoq).toBe(356);
    expect(result?.orderQuantity).toBe(356);
    expect(result?.raisedToMoq).toBe(false);
  });

  it('balances ordering and holding cost at the EOQ', () => {
    const result = calculateEoq({ annualDemand: 1000, orderingCost: 10, holdingCostMode: 'per-unit', holdingCostPerUnit: 5 });
    // sqrt(2 x 1000 x 10 / 5) = 63.25 -> 63
    expect(result?.eoq).toBe(63);
    expect(result?.annualOrderingCost).toBeCloseTo((1000 / 63) * 10);
    expect(result?.annualHoldingCost).toBeCloseTo(63 / 2 * 5);
    expect(result?.annualOrderingCost).toBeCloseTo(result?.annualHoldingCost ?? 0, -1);
    expect(result?.totalAnnualCost).toBeCloseTo((result?.annualOrderingCost ?? 0) + (result?.annualHoldingCost ?? 0));
  });

  it('reports order frequency from the quantity ordered', () => {
    const result = calculateEoq({ annualDemand: 3650, orderingCost: 50, holdingCostMode: 'per-unit', holdingCostPerUnit: 1 });
    // sqrt(365000) = 604.15 -> 604
    expect(result?.ordersPerYear).toBeCloseTo(3650 / 604);
    expect(result?.daysBetweenOrders).toBeCloseTo(365 / (3650 / 604));
  });

  it('raises the order to the MOQ and costs the larger order', () => {
    const result = calculateEoq({ ...example, minimumOrderQuantity: 500 });
    expect(result?.eoq).toBe(356);
    expect(result?.orderQuantity).toBe(500);
    expect(result?.raisedToMoq).toBe(true);
    expect(result?.annualHoldingCost).toBeCloseTo(250 * 2.88);
  });

  it('ignores an MOQ below the EOQ', () => {
    const result = calculateEoq({ ...example, minimumOrderQuantity: 100 });
    expect(result?.orderQuantity).toBe(356);
    expect(result?.raisedToMoq).toBe(false);
  });

  it('never returns less than one unit', () => {
    expect(calculateEoq({ annualDemand: 1, orderingCost: 0.01, holdingCostMode: 'per-unit', holdingCostPerUnit: 100 })?.eoq).toBe(1);
  });

  it('returns null when demand, ordering cost or holding cost is missing', () => {
    expect(calculateEoq({ ...example, annualDemand: 0 })).toBeNull();
    expect(calculateEoq({ ...example, orderingCost: Number.NaN })).toBeNull();
    expect(calculateEoq({ ...example, unitCost: undefined })).toBeNull();
    expect(calculateEoq({ ...example, holdingRatePct: -5 })).toBeNull();
  });

  it('uses the per-unit holding cost directly in per-unit mode', () => {
    expect(holdingCostPerUnit({ ...example, holdingCostMode: 'per-unit', holdingCostPerUnit: 3 })).toBe(3);
  });
});
