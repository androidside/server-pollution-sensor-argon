var readingsCount_js;
var readingsCount_db;

function get_database(readingsHolder, readingsCountHolder) {
//	$(destElem).html('<img src="{{ url_for('static', filename='loading.gif') }}">');
	$.post('/database', {
		text: readingsCount_js.toString()
	}).done(function(response) {
		if(response['text'] != '0'){
			var newReadings = JSON.parse(response['text']);
			if(newReadings.length != 0){ //We have updates
				show_database(readingsHolder, readingsCountHolder, newReadings);
			}
		}
		else{
			//Database Empty
			document.getElementById(readingsHolder).innerHTML = "";
		}
	}).fail(function() {
		$(readingsHolder).text("{{ _('Error: Could not contact server.') }}");
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

/* Function moved to show_database count*/
//function increaseCounter(destElem){
////do some stuff
//var counter = parseInt(document.getElementById(destElem).textContent);
//counter++;
//textContent = counter.toString();
//document.getElementById(destElem).textContent = textContent;	
//}

function triggerAsyncRequests(){
	//increaseCounter('#counterValue');
	//We trigger the get_database function with the current readingsCount_js
	get_database('#databaseReadingsText','#databaseReadingsCount');
}

//When the page loads we start all the async request functions, which will happen every X seconds
window.onload = function() {
	readingsCount_js = parseInt("0",10) //We will request all Readings from the database 
	setTimeout(triggerAsyncRequests, 2000);
};




//window.setInterval(function(){
///// call your function here
//increaseCounter('#counterValue');
//get_database('#databaseReadingsText','#databaseReadingsCount');

//}, 1000);  // Change Interval here to test. For eg: 5000 for 5 sec

function show_database(readingsHolder, readingsCountHolder, newReadings){
	var htmlString ="";

//	for loop and create HTML code to feed to destElem inner HTML

	for (var i = 0; i < newReadings.length; i++) {

		htmlString +="<div><p><b>id</b>= "+newReadings[i].id+" <b>sensor_id</b>= "+newReadings[i].sensor_id+" <b>latitude</b>= "+newReadings[i].latitude+" <b>longitude</b>= "+newReadings[i].longitude+" <b>datetime</b>= "+newReadings[i].datetime+" <b>intensity</b>= "+newReadings[i].intensity+"</p></div>";	
	}

	readingsCount_db = parseInt(newReadings[newReadings.length -1].id, 10); //Number of reading entries in the database

	if (readingsCount_db > readingsCount_js){ //If the database has more elements than we currently have on the javascript, we append
		document.getElementById(readingsHolder).innerHTML += htmlString;

	}else if ((0 < parseInt(readingsCount_db, 10)) && (parseInt(readingsCount_db,10) < parseInt(readingsCount_js,10)) ){ //database was deleted but it got new entries before it sent out readings
		document.getElementById(readingsHolder).innerHTML = htmlString;
	}
	readingsCount_js = readingsCount_db;
	document.getElementById(readingsCountHolder).innerHTML = (readingsCount_js).toString();

	//Increase show_database counter
	var counter = parseInt(document.getElementById('#counterValue').textContent);
	counter++;
	textContent = counter.toString();
	document.getElementById('#counterValue').textContent = textContent;

//	$(destElem).innerHTML(htmlString);

}

//Function used to capture the value of the checkbox to stop the script
function db_updates()
{
	if (document.getElementById('dbupdates').checked) 
	{
		document.getElementById('dbstatus').innerHTML = 'Update requested';
		//We trigger the function 1 time so it can start to get called over and over
		setTimeout(triggerAsyncRequests, 2000);

	} else {
		document.getElementById('dbstatus').innerHTML = 'Pause requested';
	}
}

