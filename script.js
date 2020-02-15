//drawing stuff
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

window.addEventListener("load", () => {
    canvas.width = window.innerWidth * 0.45;
    canvas.height = window.innerHeight * 0.45;
    context.strokeStyle = "#FFFFFF";

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

// const clear = document.querySelector('#clear');
// clear.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log("Clear has been clicked");
//     const context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);
// });

//-------------------------------------------------------------------------------------------------------------------------------------

// var sketchpad;
// var canvas = document.getElementById("sketchpad");
var prediction = document.getElementById("pred");
const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

// $(document).ready(function () {
//     sketchpad = new Sketchpad({
//         element: '#sketchpad',
//         width: 0.45 * width,
//         height: 0.45 * height
//     });
//     $('#color-picker').change(color);
//     $('#color-picker').val("#ff1212");
// });

// function color(event) {
//     sketchpad.color = $(event.target).val();
// }

function convertCanvasToImage(canvas) {
    var image = new Image(100, 100);
    image.src = canvas.toDataURL("image/jpeg");
    return image;
}

let model;
(async function () {
    // model = await tf.loadLayersModel(tf.io.browserFiles([uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
    model = await tf.loadLayersModel('http://sanjeev2001.github.io/my-model.json');
    setTimeout(() => {
        $(".progress-bar").hide();
    }, 2000)
})();

$("button").click(async function () {
    convertCanvasToImage(canvas).onload = async function () {

        let tensor = tf.browser.fromPixels(convertCanvasToImage(canvas), 1).resizeNearestNeighbor([28, 28]).expandDims(0);

        let predictions = await model.predict(tensor).data();
        let top5 = Array.from(predictions)
            .map(function (p, j) {
                return {
                    probability: p,
                    className: classNames[j]
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            }).slice(0, 5);
        prediction.innerHTML = top5[0].className;
        console.log(prediction.innerHTML);

    }
})