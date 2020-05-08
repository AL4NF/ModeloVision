let mobilenet;
let classifier;
let video;
let label = '';
let ukeButton;
let whistleButton;
let trainButton;


function modelReady(){
	console.log("Model is ready!");
	// mobilenet.predict(gotResults);
}
function videoReady(){
	console.log("Video is ready!");
}

function gotResults(error, results) {
	if(error){
		console.error(error);
	}else{
		// console.log(results);
		label = results[0].label;
		// let probability = results[0].confidence;
		classifier.classify(gotResults);
	}
}

function whileTraining(loss){
  if(loss == null){
    console.log("Training Complete");
    classifier.classify(gotResults)
  }else{
    console.log(loss);
  }
}

function setup() {
	createCanvas(600, 550);
	video = createCapture(VIDEO);
	video.hide();
	background(0);
  //cambiaremos esta linea para basarnos en nuestro propio entrenamiento
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  ukeButton = createButton('Sprite');
  ukeButton.mousePressed(function(){
    classifier.addImage('sprite');
  });
  whistleButton = createButton('Fanta');
  whistleButton.mousePressed(function(){
    classifier.addImage('Fanta');
  });
  trainButton = createButton('train');
  trainButton.mousePressed(function(){
    classifier.train(whileTraining);
  });
  saveButton = createButton('save');
  saveButton.mousePressed(function(){
    classifier.save();
  });
}

function draw(){
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(label, 10, height -20);
}
