import { Position } from "../position.js";
import { Unit } from "./unit.js";

export class Player extends Unit {
    #numberUtility;
    #gridSettings;

    constructor(numberUtility, gridSettings) {
        super();
        this.#numberUtility = numberUtility;
        this.#gridSettings = gridSettings;
    }

    placePlayerToGrid(index, playersPositions) {
        let playerPosition = new Position(
            this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.columnsCount),
            this.#numberUtility.getRandomIntegerNumber(0, this.#gridSettings.rowsCount)
        );

        if (playersPositions.length === 0) {
            this.position = playerPosition;
        } else {
            const isUniquePosition = !playersPositions.find((coords) => coords.equals(playerPosition));

            if (isUniquePosition) {
                this.position = playerPosition;
            } else {
                this.placePlayerToGrid(index, playersPositions);
            }
        }
    }
}
