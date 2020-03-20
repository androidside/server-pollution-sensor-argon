# from app import app, db
# from app.models import Reading
# from datetime import datetime
# from flask import Flask
# from config import Config
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from os import system, name
from app.models import Reading
from app import db
import time
import random
import sys
from datetime import datetime


for i in range(100):
    reading = Reading(sensor_id= random.randint(1,11),
              latitude=random.uniform(-90, 90),
              longitude=random.uniform(0, 180),
              datetime=datetime.utcnow(),
              intensity=random.randint(1,101))
    db.session.add(reading)
    db.session.commit()
    time.sleep(1)