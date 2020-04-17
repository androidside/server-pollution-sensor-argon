
function get_database(destElem) {
//    $(destElem).html('<img src="{{ url_for('static', filename='loading.gif') }}">');
    $.post('/database').done(function(response) {
        if(response['text'] != '0'){
        	var readings = JSON.parse(response['text']);
        	show_database(destElem, readings);
        }
        else{
        	$(destElem).text('Database empty!');
        }
    }).fail(function() {
        $(destElem).text("{{ _('Error: Could not contact server.') }}");
    });
}

function show_database(destElem, readings){
	var htmlString ="";

	for (var i = 0; i < readings.length; i++) {
		
	htmlString +="<div><p><b>id</b>= "+readings[i].id+" <b>sensor_id</b>= "+readings[i].sensor_id+" <b>latitude</b>= "+readings[i].latitude+" <b>longitude</b>= "+readings[i].longitude+" <b>datetime</b>= "+readings[i].datetime+" <b>intensity</b>= "+readings[i].intensity+"</p></div>";	
	}
	
	document.getElementById(destElem).innerHTML = htmlString;
//	$(destElem).innerHTML(htmlString);
//	for loop and create HTML code to feed to destElem inner HTML

	
}