class DrumOff extends Scene {
	constructor(w, h, ringoImg) {
		super(w, h);
    this.id = "drumOff";
    this.header = "Round 1";
    this.activeTimeline = false;
    this.timelinePos = 0;
    this.incrementScl = 250;
    this.increment = windowWidth/this.incrementScl;
    this.inputTime;
		this.showInfo = false;
		this.infoDist;

    this.drumkit = new Drumkit(this.w, this.h, this.col, this.row, this.scl);


		downloadBtn = createButton('download Result');
		downloadBtn.parent('downloadBtn')
		downloadBtn.mousePressed(download);
	}

	run() {
    stroke(255);
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

    this.drumkit.show();

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

}

class Drumkit {
	constructor(w, h, col, row, scl) {
		this.w = w;
		this.h = h;
    this.scl = scl;
		this.col = windowWidth / this.scl;
		this.row = this.h / this.scl;

    (windowWidth/10 > 120) ? this.hihatRad = 120
		: (windowWidth/10 < 50) ? this.hihatRad = 50
		: this.hihatRad = windowWidth/10;

    (windowWidth/8 > 150) ? this.snareRad = 150
		: (windowWidth/8 < 65) ? this.snareRad = 65
		: this.snareRad = windowWidth/8;
    // this.snareRad = 125;

    (windowWidth/4 > 300) ? this.kickW = 300
		: (windowWidth/4 < 125) ? this.kickW = 125
		: this.kickW = windowWidth/4;

    (windowWidth/6 > 200) ? this.bassRad = 200
		: (windowWidth/6 < 125) ? this.bassRad = 125
		: this.bassRad = windowWidth/6;
  }

  show() {
    noFill();
    stroke(255);
    //hihat
    ellipse(this.col*1.5, this.row*3.5, this.hihatRad, this.hihatRad);
    text("F", this.col*1.5, this.row*3.5);
    //snare
    ellipse(this.col*2.5, this.row*4.5, this.snareRad, this.snareRad);
    text("J", this.col*2.5, this.row*4.5);
    //kick
    rect(this.col*4, this.row*5.5, this.kickW, 175);
    text("K", this.col*4, this.row*5.5);
    //tom1
    ellipse(this.col*3.5, this.row*3, this.hihatRad, this.hihatRad);
    text("T", this.col*3.5, this.row*3);
    //tom1
    ellipse(this.col*4.5, this.row*3, this.hihatRad, this.hihatRad);
    text("Y", this.col*4.5, this.row*3);
    //bass
    ellipse(this.col*6, this.row*4.5, this.bassRad, this.bassRad);
    text("L", this.col*6, this.row*4.5);
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
