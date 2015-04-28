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
	c = Canvas.node.getContext('2d');