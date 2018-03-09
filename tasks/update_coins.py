from datetime import datetime
from camabit.app.models.coin import Coin
from camabit.app.models.meta import Meta
from camabit.lib import coin_importer

async def run():
    all_coins = await coin_importer.all_coins() 
    if not all_coins:
        print("No coins received on import")
        return
    print("running coin update: All coins {}".format(len(all_coins)))
    for coin_data in all_coins:
        coin_data['rank'] = int(coin_data['rank'])
        coin = await Coin.first_or_create(coin_data)
    global_meta = await coin_importer.global_meta()
    print("market_cap {}".format(global_meta["total_market_cap_ils"]))
    global_meta["date"] = datetime.now()
    await Meta.first_or_create(global_meta)
