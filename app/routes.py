from app import app, db, mqtt
from flask import render_template, flash, redirect, url_for, request, jsonify
from app.forms import SensorForm
from datetime import datetime
from app.models import Reading
from app.api.errors import bad_request
import random
import json
import ast
import time
from flask_csv import send_csv


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = SensorForm()
#     if request.method == 'GET':
#         form.datetime.data = datetime.now()
    if form.validate_on_submit():
        reading = Reading(sensor_id=form.sensor_id.data, latitude=form.latitude.data,
                          longitude=form.longitude.data, datetime=datetime.now(), intensity=form.intensity.data)
        db.session.add(reading)
        db.session.commit()
#       flash('Input submitted for sensor with id {}, latitude={}, longitude={}, datetime={}, intensity={}'.format(
#             form.id.data, form.latitude.data, form.longitude.data, form.datetime.data, form.intensity.data))
        flash('Input submitted')
        return redirect(url_for('index'))
    
    readings = Reading.query.all(); 
    return render_template('index.html', title='Home', readings=readings, form=form)

@app.route('/delete_all_readings', methods=['GET', 'POST'])
def delete_all_readings():
    password_sent = request.form['text'];
    if(password_sent == 'pituti'):
        readings = Reading.query.all(); 
        for r in readings:
            db.session.delete(r)
            db.session.commit()   
        return jsonify({'text' : 1}), 200;
    else:
        return jsonify({'text': 0}); #We send 0 and we will check on the javascript if 0 was sent from this function

# @mqtt.on_connect()
# def handle_connect(client, userdata, flags, rc):
#     mqtt.subscribe('home/mytopic')

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
        )
    reading = Reading()
    payload='{'+message.payload.decode()+'}'
    dictionary = ast.literal_eval(payload)
    #convert to a dictionary
    reading.from_dict_mqtt(dictionary)
    db.session.add(reading)
    db.session.commit()
    return redirect(url_for('index'))
    
    
@app.route('/send_five_readings_mqtt', methods=['GET', 'POST'])
def send_five_readings_mqtt():
    for i in range(5):
        datetimeraw=datetime.now()
#         datetimeclean=datetime.strftime(datetimeraw, '%Y-%#m-%#d')
#         datetimeclean=datetime.strftime(datetimeraw, '%Y-%m-%d %H:%M:%S.%f')
#         datetimeobject=datetime.now().strftime('%#Y-%#m-%#d %#H:%#M:%#S.%#f')
        reading = Reading(sensor_id= random.randint(0,2),
                          latitude=random.uniform(-90, 90),
                          longitude=random.uniform(0, 180),
                          datetime=datetime.now(),
                          intensity=random.randint(0,98))
        #jsontosend=json.dumps(reading.format_mqtt_message(), indent=4, sort_keys=True, default=str)
        message=reading.format_mqtt_message()
        mqtt.publish('home/mytopic', message)
    return jsonify({'text' : 1}), 200;

@app.route('/add_five_readings_to_db', methods=['GET', 'POST'])
def add_five_readings_to_db():
    for i in range(5):
        reading = Reading(sensor_id= random.randint(0,2), #Between [0,2]
                          latitude=random.uniform(-90, 90),
                          longitude=random.uniform(0, 180),
                          datetime=datetime.now(),
                          intensity=random.randint(0,98)) #[0, 98]
        db.session.add(reading)
    db.session.commit()
    #return redirect(url_for('index'))
    return jsonify({'text' : 1}), 200;

@app.route('/add_reading', methods=['POST'])
def add_reading(): 
    data = request.get_json() or {}
    if 'sensor_id' not in data or 'latitude' not in data or 'longitude' not in data or 'datetime' not in data or 'intensity' not in data:
        return bad_request('must include full sensor info')
    reading = Reading()
    reading.from_dict(json.loads(data))
    db.session.add(reading)
    db.session.commit()
    return jsonify(data),200

@app.route('/postReadingESP32', methods=['POST'])
def postReadingESP32(): 
    data = request.get_json() or {}
    if 'sensor_id' not in data or 'latitude' not in data or 'longitude' not in data or 'datetime' not in data or 'intensity' not in data:
        return bad_request('must include full sensor info')
    reading = Reading()
#   data is already a dictionary {'key1' : 'value1', 'key2' : 'value2'}
    reading.from_dict_noDateTime(data)
    db.session.add(reading)
    db.session.commit()
    return jsonify(data),200 #I need to return a tuple, a JSON with a status code



@app.route('/database', methods=['POST'])
def send_database():
    readingsCount_js = int(request.form['text']); #We check how many readings does the server have
    #Query id of last element on database
    lastReading = Reading.query.order_by(Reading.id.desc()).first() #We pull the last item in the database
    if lastReading == None:
        return jsonify({'text': 0}); #We send 0 and we will check on the javascript if 0 was sent from this function     
    else: #database not empty        
        readingsCount_db = lastReading.id # update the total count of Readings in the database 
        #Query newReadings from readingsCount_js to last element in db  
        newReadings =  Reading.query.order_by(Reading.id.desc()).limit(readingsCount_db-readingsCount_js) #just query the last n
        newReadings = newReadings [::-1] #all items in the array reversed
        list=[]
        for r in newReadings:
            list.append(r.to_dict())
        return jsonify({'text' : json.dumps(list)}) #return request
        
    

@app.route('/getcsv', methods=['POST'])
def get_csv():  
    #get optional arguments, for now just query all elements in db
    readings = Reading.query.all();
    if len(readings)>0 :
        #csv_string = "date, intensity\n"
        csv_string =""
        for r in readings:
            csv_string += r.to_csvfields()
        return jsonify({'csv_file' : csv_string}) #return request 
    #Database empty
    else:
        return jsonify({'csv_file': 0}); #We send 0 and we will check on the javascript if 0 was sent from this function
    
             
 
    
    
    
def pretty_print_POST(req):
    """
    At this point it is completely built and ready
    to be fired; it is "prepared".

    However pay attention at the formatting used in 
    this function because it is programmed to be pretty 
    printed and may differ from the actual request.
    """
# Request doesnt have body ?     
#     print('{}\n{}\r\n{}\r\n\r\n{}'.format(
#         '-----------START-----------',
#         req.method + ' ' + req.url,
#         '\r\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
#         req.body,
#     ))

    print('{}\n{}\r\n{}\r\n\r\n{}'.format(
        '-----------START-----------',
        req.method + ' ' + req.url,
        '\r\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
        req.url,
    ))

