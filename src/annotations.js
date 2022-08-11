var annotations = {};

function drawStart(event){
    startX = event.clientX;
    startY = event.clientY;
}

function drawEnd(event){
    // If there's no image, return
    if(allImages.length <1) return;
    endX = event.clientX;
    endY = event.clientY;
    // stop creating annotations accidentally
    if(!(Math.abs(endX-startX) <20 && Math.abs(endY-startY) <20)) drawAnnotation();
}

function drawAnnotation(){
    var height = endY-startY;
    var width = endX-startX;
    // default: first annotation of image 1
    var newId = 'image' + currentSelectedImage + '-0';

    // list of annotations related to the selected image
    var annotationList = annotations['image'+currentSelectedImage];
    if(!annotationList){
        annotations['image'+currentSelectedImage] = [];
    }else{
        console.log('annotationList', annotationList)
        newId = 'image' + currentSelectedImage + '-' + annotationList.length;
    }
    annotations['image'+currentSelectedImage].push(newId);
    
    $('#canvas').append("<div id='" + newId + "' class='annotation' style='top: "+ startY +"px; left: " + startX + "px; " 
                + "height: " + height + "px; width: " + width + "px;'>"
                + "<input id='input_"+ newId + "' onchange='modifyAnnotation(event.target.value, this)' class='annotation-text' "
                + "style='width: " + (width -10) + "px;' placeholder='New annotation'></input> "
                +"</div>");  

    
    // make element draggable
    dragElement(document.getElementById(newId));
    // append new annotation below
    addDisplayAnnotations(newId)
}

function addDisplayAnnotations(newId) {
    $('#tags').append(
        "<div id='tagdiv_" + newId + "'><span id='tag_" + newId + "' class='tag'>New annotation</span>"
        + "<span id='delete_" + newId + "' class='delete-annotation' onclick='deleteTag(event.target.id)'>Delete<span></div>");  
}
   
function modifyAnnotation(value, elem){
     var id = elem.id.replace('input_', '#tag_');
     $(id).text(value)
}

function deleteTag(elem) {
    var id = elem.replace('delete_', '');
    var key = id.substring(0, id.indexOf('-'));
    annotations[key] = annotations[key].splice(annotations[key].indexOf(id), 1);
    // remove bottom display of the tag
    $('#tagdiv_' + id).remove();
    // remove annotation in the image
    $('#' + id).remove();
}

function deleteAllTags() {
    var key = 'image'+currentSelectedImage;
    annotations[key].forEach((id)=>{
        // remove bottom display of the tag
        $('#tagdiv_' + id).remove();
        // remove annotation in the image
        $('#' + id).remove();
    });

    delete annotations[key];
}

