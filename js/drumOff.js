class DrumOff extends Scene {
	constructor(w, h, a, icon) {
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
		this.iconAlpha = 0;
		this.icon;
		this.infoDist;
		this.allowInput = true;
		this.modelSet = true;
		tint(255);

		if(ringoSelected) {this.icon = ringoIcon}
		else if(dannySelected) {this.icon = dannyIcon}
		else if(daveSelected) {this.icon = daveIcon}
		// x, y, wScl, maxW, minW, key
		this.snare = new Drum(w, h, this.alpha, this.col*2.7, this.row*3.8, 9, 150, 65, "G");
    this.hihat = new Drum(w, h, this.alpha, this.col*1.8, this.row*3, 11, 110, 45, "F");
    this.tom1 = new Drum(w, h, this.alpha, this.col*3.5, this.row*2.7, 12, 100, 40, "T");
    this.tom2 = new Drum(w, h, this.alpha, this.col*4.5, this.row*2.7, 11, 110, 45, "Y");
    this.bass = new Drum(w, h, this.alpha, this.col*5.7, this.row*3.7, 7, 180, 80, "J");
    this.kick = new Drum(w, h, this.alpha, this.col*4, this.row*5, 4, 240, 130, "H");

		downloadBtn = createButton('download Result');
		downloadBtn.parent('downloadBtn')
		downloadBtn.mousePressed(download);

		this.setModel();

	}


	run() {

		image(back, this.col*0.75, this.row, 80, 80);

		fill(bgColor2);
		// loadFont(h1font);
		textSize(28)
		text("Use the keyboard to input sequence", this.col*4, this.row);

    this.snare.show();
		this.hihat.show();
		this.tom1.show();
		this.tom2.show();
		this.bass.show();
		this.kick.show();

		if(this.hihat.animating) {this.hihat.animate()}
		if(this.snare.animating) {this.snare.animate()}
		if(this.tom1.animating) {this.tom1.animate()}
		if(this.tom2.animating) {this.tom2.animate()}
		if(this.bass.animating) {this.bass.animate()}
		if(this.kick.animating) {this.kick.animate()}

    if (this.activeTimeline) {
      this.runTimeline();
    }




	  if(rnnPlayer.getPlayState() == "started") {
			activeScene.allowInput = false;
			activeScene.alpha -= 5;
			if (activeScene.alpha <= 120) {
				image(this.icon, this.col*4, this.row*4, 150, 150);
				activeScene.alpha = 120;
			}
		} else if (rnnPlayer.getPlayState() == "stopped") {
	  	activeScene.allowInput = true;
			if (activeScene.alpha > 255) {activeScene.alpha = 255}
			else {activeScene.alpha += 5;}
		}
	}

//ERROR
	setModel() {
		if (dannySelected) {
		  checkpointURL = "dannyModel";
			this.modelSet = false;
		}
	 // if (daveSelected) {
		// 	checkpointURL = "daveModel";
		// 	this.modelSet = false;
		// }
	}

  runTimeline() {
    this.inputTime = map(this.timelinePos, 0, this.col*6, 0, 5);
    push();
    rectMode(CORNER)
		stroke(bgColor2);
		line(this.col, this.row*7-10, this.col, this.row*7+30);
		line(this.col*7, this.row*7-10, this.col*7, this.row*7+30);
    rect(this.col, this.row*7, this.timelinePos += this.increment, 20);
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
	constructor(w, h, a, posX, posY, wScl, maxW, minW, key, isKick) {
		super(w, h, a);
		this.posX = posX;
		this.posY = posY;
		this.wScl = wScl;
		this.maxW = maxW;
		this.minW = minW;
		this.key = key;
		this.isKick = isKick;
		this.animateDrum = false;
		this.animating = false;

    (windowWidth/this.wScl > this.maxW) ? this.drumRad = this.maxW
		: (windowWidth/this.wScl < this.minW) ? this.drumRad = this.minW
		: this.drumRad = windowWidth/this.wScl;
		this.movableDrumRad = this.drumRad;

  }

  show() {

		push();
		translate(this.col*0.15, this.row*0.5)
    fill(lerpColor(bgColor, bgColor2, 0.2));
		stroke(12, 45, 75, activeScene.alpha);
		strokeWeight(2);
    ellipse(this.posX, this.posY, this.movableDrumRad+20, this.movableDrumRad+20);

		fill(250, 215, 70, activeScene.alpha);
		noStroke();
		if (this.isKick) {
			rect(this.posX, this.posY, this.movableDrumRad, this.movableDrumRad);
		} else {
			ellipse(this.posX, this.posY, this.movableDrumRad, this.movableDrumRad);
		}

		fill(bgColor);
		textSize(map(this.drumRad, this.minW, this.maxW, this.minW*0.5, this.maxW*0.7));
    text(this.key, this.posX, this.posY-15);
		pop();

  }

	animate() {
		if(this.animating) {
		if(this.animateDrum) {
			this.movableDrumRad *= 1.05;
		} else {this.movableDrumRad *= 0.95;}

		if(this.movableDrumRad > this.drumRad*1.5) {this.animateDrum = false}
		if(this.movableDrumRad < this.drumRad) {this.movableDrumRad = this.drumRad; this.animating = false}

		}
	}

}
