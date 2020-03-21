from app import db
from datetime import datetime

class Reading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensor_id = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    datetime = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    intensity = db.Column(db.Integer)
    
    def from_dict(self, data):
        for field in ['sensor_id', 'latitude', 'longitude', 'intensity']:
            if field in data:
                setattr(self, field, data[field])   
        if 'datetime' in data:
            setattr(self, 'datetime', datetime.strptime(data['datetime'], '%Y-%m-%d %H:%M:%S.%f'))
    def __repr__(self):
        return '<id={}, sensor_id={}, latitude={}, longitude={}, datetime={}, intensity={}>'.format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime, self.intensity)