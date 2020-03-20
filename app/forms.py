from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Optional
class SensorForm(FlaskForm):
    sensor_id = IntegerField('sensor_id', validators=[DataRequired()])
    latitude = FloatField('latitude', validators=[DataRequired()])
    longitude = FloatField('longitude', validators=[DataRequired()])
    datetime = DateTimeField('date Time', validators=[Optional()])
    intensity = IntegerField('intensity', validators=[DataRequired()])
    submit = SubmitField('submit value')