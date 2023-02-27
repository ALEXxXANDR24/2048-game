export function createListeners(gameController, resultsDrower, restartButtons, modalGameover, cellNumber, config, mapGenerator){
    document.addEventListener('keyup', (event) => {
        gameController.isMoved = false;
        switch(event.key){
            case "ArrowUp":
                gameController.moveUp();
                if(gameController.isMoved){
                    gameController.generateNewCell();
                    gameController.moves++;
                }
                gameController.drowCells();
                break;
            case "ArrowDown":
                gameController.moveDown();
                if(gameController.isMoved){
                    gameController.generateNewCell();
                    gameController.moves++;
                }
                gameController.drowCells();
                break;
            case "ArrowLeft":
                gameController.moveLeft();
                if(gameController.isMoved){
                    gameController.generateNewCell();
                    gameController.moves++;
                }
                gameController.drowCells();
                break;
            case "ArrowRight":
                gameController.moveRight();
                if(gameController.isMoved){
                    gameController.generateNewCell();
                    gameController.moves++;
                }
                gameController.drowCells();
                break;
        }
        if(gameController.checkGameover()) {
            modalGameover.showModal();
        }
        resultsDrower.drowScore(gameController.score);
        resultsDrower.drowMoves(gameController.moves);
    });

    restartButtons.map((a) => a.addEventListener('click', (event) => {
        modalGameover.close();
        gameController.restart();
    }));

    cellNumber.add.addEventListener('click', (e) => {
        if(config.size == 8) return
        config.size++;
        cellNumber.text.innerHTML = config.size;
        mapGenerator.setBoardParam();
        mapGenerator.generateFieldPattern();
        gameController.restart();
    });

    cellNumber.remove.addEventListener('click', (e) => {
        if(config.size == 3) return
        config.size--;
        cellNumber.text.innerHTML = config.size;
        mapGenerator.setBoardParam();
        mapGenerator.generateFieldPattern();
        gameController.restart();
    });
}