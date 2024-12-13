import { ShogunNumberUtility } from "./shogun-number-utility";

describe("ShogunNumberUtility", () => {
  it("should return random integer number", () => {
    const numberUtility = new ShogunNumberUtility();
    const number = numberUtility.getRandomIntegerNumber(0, 10);
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThan(10);
  });

  it("should throw error if fromInclusive is greater than toExclusive", () => {
    const numberUtility = new ShogunNumberUtility();
    expect(() => numberUtility.getRandomIntegerNumber(10, 0)).toThrow();
  });

  it("should throw error if fromInclusive or toExclusive is not a number", () => {
    const numberUtility = new ShogunNumberUtility();
    expect(() => numberUtility.getRandomIntegerNumber("10", 0)).toThrow();
    expect(() => numberUtility.getRandomIntegerNumber(10, "0")).toThrow();
  });

  it("should return random integer number in range", () => {
    const numberUtility = new ShogunNumberUtility();
    const number = numberUtility.getRandomIntegerNumber(10, 20);
    expect(number).toBeGreaterThanOrEqual(10);
    expect(number).toBeLessThan(20);
  });

  it("should return random integer number in range with step", () => {
    const numberUtility = new ShogunNumberUtility();
    const number = numberUtility.getRandomIntegerNumber(10, 20, 2);
    expect(number).toBeGreaterThanOrEqual(10);
    expect(number).toBeLessThan(20);
  });
});
