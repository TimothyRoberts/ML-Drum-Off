////////////////// INDEX SCRIPT //////////////////

let activeScene;
let w, h;
let h1font, h2font, pfont;
let ringoIcon;
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
  ringoIcon = loadImage('assets/images/ringoStarr.png');
  h1font = loadFont('assets/type/Poppins-Bold.ttf');
  h2font = loadFont('assets/type/Poppins-Regular.ttf');
  pfont = loadFont('assets/type/OpenSans-Regular.ttf');
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
  rectMode(CENTER);
  ellipseMode(CENTER);

	/* (width, height, column, row, isActive, header, subheader, ringoImg) */
	activeScene = new Home(w, h, ringoIcon);
  // activeScene.setup();
	// scene2 = new Scene2(w, h, col, row, true, "ROUND 1");


	// homeBtn = createButton('Home');
	// homeBtn.parent('homeBtn')
  // homeBtn.position(col, row);
	// homeBtn.mousePressed(activateScene1);
}

function draw() {
  // background(35, 30, 30);
  background(240, 85, 85);
  activeScene.run();
}


function keyPressed() {
  if(activeScene.id == "drumOff") {
    if ((key == 'F') || (key == 'f')) {
      activeScene.activeTimeline = true;
      activeScene.addInputPitch(42);
      activeScene.drumkit.hihat();
    } else if ((key == 'J') || (key == 'j')) {
      activeScene.activeTimeline = true;
      activeScene.addInputPitch(32);
      activeScene.drumkit.snare();
    } else if ((key == 'K') || (key == 'k')) {
      activeScene.activeTimeline = true;
      activeScene.addInputPitch(36);
      activeScene.drumkit.kick();
    // : console.log("no");
    } else if ((key == 'T') || (key == 't')) {
      activeScene.activeTimeline = true;
      activeScene.addInputPitch(50);
      activeScene.drumkit.tom1();
    } else if ((key == 'Y') || (key == 'y')) {
        activeScene.activeTimeline = true;
        activeScene.addInputPitch(48);
        activeScene.drumkit.tom2();
    } else if ((key == 'L') || (key == 'l')) {
        activeScene.activeTimeline = true;
        activeScene.addInputPitch(45);
        activeScene.drumkit.bass();
    }
  }
}

function keyReleased() {
  if(activeScene.id == "drumOff") {
    if (activeScene.activeTimeline) {
      if ((key == 'F') || (key == 'f')) {activeScene.addInputTime()}
      else if ((key == 'J') || (key == 'j')) {activeScene.addInputTime()}
      else if ((key == 'K') || (key == 'k')) {activeScene.addInputTime()}
      else if ((key == 'T') || (key == 't')) {activeScene.addInputTime()}
      else if ((key == 'Y') || (key == 'y')) {activeScene.addInputTime()}

    }
  }
}

function mousePressed() {
  if(activeScene.id == "home") {
    activeScene.switchScene(mouseX, mouseY);
  }
}

//Resizes canvas when window is resized
function windowResized() {

	(windowHeight < 600) ? h = 600 : h = windowHeight;
	resizeCanvas(windowWidth, h);

  if(activeScene.id == "home") {
    activeScene = new Home(w, h, ringoIcon);
  } else {activeScene = new DrumOff(w, h, ringoIcon);}

	// col = windowWidth/scl;
	// row = h/scl;

  // chooseBtn.position(col*4, row*7);



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
