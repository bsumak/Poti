var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var lastPictureData; // last picture data

// Wait for Cordova to connect with the device
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready to be used!
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    var smallImage = document.getElementById('Image');

    // Unhide image elements
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;
    $.mobile.hidePageLoadingMsg();
    document.getElementById("detail_content").style.display = 'block';
    lastPictureData = imageData;
}


// A button will call this function
function capturePhoto() {
    document.getElementById("detail_content").style.display = 'none';
    $.mobile.changePage("#page_capture_details");
    $.mobile.showPageLoadingMsg('b', 'Nalaganje...', true);
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL
    });

}

// A button will call this function
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source,
        allowEdit: true,
        targetWidth: 100,
        targetHeight: 100,
        saveToPhotoAlbum: false
    });
}

// Called if something bad happens.
function onFail(message) {
    alert('Neuspešno, ker: ' + message);
}