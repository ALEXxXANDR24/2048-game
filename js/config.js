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

    FONTS = {
        3: ['3rem', '2.7rem', '2.2rem', '1.6rem'],
        4: ['3rem', '2.7rem', '2.2rem', '1.6rem'],
        5: ['2.6rem', '2.1rem', '1.7rem', '1.3rem'],
        6: ['2.3rem', '1.6rem', '1.3rem', '1rem'],
        7: ['2rem', '1.2rem', '1rem', '0.8rem'],
        8: ['1.7rem', '1rem', '0.8rem', '0.7rem'],
    }
    
    getGap () {
        return this.FIELD_GAPS[this.size];
    }

    getBlockSize () {
        return (500 - (this.size - 1 + 2) * this.getGap()) / this.size;
    }
}