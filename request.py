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
    resp = req.post("http://localhost:5000/add_reading", json=json.dumps(reading, indent=4, sort_keys=True, default=str))
    print(resp.status_code)
    print(resp.content)
    


resp = req.get("http://localhost:5000/index")
print(resp.status_code)