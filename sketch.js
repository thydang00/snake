var Player = {
	SCORE: 0,
	LEVEL: 1,
};

var Snake = {
	X: random(5, 375),
	Y: random(5, 375),
	SIZE: 15,
	SPEED: 1,
	ALIVE: true,

	update: () => {
		switch(keyCode) {
		case 37:
			Snake.X -= Snake.SPEED;
			break;
		case 38:
			Snake.Y -= Snake.SPEED;
			break;
		case 39:
			Snake.X += Snake.SPEED;
			break;
		case 40:
			Snake.Y += Snake.SPEED;
			break;
		}

		if(Snake.X < 0 || Snake.X > width - Snake.SIZE
			|| Snake.Y < 0|| Snake.Y > height - Snake.SIZE) {
				keyCode = 0;
				Snake.ALIVE = false;
		}
	},

	draw: () => {
		fill(255);
		rect(Snake.X, Snake.Y, Snake.SIZE, Snake.SIZE, 5);

		Snake.update();
	},

};

var Food = {
	LIST: [],
	SIZE: 20,
	NUM_OBJ: 1,

	create: (num) => {
		Food.LIST = [];
		Food.NUM_OBJ = num;
		for(var i = 0; i < Food.NUM_OBJ; i++) {
			Food.LIST[i] = {
				x: random(50, 350), 
				y: random(50, 350),
				c: color(255, 255, 0),
			}
		}
	},

	update: () => {
		for(var obj = 0; obj < Food.LIST.length; obj++) {
			if(dist(Snake.X + Snake.SIZE / 2, Snake.Y + Snake.SIZE / 2, 
				Food.LIST[obj].x, Food.LIST[obj].y) 
				< (Food.SIZE/2 + Snake.SIZE / 2)) {
					Food.LIST.splice(obj, 1);
					Food.NUM_OBJ--;
					Player.SCORE++;
			}
    	}
	},

	draw: () => {
		for(var ob = 0; ob < Food.LIST.length; ob++) {
			fill(Food.LIST[ob].c);
			ellipse(Food.LIST[ob].x, Food.LIST[ob].y, Food.SIZE, Food.SIZE);
		}
		Food.update();
	},
};

var Game = {
	INTRO: 0,
	OVER: 1,

	state: () => {
		if(!Snake.ALIVE) return Game.OVER;
	},

	message: () => {
		textSize(15);
		textFont("Monospace");
		switch(Game.state()) {
		case Game.OVER:
			text("Game Over", 30, 150);
			break;
		default:
			break;
		}
	},

	text: () => {
		fill(255);
		textSize(15);
		textFont("Monospace");
		text("score  " + Player.SCORE, 30, 30);

		// debug
		//text("(" + Snake.X + ", " + Snake.Y + ")", 30, 80);
		//text(keyCode, 30, 110);
		text("level  " + Player.LEVEL, 140, 30);
		text(Food.NUM_OBJ + " food", 140, 50);

	},

	reset: () => {
		Player.SCORE = 0;
		Player.LEVEL = 1;

		Food.SIZE = 20;
		Food.LIST = [];
		Food.NUM_OBJ = 0;

		Snake.SPEED = 1;
	},

	run: () => {
		if(!Food.LIST.length) {
			switch(Player.LEVEL) {
			case 2:
			case 4:
			case 6:
			case 8:
			case 10:
				Food.SIZE -= 3;
				Snake.SPEED += 0.25;
				break;
			case 1:
			case 3:
			case 5:
			case 7:
			case 9:
				break;	

			}
			Food.create(Player.LEVEL++);
		}
		Food.draw();
		Snake.draw();
	},
};

function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function setup() {
    createCanvas(400, 400);
    noStroke();
}

function draw() {
	background(0);
	text(keyCode, 370, 30);
	
	switch(Game.state()) {
	case Game.OVER:
		Game.message(Game.OVER);		
		if(keyCode === 32) 
			Game.reset();
			break;

	default:
		Game.run();
		Game.text();
	}
}
