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
	if (+this.value == 5){
		duration = 50000; //We default to 50 seconds
	}
	else{//4 -> 1hour ...  3-> 2hours ... 2-> 3hour ... 1--> 4hours  ... 0-> 5hours
		duration = (5 - this.value) * 3600 * 1000 // #hours * milliseconds
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

document.getElementById('lasthourdata').addEventListener('click', function() {
//	Change duration here
	config_pontiac.options.scales.xAxes[0].realtime.duration = 3600000;
	window.chartLive_pontiac.update({duration: 0});
	document.getElementById('duration_pontiac').value = '4';
});

/*document.getElementById('lastdaydata').addEventListener('click', function() {
	//Change duration here
	config.options.scales.xAxes[0].realtime.duration = 86400000;
	window.chartLive_pontiac.update({duration: 0});
});*/

document.getElementById('sendEmail').addEventListener('click', function() {
	alert("Will send you an email someday");
});

//var colorNames = Object.keys(chartColors);
document.getElementById('sendSMS').addEventListener('click', function() {
	alert("Will send you an SMS someday (maybe)");

});

document.getElementById('downloadData').addEventListener('click', function() {
	alert("Feature not available yet");
});


