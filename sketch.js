//These define the length of each round
let timelineActivated = false;
let acceptSequence = false;
let timeline;
let scl = 8;
let timelineIncrement;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('canvasContainer');
  timeline = { beginX: windowWidth/scl,
               endX: windowWidth/scl*7,
               beginY: windowHeight/scl*6,
               endY: windowHeight/scl*6.5,
               startPos: 0,
               increment: windowWidth/250
             };
}

function draw() {
  background(40);
  stroke(255);
  line(timeline.beginX, timeline.beginY, timeline.beginX, timeline.endY);
  line(timeline.endX, timeline.beginY, timeline.endX, timeline.endY);

  if(timelineActivated) {
    activateTimeline();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log("pressed");
    playRNN(event)
    timelineActivated = true;
  }
}

function activateTimeline() {
  fill(255);
  stroke(255);
  // console.log("draw");
  rect(timeline.beginX, timeline.beginY, timeline.startPos += timeline.increment, 20);
  if(timeline.startPos > timeline.endX - timeline.beginX ) {
    timeline.startPos = 0;
    timelineActivated = false;
  }
}


//Resizes canvas when window is resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  timeline = { beginX: windowWidth/scl,
               endX: windowWidth/scl*7,
               beginY: windowHeight/scl*6,
               endY: windowHeight/scl*6.5,
               increment: windowWidth/100
             };
}
