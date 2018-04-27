from camabit.app.controllers.base import Base
from camabit.app.models.coin import Coin

class CoinsController(Base):
    async def show(self, params={}):
        page = int(params.get('page', 1))
        if 'coin_id' in params:
            coin = await Coin.find(params['coin_id'])
            self.respond({"coin": coin})
        else:
            coins = await Coin.paginate(page)
            self.respond({"coins": coins})

    async def index(self, params={}):
        coins = await Coin.custom_index()
        self.respond({"coins": coins})

    async def search(self, params={}):
        phrase = params.get('phrase', "")
        results = await Coin.search(phrase)
        self.respond({"results": results})

    async def hot(self, params={}):
        hot_coins = await Coin.limit('percent_change_24h', 10)
        self.respond({'hotCoins': hot_coins})