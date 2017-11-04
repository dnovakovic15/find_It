let startLocation, endLocation;
var markerArray = [];
let stepDisplay = new google.maps.InfoWindow;
let config = {
    apiKey: "AIzaSyBp--rmslYdT1suBQiE6GUkciJD5H2GxVE",
    authDomain: "findit-2f795.firebaseapp.com",
    databaseURL: "https://findit-2f795.firebaseio.com",
    projectId: "findit-2f795",
    storageBucket: "",
    messagingSenderId: "1084597275428"
};
firebase.initializeApp(config);
let database = firebase.database();

let minTime = 1000;
let minHour = 25;
let counter = 0;

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

    map = new google.maps.Map(document.getElementById('map-display'), mapOptions);
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
            showSteps(response, markerArray, stepDisplay, map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
  
    directionsDisplay.setMap(map);
}

$('#submit').on('click', function(){
    event.preventDefault()
    var start = $("#earlyTime").val();
    var end = $("#lateTime").val();

    start = convertTime(start);
    end = convertTime(end);
    
    trafficData(start, end);
});


function convertTime(userTime){
    var timeInput = userTime;
    var time_convert = timeInput.split(":");
    var format_time = moment().hours(time_convert[0]).minutes(time_convert[1]);
    var timeValue = format_time.format("hh:mm a");
    
    if(parseInt(timeValue.substring(3,4)) > 1){
        return parseInt(timeValue.substring(0,2)) + 1;
    }
    else{
        return parseInt(timeValue.substring(0,2));
    }
}


function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];

    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
}
function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}
function trafficData(timeMin, timeMax){
    let directionsService = new google.maps.DirectionsService;
    let time  = new Date();

    time.setDate(5);
    time.setHours(timeMin + counter);
    time.setMinutes(0);
    directionsService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: time,
            trafficModel: 'pessimistic',
        }
    }, 
    function(response, status) {
        if (status === 'OK') {
            var responseTime = parseFloat(response.routes[0].legs[0].duration_in_traffic.text);
            console.log('request time: ' + response.request.drivingOptions.departureTime);
            console.log("response time: " + responseTime);
            database.ref().push({
                min:minTime,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            if(responseTime < minTime){
                minTime = responseTime;
                minHour = timeMin;
            }
            if(timeMin + counter < timeMax){
                counter++;
                trafficData(timeMin, timeMax);
            }
            else{
                //This is where we need to update traffic div!
                console.log('Traffic Time: ' + minTime + '<br/>' + 'Leave at: ' + minHour + 'pm');
                $('#traffic-display').html("<div id='tweets'>" + 'Best Time to Leave' + '<br />' + 'Traffic Time: '  + minTime + ' min <br/>' + 'Leave at: ' + minHour + 'pm'+'</div>');
              
            }
        } 
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}