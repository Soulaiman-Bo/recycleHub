// points.util.ts

import {
  Collection,
  CollectionStatus,
  WasteType,
} from '../../core/models/Collection.model';

/**
 * Calculates the total points for a given Collection.
 * Points are only awarded if the collection status is COMPLETED.
 *
 * Points per kg:
 * - Plastic : 2 points/kg
 * - Glass   : 1 point/kg
 * - Paper   : 1 point/kg
 * - Metal   : 5 points/kg
 */
export function calculatePoints(collection: Collection): number {
  // Only calculate if status is 'Completed'
  if (collection.status !== CollectionStatus.IN_PROGRESS) {
    return 0;
  }

  let totalPoints = 0;
  for (const item of collection.wasteItems) {
    switch (item.type) {
      case WasteType.PLASTIC:
        totalPoints += item.weight * 2;
        break;
      case WasteType.GLASS:
      case WasteType.PAPER:
        totalPoints += item.weight * 1;
        break;
      case WasteType.METAL:
        totalPoints += item.weight * 5;
        break;
      default:
        // no points for unknown types
        break;
    }
  }
  return totalPoints;
}

/**
 * Converts a given number of points into a Dh voucher value,
 * applying the "largest voucher first" approach (like making change).
 *
 * Conversion table:
 * - 500 points → 350 Dh
 * - 200 points → 120 Dh
 * - 100 points → 50 Dh
 *
 * If a user has, for example, 600 points, they can get:
 *   - one 500-point voucher (350 Dh)
 *   - plus one 100-point voucher (50 Dh)
 * for a total of 400 Dh
 */
export function convertPointsToMoney(points: number): number {
  let totalDh = 0;
  let remainder = points;

  // Largest to smallest
  const conversions = [
    { points: 500, value: 350 },
    { points: 200, value: 120 },
    { points: 100, value: 50 },
  ];

  // Repeatedly apply the largest voucher possible
  for (const conversion of conversions) {
    while (remainder >= conversion.points) {
      totalDh += conversion.value;
      remainder -= conversion.points;
    }
  }

  // totalDh is the total voucher value in Dh
  return totalDh;
}
