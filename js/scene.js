/********************** SCENE **********************
 All scene objects share the same dimensions
***************************************************/

class Scene {
	constructor(w, h, a) {
		this.w = w;
		this.h = h;
    this.scl = 8;
		this.col = windowWidth / this.scl;
		this.row = this.h / this.scl;
		this.alpha = a;
    this.fadeIn = false;

    /* Text/Image max and min size */
    (windowWidth/15 > 70) ? this.headerSize = 70
		: (windowWidth/15 < 40) ? this.headerSize = 40
		: this.headerSize = windowWidth/15;

		(windowWidth/50 > 30) ? this.subheaderSize = 30
		: (windowWidth/50 < 20) ? this.subheaderSize = 20
		: this.subheaderSize = windowWidth/50;

		// sets logo width to 850 if it excedes this width
		(windowWidth/1.5 > 850) ? this.logoW = 850
		: (windowWidth/1.5 < 275) ? this.logoW = 275
		: this.logoW = windowWidth/1.5;
		// maps logo height to fit with width dimensions
		(windowWidth/1.5 > 850) ? this.logoH = 272
		: (windowWidth/1.5 < 275) ? this.logoH = 88
		: this.logoH = map(this.logoW, 275, 850, 88, 272);

		this.h3 = map(this.logoW, 275, 850, 14, 26);
    this.h1 = map(this.logoW, 275, 850, 26, 52);
	}

	transition() {
	}

  run() {}
}
