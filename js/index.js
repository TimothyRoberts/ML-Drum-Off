////////////////// INDEX SCRIPT //////////////////

let activeScene;
let w, h;
let ringoImg;
let homeBtn, chooseBtn;
let DRUMS_INPUT;
let TEMPORARY_INPUT;

// //These define the input sequence attributes
let inputPitch;
let inputTime;
let inputStart;
let inputEnd;

// //These store input details in arrays
let startInputs = [];
let endInputs = [];
let inputPitches = [];

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
}


function keyPressed() {
  if(activeScene.id == "drumOff") {
    activeScene.activeTimeline = true;
    if ((key == 'F') || (key == 'f')) {
      activeScene.addInputPitch(42);
      activeScene.drumkit.hihat();
    } //pitch
    // : console.log("no");
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
