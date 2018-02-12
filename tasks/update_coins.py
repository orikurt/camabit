from camabit.app.models.coin import Coin
from camabit.lib import coin_importer

async def run():
    all_coins = await coin_importer.all_coins() 
    print("running coin update: All coins {}".format(len(all_coins)))
    for coin_data in all_coins:
        coin = await Coin.first_or_create(coin_data)
