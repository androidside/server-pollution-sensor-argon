const coords_pontiac = [38.991433, -76.909985];
const coords_pontiac_label = [38.992428964718215 , -76.91156940689154];

const coords_greenbelt = [39.004589, -76.875622];
const coords_greenbelt_label = [39.002968579806385, -76.87826743852777];

const coords_gsfc = [38.991923, -76.852514];
const coords_gsfc_label = [38.99556433070917 , -76.84891364167106];

const coords_center = [38.992393, -76.879213];

const colorArray = ['#4CBB17', '#4FBB16', '#53BB16', '#56BC15', '#5ABC15', '#5DBD14', '#61BD14', '#65BE13', '#68BE13', '#6CBF12', '#6FBF12', '#73C011', '#76C011', '#7AC111', '#7EC110', '#81C210', '#85C20F', '#88C30F', '#8CC30E', '#90C40E', '#93C40D', '#97C50D', '#9AC50C', '#9EC60C', '#A1C60B', '#A5C70B', '#A9C70B', '#ACC70A', '#B0C80A', '#B3C809', '#B7C909', '#BAC908', '#BECA08', '#C2CA07', '#C5CB07', '#C9CB06', '#CCCC06', '#D0CC05', '#D4CD05', '#D7CD05', '#DBCE04', '#DECE04', '#E2CF03', '#E5CF03', '#E9D002', '#EDD002', '#F0D101', '#F4D101', '#F7D200', '#FBD200', '#FFD300', '#FFCF00', '#FFCB00', '#FFC800', '#FFC400', '#FFC100', '#FFBD00', '#FFBA00', '#FFB600', '#FFB200', '#FFAF00', '#FFAB00', '#FFA800', '#FFA400', '#FFA100', '#FF9D00', '#FF9900', '#FF9600', '#FF9200', '#FF8F00', '#FF8B00', '#FF8800', '#FF8400', '#FF8000', '#FF7D00', '#FF7900', '#FF7600', '#FF7200', '#FF6F00', '#FF6B00', '#FF6700', '#FF6400', '#FF6000', '#FF5D00', '#FF5900', '#FF5600', '#FF5200', '#FF4E00', '#FF4B00', '#FF4700', '#FF4400', '#FF4000', '#FF3D00', '#FF3900', '#FF3500', '#FF3200', '#FF2E00', '#FF2B00', '#FF2700', '#FF2400']; 
//from green to red 100 positions

//Green, Yellow, Red arrays, size = 33, center at 17th.
const greenArray = ['#4FBB16', '#53BB16', '#56BC15', '#5ABC15', '#5DBD14', '#61BD14', '#65BE13', '#68BE13', '#6CBF12', '#6FBF12', '#73C011', '#76C011', '#7AC111', '#7EC110', '#81C210', '#85C20F', '#88C30F', '#8CC30E', '#90C40E', '#93C40D', '#97C50D', '#9AC50C', '#9EC60C', '#A1C60B', '#A5C70B', '#A9C70B', '#ACC70A', '#B0C80A', '#B3C809', '#B7C909', '#BAC908', '#BECA08', '#C2CA07'];
const yellowArray = ['#C5CB07', '#C9CB06', '#CCCC06', '#D0CC05', '#D4CD05', '#D7CD05', '#DBCE04', '#DECE04', '#E2CF03', '#E5CF03', '#E9D002', '#EDD002', '#F0D101', '#F4D101', '#F7D200', '#FBD200', '#FFD300', '#FFCF00', '#FFCB00', '#FFC800', '#FFC400', '#FFC100', '#FFBD00', '#FFBA00', '#FFB600', '#FFB200', '#FFAF00', '#FFAB00', '#FFA800', '#FFA400', '#FFA100', '#FF9D00', '#FF9900'];
const redArray = ['#FF9600', '#FF9200', '#FF8F00', '#FF8B00', '#FF8800', '#FF8400', '#FF8000', '#FF7D00', '#FF7900', '#FF7600', '#FF7200', '#FF6F00', '#FF6B00', '#FF6700', '#FF6400', '#FF6000', '#FF5D00', '#FF5900', '#FF5600', '#FF5200', '#FF4E00', '#FF4B00', '#FF4700', '#FF4400', '#FF4000', '#FF3D00', '#FF3900', '#FF3500', '#FF3200', '#FF2E00', '#FF2B00', '#FF2700', '#FF2400'];

//Making a map and tiles
var map = L.map('mapid').setView(coords_center, 14);

//We set up the tiles from OpenStreemap
const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//We add the tiles to the map
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);


document.getElementById('gotoPontiac').addEventListener('click', function() {
	map.setView(coords_center, 14);
});


//////////////////////////////
//** declare label markers**//
/////////////////////////////


