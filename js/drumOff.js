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
		this.infoDist;
		this.allowInput = true;
		this.yellowBg = true;
		this.lerpVal = 0;
		// x, y, wScl, maxW, minW, key
		this.snare = new Drum(w, h, this.alpha, this.col*2.5, this.row*4.5, 8, 150, 65, "G");
    this.hihat = new Drum(w, h, this.alpha, this.col*1.5, this.row*3.7, 10, 120, 50, "F");
    this.tom1 = new Drum(w, h, this.alpha, this.col*3.5, this.row*3.4, 12, 100, 40, "T");
    this.tom2 = new Drum(w, h, this.alpha, this.col*4.5, this.row*3.4, 11, 110, 45, "Y");
    this.bass = new Drum(w, h, this.alpha, this.col*5.8, this.row*4.3, 6, 200, 100, "J");
    this.kick = new Drum(w, h, this.alpha, this.col*4, this.row*5.5, 4, 240, 130, "H");

		downloadBtn = createButton('download Result');
		downloadBtn.parent('downloadBtn')
		downloadBtn.mousePressed(download);
	}


	run() {
		// for(var i = 0, i < 1, i+= 0.05) {
		// console.log(this.yellowBg);
		if (this.yellowBg) {
			this.changeBg();
		}

		// }
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
		// console.log(this.allowInput);

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

		if (this.showInfo) {
			fill(12, 45, 75)
			rect(this.col*4, this.row*4, this.col*8 - 50, this.row*8 - 50);
			fill(255);
			text("Information on the project will be shown here", this.col*4, this.row*4);
		}


		tint(255, this.iconAlpha);
		image(ringoIcon, this.col*4, this.row*4, 150, 150);


	  if(rnnPlayer.getPlayState() == "started") {
			activeScene.allowInput = false;
			activeScene.alpha -= 5;
			if (activeScene.alpha < 120) {activeScene.alpha = 120}
			this.iconAlpha += 10;
			if (this.iconAlpha > 255) {this.iconAlpha = 255}
		}
	  else if (rnnPlayer.getPlayState() == "stopped") {
			// setTimeout(function(){ console.log("timeout!");; }, 500);
	  	activeScene.allowInput = true;
			activeScene.alpha += 5;
			if (activeScene.alpha > 255) {activeScene.alpha = 255}
			this.iconAlpha -=10;
			if (this.iconAlpha < 0) {this.iconAlpha = 0}
		}

	}

	changeBg() {
		if(this.lerpVal < 1) {
			console.log(currentBg);
			currentBg = lerpColor(bgColor, bgColor2, this.lerpVal);
			this.lerpVal += 0.05;
			console.log("changed");
		} else {this.yellowBg = false;}
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

    fill(lerpColor(bgColor, bgColor2, 0.2), activeScene.alpha);
		stroke(12, 45, 75, activeScene.alpha);
		strokeWeight(2);
    ellipse(this.posX, this.posY, this.movableDrumRad+20, this.movableDrumRad+20);

		fill(bgColor, activeScene.alpha);
		noStroke();
		if (this.isKick) {
			rect(this.posX, this.posY, this.movableDrumRad, this.movableDrumRad);
		} else {
			ellipse(this.posX, this.posY, this.movableDrumRad, this.movableDrumRad);
		}

		fill(lerpColor(bgColor2, bgColor, 0.1), activeScene.alpha);
		textSize(map(this.drumRad, this.minW, this.maxW, this.minW*0.5, this.maxW*0.7));
    text(this.key, this.posX, this.posY-15);

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
