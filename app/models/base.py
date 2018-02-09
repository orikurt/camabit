from tornado.ioloop import IOLoop
from motor.motor_tornado import MotorClient
from camabit.db import connection

class Base():
    _collection = None
    _attributes = dict()
    _db = connection._db

    def __init__(self, **attributes):
        self._attributes = dict(attributes)
        IOLoop.current().run_sync(lambda: self.create(attributes))

    async def create(self, attributes):
        result = await self._db[self._collection].insert_one(attributes)
        print("create result {}, {}, {}".format(dir(result), result.acknowledged, result.inserted_id))

    async def update(self, selector, attributes):
        pass

    async def delete(self, selector):
        pass

    async def find(self, selector):
        pass