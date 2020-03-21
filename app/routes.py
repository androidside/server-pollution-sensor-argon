from app import app, db
from flask import render_template, flash, redirect, url_for, request, jsonify
from app.forms import SensorForm
from datetime import datetime
from app.models import Reading
from app.api.errors import bad_request
import random
import json


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

@app.route('/add_five_readings', methods=['GET'])
def add_five_readings():
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