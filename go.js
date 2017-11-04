
{/*<script src="https://www.gstatic.com/firebasejs/4.5.2/firebase.js"></script>*/}

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB01N1qKzTHWNSxoStjH7St3gFxPQvtHwE",
    authDomain: "hello-world-b0166.firebaseapp.com",
    databaseURL: "https://hello-world-b0166.firebaseio.com",
    projectId: "hello-world-b0166",
    storageBucket: "hello-world-b0166.appspot.com",
    messagingSenderId: "667690310878"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


// Use the below initialValue
var initialValue = 100;

// Use the below variable clickCounter to keep track of the clicks.
var clickCounter = initialValue;

// --------------------------------------------------------------

function update(){
  database.ref().on("value", 
    function(snapshot) {
    console.log(snapshot.val());
    $("#click-value").text(snapshot.val().clickCount);
    // clickCounter = snapshot.val().clickCount;
    $("#click-value").text(clickCounter);
    }, 
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}


// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#click-button").on("click", function() {

  // Reduce the clickCounter by 1
  clickCounter--;

  // Alert User and reset the counter
  if (clickCounter === 0) {

    alert("Phew! You made it! That sure was a lot of clicking.");

    clickCounter = initialValue;

  }

  update();


  // Log the value of clickCounter
  console.log(clickCounter);

});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {

  // Set the clickCounter back to initialValue
  clickCounter = initialValue;

  // Save new value to Firebase


  // Log the value of clickCounter
  console.log(clickCounter);

  // Change the HTML Values
  $("#click-value").text(clickCounter);


});
