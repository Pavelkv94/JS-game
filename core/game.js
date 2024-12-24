import { Google } from "./entities//units/google.js";
import { Player } from "./entities//units/player.js";
import { Position } from "./entities/position.js";
import { GameStatuses } from "./settings/game-statuses.js";
import { MOVE_DIRECTIONS } from "./settings/move-directions.js";
import { Settings } from "./settings/settings.js";

export class Game {
    #settings;
    #players = [];
    #google = null;
    #googleJumpIntervalId;
    #numberUtility;
    #status = GameStatuses.SETTINGS;

    //dependency injection
    constructor(somethingSimilarToNumberUtility) {
        this.#numberUtility = somethingSimilarToNumberUtility;
        this.#settings = new Settings();
    }

    #observers = [];

    //low coupling
    subscribe(observerFunction) {
        this.#observers.push(observerFunction);
    }

    #notify() {
        //добавить к jump и move player
        this.#observers.forEach((o) => o());
    }

    async start() {
        this.#setStatusInProgress();

        this.#setInitialPlayersPositions();

        const positions = this.#players.map((p) => p.position);

        this.#google = new Google(this.#numberUtility, this.#settings.gridSettings);

        this.#google.jump(positions);

        //уведомляем
        this.#notify();

        this.#googleJumpIntervalId = setInterval(() => {
            this.#google.jump(positions);
            this.#google.increasePoints();
            //уведомляем
            this.#notify();

            if (this.#google.points === this.#settings.pointsToWin) {
                this.finish();
            }
        }, this.#settings.googleJumpInterval);
    }

    async finish() {
        this.#setStatusLose();
        this.#google = null;
        this.#players = [];
        clearInterval(this.#googleJumpIntervalId);
    }

    tryAgain() {
        this.#setStatusInSettings();
    }

    #setInitialPlayersPositions() {
        this.#players = new Array(this.#settings.playersCount).fill(null).map(() => new Player(this.#numberUtility, this.#settings.gridSettings));

        this.#players.forEach((player, index) => {
            const positions = this.#players.map((p) => p.position);
            player.placePlayerToGrid(index, positions);
        });
    }

    async movePlayer(playerNumber, moveDirection) {
        const position = this.#players[playerNumber - 1].position;
        let newPosition;
        switch (moveDirection) {
            case MOVE_DIRECTIONS.UP: {
                newPosition = new Position(position.x, position.y - 1);
                break;
            }
            case MOVE_DIRECTIONS.DOWN: {
                newPosition = new Position(position.x, position.y + 1);
                break;
            }
            case MOVE_DIRECTIONS.LEFT: {
                newPosition = new Position(position.x - 1, position.y);
                break;
            }
            case MOVE_DIRECTIONS.RIGHT: {
                newPosition = new Position(position.x + 1, position.y);
                break;
            }
        }

        if (
            newPosition.x >= this.#settings.gridSettings.columnsCount ||
            newPosition.x < 0 ||
            newPosition.y >= this.#settings.gridSettings.rowsCount ||
            newPosition.y < 0
        ) {
            return;
        }

        if (this.#players.some((el) => el.position.equals(newPosition))) {
            return; // Position is already occupied
        }

        this.#players[playerNumber - 1].position = newPosition;

        if (this.#players[playerNumber - 1].position.equals(this.#google.position)) {
            this.#players[playerNumber - 1].increasePoints();
            const positions = this.#players.map((p) => p.position);

            this.#google.jump(positions);
            this.#notify();
        }
    }

    get google() {
        return this.#google;
    }

    get settings() {
        return this.#settings;
    }

    get players() {
        return this.#players;
    }

    #setStatusInProgress() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error("Game already started");
        }
        this.#status = GameStatuses.IN_PROGRESS;
    }

    #setStatusLose() {
        if (this.#status !== GameStatuses.IN_PROGRESS) {
            throw new Error("Game already finished");
        }
        this.#status = GameStatuses.LOSE;
    }

    #setStatusWin() {
        if (this.#status !== GameStatuses.IN_PROGRESS) {
            throw new Error("Game already finished");
        }
        this.#status = GameStatuses.WIN;
    }

    #setStatusInSettings() {
        if (this.#status !== GameStatuses.WIN && this.#status !== GameStatuses.LOSE) {
            throw new Error("Game already finished");
        }
        this.#status = GameStatuses.SETTINGS;
    }

    get status() {
        return this.#status;
    }
}
