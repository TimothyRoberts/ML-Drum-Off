////////////////// INDEX SCRIPT //////////////////

let scene1, scene2, scene3;
let scl = 8;
let w, h, col, row;
let ringoImg;
let homeBtn, chooseBtn;

//These define the length of each round
// let timelineActivated = false;
// let acceptSequence = false;
// let timeline;
// let scl = 8;
// let timelineIncrement;
// let incrementScl = 250;
//
// //These define the input sequence attributes
// let collectingInput = false;
// let inputPitch;
// let inputTime;
// let inputStart;
// let inputEnd;
//
// //These store input details in arrays
// let startInputs = [];
// let endInputs = [];
// let inputPitches = [];
//
// let DRUMS_INPUT;

/********************* PRELOAD *********************
 Preload loads the assets of the application
***************************************************/

function preload() {
  ringoImg = loadImage('assets/ringo_icon.png');
}

 /********************** SETUP **********************
  Setup is called at the start of the application.
	sets the canvas to the dimensions of the user's
	device. and activates the home screen (scene1).
 ***************************************************/


function setup() {

	(windowHeight < 600) ? h = 600 : h = windowHeight;
	w = windowWidth;
	canvas = createCanvas(windowWidth, h);
	col = windowWidth/scl;
	row = h/scl;

	canvas.parent('canvasContainer');
	textAlign(CENTER, CENTER);
	imageMode(CENTER);

	/* (width, height, column, row, isActive, header, subheader, ringoImg) */
	scene1 = new Scene1(w, h, col, row, false, "ML DRUM-OFF", "SELECT OPPONENT", ringoImg);
	scene2 = new Scene2(w, h, col, row, true, "ROUND 1");

	// chooseBtn = createButton('choose drummer');
	// chooseBtn.parent('chooseBtn')
  // chooseBtn.position(col*4, row*7);
	// chooseBtn.mousePressed(activateScene2);

	homeBtn = createButton('Home');
	homeBtn.parent('homeBtn')
  homeBtn.position(col, row);
	homeBtn.mousePressed(activateScene1);
}

function activateScene2() {
	scene1.isActive = false;
	chooseBtn.hide();
}

function activateScene1() {
	scene2.isActive = false;
	scene1.isActive = true;
	chooseBtn.show();
}


function draw() {
  background(40);
	if (scene1.isActive) {
    scene1.display();
  } else if (scene2.isActive) {
    scene2.display();
  }


  if (scene2.activeTimeline) {scene2.activateTimeline();}

  // if(timelineActivated) {
  //   activateTimeline();
  // }
}

function keyPressed() {
  scene2.isActive ? scene2.activeTimeline = true : console.log("");
}

// function activateTimeline() {
//   fill(255);
//   stroke(255);
//   inputTime = map(timeline.pos, 0, timeline.endX - timeline.beginX, 0, 5);
//   // console.log(inputTime);
//   // console.log(timeline.pos);
//   rect(timeline.beginX, timeline.beginY, timeline.pos += timeline.increment, 20);
//
//   //When the input timeline ends
//   if(timeline.pos > timeline.endX - timeline.beginX ) {
//     createSampleSequences();
//
//
//     inputTime = 0;
//     timeline.pos = 0;
//     timelineActivated = false;
//     collectingInput = false;
//
//     playRNN(event);
//
//   }
// }


// function createSampleSequences() {
//   DRUMS_INPUT = {
//   ticksPerQuarter: 220,
//   totalTime: 5,
//   timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
//   tempos: [{time: 0, qpm: 120}],
//   notes: []
//   }
//
//   for(let i = 0; i < startInputs.length; i++) {
//     DRUMS_INPUT.notes.push({
//       startTime: startInputs[i], endTime: endInputs[i], pitch: inputPitches[i], velocity: 100, isDrum: true}, {
//       instrument: 10,
//       startTime: startInputs[i],
//       endTime: endInputs[i],
//       pitch: inputPitches[i],
//       velocity: 100,
//       isDrum: true
//     })
//   }
//
// }


//Resizes canvas when window is resized
function windowResized() {

	(windowHeight < 600) ? h = 600 : h = windowHeight;

	resizeCanvas(windowWidth, h);

	col = windowWidth/scl;
	row = h/scl;

  chooseBtn.position(col*4, row*7);



		/* (width, height, column, row, isActive, header, subheader, ringoImg) */
		scene1 = new Scene1(w, h, col, row, true, "ML DRUM-OFF", "SELECT OPPONENT", ringoImg);

 //  timeline = { beginX: windowWidth/scl,
 //               endX: windowWidth/scl*7,
 //               beginY: windowHeight/scl*6,
 //               endY: windowHeight/scl*6.5,
 //               increment: windowWidth/incrementScl
 //             };
 //
 //
 // inputTime = 0;
 // timeline.pos = 0;
 // timelineActivated = false;
 // collectingInput = false;
}

// function keyPressed() {
//   //HI-HAT
//   if ((key == 'F') || (key == 'f')) {
//     inputPitch = 42;
//     //if timeline is not active, start timeline
//     if (collectingInput == false) {
//       timelineActivated = true;
//       collectingInput = true;
//       //collect input details
//       inputPitches.push(inputPitch);
//       startInputs.push(0);
//       console.log("Hi-Hat!");
//     } else {
//       inputPitches.push(inputPitch);
//       startInputs.push(inputTime);
//       console.log("Hi-Hat!");
//     }
//   }
//
//     //SNARE
//     if ((key == 'G') || (key == 'g')) {
//       inputPitch = 36;
//       //if timeline is not active, start timeline
//       if (collectingInput == false) {
//         timelineActivated = true;
//         collectingInput = true;
//         //collect input details
//         inputPitches.push(inputPitch);
//         startInputs.push(0);
//         console.log("Snare!");
//       } else {
//         inputPitches.push(inputPitch);
//         startInputs.push(inputTime);
//         console.log("Snare!");
//       }
//     }
// }
//
// function keyReleased() {
//   if ((key == 'F') || (key == 'f')) {
//     //run input timeline
//     if (collectingInput) {
//       //collect input details
//       endInputs.push(inputTime);
//     }
//   }
//
//   if ((key == 'G') || (key == 'g')) {
//     //run input timeline
//     if (collectingInput) {
//       //collect input details
//       endInputs.push(inputTime);
//     }
//   }
// }
