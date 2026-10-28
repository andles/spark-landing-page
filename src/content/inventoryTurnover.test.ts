import { describe, expect, it } from 'vitest';
import { calculateInventoryTurnover } from './inventoryTurnover';

const example = { costOfGoodsSold: 600000, beginningInventory: 120000, endingInventory: 80000, periodDays: 365 };

describe('calculateInventoryTurnover', () => {
  it('divides COGS by the average of beginning and ending inventory', () => {
    const result = calculateInventoryTurnover(example);
    expect(result?.averageInventory).toBe(100000);
    expect(result?.turnover).toBe(6);
    expect(result?.annualTurnover).toBe(6);
    expect(result?.daysInInventory).toBeCloseTo(60.83, 2);
    expect(result?.annualHoldingCost).toBeUndefined();
  });

  it('annualizes turnover for a shorter period', () => {
    // A quarter: 150,000 / 100,000 = 1.5 turns in 91 days.
    const result = calculateInventoryTurnover({ ...example, costOfGoodsSold: 150000, periodDays: 91 });
    expect(result?.turnover).toBe(1.5);
    expect(result?.annualTurnover).toBeCloseTo(1.5 * 365 / 91);
    expect(result?.daysInInventory).toBeCloseTo(91 / 1.5);
  });

  it('prices the average inventory with an optional holding rate', () => {
    expect(calculateInventoryTurnover({ ...example, holdingRatePct: 24 })?.annualHoldingCost).toBe(24000);
  });

  it('works with only an ending inventory value', () => {
    const result = calculateInventoryTurnover({ ...example, beginningInventory: 0, endingInventory: 100000 });
    expect(result?.averageInventory).toBe(50000);
    expect(result?.turnover).toBe(12);
  });

  it('returns null when COGS, inventory or the period is missing', () => {
    expect(calculateInventoryTurnover({ ...example, costOfGoodsSold: 0 })).toBeNull();
    expect(calculateInventoryTurnover({ ...example, beginningInventory: Number.NaN, endingInventory: -5 })).toBeNull();
    expect(calculateInventoryTurnover({ ...example, periodDays: 0 })).toBeNull();
  });
});
