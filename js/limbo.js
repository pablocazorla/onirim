// Limbo
var Limbo = {
	init: function() {
		this.cards = [];
		return this;
	},
	shuffleWithDeck: function() {
		while (this.cards.length > 0) {
			Utils.moveCard(this, Deck, 0);
		}
		Deck.shuffle();
		return this;
	},
	render: function() {
		return this;
	}
};
Limbo.init();