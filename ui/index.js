import { Game } from "../core/game.js";
import { ShogunNumberUtility } from "../core/shogun-number-utility.js";
import { Controller } from "./controller.js";
import { View } from "./view.js";

const numberUtility = new ShogunNumberUtility();
const game = new Game(numberUtility);

const view = new View();
const controller = new Controller(view, game);

controller.init();
