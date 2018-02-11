from camabit.app.models.coin import Coin
from camabit.lib import coin_importer

async def run():
    print("running coin update")
    for coin_data in coin_importer.all_coins():
        coin = await Coin.first_or_create(coin_data)
        print(coin)


