import json
from datetime import datetime
from tornado.httpclient import AsyncHTTPClient
from tornado.gen import Task
from camabit.app.models.coin import Coin

API_URL = "https://api.coinmarketcap.com/v1/"
http_client = AsyncHTTPClient()

async def all_coins():
    url = "{0}ticker/?limit=0&convert=ILS".format(API_URL)
    try:
        coins = await Task(http_client.fetch, url)
        print("{} fetched {} bytes".format(datetime.now(), len(coins.body)))
        coins = coins.body.decode("utf8")
        return json.loads(coins)
    except Exception as e:
        print(e)
        return None

async def global_meta():
    url = "{0}global/?convert=ILS".format(API_URL)
    try:
        global_meta = await Task(http_client.fetch, url)
        global_meta = global_meta.body.decode("utf8")
        return json.loads(global_meta)
    except Exception as e:
        print(e)
        return None

async def coin_images():
    url = "https://www.cryptocompare.com/api/data/coinlist/"
    coins = await Task(http_client.fetch, url)
    coins = json.loads(coins.body.decode("utf8"))["Data"]
    coint = 0
    matched = 0
    for coin in coins:
        try:
            #id = coins[coin]["CoinName"].lower()
            symbol = coins[coin]["Symbol"]
            image_url = coins[coin]["ImageUrl"]
            c = await Coin.update({"symbol": symbol}, {"image_url": "https://www.cryptocompare.com{}".format(image_url)})
            if c.modified_count == 1:
                coint += 1
            if c.matched_count == 1:
                matched += 1
        except KeyError:
            print(coins[coin])
    print("updated: {}, matched: {}".format(coint, matched))