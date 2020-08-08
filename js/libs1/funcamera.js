var billImgURI = false;

function getCameraImage() {
    document.addEventListener("deviceready", function () {
        navigator.camera.getPicture(cameraSuccess, cameraError, {quality: 50});
    });
}

function cameraSuccess(imageURI) {
    billImgURI = imageURI;

    $('.tblServicing .clsCamBillImg').hide();
    $('.tblServicing .clsCamImgTaken').show();
    $('.tblServicing #btnRetakePhoto').show();
    $('.tblServicing .clsCamBillImg').hide();
    
    toastr.success('Photo attached successfully');
}

function cameraError() {
    alert('Camera error: Sirry not able to access Camera');
}

function cameraOptions() {

}