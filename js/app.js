(function() {
	'use strict';

	var log = function(str) {
		console.log(str);
	};
	////////////////////

	var options = {
			card: {
				width: 53, // * 2
				height: 75, // * 2
				radius: 6,
				velocity: 0.1
			}
		},
		Canvas = {
			node: document.getElementById('onirim-game'),
			on: function(eventType, eventHandler) {
				Canvas.node.addEventListener(eventType, eventHandler, false);
			},
			mouse: function(e) {
				return {
					'top': e.pageY - Canvas.node.offsetTop,
					'left': e.pageX - Canvas.node.offsetLeft
				};
			},
			width: function() {
				return this.node.width;
			},
			height: function() {
				return this.node.height;
			},
			render: function() {
				c.setTransform(1, 0, 0, 1, 0, 0);
				c.clearRect(0, 0, this.node.width, this.node.height);
				Limbo.render();
				Deck.render();
				Hand.render();
				return this;
			}
		},
		c = Canvas.node.getContext('2d'),
		Deck, Hand, Limbo, Discart;

	// Utils
	var Utils = {
		shuffle: function(o) {
			for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		},
		extend: function(destination, source) {
			var source = source || {};
			for (var property in source) {
				if (source[property] && source[property].constructor && source[property].constructor === Object) {
					destination[property] = destination[property] || {};
					arguments.callee(destination[property], source[property]);
				} else {
					destination[property] = source[property];
				}
			}
			return destination;
		}
	};

	// Card
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
				type: null,
				props: null,
				image: '#F00',
				border: '#555'
			}, op);
			this.atract = {
				x: this.cfg.x,
				y: this.cfg.y
			}
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
			c.beginPath();

			var w = options.card.width,
				h = options.card.height,
				r = options.card.radius;



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
			console.log('muevo');
			return this;
		}
	};

	///////////////////////////////////////////////////////////

	// Common functions
	var moveCard = function(from, to, index) {
		var card = from.cards[index];
		to.cards.push(card);
		from.cards.splice(index, 1);
		return card;
	};

	// Deck
	Deck = {
		initialized: false,
		x: 100,
		y: 565,
		init: function() {
			this.cards = [];
			for (var i = 0; i < 2; i++) {
				var newCard = Card({
					x: this.x,
					y: this.y
				});
				this.cards.push(newCard);
			}
			this.initialized = true;
			return this;
		},
		shuffle: function() {
			this.cards = Utils.shuffle(this.cards);
			return this;
		},
		render: function() {
			if (this.initialized) {
				var l = this.cards.length;
				for (var i = 0; i < l; i++) {
					this.cards[i].render();
				}
			}

			return this;
		}
	};
	Deck.init().shuffle();

	// Hand
	Hand = {
		x: 309,
		y: 565,
		init: function() {
			this.cards = [];
			return this;
		},
		drawCardFromDeck: function() {
			var card = moveCard(Deck, this, Deck.cards.length - 1);
			card.move(this.x, this.y);
			return this;
		},
		playCardToLimbo: function(index) {
			var card = moveCard(this, Limbo, index);
			card.move(Limbo.x, Limbo.y);
			return this;
		},
		render: function() {
			var l = this.cards.length;
			for (var i = 0; i < l; i++) {
				this.cards[i].render();
			}
			return this;
		}
	};
	Hand.init();

	// Limbo
	Limbo = {
		init: function() {
			this.cards = [];
			return this;
		},
		shuffleWithDeck: function() {
			while (this.cards.length > 0) {
				moveCard(this, Deck, 0);
			}
			Deck.shuffle();
			return this;
		},
		render: function() {
			return this;
		}
	};
	Limbo.init();



	//Animation Loop:
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
	var animloop = function() {
		requestAnimFrame(animloop);
		Canvas.render();
	};
	animloop();

	/*****************************************************************/

	setTimeout(function() {
		Hand.drawCardFromDeck();
	}, 400);



})();