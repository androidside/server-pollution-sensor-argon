from app import app
from flask import render_template, flash, redirect, url_for
from app.forms import SensorForm

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = SensorForm()
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
            'datetime': 12345,
            'intensity': 55,
        },
        {
            'id': 2 ,
            'latitude': 38.1 ,
            'longitude' : 44.21,
            'datetime': 54321,
            'intensity': 12,
        }
           ]
               
    return render_template('index.html', title='Home', sensors=sensors, form=form)
