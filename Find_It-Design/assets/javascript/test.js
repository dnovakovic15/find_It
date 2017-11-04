var map;
var service;
var infowindow;
var pyrmont;

var markers = [
        ['London Eye, London', 51.503454,-0.119562],
        ['Palace of Westminster, London', 51.499633,-0.124755]
    ];

var bounds = new google.maps.LatLngBounds();

$(document).ready(function(){
    initialize();
})

function initialize() {
  pyrmont = new google.maps.LatLng(-34.397, 150.644);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

  var request = {
    location: pyrmont,
    radius: '500000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(results[i]);
      console.log(results[i].name);
      $('#map').append(results[i].name);
      console.log('location: ' + results[i].geometry.viewport.b.b);
      createMarker(results[i]);
    }
  }
}

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