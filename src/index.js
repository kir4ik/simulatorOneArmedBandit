import Animation from './util/animation';
import calcWinnings from './gameAPI/calcWinnings';
import data from './data';
import * as display from './util/display';
import start from './gameAPI/start';

/* controls elements available user (canvas UI) */
const canvasUI = {
    start: document.querySelector('.btn--start'),
    cashAmount: document.getElementById('cashAmount'),
    betAmount: document.getElementById('betAmount'),
};

/* init canvas */
const canva = document.getElementById('canva');
const ctx = canva.getContext('2d');
for (let i = 0; i < data.countDrum; i++) data.drums[i].setting({ ctx });

/* init UI */
canvasUI.cashAmount.innerHTML = data.cash;
canvasUI.betAmount.innerHTML = data.bet;

/* Settings display */
window.onresize = () => {
    display.refreshRender(canva, data);
    setDisplayCanvasUI();
}
window.onresize();

function setDisplayCanvasUI() {
    /* Button Start */
    let btnStartFSize = canva.width / 25;
    canvasUI.start.style.fontSize = btnStartFSize + 'px';
    canvasUI.start.style.padding = `${btnStartFSize/4}px ${btnStartFSize*2}px`;
    canvasUI.start.style.left = canva.width / 2 - canvasUI.start.clientWidth / 2 + 'px';
}

/*
    Game Code of simulator
*/
canvasUI.start.onclick = () => {
    canvasUI.start.disabled = true;

    if (data.cash == 0) data.cash = data.defCash;
    canvasUI.cashAmount.innerHTML = data.cash -= data.bet;

    start(canva, data).then((isVictory) => {
        if (isVictory) {
            display.renderCanvas(canva, data);
            canvasUI.cashAmount.innerHTML = data.cash;
        }

        canvasUI.start.disabled = false;
    });
};
