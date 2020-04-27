
//Making a map and tiles
var map = L.map('mapid').setView([38.9908547, -76.9104107], 10);

//We set up the tiles from OpenStreemap
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//We add the tiles to the map
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);




document.getElementById('gotoPontiac').addEventListener('click', function() {
	map.setView([38.9908547, -76.9104107], 15);
});
