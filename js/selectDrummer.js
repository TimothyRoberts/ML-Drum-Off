/********************** HOME **********************
 Home extends scene and displays the home screen
***************************************************/

class SelectDrummer extends Scene {
	constructor(w, h, a, logo) {
		super(w, h, a);
    this.id = "selectDrummer";
		this.header = "SELECT DRUMMER";
		this.subheader = "SELECT OPPONENT";
		this.logo = logo;

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

	}


  transition() {
    console.log(this.alpha);
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

	switchScene(x, y) {
		// if((x > this.col*4 - 125 && x < this.col*4 + 125) && (y > this.row*7 - 30 && y < this.row*7 + 30)) {
			console.log("Change Scene");
			activeScene = new DrumOff(w, h, logo);
		// }
	}


}
