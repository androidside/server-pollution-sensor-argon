
function get_database(destElem) {
//    $(destElem).html('<img src="{{ url_for('static', filename='loading.gif') }}">');
    $.post('/database').done(function(response) {
        if(response['text'] != '0'){
        	var readings = JSON.parse(response['text']);
        	$(destElem).text('sucess!');
//        	for loop and create HTML code to feed to destElem inner HTML
        }
        else{
        	$(destElem).text('Database empty!');
        }
    }).fail(function() {
        $(destElem).text("{{ _('Error: Could not contact server.') }}");
    });
}
