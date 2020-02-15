window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.weight = window.innerWidth;

    let drawing = false;

    function startingPosition(e){
        drawing = true;
        draw(e);
    }
    function endingPosition(){
        drawing = false;
        context.beginPath();
    }

    function mouseDraw(e){
        if(!drawing){
            return;
        }
        context.lineWidth = 10;
        context.lineCap = "round";

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }

    function touchDraw(e){
        if(!drawing){
            return;
        }
        context.lineWidth = 10;
        context.lineCap = "round";

        context.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }

    canvas.addEventListener('mousedown', startingPosition);
    canvas.addEventListener('mouseup', endingPosition);
    canvas.addEventListener('mousemove', mouseDraw);
    canvas.addEventListener('touchstart', startingPosition);
    canvas.addEventListener('touchend', endingPosition);
    canvas.addEventListener('touchmove', touchDraw);

});

