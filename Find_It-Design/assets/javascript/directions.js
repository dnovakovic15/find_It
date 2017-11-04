
let startLocation, endLocation;

function getDirections(start, end) {
    console.log("Start: "+start);
    console.log("End: "+end);
    startLocation = start;
    endLocation = end;

    directionsDisplay = new google.maps.DirectionsRenderer();
    let chicago = new google.maps.LatLng(41.850033, -87.6500523);
    let mapOptions = {
    zoom:7,
    center: chicago
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);

    directions();
}

function directions(){
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: 'DRIVING'
    }, 
    function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

    directionsDisplay.setMap(map);
}