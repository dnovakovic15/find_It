let currentLocation;
let toolsMarkerArray=[]
let marker;

function createMarker(location, contentName, map, contentPrice, contentRating, contentIsOpen){
    console.log(contentPrice)
    let bounds = new google.maps.LatLngBounds();
        let position = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Hello World'
        });
        
    toolsMarkerArray.push(position);
    console.log("array: "+toolsMarkerArray[0]);
        
    // Allow each marker to have an info window    
    google.maps.event.addListener(marker, 'click', (function(marker) {
        let infoWindow = new google.maps.InfoWindow()
        return function() {
                
            console.log(''+marker.position);
            newPosition = marker.position;
            console.log("newPosition "+ newPosition)
            infoWindow.setContent('<div class="infoWindow">'+ contentName + '</div>' +  "<br />" + '<input type="button" id="btnDirections" value=Directions onclick="getDirections(toolsMarkerArray[0], newPosition)"></button>');
            infoWindow.open(map, marker);
               

            /*$('#weather-display').empty();
            $('#weather-display').append(contentName);
            $('#weather-display').append('<br/>'+'<br/>');
            if(contentPrice != undefined)
            {
                $('#weather-display').append("Average Price: " +contentPrice +"/4");
            }
            $('#weather-display').append('<br/>'+'<br/>');
            if(contentRating != undefined)
            {
                $('#weather-display').append("Average Rating: " +contentRating +"/5");
            }
            if(contentIsOpen != undefined)
            {
                if(contentIsOpen === true)
                {
                    $('#weather-display').append("Open: Yes");
                }else{
                    $('#weather-display').append("Open: No");
                }
                    
                }
             */   
            }
    })(marker));
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

