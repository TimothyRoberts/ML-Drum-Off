class Scene {
	constructor(w, h, col, row, isActive) {
		this.w = w;
		this.h = h;
		this.col = col;
		this.row = row;
		this.isActive = true;
	}
}

class Scene1 extends Scene {
	constructor(w, h, col, row, isActive, header, subheader, ringoImg) {
		super(w, h, col, row, isActive);
		/* Text/Image max and min size */
		this.header = header;
		(windowWidth/15 > 80) ? this.headerSize = 80
		: (windowWidth/15 < 40) ? this.headerSize = 40
		: this.headerSize = windowWidth/15;

		this.subheader = subheader;
		(windowWidth/50 > 30) ? this.subheaderSize = 30
		: (windowWidth/50 < 18) ? this.subheaderSize = 18
		: this.subheaderSize = windowWidth/50;

		this.ringoImg = ringoImg;
		(windowWidth/6 > 150) ? this.iconSize = 150
		: (windowWidth/6 < 100) ? this.iconSize = 100
		: this.iconSize = windowWidth/6;

	}

	display() {
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
