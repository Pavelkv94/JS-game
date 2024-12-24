export class Controller {
    #view;
    #model;

    constructor(somethingLikeView, somethingLikeModel) {
        this.#view = somethingLikeView;
        this.#model = somethingLikeModel;

        this.#model.subscribe(() => {
            this.#render();
        });

        this.#view.onPlayerMove = (playerNumber, direction) => {
            this.#model.movePlayer(playerNumber, direction);
            this.#render();
        };

        this.#view.onstart = () => {
            this.#model.start();
            this.#render();
        };
    }

    init() {
        this.#render();
    }

    #render() {
        const dto = this.#model;

        this.#view.render(dto);
    }
}
