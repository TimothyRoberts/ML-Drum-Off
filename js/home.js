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
		fill(255);
		textSize(this.headerSize);
		text(this.header, this.col*4, this.row);
		textSize(this.subheaderSize);
		text(this.subheader, this.col*4, this.row*2);
		image(ringoImg, this.col*4, this.row*3.5, this.iconSize, this.iconSize);
		textSize(12);
		text(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum`, this.col*4, this.row*5.5);
	}


}
