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
from datetime import datetime


readings = Reading.query.all(); 
for r in readings:
    db.session.delete(r)
    db.session.commit()

    
