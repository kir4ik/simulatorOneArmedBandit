import random from './util/random';
import Drum from './gameAPI/drum';

const defCash = 100;
const countDrum = 3;

let values = [];
for (let i = 0; i <= 7; i++) values.push(i);

let drums = [];
for (let i = 0; i < countDrum; i++) drums.push(new Drum({ values }));

const data = {
    cash: defCash,
    bet: 10,
    countDrum, defCash, values, drums
};

Object.defineProperty(data, 'turns', {
    get() {
        return this._turns;
    },
    set(count) {
        let fullTurn = values.length;
        this._turns = [];

        for (let i = 0; i < this.countDrum; i++) {
            let val = random(1, fullTurn - 1);
            this._turns.push(count * fullTurn + val);
        }

        return true;
    }
});

export default data;