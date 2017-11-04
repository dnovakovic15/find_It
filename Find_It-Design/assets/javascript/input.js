//let apiKey = 'AIzaSyAWFIyP0ivtZCbMWaqdl7sYS-IIDJkGQHs';
function locationInput(){
	let startLocation = $("#start-location").val().trim();
	let endLocation = $("#end-location").val().trim();
	getDirections(startLocation,endLocation);

	console.log("Location input:"+startLocation+ "+"+endLocation);
}

$(document).on("click", "#find-button", locationInput);



	