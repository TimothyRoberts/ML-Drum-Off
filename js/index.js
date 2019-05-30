////////////////// INDEX SCRIPT //////////////////

let activeScene;
let sceneTransition = false;
let mouseCoordinates = [];
let w, h;
let h1font, h2font, pfont;
let logo, back, ringoIcon, dannyIcon, daveIcon;
let homeBtn, chooseBtn, downloadBtn;
let bgColor, bgColor2, currentBg;
let dannySelected, ringoSelected, daveSelected;
let dannySample, ringoSample, daveSample;
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
  back = loadImage('assets/images/back.png');
  ringoIcon = loadImage('assets/images/ringo.png');
  dannyIcon = loadImage('assets/images/dannyIcon.png');
  daveIcon = loadImage('assets/images/daveIcon.png');
  h1font = loadFont('assets/type/Poppins-Bold.ttf');
  h2font = loadFont('assets/type/Poppins-Regular.ttf');
  pfont = loadFont('assets/type/OpenSans-Regular.ttf');
  dannySample = loadSound('assets/samples/dannySample.mp3');
  ringoSample = loadSound('assets/samples/ringoSample.mp3');
  daveSample = loadSound('assets/samples/daveSample.mp3');
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
  bgColor2 = color(250, 215, 70);
  currentBg = bgColor;
  dannySample.setVolume(0.5);
  // dannySample.play();

  // width, height, alpha, logoImage
	activeScene = new Home(w, h, 255, logo, ringoIcon);
}

