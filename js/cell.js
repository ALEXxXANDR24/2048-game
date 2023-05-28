import { Config } from "./config.js";

export class Cell {
    constructor (board, blockSize, boardSize, value = 2) {
        this.size = blockSize;
        this.value = value;
        this.isUnit = false;
        this.isNew = true;
        this.DOM = undefined;
        this.config = new Config();
        this.boardSize = boardSize;
        if(this.value !== 0){
            this.DOM = this.createTemplate(value);
            board.appendChild(this.DOM)
        }
    }

    addAnimation () {
        this.DOM.style.transform += "scale(0)";
        setTimeout(() => this.DOM.style.transform = this.DOM.style.transform.replace("scale(0)", "scale(1)"), 100);
    }

    unitAnimation () {
        this.DOM.style.transform += "scale(1.2)";
        this.DOM.style["z-index"] = "3";
        setTimeout(() => {
            this.DOM.style.transform = this.DOM.style.transform.replace("scale(1.2)", "scale(1)");
            this.DOM.style["z-index"] = "2";
        }, 100);
    }

    drow (x, y, gap) {
        this.DOM.style.transform = `translate(${gap * (x + 1) + this.size * x}px , ${gap * (y + 1) + this.size * y}px)`;
        let shorthand = this.value + '';
        if ( this.value > 1000000){
            shorthand = Math.floor(this.value / 1000000) + 'M'; 
        }
        else if ( this.value > 4000){
            shorthand = Math.floor(this.value / 1000) + 'K'; 
        }
        this.DOM.innerHTML = shorthand;
        this.DOM.style.fontSize = this.config.FONTS[this.boardSize][shorthand.length - 1];
        this.DOM.className = `board_item board_item__${this.value}`;

        if(this.isNew){
            this.addAnimation();
            this.isNew = false;
        }
        if(this.isUnit){
            this.unitAnimation();
            this.isUnit = false;
        }
    }

    createTemplate (value) {
        let newItem = document.createElement('div');
        newItem.className = `board_item board_item__${value}`;
        newItem.innerHTML = value;
        newItem.style.width = `${this.size}px`;
        newItem.style.height = `${this.size}px`;
        return newItem
    }

    remove () {
        this.value = 0;
        setTimeout(() => {
            this.DOM.remove();
            this.DOM = undefined;
        }, 100);
    }
}