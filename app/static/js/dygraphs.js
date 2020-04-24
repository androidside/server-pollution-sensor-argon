//$(document).ready(function() {
//	$.post('/getcsv').done(function(response) {
//		var csv_readings= response['csv_file'];
//		plotDygraphs(csv_readings);
//
//	}).fail(function() {
//		alert("Error, could not contact the server")
//	}).always(function(){
////		alert("finished");
//		//When we have finished executing the function we set a time to trigger it again
//		//Only if button is checked
//		if (document.getElementById('dbupdates').checked) 
//		{
//			setTimeout(triggerAsyncRequests, 2000);
//			document.getElementById('dbstatus').innerHTML = 'Updating';
//		} else {
//			document.getElementById('dbstatus').innerHTML = 'Paused';
//		}
//	});
//
//}
//);
//
//function plotDygraphs(csv_readings){
////	alert("plotDygraphs() function")
//	var data = [];
//    var t = new Date();
//    for (var i = 10; i >= 0; i--) {
//      var x = new Date(t.getTime() - i * 1000);
//      data.push([x, Math.random()]);
//    }
//
//    var g = new Dygraph(document.getElementById("div_g"), csv_readings,
//                        {
//                          drawPoints: true,
//                          showRoller: true,
//                          valueRange: [0.0, 100],
//                          labels: ['Time', 'Random']
//                        });
//}
var g;
var csv_newReadings = "";

function plotDygraphsNewReadings(newReadings){
//	alert("plotDygraphs() function")
	var data = [];
    var t = new Date();
    for (var i = 10; i >= 0; i--) {
      var x = new Date(t.getTime() - i * 1000);
      data.push([x, Math.random()]);
    }
	
    

    
   	for (var i = 0; i < newReadings.length; i++) {
   		csv_newReadings += newReadings[i].datetime + "," +  newReadings[i].intensity + "\n"
	}
    
   	var lastNPoints = 30;
   	
   
    var stringArrays = csv_newReadings.split("\n"); //stringArrays.length is always #of readingsCount +1
    //ie: .csv as follows: stringArray.length == 4
    //Date1, Value1\n --> stringArrays[0]
    //Date2, Value2\n --> stringArrays[1]
    //Date3, Value3\n --> stringArrays[2]
    //
    
    //We don't have N points on the csv, we take the first value
    if ((stringArrays.length - 1 )< lastNPoints){
    	var firstLineString = stringArrays[0];
    }
    else{ //We take the last N values
    	var firstLineString = stringArrays[stringArrays.length - 1 - lastNPoints];
    }
    var firstDateString = firstLineString.split(",")[0];
	var minDate = Date.parse(firstDateString);
	
    var lastLineString = stringArrays[stringArrays.length - 2] // Last line is empty string, so we take the one before last
    var lastDateString = lastLineString.split(",")[0]
   	var maxDate = Date.parse(lastDateString);
   	
   	if ( parseInt(readingsCount_js,10) == 0){
   		g = new Dygraph(document.getElementById("div_g"), csv_newReadings,
                        {
                         
                          title: 'Pollution in Pontiac',
                          xlabel: 'Time',
                          ylabel: 'NO2',
                          fillGraph: true,
   						  drawPoints: true,
                          showRoller: true,
                          valueRange: [0.0, 120],
                          dateWindow: [minDate, maxDate],
                          labels: ['Time', 'Pollution']
                        });
   	}
   	else{
   	 g.updateOptions( { 'file': csv_newReadings,
   		               dateWindow: [minDate, maxDate]
   		 
   	 });
   	}
}

