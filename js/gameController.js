import { Cell } from "./cell.js";

export class GameController {
    score = 4;
    moves = 0;
    cells = [];
    isMoved = false;

    constructor (config, board) {
        console.log("game start")
        this.board = board;
        this.config = config;
    }

    generateCellsArr () {
        for(let y = 0; y < this.config.size; y++){
            this.cells.push([])
            for(let x = 0; x < this.config.size; x++){
                let newCell = new Cell(this.board, this.config.getBlockSize(), 0);
                this.cells[y].push(newCell);
            }
        }
    }

    generateNewCell () {
        let freePositions = [];
        for(let y = 0; y < this.cells.length; y++){
            for(let x = 0; x < this.cells[y].length; x++){
                if(this.cells[y][x].value === 0){
                    freePositions.push([x,y]);
                }
            }
        }
        let randomIndex = Math.floor(Math.random() * freePositions.length);
        let x = freePositions[randomIndex][0];
        let y = freePositions[randomIndex][1];
        let newCell = new Cell(this.board, this.config.getBlockSize());
        this.cells[y][x] = newCell;
    }

    drowCells () {
        for(let y = 0; y < this.cells.length; y++){
            for(let x = 0; x < this.cells[y].length; x++){
                if(this.cells[y][x].value !== 0){
                    this.cells[y][x].drow(x, y, this.config.getGap());
                }
            }
        }
    }

    addScore (value) {
        this.score += value;
    }



    restart () {
        [...document.querySelectorAll(".board_item")].map((a) => a.remove());
        this.score = 4;
        this.moves = 0;
        this.cells = [];
        this.generateCellsArr();
        this.generateNewCell();
        this.generateNewCell();
        this.drowCells();
    }

    checkGameover () {
        for(let y = 0; y < this.cells.length; y++){
            for(let x = 0; x < this.cells[y].length; x++){
                let currentValue = this.cells[y][x].value;
                if(currentValue == 0){
                    return false;
                }
                let isValidRight = (x + 1 < this.cells[x].length) ? this.cells[y][x+1].value == currentValue : false;
                let isValidLeft = (x - 1 >= 0) ? this.cells[y][x-1].value == currentValue : false;
                let isValidUp = (y - 1 >= 0) ? this.cells[y-1][x].value == currentValue : false;
                let isValidDown = (y + 1 < this.cells.length) ? this.cells[y+1][x].value == currentValue : false;
                if(isValidRight || isValidLeft || isValidUp || isValidDown){
                    return false;
                }
            }
        }
        return true;
    }

    moveLeft () {
        for(let y = 0; y < this.cells.length; y++){
            for(let x = 1; x < this.cells[y].length; x++){
                if(this.cells[y][x].value === 0) continue;
                for(let mX = x; mX > 0; mX--){
                    if(this.cells[y][mX-1].value == 0){
                        [this.cells[y][mX-1], this.cells[y][mX]] = [this.cells[y][mX], this.cells[y][mX-1]]
                        this.isMoved = true;
                    }
                    if(this.cells[y][mX-1].value == this.cells[y][mX].value &&
                        !this.cells[y][mX-1].isUnit &&
                        !this.cells[y][mX].isUnit){
                        this.cells[y][mX-1].value *= 2;
                        this.addScore(this.cells[y][mX-1].value)
                        this.cells[y][mX-1].isUnit = true;
                        this.cells[y][mX].drow(mX-1, y, this.config.getGap());
                        this.cells[y][mX].remove();
                        this.isMoved = true;
                    }
                }
            }
        }
    }

    moveRight () {
        for(let y = 0; y < this.cells.length; y++){
            for(let x = this.cells[y].length - 2; x >= 0; x--){
                if(this.cells[y][x].value == 0) continue;
                for(let mX = x; mX < this.cells[y].length - 1; mX++){
                    if(this.cells[y][mX+1].value == 0){
                        [this.cells[y][mX+1], this.cells[y][mX]] = [this.cells[y][mX], this.cells[y][mX+1]]
                        this.isMoved = true;
                    }
                    if(this.cells[y][mX+1].value == this.cells[y][mX].value &&
                        !this.cells[y][mX+1].isUnit &&
                        !this.cells[y][mX].isUnit){
                        this.cells[y][mX+1].value *= 2;
                        this.addScore(this.cells[y][mX+1].value)
                        this.cells[y][mX+1].isUnit = true;
                        this.cells[y][mX].drow(mX+1, y, this.config.getGap());
                        this.cells[y][mX].remove();
                        this.isMoved = true;
                    }
                }
            }
        }
    }

    moveDown () {
        for(let y = this.cells.length - 2; y >= 0; y--){
            for(let x = 0; x < this.cells[y].length; x++){
                if(this.cells[y][x].value == 0) continue;
                for(let mY = y; mY < this.cells.length - 1; mY++){
                    if(this.cells[mY+1][x].value == 0){
                        [this.cells[mY+1][x], this.cells[mY][x]] = [this.cells[mY][x], this.cells[mY+1][x]]
                        this.isMoved = true;
                    }
                    if(this.cells[mY+1][x].value == this.cells[mY][x].value &&
                        !this.cells[mY+1][x].isUnit &&
                        !this.cells[mY][x].isUnit){
                        this.cells[mY+1][x].value *= 2;
                        this.addScore(this.cells[mY+1][x].value)
                        this.cells[mY+1][x].isUnit = true;
                        this.cells[mY][x].drow(x, mY+1, this.config.getGap());
                        this.cells[mY][x].remove();
                        this.isMoved = true;
                    }

                }
            }
        }
    }

    moveUp () {
        for(let y = 1; y < this.cells.length; y++){
            for(let x = 0; x < this.cells[y].length; x++){
                if(this.cells[y][x].value == 0) continue;
                for(let mY = y; mY > 0; mY--){
                    if(this.cells[mY-1][x].value == 0){
                        [this.cells[mY-1][x], this.cells[mY][x]] = [this.cells[mY][x], this.cells[mY-1][x]]
                        this.isMoved = true;
                    }
                    if(this.cells[mY-1][x].value == this.cells[mY][x].value &&
                        !this.cells[mY-1][x].isUnit &&
                        !this.cells[mY][x].isUnit){
                        this.cells[mY-1][x].value *= 2;
                        this.addScore(this.cells[mY-1][x].value)
                        this.cells[mY-1][x].isUnit = true;
                        this.cells[mY][x].drow(x, mY-1, this.config.getGap());
                        this.cells[mY][x].remove();
                        this.isMoved = true;
                    }

                }
            }
        }
    }
}