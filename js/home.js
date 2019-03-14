/********************** HOME **********************
 Home extends scene and displays the home screen
***************************************************/

class Home extends Scene {
	constructor(w, h, ringoImg) {
		super(w, h);
    this.id = "home";
		this.header = "ML DRUM-OFF";
		this.subheader = "SELECT OPPONENT";
		this.ringoImg = ringoImg;

	}

  setup() {
  	chooseBtn = createButton('choose drummer');
  	chooseBtn.parent('chooseBtn');
    chooseBtn.position(this.col*4, this.row*7);
  	chooseBtn.mousePressed(activateScene2);

  }

	run() {
		// super.display();
		fill(250, 215, 70);
		textSize(this.headerSize);
		textFont(h1font);
		text(this.header, this.col*4, this.row);
		image(ringoIcon, this.col*4, this.row*3, this.iconSize, this.iconSize);
		textSize(this.subheaderSize);
		textFont(h2font);
		// fill(12, 45, 75);
		text("RINGO STARR\n(The Beatles)", this.col*4, this.row*4.3);
		// text("(The Beatles)", this.col*4, this.row*4.6);
		textSize(15);
		textLeading(10);
		fill(255);
		// fill(12, 45, 75);
		text(`Lorem ipsum dolor sit amet, \n
					tempor incididunt ut labore et   \n
					quis nostrud exercitation ullamco  \n
					consequat. Duis aute irure dolor \n
					in voluptate velit esse cillum`, this.col*4, this.row*5.6);


		// fill(12, 45, 75);
		push();
		noFill();
		stroke(12, 45, 75);
		ellipse(this.col*2, this.row*4, 80, 80);
		noStroke();
		fill(250, 215, 70);
		beginShape();
		vertex(this.col*1.9, this.row*4);
		vertex(this.col*2.1, this.row*4.1);
		vertex(this.col*2.1, this.row*4.1);
		vertex(this.col*2.1, this.row*3.9);
		endShape(CLOSE);
		pop();


		push();
		noFill();
		stroke(12, 45, 75);
		ellipse(this.col*6, this.row*4, 80, 80);
		noStroke();
		fill(250, 215, 70);
		beginShape();
		vertex(this.col*6.1, this.row*4);
		vertex(this.col*5.9, this.row*4.1);
		vertex(this.col*5.9, this.row*4.1);
		vertex(this.col*5.9, this.row*3.9);
		endShape(CLOSE);
		pop();

		push();
		fill(12, 45, 75);
		rect(this.col*4, this.row*7, 250, 60, 25, 25, 25, 25);
		fill(255)
		textFont(h2font);
		text("SELECT AS OPPONENT", this.col*4, this.row*7 - 2);
		pop();

	}

	switchScene(x, y) {
		if((x > this.col*4 - 125 && x < this.col*4 + 125) && (y > this.row*7 - 30 && x < this.row*7 + 30)) {
			console.log("hit!");
			activeScene = new DrumOff(w, h, ringoIcon);
		}
	}


}
