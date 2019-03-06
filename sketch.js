//These define the length of each round
let launchTimeline = false;
let timelineBeginX;
let timelineEndX;
let timelineY;
let timelineIncrement;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('canvasContainer');
  timelineBeginX = windowWidth/8;
  timelineEndX = windowWidth/8 * 7;
  timelineY = windowHeight/8 * 6;

}

function draw() {
  background(40);
  stroke(255);
  line(timelineBeginX, timelineY, timelineBeginX, timelineY - 20);
  line(timelineEndX, timelineY, timelineEndX, timelineY - 20);

  if(launchTimeline) {
    triggerTimeline();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log("pressed");
    playRNN(event)
    launchTimeline = true;
  }
}

function triggerTimeline() {
  console.log("triggered");
  fill(255);
  stroke(255);
  rect(timelineBeginX, 520, 50, 20);
}


//Resizes canvas when window is resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  timelineBeginX = windowWidth/8;
  timelineEndX = windowWidth/8 * 7;
}
