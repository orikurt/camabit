from camabit.app.models.base import Base

class Meta(Base):
    _collection = "meta"
    _keys = ("date",)