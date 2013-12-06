window.onload = registerMaze;

function registerMaze() {
	var numMoves = 0;
	
	$('.section').click(function() {
		var mouseElement = $('.section.mouse');
		var nextMoveElement = $(this);
		if (isValidMove(mouseElement, nextMoveElement)) {
			mouseElement.removeClass('mouse');
			numMoves++;
			$('.num-moves').text(numMoves);
			if ($(this).hasClass('cheese')) {
				$(this).addClass('found');
				var outcomeText = 'Congrats! You found the cheese in ' + numMoves + ' moves!';
				document.getElementById('outcome-section').textContent = outcomeText;
			} else {
				$(this).addClass('mouse');
			}
		} else {
			alert("Invalid Move! You must move to an open spot directly next to the mouse.");
		}
	});

	$('#reset-button').click(function() {
		numMoves = 0;
		$('.num-moves').text(0);
		document.getElementById('outcome-section').textContent = '';
		$('.mouse').removeClass('mouse');
		$('.cheese').removeClass('found');
		var startElement = document.getElementById('x1y1');
		$(startElement).addClass('mouse');
	});
}

function isValidMove(mouseElement, nextMoveElement) {
	var mouseLocation = mouseElement.attr('id');
	var nextMoveLocation = nextMoveElement.attr('id');

	if (nextMoveElement.hasClass('block'))
		return false;

	var mouseX = parseInt(mouseLocation.charAt(1));
	var mouseY = parseInt(mouseLocation.charAt(3));
	var nextX = parseInt(nextMoveLocation.charAt(1));
	var nextY = parseInt(nextMoveLocation.charAt(3));

	// Must be just above / below mouse
	if (Math.abs(mouseX - nextX) == 0 &&
		Math.abs(mouseY - nextY) == 1)
		return true;

	// Must be just to left / right of mouse
	if (Math.abs(mouseX - nextX) == 1 &&
		Math.abs(mouseY - nextY) == 0)
		return true;

	return false;
}