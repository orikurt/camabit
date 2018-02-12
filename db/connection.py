from motor.motor_tornado import MotorClient
from camabit import conf

_db = None

if _db is None:
    print("connecting to db {}".format(conf.db["name"]))
    _db = MotorClient(host=conf.db["host"], port=conf.db["port"])[conf.db["name"]]
else:
    print("connection already established")
