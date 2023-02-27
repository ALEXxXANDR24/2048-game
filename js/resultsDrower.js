export class ResultsDrower {
    constructor (score, moves) {
        this.scoreText = score;
        this.movesText = moves;
    }

    drowScore (value) {
        this.scoreText.innerHTML = value;
    }

    drowMoves (value) {
        this.movesText.innerHTML = value;
    }
}