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

    this.drumkit = new Drumkit(this.w, this.h, this.col, this.row, this.scl);

	}

	run() {
		fill(255);
		textSize(this.headerSize);
		text(this.header, this.col*4, this.row);
    stroke(255);
    line(this.col, this.row*6, this.col, this.row*6.5);
    line(this.col*7, this.row*6, this.col*7, this.row*6.5);

    this.drumkit.show();

    if (this.activeTimeline) {
      this.runTimeline();
    }

	}

  runTimeline() {
    this.inputTime = map(this.timelinePos, 0, this.col*6, 0, 5);
    rect(this.col, this.row*6, this.timelinePos += this.increment, 20);
    if(this.timelinePos > this.col*6) {
      createSampleSequences();
      //     inputTime = 0;
      //     timeline.pos = 0;
      //     timelineActivated = false;
      //     collectingInput = false;
      //
      //     playRNN(event);
      this.inputTime = 0;
      this.activeTimeline = false;
      this.timelinePos = 0;
      playRNN(event);
    }
  }

  addInputPitch(pitch) {
    inputPitches.push(pitch);
    //first input from keyPressed appears undefined (null)
    (this.inputTime == null) ? startInputs.push(0) : startInputs.push(this.inputTime);
  }

  addInputTime() {
    endInputs.push(this.inputTime);
  }
}

class Drumkit {
	constructor(w, h, col, row, scl) {
		this.w = w;
		this.h = h;
    this.scl = scl;
		this.col = windowWidth / this.scl;
		this.row = this.h / this.scl;

    this.hihatRad = 100;
  }

  show() {
    noFill();
    stroke(255);
    ellipse(this.col*3, this.row*4, this.hihatRad, this.hihatRad);
  }

  hihat() {
    console.log("hihat!");
  }

}
