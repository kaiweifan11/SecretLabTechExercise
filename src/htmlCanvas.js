var canvas = document.getElementById("imageCanvas");
var ctx = canvas.getContext("2d");

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

function loadImage(imageFile){
    var img = new Image;
    
    img.src = URL.createObjectURL(imageFile);
    img.onload = function() {
        if(this.width > 700 || this.height > 500){
            alert('For optimal experience, please upload images width 700px x height 500px');
        }
        clearImage();
        ctx.drawImage(img, 10, 10);
    }
}

function clearImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

