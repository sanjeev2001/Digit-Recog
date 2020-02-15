// $("#image-selector").change(function () {
//     let reader = new FileReader();
//     reader.onload = function () {
//         let dataURL = reader.result;
//         $('#selected-image').attr("src", dataURL);
//         $("prediction-list").empty();
//     }
//     let file = $("image-selector").prop('files')[0];
//     reader.readAsDataURL(file);
// });

// let jsonUploaded = false;
// let weightUploaded = false;
// const uploadJSONInput = document.getElementById('upload-json');
// uploadJSONInput.onchange = function () {
//     uploadJSONInput.remove();
//     jsonUploaded = true;
//     checkUploaded(jsonUploaded, weightUploaded);
// };

// const uploadWeightsInput = document.getElementById('upload-weights');
// uploadWeightsInput.onchange = function () {
//     uploadWeightsInput.remove();
//     weightUploaded = true;
//     checkUploaded(jsonUploaded, weightUploaded);
// };

// function checkUploaded(i1, i2) {
//     if (i1 === true && i2 === true) {
//         console.log("Files sucessfully uploaded");
//         //run();
//     } 
// }

