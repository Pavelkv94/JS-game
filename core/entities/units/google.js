import { Position } from "../position.js";
import { Unit } from "./unit.js";

export class Google extends Unit {
    #numberUtility;
    #gridSettings;

    constructor(numberUtility, gridSettings) {
        super();
        this.#numberUtility = numberUtility;
        this.#gridSettings = gridSettings;
    }

    // google jump
    jump(busyPositions) {
        const newGooglePosition = new Position(
            this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.columnsCount),
            this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.rowsCount)
        );
        const isPositionWithPlayers = !!busyPositions.find((coords) => coords.equals(newGooglePosition));
        const isOldPosition = newGooglePosition.equals(this.position);

        if (isPositionWithPlayers && isOldPosition) {
            this.jump(busyPositions);
            return;
        }

        this.position = newGooglePosition;
    }
}
