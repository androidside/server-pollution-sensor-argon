from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField, DateTimeField, SubmitField
from wtforms.validators import DataRequired
class SensorForm(FlaskForm):
    id = IntegerField('Id', validators=[DataRequired()])
    latitude = FloatField('Latitude', validators=[DataRequired()])
    longitude = FloatField('Longitude', validators=[DataRequired()])
    datetime = DateTimeField('Date Time', validators=[DataRequired()])
    intensity = IntegerField('Intensity', validators=[DataRequired()])
    submit = SubmitField('Submit value')