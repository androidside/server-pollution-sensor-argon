
function get_database(readingsHolder, readingsCountHolder) {
//	$(destElem).html('<img src="{{ url_for('static', filename='loading.gif') }}">');
	$.post('/database').done(function(response) {
		if(response['text'] != '0'){
			var readings = JSON.parse(response['text']);
			show_database(readingsHolder, readingsCountHolder, readings);
		}
		else{
			$(readingsHolder).text('Database empty!');
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
////	do some stuff
//	var counter = parseInt(document.getElementById(destElem).textContent);
//	counter++;
//	textContent = counter.toString();
//	document.getElementById(destElem).textContent = textContent;	
//}

function triggerAsyncRequests(){
	//increaseCounter('#counterValue');
	get_database('#databaseReadingsText','#databaseReadingsCount');
}

//When the page loads we start all the async request functions, which will happen every X seconds
window.onload = function() {
	setTimeout(triggerAsyncRequests, 2000);
};




//window.setInterval(function(){
///// call your function here
//increaseCounter('#counterValue');
//get_database('#databaseReadingsText','#databaseReadingsCount');

//}, 1000);  // Change Interval here to test. For eg: 5000 for 5 sec

function show_database(readingsHolder, readingsCountHolder, readings){
	var htmlString ="";

//	for loop and create HTML code to feed to destElem inner HTML

	for (var i = 0; i < readings.length; i++) {

		htmlString +="<div><p><b>id</b>= "+readings[i].id+" <b>sensor_id</b>= "+readings[i].sensor_id+" <b>latitude</b>= "+readings[i].latitude+" <b>longitude</b>= "+readings[i].longitude+" <b>datetime</b>= "+readings[i].datetime+" <b>intensity</b>= "+readings[i].intensity+"</p></div>";	
	}

	document.getElementById(readingsHolder).innerHTML = htmlString;
	document.getElementById(readingsCountHolder).innerHTML = readings.length.toString();
	
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

