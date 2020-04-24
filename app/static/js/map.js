
//Making a map and tiles
var map = L.map('mapid').setView([51.505, -0.09], 6);

//We set up the tiles from OpenStreemap
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//We add the tiles to the map
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

