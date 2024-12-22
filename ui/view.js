import { GameStatuses } from "../core/settings/game-statuses.js";

export class View {
    onstart = null;
    onPlayerMove = null;

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

        if (dto.status === GameStatuses.SETTINGS) {
            btn.append("Start game");

            btn.onclick = () => {
                this.onstart?.();
            };

            rootElement.append(btn);
        }

        return container;
    }
}

class GridComponent {

    //перенести в gridcomponent чтобы подписка один раз была
    constructor({ onPlayerMove }) {
        document.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowUp":
                    onPlayerMove(1, "UP");

                    break;
                case "ArrowDown":
                    onPlayerMove(1, "DOWN");

                    break;
                case "ArrowLeft":
                    onPlayerMove(1, "LEFT");

                    break;
                case "ArrowRight":
                    onPlayerMove(1, "RIGHT");

                    break;
                default:
                    return;
            }
        });
    }

    render(dto) {
        const container = document.createElement("table");

        for (let y = 0; y < dto.gridSize.rowsCount; y++) {
            const row = document.createElement("tr");
            for (let x = 0; x < dto.gridSize.columnsCount; x++) {
                const cell = document.createElement("td");

                if (dto.player1Position.x === x && dto.player1Position.y === y) {
                    cell.textContent = "PL";
                } else if (dto.googlePosition.x === x && dto.googlePosition.y === y) {
                    cell.textContent = "G";
                }

                row.append(cell);
            }
            container.append(row);
        }

        return container;
    }
}
