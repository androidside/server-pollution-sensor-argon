from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mqtt import Mqtt
import paho.mqtt.client as mqtt
from flask_bootstrap import Bootstrap


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate =  Migrate(app, db)
mqtt = Mqtt(app)
mqtt.subscribe('home/mytopic')
bootstrap = Bootstrap(app)


from app import routes, models