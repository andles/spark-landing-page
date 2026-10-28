import { describe, expect, it } from 'vitest';
import { calculateSafetyStockDetails, serviceLevelSafetyStock, zForServiceLevelPct } from './safetyStock';

const base = { averageDailyDemand: 10, averageLeadTimeDays: 14, dailyDemandStdDev: 3, leadTimeStdDevDays: 2 };

describe('zForServiceLevelPct', () => {
  it('matches standard normal table values', () => {
    expect(zForServiceLevelPct(50)).toBeCloseTo(0, 6);
    expect(zForServiceLevelPct(90)).toBeCloseTo(1.2816, 4);
    expect(zForServiceLevelPct(95)).toBeCloseTo(1.6449, 4);
    expect(zForServiceLevelPct(97.5)).toBeCloseTo(1.96, 4);
    expect(zForServiceLevelPct(99)).toBeCloseTo(2.3263, 4);
    expect(zForServiceLevelPct(99.9)).toBeCloseTo(3.0902, 4);
  });

  it('clamps out-of-range and non-numeric service levels', () => {
    expect(zForServiceLevelPct(20)).toBeCloseTo(0, 6);
    expect(zForServiceLevelPct(100)).toBeCloseTo(zForServiceLevelPct(99.99), 6);
    expect(zForServiceLevelPct(Number.NaN)).toBeCloseTo(1.6449, 4);
  });
});

describe('calculateSafetyStockDetails', () => {
  it('combines demand and lead time variability at the chosen service level', () => {
    // 1.6449 x sqrt(14 x 9 + 100 x 4) = 37.73 -> 38; reorder point 140 + 38
    const result = calculateSafetyStockDetails({ ...base, method: 'service-level', serviceLevelPct: 95 });
    expect(result.safetyStock).toBe(38);
    expect(result.reorderPoint).toBe(178);
    expect(result.safetyDays).toBeCloseTo(3.8);
    expect(result.z).toBeCloseTo(1.6449, 4);
  });

  it('grows faster than linearly as the service level approaches 100%', () => {
    const units = [90, 95, 97.5, 99, 99.9].map((level) => serviceLevelSafetyStock(base, level));
    expect(units).toEqual([30, 38, 45, 54, 71]);
  });

  it('drops the lead time term when the lead time never varies', () => {
    // 1.6449 x 3 x sqrt(14) = 18.46 -> 19
    expect(serviceLevelSafetyStock({ ...base, leadTimeStdDevDays: 0 }, 95)).toBe(19);
  });

  it('reuses the max-average and days-of-cover methods', () => {
    expect(calculateSafetyStockDetails({ ...base, method: 'max-average', maxDailyDemand: 15, maxLeadTimeDays: 20 }).safetyStock).toBe(160);
    const cover = calculateSafetyStockDetails({ ...base, method: 'days-of-cover', safetyDays: 5 });
    expect(cover.safetyStock).toBe(50);
    expect(cover.z).toBeUndefined();
  });

  it('values the buffer and its holding cost when a unit cost is given', () => {
    const result = calculateSafetyStockDetails({ ...base, method: 'service-level', serviceLevelPct: 95, unitCost: 12, holdingRatePct: 24 });
    expect(result.inventoryValue).toBe(456);
    expect(result.annualHoldingCost).toBeCloseTo(109.44);
    expect(calculateSafetyStockDetails({ ...base, method: 'service-level', unitCost: 12 }).annualHoldingCost).toBeUndefined();
  });

  it('treats blank and negative inputs as zero', () => {
    const result = calculateSafetyStockDetails({ method: 'service-level', averageDailyDemand: Number.NaN, averageLeadTimeDays: -3, dailyDemandStdDev: 2 });
    expect(result).toMatchObject({ safetyStock: 0, safetyDays: null, reorderPoint: 0 });
  });
});
