#! /usr/bin/env python
from app import app, Config 

from app import app, Config, Mqtt

# Initialize  MQTT client below



if __name__ == "__main__":
    app.run(debug=Config.FLASK_DEBUG, host=Config.FLASK_RUN_HOST, port=Config.FLASK_RUN_PORT)

#  Replace topic with the subtopic your CCS is publishing to
Client = Mqtt(620150823,"localhost",1883)
