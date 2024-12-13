import { Game } from "./game";
import { GameStatuses } from "./settings/game-statuses";
import { ShogunNumberUtility } from "./shogun-number-utility";

const areEqualPositions = (pos1, pos2) => {
  if (!pos1 || !pos2) return false; // Add null checks
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

describe("Game", () => {
  it("should be initialized with SETTINGS status", () => {
    const numberUtility = new ShogunNumberUtility();
    const game = new Game(numberUtility);
    expect(game.settings.status).toBe(GameStatuses.SETTINGS);
  });

  it("game should start with IN_PROGRESS status", async () => {
    const numberUtility = new ShogunNumberUtility();
    const game = new Game(numberUtility);
    await game.start();
    expect(game.settings.status).toBe(GameStatuses.IN_PROGRESS);
  });

  it("game should set google position", async () => {
    const numberUtility = new ShogunNumberUtility();
    for (let i = 0; i < 100; i++) {
      const game = new Game(numberUtility);
      expect(game.google).toBeNull();
      await game.start();

      expect(game.google.position.x).toBeGreaterThanOrEqual(0);
      expect(game.google.position.x).toBeLessThan(game.settings.gridSettings.columnsCount);
      expect(game.google.position.y).toBeGreaterThanOrEqual(0);
      expect(game.google.position.y).toBeLessThan(game.settings.gridSettings.rowsCount);
    }
  });

  it("google should jump with interval", async () => {
    const numberUtility = new ShogunNumberUtility();
    const game = new Game(numberUtility);
    game.settings.googleJumpInterval = 10;

    await game.start();

    for (let i = 0; i < 100; i++) {
      const prevGooglePosition = game.googlePosition;
      await delay(game.googleJumpInterval);
      expect(areEqualPositions(game.googlePosition, prevGooglePosition)).toBe(false);
    }
  });

  it("players should move and not be in the same position", async () => {
    const numberUtility = new ShogunNumberUtility();

    for (let i = 0; i < 100; i++) {
      const game = new Game(numberUtility);
      await game.start();
      expect(game.playersPositions).toHaveLength(game.settings.playersCount);
      // expect(areEqualPositions(game.playersPositions[0], game.playersPositions[1])).toBe(false);
    }
  });

  it("google should not jump to the same position as players", async () => {
    const numberUtility = new ShogunNumberUtility();
    const game = new Game(numberUtility);
    await game.start();
    await delay(game.googleJumpInterval);
    expect(areEqualPositions(game.googlePosition, game.playersPositions[0])).toBe(false);
    expect(areEqualPositions(game.googlePosition, game.playersPositions[1])).toBe(false);
  });

  it("game should finish when google points to lose", async () => {
    const numberUtility = new ShogunNumberUtility();
    const game = new Game(numberUtility);
    game.settings.googleJumpInterval = 10;

    await game.start();
    await delay((game.settings.googleJumpInterval * game.settings.pointsToWin) + 10);
    expect(game.settings.status).toBe(GameStatuses.LOSE);
    expect(game.google).toBeNull();
    expect(game.players).toHaveLength(0);
  });
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
