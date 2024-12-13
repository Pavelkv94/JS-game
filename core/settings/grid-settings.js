export class GridSettings {
  #columnsCount = 4;
  #rowsCount = 4;

  get columnsCount() {
    return this.#columnsCount;
  }

  get rowsCount() {
    return this.#rowsCount;
  }
}
