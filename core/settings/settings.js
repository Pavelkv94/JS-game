import { GridSettings } from "./grid-settings.js";

export class Settings {
    #pointsToWin = 5;
    //todo move to game
    #gridSettings;
    #googleJumpInterval = 1000;
    #playersCount = 2;

    constructor() {
        this.#gridSettings = new GridSettings();
    }

    get gridSettings() {
        return this.#gridSettings;
    }

    get googleJumpInterval() {
        return this.#googleJumpInterval;
    }

    get playersCount() {
        return this.#playersCount;
    }

    get pointsToWin() {
        return this.#pointsToWin;
    }

    set googleJumpInterval(value) {
        if (typeof value !== "number") {
            throw new Error("googleJumpInterval must be a number");
        }
        if (value <= 0) {
            throw new Error("googleJumpInterval must be greater than 0");
        }
        this.#googleJumpInterval = value;
    }
}
