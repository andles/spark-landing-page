import { describe, expect, it } from 'vitest';
import { calculateReorderPoint, calculateSafetyStock, zForServiceLevel } from './reorderPoint';

describe('calculateReorderPoint', () => {
  it('adds lead time demand and days-of-cover safety stock', () => {
    const result = calculateReorderPoint({ method: 'days-of-cover', averageDailyDemand: 10, averageLeadTimeDays: 14, safetyDays: 5 });
    expect(result).toEqual({ leadTimeDemand: 140, safetyStock: 50, reorderPoint: 190 });
  });

  it('uses worst case minus average for the max-average method', () => {
    // (15 x 20) - (10 x 14) = 160
    const result = calculateReorderPoint({ method: 'max-average', averageDailyDemand: 10, averageLeadTimeDays: 14, maxDailyDemand: 15, maxLeadTimeDays: 20 });
    expect(result.safetyStock).toBe(160);
    expect(result.reorderPoint).toBe(300);
  });

  it('never returns negative safety stock when the max inputs are below the averages', () => {
    expect(calculateSafetyStock({ method: 'max-average', averageDailyDemand: 10, averageLeadTimeDays: 14, maxDailyDemand: 5, maxLeadTimeDays: 7 })).toBe(0);
  });

  it('combines demand and lead time variability for the service-level method', () => {
    // 1.6449 x sqrt(14 x 3^2 + 10^2 x 2^2) = 1.6449 x sqrt(526) = 37.73, rounded up to 38
    const result = calculateReorderPoint({ method: 'service-level', averageDailyDemand: 10, averageLeadTimeDays: 14, dailyDemandStdDev: 3, leadTimeStdDevDays: 2, serviceLevel: 0.95 });
    expect(result.safetyStock).toBe(38);
    expect(result.reorderPoint).toBe(178);
  });

  it('rounds fractional lead time demand up to whole units', () => {
    const result = calculateReorderPoint({ method: 'days-of-cover', averageDailyDemand: 2.5, averageLeadTimeDays: 3, safetyDays: 0 });
    expect(result.leadTimeDemand).toBe(7.5);
    expect(result.reorderPoint).toBe(8);
  });

  it('treats blank, negative and non-numeric inputs as zero', () => {
    const result = calculateReorderPoint({ method: 'days-of-cover', averageDailyDemand: Number.NaN, averageLeadTimeDays: -4, safetyDays: 3 });
    expect(result).toEqual({ leadTimeDemand: 0, safetyStock: 0, reorderPoint: 0 });
  });

  it('says to reorder when the inventory position is at or below the reorder point', () => {
    const base = { method: 'days-of-cover' as const, averageDailyDemand: 10, averageLeadTimeDays: 14, safetyDays: 5 };
    expect(calculateReorderPoint({ ...base, inventoryPosition: 190 }).reorderNow).toBe(true);
    expect(calculateReorderPoint({ ...base, inventoryPosition: 191 }).reorderNow).toBe(false);
    expect(calculateReorderPoint(base).reorderNow).toBeUndefined();
  });

  it('falls back to 95% when the service level is not one of the options', () => {
    expect(zForServiceLevel(0.8)).toBe(1.6449);
  });
});
