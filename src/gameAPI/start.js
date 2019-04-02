import Animation from '../util/animation';
import { renderCanvas } from '../util/display';
import calcWinnings, { checkCombo } from '../gameAPI/calcWinnings';

export default function(canvas, data) {
    let animation = new Animation();
    data.turns = 3; // count full turn
    
    let duration = setAnimate(data, animation);
    
    animation.add({ duration, cb: () => renderCanvas(canvas, data) });
    
    return animation.start()
        .then(() => {
            const combo = [];
            for (let i = 0; i < data.countDrum; i++) {
                combo.push(data.drums[i].currentValue);
            }

            let winnings = calcWinnings(combo);
            if (winnings === 0) return false;
            
            data.cash += winnings;

            let res = checkCombo(combo);
            data.drums.forEach((drum) => {
                if (drum.currentValue === res.val) drum.isVictory = true;
            });

            return true;
        });
}

function setAnimate(data, animation) {
    let duration = 0;
    let step = 1500;

    for (let i = 0; i < data.countDrum; i++) {
        duration += step;
        step *= .9;

        data.drums[i].isVictory = false;
        
        animation.add({ duration, timing: 'ease-out',
            cb: (progress) => {
                let currentTurn = data.turns[i] * progress;
                data.drums[i].turn(currentTurn);
            }
        });
    }

    return duration;
}
