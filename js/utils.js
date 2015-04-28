var log = function(str) {
	console.log(str);
};
////////////////////

var options = {
	card: {
		width: 50, // * 2
		height: 75, // * 2
		radius: 6,
		velocity: 0.1
	}
};
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
	},
	moveCard: function(from, to, index) {
		var card = from.cards[index];
		to.cards.push(card);
		from.cards.splice(index, 1);
		return card;
	}
};