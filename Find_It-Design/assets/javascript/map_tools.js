function createMarker(location){
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
}

let apiKey = 'AIzaSyAWFIyP0ivtZCbMWaqdl7sYS-IIDJkGQHs';

function geoCoding(){
    queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=+evanston&key='+apiKey;

    $.ajax({
            url : queryURL,
            method : "GET",
        })
        .done(function(response){
            console.log(response.results[0].geometry.location);
            return response.results[0].geometry.location;
        });
}


function getPosition(options){
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}