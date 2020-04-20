from app import db
from datetime import datetime
from IPython.utils.tz import utcnow

class Reading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensor_id = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    datetime = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    intensity = db.Column(db.Integer)
    
    
    
    def from_dict_mtqq(self, data):
        for field in ['sensor_id', 'latitude', 'longitude', 'intensity']:
            if field in data:
                setattr(self, field, data[field])   
        if 'datetime' in data:
            x=str(data['datetime'])
            #setattr(self, 'datetime', datetime.strptime(data['datetime'], '%Y-%m-%d %H:%M:%S.%f')
            setattr(self, 'datetime', datetime.strptime(x, '%Y%m%d%H%M%S.%f'))


    def from_dict(self, data):
        for field in ['sensor_id', 'latitude', 'longitude', 'intensity']:
            if field in data:
                setattr(self, field, data[field])   
        if 'datetime' in data:
            setattr(self, 'datetime', datetime.strptime(data['datetime'], '%Y-%m-%d %H:%M:%S.%f'))
            
    def from_dict_noDateTime(self, data):
        for field in ['sensor_id', 'latitude', 'longitude', 'intensity']:
            if field in data:
                setattr(self, field, data[field])   
        if 'datetime' in data:
            setattr(self, 'datetime', datetime.utcnow())
    
    def format_mtqq_message(self): 
        return "'id':{}, 'sensor_id':{}, 'latitude':{}, 'longitude':{}, 'datetime':{}, 'intensity':{}".format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime.strftime('%Y%m%d%H%M%S.%f'), self.intensity)
    
#     def to_dict(self, row):
#         d = {}
#         for column in row.__table__.columns:
#             d[column.name] = str(getattr(row, column.name))
#         return d

    def to_dict(self):
        d = {}
        for column in self.__table__.columns:
            d[column.name] = str(getattr(self, column.name))
        return d
    
    def test(self):
        return 'hello world'
    def __repr__(self):
        return '<id={}, sensor_id={}, latitude={}, longitude={}, datetime={}, intensity={}>'.format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime, self.intensity)

    
#     
#     def from_dict_mtqq(self, data):
#         for field in ['sensor_id', 'latitude', 'longitude', 'intensity']:
#             if field in data:
#                 setattr(self, field, data[field])   
#         if 'datetime' in data:
#             setattr(self, 'datetime', datetime.strptime(str(data['datetime']), '%Y%m%d%H%M%S.%f')
# #         #integers
# #         for field in ['sensor_id', 'intensity']:
# #             if field in data:
# #                 setattr(self, field, int(data[field]))   
# #         #floats
# #         for field in ['latitude', 'longitude']:
# #             if field in data:
# #                 setattr(self, field, float(data[field]))   
# #         
# #         if 'datetime' in data:
# #             setattr(self, 'datetime', datetime.strptime(data['datetime'], '%Y-%m-%d %H:%M:%S.%f'))
#             
#     def from_dict(self, data):
#         for field in ['sensor_id', 'latitude', 'longitude', 'intensity']:
#             if field in data:
#                 setattr(self, field, data[field])   
#         if 'datetime' in data:
#              setattr(self, 'datetime', datetime.strptime(data['datetime'], '%Y-%m-%d %H:%M:%S.%f'))
#                     
# we cannot have trailing zeros
#   def format_mtqq_message(self): 
#       return "'id':{}, 'sensor_id':{}, 'latitude':{}, 'longitude':{}, 'datetime':{}, 'intensity':{}".format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime.strftime('%Y%m%d%H%M%S.%f'), self.intensity)
#   def __repr__(self):
#       return '<id={}, sensor_id={}, latitude={}, longitude={}, datetime={}, intensity={}>'.format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime, self.intensity)