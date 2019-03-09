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
	scene1 = new Scene1(w, h, col, row, true, "ML DRUM-OFF", "SELECT OPPONENT", ringoImg);
	scene2 = new Scene2(w, h, col, row, false, "ROUND 1");
  // timeline = new Timeline()
	// { beginX: windowWidth/scl,
  //              endX: windowWidth/scl*7,
  //              beginY: windowHeight/scl*6,
  //              endY: windowHeight/scl*6.5,
  //              pos: 0,
  //              increment: windowWidth/incrementScl
  //            };

	chooseBtn = createButton('choose drummer');
	chooseBtn.parent('chooseBtn')
  chooseBtn.position(col*4, row*7);
	chooseBtn.mousePressed(activateScene2);

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

class Scene2 extends Scene {
	constructor(w, h, col, row, isActive, header, ringoImg) {
		super(w, h, col, row);
		this.isActive = isActive;
		/* Text/Image max and min size */
		this.header = header;
		(windowWidth/15 > 80) ? this.headerSize = 80
		: (windowWidth/15 < 40) ? this.headerSize = 40
		: this.headerSize = windowWidth/15;
	}

	display() {

		fill(255);
		textSize(this.headerSize);
		text(this.header, this.col*4, this.row);

	}
}

function draw() {
  background(40);
	scene1.isActive ? scene1.display()
	: scene2.display();

  // stroke(255);
  // line(timeline.beginX, timeline.beginY, timeline.beginX, timeline.endY);
  // line(timeline.endX, timeline.beginY, timeline.endX, timeline.endY);
	//
  // if(timelineActivated) {
  //   activateTimeline();
  // }
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
