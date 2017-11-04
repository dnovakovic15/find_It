let map;
let service;
let infowindow;
let pyrmont;
let myLocation;

$(document).ready(function(){
    initialize();
})

function initialize() {
  getPosition()
  .then((position) => {
      console.log(position);
      createMap(position);
  })
  .catch((err) => {
      console.error(err.message);
  });


  function createMap(position){
    pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

    let request = {
      location: pyrmont,
      radius: '500',
      type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
      }
    }
  }
}





