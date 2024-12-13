import { Position } from "./position";

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

  get position() {
    return this.#position;
  }

  set position(value) {
    this.#position = value;
  }

  get points() {
    return this.#points;
  }

  increasePoints() {
    this.#points++;
  }

  // google jump
  jump(playersPositions) {
    const newGooglePosition = new Position(
      this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.columnsCount),
      this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.rowsCount)
    );
    const isPositionWithPlayers = !!playersPositions.find((coords) => coords.equals(newGooglePosition));
    const isOldPosition = newGooglePosition.equals(this.#position);

    if (isPositionWithPlayers && isOldPosition) {
      this.jump(playersPositions);
      return;
    }

    this.#position = newGooglePosition;
  }
}
