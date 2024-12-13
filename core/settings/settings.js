import { GridSettings } from "./grid-settings";
import { GameStatuses } from "./game-statuses";

export class Settings {
  #pointsToWin = 5;
  #status = GameStatuses.SETTINGS;
  #gridSettings;
  #googleJumpInterval = 1000;
  #playersCount = 2;

  constructor() {
    this.#gridSettings = new GridSettings();
  }

  get status() {
    return this.#status;
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

  setStatusInProgress() {
    if (this.#status !== GameStatuses.SETTINGS) {
      throw new Error("Game already started");
    }
    this.#status = GameStatuses.IN_PROGRESS;
  }

  setStatusLose() {
    if (this.#status !== GameStatuses.IN_PROGRESS) {
      throw new Error("Game already finished");
    }
    this.#status = GameStatuses.LOSE;
  }

  setStatusWin() {
    if (this.#status !== GameStatuses.IN_PROGRESS) {
      throw new Error("Game already finished");
    }
    this.#status = GameStatuses.WIN;
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
