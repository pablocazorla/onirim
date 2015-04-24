// App

var dragg = false;

var $h4 = $('h4');

$('#onirim-game').mousedown(function(e){
	if(!dragg){
		$h4.text(e.pageX + 'x / ' +e.pageY +'y');
		dragg = true;
	}
});

$(window).mousemove(function(e){
	if(dragg){
		$h4.text(e.pageX + 'x / ' +e.pageY +'y');
	}
}).mouseup(function(){
	if(dragg){
		$h4.text('');
		dragg = false;
	}
});