function draw() {
  background(currentBg);
  activeScene.run();

  push();
  fill(12, 45, 75);
  ellipse(activeScene.col*7.2, activeScene.row, 50, 50);
  fill(255);
  textFont(h2font);
  textSize(24)
  text("i", activeScene.col*7.2, activeScene.row-3)
  pop();

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
      } else if ((key == 'H') || (key == 'h')) {
        activeScene.activeTimeline = true;
        activeScene.addInputPitch(36);
        activeScene.kick.animateDrum = true;
        activeScene.kick.animating = true;
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
    console.log("transition");
    sceneTransition = true;
  }

  if(activeScene.id == "selectDrummer") {
    if((mouseX > activeScene.c2pos - 125 && mouseX < activeScene.c2pos + 125) && (mouseY > activeScene.row*6 - 30 && mouseY < activeScene.row*6.4 + 30)) {
      console.log("Ringo Starr Selected");
      ringoSelected = true;
      sceneTransition = true;
    } else if((mouseX > activeScene.c1pos - 125 && mouseX < activeScene.c1pos + 125) && (mouseY > activeScene.row*6 - 30 && mouseY < activeScene.row*6.4 + 30)) {
      console.log("Danny Kerry Selected");
      dannySelected = true;
      sceneTransition = true;
    } else if((mouseX > activeScene.c3pos - 125 && mouseX < activeScene.c3pos + 125) && (mouseY > activeScene.row*6 - 30 && mouseY < activeScene.row*6.4 + 30)) {
      console.log("Dave Grohl Selected");
      daveSelected = true;
      sceneTransition = true;
    } else if((mouseX > activeScene.c1pos - 125 && mouseX < activeScene.c1pos + 125) && (mouseY > activeScene.row*5.38 - 20 && mouseY < activeScene.row*5.38 + 20)) {
      dannySample.play();
    } else if((mouseX > activeScene.c2pos - 125 && mouseX < activeScene.c2pos + 125) && (mouseY > activeScene.row*5.38 - 20 && mouseY < activeScene.row*5.38 + 20)) {
      ringoSample.play();
    } else if((mouseX > activeScene.c3pos - 125 && mouseX < activeScene.c3pos + 125) && (mouseY > activeScene.row*5.38 - 20 && mouseY < activeScene.row*5.38 + 20)) {
      daveSample.play();
    }
    // else if((mouseX > activeScene.col*0.75 - 40 && mouseX < activeScene.col*0.75 + 40) && (mouseY > activeScene.row - 40 && mouseY < activeScene.row + 40)) {
    //   console.log("back to home");
    //   activeScene = new Home(w, h, 255, logo, ringoIcon);
    //   sceneTransition = true;
    //   }
  }

  //Drum hits
  if(activeScene.id == "drumOff") {
    if(activeScene.allowInput) {
      if((mouseX > activeScene.col*0.75 - 40 && mouseX < activeScene.col*0.75 + 40) && (mouseY > activeScene.row - 40 && mouseY < activeScene.row + 40)) {
      console.log("back to selection");
      activeScene = new SelectDrummer(w, h, 0, this.ringoIcon);
      sceneTransition = true;
    } else if((mouseX > activeScene.snare.posX - activeScene.snare.drumRad/2
               && mouseX < activeScene.snare.posX + activeScene.snare.drumRad/2)
               && (mouseY > activeScene.snare.posY
               && mouseY < activeScene.snare.posY + activeScene.snare.drumRad)) {
         activeScene.activeTimeline = true;
         activeScene.addInputPitch(32);
         activeScene.snare.animateDrum = true;
         activeScene.snare.animating = true;
         activeScene.addInputTime();
    } else if((mouseX > activeScene.hihat.posX - activeScene.hihat.drumRad/2
               && mouseX < activeScene.hihat.posX + activeScene.hihat.drumRad/2)
               && (mouseY > activeScene.hihat.posY
               && mouseY < activeScene.hihat.posY + activeScene.hihat.drumRad)) {
         activeScene.activeTimeline = true;
         activeScene.addInputPitch(42);
         activeScene.hihat.animateDrum = true;
         activeScene.hihat.animating = true;
         activeScene.addInputTime();
    } else if((mouseX > activeScene.tom1.posX - activeScene.tom1.drumRad/2
               && mouseX < activeScene.tom1.posX + activeScene.tom1.drumRad/2)
               && (mouseY > activeScene.tom1.posY
               && mouseY < activeScene.tom1.posY + activeScene.tom1.drumRad)) {
         activeScene.activeTimeline = true;
         activeScene.addInputPitch(50);
         activeScene.tom1.animateDrum = true;
         activeScene.tom1.animating = true;
         activeScene.addInputTime();
      } else if((mouseX > activeScene.tom2.posX - activeScene.tom2.drumRad/2
               && mouseX < activeScene.tom2.posX + activeScene.tom2.drumRad/2)
               && (mouseY > activeScene.tom2.posY
               && mouseY < activeScene.tom2.posY + activeScene.tom2.drumRad)) {
         activeScene.activeTimeline = true;
         activeScene.addInputPitch(48);
         activeScene.tom2.animateDrum = true;
         activeScene.tom2.animating = true;
         activeScene.addInputTime();
      } else if((mouseX > activeScene.bass.posX - activeScene.bass.drumRad/2
               && mouseX < activeScene.bass.posX + activeScene.bass.drumRad/2)
               && (mouseY > activeScene.bass.posY
               && mouseY < activeScene.bass.posY + activeScene.bass.drumRad)) {
         activeScene.activeTimeline = true;
         activeScene.addInputPitch(45);
         activeScene.bass.animateDrum = true;
         activeScene.bass.animating = true;
         activeScene.addInputTime();
      } else if((mouseX > activeScene.kick.posX - activeScene.kick.drumRad/2
               && mouseX < activeScene.kick.posX + activeScene.kick.drumRad/2)
               && (mouseY > activeScene.kick.posY
               && mouseY < activeScene.kick.posY + activeScene.kick.drumRad)) {
         activeScene.activeTimeline = true;
         activeScene.addInputPitch(36);
         activeScene.kick.animateDrum = true;
         activeScene.kick.animating = true;
         activeScene.addInputTime();
      }
    }
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
