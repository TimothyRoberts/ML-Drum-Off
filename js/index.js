////////////////// INDEX SCRIPT //////////////////

let activeScene;
let w, h;
let ringoImg;
let homeBtn, chooseBtn;
let DRUMS_INPUT;

// //These define the input sequence attributes
// let collectingInput = false;
let inputPitch;
let inputTime;
let inputStart;
let inputEnd;
//
// //These store input details in arrays
let startInputs = [];
let endInputs = [];
let inputPitches = [];
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

	canvas.parent('canvasContainer');
	textAlign(CENTER, CENTER);
	imageMode(CENTER);

	/* (width, height, column, row, isActive, header, subheader, ringoImg) */
	activeScene = new DrumOff(w, h, ringoImg);
  // activeScene.setup();
	// scene2 = new Scene2(w, h, col, row, true, "ROUND 1");


	// homeBtn = createButton('Home');
	// homeBtn.parent('homeBtn')
  // homeBtn.position(col, row);
	// homeBtn.mousePressed(activateScene1);
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
  activeScene.run();
	// if (scene1.isActive) {
  //   scene1.display();
  // } else if (scene2.isActive) {
  //   scene2.display();
  //   scene2.drumkit.show();
  // }


  // if (scene2.activeTimeline) {scene2.activateTimeline();}

  // if(timelineActivated) {
  //   activateTimeline();
  // }
}


function keyPressed() {
  if(activeScene.id == "drumOff") {
    activeScene.activeTimeline = true;
    ((key == 'F') || (key == 'f')) ? activeScene.addInputPitch(42) //pitch
    : console.log("no");
  }
}

function keyReleased() {
  if(activeScene.id == "drumOff") {
    if (activeScene.activeTimeline) {
      ((key == 'F') || (key == 'f')) ? activeScene.addInputTime() //pitch
      : console.log("no");
    }

  }

}
//   if (scene2.isActive == true && scene2.activeTimeline == false) {
//     scene2.activeTimeline = true;
//   }
//
//   if (scene2.activeTimeline) {
//     ((key == 'F') || (key == 'f')) ? scene2.drumkit.hihat()
//     : console.log("no");
//   }
//
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



//Resizes canvas when window is resized
function windowResized() {

	(windowHeight < 600) ? h = 600 : h = windowHeight;

	resizeCanvas(windowWidth, h);

	col = windowWidth/scl;
	row = h/scl;

  chooseBtn.position(col*4, row*7);



		/* (width, height, column, row, isActive, header, subheader, ringoImg) */
		// scene1 = new Scene1(w, h, col, row, true, "ML DRUM-OFF", "SELECT OPPONENT", ringoImg);

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
