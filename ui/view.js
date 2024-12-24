import { GameStatuses } from "../core/settings/game-statuses.js";
import { MOVE_DIRECTIONS } from "../core/settings/move-directions.js";

export class View {
    onstart = null;
    onPlayerMove = null;

    constructor() {
        document.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowUp":
                    this.onPlayerMove(1, MOVE_DIRECTIONS.UP);

                    break;
                case "ArrowDown":
                    this.onPlayerMove(1, MOVE_DIRECTIONS.DOWN);

                    break;
                case "ArrowLeft":
                    this.onPlayerMove(1, MOVE_DIRECTIONS.LEFT);

                    break;
                case "ArrowRight":
                    this.onPlayerMove(1, MOVE_DIRECTIONS.RIGHT);

                    break;
                default:
                    return; // Quit when non-arrow key is pressed.
            }
        });
    }

    render(dto) {
        const rootElement = document.getElementById("root");

        rootElement.innerHTML = "";

        rootElement.append("Status: " + dto.status);

        if (dto.status === GameStatuses.SETTINGS) {
            const settingsComponent = new SettingsComponent({ onstart: this.onstart });
            const settingsElement = settingsComponent.render(dto);
            rootElement.append(settingsElement);
        } else if (dto.status === GameStatuses.IN_PROGRESS) {
            const gridComponent = new GridComponent({ onPlayerMove: this.onPlayerMove });
            const gridElement = gridComponent.render(dto);
            rootElement.append(`Google points: ${dto.google.points}, Players points: ${dto.players.map((player, i) => `Player${i + 1}: ${player.points}`)}`);

            rootElement.append(gridElement);
        }
    }
}

class SettingsComponent {
    #props;
    constructor(props) {
        this.#props = props;
    }

    render(dto) {
        const container = document.createElement("div");
        container.classList.add("container");

        const btn = document.createElement("button");
        btn.append("Start game");

        btn.onclick = () => {
            this.#props?.onstart?.();
        };
        container.append(btn);
        // if (dto.status === GameStatuses.SETTINGS) {
            
        // }
        // if (dto.status === GameStatuses.IN_PROGRESS) {
        //     container.append(`Google points: ${dto.google.points}, Players points: ${dto.players.map((player, i) => `Player${i + 1}: ${player.points}`)}`);
        // }

        return container;
    }
}

class GridComponent {
    //перенести в gridcomponent чтобы подписка один раз была
    // constructor({ onPlayerMove }) {
    //     document.addEventListener("keyup", (e) => {
    //         switch (e.code) {
    //             case "ArrowUp":
    //                 onPlayerMove(1, MOVE_DIRECTIONS.up);

    //                 break;
    //             case "ArrowDown":
    //                 onPlayerMove(1, MOVE_DIRECTIONS.DOWN);

    //                 break;
    //             case "ArrowLeft":
    //                 onPlayerMove(1, MOVE_DIRECTIONS.LEFT);

    //                 break;
    //             case "ArrowRight":
    //                 onPlayerMove(1, MOVE_DIRECTIONS.RIGHT);

    //                 break;
    //             default:
    //                 return;
    //         }
    //     });
    // }

    render(dto) {
        const container = document.createElement("table");

        for (let y = 0; y < dto.settings.gridSettings.rowsCount; y++) {
            const row = document.createElement("tr");
            for (let x = 0; x < dto.settings.gridSettings.columnsCount; x++) {
                const cell = document.createElement("td");

                if (dto.players.some((player) => player.position.x === x && player.position.y === y)) {
                    cell.textContent = "PL";
                    cell.style.background = "gray";
                } else if (dto.google.position.x === x && dto.google.position.y === y) {
                    cell.textContent = "G";
                    cell.style.background = "yellow";

                }

                row.append(cell);
            }
            container.append(row);
        }

        return container;
    }
}
