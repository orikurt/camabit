from camabit.app.controllers.base import Base
from camabit.app.models.meta import Meta
from bson import json_util
import json

class MetaController(Base):
    async def show(self, params={}):
        meta = await Meta.first("date")
        self.respond({"meta": json.dumps(meta, default=json_util.default)})