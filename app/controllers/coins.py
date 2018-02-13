from camabit.app.controllers.base import Base
from camabit.app.models.coin import Coin

class CoinsController(Base):
    async def show(self):
        coins = await Coin.all()
        self.respond({"coins": coins})