// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,
    enemytImage,
    fighterImage,
    gameoverImage,
    missileImage;
function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src="im"
}