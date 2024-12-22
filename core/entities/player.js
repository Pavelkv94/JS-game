import { Position } from "./position.js";

export class Player {
  #playerPoints = 0;
  #position = null;
  #numberUtility;
  #gridSettings;

  constructor(numberUtility, gridSettings) {
    this.#position = new Position(0, 0);
    this.#numberUtility = numberUtility;
    this.#gridSettings = gridSettings;
  }

  increasePlayerPoints() {
    this.#playerPoints++;
  }

  move(index, playersPositions) {
    let playerPosition = new Position(
      this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.columnsCount),
      this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.rowsCount)
    );

    if (playersPositions.length === 0) {
      this.#position = playerPosition;
    } else {
      const isUniquePosition = !playersPositions.find((coords) => coords.equals(playerPosition));

      if (isUniquePosition) {
        this.#position = playerPosition;
      } else {
        this.move(index, playersPositions);
      }
    }
  }

  get playerPoints() {
    return this.#playerPoints;
  }

  get position() {
    return this.#position;
  }

  set position(value) {
    this.#position = value;
  }
}
