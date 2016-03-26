var holes;
var image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
var markers = [];
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	zoom: 10, 
        center: { lat: -33, lng: 151 }
    });
    drop();

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    console.log('Error: The Geolocation service failed. Error: Your browser doesn\'t support geolocation.');
}


function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(function() {
      markers.push(new google.maps.Marker({
      position: position,
      map: map,
      icon: image,
    }));
   }, timeout);
}

function drop() {
   $.getJSON("http://roadgems.ml/get_all_potholes.php", function(json){
	
        holes = json["holes"];
	console.log(holes);
	for (var i = 0; i < holes.length; i++) {
		addMarkerWithTimeout(holes[i].position, i*100);     
	}
  });
}

function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
	narkers= [];
}	