var label_lowPollution = L.marker(coords_pontiac_label, {
    icon: L.divIcon({
        className: 'text-labels',   // Set class for CSS styling
        html: 21,
//      iconAnchor : L.point(30,30), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
    }),
    zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);

var label_medPollution = L.marker(coords_greenbelt_label, {
    icon: L.divIcon({
        className: 'text-labels',   // Set class for CSS styling
        html: 21,
//      iconAnchor : L.point(35,-10), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
    }),
    zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);

var label_highPollution = L.marker(coords_gsfc_label, {
    icon: L.divIcon({
        className: 'text-labels',   // Set class for CSS styling
        html: 21,
//      iconAnchor : L.point(-20,80), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
    }),
    zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);


//////////////////////////
//** declare geoJSON **//
/////////////////////////

var shapeStyle = {
		color: '#000000',
		fillColor: '#FFFFFF',
		weight: 1,
		fillOpacity: 0.3,
};


var geoJSON_lowPollution = L.geoJSON(geojson_pontiac,{
	  style: function (geoJsonFeature){
	    return {
	    	weight: 1,
			fillOpacity: 0.3,	    	
	    };}
	  }).bindPopup(function (layer) {
		    return "Pollution level =  low";
		}).addTo(map);

var geoJSON_medPollution = L.geoJSON(geojson_greenbelt,{
	  style: function (feature){
	    return {
			weight: 1,
			fillOpacity: 0.3,
	    };}
	  }).bindPopup(function (layer) {
		    return "Pollution level =  medium";
		}).addTo(map);

var geoJSON_highPollution = L.geoJSON(geojson_gsfc,{
	  style: function (feature){
	    return {
	    	//color: '#000000',
			//fillColor: '#FFFFFF',
			weight: 1,
			fillOpacity: 0.3,
	    };}
	  }).bindPopup(function (layer) {
		    return "Pollution level =  high";
		}).addTo(map);


//////////////////////////////
//** geoJSON change color **//
/////////////////////////////


var changeColor_vars_low ={ increasing: true , index_colors: 16, colorArray : greenArray, level: 'low' };//index min = 0, max = 32
var changeColor_vars_med ={ increasing: true , index_colors: 16, colorArray : yellowArray, level: 'med' };//index min = 0, max = 32
var changeColor_vars_high ={ increasing: true , index_colors: 16, colorArray : redArray, level: 'high' };//index min = 0, max = 32

//changes the color of any GeoJSON object, since they will blink at different speeds, we need different index and increasing variables, level is used for debugging the index value and speed
function changeColorGeoJSON(geoJSON_object, changeColor_vars, label){
	//Change the color of the shape to specified by index
	geoJSON_object.setStyle({fillColor: changeColor_vars.colorArray[changeColor_vars.index_colors]});
	//debugging
	//console.log(changeColor_vars.level+"_index = "+ changeColor_vars.index_colors); //debugging purposes low_index, medium_index, high_index ...
	//if we are at a max color, start going down
	if(changeColor_vars.index_colors == 32){
		changeColor_vars.increasing = false;
	}
	//if we are at a min color, start going up
	if(changeColor_vars.index_colors == 0){
		changeColor_vars.increasing = true;
	}
	if (changeColor_vars.increasing == true){
		changeColor_vars.index_colors++;
	}
	else{
		changeColor_vars.index_colors--;
	}
	
	label.setIcon(L.divIcon({
        className: 'text-labels',   // Set class for CSS styling
        html: changeColor_vars.index_colors,
        iconSize: [100, 100],
        //iconAnchor : L.point(30,30), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
    }));
}

//Low pollution
setInterval(function(){
/// call your function here
changeColorGeoJSON(geoJSON_lowPollution, changeColor_vars_low, label_lowPollution);
}, 30); 

//Med pollution
setInterval(function(){
	/// call your function here
	changeColorGeoJSON(geoJSON_medPollution, changeColor_vars_med, label_medPollution);
	}, 20);

//High pollution
setInterval(function(){
	/// call your function here
	changeColorGeoJSON(geoJSON_highPollution,changeColor_vars_high, label_highPollution);
	}, 10);

/////////////////
//** Circles **//
////////////////

//Circles[0] == pontiac greenArray
//Circles[1] == greenbelt yellowArray
//Circles[2] == gsfc redArray


//var circles = [L.circle(coords_pontiac,shapeStyle).setRadius(1000).addTo(map), 
//	L.circle(coords_greenbelt,shapeStyle).setRadius(1000).addTo(map), 
//	L.circle(coords_gsfc,shapeStyle).setRadius(1000).addTo(map) ]
var index_colors_circle = 0;
var increasing_ColorCircles = true;
function changeColorCircles(){
	circles[0].setStyle({fillColor: greenArray[index_colors_circle]});
	circles[1].setStyle({fillColor: yellowArray[index_colors_circle]});
	circles[2].setStyle({fillColor: redArray[index_colors_circle]});
	console.log(index_colors_circle);
	if(index_colors_circle == 32){
		increasing_ColorCircles = false;
	}
	if(index_colors_circle == 0){
		increasing_ColorCircles = true;
	}
	if (increasing_ColorCircles == true){
		index_colors_circle++;
	}
	else{
		index_colors_circle--;
	}
}

//setInterval(changeColorCircles, 30);



////GET LAT LONG OF MAP

var lat_mouse, long_mouse;

map.addEventListener('mousemove', function(ev) {
	lat_mouse = ev.latlng.lat;
	long_mouse = ev.latlng.lng;
});

document.getElementById("map").addEventListener("contextmenu", function (event) {
    // Prevent the browser's context menu from appearing
    event.preventDefault();

    // Add marker
    // L.marker([lat, lng], ....).addTo(map);
    alert(lat_mouse + ' , ' + long_mouse);

    return false; // To disable default popup.
});



