var allImages = [];
var currentSelectedImage = 0;

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {            
        if (this.files && this.files[0]) {
            allImages.push(this.files[0]);
            changeImage(allImages.length-1);
        }
    });
});

function changeImage(index) {
    //var img = document.querySelector('img');
    //img.onload = () => {
    //    URL.revokeObjectURL(img.src); 
    //}
    //img.src = URL.createObjectURL(allImages[index]);
    currentSelectedImage = index;
    changeImageNumber();
    loadImage(allImages[index])
}

function deleteImage() {
    allImages.splice(currentSelectedImage, 1);
    // var img = document.querySelector('img');
    // img.onload = () => {
    //     URL.revokeObjectURL(img.src); 
    // }

    if(allImages.length >0){
        changeImage(--currentSelectedImage)
        // currentSelectedImage--;
        // drawImage(allImages[currentSelectedImage]);
        // img.src = URL.createObjectURL(allImages[currentSelectedImage]);
    }else{
        clearImage();
    }
}

function nextImage() {
    if(currentSelectedImage +1 > allImages.length-1){
        currentSelectedImage = allImages.length-1;
    } else{
        currentSelectedImage++;
        changeImage(currentSelectedImage);
    }
}

function prevImage() {
    if(currentSelectedImage -1 < 0){
        currentSelectedImage = 0;
    } else{
        currentSelectedImage--;
        changeImage(currentSelectedImage);
    }
}

function changeImageNumber(){
    $("#imageNumber").text("Image " + (currentSelectedImage+1));
    $("#imageBreadcrumb").text((currentSelectedImage+1) + ' of ' + allImages.length );
}