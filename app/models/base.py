from tornado.ioloop import IOLoop
from motor.motor_tornado import MotorClient
from camabit.db import connection

class Base():
    _collection = None
    _attributes = tuple()
    _keys = tuple()
    _db = connection._db

    def __init__(self, **attributes):
        self._attributes = dict(attributes)
        IOLoop.current().run_sync(lambda: self.create(attributes))

    async def create(self, attributes):
        result = await self._db[self._collection].insert_one(attributes)

    async def update(self, selector, attributes):
        pass

    async def delete(self, selector):
        pass

    async def find(self, selector):
        pass

    @classmethod
    async def first_or_create(self, attributes):
        query = self.get_keys_object(attributes)
        coin = await self._db[self._collection].find_and_modify(query, attributes, upsert=True)
        return coin

    @classmethod
    def get_keys_object(self, data):
        return {k: data[k] for k in self._keys}
        