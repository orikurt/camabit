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

    async def delete(self, selector):
        pass

    @classmethod
    async def update(self, selector, attributes):
        return await self._db[self._collection].update_one(selector, {"$set": attributes})

    @classmethod
    async def find(self, resource_id):
        coin = await self._db[self._collection].find_one({"id": resource_id}, projection={'_id': False})
        return coin

    @classmethod
    def all(self):
        return self._db[self._collection].find(projection={'_id': False})

    @classmethod
    async def paginate(self, page, page_size=100):
        cursor = self.all().skip(page_size*(page-1)).limit(page_size)
        documents = await cursor.to_list(length=None)
        return documents        

    @classmethod
    async def first(self, field):
        cursor = self._db[self._collection].find(projection={'_id': False}).sort(field, -1).limit(1)
        await cursor.fetch_next
        meta = cursor.next_object()
        return meta

    @classmethod
    async def last(self, field):
        cursor = self._db[self._collection].find(projection={'_id': False}).sort(field, 1).limit(1)
        await cursor.fetch_next
        meta = cursor.next_object()
        return meta
        

    @classmethod
    async def first_or_create(self, attributes):
        query = self.get_keys_object(attributes)
        document = await self._db[self._collection].find_one_and_update(query, {"$set": attributes}, upsert=True)
        return document

    @classmethod
    def get_keys_object(self, data):
        return {k: data[k] for k in self._keys}
        