let map;
let service;
let infowindow;
let pyrmont;
let myLocation;
let localPosition;
let contentCall;
let priceChoice = 5;


$(document).ready(function(){
    initialize();
})


function initialize() {
  getPosition()
  .then((position) => {
      createMap(position, createMarker);
  })
  .catch((err) => {
      console.error(err.message);
  });

  function createMap(position, callbackMarker){
    localPosition = position;
    pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map = new google.maps.Map(document.getElementById('map-display'), {
        center: pyrmont,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
    content = 'My Location';

    callbackMarker(localPosition, content, map);
  }
}









