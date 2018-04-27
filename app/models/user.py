from camabit.app.models.base import Base

class User(Base):
    _collection = "users"
    _keys = ("id", "email")