import { Google } from "./entities/google";
import { Player } from "./entities/player";
import { Settings } from "./settings/settings";

export class Game {
  #settings;
  #players = [];
  #google = null;
  #googleJumpIntervalId;
  #numberUtility;

  //dependency injection
  constructor(somethingSimilarToNumberUtility) {
    this.#numberUtility = somethingSimilarToNumberUtility;
    this.#settings = new Settings();
  }

  async start() {
    this.#settings.setStatusInProgress();

    this.#setInitialPlayersPositions();

    const positions = this.#players.map((p) => p.position);

    this.#google = new Google(this.#numberUtility, this.#settings.gridSettings);

    this.#google.jump(positions);

    this.#googleJumpIntervalId = setInterval(() => {
      this.#google.jump(positions);
      this.#google.increasePoints();

      if (this.#google.points === this.#settings.pointsToWin) {
        this.finish();
      }
    }, this.#settings.googleJumpInterval);
  }

  async finish() {
    this.#settings.setStatusLose();
    this.#google = null;
    this.#players = [];
    clearInterval(this.#googleJumpIntervalId);
  }

  #setInitialPlayersPositions() {
    this.#players = Array.from({ length: this.#settings.playersCount }, () => new Player(this.#numberUtility, this.#settings.gridSettings));

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
}
