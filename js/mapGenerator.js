export class MapGenerator {
    constructor(config, board){
        this.config = config;
        this.board = board;
    }

    setBoardParam() {
        this.board.style["grid-template"] = `repeat(${this.config.size}, ${this.config.getBlockSize()}px) / repeat(${this.config.size}, ${this.config.getBlockSize()}px)`;
        this.board.style.gap = `${this.config.getGap()}px`;
        this.board.style.padding = `${this.config.getGap()}px`;
    }

    generateFieldPattern(){;
        for(let i = 0; i < Math.pow(this.config.size, 2); i++){
            let item = document.createElement('div');
            item.classList.add("board_item-place");
            this.board.appendChild(item);
        }
    }
}