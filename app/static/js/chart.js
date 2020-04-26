var chart;

var lastNPoints = 30;

var newReadings_intensity = []
var newReadings_date = []
var prev_newReadings = []


function initializeChart(){

	//We assign the elements of newReading object to separate arrays for intensity and datetime
	newReadings.forEach(function(item){
		newReadings_intensity.push(item.intensity);
		newReadings_date.push(moment(item.datetime.slice(0,-4))); // we delete the last 4 milisecond numbers, from YYYY-MM-DD HH:mm:ss:SSSSSS to YYYY-MM-DD HH:mm:ss:SS and convert it to moment object
	});

	var ctx = document.getElementById('myChart').getContext('2d');

	newReadings_date = newReadings_date.slice(-lastNPoints)

	newReadings_intensity = newReadings_intensity.slice(-lastNPoints);

	var config = {
			// The type of chart we want to create
			type: 'line',

			// The data for our dataset
			data: {
				labels: newReadings_date,
				datasets: [{
					label: "Pollution in Pontiac",
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: newReadings_intensity,
				}]
			},
			// Configuration options go here
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							displayFormats: {
								second: 'HH:mm:ss'
							}
						},
						distribution: 'linear'
					}]
				},
				animation: {
					duration: 1000,
					easing: 'linear'
				}
			}
	};

	chart = new Chart(ctx, config); 
	setInterval(updateChart,500);

}

initializeChart();


function updateChart(){

	if( (newReadings.length > 0) && (JSON.stringify(newReadings) != JSON.stringify(prev_newReadings))){	
		//We assign the elements of newReading object to separate arrays for intensity and datetime
		newReadings.forEach(function(item){
			newReadings_intensity.push(item.intensity);
			newReadings_date.push(moment(item.datetime.slice(0,-4))); // we delete the last 4 milisecond numbers, from YYYY-MM-DD HH:mm:ss:SSSSSS to YYYY-MM-DD HH:mm:ss:SS and convert it to moment object
		});

		//Add new intensity value to dataset[0].data array
		newReadings_intensity.forEach(function (item){
			chart.data.datasets[0].data.push(item);
		});

		newReadings_date.forEach(function (item){
			chart.data.labels.push(item);
		});

		chart.data.labels = chart.data.labels.slice(-lastNPoints);
		chart.data.datasets[0].data = chart.data.datasets[0].data.slice(-lastNPoints);


//		chart.data.datasets[0].data= chart.data.datasets[0].data.slice(-lastNPoints)
//		chart.data.labels= chart.data.labels.slice(-lastNPoints)

		chart.update();
		prev_newReadings =  newReadings;
	}
	else{
		
		var last_newReadings_intensity = newReadings[newReadings.length -1].intensity;
		var last_newReadings_date = moment(newReadings[newReadings.length -1].datetime.slice(0,-4));
		
		chart.data.datasets[0].data.push(last_newReadings_intensity);
		chart.data.labels.push(last_newReadings_date);
		chart.update();
//		console.log("No new readings");
	}

}
////after


