import { Google } from "./entities/google.js";
import { Player } from "./entities/player.js";
import { GameStatuses } from "./settings/game-statuses.js";
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
            player.move(index, positions);
        });
    }

    get google() {
        return this.#google;
    }

    get settings() {
        return this.#settings;
    }

    get playersPositions() {
        return this.#players;
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
