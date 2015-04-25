(function() {
	'use strict';

	var log = function(str) {
		console.log(str);
	};
	////////////////////
	var Canvas = {
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

			}
		},
		c = Canvas.node.getContext('2d'),
		Deck, Hand, Limbo, Discart;

	// Utils
	var Utils = {
		shuffle: function(o) {
			for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
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
			this.num = op;
			return this;
		}
	};

	///////////////////////////////////////////////////////////

	// Common functions
	var moveCard = function(from, to, index) {
		var card = from.cards[index];
		to.cards.push(card);
		from.cards.splice(index, 1);
	};

	// Deck
	Deck = {
		init: function() {
			this.cards = [];
			for (var i = 0; i < 10; i++) {
				var newCard = i;
				this.cards.push(newCard);
			}
			return this;
		},
		shuffle: function() {
			this.cards = Utils.shuffle(this.cards);
			return this;
		}
	};
	Deck.init().shuffle();

	// Hand
	Hand = {
		init: function() {
			this.cards = [];
			return this;
		},
		drawCardFromDeck: function() {
			moveCard(Deck, this, Deck.cards.length - 1);
			return this;
		},
		playCardToLimbo: function(index) {
			moveCard(this, Limbo, index);
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
		}
	};
	Limbo.init();

	log(Deck.cards);
	log(Hand.cards);
	log(Limbo.cards);

	log('--------');

	Hand
		.drawCardFromDeck()
		.drawCardFromDeck()
		.drawCardFromDeck()
		.drawCardFromDeck()
		.drawCardFromDeck()
		.drawCardFromDeck();

	log(Deck.cards);
	log(Hand.cards);
	log(Limbo.cards);
	log('--------');

	Hand.playCardToLimbo(2)
	Hand.playCardToLimbo(2)
	Hand.playCardToLimbo(2)
	log(Deck.cards);
	log(Hand.cards);
	log(Limbo.cards);
	log('--------');
	Limbo.shuffleWithDeck();
	log(Deck.cards);
	log(Hand.cards);
	log(Limbo.cards);
})();