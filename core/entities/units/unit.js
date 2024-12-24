import { Position } from "../position.js";

export class Unit {
    #points = 0;
    #position = null;

    constructor() {
        this.#position = new Position(0, 0);
    }

    increasePoints() {
        this.#points++;
    }

    get points() {
        return this.#points;
    }

    get position() {
        return this.#position;
    }

    set position(value) {
        this.#position = value;
    }
}
