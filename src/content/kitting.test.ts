import { describe, expect, it } from 'vitest';
import { calculateKitsAvailable } from './kitting';

describe('calculateKitsAvailable', () => {
  it('is limited by the scarcest component', () => {
    const result = calculateKitsAvailable([
      { onHand: 90, perKit: 2 },
      { onHand: 60, perKit: 1 },
    ]);
    expect(result).toEqual({ kits: 45, limitingIndex: 0, leftover: [0, 15] });
  });

  it('rounds down to whole kits', () => {
    expect(calculateKitsAvailable([{ onHand: 7, perKit: 2 }, { onHand: 100, perKit: 3 }])?.kits).toBe(3);
  });

  it('ignores components with no per-kit quantity', () => {
    const result = calculateKitsAvailable([{ onHand: 10, perKit: 1 }, { onHand: 0, perKit: 0 }]);
    expect(result?.kits).toBe(10);
    expect(result?.leftover).toEqual([0, 0]);
  });

  it('makes zero kits when a component is out', () => {
    const result = calculateKitsAvailable([{ onHand: 50, perKit: 1 }, { onHand: 0, perKit: 1 }]);
    expect(result?.kits).toBe(0);
    expect(result?.limitingIndex).toBe(1);
  });

  it('returns null when no component has a quantity per kit', () => {
    expect(calculateKitsAvailable([])).toBeNull();
    expect(calculateKitsAvailable([{ onHand: 5, perKit: Number.NaN }])).toBeNull();
  });
});
