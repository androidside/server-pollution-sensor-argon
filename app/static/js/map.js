const coords_pontiac = [38.991433, -76.909985];
const coords_pontiac_label = [38.992428964718215 , -76.91156940689154];

const coords_greenbelt = [39.004589, -76.875622];
const coords_greenbelt_label = [39.002968579806385, -76.87826743852777];

const coords_gsfc = [38.991923, -76.852514];
const coords_gsfc_label = [38.99556433070917 , -76.84891364167106];

const coords_center = [38.992393, -76.879213];

//geoJSON change color vars
//timeouts[0] = pontiac
//timeouts[1] = greenbelt
//timeouts[2] = gsfc

const colorArray = ['#4CBB17', '#4FBB16', '#53BB16', '#56BC15', '#5ABC15', '#5DBD14', '#61BD14', '#65BE13', '#68BE13', '#6CBF12', '#6FBF12', '#73C011', '#76C011', '#7AC111', '#7EC110', '#81C210', '#85C20F', '#88C30F', '#8CC30E', '#90C40E', '#93C40D', '#97C50D', '#9AC50C', '#9EC60C', '#A1C60B', '#A5C70B', '#A9C70B', '#ACC70A', '#B0C80A', '#B3C809', '#B7C909', '#BAC908', '#BECA08', '#C2CA07', '#C5CB07', '#C9CB06', '#CCCC06', '#D0CC05', '#D4CD05', '#D7CD05', '#DBCE04', '#DECE04', '#E2CF03', '#E5CF03', '#E9D002', '#EDD002', '#F0D101', '#F4D101', '#F7D200', '#FBD200', '#FFD300', '#FFCF00', '#FFCB00', '#FFC800', '#FFC400', '#FFC100', '#FFBD00', '#FFBA00', '#FFB600', '#FFB200', '#FFAF00', '#FFAB00', '#FFA800', '#FFA400', '#FFA100', '#FF9D00', '#FF9900', '#FF9600', '#FF9200', '#FF8F00', '#FF8B00', '#FF8800', '#FF8400', '#FF8000', '#FF7D00', '#FF7900', '#FF7600', '#FF7200', '#FF6F00', '#FF6B00', '#FF6700', '#FF6400', '#FF6000', '#FF5D00', '#FF5900', '#FF5600', '#FF5200', '#FF4E00', '#FF4B00', '#FF4700', '#FF4400', '#FF4000', '#FF3D00', '#FF3900', '#FF3500', '#FF3200', '#FF2E00', '#FF2B00', '#FF2700', '#FF2400']; 
//from green to red 100 positions

//Green, Yellow, Red arrays, size = 33, center at 17th.
var greenArray = ['#4FBB16', '#53BB16', '#56BC15', '#5ABC15', '#5DBD14', '#61BD14', '#65BE13', '#68BE13', '#6CBF12', '#6FBF12', '#73C011', '#76C011', '#7AC111', '#7EC110', '#81C210', '#85C20F', '#88C30F', '#8CC30E', '#90C40E', '#93C40D', '#97C50D', '#9AC50C', '#9EC60C', '#A1C60B', '#A5C70B', '#A9C70B', '#ACC70A', '#B0C80A', '#B3C809', '#B7C909', '#BAC908', '#BECA08', '#C2CA07'];
var yellowArray = ['#C5CB07', '#C9CB06', '#CCCC06', '#D0CC05', '#D4CD05', '#D7CD05', '#DBCE04', '#DECE04', '#E2CF03', '#E5CF03', '#E9D002', '#EDD002', '#F0D101', '#F4D101', '#F7D200', '#FBD200', '#FFD300', '#FFCF00', '#FFCB00', '#FFC800', '#FFC400', '#FFC100', '#FFBD00', '#FFBA00', '#FFB600', '#FFB200', '#FFAF00', '#FFAB00', '#FFA800', '#FFA400', '#FFA100', '#FF9D00', '#FF9900'];
var redArray = ['#FF9600', '#FF9200', '#FF8F00', '#FF8B00', '#FF8800', '#FF8400', '#FF8000', '#FF7D00', '#FF7900', '#FF7600', '#FF7200', '#FF6F00', '#FF6B00', '#FF6700', '#FF6400', '#FF6000', '#FF5D00', '#FF5900', '#FF5600', '#FF5200', '#FF4E00', '#FF4B00', '#FF4700', '#FF4400', '#FF4000', '#FF3D00', '#FF3900', '#FF3500', '#FF3200', '#FF2E00', '#FF2B00', '#FF2700', '#FF2400'];
const grayArray = ['#B9BBB6', '#B4B6B1', '#B0B2AD', '#ACAEA9', '#A8A9A5', '#A3A5A1', '#9FA19D', '#9B9C99', '#979894', '#929490', '#8E908C', '#8A8B88', '#868784', '#828380', '#7D7E7C', '#797A78', '#757673', '#71726F', '#6C6D6B', '#686967', '#646563', '#60605F', '#5C5C5B', '#575857', '#535452', '#4F4F4E', '#4B4B4A', '#464746', '#424242', '#3E3E3E', '#3A3A3A', '#363636', '#353535'];


