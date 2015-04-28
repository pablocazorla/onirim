// Card

var backImageLoaded = false,
	backImage = new Image();
backImage.src = 'img/cards.jpg';

backImage.onload = function() {
	backImageLoaded = true;
	log('si');
};

backImage.onerror = function() {
	log('Error');
};

var mapCard = (function() {
	var list = [
		'back',
		'brownGate',
		'blueGate',
		'greenGate',
		'redGate',
		'brown',
		'green',
		'blue',
		'red',
		'night',
		'redBook',
		'blueBook',
		'greenBook',
		'brownBook',
		'book',
		'redTower',
		'blueTower',
		'greenTower',
		'brownTower'
	];

	var map = {},
		col = 0,
		row = 0,
		numCol = 5;

	for (var i = 0; i < list.length; i++) {
		map[list[i]] = {
			x: col,
			y: row
		};
		col++;
		if (col >= numCol) {
			col = 0;
			row++;
		}
	}
	return map;
})();



var cardConst = function(op) {
		return this.init(op);
	},
	Card = function(op) {
		return new cardConst(op);
	};

cardConst.prototype = {
	init: function(op) {
		this.cfg = Utils.extend({
			x: 300,
			y: 300,
			type: 'blueGate',
			props: null,
			image: '#AAA',
			border: '#555'
		}, op);
		this.atract = {
			x: this.cfg.x,
			y: this.cfg.y
		}

		this.backImage = mapCard[this.cfg.type];

		this.turned = true;

		this.turningDir = 0;

		this.scaleX = 1;



		return this;
	},
	turn: function() {
		return this;
	},
	render: function() {
		c.setTransform(1, 0, 0, 1, 0, 0);

		c.fillStyle = this.cfg.image;
		c.strokeStyle = this.cfg.border;

		this.animMove();
		c.translate(this.cfg.x, this.cfg.y);

		//Turning
		if (this.turningDir !== 0) {
			var vel = 0.07;
			if (this.turningDir < 0) {
				this.scaleX -= vel;
			} else {
				this.scaleX += vel;

			}
			if (this.scaleX <= 0) {
				this.turned = !this.turned;
				this.scaleX = 0;
				this.turningDir = 1;
			}
			if (this.scaleX >= 1) {
				this.turningDir = 0;
				this.scaleX = 1;
			}
			c.scale(this.scaleX, 1);
		}

		var w = options.card.width,
			h = options.card.height,
			r = options.card.radius;

		c.beginPath();

		c.moveTo(-w + r, -h);

		c.lineTo(w - r, -h);

		c.quadraticCurveTo(w, -h, w, -h + r);

		c.lineTo(w, h - r);

		c.quadraticCurveTo(w, h, w - r, h);

		c.lineTo(-w + r, h);

		c.quadraticCurveTo(-w, h, -w, h - r);

		c.lineTo(-w, -h + r);

		c.quadraticCurveTo(-w, -h, -w + r, -h);
		c.fill();
		c.stroke();
		c.closePath();

		if (backImageLoaded) {
			c.save();
			c.clip();
			var ox = 0,
				oy = 0;
			if (!this.turned) {
				ox = this.backImage.x * 2 * w;
				oy = this.backImage.y * 2 * h;
			}

			c.drawImage(backImage, -w - ox, -h - oy);
			c.restore();
		}


		return this;
	},
	turn: function() {
		this.turningDir = -1;
		return this;
	},
	animMove: function() {
		var step;
		if (this.atract.x !== this.cfg.x) {
			step = this.atract.x - this.cfg.x;
			this.cfg.x += options.card.velocity * step;
			if (Math.abs(step) < 1) {
				this.cfg.x = this.atract.x;
			}
		}
		if (this.atract.y !== this.cfg.y) {
			step = this.atract.y - this.cfg.y;
			this.cfg.y += options.card.velocity * step;
			if (Math.abs(step) < 1) {
				this.cfg.y = this.atract.y;
			}
		}
	},
	move: function(x, y) {
		this.atract.x = x;
		this.atract.y = y;
		return this;
	}
};