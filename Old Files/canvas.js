window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.weight = window.innerWidth;

    let drawing = false;

    function startingPointerPosition(e){
        drawing = true;
        pointerDraw(e);
    }

    function startingTouchPosition(e){
        drawing = true;
        touchDraw(e);
    }

    function endingPosition(){
        drawing = false;
        context.beginPath();
    }

    function pointerDraw(e){
        if(!drawing){
            return;
        }
        context.lineWidth = 10;
        context.lineCap = "round";

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function touchDraw(e){
        if(!drawing){
            return;
        }
        context.lineWidth = 10;
        context.lineCap = "round";

        context.lineTo(e.changedTouches[0].clientX - canvas.offsetLeft, e.changedTouches[0].clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.changedTouches[0].clientX - canvas.offsetLeft, e.changedTouches[0].clientY - canvas.offsetTop);
    }

    canvas.addEventListener('pointerdown', startingPointerPosition);
    canvas.addEventListener('pointerup', endingPosition);
    canvas.addEventListener('pointermove', pointerDraw);
    canvas.addEventListener('touchstart', startingTouchPosition);
    canvas.addEventListener('touchend', endingPosition);
    canvas.addEventListener('touchmove', touchDraw);
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("Clear has been clicked");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
});

import '@simonwep/pickr/dist/themes/nano.min.css';      // 'nano' theme
// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'nano', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }
});
