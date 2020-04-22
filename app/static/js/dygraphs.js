$(document).ready(function() {
	$.post('/getcsv').done(function(response) {
		var csv_readings= response['csv_file'];
		plotDygraphs(csv_readings);

	}).fail(function() {
		alert("Error, could not contact the server")
	}).always(function(){
//		alert("finished");
		//When we have finished executing the function we set a time to trigger it again
		//Only if button is checked
		if (document.getElementById('dbupdates').checked) 
		{
			setTimeout(triggerAsyncRequests, 2000);
			document.getElementById('dbstatus').innerHTML = 'Updating';
		} else {
			document.getElementById('dbstatus').innerHTML = 'Paused';
		}
	});

}
);

function plotDygraphs(csv_readings){
//	alert("plotDygraphs() function")
	var data = [];
    var t = new Date();
    for (var i = 10; i >= 0; i--) {
      var x = new Date(t.getTime() - i * 1000);
      data.push([x, Math.random()]);
    }

    var g = new Dygraph(document.getElementById("div_g"), csv_readings,
                        {
                          drawPoints: true,
                          showRoller: true,
                          valueRange: [0.0, 100],
                          labels: ['Time', 'Random']
                        });

}

