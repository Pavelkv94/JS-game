/**
 * @class ShogunNumberUtility
 * @description Utility class for number operations
 */
export class ShogunNumberUtility {
  /**
   * @param {number} fromInclusive
   * @param {number} toExclusive
   * @returns {number}
   */
  getRandomIntegerNumber(fromInclusive, toExclusive) {
    if (fromInclusive > toExclusive) {
      throw new Error("fromInclusive must be less than toExclusive");
    }

    if (typeof fromInclusive !== "number" || typeof toExclusive !== "number") {
      throw new Error("fromInclusive and toExclusive must be numbers");
    }

    return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;
  }
}
