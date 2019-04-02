export function refreshRender(canvas, data) {
    setDisplayCanvas(canvas);
    computeParamsDrums(canvas, data);
    renderCanvas(canvas, data);
}

/* Display current state on canvas */
export function renderCanvas(canvas, data) {
    // это в отличии от clearRect помогает избедать потери fps
    canvas.width = canvas.parentNode.clientWidth;
    
    for (let i = 0; i < data.countDrum; i++) {
        data.drums[i].draw();
    }
}

/* Settings display canvas */
function setDisplayCanvas(canvas) { // 5*3
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.width / 5*3;
}
/* Compute position of display Drums */
function computeParamsDrums(canvas, data) {
    let { width, height } = canvas;

    const drumOpts = {
        w: width / (data.countDrum + 1),
        h: height * 0.4,
        y: height * 0.4
    };
    drumOpts.x = drumOpts.w/2;
    
    for (let i = 0; i < data.countDrum; i++) {
        data.drums[i].setting(drumOpts);
        drumOpts.x += drumOpts.w;
    }
}