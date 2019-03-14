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
    (windowWidth/15 > 70) ? this.headerSize = 70
		: (windowWidth/15 < 40) ? this.headerSize = 40
		: this.headerSize = windowWidth/15;

		(windowWidth/50 > 30) ? this.subheaderSize = 30
		: (windowWidth/50 < 20) ? this.subheaderSize = 20
		: this.subheaderSize = windowWidth/50;

		(windowWidth/8 > 130) ? this.iconSize = 130
		: (windowWidth/8 < 105) ? this.iconSize = 105
		: this.iconSize = windowWidth/8;
	}

  run() {}
}
