#!/usr/bin/env python3

import requests as req
import json
# from app.models import Reading
from datetime import datetime
import random
import time


for i in range(100):
    reading = {"sensor_id":random.randint(1,11),"latitude":random.uniform(-90, 90),
           "longitude":random.uniform(0, 180),"datetime":datetime.utcnow(),"intensity":random.randint(1,101)}
    resp = req.post("http://localhost:5000/add_reading", json=json.dumps(reading, indent=0, sort_keys=True, default=str))
    print(resp.status_code)
    print(resp.content)
    


# resp = req.get("http://localhost:5000/index")
resp = req.get("https://galactic-star-1102.postman.co/mocks/a3c2e902-911c-450a-a44b-279dfb5fbfb3/call-logs?workspace=28cc9de9-af01-45b1-87ee-e5247940fcfc/postmanPost")

print(resp.status_code)