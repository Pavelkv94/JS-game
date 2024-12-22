import { Position } from "./position.js";

export class Google {
  #position;
  #points = 0;
  #numberUtility;
  #gridSettings;

  constructor(numberUtility, gridSettings) {
    this.#position = new Position(0, 0);
    this.#numberUtility = numberUtility;
    this.#gridSettings = gridSettings;
  }

  increasePoints() {
    this.#points++;
  }

  // google jump
  jump(busyPositions) {
    const newGooglePosition = new Position(
      this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.columnsCount),
      this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.rowsCount)
    );
    const isPositionWithPlayers = !!busyPositions.find((coords) => coords.equals(newGooglePosition));
    const isOldPosition = newGooglePosition.equals(this.#position);

    if (isPositionWithPlayers && isOldPosition) {
      this.jump(busyPositions);
      return;
    }

    this.#position = newGooglePosition;
  }

  get position() {
    return this.#position;
  }

  set position(value) {
    this.#position = value;
  }

  get points() {
    return this.#points;
  }
}
