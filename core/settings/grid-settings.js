export class GridSettings {
    #columnsCount = 4;
    #rowsCount = 4;

    get columnsCount() {
        return this.#columnsCount;
    }

    get rowsCount() {
        return this.#rowsCount;
    }

    set columnsCount(value) {
        this.#columnsCount = value;
    }

    set rowsCount(value) {
        this.#rowsCount = value;
    }
}
