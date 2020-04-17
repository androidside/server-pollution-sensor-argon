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


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = SensorForm()
#     if request.method == 'GET':
#         form.datetime.data = datetime.utcnow()
    if form.validate_on_submit():
        reading = Reading(sensor_id=form.sensor_id.data, latitude=form.latitude.data,
                          longitude=form.longitude.data, datetime=datetime.utcnow(), intensity=form.intensity.data)
        db.session.add(reading)
        db.session.commit()
#       flash('Input submitted for sensor with id {}, latitude={}, longitude={}, datetime={}, intensity={}'.format(
#             form.id.data, form.latitude.data, form.longitude.data, form.datetime.data, form.intensity.data))
        flash('Input submitted')
        return redirect(url_for('index'))
    
    readings = Reading.query.all(); 
    return render_template('index.html', title='Home', readings=readings, form=form)

@app.route('/delete_all_readings', methods=['GET'])
def delete_all_readings():
    readings = Reading.query.all(); 
    for r in readings:
        db.session.delete(r)
        db.session.commit()   
    return redirect(url_for('index'))

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
    reading.from_dict_mtqq(dictionary)
    db.session.add(reading)
    db.session.commit()
    return redirect(url_for('index'))
    
    
@app.route('/send_five_readings_mtqq', methods=['GET'])
def send_five_readings_mtqq():
    for i in range(5):
        datetimeraw=datetime.utcnow()
#         datetimeclean=datetime.strftime(datetimeraw, '%Y-%#m-%#d')
#         datetimeclean=datetime.strftime(datetimeraw, '%Y-%m-%d %H:%M:%S.%f')
#         datetimeobject=datetime.utcnow().strftime('%#Y-%#m-%#d %#H:%#M:%#S.%#f')
        reading = Reading(sensor_id= random.randint(1,11),
                          latitude=random.uniform(-90, 90),
                          longitude=random.uniform(0, 180),
                          datetime=datetime.utcnow(),
                          intensity=random.randint(1,101))
        #jsontosend=json.dumps(reading.format_mtqq_message(), indent=4, sort_keys=True, default=str)
        message=reading.format_mtqq_message()
        mqtt.publish('home/mytopic', message)
    return redirect(url_for('index'))

@app.route('/add_five_readings_to_db', methods=['GET'])
def add_five_readings_to_db():
    for i in range(5):
        reading = Reading(sensor_id= random.randint(1,11),
                          latitude=random.uniform(-90, 90),
                          longitude=random.uniform(0, 180),
                          datetime=datetime.utcnow(),
                          intensity=random.randint(1,101))
        db.session.add(reading)
    db.session.commit()
    return redirect(url_for('index'))

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


@app.route('/database', methods=['POST'])
def send_database():
    readings = Reading.query.all();
    if len(readings)>0 :
        list=[]
        for r in readings:
                list.append(r.to_dict())
        return jsonify({'text' : json.dumps(list)}) #return request
    #Database empty
    else:
        return jsonify({'text': 0});