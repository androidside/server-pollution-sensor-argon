
const ISSmarker = L.marker([0, 0], {icon: L.icon({
	iconUrl: '/static/img/iss200.png',
	iconSize: [50, 32],
	iconAnchor: [25, 16]
})}).addTo(map);

var lastKnownISSLatitude = 0;
var lastKnownISSLongitude = 0;

async function getISS(){

	//const ISSPopup = L.popup().setContent('no info yet').addTo(map)
	const response = await fetch ('https://api.wheretheiss.at/v1/satellites/25544');	
	const data = await response.json();
	//console.log(data.latitude); 
	//console.log(data.longitude); fancy alternative method to pull data from json below
	const {latitude, longitude, velocity } =  data;
//	console.log(latitude);
//	console.log(longitude);	
	ISSmarker.setLatLng([latitude, longitude]);
	lastKnownISSLatitude = latitude;
	lastKnownISSLongitude = longitude;	

	ISSmarker.bindPopup("<b>Speed ISS:</b><br>"+velocity.toFixed(2)+" Km/h");
	setTimeout(getISS, 5000);

	//map.panTo([latitude, longitude]);
}

getISS();

document.getElementById('locateISS').addEventListener('click', function() {
	map.setView([lastKnownISSLatitude, lastKnownISSLongitude], 6);
});




