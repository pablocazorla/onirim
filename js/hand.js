// Hand
var Hand = {
	x: 309,
	y: 565,
	init: function() {
		this.cards = [];
		return this;
	},
	drawCardFromDeck: function() {
		var card = Utils.moveCard(Deck, this, Deck.cards.length - 1);
		card.move(this.x, this.y).turn();
		return this;
	},
	playCardToLimbo: function(index) {
		var card = Utils.moveCard(this, Limbo, index);
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