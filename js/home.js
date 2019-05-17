/********************** HOME **********************
 Home extends scene and displays the home screen
***************************************************/

class Home extends Scene {
	constructor(w, h, a, logo) {
		super(w, h, a);
    this.id = "home";
		this.header = "ML DRUM-OFF";
		this.subheader = "SELECT OPPONENT";
		this.logo = logo;
    this.fadeIn = false;

	}

  setup() {
  	chooseBtn = createButton('choose drummer');
  	chooseBtn.parent('chooseBtn');
    chooseBtn.position(this.col*4, this.row*7);
  	chooseBtn.mousePressed(activateScene2);

  }

	run() {
		// image opacity
		tint(255, this.alpha);
		image(this.logo, this.col*4, this.row*4, this.logoW, this.logoH);

		push();
		textSize(this.h3);
		textLeading(12);
		textAlign(LEFT);
		fill(250, 215, 70);
		fill(12, 45, 75);
		fill(253,181,181, this.alpha);
		text(`CLICK ANYWHERE TO BEGIN`, this.col*4.3, this.row*5);
		pop();

	}

  transition() {
    this.fadeIn ? this.alpha += 10
    : this.alpha -= 15;
    if (this.alpha < 0) {
      activeScene.switchScene();
      this.fadeIn = true;
    };
    if (this.alpha > 255) {
      sceneTransition = false;
    }
  }

	switchScene(x, y) {
		// if((x > this.col*4 - 125 && x < this.col*4 + 125) && (y > this.row*7 - 30 && y < this.row*7 + 30)) {
			activeScene = new SelectDrummer(w, h, 0, this.ringoIcon);

	}

}
