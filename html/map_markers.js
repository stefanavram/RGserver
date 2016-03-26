// This example adds a marker to indicate the position of Bondi Beach in Sydney,
// Australia.
var holes;
$.getJSON("http://roadgems.ml/get_all_potholes.php", function(json){
    holes = json;
});
console.log(holes);
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: -33, lng: 151 }
    });

    var image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
    new google.maps.Marker({
            position: { lat: -33.890, lng: 151.274 },
            map: map,
            icon: image
        }
    );
}

function drop() {
	
}