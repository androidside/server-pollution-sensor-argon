//var chart;

var lastNPoints = 30;




//function initializeChart(){

//////We assign the elements of newReading object to separate arrays for intensity and datetime
//newReadings.forEach(function(item){
//newReadings_intensity.push(item.intensity);
//newReadings_date.push(moment(item.datetime.slice(0,-4))); // we delete the last 4 milisecond numbers, from YYYY-MM-DD HH:mm:ss:SSSSSS to YYYY-MM-DD HH:mm:ss:SS and convert it to moment object
//});

//var ctx_config_chartHourPontiac = document.getElementById('chartHourPontiac').getContext('2d');

//newReadings_date = newReadings_date.slice(-lastNPoints)

//newReadings_intensity = newReadings_intensity.slice(-lastNPoints);

//var config_chartHourPontiac = {
////The type of chart we want to create
//type: 'line',

////The data for our dataset
//data: {
//labels: newReadings_date,
//datasets: [{
//label: "Pollution in Pontiac",
//backgroundColor: 'rgb(255, 99, 132)',
//borderColor: 'rgb(255, 99, 132)',
//data: newReadings_intensity,
//}]
//},
////Configuration options go here
//options: {
//scales: {
//xAxes: [{
//type: 'time',
//time: {
//displayFormats: {
//second: 'HH:mm:ss'
//}
//},
//distribution: 'linear'
//}]
//},
//animation: {
//duration: 1000,
//easing: 'linear'
//}
//}
//};

//chartHour_pontiac = new Chart(ctx_config_chartHourPontiac,config_chartHourPontiac); 
//setInterval(updateChart,1000);

//}

//initializeChart();
//console.log("Chart initialized");

//function updateChart(){

//if( (newReadings.length > 0) && (JSON.stringify(newReadings) != JSON.stringify(prev_newReadings))){	
////We assign the elements of newReading object to separate arrays for intensity and datetime
//newReadings.forEach(function(item){
//newReadings_intensity.push(item.intensity);
//newReadings_date.push(moment(item.datetime.slice(0,-4))); // we delete the last 4 milisecond numbers, from YYYY-MM-DD HH:mm:ss:SSSSSS to YYYY-MM-DD HH:mm:ss:SS and convert it to moment object
//});

////Add new intensity value to dataset[0].data array
//newReadings_intensity.forEach(function (item){
//chart.data.datasets[0].data.push(item);
//});

//newReadings_date.forEach(function (item){
//chart.data.labels.push(item);
//});

//chart.data.labels = chart.data.labels.slice(-lastNPoints);
//chart.data.datasets[0].data = chart.data.datasets[0].data.slice(-lastNPoints);


//chart.data.datasets[0].data= chart.data.datasets[0].data.slice(-lastNPoints)
//chart.data.labels= chart.data.labels.slice(-lastNPoints)

//chart.update();
//prev_newReadings =  newReadings;
//}
//else{

//var last_newReadings_intensity = newReadings[newReadings.length -1].intensity;
//var last_newReadings_date = moment(newReadings[newReadings.length -1].datetime.slice(0,-4));

//chart.data.datasets[0].data.push(last_newReadings_intensity);
//chart.data.labels.push(last_newReadings_date);
//chart.update();
//console.log("No new readings");
//}

//}





//var ahora = Date.now();



function randomScalingFactor() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}



window.onload = function() {
	var ctx = document.getElementById('chartLive_pontiac').getContext('2d');
	window.chartLive_pontiac = new Chart(ctx, config_pontiac);

};

//Variable to determine if we are using Internet Explorer
var isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident') !== -1;


document.getElementById('duration_pontiac').addEventListener(isIE ? 'change' : 'input', function() {
	let duration = 0;
	let delay = 0;

	switch(+this.value){
	case 5: //Live Data
		duration = 60000; //We default to 60 seconds
		break;
	case 4:
		duration = 60*5*1000; //5 min
		break;	
	case 3:
		duration = 60*10*1000; //10min
		break;
	case 2:
		duration = 60*30*1000; //30min
		break;
	case 1:
		duration = 60*60*1000*1; //1h
		break;
	case 0:
		duration = 60*60*1000*2; //2h
		break;	
	default: 
		console.log("ERROR Chart slider !");

	}


	config_pontiac.options.scales.xAxes[0].realtime.duration = duration;
	config_pontiac.options.scales.xAxes[0].realtime.delay = delay;

	window.chartLive_pontiac.update({duration: 0});
});

document.getElementById('livedata').addEventListener('click', function() {
	//Change duration here
	config_pontiac.options.scales.xAxes[0].realtime.duration = 50000; //We default to 50 seconds
	config_pontiac.options.scales.xAxes[0].realtime.delay = 0;
	window.chartLive_pontiac.update({duration: 0});

	document.getElementById('duration_pontiac').value = '5';
});

document.getElementById('last5min').addEventListener('click', function() {
//	Change duration here
	config_pontiac.options.scales.xAxes[0].realtime.duration = 60*5*1000;
	window.chartLive_pontiac.update({duration: 0});
	document.getElementById('duration_pontiac').value = '4';
});

/*document.getElementById('lastdaydata').addEventListener('click', function() {
	//Change duration here
	config.options.scales.xAxes[0].realtime.duration = 86400000;
	window.chartLive_pontiac.update({duration: 0});
});*/

function toggle_pontiac() // Index 0
{
	show_hide_chart(0);
	var elem = document.getElementById("togglePontiac");
	if (elem.value=="Hide Pontiac") {

		elem.value = "Show Pontiac";
	}
	else{
		elem.value = "Hide Pontiac";
	}
}

function toggle_greenbelt() // Index 1
{
	show_hide_chart(1);
	var elem = document.getElementById("toggleGreenbelt");
	if (elem.value=="Hide Greenbelt") {

		elem.value = "Show Greenbelt";
	}
	else{
		elem.value = "Hide Greenbelt";
	}
}

function toggle_gsfc() // Index 1
{
	show_hide_chart(2);
	var elem = document.getElementById("toggleGSFC");
	if (elem.value=="Hide GSFC") {

		elem.value = "Show GSFC";
	}
	else{
		elem.value = "Hide GSFC";
	}
}

function show_hide_chart(index){

	var ci = this.chartLive_pontiac;
	var meta = ci.getDatasetMeta(index);

	// See controller.isDatasetVisible comment
	meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

	// We hid a dataset ... rerender the chart
	ci.update();
}

//var colorNames = Object.keys(chartColors);
/*document.getElementById('sendSMS').addEventListener('click', function() {
	alert("Will send you an SMS someday (maybe)");

});*/

document.getElementById('downloadData').addEventListener('click', function() {
	alert("Feature not available yet");
});


