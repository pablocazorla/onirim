// App

var dragg = false;

var h4 = document.getElementById('h4'),
	oni = document.getElementById('onirim-game');

var mousePosition = function(e) {
	return {
		'top': e.pageY - oni.offsetTop,
		'left': e.pageX - oni.offsetLeft
	};
};

var on = function(eventTarget, eventType, eventHandler) {
	eventTarget.addEventListener(eventType, eventHandler, false);
};

on(oni, 'mousedown', function(e) {
	if (!dragg) {
		var mp = mousePosition(e);

		h4.innerHTML = mp.left + 'x / ' + mp.top + 'y';

		dragg = true;
	}
});


on(window, 'mousemove', function(e) {
	if (dragg) {
		var mp = mousePosition(e);

		h4.innerHTML = mp.left + 'x / ' + mp.top + 'y';
	}
});

on(window, 'mouseup', function(e) {
	if (dragg) {
		h4.innerHTML = '';
		dragg = false;
	}
});