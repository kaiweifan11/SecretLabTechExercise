var allImages = [];
var currentSelectedImage = 0;

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {            
        if (this.files && this.files[0]) {
            console.log('this.files[0]', this.files[0])
            allImages.push(this.files[0]);
            clearAnnotations();
            changeImage(allImages.length-1);
            addToThumbnails();
        }
    });
});

function changeImage(index) {
    currentSelectedImage = index;
    changeImageNumber();
    loadImage(allImages[index]);

    // get the key of the new select image
    key = 'image' + currentSelectedImage;
    // populate the annotations
    if(annotations[key]){
        annotations[key].forEach((annotation)=>{
            drawAnnotation(annotation.startX, annotation.startY, annotation.endX, annotation.endY, annotation.id);
        })
    }
}

function deleteImage() {
    clearAnnotations();
    deleteThumbnail();
    allImages.splice(currentSelectedImage, 1);
    
    if(allImages.length >0){
        if(currentSelectedImage === 0) changeImage(currentSelectedImage);
        else changeImage(--currentSelectedImage);
    }else{
        clearImage();
        changeImageNumber();
    }
}

function nextImage() {
    if(currentSelectedImage +1 > allImages.length-1){
        currentSelectedImage = allImages.length-1;
    } else{
        clearAnnotations();
        currentSelectedImage++;
        changeImage(currentSelectedImage);
    }
}

function prevImage() {
    if(currentSelectedImage -1 < 0){
        currentSelectedImage = 0;
    } else{
        clearAnnotations();
        currentSelectedImage--;
        changeImage(currentSelectedImage);
    }
}

function clearAnnotations() {
    var key = 'image' + currentSelectedImage;
    if(annotations[key]) clearTags(key);
}

function changeImageNumber(){
    if(allImages.length < 1) {
        $("#imageNumber").text('');
        $("#imageBreadcrumb").text('');
    }else{
        $("#imageNumber").text("Image " + (currentSelectedImage+1));
        $("#imageBreadcrumb").text((currentSelectedImage+1) + ' of ' + allImages.length );
    }
}

function addToThumbnails(){
    $('#carousel-items').append(
        "<div class='thumbnail-container'> "
        +"<img src='' class='thumbnail' id='thumbnail" + currentSelectedImage + "' onclick='onClickThumbnail(event.target.id)' /></div>");  

    var img = document.getElementById('thumbnail' + currentSelectedImage);
    img.src = URL.createObjectURL(allImages[currentSelectedImage]);
}

function deleteThumbnail() {
    // remove bottom display of the tag
    $('#thumbnail' + currentSelectedImage).remove();
}

function onClickThumbnail(elem) {
    var id = elem.replace('thumbnail', '');
    clearAnnotations();
    changeImage(parseInt(id)) ;
}