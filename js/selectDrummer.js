/********************** HOME **********************
 Home extends scene and displays the home screen
***************************************************/

class SelectDrummer extends Scene {
	constructor(w, h, a, ringo) {
		super(w, h, a);
    this.id = "selectDrummer";
		this.header = "SELECT DRUMMER";
		this.subheader = "SELECT OPPONENT";
		this.logo = logo;
    this.fadeIn = false;
		this.c1pos = this.col*1.5;
		this.c2pos = this.col*4;
		this.c3pos = this.col*6.5;
		this.fadeIn = true;
		this.ringoIcon = ringo;

		// w, h, a, cardPosX, cardPosY
		this.dannyCard = new Card(w, h, this.alpha, this.c1pos, "DANNY CAREY", "TOOL", this.ringoIcon);
		this.ringoCard = new Card(w, h, this.alpha, this.c2pos, "RINGO STARR", "THE BEATLES", this.ringoIcon);
		this.daveCard = new Card(w, h, this.alpha, this.c3pos, "DAVE GROHL", "FOO FIGHTERS", this.ringoIcon);

	}

  setup() {
  	chooseBtn = createButton('choose drummer');
  	chooseBtn.parent('chooseBtn');
    chooseBtn.position(this.col*4, this.row*7);
  	chooseBtn.mousePressed(activateScene2);

  }

	run() {
		// super.display();
		// image(this.logo, this.col*1, this.row*1, this.logoW, this.logoH);
		// TITLE
		push();
		textSize(this.h1);
		textLeading(12);
		textAlign(CENTER);
		fill(250, 215, 70, this.alpha);
		// fill(12, 45, 75);
		// fill(255, 150);
		textFont(h1font);
		text(`SELECT DRUMMER`, this.col*4, this.row*1);
		pop();

		this.ringoCard.display();
		this.dannyCard.display();
		this.daveCard.display();

	}


  transition() {
		console.log(this.fadeIn);
		// if((x > this.c1pos - 125 && x < this.c1pos + 125) && (y > this.row*6.4 - 30 && y < this.row*6.4 + 30)) {
			// console.log("Change Scene");
			// activeScene = new DrumOff(w, h, ringoIcon);
	    this.fadeIn ? this.alpha += 10
	    : this.alpha -= 15;

	    if (this.alpha < 0) {
	      activeScene.switchScene();
	      this.fadeIn = true;
	    };
	    if (this.alpha > 255) {
				this.fadeIn = false;
	      sceneTransition = false;
	    }
		// }

  }

	switchScene(x, y) {
		// if((x > this.col*4 - 125 && x < this.col*4 + 125) && (y > this.row*7 - 30 && y < this.row*7 + 30)) {
			console.log("Change Scene");
			activeScene = new DrumOff(w, h, 0, this.ringoIcon);
		// }
	}

}

class Card extends Scene {
	constructor(w, h, a, cpX, name, band, icon) {
		super(w, h, a);
			this.name = name;
			this.band = band;
			this.cardPosX = cpX;
			this.cardPosY = this.row*4.6;
			this.buttonPosY = this.row*6.4;
			this.namePosY = this.row*2.5;
			this.bandPosY = this.row*2.85;
			this.icon = icon;
			// sets logo width to 850 if it excedes this width
			(windowWidth/4 > 380) ? this.cardW = 380
			: (windowWidth/4 < 285) ? this.cardW = 285
			: this.cardW = windowWidth/4;
			// maps logo height to fit with width dimensions
			(windowWidth/4 > 380) ? this.cardH = 500
			: (windowWidth/4 < 285) ? this.cardH = 450
			: this.cardH = map(this.cardW, 285, 380, 450, 500);
	}

	display() {
		noStroke();
		// fill(253,181,181, activeScene.alpha);
		fill(250, 215, 70, activeScene.alpha);
		rect(this.cardPosX, this.cardPosY, this.cardW, this.cardH, 25, 25, 25, 25);
		fill(bgColor, activeScene.alpha);
		textFont(h1font);
		textSize(this.h3);
		text(this.name, this.cardPosX, this.namePosY);


		push();
		fill(250, 215, 70, this.alpha);
		// fill(12, 45, 75);
		// fill(255, 150);
		// fill(12, 45, 75, activeScene.alpha);
		// rect(this.col*4, this.row*2.5, this.cardW, 60);
		fill(bgColor, activeScene.alpha);

		textFont(h2font);
		textSize(18);
		text(this.band, this.cardPosX, this.bandPosY - 2);
		pop();

		push();
		tint(255, activeScene.alpha);
		image(ringoIcon, this.col*4, this.row*3.8, 120, 120);
		pop();


		push();
		fill(12, 45, 75, 200, activeScene.alpha);
		rect(this.cardPosX, this.buttonPosY, this.cardW - 50, 60, 25, 25, 25, 25);
		fill(255, activeScene.alpha);
		textFont(h2font);
		textSize(18);
		text(`SELECT ${this.name}`, this.cardPosX, this.buttonPosY - 2);
		pop();

	}

}
