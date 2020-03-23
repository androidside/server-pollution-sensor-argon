import os
#absolute path of the application (__file__ in this case is config.py)
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you will never guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MQTT_BROKER_URL = 'localhost'
    MQTT_BROKER_PORT = 1883
    MQTT_USERNAME = 'user'
    MQTT_PASSWORD = 'secret'
    MQTT_REFRESH_TIME = 1.0  # refresh time in seconds
    MQTT_KEEPALIVE = 5  # set the time interval for sending a ping to the broker to 5 seconds
    MQTT_TLS_ENABLED = False  # set TLS to disabled for testing purposes

    
#     
#     MAIL_SERVER = os.environ.get('MAIL_SERVER')
#     MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
#     MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
#     MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
#     MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
#     ADMINS = ['your-email@example.com']


