import { describe, expect, it } from 'vitest';
import { calculateSellThrough } from './sellThrough';

const example = { beginningUnits: 400, receivedUnits: 100, unitsSold: 300, periodWeeks: 4 };

describe('calculateSellThrough', () => {
  it('divides units sold by beginning units plus units received', () => {
    const result = calculateSellThrough(example);
    expect(result?.availableUnits).toBe(500);
    expect(result?.sellThroughPct).toBe(60);
    expect(result?.unitsLeft).toBe(200);
    expect(result?.weeklySales).toBe(75);
    expect(result?.weeklySellThroughPct).toBe(15);
    expect(result?.weeksToSellOut).toBeCloseTo(200 / 75);
  });

  it('works for a single delivery with no starting stock', () => {
    const result = calculateSellThrough({ ...example, beginningUnits: 0, receivedUnits: 1000, unitsSold: 250 });
    expect(result?.sellThroughPct).toBe(25);
  });

  it('caps the rate at 100% when more units sold than were available', () => {
    const result = calculateSellThrough({ ...example, unitsSold: 650 });
    expect(result?.sellThroughPct).toBe(100);
    expect(result?.unitsLeft).toBe(0);
    expect(result?.weeksToSellOut).toBe(0);
  });

  it('has no sell-out estimate when nothing sold', () => {
    const result = calculateSellThrough({ ...example, unitsSold: 0 });
    expect(result?.sellThroughPct).toBe(0);
    expect(result?.weeksToSellOut).toBeNull();
  });

  it('returns null when nothing was available or the period is missing', () => {
    expect(calculateSellThrough({ ...example, beginningUnits: 0, receivedUnits: 0 })).toBeNull();
    expect(calculateSellThrough({ ...example, beginningUnits: Number.NaN, receivedUnits: -5 })).toBeNull();
    expect(calculateSellThrough({ ...example, periodWeeks: 0 })).toBeNull();
  });
});
