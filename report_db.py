# from app import app, db
# from app.models import Reading
# from datetime import datetime
# from flask import Flask
# from config import Config
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from os import system, name
from app.models import Reading
import time


def screen_clear():
   if name == 'nt':
      _ = system('cls')
   # for mac and linux(here, os.name is 'posix')
   else:
      _ = system('clear')


previous_readings_count = Reading.query.count();
previous_readings = Reading.query.all();  
for r in previous_readings:
        print (r)
while True:
    new_readings_count = Reading.query.count();
    
    if(new_readings_count == previous_readings_count):
        time.sleep(1)
    
    else:
        if(new_readings_count > previous_readings_count):  
            difference_readings = Reading.query.filter(Reading.id > previous_readings_count)
            for r in difference_readings:
                print (r)
        if (new_readings_count < previous_readings_count):        
            new_readings = Reading.query.all();
            screen_clear()
            for r in new_readings:
                print (r)
            previous_readings =  new_readings
    previous_readings_count = new_readings_count

