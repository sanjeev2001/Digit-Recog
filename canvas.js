window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.weight = window.innerWidth;

    let drawing = false;

<<<<<<< HEAD
    function startingPointerPosition(e){
        drawing = true;
        pointerDraw(e);
=======
    function startingMousePosition(e){
        drawing = true;
        mouseDraw(e);
>>>>>>> origin/Ashanth
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
        //context.lineWidth = 10;
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

<<<<<<< HEAD
    canvas.addEventListener('pointerdown', startingPointerPosition);
    canvas.addEventListener('pointerup', endingPosition);
    canvas.addEventListener('pointermove', pointerDraw);
=======
    canvas.addEventListener('mousedown', startingMousePosition);
    canvas.addEventListener('mouseup', endingPosition);
    canvas.addEventListener('mousemove', mouseDraw);
>>>>>>> origin/Ashanth
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

function penSize(e) {
    context.lineWidth = 10;
}