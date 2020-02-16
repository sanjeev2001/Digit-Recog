const canvas = document.querySelector("#yeet");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

canvas.addEventListener("pointerout", function () {
    console.log("pls");
});
