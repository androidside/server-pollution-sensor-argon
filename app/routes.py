from app import app, db
from flask import render_template, flash, redirect, url_for, request
from app.forms import SensorForm
from datetime import datetime
from app.models import Reading

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = SensorForm()
    if request.method == 'GET':
        form.datetime.data = datetime.utcnow()
    form.datetime
    if form.validate_on_submit():
#         flash('Input submitted for sensor with id {}, latitude={}, longitude={}, datetime={}, intensity={}'.format(
#             form.id.data, form.latitude.data, form.longitude.data, form.datetime.data, form.intensity.data))
        flash('Input submitted')
        return redirect(url_for('index'))
    sensors = [
        {
            'id': 1 ,
            'latitude': 40.1 ,
            'longitude' : 77.21,
            'datetime': datetime.utcnow(),
            'intensity': 55,
        },
        {
            'id': 2 ,
            'latitude': 38.1 ,
            'longitude' : 44.21,
            'datetime': datetime.utcnow(),
            'intensity': 12,
        }
           ]
               
    return render_template('index.html', title='Home', sensors=sensors, form=form)
