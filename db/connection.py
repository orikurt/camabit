from motor.motor_tornado import MotorClient
from pymongo import TEXT
from camabit import conf

_db = None

def create_indices(db):
    db["coins"].create_index([("id", TEXT), ("name", TEXT), ("symbol", TEXT)], name="search")

if _db is None:
    print("connecting to db {}".format(conf.db["name"]))
    _db = MotorClient(host=conf.db["host"], port=conf.db["port"])[conf.db["name"]]
    create_indices(_db)
