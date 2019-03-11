
class Scene2 extends Scene {
	constructor(w, h, col, row, isActive, header, ringoImg) {
		super(w, h, col, row);
		this.isActive = isActive;
    this.activeTimeline = false;
		/* Text/Image max and min size */
		this.header = header;
		(windowWidth/15 > 80) ? this.headerSize = 80
		: (windowWidth/15 < 40) ? this.headerSize = 40
		: this.headerSize = windowWidth/15;

    this.timelinePos = 0;
    this.incrementScl = 250;
    this.increment = windowWidth/this.incrementScl;
    this.inputTime;
    this.startInputs = [];
    this.endInputs = [];
    this.pitchInputs = [];
    this.drumkit = new Drumkit(w, h, col, row, true);

	}

	display() {

		fill(255);
		textSize(this.headerSize);
		text(this.header, this.col*4, this.row);
    stroke(255);
    line(this.col, this.row*6, this.col, this.row*6.5);
    line(this.col*7, this.row*6, this.col*7, this.row*6.5);

	}

  activateTimeline() {
    // this.inputTime = map()
    rect(this.col, this.row*6, this.timelinePos += this.increment, 20);
    if(this.timelinePos > this.col*6) {
      this.activeTimeline = false;
      this.timelinePos = 0;
    }
  }

}

class Drumkit extends Scene {
	constructor(w, h, col, row, isActive) {
		super(w, h, col, row, isActive);
    this.hihatRad = 100;
  }

  show() {
    noFill();
    stroke(255);
    ellipse(col*3, row*4, this.hihatRad, this.hihatRad);
  }

  hihat() {
    console.log("hihat!");
  }

}
