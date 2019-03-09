////////////////// INDEX SCRIPT //////////////////

let scene1, scene2, scene3;
let scl = 8;
let w, h, col, row;

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

 /********************** SETUP **********************
  setup is called at the start of the application.
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

	/* (width, height, column, row, header, subheader) */
	scene1 = new Scene1(w,
									    h,
										  col,
										  row,
									 	  "ML DRUM-OFF",
										  "SELECT OPPONENT");
  // timeline = new Timeline()
	// { beginX: windowWidth/scl,
  //              endX: windowWidth/scl*7,
  //              beginY: windowHeight/scl*6,
  //              endY: windowHeight/scl*6.5,
  //              pos: 0,
  //              increment: windowWidth/incrementScl
  //            };
}

class Scene {
	constructor(w, h, col, row) {
		this.w = w;
		this.h = h;
		this.col = col;
		this.row = row;
		this.isActive = false;
	}

	display() {
		fill(255);
		text(this.title, this.col*4, this.row);
	}
}

class Scene1 extends Scene {
	constructor(w, h, col, row, header, subheader, isActive) {
		super(w, h, col, row, isActive);
		this.header = header;
		/* Header max size */
		(windowWidth/14 > 80) ? this.headerSize = 80 : this.headerSize = windowWidth/14;
		this.subheader = subheader;
	}

	display() {
		super.display();
		textSize(this.headerSize);
		text(this.header, this.col*4, this.row);
	}
}

function draw() {
  background(40);
	scene1.display();
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


	/* (width, height, column, row, header, subheader) */
	scene1 = new Scene1(w,
									    h,
										  col,
										  row,
									 	  "ML DRUM-OFF",
										  "SELECT OPPONENT");

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