//All same color
greenArray = ['#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17', '#4CBB17'] ;
yellowArray = ['#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300', '#FFD300'];
redArray = ['#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400', '#FF2400'] ;


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


///////////////////////////////
//** declare label markers**//
/////////////////////////////


var label_pontiac = L.marker(coords_pontiac_label, {
	icon: L.divIcon({
		className: 'text-labels',   // Set class for CSS styling
		html: 21,
//		iconAnchor : L.point(30,30), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
	}),
	zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);

var label_greenbelt = L.marker(coords_greenbelt_label, {
	icon: L.divIcon({
		className: 'text-labels',   // Set class for CSS styling
		html: 21,
//		iconAnchor : L.point(35,-10), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
	}),
	zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);

var label_gsfc = L.marker(coords_gsfc_label, {
	icon: L.divIcon({
		className: 'text-labels',   // Set class for CSS styling
		html: 21,
//		iconAnchor : L.point(-20,80), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
	}),
	zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);


/////////////////////////
//** declare popups **//
///////////////////////
var popup_pontiac = L.popup().setContent('<p>Popup not set yet</p>')


//////////////////////////
//** declare geoJSON **//
////////////////////////

var shapeStyle = {
		color: '#000000',
		fillColor: '#FFFFFF',
		weight: 1,
		fillOpacity: 0.3,
};


var geoJSON_pontiac = L.geoJSON(geojson_pontiac,{
	style: function (geoJsonFeature){
		return {
			weight: 1,
			fillOpacity: 0.3,	    	
		};}
}).bindPopup(popup_pontiac).addTo(map);

var geoJSON_greenbelt = L.geoJSON(geojson_greenbelt,{
	style: function (feature){
		return {
			weight: 1,
			fillOpacity: 0.3,
		};}
}).bindPopup(function (layer) {
	return "Pollution level =  medium";
}).addTo(map);

var geoJSON_gsfc = L.geoJSON(geojson_gsfc,{
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



//** Variable declaration to change geoJSON colors **//


var changeColor_vars_low ={ increasing: true , index_colors: 16, colorArray : greenArray, level: 'low', intensity: -1, timeout: 750};//index min = 0, max = 32
var changeColor_vars_med ={ increasing: true , index_colors: 16, colorArray : yellowArray, level: 'med', intensity: -1, timeout: 500};//index min = 0, max = 32
var changeColor_vars_high ={ increasing: true , index_colors: 16, colorArray : redArray, level: 'high', intensity: -1, timeout: 100};//index min = 0, max = 32

var changeColor_vars_unset = { increasing: true , index_colors: 16, colorArray : grayArray, level: 'unset', timeout : 1000};//index min = 0, max = 32

//If we assign objects using =, we pass by reference, so all the variables will modify the same object
var changeColor_vars_pontiac = Object.assign({}, changeColor_vars_unset);
var changeColor_vars_greenbelt = Object.assign({}, changeColor_vars_unset);
var changeColor_vars_gsfc = Object.assign({}, changeColor_vars_unset);



//** Check for new readings and set variables for Timeouts **//


var prev_newReadings_map = []

function checkNewReadings(){
	if( (newReadings.length > 0) && (JSON.stringify(newReadings) != JSON.stringify(prev_newReadings_map))){	

		var got_sensor0 = false;
		var got_sensor1 = false;
		var got_sensor2 = false;

		for (var i = newReadings.length - 1 ; i >= 0 ; i--) {
			switch(newReadings[i].sensor_id){
			case '0':
				if(!got_sensor0){
					changeColor_vars_pontiac = Object.assign({}, assignChangeColorVars(newReadings[i].intensity)); 
					changeColor_vars_pontiac.intensity = newReadings[i].intensity;
					got_sensor0 = true;					
				}
				break;

			case '1':
				if(!got_sensor1){
					changeColor_vars_greenbelt = Object.assign({}, assignChangeColorVars(newReadings[i].intensity)); 
					changeColor_vars_greenbelt.intensity = newReadings[i].intensity;
					got_sensor1 = true;					
				}

				break;

			case '2':
				if(!got_sensor2){
					changeColor_vars_gsfc = Object.assign({}, assignChangeColorVars(newReadings[i].intensity)); 
					changeColor_vars_gsfc.intensity = newReadings[i].intensity; //We do it after, we don't want to overwritte the original low, med, high objects
					got_sensor2 = true;					
				}

				break;

			default: 
				console.log("ERROR Map: sensor_id not 0,1 or 2 !");

			}

			if((i==0) || (got_sensor0 && got_sensor1 && got_sensor2)){
				//If I either reached the end of the array OR I got all the 3 values I am done!
				break; //Break ouf of the for loop
			}

		}
		prev_newReadings_map =  newReadings;
	}

	else{
		//If no new readings, do nothing
	}
}



function assignChangeColorVars(intensity){

	if(intensity < 33){
		return changeColor_vars_low;
	}
	else if(intensity < 66){
		return changeColor_vars_med;
	}
	else{
		return changeColor_vars_high;			
	}

}

console.log("Test!");

///////////////////////////////
//** geoJSON change color **//
/////////////////////////////

//changes the color of any GeoJSON object, since they will blink at different speeds, we need different index and increasing variables, level is used for debugging the index value and speed
function changeColorGeoJSON(geoJSON_object, changeColor_vars, label){
	//Change the color of the shape to specified by index
	if(changeColor_vars.index_colors%2){
		geoJSON_object.setStyle({fillColor: changeColor_vars.colorArray[changeColor_vars.index_colors]});
		geoJSON_object.setStyle({fillOpacity: 0.3});
	}
	else{
		if(changeColor_vars.intensity>32){ //We blink only for yellow and red
			geoJSON_object.setStyle({fillOpacity: 0});
		}
	}
	//debugging
	//console.log(changeColor_vars.level+"_index = "+ changeColor_vars.index_colors); //debugging purposes low_index, medium_index, high_index ...
	//if we are at a max color, start going down

	if(changeColor_vars.index_colors == 32){
		changeColor_vars.increasing = false;
	}

//If we are at a min color, start going up
	if(changeColor_vars.index_colors == 0){
		changeColor_vars.increasing = true;
	}
	if (changeColor_vars.increasing == true){
		changeColor_vars.index_colors++;
	}
	else{
		changeColor_vars.index_colors--;
	}


//	Change value of the label on the geoJSON object//


	label.setIcon(L.divIcon({
		className: 'text-labels',   // Set class for CSS styling
		html: changeColor_vars.intensity,
		//iconAnchor : L.point(30,30), //First number: Positive-->Moves to the left, Second Number--> Positive moves up
	}));
	
//We set the popup content
	
	if(changeColor_vars.intensity<33){
		geoJSON_object.getPopup().setContent("Pollution Level Low at "+changeColor_vars.intensity+"/100");
	}
	else if(changeColor_vars.intensity<66){
		geoJSON_object.getPopup().setContent("Pollution Level Med at "+changeColor_vars.intensity+"/100");
	}
	else{
		geoJSON_object.getPopup().setContent("Pollution Level High at "+changeColor_vars.intensity+"/100");
	}
	
	
	

}


///////////////////////
//** Set Timeouts **//
/////////////////////


//CheckReadings timeout every second
setInterval(function(){
	checkNewReadings();
}, 1000); 



//Pontiac pollution
function loopPontiac(){
	changeColorGeoJSON(geoJSON_pontiac, changeColor_vars_pontiac, label_pontiac);
	window.setTimeout(loopPontiac, changeColor_vars_pontiac.timeout);
}
/*setInterval(function(){
//	call your function here
	changeColorGeoJSON(geoJSON_pontiac, changeColor_vars_pontiac, label_pontiac);
}, changeColor_vars_pontiac.timeout); */

//Greenbelt pollution
function loopGreenbelt(){
	changeColorGeoJSON(geoJSON_greenbelt, changeColor_vars_greenbelt, label_greenbelt);
	window.setTimeout(loopGreenbelt, changeColor_vars_greenbelt.timeout);
}
/*setInterval(function(){
//	/ call your function here
	changeColorGeoJSON(geoJSON_greenbelt, changeColor_vars_greenbelt, label_greenbelt);
},  changeColor_vars_greenbelt.timeout);
 */
//GSFC pollution
function loopGSFC(){
	changeColorGeoJSON(geoJSON_gsfc,changeColor_vars_gsfc, label_gsfc);
	window.setTimeout(loopGSFC, changeColor_vars_gsfc.timeout);
}
/*setInterval(function(){
//	The label and the changeColor_vars gets set on the checkNewReadings function
	changeColorGeoJSON(geoJSON_gsfc,changeColor_vars_gsfc, label_gsfc);
}, changeColor_vars_gsfc.timeout);*/


loopPontiac();
loopGreenbelt();
loopGSFC();

/////////////////
//** Circles **//


//Circles[0] == pontiac greenArray
//Circles[1] == greenbelt yellowArray
//Circles[2] == gsfc redArray


//var circles = [L.circle(coords_pontiac,shapeStyle).setRadius(1000).addTo(map), 
//L.circle(coords_greenbelt,shapeStyle).setRadius(1000).addTo(map), 
//L.circle(coords_gsfc,shapeStyle).setRadius(1000).addTo(map) ]
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



