from camabit.app.controllers.base import Base
from camabit.app.models.coin import Coin

class CoinsController(Base):
    async def show(self):
        coins = await Coin.all()
        self.respond({"coins": coins})

    async def search(self):
        phrase = self.get_argument("phrase")
        results = await Coin.search(phrase)
        self.respond({"results": results})