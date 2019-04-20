class DrumOff extends Scene {
	constructor(w, h, a, ringoImg) {
		super(w, h, a);
    this.id = "drumOff";
    this.header = "Round 1";
    this.activeTimeline = false;
    this.timelinePos = 0;
    this.incrementScl = 250;
    this.increment = windowWidth/this.incrementScl;
    this.inputTime;
		this.showInfo = false;
		this.fadeIn = false;
		this.infoDist;
		// x, y, wScl, maxW, minW, key
    this.snare = new Drum(w, h, this.alpha, this.col*2.5, this.row*4.5, 8, 150, 65, "G");


		downloadBtn = createButton('download Result');
		downloadBtn.parent('downloadBtn')
		downloadBtn.mousePressed(download);
	}

	run() {
    stroke(255, this.alpha);
    line(this.col, this.row*6, this.col, this.row*6.5);
    line(this.col*7, this.row*6, this.col*7, this.row*6.5);
		push();
		noStroke();
		fill(12, 45, 75);
		ellipse(this.col*7, this.row, 50, 50);
		fill(255);
		textSize(20);
		text("i", this.col*7, this.row);
		pop();

    this.snare.show();

    if (this.activeTimeline) {
      this.runTimeline();
    }

		if (this.showInfo) {
			fill(12, 45, 75)
			rect(this.col*4, this.row*4, this.col*8 - 50, this.row*8 - 50);
			fill(255);
			text("Information on the project will be shown here", this.col*4, this.row*4);
		}

	}

  runTimeline() {
    this.inputTime = map(this.timelinePos, 0, this.col*6, 0, 5);
    push();
    rectMode(CORNER)
    rect(this.col, this.row*6, this.timelinePos += this.increment, 20);
    pop();
    if(this.timelinePos > this.col*6) {
      createSampleSequences();
      this.inputTime = 0;
      this.activeTimeline = false;
      this.timelinePos = 0;
      playRNN(event);
      DRUMS_INPUT.notes = [];
      // rnnPlayer.start(ns);
    }
  }

  addInputPitch(pitch) {
    inputPitches.push(pitch);
    //first input from keyPressed appears undefined (null)
    (this.inputTime == null) ? startInputs.push(0) : startInputs.push(this.inputTime);
    playTempSequence(pitch, this.inputTime);
  }

  addInputTime() {
    endInputs.push(this.inputTime);
  }

	/* Detects if mouse click is within Information icon ellipse button */
	displayInfo(x, y) {
		this.infoDist = dist(x, y, this.col*7, this.row);
		if(this.infoDist < 25) {
			this.showInfo = true;
		}
		console.log(this.infoDist);
	}

  transition() {
    // console.log(this.alpha);
      this.fadeIn ? this.alpha += 10
      : this.alpha -= 15;
      if (this.alpha < 0) {
        // activeScene.switchScene();
        this.fadeIn = true;
      };
      if (this.alpha > 255) {
        sceneTransition = false;
      }
  }

}

class Drum extends Scene {
	constructor(w, h, a, posX, posY, wScl, maxW, minW, key) {
		super(w, h, a);
		this.posX = posX;
		this.posY = posY;
		this.wScl = wScl;
		this.maxW = maxW;
		this.minW = minW;
		this.key = key;

    (windowWidth/this.wScl > this.maxW) ? this.drumRad = this.maxW
		: (windowWidth/this.wScl < this.minW) ? this.drumRad = this.minW
		: this.drumRad = windowWidth/this.wScl;

  }

  show() {
    fill(250, 215, 70, activeScene.alpha);
		noStroke();
    ellipse(this.posX, this.posY, this.drumRad, this.drumRad);
		fill(bgColor);
		textSize(64);
    text(this.key, this.posX, this.posY-10);


    noFill();
		stroke(12, 45, 75, activeScene.alpha);
		strokeWeight(2);
    ellipse(this.posX, this.posY, this.drumRad+20, this.drumRad+20);
  }

  hihat() {
    console.log("hihat!");
    // playTempSequence();
  }

  snare() {
    console.log("snare!");
    // playTempSequence();
  }

  kick() {
    console.log("kick!");
    // playTempSequence();
  }

  tom1() {
    console.log("tom1!");
    // playTempSequence();
  }

  tom2() {
    console.log("tom2!");
    // playTempSequence();
  }

  bass() {
    console.log("bass!");
    // playTempSequence();
  }

}
