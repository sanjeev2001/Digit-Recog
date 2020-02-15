var sketchpad;
var canvas = document.getElementById("sketchpad");
var prediction = document.getElementById("pred");
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

$(document).ready(function () {
    sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 0.45 * width,
        height: 0.45 * height
    });
    $('#color-picker').change(color);
    $('#color-picker').val("#ff1212");
});

function color(event) {
    sketchpad.color = $(event.target).val();
}

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
