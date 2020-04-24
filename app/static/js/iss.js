
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: '/static/img/iss200.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});

const ISSmarker = L.marker([0, 0], {icon: issIcon}).addTo(map);
//const ISSPopup = L.popup().setContent('no info yet').addTo(map)

async function getISS(){
	const response = await fetch (api_url);	
	const data = await response.json();
	//console.log(data.latitude); 
	//console.log(data.longitude); fancy alternative method to pull data from json below
	const {latitude, longitude, velocity } =  data;
	console.log(latitude);
	console.log(longitude);	
	ISSmarker.setLatLng([latitude, longitude]);
	
	ISSmarker.bindPopup("<b>Speed</b><br>"+velocity.toFixed(2)+" Km/h");

	map.panTo([latitude, longitude]);
}

getISS();
setInterval(getISS, 2000);



