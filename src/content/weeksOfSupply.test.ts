import { describe, expect, it } from 'vitest';
import { calculateWeeksOfSupply } from './weeksOfSupply';

const example = { onHandUnits: 600, unitsSold: 400, salesWeeks: 8 };

describe('calculateWeeksOfSupply', () => {
  it('divides units on hand by average weekly sales', () => {
    const result = calculateWeeksOfSupply(example);
    expect(result?.weeklySales).toBe(50);
    expect(result?.weeksOnHand).toBe(12);
    expect(result?.weeksWithOnOrder).toBe(12);
    expect(result?.daysOnHand).toBe(84);
    expect(result?.unitsToTarget).toBeUndefined();
  });

  it('adds units on order to the forward view only', () => {
    const result = calculateWeeksOfSupply({ ...example, onOrderUnits: 200 });
    expect(result?.weeksOnHand).toBe(12);
    expect(result?.weeksWithOnOrder).toBe(16);
  });

  it('sizes the order to reach a target, rounding up and never below zero', () => {
    expect(calculateWeeksOfSupply({ ...example, onOrderUnits: 100, targetWeeks: 20 })?.unitsToTarget).toBe(300);
    expect(calculateWeeksOfSupply({ ...example, unitsSold: 401, targetWeeks: 13 })?.unitsToTarget).toBe(52);
    expect(calculateWeeksOfSupply({ ...example, targetWeeks: 6 })?.unitsToTarget).toBe(0);
  });

  it('reports zero weeks when nothing is on hand', () => {
    expect(calculateWeeksOfSupply({ ...example, onHandUnits: 0 })?.weeksOnHand).toBe(0);
  });

  it('returns null when there are no sales or no window', () => {
    expect(calculateWeeksOfSupply({ ...example, unitsSold: 0 })).toBeNull();
    expect(calculateWeeksOfSupply({ ...example, salesWeeks: 0 })).toBeNull();
    expect(calculateWeeksOfSupply({ ...example, unitsSold: Number.NaN })).toBeNull();
  });
});
