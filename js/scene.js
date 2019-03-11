/********************** SCENE **********************
 All scene objects share the same dimensions
***************************************************/

class Scene {
	constructor(w, h) {
		this.w = w;
		this.h = h;
    this.scl = 8;
		this.col = windowWidth / this.scl;
		this.row = this.h / this.scl;

    /* Text/Image max and min size */
    (windowWidth/15 > 80) ? this.headerSize = 80
		: (windowWidth/15 < 40) ? this.headerSize = 40
		: this.headerSize = windowWidth/15;

		(windowWidth/50 > 30) ? this.subheaderSize = 30
		: (windowWidth/50 < 18) ? this.subheaderSize = 18
		: this.subheaderSize = windowWidth/50;

		(windowWidth/6 > 150) ? this.iconSize = 150
		: (windowWidth/6 < 100) ? this.iconSize = 100
		: this.iconSize = windowWidth/6;
	}

  run() {}
}
