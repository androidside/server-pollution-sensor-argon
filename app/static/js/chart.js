//var chart;

var lastNPoints = 30;

var newReadings_intensity = []
var newReadings_date = []
var prev_newReadings = []


//function initializeChart(){

////We assign the elements of newReading object to separate arrays for intensity and datetime
//newReadings.forEach(function(item){
//newReadings_intensity.push(item.intensity);
//newReadings_date.push(moment(item.datetime.slice(0,-4))); // we delete the last 4 milisecond numbers, from YYYY-MM-DD HH:mm:ss:SSSSSS to YYYY-MM-DD HH:mm:ss:SS and convert it to moment object
//});

//var ctx = document.getElementById('myChart').getContext('2d');

//newReadings_date = newReadings_date.slice(-lastNPoints)

//newReadings_intensity = newReadings_intensity.slice(-lastNPoints);

//var config = {
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

//chart = new Chart(ctx, config); 
//setInterval(updateChart,500);

//}

//initializeChart();


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


////chart.data.datasets[0].data= chart.data.datasets[0].data.slice(-lastNPoints)
////chart.data.labels= chart.data.labels.slice(-lastNPoints)

//chart.update();
//prev_newReadings =  newReadings;
//}
//else{

//var last_newReadings_intensity = newReadings[newReadings.length -1].intensity;
//var last_newReadings_date = moment(newReadings[newReadings.length -1].datetime.slice(0,-4));

//chart.data.datasets[0].data.push(last_newReadings_intensity);
//chart.data.labels.push(last_newReadings_date);
//chart.update();
////console.log("No new readings");
//}

////}
//////after




var ahora = Date.now();

var chartColors = {
		red: 'rgb(255, 99, 132)',
		orange: 'rgb(255, 159, 64)',
		yellow: 'rgb(255, 205, 86)',
		green: 'rgb(75, 192, 192)',
		blue: 'rgb(54, 162, 235)',
		purple: 'rgb(153, 102, 255)',
		grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart) {

	var array = [1,2,3,4,5,6,7,8,9,10];

	//If we have new readings we add them to the dataset
	if( (newReadings.length > 0) && (JSON.stringify(newReadings) != JSON.stringify(prev_newReadings))){	

		////We assign the elements of newReading object to separate arrays for intensity and datetime
		newReadings.forEach(function(item){
			newReadings_intensity.push(item.intensity);
			newReadings_date.push(1000 * moment(item.datetime.slice(0,-4)).unix()); // we delete the last 4 milisecond numbers, from YYYY-MM-DD HH:mm:ss:SSSSSS to YYYY-MM-DD HH:mm:ss:SS and convert it to moment object
			//.unix() returns time in seconds since 1970, we need in ms!
		});

		chart.config.data.datasets.forEach(function(dataset) {
			for (var i = 0; i < newReadings_intensity.length; i++) {
				dataset.data.push({
					x: newReadings_date[i],
					y: newReadings_intensity[i]
				});
			}		
		});

		newReadings_intensity = [];
		newReadings_date = [];		
		prev_newReadings =  newReadings;
	}
}

var color = Chart.helpers.color;
var config = {
		type: 'line',
		data: {
			datasets: [{
				label: 'Pollution (linear interpolation)',
				backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
				borderColor: chartColors.red,
				fill: false,
				lineTension: 0,
				borderDash: [8, 4],
				data: []
			}, {
				label: 'Pollution (cubic interpolation)',
				backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
				borderColor: chartColors.blue,
				fill: false,
				cubicInterpolationMode: 'monotone',
				data: []
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Pontiac Street',
				fontSize: 36,				
				position: 'top',
			},
			scales: {
				xAxes: [{
					type: 'realtime',
					realtime: {
						duration: 50000,
						refresh: 1000,
						delay: -(14400000 - 20000),
						onRefresh: onRefresh
					},
					scaleLabel: {
						display: true,
						labelString: 'Time un UTC',
						fontSize: 32,
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'NO2 Pollution Level',
						fontSize: 32,	
					}
				}]
			},
			tooltips: {
				mode: 'nearest',
				intersect: false
			},
			hover: {
				mode: 'nearest',
				intersect: false
			},
			legend: {
				display: true,
				labels: {
					fontSize: 16,
					fontStyle: 'bold',
					align: 'center',
				}
			},
			plugins: {
				streaming: {
					frameRate: 15
				}
//			colorschemes:{
//			scheme: 'brewer.Paired12',
//			override: true,
//			}
			}
		}
};

window.onload = function() {
	var ctx = document.getElementById('myChart').getContext('2d');
	window.myChart = new Chart(ctx, config);
};

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


