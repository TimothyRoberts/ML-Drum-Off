//These define the length of each round
let timelineActivated = false;
let acceptSequence = false;
let timeline;
let scl = 8;
let timelineIncrement;

//These define the input sequence attributes
let collectingInput = false;
let inputPitch;
let inputTime;
let inputStart;
let inputEnd;

//These store input details in arrays
let startInputs = [];
let endInputs = [];
let inputPitches = [];

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('canvasContainer');
  timeline = { beginX: windowWidth/scl,
               endX: windowWidth/scl*7,
               beginY: windowHeight/scl*6,
               endY: windowHeight/scl*6.5,
               pos: 0,
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
  if ((key == 'F') || (key == 'f')) {
    inputPitch = 42;

    //run input timeline
    if (collectingInput == false) {
      timelineActivated = true;
      collectingInput = true;

      //collect input details
      inputPitches.push(inputPitch);
      startInputs.push(0);
    } else {
      inputPitches.push(inputPitch);
      startInputs.push(inputTime);
    }
    // playRNN(event)

  }
}

function keyReleased() {
  if ((key == 'F') || (key == 'f')) {
    //run input timeline
    if (collectingInput) {
      //collect input details
      endInputs.push(inputTime);
    }
  }
}

function activateTimeline() {
  fill(255);
  stroke(255);
  inputTime = map(timeline.pos, 0, timeline.endX - timeline.beginX, 0, 5);
  console.log(inputTime);
  // console.log(timeline.pos);
  rect(timeline.beginX, timeline.beginY, timeline.pos += timeline.increment, 20);
  if(timeline.pos > timeline.endX - timeline.beginX ) {
    inputTime = 0;
    timeline.pos = 0;
    timelineActivated = false;
    collectingInput = false;
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
