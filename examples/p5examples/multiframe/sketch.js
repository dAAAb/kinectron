var myCanvas = null;
var context = null;
var kinectron = null;
var frames = [];

function setup() {
	myCanvas = createCanvas(1000,1000);
	context = myCanvas.drawingContext;

	//console.log(myCanvas.drawingContext);
	background(255);

	// Enter peer credentials provided by Kinectron 
	kinectron = new Kinectron();
	kinectron.makeConnection();

	kinectron.setRGBCallback(rgbCallback);
	kinectron.setDepthCallback(depthCallback);
	kinectron.setBodiesCallback(bodyCallback);

	// Set frames wanted from Kinectron 
	frames = ["color", "depth", "body"];
}

function draw() {

}

function keyPressed() {
	if (keyCode === ENTER) {
	 	kinectron.startMultiFrame(frames, multiFrameCallback);
	} 

	if (keyCode === UP_ARROW) {
	 	kinectron.startMultiFrame(frames);
	} 
 }

function rgbCallback(img) {
	loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0, 273.2, 660, 370);
  });

}

function depthCallback(img) {
	loadImage(img.src, function(loadedImage) {
    image(loadedImage, 330, 0, 330, 273.2);
  });
}

// function rawDepthCallback(data) {
// 	//console.log('raw', data);
// }

function bodyCallback(body) {

	//find tracked bodies
	for (var i = 0; i < body.length; i++) {
		if (body[i].tracked === true) {
			bodyTracked(body[i]);
		}
	}
}

function bodyTracked(body) {

	context.fillStyle = '#000000';
  context.fillRect(0, 0, 330, 273.2);

	//draw joints in tracked bodies 
  for(var jointType in body.joints) {
	  var joint = body.joints[jointType];
	  context.fillStyle = '#ff0000';
	  context.fillRect(joint.depthX * 330, joint.depthY * 273.2, 10, 10);  
	}
}

function multiFrameCallback(data) {
	console.log(data);
}
