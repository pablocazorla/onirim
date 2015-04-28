var Deck = {
	cards: [],
	x: 100,
	y: 565,
	init: function() {
		this.cards = [];
		for (var i = 0; i < 76; i++) {
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
		var l = this.cards.length - 1;
		if (l >= 0) {
			this.cards[l].render();
		}
		return this;
	}
};
Deck.init().shuffle();