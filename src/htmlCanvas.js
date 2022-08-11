// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 75);

var canvas = document.getElementById("imageCanvas");
var ctx = canvas.getContext("2d");
var annotationCanvas = document.getElementById("annotationCanvas");
var annotationCtx = annotationCanvas.getContext("2d");

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

function loadImage(imageFile){
    var img = new Image;
    
    img.src = URL.createObjectURL(imageFile);
    img.onload = function() {
        clearImage();
        ctx.drawImage(img, 10, 10);
    }
}

function clearImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawStart(canvas, event){
    console.log('drawStart event', event)
    startX = event.offsetX;
    startY = event.offsetY;
    // Draw at random place
    // ctx=c.getContext("2d");
    // ctx.fillStyle="#ff0000";
    // ctx.beginPath();
    // ctx.fillRect (250*Math.random()+1, 220*Math.random()+1, 40, 30);
    // ctx.closePath();
    // ctx.fill();
    // // Save canvas
    // saveCanvas(canvas);
}

function drawEnd(canvas, event){
    console.log('drawEnd event', event)
    endX = event.offsetX;
    endY = event.offsetY;
    drawAnnotation();
}

function drawAnnotation(){
    annotationCtx.beginPath();
    annotationCtx.fillStyle="rgb(237 237 237 / 30%)";
    annotationCtx.rect(startX, startY, endX-startX, endY-startY);
    //annotationCtx.stroke();
    annotationCtx.fill();

    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
}