from app import db
from datetime import datetime, timedelta
from IPython.utils.tz import utcnow

class Reading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensor_id = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    datetime = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    intensity = db.Column(db.Integer)
    vgas = db.Column(db.Float)
    vgas0 = db.Column(db.Float)
    temperature = db.Column(db.Float)
    ppm = db.Column(db.Float)
    rgain = db.Column(db.Integer) 
    
    
    
    def from_dict_mqtt(self, data):
        for column in self.__table__.columns:
            if column.name in data:
                setattr(self, column.name, data[column.name])   
        if 'datetime' in data:
            x=str(data['datetime'])
            #setattr(self, 'datetime', datetime.strptime(data['datetime'], '%Y-%m-%d %H:%M:%S.%f')
            setattr(self, 'datetime', datetime.strptime(x, '%Y%m%d%H%M%S.%f'))


    def from_dict(self, data):
        for column in self.__table__.columns:
            if column.name in data:
                setattr(self, column.name, data[column.name])   
        if 'datetime' in data:
            if data['datetime'] == '-1':
                setattr(self, 'datetime', datetime.now()) #NOT UTC !            
            else: 
               #setattr(self, 'datetime', datetime.now()) #NOT UTC !            
               setattr(self, 'datetime', datetime.strptime(data['datetime'], '%Y-%m-%d %H:%M:%S.%f') - timedelta(hours=4))
            
    def from_dict_noDateTime(self, data):
        for column in self.__table__.columns:
#        for field in ['sensor_id', 'latitude', 'longitude', 'intensity']:
            if column.name in data:
                setattr(self, column.name, data[column.name])   
        if 'datetime' in data:
            setattr(self, 'datetime', datetime.now()) #NOT UTC !
    
    def format_mqtt_message(self):
        mqtt_string = ""
        for column in self.__table__.columns:
            if(column.name != 'datetime'):
                mqtt_string += "'"+column.name+"':"+str(getattr(self, column.name))+", "
            if (column.name == 'datetime'):
                mqtt_string += "'"+column.name+"':"+self.datetime.strftime('%Y%m%d%H%M%S.%f')+", "                
        mqtt_string = mqtt_string[:-2]#could do a slice at the end of the loop to remove last space and coma
        #old_string = "'id':{}, 'sensor_id':{}, 'latitude':{}, 'longitude':{}, 'datetime':{}, 'intensity':{}".format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime.strftime('%Y%m%d%H%M%S.%f'), self.intensity)
        return mqtt_string
    
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
    
    #Used to generate a .csv file with the the date, intensity values as trings
    def to_csvfields(self):
        csv_string = self.datetime.strftime('%Y/%m/%d %H:%M:%S') + "," + str(self.intensity) + "\n"
        return csv_string
    
    def test(self):
        return 'hello world'
    def __repr__(self):
        representation_string = '<'
        for column in self.__table__.columns:
            representation_string += column.name+'='+str(getattr(self, column.name))+", "
        representation_string = representation_string[:-2]#could do a slice at the end of the loop to remove last space and coma
        representation_string += '>'  
        #old string = '<id={}, sensor_id={}, latitude={}, longitude={}, datetime={}, intensity={}>'.format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime, self.intensity)     
        return representation_string

    
#     
#     def from_dict_mqtt(self, data):
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
#   def format_mqtt_message(self): 
#       return "'id':{}, 'sensor_id':{}, 'latitude':{}, 'longitude':{}, 'datetime':{}, 'intensity':{}".format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime.strftime('%Y%m%d%H%M%S.%f'), self.intensity)
#   def __repr__(self):
#       return '<id={}, sensor_id={}, latitude={}, longitude={}, datetime={}, intensity={}>'.format(self.id, self.sensor_id,self.latitude,self.longitude, self.datetime, self.intensity)