import { Position } from "./entities/position";
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
        expect(game.status).toBe(GameStatuses.SETTINGS);
    });

    it("game should start with IN_PROGRESS status", async () => {
        const numberUtility = new ShogunNumberUtility();
        const game = new Game(numberUtility);
        await game.start();
        expect(game.status).toBe(GameStatuses.IN_PROGRESS);
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

            expect(game.players).toHaveLength(game.settings.playersCount);
        }
    });

    it("google should not jump to the same position as players", async () => {
        const numberUtility = new ShogunNumberUtility();
        const game = new Game(numberUtility);
        await game.start();
        await delay(game.googleJumpInterval);
        expect(areEqualPositions(game.googlePosition, game.players[0])).toBe(false);
        expect(areEqualPositions(game.googlePosition, game.players[1])).toBe(false);
    });

    it("game should finish when google points to lose", async () => {
        const numberUtility = new ShogunNumberUtility();
        const game = new Game(numberUtility);
        game.settings.googleJumpInterval = 10;

        await game.start();
        await delay(game.settings.googleJumpInterval * game.settings.pointsToWin + 10);
        expect(game.status).toBe(GameStatuses.LOSE);
        expect(game.google).toBeNull();
        expect(game.players).toHaveLength(0);
    });

    it("player should be move in correct directions", async () => {
        //const numberUtil = new ShogunNumberUtility()

        const fakeNumberUtility = {
            *numberGenerator() {
                yield 2;
                yield 2;
                yield 1;
                yield 1;
                yield 0;
                yield 0;
                while (true) {
                    yield 0;
                }
            },
            iterator: null,
            getRandomIntegerNumber(from, to) {
                if (!this.iterator) {
                    this.iterator = this.numberGenerator();
                }
                return this.iterator.next().value;
            },
        };

        const game = new Game(fakeNumberUtility);
        game.settings.gridSettings.columnsCount = 3;
        game.settings.gridSettings.rowsCount = 3;
        // game.settings.playersCount = 1;

        game.start();

        // [  ][  ][  ]
        // [  ][p2][  ]
        // [  ][  ][p1]
        expect(game.players[0].position.x).toEqual(2);
        expect(game.players[0].position.y).toEqual(2);

        expect(game.players[1].position.x).toEqual(1);
        expect(game.players[1].position.y).toEqual(1);

        game.movePlayer(1, "RIGHT");
        expect(game.players[0].position.x).toEqual(2);
        expect(game.players[0].position.y).toEqual(2);
        game.movePlayer(1, "DOWN");
        expect(game.players[0].position.x).toEqual(2);
        expect(game.players[0].position.y).toEqual(2);
        game.movePlayer(1, "UP");
        // [  ][  ][  ]
        // [  ][p2][p1]
        // [  ][  ][  ]
        expect(game.players[0].position.x).toEqual(2);
        expect(game.players[0].position.y).toEqual(1);
        game.movePlayer(1, "UP");
        // [  ][  ][p1]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.players[0].position.x).toEqual(2);
        expect(game.players[0].position.y).toEqual(0);
        game.movePlayer(1, "LEFT");
        // [  ][p1][  ]
        // [  ][  ][  ]
        // [  ][  ][  ]
        expect(game.players[0].position.x).toEqual(1);
        expect(game.players[0].position.y).toEqual(0);
        game.movePlayer(1, "UP");
        // [  ][p1][  ]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.players[0].position.x).toEqual(1);
        expect(game.players[0].position.y).toEqual(0);
        game.movePlayer(1, "LEFT");
        // [p1][  ][  ]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.players[0].position.x).toEqual(0);
        expect(game.players[0].position.y).toEqual(0);
        game.movePlayer(1, "DOWN");
        // [  ][  ][  ]
        // [p1][p2][  ]
        // [  ][  ][  ]
        expect(game.players[0].position.x).toEqual(0);
        expect(game.players[0].position.y).toEqual(1);
        game.movePlayer(1, "RIGHT");
        // [  ][  ][  ]
        // [p1][p2][  ]
        // [  ][  ][  ]

        expect(game.players[0].position.x).toEqual(0);
        expect(game.players[0].position.y).toEqual(1);

        expect(game.players[1].position.x).toEqual(1);
        expect(game.players[1].position.y).toEqual(1);

        game.movePlayer(2, "RIGHT");
        // [  ][  ][  ]
        // [p1][  ][p2]
        // [  ][  ][  ]
        expect(game.players[1].position.x).toEqual(2);
        expect(game.players[1].position.y).toEqual(1);
    });
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
