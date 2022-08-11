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
    if(!(Math.abs(endX-startX) <20 && Math.abs(endY-startY) <20)) drawAnnotation(startX, startY, endX, endY, null);
}

function drawAnnotation(startX, startY, endX, endY, id){
    var height = endY-startY;
    var width = endX-startX;
    var key = 'image' + currentSelectedImage;
    // default: first annotation of image 1
    var newId = key + '-0';
    var value = '';

    // If there's no existing id, draw new annotation
    if(!id){
        // list of annotations related to the selected image
        var annotationList = annotations[key];
        if(!annotationList){
            annotations[key] = [];
        }else{
            newId = key + '-' + annotationList.length;
        }
        annotations[key].push({
            id: newId,
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            value: 'New Tag',
        });
        id = newId;
    } else {
        var annotationList = annotations[key];
        for(var annotation of annotationList){
            if(annotation.id === id){
                value = annotation.value;
                break;
            }
         }
    }
    
    $('#canvas').append("<div id='" + id + "' class='annotation' style='top: "+ startY +"px; left: " + startX + "px; " 
                + "height: " + height + "px; width: " + width + "px;'>"
                + "<input id='input_"+ id + "' onchange='modifyAnnotation(event.target.value, this)' class='annotation-text' "
                + "style='width: " + (width -10) + "px;' placeholder='New Tag' value='" + value + "'></input> "
                +"</div>");  

    
    // make element draggable
    dragElement(document.getElementById(id));
    // append new annotation below
    addDisplayAnnotations(id, value);
}

function addDisplayAnnotations(newId, value) {
    if(value === '') value = 'New Tag';
    $('#tags').append(
        "<div id='tagdiv_" + newId + "' class='annotation-display'><span id='tag_" + newId + "' class='tag'>" + value + "</span>"
        + "<span id='delete_" + newId + "' class='delete-annotation' onclick='deleteTag(event.target.id)'>Delete<span></div>");  
}
   
function modifyAnnotation(value, elem){
     var tagId = elem.id.replace('input_', '#tag_');
     var id = elem.id.replace('input_', '');
     $(tagId).text(value);
     var annotationList = annotations['image' + currentSelectedImage];
     for(var annotation of annotationList){
        if(annotation.id === id){
            annotation.value = value;
            break;
        }
     }
}

function updateCoordinates(id, offsetX, offsetY) {
    var annotationList = annotations['image' + currentSelectedImage];
     for(var annotation of annotationList){
        if(annotation.id === id){
            //annotation.value = value;
            console.log('annotation', annotation);
            console.log('offsetX', offsetX);
            console.log('offsetY', offsetY);
            
            annotation.startX = annotation.startX + offsetX;
            annotation.startY = annotation.startY + offsetY;
            annotation.endX = annotation.endX + offsetX;
            annotation.endY = annotation.endY + offsetY;
            console.log('annotation', annotation);
            break;
        }
     }

}

function deleteTag(elem) {
    var id = elem.replace('delete_', '');
    var key = id.substring(0, id.indexOf('-'));
    var index = 0;
    for(var i = 0; i < annotations[key].length; i++){
        if(annotations[key][i].id === id){
            index = i;
            break;
        }
    }
    
    annotations[key].splice(index, 1);
    // remove bottom display of the tag
    $('#tagdiv_' + id).remove();
    // remove annotation in the image
    $('#' + id).remove();
}

function deleteAllTags() {
    var key = 'image'+currentSelectedImage;
    clearTags(key);
    delete annotations[key];
}

// clear screen only, do not delete
function clearTags(key) {
    annotations[key].forEach((annotation)=>{
        // remove bottom display of the tag
        $('#tagdiv_' + annotation.id).remove();
        // remove annotation in the image
        $('#' + annotation.id).remove();
    });
}

