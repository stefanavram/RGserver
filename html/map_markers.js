var holes;
var image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
var markers = [];
var map;
var styles=[{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	zoom: 12, 
        center: { lat: 45.759780, lng: 21.230020 }
    });

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    });
  }
map.setOptions({styles: styles});
drop();
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
