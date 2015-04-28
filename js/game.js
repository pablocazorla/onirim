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