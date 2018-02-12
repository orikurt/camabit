from camabit.app.models.base import Base

class Coin(Base):
    _collection = "coins"
    _keys = ("id", "name")
