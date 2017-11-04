var formshowing = false;

function showform() {
	if (formshowing === false) {
		formshowing === true;
		$('.tap-target').tapTarget('open');
	}

	else if (formshowing === true) {
		$('.tap-target').tapTarget('close');
	}
}

function submission () {
	event.preventDefault();
	$("#weather-display").show();
	$("#twitter-display").show();
	$('.tap-target').tapTarget('close');
}