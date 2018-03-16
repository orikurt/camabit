from camabit.app.models.base import Base

class Coin(Base):
    _collection = "coins"
    _keys = ("id", "name")

    @classmethod
    def all(self):
        return self._db[self._collection].find(projection={'_id': False}).sort("rank", 1)

    @classmethod
    async def search(self, phrase):
        cursor = self._db[self._collection].find({ "$text": { "$search": phrase } }, projection={'_id': False})
        results = await cursor.to_list(length=None)
        return results

    @classmethod
    async def custom_index(self):
        cursor = self._db[self._collection].find(projection={'_id': False, 'id': True, 'name': True, 'symbol': True})
        results = await cursor.to_list(length=None)
        return results        