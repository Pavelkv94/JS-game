import { GridSettings } from "./grid-settings.js";

export class Settings {
    #pointsToWin = 50;
    #gridSettings;
    #googleJumpInterval = 3000;
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

    set playersCount(value) {
        this.#playersCount = value;
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
