//drawing stuff
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

window.addEventListener("load", () => {
    canvas.width = window.innerWidth * 0.3;
    canvas.height = window.innerWidth * 0.3;
    context.strokeStyle = "#ff1212";
    context.lineWidth = 15;

    clear.addEventListener('click', function (e) {
        context.restore();
    });


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

const clear = document.querySelector('#clear-button');
clear.addEventListener('click', function (e) {
    e.preventDefault();
    prediction.style.display = "none";
    classOut.style.display = "none";
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
});

//-------------------------------------------------------------------------------------------------------------------------------------

var prediction = document.getElementById("pred");
var classOut = document.getElementById("idk");
var out;
const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

function convertCanvasToImage(canvas) {
    var image = new Image(100, 100);
    image.src = canvas.toDataURL("image/jpeg");
    return image;
}

let model;
(async function () {
    model = await tf.loadLayersModel('https://sanjeev2001.github.io/my-model.json');

})();


canvas.addEventListener('pointerout', function () {

    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var tempData = new Array();
    tempData = imgData.data;

    for (var i = 0; i < tempData.length; i++) {
        if (tempData[i] != 0) {
            tempData[i] = 255;
        }
    }

    convertCanvasToImage(canvas).onload = async function () {
        var preImage = convertCanvasToImage(canvas);

        let tensor = tf.browser.fromPixels(preImage, 1).resizeNearestNeighbor([28, 28]).expandDims(0);

        let predictions = await model.predict(tensor).data();
        let top5 = Array.from(predictions)
            .map(function (p, i) {
                return {
                    probability: p,
                    className: classNames[i]
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            }).slice(0, 5);

        prediction.style.display = "block";
        classOut.style.display = "block";
        prediction.innerHTML = classNames.indexOf(top5[0].className);
        classOut.innerHTML = top5[0].className;
    }
});

const button_red = document.querySelector('.circle-red');
button_red.addEventListener('click', function (e) {
    context.strokeStyle = "#FF6961";
});

const button_orange = document.querySelector('.circle-orange');
button_orange.addEventListener('click', function (e) {
    context.strokeStyle = "#FFC97D";
});

const button_yellow = document.querySelector('.circle-yellow');
button_yellow.addEventListener('click', function (e) {
    context.strokeStyle = "#FDFD96";
});

const button_green = document.querySelector('.circle-green');
button_green.addEventListener('click', function (e) {
    context.strokeStyle = "#90EE90";
});

const button_blue = document.querySelector('.circle-blue');
button_blue.addEventListener('click', function (e) {
    context.strokeStyle = "#ADD8E6";
});

const button_indigo = document.querySelector('.circle-indigo');
button_indigo.addEventListener('click', function (e) {
    context.strokeStyle = "#A2ABE7";
});

const button_purple = document.querySelector('.circle-purple');
button_purple.addEventListener('click', function (e) {
    context.strokeStyle = "#B19CD9";
});