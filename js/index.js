////////////////// INDEX SCRIPT //////////////////

let activeScene;
let sceneTransition = false;
let mouseCoordinates = [];
let w, h;
let h1font, h2font, pfont;
let logo, ringoIcon;
let homeBtn, chooseBtn, downloadBtn;
let bgColor;
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
  logo = loadImage('assets/images/logo.png');
  ringoIcon = loadImage('assets/images/ringo.png');
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

	(windowHeight < 650) ? h = 650 : h = windowHeight;
	w = windowWidth;
	canvas = createCanvas(windowWidth, h);

	canvas.parent('canvasContainer');
	textAlign(CENTER, CENTER);
	imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  bgColor = color(250, 75, 75);

  // width, height, alpha, logoImage
	activeScene = new Home(w, h, 255, logo, ringoIcon);
}

function draw() {
  background(bgColor);
  activeScene.run();
  if (sceneTransition) {activeScene.transition()};
}


function keyPressed() {
  if(activeScene.id == "drumOff") {
    if(activeScene.allowInput) {
      if ((key == 'F') || (key == 'f')) {
        activeScene.activeTimeline = true;
        activeScene.addInputPitch(42);
        activeScene.hihat.animateDrum = true;
        activeScene.hihat.animating = true;
      } else if ((key == 'G') || (key == 'g')) {
        activeScene.activeTimeline = true;
        activeScene.addInputPitch(32);
        activeScene.snare.animateDrum = true;
        activeScene.snare.animating = true;
        // activeScene.drumkit.snare();
      } else if ((key == 'H') || (key == 'h')) {
        activeScene.activeTimeline = true;
        activeScene.addInputPitch(36);
        activeScene.kick.animateDrum = true;
        activeScene.kick.animating = true;
      // : console.log("no");
      } else if ((key == 'T') || (key == 't')) {
        activeScene.activeTimeline = true;
        activeScene.addInputPitch(50);
        activeScene.tom1.animateDrum = true;
        activeScene.tom1.animating = true;
      } else if ((key == 'Y') || (key == 'y')) {
          activeScene.activeTimeline = true;
          activeScene.addInputPitch(48);
          activeScene.tom2.animateDrum = true;
          activeScene.tom2.animating = true;
      } else if ((key == 'J') || (key == 'j')) {
          activeScene.activeTimeline = true;
          activeScene.addInputPitch(45);
          activeScene.bass.animateDrum = true;
          activeScene.bass.animating = true;
      }
    }
  }
}

function keyReleased() {
  if(activeScene.id == "drumOff") {
    if (activeScene.activeTimeline) {
      if ((key == 'F') || (key == 'f')) {activeScene.addInputTime()}
      else if ((key == 'G') || (key == 'g')) {activeScene.addInputTime()}
      else if ((key == 'H') || (key == 'h')) {activeScene.addInputTime()}
      else if ((key == 'T') || (key == 't')) {activeScene.addInputTime()}
      else if ((key == 'Y') || (key == 'y')) {activeScene.addInputTime()}
      else if ((key == 'J') || (key == 'j')) {activeScene.addInputTime()}

    }
  }
}

function mousePressed() {
  if(activeScene.id == "home") {
    // activeScene.switchScene(mouseX, mouseY);
    console.log("transition");
    sceneTransition = true;
  }

  if(activeScene.id == "selectDrummer") {
    // sceneTransition = true;
    if((mouseX > activeScene.c2pos - 125 && mouseX < activeScene.c2pos + 125) && (mouseY > activeScene.row*6.4 - 30 && mouseY < activeScene.row*6.4 + 30)) {
      console.log("Ringo Starr Selected");
      sceneTransition = true;
    }
  }

  if(activeScene.id == "drumOff") {
    activeScene.displayInfo(mouseX, mouseY);
  }
}

function storeMouseCoordinates(x, y) {
  mouseCoordinates = [];
  mouseCoordinates.push(x);
  mouseCoordinates.push(y);
}

//Resizes canvas when window is resized
function windowResized() {
	(windowHeight < 650) ? h = 650 : h = windowHeight;
	resizeCanvas(windowWidth, h);
  console.log(h);

  // (activeScene.id === "home") ? activeScene = new Home(w, h, logo)
  // : (activeScene.id === "selectDrummer") ? activeScene = new SelectDrummer(w, h, logo);

  if(activeScene.id == "home") {
    activeScene = new Home(w, h, activeScene.alpha, logo);
  }
  else if (activeScene.id == "selectDrummer") {activeScene = new SelectDrummer(w, h, ringoIcon);}
  else if (activeScene.id == "drumOff") {activeScene = new DrumOff(w, h, logo);}
}
