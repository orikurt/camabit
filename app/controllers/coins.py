from camabit.app.controllers.base import Base
from camabit.app.models.coin import Coin

class CoinsController(Base):
    async def show(self, params={}):
        coins = await Coin.paginate(int(params.get('page', 1)))
        self.respond({"coins": coins})

    async def search(self):
        phrase = self.get_argument("phrase")
        results = await Coin.search(phrase)
        self.respond({"results": results})

    async def hot(self):
        hot_coin = await Coin.first('percent_change_24h')
        self.respond({'hot': hot_coin})