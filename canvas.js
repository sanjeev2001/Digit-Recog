window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.weight = window.innerWidth;

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    context.lineWidth = 10;

    slider.oninput = function () {
        console.log(output.innerHTML);
        output.innerHTML = this.value;
        context.lineWidth = slider.value;
        return output;
    }

    let drawing = false;

    function startingPointerPosition(e) {
        drawing = true;
        pointerDraw(e);
    }

    function startingTouchPosition(e) {
        drawing = true;
        touchDraw(e);
    }

    function endingPosition() {
        drawing = false;
        context.beginPath();
    }

    function pointerDraw(e) {
        if (!drawing) {
            return;
        }
        context.lineCap = "round";

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function touchDraw(e) {
        if (!drawing) {
            return;
        }

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
clear.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Clear has been clicked");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
});
