// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    imageOutput = document.querySelector("#image--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    imageSensor = document.querySelector("#image--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
        console.log("always");

    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// example use
var div = document.querySelector('div.rectangle');
var height = div.offsetHeight;
var width = div.offsetWidth;
var divOffset = offset(div);
console.log(divOffset.left, divOffset.top);
console.log("Height and width : ",height," and ",width);
console.log("camera sensor -- ", cameraView.offsetWidth);


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    	cameraSensor.width = cameraView.offsetWidth;
    	cameraSensor.height = cameraView.offsetHeight;
	var cc=cameraSensor.getContext('2d');
	cc.translate(cameraView.offsetWidth, 0);
	cc.scale(-1, 1);
    	cc.drawImage(cameraView,0,0,cameraView.offsetWidth,cameraView.offsetHeight);
   // window.open(cameraSensor.toDataURL("image/png"));
    //cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
   // window.open(cameraSensor.toDataURL("image/png"));
	var d=cameraSensor.toDataURL("image/png");
    	cameraOutput.src = d;
	imageOutput.onload = function()
  {
	console.log("image is loaded");
	context.drawImage(imageOutput,divOffset.left,divOffset.top,width,height,0,0,width,height);
	var img = imageSensor.toDataURL("image/png");
    	console.log("second canvas data url -- image src",img);
	var w=window.open('about:blank','image from canvas');
	w.document.write("<img src='"+img+"' alt='from canvas'/>");
  document.getElementById('custId').value = img;
  document.getElementById("myForm").submit();
}
	imageOutput.src=d;
    	cameraOutput.classList.add("taken");
	imageSensor.width = width;
    	imageSensor.height = height;
	var context = imageSensor.getContext("2d");
  




   // document.getElementById('custId').value= cameraOutput.src
   // document.getElementById('myForm').submit();
};
// Start the video stream when the window loads

window.addEventListener("load", cameraStart, false);
