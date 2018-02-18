from camabit.app.models.base import Base

class Coin(Base):
    _collection = "coins"
    _keys = ("id", "name")

    @classmethod
    async def search(self, phrase):
        cursor = self._db[self._collection].find({ "$text": { "$search": phrase } }, projection={'_id': False})
        results = await cursor.to_list(length=None)
        return results