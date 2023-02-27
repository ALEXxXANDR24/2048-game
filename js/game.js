import { Config } from './config.js'
import { GameController } from './gameController.js';
import { MapGenerator } from './mapGenerator.js';
import { createListeners } from './createListeners.js';
import { ResultsDrower } from './resultsDrower.js';

const board = document.querySelector(".board");
const score = document.querySelector("#score-number");
const moves = document.querySelector("#moves-number");
const restartButtons = [...document.querySelectorAll(".btn__restart")];
const modalGameover = document.querySelector("#gameover-dialog");
const cellNumber = {
    add: document.querySelector("#add-cell-button"),
    remove: document.querySelector("#remove-cell-button"),
    text: document.querySelector("#cells-number"),
}

const config = new Config();

const mapGenerator = new MapGenerator(config, board);
mapGenerator.setBoardParam();
mapGenerator.generateFieldPattern();

const gameController = new GameController(config, board);
gameController.restart();

const resultsDrower = new ResultsDrower(score, moves);

createListeners(gameController, resultsDrower, restartButtons, modalGameover, cellNumber, config, mapGenerator);
