// points.util.ts

import { Collection, CollectionStatus, WasteType } from "../../core/models/Collection.model";

/**
 * Calculates the total points for a given Collection.
 * Points are only awarded if the collection is COMPLETED.
 *
 * Points per kg:
 *   Plastic = 2
 *   Glass   = 1
 *   Paper   = 1
 *   Metal   = 5
 */
export function calculatePoints(collection: Collection): number {
  if (collection.status !== CollectionStatus.COMPLETED) {
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
        break;
    }
  }
  return totalPoints;
}

/**
 * Converts total points to a voucher value in Dh,
 * using a "largest to smallest" breakdown of vouchers:
 *   500 pts → 350 Dh
 *   200 pts → 120 Dh
 *   100 pts → 50 Dh
 *
 * Example: 600 pts = 500 + 100 → 350 + 50 Dh = 400 Dh
 */
export function convertPointsToMoney(points: number): number {
  let remainder = points;
  let totalDh = 0;

  // Ensure this array is sorted from largest threshold to smallest
  const conversions = [
    { threshold: 500, value: 350 },
    { threshold: 200, value: 120 },
    { threshold: 100, value: 50 },
  ];

  // Loop from largest to smallest threshold
  for (const { threshold, value } of conversions) {
    while (remainder >= threshold) {
      totalDh += value;
      remainder -= threshold;
    }
  }

  return totalDh;
}

