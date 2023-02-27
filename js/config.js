export class Config {
    FIELD_GAPS = {
        3: 30,
        4: 20,
        5: 15,
        6: 15,
        7: 10,
        8: 10,
    }
    size = 4;
    
    getGap () {
        return this.FIELD_GAPS[this.size];
    }

    getBlockSize () {
        return (500 - (this.size - 1 + 2) * this.getGap()) / this.size;
    }
}