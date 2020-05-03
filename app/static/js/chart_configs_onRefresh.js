var newReadings_intensity = []
var newReadings_date = []
var newReadings_sensor_id = []
var prev_newReadings_chart = []


var chartColors = {
		red: 'rgb(255, 99, 132)',
		orange: 'rgb(255, 159, 64)',
		yellow: 'rgb(255, 205, 86)',
		green: 'rgb(75, 192, 192)',
		blue: 'rgb(54, 162, 235)',
		purple: 'rgb(153, 102, 255)',
		grey: 'rgb(201, 203, 207)'
};


/*PONTIAC DEFINITIONS */
///////////////////////


function onRefresh_pontiac(chart) {

	//var array = [1,2,3,4,5,6,7,8,9,10]; //was used for debugging

	//If we have new readings we add them to the dataset
	if( (newReadings.length > 0) && (JSON.stringify(newReadings) != JSON.stringify(prev_newReadings_chart))){	

		////We assign the elements of newReading object to separate arrays for intensity and datetime
		newReadings.forEach(function(item){
			newReadings_intensity.push(item.intensity);
			newReadings_date.push(1000 * moment(item.datetime.slice(0,-4)).unix()); // we delete the last 4 milisecond numbers, from YYYY-MM-DD HH:mm:ss:SSSSSS to YYYY-MM-DD HH:mm:ss:SS and convert it to moment object
			//.unix() returns time in seconds since 1970, we need in ms!
			newReadings_sensor_id.push(item.sensor_id);
		});
//////////////////////////////////////////////////I will have to create a newReadings_sensor_id array above, and swtich() to update the appropiate chart. The parameter "chart" it will be an array of 3 live charts !
		/*	chart.config.data.datasets.forEach(function(dataset) {

			for (var i = 0; i < newReadings_intensity.length; i++) {
				dataset.data.push({
					x: newReadings_date[i],
					y: newReadings_intensity[i]
				});
			}		
		});*/
/////////////////////////////////////////////////Original code above for just 1 graph


		for (var i = 0; i < newReadings_intensity.length; i++) {
			switch(newReadings_sensor_id[i]){
			case '0':
			/*	chart.config.data.datasets[0].data.push({ //Linear interpolation, now unused
					x: newReadings_date[i],
					y: newReadings_intensity[i]
				});*/
				chart.config.data.datasets[0].data.push({
					x: newReadings_date[i],
					y: newReadings_intensity[i]
				});
				break;

			case '1':
				chart.config.data.datasets[1].data.push({
					x: newReadings_date[i],
					y: newReadings_intensity[i]
				});
				break;

			case '2':
				chart.config.data.datasets[2].data.push({
					x: newReadings_date[i],
					y: newReadings_intensity[i]
				});
				break;

			default: 
				console.log("ERROR Chart: sensor_id not 0,1 or 2 !");
			}

		}		

		newReadings_intensity = [];
		newReadings_date = [];		
		newReadings_sensor_id = [];
		prev_newReadings_chart =  newReadings;
	}
	else{
		//If no new readings, do nothing
		
	}
}

var color = Chart.helpers.color;
var config_pontiac = {
		type: 'line',
		data: {
			datasets: [/*{
				label: 'Pontiac (linear interpolation)',
				backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
				borderColor: chartColors.blue,
				fill: false,
				lineTension: 0,
				borderDash: [8, 4],
				data: []
			}, */{
				label: 'Pontiac (low)',
				backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
				borderColor: chartColors.orange,
				fill: false,
				cubicInterpolationMode: 'monotone',
				data: []
			}, {
				label: 'Greenbelt (med)',
				backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
				borderColor: chartColors.blue,
				fill: false,
				cubicInterpolationMode: 'monotone',
				data: []
			}, {
				label: 'NASA Goddard (high)',
				backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
				borderColor: chartColors.purple,
				fill: false,
				cubicInterpolationMode: 'monotone',
				data: []
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Pollution Washington DC area',
				fontSize: 36,				
				position: 'top',
			},
			scales: {
				xAxes: [{
					type: 'realtime',
					realtime: {
						duration: 50000, //default window is 50 seconds
						ttl: 3600000*2, // 86400000 =  1 day, 3600000 = 1 hour for how long we keep the data in milliseconds (1 day = 86400000 ms) 
						refresh: 1000, //refresh data every second
						delay: 0, //30000//If time were in UTC it would be -(14400000 - 20000), so push graph (4 hours of offset - 20 seconds). The 20 seconds are for buffering
						pause: false,
						onRefresh: onRefresh_pontiac
					},
					scaleLabel: {
						display: true,
						labelString: 'Time in EST',
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
					usePointStyle: false,
				}
			},
			plugins: {
				streaming: {
					frameRate: 15
				},
			responsive: false,
	        maintainAspectRatio: false,
//			colorschemes:{
//			scheme: 'brewer.Paired12',
//			override: true,
//			}
			},
//			responsive: true
		}
};