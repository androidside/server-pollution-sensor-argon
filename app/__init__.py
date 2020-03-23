from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mqtt import Mqtt
import paho.mqtt.client as mqtt


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate =  Migrate(app, db)
mqtt = Mqtt(app)
mqtt.subscribe('home/mytopic')


from app import routes, models